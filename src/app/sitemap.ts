import type { MetadataRoute } from "next";
import { services } from "@/lib/data";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: [string, number, MetadataRoute.Sitemap[number]["changeFrequency"]][] = [
    ["/", 1, "weekly"],
    ["/services", 0.9, "weekly"],
    ["/find-branch", 0.7, "monthly"],
    ["/our-team", 0.6, "monthly"],
    ["/about", 0.6, "monthly"],
    ["/contact", 0.9, "monthly"],
    ["/privacy-policy", 0.2, "yearly"],
  ];
  return [
    ...pages.map(([path, priority, changeFrequency]) => ({ url: `${siteUrl}${path}`, lastModified: now, changeFrequency, priority })),
    ...services.map((s) => ({ url: `${siteUrl}/services/${s.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
