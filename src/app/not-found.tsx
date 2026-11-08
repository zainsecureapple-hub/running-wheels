import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { images } from "@/lib/images";

export const metadata: Metadata = { title: "Page not found", robots: { index: false, follow: false } };

export default function NotFound() {
  return (
    <PageHero
      image={images.heroHome}
      eyebrow="Error 404"
      title="Page not found"
      description="The page you’re looking for has moved or doesn’t exist. Head back home or get in touch."
      cta={{ label: "Back to Home", href: "/" }}
      size="compact"
    />
  );
}
