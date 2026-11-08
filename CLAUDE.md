# Running Wheels — Next.js website

Courier & delivery company website (Aberdeen, UK). Built from the Figma file below.
**Figma file:** https://www.figma.com/design/YR52ybHQt5zI33CYAU0ovM/Untitled (fileKey `YR52ybHQt5zI33CYAU0ovM`)

## Stack
Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 (tokens in `src/app/globals.css`) · lucide-react icons · zod · self-hosted Inter.

## Commands
- `npm run dev` — dev server · `npm run build` / `npm start` — production
- `npm run lint` · `npm run typecheck`
- `npm run figma:assets` — download all images/logo from Figma into `public/images` (needs `FIGMA_ACCESS_TOKEN` in `.env.local`)

## Figma → route map
| Figma frame | Node ID | Route |
|---|---|---|
| Home | `2:295` | `/` |
| Service (**empty frame in Figma**) | `2:636` | `/services` + `/services/[slug]` (designed by us in the same system) |
| Our Branch | `2:1074` | `/find-branch` |
| Contact Us | `2:1374` | `/contact` |
| About | `2:1604` | `/about` |
| Our Team | `2:1881` | `/our-team` |

Useful section nodes: Home hero `2:347`, Why `2:372`, Stats `2:396`, Services `2:417`, Industries `2:520`, FAQ `2:543`, Footer `2:553` · Contact form `2:1472` · About rows `2:1669`, Why Choose Us `2:1712` · Team grid `2:1947` · Branch details `2:1197`.

## Using the Figma MCP in Claude Code
`.mcp.json` registers the official Figma MCP server (`https://mcp.figma.com/mcp`). Run `/mcp` once to authenticate.
When refining a section, call `get_design_context` with the node ID above and **adapt** the output to the existing components — never paste it in raw, and never leave `figma.com/api/mcp/asset/...` URLs in code (they expire in 7 days; use `npm run figma:assets`).

## Design tokens (from Figma)
brand red `#e10600` · navy `#062954` · ink `#0e0f12` · muted `#6b6f76` · line `#e5e5e1` · surface `#f6f6f6` · tint `#fdeceb` · font Inter (600 headings / 500 UI / 400 body).
Type scale lives in `globals.css`: `.t-display` (H1, 64px) · `.t-h2` (48px) · `.t-h3` (40px) · `.t-card-title` (22px) · `.t-lead` (18px). Radii: 999px pills, 20–24px cards, 32px hero/footer/form.

## Conventions
- **Exactly one `<h1>` per page** (the `PageHero` title). Sections use `<h2>`, cards/rows `<h3>`. Don't skip levels.
- All business details come from `src/lib/site.ts`; all copy lists from `src/lib/data.ts`; image paths from `src/lib/images.ts`.
- Every page exports metadata via `buildMetadata()` (`src/lib/seo.ts`) and adds JSON-LD with `<JsonLd />`.
- Buttons: use `components/ui/Button` (pill + circular icon). Don't hand-roll new CTA styles.
- Decorative images use `alt=""`; meaningful images get descriptive alt text.
- Mobile/tablet layouts weren't designed in Figma — they are our responsive interpretation; keep desktop (≥1024px) pixel-faithful to Figma.

## Open items / TODO(client)
1. **Service page is an empty frame in Figma** — `/services` and service detail pages were designed to match the system. Confirm or supply a design.
2. Phone, email and opening hours are "To be confirmed" in Figma → `site.phone`, `site.email`, `site.hours` in `src/lib/site.ts` (UI adapts automatically when set).
3. Team members, photos and bios are samples (`team` in `data.ts`).
4. FAQ: only the first answer exists in Figma; the other four are drafted — confirm wording.
5. Figma typo: About row title reads "Google the extra mile" — implemented as "Go the extra mile".
6. Design inconsistencies resolved: nav now includes "Find Branch" on every page; footer service links use the Team-page variant (linked to real service pages); one footer description everywhere.
7. Set `NEXT_PUBLIC_SITE_URL` to the real domain (default `https://www.runningwheels.co.uk`), add real social URLs, and have `/privacy-policy` reviewed (template text).
8. Enquiry email: set `RESEND_API_KEY`, `ENQUIRY_TO_EMAIL`, `ENQUIRY_FROM_EMAIL` (or swap `src/app/api/enquiry/route.ts` for your provider). Consider adding rate limiting / CAPTCHA before launch.
9. Add Google Search Console / analytics once the domain is live.
