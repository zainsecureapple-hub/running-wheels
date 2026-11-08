"use client";

import { useId, useState } from "react";
import clsx from "clsx";
import { Minus, Plus } from "lucide-react";
import { faqs as defaultFaqs } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

type Faq = { q: string; a: string };

export function FaqSection({ faqs = defaultFaqs, id = "faq-title" }: { faqs?: Faq[]; id?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();

  return (
    <section aria-labelledby={id} className="px-5 pb-24 pt-16 max-md:pb-0 max-md:pt-[72px] sm:px-8 lg:px-[100px] lg:pb-40 lg:pt-20">
      <div className="mx-auto flex max-w-[760px] flex-col items-center gap-12 max-md:gap-6">
        <Reveal className="flex max-w-[640px] flex-col items-center gap-5 text-center max-md:max-w-none max-md:items-start max-md:gap-4 max-md:text-left">
          <h2 id={id} className="t-h2 text-ink">
            Frequently asked<br className="hidden sm:block" /> questions
          </h2>
          <p className="t-lead leading-[1.65] max-md:leading-[1.55]">
            Everything you need to know about booking, collection times and what we carry. Can’t find an answer? Our local teams are on hand 24/7.
          </p>
        </Reveal>

        <div className="flex w-full flex-col gap-4 max-md:gap-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            const btnId = `${base}-btn-${i}`;
            const panelId = `${base}-panel-${i}`;
            return (
              <Reveal
                key={f.q}
                delay={i * 0.06}
                className="rounded-[18px] bg-surface py-[22px] pl-6 pr-5 max-md:border max-md:border-line max-md:py-[18px] max-md:pl-5 max-md:pr-4"
              >
                <h3>
                  <button
                    type="button"
                    id={btnId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center gap-5 text-left max-md:min-h-12"
                  >
                    <span className="flex-1 text-[19px] max-md:text-[17px] font-medium leading-[1.3] tracking-[-0.015em] text-ink">{f.q}</span>
                    <span
                      className={clsx(
                        "flex size-8 max-md:size-9 shrink-0 items-center justify-center rounded-full bg-brand text-white",
                        !isOpen && "max-md:border max-md:border-line max-md:bg-white max-md:text-ink",
                      )}
                      aria-hidden
                    >
                      {isOpen ? <Minus className="size-4 max-md:size-[18px]" /> : <Plus className="size-4 max-md:size-[18px]" />}
                    </span>
                  </button>
                </h3>
                <div id={panelId} role="region" aria-labelledby={btnId} aria-hidden={!isOpen} className={clsx("faq-panel", isOpen && "is-open")}>
                  <div>
                    <p className="pt-3.5 text-[15px] leading-[1.65] max-md:leading-[1.55] text-muted">{f.a}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
