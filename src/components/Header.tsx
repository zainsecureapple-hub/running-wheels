"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { ChevronRight, Menu, Phone, X } from "lucide-react";
import { nav, site } from "@/lib/site";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { setSmoothScrollPaused } from "@/components/SmoothScroll";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    setSmoothScrollPaused(open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const cta = pathname.startsWith("/contact") ? { label: "About us", href: "/about" } : { label: "Get a Quote", href: "/contact#enquiry" };

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 flex justify-center transition-transform duration-300 ease-out",
        scrolled && "translate-y-3 sm:translate-y-4",
      )}
    >
      <div
        className={clsx(
          "relative mx-auto flex w-full items-center justify-between rounded-full transition-[max-width,padding,gap] duration-300 ease-out",
          scrolled
            ? "max-w-[1120px] gap-4 px-5 py-2.5 sm:gap-6 sm:px-6"
            : "max-w-[1400px] gap-6 px-5 py-[22px] max-md:px-[26px] sm:px-10 lg:px-[60px] xl:gap-10",
        )}
      >
        <span
          aria-hidden
          className={clsx(
            "pointer-events-none absolute inset-0 rounded-full border border-white/10 bg-ink/70 shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-opacity duration-300",
            scrolled ? "opacity-100" : "opacity-0",
          )}
        />

        <div className="relative z-10 flex items-center gap-10 xl:gap-24">
          <span className={clsx("inline-flex origin-left transition-transform duration-300 ease-out", scrolled && "scale-[0.75]")}>
            <Logo priority />
          </span>
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8 xl:gap-10">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={clsx(
                      "nav-link text-[15px] font-semibold transition-colors",
                      isActive(item.href) ? "text-brand" : "text-white hover:text-white/75",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="relative z-10 hidden lg:block">
          <Button href={cta.href} variant="light">{cta.label}</Button>
        </div>

        <button
          type="button"
          className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full bg-white text-ink lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {mounted &&
        createPortal(
          <div
            id="mobile-menu"
            data-lenis-prevent
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            aria-hidden={!open}
            inert={!open}
            className={clsx(
              "fixed inset-0 z-[60] flex flex-col overflow-hidden bg-navy px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-8 lg:hidden",
              open ? "visible" : "invisible pointer-events-none",
            )}
          >
            <div className="relative flex items-center justify-between">
              <Logo height={48} />
              <button
                type="button"
                className="flex size-12 items-center justify-center rounded-full bg-white text-ink"
                aria-label="Close menu"
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
              >
                <X className="size-6" />
              </button>
            </div>

            <nav aria-label="Mobile" className="relative mt-6 min-h-0 flex-1 overflow-y-auto">
              <ul className="flex flex-col gap-1">
                {nav.map((item, i) => (
                  <li
                    key={item.href}
                    className={clsx(
                      "transition-all duration-500 ease-out",
                      open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                    )}
                    style={{ transitionDelay: open ? `${80 + i * 60}ms` : "0ms" }}
                  >
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      tabIndex={open ? 0 : -1}
                      className={clsx(
                        "group flex items-center justify-between gap-4 rounded-2xl px-4 py-5 text-[28px] font-semibold leading-[1.1] tracking-[-0.015em] text-white",
                        isActive(item.href) && "bg-white/10",
                      )}
                    >
                      {item.label}
                      <ChevronRight className="size-6 shrink-0 text-white/60 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div
              className={clsx(
                "relative flex flex-col gap-5 pt-6 transition-all duration-500 ease-out",
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
              )}
              style={{ transitionDelay: open ? `${80 + nav.length * 60}ms` : "0ms" }}
            >
              <Button href={cta.href} variant="primary" className="w-full justify-between" tabIndex={open ? 0 : -1}>
                {cta.label}
              </Button>
              {site.phone && (
                <a href={`tel:${site.phone.replace(/\s+/g, "")}`} tabIndex={open ? 0 : -1} className="inline-flex items-center gap-2 text-[15px] font-medium text-white/80 hover:text-white">
                  <Phone className="size-4" aria-hidden />
                  {site.phone}
                </a>
              )}
              <p className="text-[13px] leading-[1.4] text-white">
                © {new Date().getFullYear()} {site.name}. All rights reserved.
              </p>
            </div>
          </div>,
          document.body,
        )}
    </header>
  );
}
