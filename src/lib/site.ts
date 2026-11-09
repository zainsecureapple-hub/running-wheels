/** Single source of truth for business details. Update here and the whole site follows. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.runningwheels.co.uk").replace(/\/$/, "");

export const site = {
  name: "Running Wheels",
  legalName: "Running Wheels",
  companyNumber: "SC681149",
  tagline: "Dedicated courier solutions you can trust",
  description:
    "Running Wheels is a local courier and delivery company in Aberdeen offering same-day, next-day, multi-drop and dedicated deliveries, plus removals, across the UK.",
  address: {
    street: "57 Wellington Street",
    city: "Aberdeen",
    postcode: "AB11 5BX",
    country: "GB",
  },
  /** TODO(client): phone, email and opening hours are "To be confirmed" in the Figma file. */
  phone: null as string | null,
  email: null as string | null,
  hours: [
    { day: "Monday – Friday", time: "TBC" },
    { day: "Saturday", time: "TBC" },
    { day: "Sunday", time: "TBC" },
    { day: "Bank holidays", time: "TBC" },
  ],
  social: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    x: "https://x.com/",
  },
} as const;

export const fullAddress = `${site.address.street}, ${site.address.city}, ${site.address.postcode}`;
const mapsQuery = `${fullAddress}, UK`;
export const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(mapsQuery)}&output=embed`;
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapsQuery)}`;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Find Branch", href: "/find-branch" },
  { label: "Our Team", href: "/our-team" },
  { label: "About", href: "/about" },
  { label: "Contact Us", href: "/contact" },
] as const;
