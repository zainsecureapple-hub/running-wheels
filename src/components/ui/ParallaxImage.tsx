"use client";

import { useRef, type ReactNode } from "react";
import clsx from "clsx";
import { useScrollFrame } from "@/hooks/useScrollFrame";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useInView } from "@/hooks/useInView";

/**
 * Wraps a `fill`-mode next/image. Reads the wrapper's position every rAF and writes
 * `--parallax-y` directly to the DOM (max ±20px drift) — no state, no re-render. The
 * parent image container keeps `overflow-hidden`; this wrapper is `absolute inset-0`
 * and overscaled to 1.06 (see `.parallax-img` in globals.css) so the drift never
 * reveals an edge.
 *
 * The rAF loop only runs while the image is near the viewport (a generous
 * `rootMargin`, not a one-shot like Reveal/Appear) — a page can have many of these,
 * and an always-on per-frame loop for every one of them is wasted work that can
 * crowd out other main-thread callbacks (e.g. other elements' IntersectionObserver
 * delivery) while scrolling.
 */
export function ParallaxImage({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { ref: setNearNode, inView: nearViewport } = useInView(0, "200px 0px 200px 0px", false);

  useScrollFrame(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    const center = rect.top + rect.height / 2 - vh / 2;
    const drift = Math.max(-20, Math.min(20, (center / vh) * 40));
    el.style.setProperty("--parallax-y", `${drift}px`);
  }, nearViewport && !reducedMotion);

  return (
    <div
      ref={(node: HTMLDivElement | null) => {
        ref.current = node;
        setNearNode(node);
      }}
      className={clsx("parallax-img absolute inset-0", className)}
    >
      {children}
    </div>
  );
}
