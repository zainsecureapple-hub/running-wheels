"use client";

import { useRef } from "react";
import { useScrollFrame } from "@/hooks/useScrollFrame";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** 2px brand-red bar at the top of the viewport tracking scroll progress. Writes a CSS var via rAF — no re-render. */
export function ScrollProgressBar() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useScrollFrame(() => {
    const el = ref.current;
    if (!el) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    el.style.setProperty("--scroll-progress", String(progress));
  }, !reducedMotion);

  if (reducedMotion) return null;
  return <div ref={ref} className="scroll-progress" aria-hidden />;
}
