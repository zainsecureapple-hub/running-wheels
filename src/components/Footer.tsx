import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { SocialLinks } from "@/components/ui/Social";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/lib/data";
import { site } from "@/lib/site";

const footerServices = services.filter((s) => ["same-day-delivery", "next-day-delivery", "parcel-delivery", "multi-drop-delivery", "removals"].includes(s.slug));

const linkClass = "text-[15px] font-light text-white/90 transition-colors hover:text-white hover:underline underline-offset-4 max-md:flex max-md:min-h-11 max-md:items-center";

export function Footer() {
  return (
    <footer className="px-5 pb-5 max-md:px-[10px] max-md:pb-24 pt-16 max-md:pt-[72px] lg:pt-24">
      <div className="mx-auto w-full max-w-[1400px] rounded-[32px] max-md:rounded-[28px] bg-navy px-6 pb-8 max-md:pb-7 pt-12 max-md:pt-10 text-white sm:px-10 lg:px-20 lg:pt-16">
        <Reveal as="div" className="flex flex-col items-start max-md:items-center justify-between gap-8 max-md:gap-3.5 lg:flex-row lg:items-center">
          <div className="flex flex-col gap-5 max-md:items-center max-md:gap-3.5 max-md:text-center">
            <h2 className="text-[clamp(2rem,1.4rem+2.4vw,3rem)] font-semibold leading-none tracking-[-0.035em]">Ready When You Are.</h2>
            <p className="text-lg max-md:text-base max-md:leading-[1.5]">Fast, reliable collections and dedicated courier deliveries across the UK.</p>
          </div>
          <Button href="/contact#enquiry" className="max-md:w-full">Get a Quote</Button>
        </Reveal>

        <div className="my-12 max-md:my-8 h-px bg-[rgba(163,163,163,0.15)] lg:my-14" />

        <div className="grid gap-12 max-md:gap-8 lg:grid-cols-[466px_1fr] lg:gap-8">
          <div className="flex flex-col gap-5">
            <Logo height={64} />
            <p className="max-w-[466px] text-[15px] leading-6">
              Your trusted courier partner for fast, secure and dependable deliveries. We keep your business moving with flexible delivery solutions across the United Kingdom.
            </p>
            <SocialLinks />
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 max-md:gap-x-4 max-md:gap-y-8 md:grid-cols-3 lg:justify-self-end lg:gap-[72px]">
            <div className="flex flex-col gap-3.5">
              <p className="text-sm font-bold">Links</p>
              <Link className={linkClass} href="/">Home</Link>
              <Link className={linkClass} href="/services">Services</Link>
              <Link className={linkClass} href="/find-branch">Find Branch</Link>
              <Link className={linkClass} href="/our-team">Our Team</Link>
            </div>
            <div className="flex flex-col gap-3.5">
              <p className="text-sm font-bold">Our Services</p>
              {footerServices.map((s) => (
                <Link key={s.slug} className={linkClass} href={`/services/${s.slug}`}>{s.title}</Link>
              ))}
            </div>
            <div className="flex flex-col gap-3.5">
              <p className="text-sm font-bold">Other</p>
              <Link className={linkClass} href="/about">About</Link>
              <Link className={linkClass} href="/contact">Contact Us</Link>
              <Link className={linkClass} href="/privacy-policy">Privacy Policy</Link>
            </div>
          </nav>
        </div>

        <div className="mb-5 mt-12 max-md:mt-8 h-px bg-[rgba(163,163,163,0.15)]" />
        <p className="text-center text-sm max-md:text-[13px]">
          © {new Date().getFullYear()} {site.name}. All rights reserved. Company no. {site.companyNumber}.
        </p>
      </div>
    </footer>
  );
}
