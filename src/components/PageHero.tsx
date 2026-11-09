import Image from "next/image";
import clsx from "clsx";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";

type Props = {
  image: string;
  eyebrow: string;
  /** Rendered as the page's single <h1>. */
  title: string;
  description: string;
  cta?: { label: string; href: string };
  size?: "default" | "compact";
  /** Optional floating content anchored bottom-right on large screens (home hero card only). */
  aside?: ReactNode;
  contentWidth?: string;
};

/**
 * Shared hero for every page: expands from a rounded card to a full-bleed cover on
 * first load (100svh default, shorter for `compact`), then loops a slow Ken Burns
 * pan, light streaks and a warm glow forever. The headline rises out of its own
 * overflow mask; eyebrow, sub-copy, CTA and the optional floating card follow in a
 * staggered fade-up. Pure CSS (see globals.css `.hero-*`) so it plays immediately,
 * without waiting on hydration.
 */
export function PageHero({
  image, eyebrow, title, description, cta = { label: "Make an Enquiry", href: "/contact#enquiry" },
  size = "default", aside, contentWidth = "max-w-[560px]",
}: Props) {
  return (
    <section
      aria-labelledby="page-title"
      className={clsx(
        "relative isolate w-full overflow-hidden md:h-[100svh]",
        size === "default" ? "min-h-[max(640px,100svh)] md:min-h-[640px]" : "min-h-[max(480px,100svh)] md:min-h-[480px]",
      )}
    >
      <div
        className={clsx(
          "hero-reveal relative overflow-hidden bg-[#50352e] md:absolute md:inset-0 md:min-h-0",
          size === "default" ? "min-h-[max(640px,100svh)]" : "min-h-[max(480px,100svh)]",
        )}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Image src={image} alt="" fill priority sizes="100vw" className="hero-kenburns object-cover" />
        </div>

        <div aria-hidden className="hero-streaks absolute inset-y-0" style={{ left: "-50%", width: "200%" }} />
        <div aria-hidden className="hero-glow absolute inset-0" />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,#000_0%,rgba(102,102,102,0)_58%),linear-gradient(90deg,rgba(14,15,18,0.3),rgba(14,15,18,0.3))]"
        />

        {/* max-md:py-[92px]: matches the fixed Header's unscrolled height (22px padding top/bottom + 48px logo), kept
            equal top/bottom so justify-center lands the content at the true vertical center of the hero. */}
        <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col px-5 max-md:px-4 sm:px-10 lg:px-[60px] md:h-full max-md:min-h-[100svh] max-md:justify-center max-md:py-[92px]">
          <div
            className={clsx(
              "flex flex-col items-start gap-7 md:mt-auto md:pb-10 md:pt-24 lg:pb-[60px]",
              contentWidth,
            )}
          >
            <div className="flex flex-col items-start gap-6">
              <p
                className="hero-in max-md:w-fit rounded-full bg-white/20 py-2 pl-3.5 pr-4 text-[13px] font-medium text-white backdrop-blur-[14px]"
                style={{ animationDelay: "350ms" }}
              >
                {eyebrow}
              </p>
              <div className="flex flex-col gap-5 text-white">
                <span className="hero-line-mask">
                  <h1 id="page-title" className="hero-line t-display" style={{ animationDelay: "500ms" }}>{title}</h1>
                </span>
                <p className="hero-in max-md:text-base max-md:leading-[1.5] text-lg leading-6" style={{ animationDelay: "750ms" }}>
                  {description}
                </p>
              </div>
            </div>
            <Button href={cta.href} className="hero-in" mobileFullWidth={false} style={{ animationDelay: "900ms" }}>{cta.label}</Button>
          </div>
        </div>

        {aside && (
          <div className="hero-in-card absolute bottom-[60px] right-[60px] z-10 hidden w-80 lg:block">{aside}</div>
        )}
      </div>
    </section>
  );
}
