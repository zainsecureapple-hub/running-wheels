/**
 * Image registry. Files live in /public/images and are (re)generated from Figma by
 * `npm run figma:assets` (see scripts/figma-assets.json). Shipped files are placeholders.
 */
export const images = {
  logo: "/images/logo.svg",
  heroHome: "/images/hero-home.png",
  heroBranch: "/images/hero-branch.png",
  heroContact: "/images/hero-contact.png",
  heroAbout: "/images/hero-about.png",
  heroTeam: "/images/hero-team.png",
  homeFloatingCard: "/images/home-floating-card.png",
  homeGallery1: "/images/home-gallery-1.png",
  homeGallery2: "/images/home-gallery-2.png",
  homeGallery3: "/images/home-gallery-3.png",
  homeFeature1: "/images/home-feature-1.png",
  homeFeature2: "/images/home-feature-2.png",
  homeFreight: "/images/home-freight.png",
  about1: "/images/about-1.png",
  about2: "/images/about-2.png",
  teamAvatars: "/images/team-avatars.svg",
  team1: "/images/team-1.png",
  team2: "/images/team-2.png",
  team3: "/images/team-3.png",
  team4: "/images/team-4.png",
} as const;
