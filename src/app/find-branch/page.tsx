import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { JsonLd } from "@/components/JsonLd";
import { BranchDetails, BranchOverview } from "@/components/sections/BranchSections";
import { images } from "@/lib/images";
import { branchJsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Find Your Local Branch — Aberdeen",
  description:
    "Visit the Running Wheels branch at 57 Wellington Street, Aberdeen AB11 5BX. View contact details, opening hours and get directions.",
  path: "/find-branch",
});

export default function FindBranchPage() {
  return (
    <>
      <PageHero
        image={images.heroBranch}
        eyebrow="Our Branch"
        title="Find Your Local Branch"
        description="Visit your nearest Running Wheels branch for friendly service, local support, and reliable delivery solutions."
        contentWidth="max-w-[505px]"
      />
      <BranchOverview />
      <BranchDetails />
      <JsonLd data={[branchJsonLd(), breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Find Branch", path: "/find-branch" }])]} />
    </>
  );
}
