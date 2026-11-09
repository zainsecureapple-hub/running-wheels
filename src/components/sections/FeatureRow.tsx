import Image from "next/image";
import clsx from "clsx";
import { Check } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Appear } from "@/components/ui/Appear";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { Reveal } from "@/components/ui/Reveal";

type Props = {
  title: string;
  image: string;
  imageAlt: string;
  imageSide?: "left" | "right";
  cta?: { label: string; href: string };
  points?: string[];
  children: ReactNode;
  /** Extra classes on the row's outer grid — e.g. `max-md:hidden` to drop a repeated row on mobile. */
  className?: string;
};

/** Alternating text card + photo row used on Home and About. Title is an <h3>. Text and photo slide in from opposite sides; the photo drifts with scroll. */
export function FeatureRow({ title, image, imageAlt, imageSide = "right", cta, points, children, className }: Props) {
  const textVariant = imageSide === "left" ? "slide-right" : "slide-left";
  const photoVariant = imageSide === "left" ? "slide-left" : "slide-right";
  return (
    <div className={clsx("grid gap-6 max-md:gap-5 overflow-x-hidden lg:grid-cols-2", className)}>
      <Appear
        variant={textVariant}
        className={clsx(
          "flex items-center justify-center rounded-[20px] max-md:order-2 max-md:rounded-none max-md:bg-transparent max-md:p-0 bg-surface p-8 md:p-12 lg:min-h-[488px]",
          imageSide === "left" && "lg:order-2",
        )}
      >
        <div className="flex w-full max-w-[452px] flex-col gap-8 max-md:gap-5 lg:gap-12">
          <div className="flex flex-col gap-6 max-md:gap-3">
            <h3 className="t-h3 text-ink">{title}</h3>
            <div className="flex flex-col gap-5 text-lg leading-6 tracking-[-0.02em] text-muted max-md:text-base max-md:leading-[1.55]">{children}</div>
          </div>
          {points && (
            <ul className="flex flex-col gap-3.5 max-md:hidden">
              {points.map((p) => (
                <li key={p} className="flex items-center gap-3 text-[17px] font-medium text-ink">
                  <span className="flex size-[26px] shrink-0 items-center justify-center rounded-full bg-brand text-white" aria-hidden>
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          )}
          {cta && <Button href={cta.href} variant="light" mobileFullWidth={false}>{cta.label}</Button>}
        </div>
      </Appear>
      <Appear
        variant={photoVariant}
        delay={0.1}
        className={clsx(
          "relative min-h-[300px] overflow-hidden rounded-[20px] bg-photo md:min-h-[380px] lg:min-h-[488px] max-md:order-1 max-md:h-60 max-md:min-h-0",
          imageSide === "left" && "lg:order-1",
        )}
      >
        <ParallaxImage>
          <Image src={image} alt={imageAlt} fill sizes="(min-width: 1024px) 612px, 100vw" className="object-cover" />
        </ParallaxImage>
      </Appear>
    </div>
  );
}

export function FeatureBlock({ id, title, description, children }: { id: string; title: string; description: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="bg-white px-5 py-16 max-md:pb-0 max-md:pt-[72px] sm:px-8 lg:px-24 lg:py-20">
      <div className="mx-auto flex max-w-[1248px] flex-col gap-12 max-md:gap-10 lg:gap-16">
        <Reveal as="div" className="mx-auto flex max-w-[658px] flex-col items-center gap-5 text-center max-md:mx-0 max-md:max-w-none max-md:items-start max-md:gap-4 max-md:text-left">
          <h2 id={id} className="t-h2 text-ink">{title}</h2>
          <p className="text-lg leading-normal tracking-[-0.02em] text-muted max-md:text-base max-md:leading-[1.55]">{description}</p>
        </Reveal>
        <div className="flex flex-col gap-6 max-md:gap-10">{children}</div>
      </div>
    </section>
  );
}
