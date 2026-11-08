"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";
import clsx from "clsx";
import { useInView } from "@/hooks/useInView";

type Variant = "rise24" | "rise12" | "slide-left" | "slide-right" | "uncover";

type Props = {
  children: ReactNode;
  as?: ElementType;
  variant?: Variant;
  /** Stagger delay in seconds — pass `index * 0.07` for a diagonal-wave grid. */
  delay?: number;
  amount?: number;
  className?: string;
  [prop: string]: unknown;
};

/**
 * One-shot scroll-triggered reveal for non-fade-up motions: rises, side slides and
 * the photo clip-path "uncover". Same single-fire IntersectionObserver engine as
 * Reveal; pass `delay` per item (e.g. `(row + col) * 0.07`) for a diagonal wave
 * across a grid of tiles.
 *
 * For `uncover`, the clip-path lives on an inner mask div rather than the observed
 * root: a clip-path that collapses an element's visible area to zero height also
 * collapses the rect browsers use for intersection, which would make it permanently
 * unobservable. Keeping the observed root's geometry untouched avoids that trap.
 */
export function Appear({ children, as: Tag = "div", variant = "rise24", delay = 0, amount = 0.2, className, ...rest }: Props) {
  const { ref, inView } = useInView(amount);
  const style = { "--appear-delay": `${delay}s` } as CSSProperties;

  if (variant === "uncover") {
    return (
      <Tag ref={ref} className={className} {...rest}>
        <div className={clsx("appear appear-uncover absolute inset-0", inView && "is-in")} style={style}>
          {children}
        </div>
      </Tag>
    );
  }

  return (
    <Tag ref={ref} className={clsx("appear", `appear-${variant}`, inView && "is-in", className)} style={style} {...rest}>
      {children}
    </Tag>
  );
}
