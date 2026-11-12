import clsx from "clsx";
import { Truck, Package, MapPin, Check, ChevronLeft, ChevronRight, CalendarCheck, User, Circle } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Appear } from "@/components/ui/Appear";

/** Illustrative "service picker" mockup for step 1. Not real app UI — a decorative stand-in. */
function ServiceRow({ icon: Icon, title, subtitle, selected }: { icon: typeof Truck; title: string; subtitle: string; selected?: boolean }) {
  return (
    <div className={clsx("flex w-full items-center gap-2 rounded-lg border px-2.5 py-2", selected ? "border-brand bg-brand-tint shadow-sm" : "border-line bg-white")}>
      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand/10">
        <Icon className="size-3.5 text-brand" />
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="text-[11px] font-semibold leading-tight text-ink">{title}</span>
        <span className="text-[9px] leading-tight text-muted">{subtitle}</span>
      </span>
      <span className={clsx("flex size-3.5 shrink-0 items-center justify-center rounded-full", selected ? "bg-brand" : "border border-line bg-white")}>
        {selected && <Check className="size-2 text-white" strokeWidth={3} />}
      </span>
    </div>
  );
}

function ChooseServiceVisual() {
  return (
    <div className="flex w-[260px] flex-col gap-2.5 rounded-lg bg-white p-4 shadow-sm">
      <p className="text-[10px] font-semibold text-muted">Choose a service</p>
      <ServiceRow icon={Truck} title="Same-Day Delivery" subtitle="Collected & delivered today" />
      <ServiceRow icon={Package} title="Parcel Delivery" subtitle="Individuals & businesses" selected />
      <ServiceRow icon={MapPin} title="Multi-Drop Delivery" subtitle="Multiple stops, one run" />
    </div>
  );
}

const WEEK = [
  { day: "Mon", date: 16 },
  { day: "Tue", date: 17, selected: true },
  { day: "Wed", date: 18 },
  { day: "Thu", date: 19 },
  { day: "Fri", date: 20 },
];
const SLOTS = [{ time: "9:00 AM" }, { time: "10:00 AM", selected: true }, { time: "2:30 PM" }];

function BookingCalendarVisual() {
  return (
    <div className="flex w-[260px] flex-col gap-2.5 rounded-lg bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold text-ink">November 2026</p>
        <div className="flex gap-1">
          <span className="flex size-[19px] items-center justify-center rounded-md border border-line">
            <ChevronLeft className="size-2.5 text-ink" />
          </span>
          <span className="flex size-[19px] items-center justify-center rounded-md border border-line">
            <ChevronRight className="size-2.5 text-ink" />
          </span>
        </div>
      </div>
      <div className="flex gap-1.5">
        {WEEK.map((d) => (
          <div key={d.day} className={clsx("flex flex-1 flex-col items-center gap-0.5 rounded-md py-1.5", d.selected ? "bg-brand text-white" : "bg-surface text-ink")}>
            <span className={clsx("text-[9px] font-medium", !d.selected && "text-muted")}>{d.day}</span>
            <span className="text-[13px] font-semibold">{d.date}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-1.5">
        {SLOTS.map((s) => (
          <div
            key={s.time}
            className={clsx(
              "flex flex-1 items-center justify-center rounded-md border py-1.5 text-[10px] font-semibold",
              s.selected ? "border-brand bg-brand-tint text-brand" : "border-line bg-white text-muted",
            )}
          >
            {s.time}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-2 rounded bg-navy py-2 text-[11px] font-semibold text-white">
        <CalendarCheck className="size-3" />
        Confirm collection: Tue, 10:00 AM
      </div>
    </div>
  );
}

const TRACKING_STEPS = [
  { label: "Enquiry received", status: "Done", state: "done" },
  { label: "Booking confirmed", status: "Done", state: "done" },
  { label: "Out for collection", status: "In progress", state: "active" },
  { label: "Delivered", status: "Up next", state: "pending" },
] as const;

function LiveTrackingVisual() {
  return (
    <div className="flex w-[260px] flex-col gap-3 rounded-lg bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex size-[23px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-teal-700">
            <User className="size-3 text-white" />
          </span>
          <p className="text-[11px] font-semibold text-ink">Driver on the way</p>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-brand-tint px-2 py-0.5">
          <Circle className="size-1.5 fill-brand text-brand" />
          <span className="text-[9px] font-semibold text-brand">Live</span>
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {TRACKING_STEPS.map((s) => (
          <div key={s.label} className="flex items-center gap-2">
            <span
              className={clsx(
                "flex size-4 shrink-0 items-center justify-center rounded-full",
                s.state === "pending" ? "border border-line bg-white" : "bg-brand",
              )}
            >
              {s.state === "done" && <Check className="size-2.5 text-white" strokeWidth={3} />}
              {s.state === "active" && <Circle className="size-1.5 fill-white text-white" />}
            </span>
            <span className={clsx("flex-1 text-[11px] font-medium", s.state === "pending" ? "text-muted" : "text-ink")}>{s.label}</span>
            <span className={clsx("text-[10px] font-medium", s.state === "pending" ? "text-muted" : "text-brand")}>{s.status}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-muted">Delivery progress</span>
          <span className="font-semibold text-brand">70%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-brand-tint">
          <div className="h-full w-[70%] rounded-full bg-brand" />
        </div>
      </div>
    </div>
  );
}

const STEPS = [
  { title: "1. Tell us what you need", description: "Choose a service and share your collection, delivery and item details.", visual: <ChooseServiceVisual /> },
  { title: "2. Confirm your booking", description: "We'll reply with a quote. Confirm your preferred collection date and time.", visual: <BookingCalendarVisual /> },
  { title: "3. We collect & deliver", description: "Our driver collects your items and delivers them to the agreed address.", visual: <LiveTrackingVisual /> },
];

/** "Order a Delivery in 3 Simple Steps" — Figma node 2:813. */
export function HowItWorksSection() {
  return (
    <Section labelledBy="how-it-works-title">
      <SectionHeading id="how-it-works-title" title="Order a Delivery in 3 Simple Steps" description="Booking a courier with Running Wheels is quick and easy." className="mb-12 lg:mb-14" />
      <ul className="grid gap-6 md:grid-cols-3">
        {STEPS.map((step, i) => (
          <Appear as="li" key={step.title} variant="rise24" delay={i * 0.08} className="flex flex-col gap-6">
            <div className="flex h-[280px] w-full items-center justify-center rounded-[14px] border-[6px] border-white bg-surface">
              {step.visual}
            </div>
            <div className="flex flex-col gap-2.5 px-1">
              <h3 className="text-xl font-semibold tracking-[-0.02em] text-ink">{step.title}</h3>
              <p className="text-base leading-[1.55] text-muted">{step.description}</p>
            </div>
          </Appear>
        ))}
      </ul>
    </Section>
  );
}
