import { FeatureRow } from "@/components/sections/FeatureRow";
import { images } from "@/lib/images";

/** Standalone "Global Air Freight" row between Industries and FAQ on Home. Figma node 23:977. */
export function FreightSection() {
  return (
    <section aria-labelledby="freight-title" className="bg-white px-5 py-16 max-md:pb-0 max-md:pt-[72px] sm:px-8 lg:px-24 lg:py-20">
      <div className="mx-auto max-w-[1248px]">
        <FeatureRow
          id="freight-title"
          headingLevel="h2"
          title="Global Air Freight, Delivered On Time"
          image={images.homeFreight}
          imageAlt="Air freight cargo being loaded onto a plane at sunset"
          cta={{ label: "Get Free Quote", href: "/contact#enquiry" }}
        >
          <p>From urgent documents to palletised cargo, we arrange fast, secure air freight to international destinations, handling every step from collection to final delivery.</p>
        </FeatureRow>
      </div>
    </section>
  );
}
