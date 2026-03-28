import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://rentcar.uz"),
    title: { default: t("title"), template: `%s — ${t("siteName")}` },
    description: t("description"),
    keywords: t("keywords"),
    openGraph: { type: "website", locale, siteName: t("siteName"), title: t("title"), description: t("description") },
    alternates: { canonical: "/", languages: { ru: "/ru", uz: "/uz", en: "/en" } },
    robots: { index: true, follow: true },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// ─── Locale helper ────────────────────────────────────────────────────────────

type L = Locale;

function t(locale: L, ru: string, uz: string, en: string): string {
  if (locale === "uz") return uz;
  if (locale === "en") return en;
  return ru;
}

// ─── Social icons ─────────────────────────────────────────────────────────────

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

function Header({ locale }: { locale: L }) {
  const navLinks = [
    { href: `/${locale}/cars`,    label: t(locale, "Каталог",  "Katalog",       "Cars")    },
    { href: `/${locale}/about`,   label: t(locale, "О нас",    "Biz haqimizda", "About")   },
    { href: `/${locale}/contact`, label: t(locale, "Контакты", "Aloqa",         "Contact") },
    { href: `/${locale}/blog`,    label: t(locale, "Блог",     "Blog",          "Blog")    },
  ];

  const locales: { code: L; label: string }[] = [
    { code: "ru", label: "RU" },
    { code: "uz", label: "UZ" },
    { code: "en", label: "EN" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <a
          href={`/${locale}`}
          className="flex items-center gap-0 select-none"
          aria-label="RentCar — home"
        >
          <span className="text-xl font-bold" style={{ color: "#201F1D" }}>Rent</span>
          <span className="text-xl font-bold" style={{ color: "#FFA633" }}>Car</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-sm font-medium text-[#2F2F2F] transition-colors hover:text-[#127384]"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">

          {/* Language switcher */}
          <div
            className="hidden items-center gap-1 sm:flex text-sm font-medium"
            role="navigation"
            aria-label="Language switcher"
          >
            {locales.map(({ code, label }, i) => (
              <span key={code} className="flex items-center gap-1">
                {i > 0 && (
                  <span className="select-none" style={{ color: "#d1d5db" }} aria-hidden="true">·</span>
                )}
                <a
                  href={`/${code}`}
                  aria-current={code === locale ? "page" : undefined}
                  className="transition-colors"
                  style={
                    code === locale
                      ? { color: "#127384", fontWeight: 600 }
                      : { color: "#6b7280" }
                  }
                >
                  {label}
                </a>
              </span>
            ))}
          </div>

          {/* Phone — large screens only */}
          <a
            href="tel:+998711234567"
            className="hidden lg:block text-sm font-medium transition-colors whitespace-nowrap"
            style={{ color: "#2F2F2F" }}
          >
            +998 71 123-45-67
          </a>

          {/* Login button — pill style */}
          <a
            href={`/${locale}/login`}
            className="hidden sm:inline-flex items-center rounded-full px-5 py-2 text-sm font-medium text-white transition-colors bg-[#127384] hover:bg-[#0e5d6a]"
          >
            {t(locale, "Войти", "Kirish", "Sign in")}
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full border transition-colors md:hidden"
            style={{ borderColor: "#e5e7eb", color: "#2F2F2F" }}
            aria-label={t(locale, "Открыть меню", "Menyuni ochish", "Open menu")}
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.75}
              strokeLinecap="round"
              aria-hidden="true"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

        </div>
      </div>
    </header>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer({ locale }: { locale: L }) {
  const year = new Date().getFullYear();

  const vehicleTypes = [
    { href: `/${locale}/cars?type=sedan`,   label: t(locale, "Седан",     "Sedan",     "Sedan")   },
    { href: `/${locale}/cars?type=suv`,     label: t(locale, "Внедорожник", "SUV",     "SUV")     },
    { href: `/${locale}/cars?type=minivan`, label: t(locale, "Минивэн",   "Miniven",   "Minivan") },
    { href: `/${locale}/cars?type=premium`, label: t(locale, "Премиум",   "Premium",   "Premium") },
    { href: `/${locale}/cars?type=economy`, label: t(locale, "Эконом",    "Ekonom",    "Economy") },
  ];

  const quickLinks = [
    { href: `/${locale}/cars`,        label: t(locale, "Каталог",       "Katalog",           "Catalog")     },
    { href: `/${locale}/about`,       label: t(locale, "О нас",         "Biz haqimizda",     "About us")    },
    { href: `/${locale}/blog`,        label: t(locale, "Блог",          "Blog",              "Blog")        },
    { href: `/${locale}/contact`,     label: t(locale, "Контакты",      "Aloqa",             "Contact")     },
    { href: `/${locale}/faq`,         label: "FAQ"                                                           },
    { href: `/${locale}/terms`,       label: t(locale, "Условия",       "Shartlar",          "Terms")       },
    { href: `/${locale}/privacy`,     label: t(locale, "Конфиденциальность", "Maxfiylik",    "Privacy")     },
  ];

  return (
    <footer style={{ backgroundColor: "#201F1D" }} className="text-white">

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-4 pt-14 pb-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Col 1 — Brand + about + socials */}
          <div className="space-y-5">
            {/* Logo */}
            <a href={`/${locale}`} className="inline-flex items-center gap-0 select-none" aria-label="RentCar — home">
              <span className="text-xl font-bold text-white">Rent</span>
              <span className="text-xl font-bold" style={{ color: "#FFA633" }}>Car</span>
            </a>

            <p className="text-sm leading-relaxed max-w-[210px]" style={{ color: "#9ca3af" }}>
              {t(
                locale,
                "Аренда автомобилей по всему Узбекистану. Быстро, удобно, надёжно.",
                "O'zbekiston bo'ylab tez, qulay va ishonchli avtomobil ijarasi.",
                "Fast, convenient and reliable car rental across Uzbekistan."
              )}
            </p>

            {/* Social icons — white circles, hover orange */}
            <div className="flex items-center gap-3 pt-1">
              {[
                { href: "https://t.me/rentcar_uz",       label: "Telegram",  Icon: TelegramIcon  },
                { href: "https://instagram.com/rentcar.uz", label: "Instagram", Icon: InstagramIcon },
                { href: "https://wa.me/998711234567",     label: "WhatsApp",  Icon: WhatsAppIcon  },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full transition-colors bg-white/10 hover:bg-[#FFA633]"
                >
                  <Icon className="h-4 w-4 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Vehicle types */}
          <div>
            <h3
              className="mb-5 text-xs font-semibold uppercase tracking-widest"
              style={{ color: "#6b7280" }}
            >
              {t(locale, "Тип транспорта", "Transport turi", "Vehicle Type")}
            </h3>
            <ul className="space-y-3">
              {vehicleTypes.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: "#9ca3af" }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Quick links */}
          <div>
            <h3
              className="mb-5 text-xs font-semibold uppercase tracking-widest"
              style={{ color: "#6b7280" }}
            >
              {t(locale, "Быстрые ссылки", "Tezkor havolalar", "Quick Links")}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: "#9ca3af" }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contacts */}
          <div>
            <h3
              className="mb-5 text-xs font-semibold uppercase tracking-widest"
              style={{ color: "#6b7280" }}
            >
              {t(locale, "Контакты", "Aloqa", "Contact")}
            </h3>
            <ul className="space-y-4 text-sm" style={{ color: "#9ca3af" }}>
              <li className="flex items-start gap-2">
                {/* Phone icon */}
                <svg className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: "#FFA633" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
                <a href="tel:+998711234567" className="hover:text-white transition-colors">
                  +998 71 123-45-67
                </a>
              </li>
              <li className="flex items-start gap-2">
                {/* Email icon */}
                <svg className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: "#FFA633" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                <a href="mailto:info@rentcar.uz" className="hover:text-white transition-colors">
                  info@rentcar.uz
                </a>
              </li>
              <li className="flex items-start gap-2">
                {/* Location icon */}
                <svg className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: "#FFA633" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                <span>
                  {t(locale, "Ташкент, Узбекистан", "Toshkent, O'zbekiston", "Tashkent, Uzbekistan")}
                </span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Divider */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t" style={{ borderColor: "#3a3a38" }} />
      </div>

      {/* Bottom bar */}
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">

          {/* Copyright */}
          <p className="order-3 text-xs sm:order-1" style={{ color: "#6b7280" }}>
            © {year} RentCar.uz.{" "}
            {t(locale, "Все права защищены.", "Barcha huquqlar himoyalangan.", "All rights reserved.")}
          </p>

          {/* Payment methods */}
          <div className="order-2 flex items-center gap-2 text-xs font-medium">
            {["Click", "Payme", "Visa", "Mastercard"].map((method) => (
              <span
                key={method}
                className="rounded-full border px-2.5 py-0.5"
                style={{ borderColor: "#3a3a38", color: "#9ca3af" }}
              >
                {method}
              </span>
            ))}
          </div>

          {/* Legal links */}
          <div className="order-1 flex items-center gap-4 text-xs sm:order-3" style={{ color: "#6b7280" }}>
            <a
              href={`/${locale}/terms`}
              className="transition-colors hover:text-white"
            >
              {t(locale, "Условия", "Shartlar", "Terms")}
            </a>
            <span style={{ color: "#3a3a38" }} aria-hidden="true">·</span>
            <a
              href={`/${locale}/privacy`}
              className="transition-colors hover:text-white"
            >
              {t(locale, "Конфиденциальность", "Maxfiylik", "Privacy")}
            </a>
          </div>

        </div>
      </div>

    </footer>
  );
}

// ─── Locale layout ────────────────────────────────────────────────────────────

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const messages = await getMessages();
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="flex min-h-screen flex-col">
        <Header locale={locale as Locale} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale as Locale} />
      </div>
    </NextIntlClientProvider>
  );
}
