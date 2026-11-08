import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Appear } from "@/components/ui/Appear";
import { industries } from "@/lib/data";

export function IndustriesSection() {
  return (
    <section aria-labelledby="industries-title" className="px-5 py-16 max-md:pb-0 max-md:pt-[72px] sm:px-8 lg:p-20">
      <div className="mx-auto flex max-w-[816px] flex-col items-center gap-10 max-md:items-start max-md:gap-7 text-center max-md:text-left">
        <Reveal as="h2" id="industries-title" className="t-h2 text-ink">
          Whatever your industry,<br className="hidden sm:block" /> we’re there.
        </Reveal>
        <ul className="flex flex-wrap justify-center gap-3 max-md:justify-start max-md:gap-2.5">
          {industries.map((name, i) => (
            <Appear
              as="li"
              key={name}
              variant="rise12"
              delay={(i % 7) * 0.04}
              className="rounded-full border border-line px-5 py-3 text-[15px] font-medium text-ink max-md:px-[18px] max-md:py-[11px]"
            >
              {name}
            </Appear>
          ))}
        </ul>
        <div className="pt-2 max-md:w-full max-md:pt-0">
          <Button href="/contact#enquiry">For your Industry</Button>
        </div>
      </div>
    </section>
  );
}
