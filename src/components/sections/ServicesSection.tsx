import Link from "next/link";
import clsx from "clsx";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Appear } from "@/components/ui/Appear";
import { Reveal } from "@/components/ui/Reveal";
import { services, homeServiceSlugs, type Service } from "@/lib/data";

export function ServiceCard({ service, delay = 0, hideOnMobile = false }: { service: Service; delay?: number; hideOnMobile?: boolean }) {
  const Icon = service.icon;
  return (
    <Appear as="li" variant="rise24" delay={delay} className={clsx("h-full min-w-0", hideOnMobile && "max-md:hidden")}>
      <Link
        href={`/services/${service.slug}`}
        className="card-hover group hidden h-full flex-col justify-between gap-14 rounded-[20px] bg-surface p-7 transition-colors hover:bg-[#efefef] md:flex"
      >
        <span className="flex items-center justify-between">
          <span className="flex size-[52px] items-center justify-center rounded-full bg-white text-ink" aria-hidden>
            <Icon className="size-[22px]" />
          </span>
          <span className="flex size-10 items-center justify-center rounded-full border border-line text-ink transition-colors group-hover:border-ink" aria-hidden>
            <ArrowUpRight className="size-[18px]" />
          </span>
        </span>
        <span className="flex flex-col gap-2">
          <h3 className="t-card-title text-ink">{service.title}</h3>
          <p className="text-base leading-[1.55] text-muted">{service.short}</p>
        </span>
      </Link>

      <Link
        href={`/services/${service.slug}`}
        className="flex items-center gap-3.5 rounded-[20px] bg-surface py-[18px] pl-[18px] pr-4 transition-transform duration-150 active:scale-[0.98] md:hidden"
      >
        <span className="flex size-[52px] shrink-0 items-center justify-center rounded-full bg-white text-brand" aria-hidden>
          <Icon className="size-[22px]" />
        </span>
        <span className="flex min-w-0 flex-1 flex-col gap-1">
          <span className="text-[18px] font-semibold leading-[1.25] text-ink">{service.title}</span>
          <span className="text-[14.5px] leading-[1.45] text-muted">{service.short}</span>
        </span>
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-line text-ink" aria-hidden>
          <ArrowUpRight className="size-4" />
        </span>
      </Link>
    </Appear>
  );
}

export function ServicesSection({ showAll = false }: { showAll?: boolean }) {
  const list = showAll ? services : homeServiceSlugs.map((slug) => services.find((s) => s.slug === slug)!);
  return (
    <Section labelledBy="services-title" className="lg:py-20 max-md:!pt-[72px]">
      <Reveal as="div" className="mb-12 flex flex-col justify-between gap-8 max-md:mb-6 max-md:gap-4 lg:mb-14 lg:flex-row lg:items-center">
        <h2 id="services-title" className="t-h2 text-ink">
          Every delivery,<br className="hidden sm:block" /> handled with care.
        </h2>
        <div className="flex max-w-[433px] flex-col items-start gap-5 max-md:gap-4">
          <p className="t-lead max-w-[420px]">
            From one-off urgent runs to fully integrated logistics, we offer a complete range of transport.
          </p>
          {!showAll && <Button href="/services" variant="light" className="pl-[22px]">View All Services</Button>}
        </div>
      </Reveal>
      <ul className="grid gap-6 max-md:gap-3 md:grid-cols-2 lg:grid-cols-3">
        {list.map((s, i) => (
          <ServiceCard
            key={s.slug}
            service={s}
            delay={(i % 3) * 0.08 + Math.floor(i / 3) * 0.05}
            hideOnMobile={!showAll && i >= 4}
          />
        ))}
      </ul>
    </Section>
  );
}
