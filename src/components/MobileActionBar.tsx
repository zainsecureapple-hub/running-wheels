import { Phone } from "lucide-react";
import { site } from "@/lib/site";

/** Persistent mobile-only quote/call bar, pinned above the safe area. Hidden at md and up. */
export function MobileActionBar() {
  const callHref = site.phone ? `tel:${site.phone}` : "/find-branch";

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-3 border-t border-slate-100 bg-white/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-lg md:hidden">
      <a
        href="/contact#enquiry"
        className="flex h-12 flex-1 items-center justify-center rounded-xl bg-brand text-[15px] font-semibold text-white transition-transform active:scale-[0.98]"
      >
        Get a Quote
      </a>
      <a
        href={callHref}
        className="flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl border border-navy/15 px-5 text-[15px] font-semibold text-navy transition-transform active:scale-[0.98]"
      >
        <Phone className="size-4" aria-hidden />
        Call
      </a>
    </div>
  );
}
