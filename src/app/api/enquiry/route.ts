import { NextResponse } from "next/server";
import { enquirySchema } from "@/lib/enquiry-schema";

export const runtime = "nodejs";

const labels: Record<string, string> = {
  fullName: "Full name", company: "Company", email: "Email", phone: "Phone", service: "Service",
  collectionAddress: "Collection", deliveryAddress: "Delivery", collectionDateTime: "Collection date/time",
  deliveryRequirement: "Delivery requirement", jobDetails: "Job details", stops: "Stops",
  routeDetails: "Route details", propertyType: "Property type", volume: "Volume",
  accessNotes: "Access notes", message: "Message",
};

const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    // A filled honeypot is treated as success so bots learn nothing.
    if ((body as { website?: string })?.website) return NextResponse.json({ ok: true });
    return NextResponse.json({ error: "Please check the highlighted fields." }, { status: 422 });
  }

  const data = parsed.data;
  const rows = Object.entries(labels)
    .map(([key, label]) => [label, (data as Record<string, unknown>)[key]] as const)
    .filter(([, v]) => typeof v === "string" && v.length > 0);

  const { RESEND_API_KEY, ENQUIRY_TO_EMAIL, ENQUIRY_FROM_EMAIL } = process.env;

  if (RESEND_API_KEY && ENQUIRY_TO_EMAIL && ENQUIRY_FROM_EMAIL) {
    const html = `<h2>New website enquiry</h2><table cellpadding="6">${rows
      .map(([l, v]) => `<tr><td><strong>${l}</strong></td><td>${escapeHtml(String(v))}</td></tr>`)
      .join("")}</table>`;
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: ENQUIRY_FROM_EMAIL,
        to: ENQUIRY_TO_EMAIL,
        reply_to: data.email,
        subject: `New enquiry — ${data.service} — ${data.fullName}`,
        html,
      }),
    });
    if (!res.ok) {
      console.error("Enquiry email failed", res.status, await res.text());
      return NextResponse.json({ error: "We couldn't send your enquiry. Please try again shortly." }, { status: 502 });
    }
  } else {
    // No email provider configured yet — log so nothing is silently lost in development.
    console.info("[enquiry]", Object.fromEntries(rows));
  }

  return NextResponse.json({ ok: true });
}
