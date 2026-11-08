import Image from "next/image";
import { whyFeatures } from "@/lib/data";
import { images } from "@/lib/images";
import { Reveal } from "@/components/ui/Reveal";
import { Appear } from "@/components/ui/Appear";

export function WhySection() {
  return (
    <section aria-labelledby="why-title" className="px-5 pb-12 pt-16 max-md:pb-0 max-md:pt-[72px] sm:px-8 lg:px-20 lg:pb-20 lg:pt-[120px]">
      <div className="mx-auto grid w-full max-w-[1280px] items-center gap-12 max-md:gap-7 lg:grid-cols-[1fr_auto] lg:gap-16">
        <Reveal as="div" className="flex flex-col gap-8 max-md:gap-7">
          <div className="flex flex-col gap-5 max-md:gap-4">
            <h2 id="why-title" className="t-h2 text-ink">Your Trusted Partner for Smarter Deliveries</h2>
            <p className="t-lead max-w-[556px]">
              We provide fast, secure and dependable courier solutions, delivering across the UK with speed and care.
            </p>
          </div>
          <ul className="grid gap-x-10 gap-y-6 max-md:gap-3 md:grid-cols-2">
            {whyFeatures.map(({ icon: Icon, title, text }) => (
              <li
                key={title}
                className="flex flex-col gap-3.5 max-md:flex-row max-md:items-start max-md:gap-4 max-md:rounded-[20px] max-md:bg-surface max-md:p-5"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand text-white" aria-hidden>
                  <Icon className="size-5" />
                </span>
                <div className="flex flex-col gap-3.5 max-md:min-w-0 max-md:gap-1.5">
                  <h3 className="text-base max-md:text-[17px] font-semibold tracking-[-0.01em] text-ink">{title}</h3>
                  <p className="text-base leading-[1.55] max-md:text-[15px] max-md:leading-[1.5] text-muted">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="grid h-[420px] grid-cols-2 gap-3.5 max-md:h-[330px] max-md:gap-2.5 sm:h-[520px] lg:h-[581px] lg:w-[632px]">
          <Appear variant="uncover" className="relative overflow-hidden rounded-[20px] bg-[#d9d9d9]">
            <Image src={images.homeGallery1} alt="Running Wheels courier van with branded advertising poster" fill sizes="(min-width: 1024px) 309px, 45vw" className="object-cover" />
          </Appear>
          <div className="grid grid-rows-[0.45fr_0.55fr] gap-3.5">
            <Appear variant="uncover" delay={0.12} className="relative overflow-hidden rounded-[20px] bg-[#d9d9d9]">
              <Image src={images.homeGallery2} alt="Running Wheels delivery van on the road" fill sizes="(min-width: 1024px) 309px, 45vw" className="object-cover" />
            </Appear>
            <Appear variant="uncover" delay={0.24} className="relative overflow-hidden rounded-[20px] bg-[#d9d9d9]">
              <Image src={images.homeGallery3} alt="Running Wheels courier ready to deliver a parcel" fill sizes="(min-width: 1024px) 309px, 45vw" className="object-cover" />
            </Appear>
          </div>
        </div>
      </div>
    </section>
  );
}
