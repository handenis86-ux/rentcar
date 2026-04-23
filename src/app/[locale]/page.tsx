import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  return { title: t("metaTitle"), description: t("metaDescription") };
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

const POPULAR_SLUGS = ["chevrolet-malibu-2", "chevrolet-cobalt", "chevrolet-spark"] as const;
const CARS: Car[] = POPULAR_SLUGS.map((slug) => CATALOG.find((c) => c.slug === slug)!);

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  const tc = await getTranslations({ locale, namespace: "common" });

  const features = [
    { icon: I_PLANE,        title: t("feature1Title"), desc: t("feature1Desc") },
    { icon: I_HEADSET,      title: t("feature2Title"), desc: t("feature2Desc") },
    { icon: I_SHIELD_CHECK, title: t("feature3Title"), desc: t("feature3Desc") },
    { icon: I_NAV,          title: t("feature4Title"), desc: t("feature4Desc") },
  ];

  const reviews = [
    { text: t("review1"), name: t("review1Name"), country: t("review1Country") },
    { text: t("review2"), name: t("review2Name"), country: t("review2Country") },
    { text: t("review3"), name: t("review3Name"), country: t("review3Country") },
  ];

  const searchFields = [
    { label: t("searchPickupLoc"),  val: t("searchPickupLocVal") },
    { label: t("searchPickupDate"), val: t("searchPickupDateVal") },
    { label: t("searchReturnDate"), val: t("searchReturnDateVal") },
    { label: t("searchCarType"),    val: t("searchCarTypeVal") },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-[#FFF7ED]">
        <div className="mx-auto max-w-[1312px] px-6 md:px-16 py-16 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full bg-[#F97316] px-4 py-1.5 text-[13px] font-semibold text-white">
              {t("heroBadge")}
            </span>
            <h1 className="text-[44px] md:text-[52px] font-extrabold leading-[1.1] text-[#1A1A2E]">
              {t("heroTitle1")}<br />{t("heroTitle2")}
            </h1>
            <p className="text-[17px] text-[#4B5563] leading-[1.6] max-w-[520px]">
              {t("heroSubtitle")}
            </p>

            <div className="bg-white rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.1)] p-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {searchFields.map((f) => (
                <div key={f.label} className="bg-[#F5F5F0] rounded-[10px] px-3 py-2 flex-1 min-w-0">
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-[#9CA3AF]">{f.label}</div>
                  <div className="text-[14px] font-medium text-[#1A1A2E] truncate">{f.val}</div>
                </div>
              ))}
              <Link href={`/${locale}/cars`} className="inline-flex items-center justify-center rounded-full bg-[#F97316] px-8 py-4 text-[15px] font-semibold text-white hover:bg-[#EA580C] transition shrink-0">
                {t("search")}
              </Link>
            </div>
          </div>

          <div className="relative aspect-[4/5] md:aspect-auto md:h-[500px] rounded-3xl overflow-hidden">
            <img src="/design/generated-1776872101080.png" alt="Car" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Trusted */}
      <section className="bg-white border-b border-[#E5E7EB]">
        <div className="mx-auto max-w-[1312px] px-6 md:px-16 py-12">
          <p className="text-center text-[14px] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-6">
            {t("trustedLabel")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 text-[#9CA3AF]">
            <span className="flex items-center gap-2 text-[14px]">{t("trustedTripAdvisor")}</span>
            <span className="flex items-center gap-2 text-[14px]">{t("trustedBooking")}</span>
            <span className="flex items-center gap-2 text-[14px]">{t("trustedGoogle")}</span>
          </div>
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
            {CARS.map((c) => (
              <article key={c.slug} className="bg-white rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.05)] overflow-hidden">
                <div className="aspect-[16/10] bg-[#F5F5F0]">
                  <CarImage car={c} />
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
                  <div className="h-11 w-11 rounded-full bg-[#E5E7EB]" />
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
