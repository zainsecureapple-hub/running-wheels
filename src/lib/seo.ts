import type { Metadata } from "next";
import { fullAddress, site, siteUrl } from "./site";
import type { Service } from "./data";

type MetaInput = {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
};

/** Per-page metadata: title, description, canonical, Open Graph and Twitter cards. */
export function buildMetadata({ title, description, path, noindex }: MetaInput): Metadata {
  const url = `${siteUrl}${path}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "website",
      locale: "en_GB",
      siteName: site.name,
      title,
      description,
      url,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

const abs = (path: string) => `${siteUrl}${path}`;

export const organizationJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "MovingCompany"],
  "@id": `${siteUrl}/#organization`,
  name: site.name,
  legalName: site.legalName,
  url: siteUrl,
  logo: abs("/icon.svg"),
  image: abs("/opengraph-image"),
  description: site.description,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    postalCode: site.address.postcode,
    addressCountry: site.address.country,
  },
  areaServed: { "@type": "Country", name: "United Kingdom" },
  openingHours: "Mo-Su 00:00-23:59",
  ...(site.phone ? { telephone: site.phone } : {}),
  ...(site.email ? { email: site.email } : {}),
});

export const websiteJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: site.name,
  inLanguage: "en-GB",
  publisher: { "@id": `${siteUrl}/#organization` },
});

export const breadcrumbJsonLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: abs(item.path),
  })),
});

export const faqJsonLd = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const serviceJsonLd = (service: Service) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: service.title,
  description: service.long,
  url: abs(`/services/${service.slug}`),
  provider: { "@id": `${siteUrl}/#organization` },
  areaServed: { "@type": "Country", name: "United Kingdom" },
  serviceType: service.title,
});

export const branchJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: `${site.name} ${site.address.city}`,
  url: abs("/find-branch"),
  address: fullAddress,
});
