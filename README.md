# Running Wheels — Website

Next.js 15 + TypeScript + Tailwind v4 implementation of the Running Wheels Figma design (6 pages + 9 service pages).

## Quick start
```bash
npm install
cp .env.example .env.local     # add FIGMA_ACCESS_TOKEN (and later the email keys)
npm run figma:assets           # pulls real photos + logo from Figma into public/images
npm run dev                    # http://localhost:3000
```
> The zip ships with **placeholder images**. Run `npm run figma:assets` once to replace them with the real assets from Figma.

## Routes
`/` · `/services` · `/services/[slug]` (9) · `/find-branch` · `/our-team` · `/about` · `/contact` · `/privacy-policy` · `/api/enquiry` · `/sitemap.xml` · `/robots.txt` · `/manifest.webmanifest` · `/opengraph-image`

## SEO included
Per-page title/description/canonical/Open Graph/Twitter · one H1 per page with ordered H2/H3 · JSON-LD (LocalBusiness, WebSite, BreadcrumbList, FAQPage, Service) · sitemap + robots · generated OG image · semantic landmarks, skip link, focus states · self-hosted font, `next/image` (AVIF/WebP) · security headers.

## Deploy
Vercel: import repo, set `NEXT_PUBLIC_SITE_URL` + email env vars. See `CLAUDE.md` for the Figma node map and open TODOs.
