import clsx from "clsx";
import { stats } from "@/lib/data";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";

export function StatsBand() {
  return (
    <section aria-label="Running Wheels at a glance" className="bg-white px-5 py-12 max-md:pt-8 max-md:pb-0 sm:px-8 lg:p-20">
      <Reveal as="div" className="mx-auto max-w-[1280px] rounded-[20px] max-md:rounded-3xl bg-navy p-4 max-md:p-2 text-white sm:p-8">
        <dl className="grid grid-cols-2 gap-y-2 lg:grid-cols-4 lg:gap-y-0">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={clsx(
                "flex flex-col items-center gap-4 max-md:gap-1.5 px-4 py-8 max-md:py-6 text-center",
                i > 0 && "lg:border-l lg:border-white/20",
                i % 2 === 1 && "max-md:border-l max-md:border-white/20",
                i >= 2 && "max-md:border-t max-md:border-white/20",
              )}
            >
              <dt className="order-2 text-lg max-md:text-[15px] font-semibold max-md:font-medium leading-[1.15] max-md:leading-[1.35] tracking-[-0.02em] max-md:tracking-normal md:text-xl">
                {s.label}
              </dt>
              <CountUp
                as="dd"
                value={s.value}
                className="order-1 text-[clamp(2.25rem,1.6rem+2.4vw,3.5rem)] max-md:text-[44px] font-semibold leading-[1.15] max-md:leading-none tracking-[-0.02em]"
              />
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
