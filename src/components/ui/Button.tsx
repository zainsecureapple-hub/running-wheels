import Link from "next/link";
import clsx from "clsx";
import { ArrowUpRight, type LucideIcon } from "lucide-react";
import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";

type Variant = "primary" | "light" | "outline" | "soft" | "outline-light";

/** `fill` is the colour the expanding circle layer paints; `hoverText` is what the label/icon turn into once it covers the pill. */
const variants: Record<Variant, { wrap: string; circle: string; fill: string; hoverText: string }> = {
  primary: { wrap: "bg-brand text-white", circle: "bg-white text-brand", fill: "#ffffff", hoverText: "#e10600" },
  light: { wrap: "border border-line bg-white text-ink", circle: "bg-brand text-white", fill: "#e10600", hoverText: "#ffffff" },
  outline: { wrap: "border border-line bg-transparent text-ink", circle: "bg-navy text-white", fill: "#062954", hoverText: "#ffffff" },
  soft: { wrap: "border border-line bg-white text-ink", circle: "bg-surface text-ink", fill: "#0e0f12", hoverText: "#ffffff" },
  /** Outline button for dark/photo backgrounds (e.g. the hero) — white border & label instead of ink. */
  "outline-light": { wrap: "border border-white/40 bg-transparent text-white", circle: "bg-white text-navy", fill: "#ffffff", hoverText: "#062954" },
};

type Common = {
  variant?: Variant;
  icon?: LucideIcon;
  children: ReactNode;
  className?: string;
  /** Set false to keep the pill at its natural (fit-content) width on mobile instead of stretching
   *  full-width with the icon pushed to the far edge. Defaults to true (hero/menu CTAs want full-width). */
  mobileFullWidth?: boolean;
};

type AsLink = Common & { href: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">;
type AsButton = Common & { href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

/**
 * Pill button with a circular icon chip. On hover/focus the chip expands (transform
 * scale, clipped by the pill's own overflow-hidden) until it fills the whole pill;
 * the label and icon colours cross-fade to stay readable. Pill size never changes.
 */
export function Button(props: AsLink | AsButton) {
  const { variant = "primary", icon: Icon = ArrowUpRight, children, className, style, mobileFullWidth = true, ...rest } = props as (AsLink | AsButton) & { style?: CSSProperties };
  const v = variants[variant];
  const classes = clsx(
    "btn inline-flex w-fit items-center gap-3.5 rounded-full py-1.5 pl-[26px] pr-1.5 text-[15px] font-medium whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-60",
    mobileFullWidth && "max-md:w-full max-md:justify-between",
    v.wrap,
    className,
  );
  const cssVars = { "--btn-fill": v.fill, "--btn-hover-text": v.hoverText, ...style } as CSSProperties;

  const content = (
    <>
      <span aria-hidden className="btn-fill" />
      <span className="btn-label">{children}</span>
      <span className={clsx("btn-circle flex size-10 shrink-0 items-center justify-center rounded-full", v.circle)} aria-hidden>
        <Icon className="size-[18px]" strokeWidth={2} />
      </span>
    </>
  );

  if ("href" in props && props.href !== undefined) {
    const { href, ...anchorRest } = rest as Omit<AsLink, keyof Common>;
    if (href.startsWith("/") || href.startsWith("#")) {
      return (
        <Link href={href} className={classes} style={cssVars} {...anchorRest}>
          {content}
        </Link>
      );
    }
    const external = href.startsWith("http");
    return (
      <a href={href} className={classes} style={cssVars} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...anchorRest}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} style={cssVars} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}

export function TextLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={clsx("group inline-flex items-center gap-2 text-[15px] font-medium text-ink", className)}>
      {children}
      <ArrowUpRight className="size-3 transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
    </Link>
  );
}
