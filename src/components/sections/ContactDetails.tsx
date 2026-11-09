import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { directionsUrl, site } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { Appear } from "@/components/ui/Appear";

function Card({ icon: Icon, label, children, delay = 0 }: { icon: typeof Clock; label: string; children: React.ReactNode; delay?: number }) {
  return (
    <Appear variant="rise24" delay={delay} className="flex items-start gap-4 rounded-[20px] bg-surface p-5">
      <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white text-brand" aria-hidden>
        <Icon className="size-5" />
      </span>
      <div className="flex flex-1 flex-col gap-1">
        <p className="text-sm font-medium text-muted">{label}</p>
        {children}
      </div>
    </Appear>
  );
}

export function ContactDetails() {
  return (
    <div className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
      <Reveal as="div" className="flex flex-col gap-[18px]">
        <p className="text-xs font-medium uppercase tracking-[0.32em] text-muted">Contact</p>
        <h2 className="text-[clamp(2.25rem,1.6rem+2.2vw,3rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-ink">
          Talk to <span className="text-brand">us.</span>
        </h2>
      </Reveal>
      <p className="max-w-[325px] text-base leading-[1.6] text-muted">Fill in the enquiry form, or reach us using the details below.</p>
      <div className="h-2" aria-hidden />

      <Card icon={MapPin} label="Registered office" delay={0}>
        <address className="text-base font-semibold not-italic leading-[1.4] text-ink">
          {site.address.street},<br />{site.address.city}, {site.address.postcode}
        </address>
        <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="text-[13px] font-semibold text-brand hover:underline">
          Get directions →
        </a>
      </Card>
      <Card icon={Phone} label="Telephone" delay={0.06}>
        {site.phone ? (
          <a href={`tel:${site.phone.replace(/\s+/g, "")}`} className="text-base font-semibold text-ink">{site.phone}</a>
        ) : (
          <p className="text-base font-semibold text-muted">To be confirmed</p>
        )}
      </Card>
      <Card icon={Mail} label="Email" delay={0.12}>
        {site.email ? (
          <a href={`mailto:${site.email}`} className="text-base font-semibold text-ink">{site.email}</a>
        ) : (
          <p className="text-base font-semibold text-muted">To be confirmed</p>
        )}
      </Card>
      <Card icon={Clock} label="Opening hours" delay={0.18}>
        <p className="text-base font-semibold text-muted">To be confirmed</p>
      </Card>
    </div>
  );
}
