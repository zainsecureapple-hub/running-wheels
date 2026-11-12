import Image from "next/image";
import { team } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { Appear } from "@/components/ui/Appear";

export function TeamGrid() {
  return (
    <section aria-labelledby="team-title" className="px-5 py-16 sm:px-8 lg:px-20 lg:py-[120px]">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-12">
        <Reveal as="div" className="flex max-w-[594px] flex-col items-center gap-4 text-center">
          <h2 id="team-title" className="t-h2 text-ink">The people behind every delivery</h2>
          <p className="t-lead">From the office to the road, these are the people who look after your collections and deliveries.</p>
        </Reveal>
        <ul className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m, i) => (
            <Appear as="li" key={m.name} variant="rise24" delay={(i % 3) * 0.08} className="card-hover overflow-hidden rounded-[20px] bg-surface">
              <div className="relative h-[300px] overflow-hidden bg-photo">
                <Image src={m.image} alt={`${m.name}, ${m.role} at Running Wheels`} fill sizes="(min-width: 1024px) 410px, (min-width: 640px) 50vw, 100vw" className="img-zoom object-cover" />
              </div>
              <div className="flex flex-col gap-1.5 px-[22px] pb-6 pt-5">
                <h3 className="text-xl font-semibold tracking-[-0.02em] text-ink">{m.name}</h3>
                <p className="text-sm font-medium text-brand">{m.role}</p>
                <p className="text-[15px] leading-normal text-muted">{m.bio}</p>
              </div>
            </Appear>
          ))}
        </ul>
      </div>
    </section>
  );
}
