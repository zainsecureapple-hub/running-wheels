import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { JsonLd } from "@/components/JsonLd";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Appear } from "@/components/ui/Appear";
import { ServiceCard } from "@/components/sections/ServicesSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { faqs, getService, services } from "@/lib/data";
import { images } from "@/lib/images";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd, serviceJsonLd } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return buildMetadata({
    title: `${service.title} — Courier Service`,
    description: `${service.short} ${service.long}`.slice(0, 160),
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <PageHero
        image={images.heroHome}
        eyebrow="Our Services"
        title={service.title}
        description={service.long}
        cta={{ label: "Get a Quote", href: "/contact#enquiry" }}
        size="compact"
      />
      <Section labelledBy="included-title">
        <SectionHeading id="included-title" title={`What you get with ${service.title}`} />
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {service.points.map((p, i) => (
            <Appear as="li" key={p} variant="rise24" delay={i * 0.08} className="flex flex-col gap-6 rounded-[24px] bg-surface p-8">
              <span className="flex size-[52px] items-center justify-center rounded-full bg-brand text-white" aria-hidden>
                <Check className="size-5" strokeWidth={3} />
              </span>
              <p className="text-lg font-medium leading-snug text-ink">{p}</p>
            </Appear>
          ))}
        </ul>
      </Section>
      <Section labelledBy="other-services-title" className="pt-0 lg:pt-0">
        <SectionHeading id="other-services-title" title="Other services" align="left" className="mb-10" />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((s, i) => <ServiceCard key={s.slug} service={s} delay={i * 0.08} />)}
        </ul>
      </Section>
      <FaqSection />
      <JsonLd
        data={[
          serviceJsonLd(service),
          faqJsonLd(faqs),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.title, path: `/services/${service.slug}` },
          ]),
        ]}
      />
    </>
  );
}
