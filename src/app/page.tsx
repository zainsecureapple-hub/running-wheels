import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { HeroFloatingCard } from "@/components/HeroFloatingCard";
import { JsonLd } from "@/components/JsonLd";
import { WhySection } from "@/components/sections/WhySection";
import { StatsBand } from "@/components/sections/StatsBand";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { FeatureBlock, FeatureRow } from "@/components/sections/FeatureRow";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { FreightSection } from "@/components/sections/FreightSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { faqs } from "@/lib/data";
import { images } from "@/lib/images";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Dedicated Courier Solutions in Aberdeen & Across the UK",
    description:
      "Fast, secure and reliable courier services from Running Wheels — same-day, next-day, multi-drop and dedicated deliveries across the UK, with collection within the hour.",
    path: "/",
  }),
  title: { absolute: "Running Wheels | Dedicated Courier Solutions in Aberdeen & Across the UK" },
};

export default function HomePage() {
  return (
    <>
      <PageHero
        image={images.heroHome}
        eyebrow="Trusted • Reliable • Always on time"
        title="Dedicated Courier Solutions You Can Trust"
        description="We provide fast, secure and reliable courier services for urgent parcels and business deliveries across the UK."
        aside={<HeroFloatingCard />}
      />
      <WhySection />
      <StatsBand />
      <ServicesSection />
      <FeatureBlock
        id="simplifying-title"
        title="Simplifying Deliveries, Building Trust"
        description="From fast, efficient collections to dedicated deliveries, we make every journey reliable, secure and hassle-free across the UK."
      >
        <FeatureRow
          title="Fast, Efficient & Reliable Courier Deliveries"
          image={images.homeFeature1}
          imageAlt="Running Wheels delivery van travelling at speed"
          cta={{ label: "Get Free Quote", href: "/contact#enquiry" }}
        >
          <p>We provide prompt collection and same-day delivery services, ensuring your parcels reach their destination quickly, safely and on time.</p>
        </FeatureRow>
        <FeatureRow
          title="Dedicated Delivery You Can Trust"
          image={images.homeFeature2}
          imageAlt="Running Wheels driver carrying a parcel"
          imageSide="left"
          cta={{ label: "Get Free Quote", href: "/contact#enquiry" }}
        >
          <p>Your deliveries receive our full attention, with direct, secure transport and no co-loading, giving you complete peace of mind.</p>
        </FeatureRow>
      </FeatureBlock>
      <IndustriesSection />
      <FreightSection />
      <FaqSection />
      <JsonLd data={faqJsonLd(faqs)} />
    </>
  );
}
