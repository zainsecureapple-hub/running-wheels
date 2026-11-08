import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { JsonLd } from "@/components/JsonLd";
import { WhySection } from "@/components/sections/WhySection";
import { StatsBand } from "@/components/sections/StatsBand";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { FeatureBlock, FeatureRow } from "@/components/sections/FeatureRow";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
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

function FloatingCard() {
  return (
    <div className="flex flex-col gap-3.5 rounded-3xl border border-white bg-white/95 px-3 pb-[18px] pt-3 backdrop-blur-xl">
      <div className="relative h-44 overflow-hidden rounded-2xl bg-ink">
        <Image src={images.homeFloatingCard} alt="Retail and eCommerce parcels being prepared for delivery" fill sizes="294px" className="object-cover" />
      </div>
      <div className="flex flex-col gap-1.5 px-1.5">
        <div className="flex items-center justify-between">
          <p className="text-base font-semibold text-ink">Retail &amp; eCommerce</p>
          <span className="flex gap-1" aria-hidden>
            <span className="size-2 rounded-full bg-ink" />
            <span className="size-2 rounded-full bg-ink/25" />
            <span className="size-2 rounded-full bg-ink/25" />
          </span>
        </div>
        <p className="text-[13px] text-ink">Ecommerce orders moving quickly, securely</p>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <PageHero
        image={images.heroHome}
        eyebrow="Trusted • Reliable • Always on time"
        title="Dedicated Courier Solutions You Can Trust"
        description="We provide fast, secure and reliable courier services for urgent parcels and business deliveries across the UK."
        aside={<FloatingCard />}
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
      <FaqSection />
      <JsonLd data={faqJsonLd(faqs)} />
    </>
  );
}
