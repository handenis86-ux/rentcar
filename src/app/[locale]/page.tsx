import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: `/${locale}`,
      languages: { ru: "/ru", uz: "/uz", en: "/en", "x-default": "/en" },
    },
  };
}

function Icon({ d, className = "h-5 w-5" }: { d: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <g dangerouslySetInnerHTML={{ __html: d }} />
    </svg>
  );
}
const I_PLANE = `<path d="M17.8 19.2 16 11l3.5-3.5a2.1 2.1 0 0 0-3-3L13 8 4.8 6.2 3 8l6 4-3 3H3l2 3 3 2 3-3v-3l4 6z"/>`;
const I_HEADSET = `<path d="M3 12a9 9 0 0 1 18 0"/><path d="M21 18v-4a3 3 0 0 0-3-3h-1v7h1a3 3 0 0 0 3-3z"/><path d="M3 18v-4a3 3 0 0 1 3-3h1v7H6a3 3 0 0 1-3-3z"/>`;
const I_SHIELD_CHECK = `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>`;
const I_NAV = `<polygon points="3 11 22 2 13 21 11 13 3 11"/>`;
const I_USER = `<circle cx="12" cy="7" r="4"/><path d="M4 22v-2a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v2"/>`;
const I_GEAR_SHIFT = `<circle cx="12" cy="12" r="3"/><path d="M12 15v6M9 21h6M12 9V3"/>`;
const I_FUEL = `<path d="M3 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18"/><path d="M2 22h14"/><path d="M15 8h2a2 2 0 0 1 2 2v6a2 2 0 0 0 2 2"/>`;

import { CATALOG, type Car } from "@/lib/catalog";
import { CarImage } from "@/components/CarImage";
import { HeroSearch } from "@/components/HeroSearch";

