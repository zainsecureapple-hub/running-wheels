import { site } from "@/lib/site";

const base = "flex size-10 items-center justify-center rounded-full bg-brand text-white transition-colors hover:bg-brand-dark";

export function SocialLinks() {
  return (
    <ul className="flex gap-2.5" aria-label="Social media">
      <li>
        <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Running Wheels on Facebook" className={base}>
          <svg viewBox="0 0 24 24" className="size-[18px]" fill="currentColor" aria-hidden>
            <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1z" />
          </svg>
        </a>
      </li>
      <li>
        <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Running Wheels on Instagram" className={base}>
          <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
          </svg>
        </a>
      </li>
      <li>
        <a href={site.social.x} target="_blank" rel="noopener noreferrer" aria-label="Running Wheels on X" className={base}>
          <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
            <path d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.3-8.3L1.9 3h6.4l4.4 5.8L17.8 3zm-1.1 16.2h1.7L7.3 4.7H5.5l11.2 14.5z" />
          </svg>
        </a>
      </li>
    </ul>
  );
}
