"use client";

import { useEffect, useRef, type ElementType } from "react";
import clsx from "clsx";
import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

/** Replaces every digit run in `value` with its counted-up value at `progress`, keeping padding/format/suffix. */
function render(value: string, progress: number) {
  return value.replace(/\d+/g, (digits) => {
    const target = parseInt(digits, 10);
    const current = Math.round(target * progress);
    return String(current).padStart(digits.length, "0");
  });
}

type Props = { value: string; as?: ElementType; className?: string };

/**
 * Server HTML holds the final text (e.g. "01", "24/7", "60 min", "85+"). Once 40%
 * visible, every numeric run inside counts up from 0 over 1.6s ease-out-cubic,
 * written straight to the DOM each frame (no re-render), then stays put.
 */
export function CountUp({ value, as: Tag = "span", className }: Props) {
  const nodeRef = useRef<HTMLElement | null>(null);
  const { ref: setInViewNode, inView } = useInView(0.4);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = nodeRef.current;
    if (!inView || !el) return;
    if (reducedMotion) {
      el.textContent = value;
      return;
    }
    const duration = 1600;
    const start = performance.now();
    let frame: number;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      el.textContent = render(value, easeOutCubic(t));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, reducedMotion]);

  return (
    <Tag
      ref={(node: HTMLElement | null) => {
        nodeRef.current = node;
        setInViewNode(node);
      }}
      className={clsx("tabular-nums", className)}
    >
      {value}
    </Tag>
  );
}
