import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { JsonLd } from "@/components/JsonLd";
import { FeatureBlock, FeatureRow } from "@/components/sections/FeatureRow";
import { WhyChooseGrid } from "@/components/sections/WhyChooseGrid";
import { FaqSection } from "@/components/sections/FaqSection";
import { aboutPoints, faqs } from "@/lib/data";
import { images } from "@/lib/images";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About Us — Your Trusted Local Delivery Partner",
  description:
    "Get to know Running Wheels, a dedicated local delivery team committed to reliable service and personal support for individuals and businesses.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        image={images.heroAbout}
        eyebrow="About Us"
        title="Your Trusted Local Delivery Partner"
        description="Get to know Running Wheels, a dedicated local delivery team committed to reliable service, personal support."
      />
      <FeatureBlock
        id="about-intro-title"
        title="Simplifying Deliveries, Building Trust"
        description="From fast, efficient collections to dedicated deliveries, we make every journey reliable, secure and hassle-free across the UK."
      >
        <FeatureRow title="We deliver your way" image={images.about1} imageAlt="Running Wheels van on the road">
          <p>At Running Wheels, we make deliveries simple and hassle-free. Whether it’s a single parcel, a multi-drop delivery, a full removal, or a collection, we get your items where they need to be.</p>
          <p>Our friendly local team works with individuals and businesses to provide reliable, tailored deliveries.</p>
        </FeatureRow>
        {/* NOTE: Figma copy reads "Google the extra mile" — treated as a typo for "Go the extra mile". */}
        <FeatureRow
          title="Go the extra mile"
          image={images.about2}
          imageAlt="Running Wheels driver handing over a parcel"
          imageSide="left"
          points={aboutPoints}
          className="max-md:hidden"
        >
          <p>One local team handles your delivery from first enquiry to final drop, keeping everything clear and personal.</p>
        </FeatureRow>
      </FeatureBlock>
      <WhyChooseGrid />
      <FaqSection />
      <JsonLd data={[faqJsonLd(faqs), breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])]} />
    </>
  );
}
