import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { JsonLd } from "@/components/JsonLd";
import { ContactDetails } from "@/components/sections/ContactDetails";
import { EnquiryForm } from "@/components/sections/EnquiryForm";
import { images } from "@/lib/images";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us — Get a Delivery Quote",
  description:
    "Need a courier quote? Send an enquiry to the Running Wheels team in Aberdeen for same-day, multi-drop, dedicated deliveries and removals.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        image={images.heroContact}
        eyebrow="Contact Us"
        title="Let's Get Your Delivery Moving"
        description="Have a question or need a delivery quote? Get in touch with our friendly team, and we'll be happy to help with your requirements."
        cta={{ label: "View Services", href: "/services" }}
      />
      <section aria-label="Contact details and enquiry form" className="px-5 py-16 sm:px-8 lg:px-[100px] lg:py-20">
        <div className="mx-auto grid max-w-[1240px] items-start gap-8 lg:grid-cols-[400px_1fr] lg:gap-8">
          <ContactDetails />
          <EnquiryForm />
        </div>
      </section>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Contact Us", path: "/contact" }])} />
    </>
  );
}
