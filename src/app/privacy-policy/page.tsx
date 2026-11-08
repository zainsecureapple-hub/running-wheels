import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { images } from "@/lib/images";
import { buildMetadata } from "@/lib/seo";
import { fullAddress, site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How Running Wheels collects, uses and protects the information you share through this website.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        image={images.heroAbout}
        eyebrow="Legal"
        title="Privacy Policy"
        description="How we collect, use and protect the information you share with us."
        size="compact"
      />
      <section className="px-5 py-16 sm:px-8 lg:py-20">
        {/* TODO(client): template text — have this reviewed against UK GDPR before launch. */}
        <div className="mx-auto flex max-w-[760px] flex-col gap-8 text-base leading-[1.7] text-body">
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-semibold tracking-[-0.02em] text-ink">Who we are</h2>
            <p>{site.legalName} (company number {site.companyNumber}), {fullAddress}, is responsible for the personal information collected through this website.</p>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-semibold tracking-[-0.02em] text-ink">What we collect</h2>
            <p>When you submit the enquiry form we collect the details you provide: your name, company, email address, telephone number, collection and delivery addresses and job details.</p>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-semibold tracking-[-0.02em] text-ink">How we use it</h2>
            <p>We use your information only to respond to your enquiry, provide a quote and deliver the service you request. We do not sell your data.</p>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-semibold tracking-[-0.02em] text-ink">Your rights</h2>
            <p>Under UK data protection law you can ask to access, correct or delete the personal data we hold about you, and to object to or restrict how we use it.</p>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-semibold tracking-[-0.02em] text-ink">Contact</h2>
            <p>Questions about this policy? Use the <a className="font-semibold text-brand underline underline-offset-2" href="/contact#enquiry">enquiry form</a> and mark it for the attention of data protection.</p>
          </div>
        </div>
      </section>
    </>
  );
}