const POPULAR_SLUGS = ["chevrolet-malibu-2", "chevrolet-cobalt", "chevrolet-spark"] as const;
const CARS: Car[] = POPULAR_SLUGS.map((slug) => CATALOG.find((c) => c.slug === slug)!);

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const tf = await getTranslations({ locale, namespace: "fleet" });
  const tFaq = await getTranslations({ locale, namespace: "faq" });

  const features = [
    { icon: I_PLANE,        title: t("feature1Title"), desc: t("feature1Desc") },
    { icon: I_HEADSET,      title: t("feature2Title"), desc: t("feature2Desc") },
    { icon: I_SHIELD_CHECK, title: t("feature3Title"), desc: t("feature3Desc") },
    { icon: I_NAV,          title: t("feature4Title"), desc: t("feature4Desc") },
  ];

  const reviews = [
    { text: t("review1"), name: t("review1Name"), country: t("review1Country"), code: "UK", initial: "S" },
    { text: t("review2"), name: t("review2Name"), country: t("review2Country"), code: "DE", initial: "T" },
    { text: t("review3"), name: t("review3Name"), country: t("review3Country"), code: "JP", initial: "Y" },
  ];

  const categoryOptions = [
    { value: "economy", label: tf("filterEconomy") },
    { value: "comfort", label: tf("filterComfort") },
    { value: "premium", label: tf("filterPremium") },
    { value: "suv",     label: tf("filterSUV") },
    { value: "minivan", label: tf("filterMinivan") },
  ];
  const searchLabels = {
    pickupDate: t("searchPickupDate"),
    returnDate: t("searchReturnDate"),
    carType:    t("searchCarType"),
    search:     t("search"),
    carTypeAny: t("searchCarTypeAny"),
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-[#FFF7ED]">
        <div className="mx-auto max-w-[1312px] px-6 md:px-16 py-16 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full bg-[#F97316] px-4 py-1.5 text-[13px] font-semibold text-white">
              {t("heroBadge")}
            </span>
            <h1 className="text-[34px] sm:text-[44px] md:text-[52px] font-extrabold leading-[1.1] text-[#1A1A2E]">
              {t("heroTitle1")}<br />{t("heroTitle2")}
            </h1>
            <p className="text-[17px] text-[#4B5563] leading-[1.6] max-w-[520px]">
              {t("heroSubtitle")}
            </p>

            <HeroSearch
              locale={locale}
              categories={categoryOptions}
              labels={searchLabels}
            />
          </div>

          <div className="relative aspect-[16/10] sm:aspect-[4/5] md:aspect-auto md:h-[500px] rounded-3xl overflow-hidden">
            <Image
              src="/design/generated-1776872101080.png"
              alt={`${t("heroTitle1")} ${t("heroTitle2")} — Rentz.uz`}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              priority
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Trusted */}
      <section className="bg-white border-b border-[#E5E7EB]">
        <div className="mx-auto max-w-[1312px] px-6 md:px-16 py-12">
          <p className="text-center text-[14px] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-6">
            {t("trustedLabel")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 md:gap-x-16 text-[#4B5563]">
            <span className="flex items-center gap-2 text-[14px] font-medium">
              {/* Verified badge */}
              <svg className="h-4 w-4 text-[#F97316]" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 2 4 5v6c0 5 3.5 9.6 8 11 4.5-1.4 8-6 8-11V5l-8-3zm-1.2 14.4-3.6-3.6 1.4-1.4 2.2 2.2 5-5 1.4 1.4-6.4 6.4z"/></svg>
              {t("trustedTripAdvisor")}
            </span>
            <span className="flex items-center gap-2 text-[14px] font-medium">
              {/* Star rating */}
              <svg className="h-4 w-4 text-[#FACC15]" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1L12 2z"/></svg>
              {t("trustedBooking")}
            </span>
            <span className="flex items-center gap-2 text-[14px] font-medium">
              <svg className="h-4 w-4 text-[#FACC15]" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1L12 2z"/></svg>
              {t("trustedGoogle")}
            </span>
          </div>
        </div>
      </section>

      {/* Intro paragraphs */}
      <section className="bg-white">
        <div className="mx-auto max-w-[820px] px-6 md:px-16 py-14 space-y-5 text-center">
          <p className="text-[17px] text-[#4B5563] leading-[1.75]">{t("introP1")}</p>
          <p className="text-[17px] text-[#4B5563] leading-[1.75]">{t("introP2")}</p>
        </div>
      </section>

      {/* Fleet */}
      <section className="bg-[#F5F5F0]">
        <div className="mx-auto max-w-[1312px] px-6 md:px-16 py-20">
          <div className="text-center mb-10">
            <p className="text-[14px] font-semibold text-[#F97316] mb-2">{t("fleetTag")}</p>
            <h2 className="text-[36px] font-bold text-[#1A1A2E]">{t("fleetTitle")}</h2>
            <p className="text-[16px] text-[#4B5563] mt-2">{t("fleetSubtitle")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CARS.map((c, i) => (
              <article key={c.slug} className="bg-white rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.05)] overflow-hidden">
                <div className="relative aspect-[16/10] bg-[#F5F5F0] p-4">
                  <CarImage car={c} priority={i === 0} />
                </div>
                <div className="p-5 space-y-4">
                  <h3 className="text-[20px] font-bold text-[#1A1A2E]">{c.brand} {c.model}</h3>
                  <div className="flex items-center gap-4 text-[13px] text-[#4B5563]">
                    <span className="flex items-center gap-1"><Icon d={I_USER} className="h-4 w-4" /> {c.seats} {tc("seats")}</span>
                    <span className="flex items-center gap-1"><Icon d={I_GEAR_SHIFT} className="h-4 w-4" /> {c.transmission === "auto" ? tc("auto") : tc("manual")}</span>
                    <span className="flex items-center gap-1"><Icon d={I_FUEL} className="h-4 w-4" /> <span className="capitalize">{c.fuel}</span></span>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <span className="text-[24px] font-bold text-[#F97316]">${c.pricePerDay}</span>
                      <span className="text-[13px] text-[#9CA3AF]"> {tc("perDay")}</span>
                    </div>
                    <Link href={`/${locale}/cars/${c.slug}`} className="rounded-full bg-[#1A1A2E] px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-[#F97316] transition">
                      {tc("bookNow")}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1312px] px-6 md:px-16 py-20">
          <div className="text-center mb-10 max-w-[680px] mx-auto">
            <p className="text-[14px] font-semibold text-[#F97316] mb-2">{t("destTag")}</p>
            <h2 className="text-[32px] md:text-[36px] font-bold text-[#1A1A2E]">{t("destTitle")}</h2>
            <p className="text-[16px] text-[#4B5563] mt-3 leading-[1.6]">{t("destSubtitle")}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { slug: "tashkent-samarkand", img: "/design/generated-1776872171930.png", n: t("dest1Name"), d: t("dest1Distance"), x: t("dest1Desc") },
              { slug: "tashkent-bukhara",   img: "/design/generated-1776872186016.png", n: t("dest2Name"), d: t("dest2Distance"), x: t("dest2Desc") },
              { slug: "tashkent-khiva",     img: "/design/generated-1776872193435.png", n: t("dest3Name"), d: t("dest3Distance"), x: t("dest3Desc") },
              { slug: "chimgan",            img: "/design/generated-1776872206548.png", n: t("dest4Name"), d: t("dest4Distance"), x: t("dest4Desc") },
              { slug: "tashkent-fergana",  img: "/design/generated-fergana.png",       n: t("dest5Name"), d: t("dest5Distance"), x: t("dest5Desc") },
              { slug: "nurata-aydarkul",   img: "/design/generated-nurata.png",        n: t("dest6Name"), d: t("dest6Distance"), x: t("dest6Desc") },
              { slug: "shahrisabz",         img: "/design/generated-shahrisabz.png",    n: t("dest7Name"), d: t("dest7Distance"), x: t("dest7Desc") },
            ].map((dst) => (
              <Link
                key={dst.slug}
                href={`/${locale}/destinations/${dst.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition flex flex-col"
              >
                <div className="relative aspect-[4/3] bg-[#F5F5F0]">
                  <Image src={dst.img} alt={dst.n} fill sizes="(min-width: 1024px) 300px, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5 space-y-1.5 flex-1">
                  <h3 className="text-[18px] font-bold text-[#1A1A2E]">{dst.n}</h3>
                  <p className="text-[12px] font-medium text-[#F97316]">{dst.d}</p>
                  <p className="text-[13px] text-[#4B5563] leading-[1.55] pt-1">{dst.x}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-[#F5F5F0]">
        <div className="mx-auto max-w-[1080px] px-6 md:px-16 py-20">
          <div className="text-center mb-10 max-w-[680px] mx-auto">
            <p className="text-[14px] font-semibold text-[#F97316] mb-2">{t("pricingTag")}</p>
            <h2 className="text-[32px] md:text-[36px] font-bold text-[#1A1A2E]">{t("pricingTitle")}</h2>
            <p className="text-[16px] text-[#4B5563] mt-3 leading-[1.6]">{t("pricingSubtitle")}</p>
          </div>
          <div className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
            <table className="w-full text-left">
              <thead className="bg-[#FFF7ED] text-[#9CA3AF] text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3 font-semibold">{t("pricingClass")}</th>
                  <th className="px-5 py-3 font-semibold hidden sm:table-cell">{t("pricingExample")}</th>
                  <th className="px-5 py-3 font-semibold text-right">{t("pricingPrice")}</th>
                  <th className="px-5 py-3 font-semibold text-right hidden md:table-cell">{t("pricingDeposit")}</th>
                </tr>
              </thead>
              <tbody className="text-[14px] text-[#1A1A2E]">
                {[
                  { c: t("pricingClassEconomy"), ex: t("pricingClassEconomyEx"), p: 25,  dep: 3000 },
                  { c: t("pricingClassComfort"), ex: t("pricingClassComfortEx"), p: 40,  dep: 4000 },
                  { c: t("pricingClassSUV"),     ex: t("pricingClassSUVEx"),     p: 55,  dep: 5000 },
                  { c: t("pricingClassPremium"), ex: t("pricingClassPremiumEx"), p: 127, dep: 12000 },
                ].map((row) => (
                  <tr key={row.c} className="border-t border-[#F5F5F0]">
                    <td className="px-5 py-4 font-semibold">{row.c}</td>
                    <td className="px-5 py-4 text-[#4B5563] text-[13px] hidden sm:table-cell">{row.ex}</td>
                    <td className="px-5 py-4 text-right"><span className="font-bold text-[#F97316]">${row.p}</span><span className="text-[12px] text-[#9CA3AF]"> {tc("perDay")}</span></td>
                    <td className="px-5 py-4 text-right text-[#4B5563] hidden md:table-cell">${row.dep.toLocaleString("en-US")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[12px] text-[#9CA3AF] text-center mt-4">{t("pricingNote")}</p>
        </div>
      </section>

      {/* Add-ons */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1080px] px-6 md:px-16 py-20">
          <div className="text-center mb-10 max-w-[680px] mx-auto">
            <p className="text-[14px] font-semibold text-[#F97316] mb-2">{t("addonsTag")}</p>
            <h2 className="text-[32px] md:text-[36px] font-bold text-[#1A1A2E]">{t("addonsTitle")}</h2>
            <p className="text-[16px] text-[#4B5563] mt-3 leading-[1.6]">{t("addonsSubtitle")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-[#ECFDF5] rounded-2xl p-6 border border-[#A7F3D0]">
              <div className="flex items-center gap-2 mb-4">
                <svg className="h-5 w-5 text-[#16A34A]" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="m9 16.17-3.88-3.88a.996.996 0 1 0-1.41 1.41l4.59 4.59c.39.39 1.02.39 1.41 0L21.7 7.21a.996.996 0 1 0-1.41-1.41L9 16.17z"/></svg>
                <h3 className="text-[16px] font-bold text-[#1A1A2E] uppercase tracking-wider">{t("addonsFreeTitle")}</h3>
              </div>
              <ul className="space-y-2.5">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <li key={i} className="text-[14px] text-[#1A1A2E] leading-[1.55] flex items-start gap-2">
                    <span className="text-[#16A34A] font-bold mt-0.5">+</span>
                    {t(`addonFree${i}` as `addonFree${1 | 2 | 3 | 4 | 5 | 6}`)}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#FFF7ED] rounded-2xl p-6 border border-[#FED7AA]">
              <div className="flex items-center gap-2 mb-4">
                <svg className="h-5 w-5 text-[#F97316]" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                <h3 className="text-[16px] font-bold text-[#1A1A2E] uppercase tracking-wider">{t("addonsPaidTitle")}</h3>
              </div>
              <ul className="space-y-2.5">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <li key={i} className="text-[14px] flex items-baseline justify-between gap-3">
                    <span className="text-[#1A1A2E]">{t(`addonPaid${i}Name` as `addonPaid${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8}Name`)}</span>
                    <span className="text-[#F97316] font-semibold whitespace-nowrap text-[13px]">{t(`addonPaid${i}Price` as `addonPaid${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8}Price`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1312px] px-6 md:px-16 py-20">
          <div className="text-center mb-10">
            <p className="text-[14px] font-semibold text-[#F97316] mb-2">{t("whyTag")}</p>
            <h2 className="text-[36px] font-bold text-[#1A1A2E]">{t("whyTitle")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-[#F5F5F0] rounded-2xl p-8 space-y-4">
                <div className="h-14 w-14 rounded-[10px] bg-[#FFF7ED] text-[#F97316] flex items-center justify-center">
                  <Icon d={f.icon} className="h-7 w-7" />
                </div>
                <h3 className="text-[20px] font-bold text-[#1A1A2E]">{f.title}</h3>
                <p className="text-[14px] text-[#4B5563] leading-[1.6]">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#F5F5F0]">
        <div className="mx-auto max-w-[1312px] px-6 md:px-16 py-20">
          <div className="text-center mb-10">
            <p className="text-[14px] font-semibold text-[#F97316] mb-2">{t("testimonialsTag")}</p>
            <h2 className="text-[36px] font-bold text-[#1A1A2E]">{t("testimonialsTitle")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <div key={i} className="bg-white rounded-2xl p-7 space-y-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                <div className="text-[#FACC15] text-[16px]">★★★★★</div>
                <p className="text-[14px] text-[#4B5563] leading-[1.7]">&ldquo;{r.text}&rdquo;</p>
                <div className="flex items-center gap-3 pt-2">
                  <div className="relative h-11 w-11 rounded-full bg-[#FFF7ED] text-[#F97316] font-bold flex items-center justify-center text-[15px]">
                    {r.initial}
                    <span className="absolute -bottom-0.5 -right-0.5 h-5 min-w-5 px-1 rounded-full bg-[#1A1A2E] text-white text-[9px] font-semibold uppercase tracking-wider flex items-center justify-center border-2 border-white">
                      {r.code}
                    </span>
                  </div>
                  <div>
                    <div className="text-[14px] font-semibold text-[#1A1A2E]">{r.name}</div>
                    <div className="text-[12px] text-[#9CA3AF]">{r.country}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white">
        <div className="mx-auto max-w-[860px] px-6 md:px-16 py-20">
          <div className="text-center mb-10">
            <p className="text-[14px] font-semibold text-[#F97316] mb-2">FAQ</p>
            <h2 className="text-[32px] md:text-[36px] font-bold text-[#1A1A2E]">{tFaq("title")}</h2>
          </div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5, 6].map((i) => {
              const q = tFaq(`q${i}` as `q${1 | 2 | 3 | 4 | 5 | 6}`);
              const a = tFaq(`a${i}` as `a${1 | 2 | 3 | 4 | 5 | 6}`);
              return (
                <details key={i} className="group bg-[#F5F5F0] rounded-2xl p-5 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex items-center justify-between cursor-pointer list-none">
                    <span className="text-[15px] font-semibold text-[#1A1A2E] pr-4">{q}</span>
                    <svg className="h-4 w-4 text-[#9CA3AF] shrink-0 group-open:rotate-180 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </summary>
                  <p className="mt-3 text-[14px] text-[#4B5563] leading-[1.65]">{a}</p>
                </details>
              );
            })}
          </div>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: [1, 2, 3, 4, 5, 6].map((i) => ({
                  "@type": "Question",
                  name: tFaq(`q${i}` as `q${1 | 2 | 3 | 4 | 5 | 6}`),
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: tFaq(`a${i}` as `a${1 | 2 | 3 | 4 | 5 | 6}`),
                  },
                })),
              }),
            }}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1A1A2E]">
        <div className="mx-auto max-w-[1312px] px-6 md:px-16 py-20 text-center">
          <h2 className="text-[36px] md:text-[44px] font-extrabold text-white">{t("ctaTitle")}</h2>
          <p className="text-[17px] text-[#9CA3AF] mt-4 max-w-[600px] mx-auto leading-[1.6]">{t("ctaSubtitle")}</p>
          <div className="mt-8">
            <Link href={`/${locale}/cars`} className="inline-flex items-center justify-center rounded-full bg-[#F97316] px-10 py-4 text-[17px] font-bold text-white shadow-[0_4px_16px_rgba(249,115,22,0.25)] hover:bg-[#EA580C] transition">
              {tc("reserveYourCar")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
