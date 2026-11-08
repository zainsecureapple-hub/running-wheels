"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";
import clsx from "clsx";
import { useInView } from "@/hooks/useInView";

type Props = {
  children: ReactNode;
  as?: ElementType;
  /** Stagger delay in seconds. */
  delay?: number;
  /** Rise distance in px. */
  y?: number;
  /** Visibility threshold (0–1) that triggers the reveal. */
  amount?: number;
  className?: string;
  [prop: string]: unknown;
};

/**
 * Fade-up-on-scroll primitive. Plays once via a single IntersectionObserver that
 * disconnects after the first play. Server HTML and no-JS/reduced-motion visitors
 * see the final, fully visible state — only CSS (globals.css `.reveal`) hides the
 * pre-animation state, and only under `(scripting: enabled)`.
 */
export function Reveal({ children, as: Tag = "div", delay = 0, y = 18, amount = 0.2, className, ...rest }: Props) {
  const { ref, inView } = useInView(amount);
  const style = { "--reveal-y": `${y}px`, "--reveal-delay": `${delay}s` } as CSSProperties;

  return (
    <Tag ref={ref} className={clsx("reveal", inView && "is-in", className)} style={style} {...rest}>
      {children}
    </Tag>
  );
}
