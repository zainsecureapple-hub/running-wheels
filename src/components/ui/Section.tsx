import clsx from "clsx";
import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

export function Section({
  children, className, id, labelledBy,
}: { children: ReactNode; className?: string; id?: string; labelledBy?: string }) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={clsx("px-5 py-16 max-md:py-12 sm:px-8 lg:px-[100px] lg:py-20", className)}>
      <div className="mx-auto w-full max-w-[1240px]">{children}</div>
    </section>
  );
}

export function SectionHeading({
  id, title, description, align = "center", eyebrow, className,
}: {
  id?: string; title: ReactNode; description?: ReactNode; align?: "center" | "left"; eyebrow?: string; className?: string;
}) {
  return (
    <Reveal as="div" className={clsx("flex flex-col gap-4", align === "center" ? "mx-auto items-center text-center" : "items-start", className)}>
      {eyebrow && <p className="text-[13px] max-md:text-xs font-semibold uppercase tracking-[0.12em] max-md:tracking-wide text-brand">{eyebrow}</p>}
      <h2 id={id} className="t-h2 max-w-[900px] text-ink">{title}</h2>
      {description && <p className="t-lead max-w-[640px]">{description}</p>}
    </Reveal>
  );
}
