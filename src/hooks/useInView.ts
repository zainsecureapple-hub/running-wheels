"use client";

import { useEffect, useRef, useState } from "react";

type PoolEntry = { observer: IntersectionObserver; callbacks: Map<Element, (isIntersecting: boolean) => void> };
const pool = new Map<string, PoolEntry>();

/** One shared IntersectionObserver per distinct (amount, rootMargin) pair, instead of one per component instance. */
function getPoolEntry(amount: number, rootMargin: string): PoolEntry {
  const key = `${amount}|${rootMargin}`;
  let entry = pool.get(key);
  if (!entry) {
    const callbacks = new Map<Element, (isIntersecting: boolean) => void>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) callbacks.get(e.target)?.(e.isIntersecting);
      },
      { threshold: amount, rootMargin },
    );
    entry = { observer, callbacks };
    pool.set(key, entry);
  }
  return entry;
}

/**
 * Tracks whether the observed element is within `rootMargin` of the viewport at
 * `amount` visibility. By default (`once: true`) it latches true on the first
 * crossing and stops observing — used by one-shot reveals (Reveal/Appear). With
 * `once: false` it keeps toggling both ways — used to gate continuous rAF work
 * (e.g. ParallaxImage) to only run near the viewport.
 */
export function useInView(amount = 0.2, rootMargin = "0px 0px -8% 0px", once = true) {
  const [node, setNode] = useState<Element | null>(null);
  const [inView, setInView] = useState(false);
  const latched = useRef(false);

  useEffect(() => {
    if (!node || latched.current) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const { observer, callbacks } = getPoolEntry(amount, rootMargin);
    callbacks.set(node, (isIntersecting) => {
      if (once) {
        if (isIntersecting) {
          latched.current = true;
          setInView(true);
          observer.unobserve(node);
          callbacks.delete(node);
        }
      } else {
        setInView(isIntersecting);
      }
    });
    observer.observe(node);
    return () => {
      observer.unobserve(node);
      callbacks.delete(node);
    };
  }, [node, amount, rootMargin, once]);

  return { ref: setNode, inView };
}
