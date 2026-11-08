#!/usr/bin/env node
/**
 * Pulls every image used by the site straight from Figma into /public/images.
 *
 *   1. cp .env.example .env.local   and set FIGMA_ACCESS_TOKEN
 *   2. npm run figma:assets
 *
 * Modes (see scripts/figma-assets.json):
 *   svg    — export the node as SVG            (logo, vector art)
 *   render — export the flattened node as PNG  (photo tiles with crops / layered fills)
 *   fill   — download the node's raw IMAGE fill (hero backgrounds, team photos)
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(await readFile(path.join(root, "scripts/figma-assets.json"), "utf8"));
const token = process.env.FIGMA_ACCESS_TOKEN;
const fileKey = process.env.FIGMA_FILE_KEY || manifest.fileKey;
const outDir = path.join(root, "public/images");
const only = process.argv.slice(2); // optional: node scripts/... hero-home.png logo.svg

if (!token) {
  console.error("✖ FIGMA_ACCESS_TOKEN is missing. Add it to .env.local (see .env.example).");
  process.exit(1);
}

const api = async (url) => {
  const res = await fetch(`https://api.figma.com${url}`, { headers: { "X-Figma-Token": token } });
  if (!res.ok) throw new Error(`Figma API ${res.status} for ${url}: ${await res.text()}`);
  return res.json();
};
const download = async (url, file) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed (${res.status}): ${url}`);
  await writeFile(path.join(outDir, file), Buffer.from(await res.arrayBuffer()));
};

const assets = manifest.assets.filter((a) => only.length === 0 || only.includes(a.out));
await mkdir(outDir, { recursive: true });

const results = { ok: [], failed: [] };
const fail = (a, why) => { results.failed.push(`${a.out} (${a.node}): ${why}`); console.warn(`⚠ ${a.out}: ${why}`); };

// ---- svg + render: one batched call per (format, scale)
const groups = new Map();
for (const a of assets.filter((x) => x.mode === "svg" || x.mode === "render")) {
  const format = a.mode === "svg" ? "svg" : "png";
  const scale = a.mode === "svg" ? 1 : a.scale ?? 2;
  const key = `${format}@${scale}`;
  groups.set(key, [...(groups.get(key) ?? []), a]);
}
for (const [key, list] of groups) {
  const [format, scale] = key.split("@");
  const ids = list.map((a) => a.node).join(",");
  const query = `ids=${encodeURIComponent(ids)}&format=${format}&scale=${scale}${format === "svg" ? "&svg_include_id=false" : ""}`;
  const { images } = await api(`/v1/images/${fileKey}?${query}`);
  for (const a of list) {
    const url = images?.[a.node];
    if (!url) { fail(a, "Figma returned no image for this node"); continue; }
    try { await download(url, a.out); results.ok.push(a.out); console.log(`✔ ${a.out}`); }
    catch (e) { fail(a, e.message); }
  }
}

// ---- fill: read each node's IMAGE fill, resolve imageRef → URL
const fills = assets.filter((a) => a.mode === "fill");
if (fills.length) {
  const nodes = await api(`/v1/files/${fileKey}/nodes?ids=${encodeURIComponent(fills.map((a) => a.node).join(","))}`);
  const { meta } = await api(`/v1/files/${fileKey}/images`);
  const findRef = (node) => {
    const own = (node.fills ?? []).filter((f) => f.type === "IMAGE" && f.visible !== false && f.imageRef);
    if (own.length) return own[own.length - 1].imageRef;
    for (const child of node.children ?? []) { const r = findRef(child); if (r) return r; }
    return null;
  };
  for (const a of fills) {
    const doc = nodes.nodes?.[a.node]?.document;
    const ref = doc && findRef(doc);
    const url = ref && meta?.images?.[ref];
    if (!url) { fail(a, "no image fill found on node"); continue; }
    try { await download(url, a.out); results.ok.push(a.out); console.log(`✔ ${a.out}`); }
    catch (e) { fail(a, e.message); }
  }
}

console.log(`\nDone: ${results.ok.length} downloaded, ${results.failed.length} failed.`);
if (results.failed.length) { console.log(results.failed.map((f) => ` - ${f}`).join("\n")); process.exitCode = 1; }
