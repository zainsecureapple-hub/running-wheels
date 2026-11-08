import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { JsonLd } from "@/components/JsonLd";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { FeatureBlock, FeatureRow } from "@/components/sections/FeatureRow";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { faqs } from "@/lib/data";
import { images } from "@/lib/images";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Courier Services — Same-Day, Next-Day, Multi-Drop & Removals",
  description:
    "Explore Running Wheels courier services: same-day and next-day delivery, parcels, documents, multi-drop, temperature-controlled, freight and removals across the UK.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        image={images.heroHome}
        eyebrow="Our Services"
        title="Courier Services Built Around Your Delivery"
        description="From urgent same-day runs to multi-drop routes and removals, choose the service that fits your job."
        cta={{ label: "Get a Quote", href: "/contact#enquiry" }}
      />
      <ServicesSection showAll />
      <FeatureBlock
        id="services-trust-title"
        title="Simplifying Deliveries, Building Trust"
        description="One local team from enquiry to delivery, with quotes based on your job, distance and vehicle."
      >
        <FeatureRow
          title="Dedicated Delivery You Can Trust"
          image={images.homeFeature2}
          imageAlt="Running Wheels driver carrying a parcel"
          cta={{ label: "Get Free Quote", href: "/contact#enquiry" }}
        >
          <p>Your deliveries receive our full attention, with direct, secure transport and no co-loading, giving you complete peace of mind.</p>
        </FeatureRow>
      </FeatureBlock>
      <IndustriesSection />
      <FaqSection />
      <JsonLd data={[faqJsonLd(faqs), breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }])]} />
    </>
  );
}
