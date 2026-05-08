"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";

type NavItem = { href: string; label: string };

const LOCALES = ["ru", "en", "uz"] as const;

export function MobileMenu({
  locale,
  navItems,
  bookNowLabel,
}: {
  locale: string;
  navItems: NavItem[];
  bookNowLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? "/";
  const panelId = useId();

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on Escape; lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const localeRest =
    pathname.replace(/^\/(ru|en|uz)(?=\/|$)/, "") || "/";

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-md text-[#1A1A2E] hover:text-[#F97316] transition-colors"
      >
        {open ? (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        )}
      </button>

      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden
        className={`fixed inset-0 z-[60] bg-black/40 transition-opacity duration-200 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Panel */}
      <div
        id={panelId}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={`fixed right-0 top-0 z-[70] h-dvh w-[88%] max-w-[360px] bg-white shadow-xl transition-transform duration-200 ease-out flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-[72px] px-6 border-b border-[#E5E7EB]">
          <span className="font-bold text-[22px] text-[#1A1A2E] tracking-tight">
            Rentz<span className="text-[#F97316]">.uz</span>
          </span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-[#1A1A2E] hover:text-[#F97316] transition-colors"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav aria-label="Mobile primary" className="flex-1 overflow-y-auto px-6 py-6">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={`/${locale}${item.href}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-md py-3 text-[16px] font-medium text-[#1A1A2E] hover:text-[#F97316] transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-6 pt-6 border-t border-[#E5E7EB]">
            <p className="text-[12px] font-semibold uppercase tracking-wider text-[#9CA3AF] mb-3">
              Language
            </p>
            <div className="flex items-center gap-1 text-[14px] font-medium">
              {LOCALES.map((code, i) => (
                <span key={code} className="flex items-center gap-1">
                  {i > 0 && <span className="text-[#D1D5DB]">·</span>}
                  <Link
                    href={`/${code}${localeRest === "/" ? "" : localeRest}`}
                    onClick={() => setOpen(false)}
                    className={
                      code === locale
                        ? "text-[#F97316] font-semibold px-2 py-1"
                        : "text-[#4B5563] hover:text-[#F97316] transition-colors px-2 py-1"
                    }
                  >
                    {code.toUpperCase()}
                  </Link>
                </span>
              ))}
            </div>
          </div>
        </nav>

        <div className="px-6 py-5 border-t border-[#E5E7EB]">
          <Link
            href={`/${locale}/cars`}
            onClick={() => setOpen(false)}
            className="inline-flex w-full items-center justify-center rounded-full bg-[#F97316] px-6 py-3 text-[15px] font-semibold text-white shadow-[0_4px_12px_rgba(249,115,22,0.3)] hover:bg-[#EA580C] transition"
          >
            {bookNowLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
