import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Appear } from "@/components/ui/Appear";
import { aboutWhy } from "@/lib/data";
import { images } from "@/lib/images";

export function WhyChooseGrid() {
  return (
    <section aria-labelledby="why-choose-title" className="px-5 py-16 sm:px-8 lg:p-20">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-14">
        <Reveal as="div" className="flex flex-col items-center gap-4 text-center">
          <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-brand">Why Running Wheels</p>
          <h2 id="why-choose-title" className="t-h2 max-w-[900px] text-ink">Why choose Running Wheels?</h2>
          <p className="t-lead max-w-[640px]">A few reasons customers trust us with their deliveries.</p>
        </Reveal>

        <ul className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3">
          {aboutWhy.map(({ icon: Icon, title, text }, i) => (
            <Appear as="li" key={title} variant="rise24" delay={(i % 3) * 0.08 + Math.floor(i / 3) * 0.05} className="card-hover flex flex-col gap-10 rounded-[24px] bg-surface p-8">
              <span className="flex size-[52px] items-center justify-center rounded-full bg-white text-ink" aria-hidden>
                <Icon className="size-[22px]" />
              </span>
              <div className="flex flex-col gap-2.5">
                <h3 className="t-card-title text-ink">{title}</h3>
                <p className="text-base leading-[1.55] text-muted">{text}</p>
              </div>
            </Appear>
          ))}
        </ul>

        <Reveal as="div" className="flex w-full flex-col items-start justify-between gap-8 rounded-[24px] bg-surface px-6 py-10 sm:px-10 lg:flex-row lg:items-center lg:px-14 lg:py-12">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-10">
            <Image src={images.teamAvatars} alt="" width={213} height={72} className="h-[72px] w-[213px] shrink-0" />
            <div className="flex flex-col gap-2">
              <h3 className="text-[clamp(1.4rem,1.1rem+1vw,1.75rem)] font-semibold leading-tight tracking-[-0.02em] text-ink">Meet the people behind Running Wheels</h3>
              <p className="text-[17px] text-muted">Get to know the drivers and team who handle your deliveries.</p>
            </div>
          </div>
          <Button href="/our-team" className="pl-6">Meet Our Team</Button>
        </Reveal>
      </div>
    </section>
  );
}
