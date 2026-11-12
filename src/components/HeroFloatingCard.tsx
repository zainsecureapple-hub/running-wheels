"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { heroFloatingCards } from "@/lib/data";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Time between flips and the duration of the flip itself — stays in the same spot, just swaps industry. */
const CYCLE_MS = 5000;
const FLIP_HALF_MS = 280;

/** Home hero's floating card. Auto-flips through `heroFloatingCards` in place. Figma nodes 49:979 / 49:991 / 49:1003. */
export function HeroFloatingCard() {
  const [index, setIndex] = useState(0);
  const [edgeOn, setEdgeOn] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const interval = setInterval(() => {
      if (reducedMotion) {
        setIndex((i) => (i + 1) % heroFloatingCards.length);
        return;
      }
      setEdgeOn(true);
      setTimeout(() => {
        setIndex((i) => (i + 1) % heroFloatingCards.length);
        setEdgeOn(false);
      }, FLIP_HALF_MS);
    }, CYCLE_MS);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  const card = heroFloatingCards[index];

  return (
    <div className="[perspective:1400px]">
      <div
        className="flex flex-col gap-3.5 rounded-3xl border border-white bg-white/95 px-3 pb-[18px] pt-3 backdrop-blur-xl transition-transform ease-in-out"
        style={{ transitionDuration: `${FLIP_HALF_MS}ms`, transform: edgeOn ? "rotateY(90deg)" : "rotateY(0deg)" }}
      >
        <div className="relative h-44 overflow-hidden rounded-2xl bg-ink">
          <Image src={card.image} alt={card.alt} fill sizes="294px" className="object-cover" />
        </div>
        <div className="flex flex-col gap-1.5 px-1.5">
          <div className="flex items-center justify-between">
            <p className="text-base font-semibold text-ink">{card.title}</p>
            <span className="flex gap-1" aria-hidden>
              {heroFloatingCards.map((c, i) => (
                <span key={c.title} className={clsx("size-2 rounded-full", i === index ? "bg-ink" : "bg-ink/25")} />
              ))}
            </span>
          </div>
          <p className="text-[13px] text-ink">{card.description}</p>
        </div>
      </div>
    </div>
  );
}
