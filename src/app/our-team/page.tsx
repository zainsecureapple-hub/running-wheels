import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { JsonLd } from "@/components/JsonLd";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { BranchDetails } from "@/components/sections/BranchSections";
import { images } from "@/lib/images";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Meet Our Team — The People Behind Every Delivery",
  description:
    "A local team based at 57 Wellington Street, Aberdeen, looking after collections, deliveries and removals for homes and businesses.",
  path: "/our-team",
});

export default function OurTeamPage() {
  return (
    <>
      <PageHero
        image={images.heroTeam}
        eyebrow="Our Team"
        title="Meet the Team Behind Running Wheels"
        description="A local team based at 57 Wellington Street, Aberdeen, looking after collections, deliveries and removals for homes and businesses."
        contentWidth="max-w-[577px]"
      />
      <TeamGrid />
      <BranchDetails />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Our Team", path: "/our-team" }])} />
    </>
  );
}
