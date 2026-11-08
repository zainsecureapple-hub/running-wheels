import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/images";
import { site } from "@/lib/site";

export function Logo({ height = 48, priority = false }: { height?: number; priority?: boolean }) {
  return (
    <Link href="/" aria-label={`${site.name} — home`} className="inline-flex shrink-0">
      <Image
        src={images.logo}
        alt={`${site.name} logo`}
        width={Math.round(height * 2.654)}
        height={height}
        priority={priority}
        style={{ height, width: "auto" }}
      />
    </Link>
  );
}
