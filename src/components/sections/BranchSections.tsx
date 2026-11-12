import { Building2, Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { Button, TextLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Appear } from "@/components/ui/Appear";
import { directionsUrl, fullAddress, mapEmbedUrl, site } from "@/lib/site";

const callHref = site.phone ? `tel:${site.phone.replace(/\s+/g, "")}` : "/contact#enquiry";

export function BranchOverview() {
  return (
    <section aria-labelledby="branch-overview-title" className="px-5 py-16 sm:px-8 lg:px-[100px] lg:py-20">
      <div className="mx-auto flex max-w-[1240px] flex-col items-center gap-14">
        <Reveal as="div" className="flex max-w-[658px] flex-col items-center gap-5 text-center">
          <h2 id="branch-overview-title" className="t-h2 text-ink">Find Your Nearest Branch</h2>
          <p className="t-lead max-w-[612px]">
            Explore our branch location, view contact details, and get directions for a quick and convenient visit.
          </p>
        </Reveal>

        <div className="grid w-full gap-6 overflow-x-hidden lg:grid-cols-2">
          <Appear variant="slide-left" className="flex items-center justify-center rounded-[20px] bg-surface p-8 sm:p-12 lg:min-h-[488px]">
            <div className="flex w-full max-w-[452px] flex-col gap-12">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <div className="flex flex-1 flex-col items-start gap-2">
                    <span className="rounded-full bg-brand-tint px-2.5 py-1 text-xs font-semibold tracking-[0.02em] text-brand">Head office</span>
                    <h3 className="text-2xl font-semibold tracking-[-0.02em] text-ink">{site.address.city}</h3>
                  </div>
                  <span className="flex size-11 items-center justify-center rounded-full bg-white text-brand" aria-hidden>
                    <Building2 className="size-5" />
                  </span>
                </div>
                <ul className="flex flex-col gap-3.5 text-base leading-normal">
                  <li className="flex items-start gap-3 text-ink"><MapPin className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden /><address className="not-italic">{fullAddress}</address></li>
                  <li className="flex items-start gap-3 text-muted"><Phone className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden />{site.phone ?? "Phone number to be confirmed"}</li>
                  <li className="flex items-start gap-3 text-muted"><Mail className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden />{site.email ?? "Email address to be confirmed"}</li>
                  <li className="flex items-start gap-3 text-muted"><Clock className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden />{site.hoursSummary}</li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button href={directionsUrl}>Get Direction</Button>
                <Button href={callHref} variant="soft" icon={Phone} className="pl-6">Call Branch</Button>
              </div>
            </div>
          </Appear>
          <Appear variant="slide-right" delay={0.1} className="relative min-h-[300px] overflow-hidden rounded-[20px] bg-[#eaf2fb] sm:min-h-[380px] lg:min-h-[488px]">
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Running Wheels Aberdeen location"
              className="absolute inset-0"
            />
          </Appear>
        </div>
      </div>
    </section>
  );
}

function DetailCard({ icon: Icon, title, children }: { icon: typeof Clock; title: string; children: React.ReactNode }) {
  return (
    <div className="flex min-h-[291px] flex-col gap-6 rounded-[20px] border border-line bg-white px-8 py-9 sm:px-10">
      <div className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-full bg-brand-tint text-brand" aria-hidden>
          <Icon className="size-[18px]" />
        </span>
        <h3 className="text-lg font-semibold tracking-[-0.01em] text-ink">{title}</h3>
      </div>
      {children}
    </div>
  );
}

export function BranchDetails({ title = "Branch details", description = "Everything you need before you visit, call or send us an enquiry." }: { title?: string; description?: string }) {
  return (
    <section aria-labelledby="branch-details-title" className="px-5 pb-24 pt-16 sm:px-8 lg:px-20 lg:pb-40 lg:pt-20">
      <div className="mx-auto flex max-w-[1172px] flex-col items-center gap-12">
        <Reveal as="div" className="flex flex-col items-center gap-4 text-center">
          <h2 id="branch-details-title" className="t-h2 text-ink">{title}</h2>
          <p className="t-lead">{description}</p>
        </Reveal>

        <div className="flex w-full flex-col gap-8">
          <Reveal className="flex flex-col gap-6 rounded-[20px] bg-surface px-6 py-8 sm:px-10 lg:flex-row lg:items-center">
            <span className="flex size-16 shrink-0 items-center justify-center rounded-full border-4 border-navy/25 bg-navy text-white" aria-hidden>
              <MapPin className="size-7" />
            </span>
            <div className="flex flex-1 flex-col gap-1.5">
              <h3 className="text-[clamp(1.4rem,1.1rem+1vw,1.75rem)] font-semibold tracking-[-0.02em] text-ink">{site.name} {site.address.city}</h3>
              <p className="text-[17px] text-body">{fullAddress}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href={callHref} variant="soft" icon={Phone} className="pl-6">Call Branch</Button>
              <Button href={directionsUrl} icon={Navigation} className="pl-6">Get Directions</Button>
            </div>
          </Reveal>

          <div className="grid gap-4 lg:grid-cols-3">
            <Appear variant="rise24" delay={0}>
              <DetailCard icon={Clock} title="Opening hours">
                <dl className="flex flex-1 flex-col justify-center gap-3.5 text-[15px]">
                  {site.hours.map((h) => (
                    <div key={h.day} className="flex items-center justify-between gap-4">
                      <dt className="font-medium text-ink">{h.day}</dt>
                      <dd className="text-muted">{h.time}</dd>
                    </div>
                  ))}
                </dl>
              </DetailCard>
            </Appear>

            <Appear variant="rise24" delay={0.08}>
              <DetailCard icon={Phone} title="Contact">
                <div className="flex flex-1 flex-col justify-center gap-[18px]">
                  <p className="flex items-center gap-3"><Phone className="size-5 text-muted" aria-hidden />
                    <span className="flex flex-col gap-0.5 font-medium text-muted"><span className="text-[13px]">Phone</span><span className="text-[15px]">{site.phone ?? "To be confirmed"}</span></span>
                  </p>
                  <p className="flex items-center gap-3"><Mail className="size-5 text-muted" aria-hidden />
                    <span className="flex flex-col gap-0.5 font-medium text-muted"><span className="text-[13px]">Email</span><span className="text-[15px]">{site.email ?? "To be confirmed"}</span></span>
                  </p>
                  <TextLink href="/contact#enquiry" className="font-semibold text-brand">Send an enquiry</TextLink>
                </div>
              </DetailCard>
            </Appear>

            <Appear variant="rise24" delay={0.16}>
              <DetailCard icon={Building2} title="Company details">
                <dl className="flex flex-1 flex-col justify-center gap-4 font-medium">
                  <div><dt className="text-[13px] text-muted">Business name</dt><dd className="text-[15px] leading-normal text-ink">{site.legalName}</dd></div>
                  <div><dt className="text-[13px] text-muted">Registered address</dt><dd className="text-[15px] leading-normal text-ink">{fullAddress}</dd></div>
                  <div><dt className="text-[13px] text-muted">Company number</dt><dd className="text-[15px] leading-normal text-ink">{site.companyNumber}</dd></div>
                </dl>
              </DetailCard>
            </Appear>
          </div>
        </div>
      </div>
    </section>
  );
}
