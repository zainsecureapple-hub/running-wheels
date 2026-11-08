"use client";

import { useEffect, useRef } from "react";
import type Lenis from "lenis";
import { useReducedMotion } from "@/hooks/useReducedMotion";

let lenisInstance: Lenis | null = null;

/** Smooth-scroll to a target (selector, element, or offset) through the shared Lenis instance, if running. */
export function smoothScrollTo(target: string | number | Element, options?: Parameters<Lenis["scrollTo"]>[1]) {
  lenisInstance?.scrollTo(target, options);
}

/** Pause/resume smooth scrolling — used while the mobile menu is open. */
export function setSmoothScrollPaused(paused: boolean) {
  if (paused) lenisInstance?.stop();
  else lenisInstance?.start();
}

/**
 * Mounted once in the root layout. Starts Lenis lazily (dynamic import, kicked off
 * from requestIdleCallback with a 1000ms setTimeout fallback for Safari) so it never
 * delays hero paint. Skips entirely under reduced motion or when matchMedia is
 * unavailable; touch input stays native either way. `anchors: true` makes in-page
 * links (e.g. `#enquiry`) scroll smoothly through Lenis automatically.
 */
export function SmoothScroll() {
  const reducedMotion = useReducedMotion();
  const started = useRef(false);

  useEffect(() => {
    if (started.current || reducedMotion || typeof window === "undefined" || !window.matchMedia) return;
    started.current = true;

    let cancelled = false;
    const supportsIdle = typeof window.requestIdleCallback === "function";

    const boot = async () => {
      if (cancelled) return;
      const { default: LenisCtor } = await import("lenis");
      if (cancelled) return;
      lenisInstance = new LenisCtor({ autoRaf: true, anchors: true });
    };

    const id = supportsIdle ? window.requestIdleCallback(boot) : window.setTimeout(boot, 1000);

    return () => {
      cancelled = true;
      if (supportsIdle) window.cancelIdleCallback(id);
      else window.clearTimeout(id);
      lenisInstance?.destroy();
      lenisInstance = null;
      started.current = false;
    };
  }, [reducedMotion]);

  return null;
}
