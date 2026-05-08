import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { LangSwitcher } from "./LangSwitcher";
import { MobileMenu } from "./MobileMenu";

export const NAV = [
  { href: "/cars",          key: "fleet" as const },
  { href: "/destinations",  key: "destinations" as const },
  { href: "/how-it-works",  key: "howItWorks" as const },
  { href: "/about",         key: "about" as const },
  { href: "/faq",           key: "faq" as const },
];

function Logo({ className = "text-[22px]" }: { className?: string }) {
  return (
    <span className={`font-bold ${className} text-[#1A1A2E] tracking-tight`}>
      Rentz<span className="text-[#F97316]">.uz</span>
    </span>
  );
}

function LogoInverse({ className = "text-[22px]" }: { className?: string }) {
  return (
    <span className={`font-bold ${className} text-white tracking-tight`}>
      Rentz<span className="text-[#F97316]">.uz</span>
    </span>
  );
}

export async function Header({ locale }: { locale: string }) {
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#E5E7EB]">
      <div className="mx-auto max-w-[1312px] px-6 md:px-16 h-[72px] flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href={`/${locale}`} aria-label="Rentz.uz — Home">
            <Logo />
          </Link>
          <nav aria-label="Primary" className="hidden md:flex items-center gap-6">
            {NAV.map((l) => (
              <Link
                key={l.href}
                href={`/${locale}${l.href}`}
                className="text-[14px] font-medium text-[#4B5563] hover:text-[#F97316] transition-colors"
              >
                {tNav(l.key)}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <LangSwitcher locale={locale} />
          <Link
            href={`/${locale}/cars`}
            className="inline-flex items-center justify-center rounded-full bg-[#F97316] px-6 py-2.5 text-[14px] font-semibold text-white shadow-[0_4px_12px_rgba(249,115,22,0.3)] hover:bg-[#EA580C] transition"
          >
            {tCommon("bookNow")}
          </Link>
          <MobileMenu
            locale={locale}
            navItems={NAV.map((l) => ({ href: l.href, label: tNav(l.key) }))}
            bookNowLabel={tCommon("bookNow")}
          />
        </div>
      </div>
    </header>
  );
}

function Instagram() { return (<svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden><path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.2.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1-3.2 0-3.6 0-4.8-.1-3.3-.1-4.8-1.7-4.9-4.9-.1-1.3-.1-1.6-.1-4.8s0-3.6.1-4.8C2.4 4 4 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2zM12 0C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1 0 8.3 0 8.7 0 12s0 3.7.1 4.9c.2 4.4 2.6 6.8 7 7 1.2.1 1.6.1 4.9.1s3.7 0 4.9-.1c4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9c-.2-4.4-2.6-6.8-7-7C15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.8a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8z"/></svg>); }
function Facebook() { return (<svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H8v-2.9h2.5V9.4c0-2.4 1.5-3.8 3.7-3.8 1.1 0 2.2.2 2.2.2V8h-1.3c-1.2 0-1.6.8-1.6 1.6v1.9h2.8l-.5 2.9H13.5v7A10 10 0 0 0 22 12z"/></svg>); }
function Twitter() { return (<svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden><path d="M18.2 2H21l-6.4 7.3L22 22h-5.8l-4.6-6-5.3 6H3.5l6.8-7.8L2 2h5.9l4.2 5.5L18.2 2zm-2 18h1.6L7 3.9H5.3L16.2 20z"/></svg>); }
function YouTube() { return (<svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.6 3.6 12 3.6 12 3.6s-7.6 0-9.4.5A3 3 0 0 0 .5 6.2C0 8 0 12 0 12s0 4 .5 5.8a3 3 0 0 0 2.1 2.1c1.8.5 9.4.5 9.4.5s7.6 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 16 24 12 24 12s0-4-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z"/></svg>); }

const POPULAR_FOOTER_LINKS = [
  { slug: "chevrolet-cobalt",          label: { ru: "Аренда Chevrolet Cobalt", en: "Rent Chevrolet Cobalt", uz: "Chevrolet Cobalt ijara" } },
  { slug: "chevrolet-malibu-2",        label: { ru: "Аренда Chevrolet Malibu", en: "Rent Chevrolet Malibu", uz: "Chevrolet Malibu ijara" } },
  { slug: "hyundai-tucson",            label: { ru: "Аренда Hyundai Tucson",   en: "Rent Hyundai Tucson",   uz: "Hyundai Tucson ijara" } },
  { slug: "toyota-land-cruiser-prado", label: { ru: "Аренда Land Cruiser Prado", en: "Rent Land Cruiser Prado", uz: "Land Cruiser Prado ijara" } },
  { slug: "kia-carnival",              label: { ru: "Аренда Kia Carnival",     en: "Rent Kia Carnival",     uz: "Kia Carnival ijara" } },
  { slug: "mercedes-benz-g400d",       label: { ru: "Аренда Mercedes G-Class", en: "Rent Mercedes G-Class", uz: "Mercedes G-Class ijara" } },
];

const POPULAR_DESTINATIONS = [
  { slug: "tashkent-samarkand", label: { ru: "Поездка в Самарканд", en: "Trip to Samarkand", uz: "Samarqandga sayohat" } },
  { slug: "tashkent-bukhara",   label: { ru: "Поездка в Бухару",    en: "Trip to Bukhara",   uz: "Buxoroga sayohat" } },
  { slug: "tashkent-khiva",     label: { ru: "Поездка в Хиву",      en: "Trip to Khiva",     uz: "Xivaga sayohat" } },
  { slug: "chimgan",            label: { ru: "Чимган и Бельдерсай", en: "Chimgan & Beldersay", uz: "Chimg'on va Beldersay" } },
];

export async function Footer({ locale }: { locale: string }) {
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tFoot = await getTranslations({ locale, namespace: "footer" });
  const l = (locale === "en" || locale === "uz" ? locale : "ru") as "ru" | "en" | "uz";
  return (
    <footer className="bg-[#1A1A2E] text-white">
      <div className="mx-auto max-w-[1312px] px-6 md:px-16 pt-16 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12">
          <div className="space-y-4">
            <LogoInverse />
            <p className="text-[14px] leading-[1.6] text-[#9CA3AF] max-w-[240px]">{tFoot("tagline")}</p>
          </div>

          <div className="space-y-3">
            <h4 className="text-[14px] font-semibold text-white mb-2">{tFoot("quickLinks")}</h4>
            {NAV.map((l) => (
              <Link key={l.href} href={`/${locale}${l.href}`} className="block text-[14px] text-[#9CA3AF] hover:text-[#F97316] transition-colors">
                {tNav(l.key)}
              </Link>
            ))}
          </div>

          <div className="space-y-3">
            <h4 className="text-[14px] font-semibold text-white mb-2">{tFoot("support")}</h4>
            <Link href={`/${locale}/contact`} className="block text-[14px] text-[#9CA3AF] hover:text-[#F97316]">{tFoot("contactUs")}</Link>
            <Link href={`/${locale}/terms`} className="block text-[14px] text-[#9CA3AF] hover:text-[#F97316]">{tFoot("terms")}</Link>
            <Link href={`/${locale}/privacy`} className="block text-[14px] text-[#9CA3AF] hover:text-[#F97316]">{tFoot("privacy")}</Link>
          </div>

          <div className="space-y-3">
            <h4 className="text-[14px] font-semibold text-white mb-2">{tFoot("contact")}</h4>
            <p className="text-[14px] text-[#9CA3AF]">+998 71 200 00 00</p>
            <p className="text-[14px] text-[#9CA3AF]">info@rentz.uz</p>
            <p className="text-[14px] text-[#9CA3AF]">{tFoot("address")}</p>

            <div className="pt-2 flex items-center gap-3">
              {[
                { Icon: Instagram, label: "Instagram" },
                { Icon: Facebook,  label: "Facebook"  },
                { Icon: Twitter,   label: "X / Twitter" },
                { Icon: YouTube,   label: "YouTube"   },
              ].map(({ Icon, label }) => (
                <a key={label} href="#" aria-label={`Rentz.uz on ${label}`} className="h-9 w-9 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#F97316] transition-colors">
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 pt-10 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h4 className="text-[13px] font-semibold text-white mb-3 uppercase tracking-wider">
              {l === "en" ? "Popular cars" : l === "uz" ? "Mashhur avtomobillar" : "Популярные авто"}
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
              {POPULAR_FOOTER_LINKS.map((p) => (
                <li key={p.slug}>
                  <Link href={`/${locale}/cars/${p.slug}`} className="text-[13px] text-[#9CA3AF] hover:text-[#F97316] transition-colors">
                    {p.label[l]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[13px] font-semibold text-white mb-3 uppercase tracking-wider">
              {l === "en" ? "Destinations" : l === "uz" ? "Yo'nalishlar" : "Направления"}
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
              {POPULAR_DESTINATIONS.map((p) => (
                <li key={p.slug}>
                  <Link href={`/${locale}/destinations/${p.slug}`} className="text-[13px] text-[#9CA3AF] hover:text-[#F97316] transition-colors">
                    {p.label[l]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[13px] text-[#9CA3AF]">{tFoot("copyright")}</p>
          <p className="text-[13px] text-[#9CA3AF]">{tFoot("madeIn")}</p>
        </div>
      </div>
    </footer>
  );
}

export function PageHero({
  title,
  subtitle,
  children,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="bg-[#FFF7ED]">
      <div className="mx-auto max-w-[1312px] px-6 md:px-16 py-20 text-center">
        <h1 className="text-[42px] md:text-[48px] leading-[1.15] font-bold text-[#1A1A2E]">{title}</h1>
        {subtitle && (
          <p className="mt-4 text-[17px] md:text-[18px] text-[#4B5563] max-w-[620px] mx-auto leading-[1.6]">{subtitle}</p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
