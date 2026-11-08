"use client";

import { useState, type FormEvent } from "react";
import clsx from "clsx";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { enquirySchema } from "@/lib/enquiry-schema";
import { services } from "@/lib/data";

type Errors = Partial<Record<string, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const inputBase =
  "w-full rounded-[14px] border bg-white px-[18px] text-[15px] text-ink placeholder:text-muted transition-colors focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/15";

function Field({
  name, label, required, error, children,
}: { name: string; label: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-medium text-ink">
        {label}{required && <span aria-hidden> *</span>}
      </label>
      {children}
      {error && <p id={`${name}-error`} className="text-[13px] text-brand" role="alert">{error}</p>}
    </div>
  );
}

function GroupTitle({ children, line = true }: { children: string; line?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">{children}</h3>
      {line && <span className="h-px flex-1 bg-line" aria-hidden />}
    </div>
  );
}

export function EnquiryForm({ defaultService }: { defaultService?: string }) {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");

  const input = (name: string, extra?: object) => ({
    id: name,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
    className: clsx(inputBase, "h-[54px]", errors[name] ? "border-brand" : "border-line"),
    ...extra,
  });
  const textarea = (name: string, extra?: object) => ({
    ...input(name, extra),
    className: clsx(inputBase, "min-h-[120px] resize-y py-4", errors[name] ? "border-brand" : "border-line"),
  });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const raw = Object.fromEntries(new FormData(form).entries());
    const parsed = enquirySchema.safeParse({ ...raw, consent: raw.consent === "on" });

    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] ??= issue.message;
      setErrors(next);
      setStatus("idle");
      document.getElementById(Object.keys(next)[0])?.focus();
      return;
    }

    setErrors({});
    setStatus("submitting");
    setServerError("");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? "Something went wrong. Please try again.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div id="enquiry" role="status" className="enter-fade-up flex flex-col items-start gap-5 rounded-[32px] border border-line p-8 shadow-form sm:p-12">
        <span className="flex size-12 items-center justify-center rounded-full bg-brand text-white" aria-hidden><Check className="size-6" /></span>
        <h2 className="text-[clamp(1.75rem,1.4rem+1.2vw,2rem)] font-semibold tracking-[-0.03em] text-ink">Thanks — your enquiry is in.</h2>
        <p className="t-lead">We’ll review your details and come back to you with a quote as soon as we can.</p>
        <Button type="button" variant="outline" onClick={() => setStatus("idle")}>Send another enquiry</Button>
      </div>
    );
  }

  return (
    <form id="enquiry" onSubmit={onSubmit} noValidate className="flex flex-col gap-7 rounded-[32px] border border-line bg-white p-6 shadow-form sm:p-12">
      <div className="flex flex-col gap-2">
        <h2 className="text-[clamp(1.75rem,1.4rem+1.2vw,2rem)] font-semibold tracking-[-0.03em] text-ink">Make an enquiry</h2>
        <p className="text-sm text-muted">Fields marked * are required.</p>
      </div>

      {/* Honeypot — hidden from people and assistive tech */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Reveal as="fieldset" className="flex flex-col gap-[18px]">
        <legend className="sr-only">Your details</legend>
        <GroupTitle>Your details</GroupTitle>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field name="fullName" label="Full name" required error={errors.fullName}>
            <input {...input("fullName", { type: "text", autoComplete: "name", placeholder: "Enter your full name" })} />
          </Field>
          <Field name="company" label="Company / business name" error={errors.company}>
            <input {...input("company", { type: "text", autoComplete: "organization", placeholder: "Optional" })} />
          </Field>
          <Field name="email" label="Email address" required error={errors.email}>
            <input {...input("email", { type: "email", autoComplete: "email", placeholder: "name@example.com" })} />
          </Field>
          <Field name="phone" label="Contact telephone number" required error={errors.phone}>
            <input {...input("phone", { type: "tel", autoComplete: "tel", placeholder: "Your phone number" })} />
          </Field>
        </div>
      </Reveal>

      <Reveal as="fieldset" delay={0.06} className="flex flex-col gap-[18px]">
        <legend className="sr-only">Job details</legend>
        <GroupTitle>Job details</GroupTitle>
        <Field name="service" label="Service required" required error={errors.service}>
          <div className="relative">
            <select {...input("service", { defaultValue: defaultService ?? "" })} className={clsx(inputBase, "h-[54px] appearance-none pr-11", errors.service ? "border-brand" : "border-line")}>
              <option value="" disabled>Select a service</option>
              {services.map((s) => <option key={s.slug} value={s.title}>{s.title}</option>)}
              <option value="Other">Other</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-[18px] top-1/2 size-[18px] -translate-y-1/2 text-muted" aria-hidden />
          </div>
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field name="collectionAddress" label="Collection address / postcode" required error={errors.collectionAddress}>
            <input {...input("collectionAddress", { type: "text", autoComplete: "street-address", placeholder: "e.g. AB11 5BX" })} />
          </Field>
          <Field name="deliveryAddress" label="Delivery address / postcode" required error={errors.deliveryAddress}>
            <input {...input("deliveryAddress", { type: "text", placeholder: "e.g. AB10 1AA" })} />
          </Field>
          <Field name="collectionDateTime" label="Preferred collection date & time" required error={errors.collectionDateTime}>
            <input {...input("collectionDateTime", { type: "datetime-local" })} />
          </Field>
          <Field name="deliveryRequirement" label="Delivery date / time requirement" error={errors.deliveryRequirement}>
            <input {...input("deliveryRequirement", { type: "text", placeholder: "If applicable" })} />
          </Field>
        </div>
        <Field name="jobDetails" label="Parcel or job details" required error={errors.jobDetails}>
          <textarea {...textarea("jobDetails", { placeholder: "Item type, quantity, approximate size and weight" })} />
        </Field>
      </Reveal>

      <Reveal as="fieldset" delay={0.12} className="flex flex-col gap-[18px]">
        <legend className="sr-only">Multi-drop (if applicable)</legend>
        <GroupTitle line={false}>Multi-drop (if applicable)</GroupTitle>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field name="stops" label="Number of stops" error={errors.stops}>
            <input {...input("stops", { type: "text", inputMode: "numeric", placeholder: "e.g. 5" })} />
          </Field>
          <Field name="routeDetails" label="Route details" error={errors.routeDetails}>
            <input {...input("routeDetails", { type: "text", placeholder: "If known" })} />
          </Field>
        </div>
      </Reveal>

      <Reveal as="fieldset" delay={0.18} className="flex flex-col gap-[18px]">
        <legend className="sr-only">Removals (if applicable)</legend>
        <GroupTitle line={false}>Removals (if applicable)</GroupTitle>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field name="propertyType" label="Property / business type" error={errors.propertyType}>
            <input {...input("propertyType", { type: "text", placeholder: "e.g. 2-bed flat, small office" })} />
          </Field>
          <Field name="volume" label="Approximate volume" error={errors.volume}>
            <input {...input("volume", { type: "text", placeholder: "e.g. half a van" })} />
          </Field>
        </div>
        <Field name="accessNotes" label="Access / parking notes" error={errors.accessNotes}>
          <input {...input("accessNotes", { type: "text", placeholder: "Stairs, lifts, loading bays, parking restrictions" })} />
        </Field>
      </Reveal>

      <Reveal as="fieldset" delay={0.24} className="flex flex-col gap-[18px]">
        <legend className="sr-only">Anything else?</legend>
        <GroupTitle line={false}>Anything else?</GroupTitle>
        <Field name="message" label="Additional information / message" error={errors.message}>
          <textarea {...textarea("message", { placeholder: "Tell us anything else that would help" })} />
        </Field>
      </Reveal>

      <div className="flex flex-col gap-2">
        <label htmlFor="consent" className="flex cursor-pointer items-start gap-3">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            className="peer sr-only"
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? "consent-error" : undefined}
          />
          <span className="mt-0.5 flex size-[22px] shrink-0 items-center justify-center rounded-md border border-line bg-white text-transparent transition-colors peer-checked:border-brand peer-checked:bg-brand peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-brand/40">
            <Check className="size-3.5" strokeWidth={3} aria-hidden />
          </span>
          <span className="text-sm leading-[1.55] text-muted">
            I agree to Running Wheels using the information I’ve submitted to respond to my enquiry. Read our{" "}
            <a href="/privacy-policy" className="font-semibold text-brand underline underline-offset-2">Privacy Policy</a>. *
          </span>
        </label>
        {errors.consent && <p id="consent-error" className="text-[13px] text-brand" role="alert">{errors.consent}</p>}
      </div>

      {status === "error" && <p role="alert" className="rounded-[14px] bg-brand-tint px-4 py-3 text-sm text-brand-dark">{serverError}</p>}

      <div>
        <Button type="submit" icon={ArrowRight} disabled={status === "submitting"} className="pl-[22px]">
          {status === "submitting" ? "Sending…" : "Send Enquiry"}
        </Button>
      </div>
    </form>
  );
}
