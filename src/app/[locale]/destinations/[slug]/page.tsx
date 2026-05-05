import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { DESTINATIONS, getDestinationBySlug, type DestinationLocale, type DestSection } from "@/content/destinations";
import { CATALOG } from "@/lib/catalog";
import { CarImage } from "@/components/CarImage";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rentz.uz";

function pickLocale(locale: string): DestinationLocale {
  return locale === "en" ? "en" : locale === "uz" ? "uz" : "ru";
}

export function generateStaticParams() {
  return DESTINATIONS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const dest = getDestinationBySlug(slug);
  if (!dest) return {};
  const l = pickLocale(locale);
  return {
    title: dest.title[l],
    description: dest.description[l],
    alternates: {
      canonical: `/${locale}/destinations/${slug}`,
      languages: {
        ru: `/ru/destinations/${slug}`,
        en: `/en/destinations/${slug}`,
        uz: `/uz/destinations/${slug}`,
        "x-default": `/en/destinations/${slug}`,
      },
    },
    openGraph: {
      title: dest.title[l],
      description: dest.description[l],
      url: `/${locale}/destinations/${slug}`,
      images: [{ url: dest.cover, width: 1200, height: 630, alt: dest.title[l] }],
    },
    twitter: { card: "summary_large_image", title: dest.title[l], description: dest.description[l], images: [dest.cover] },
  };
}

function Section({ s }: { s: DestSection }) {
  switch (s.type) {
    case "h2":   return <h2 className="text-[24px] md:text-[28px] font-bold text-[#1A1A2E] mt-10 mb-3 leading-[1.2]">{s.text}</h2>;
    case "h3":   return <h3 className="text-[19px] md:text-[20px] font-semibold text-[#1A1A2E] mt-7 mb-2">{s.text}</h3>;
    case "p":    return <p className="text-[16px] text-[#374151] leading-[1.75] mt-3">{s.text}</p>;
    case "ul":   return <ul className="list-disc pl-6 mt-3 space-y-1.5 text-[16px] text-[#374151] leading-[1.7]">{s.items.map((it, i) => <li key={i}>{it}</li>)}</ul>;
    case "ol":   return <ol className="list-decimal pl-6 mt-3 space-y-1.5 text-[16px] text-[#374151] leading-[1.7]">{s.items.map((it, i) => <li key={i}>{it}</li>)}</ol>;
    case "stat": return (
      <div className="inline-flex flex-col rounded-xl bg-[#FFF7ED] px-4 py-3 mt-3 mr-3">
        <span className="text-[11px] uppercase tracking-wider text-[#9CA3AF] font-semibold">{s.label}</span>
        <span className="text-[18px] font-bold text-[#1A1A2E] mt-0.5">{s.value}</span>
      </div>
    );
  }
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const dest = getDestinationBySlug(slug);
  if (!dest) notFound();
  const l = pickLocale(locale);
  const tc = await getTranslations({ locale, namespace: "common" });

  const recommendedCars = (dest.recommendedCarSlugs ?? [])
    .map((s) => CATALOG.find((c) => c.slug === s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c))
    .slice(0, 4);

  const placeJsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: dest.city,
    description: dest.description[l],
    image: dest.cover.startsWith("http") ? dest.cover : `${SITE_URL}${dest.cover}`,
    geo: { "@type": "GeoCoordinates" },
    touristType: ["Drivers", "Self-drive travelers"],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dest.faqs[l].map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: locale === "en" ? "Home" : locale === "uz" ? "Bosh sahifa" : "Главная", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: locale === "en" ? "Destinations" : locale === "uz" ? "Yo'nalishlar" : "Направления", item: `${SITE_URL}/${locale}/destinations` },
      { "@type": "ListItem", position: 3, name: dest.city },
    ],
  };

  const homeLabel = locale === "en" ? "Home" : locale === "uz" ? "Bosh sahifa" : "Главная";
  const destLabel = locale === "en" ? "Destinations" : locale === "uz" ? "Yo'nalishlar" : "Направления";

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(placeJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="bg-[#FFF7ED]">
        <div className="mx-auto max-w-[1080px] px-6 md:px-10 py-10">
          <nav className="flex items-center gap-1.5 text-[13px] text-[#9CA3AF] mb-6" aria-label="Breadcrumb">
            <Link href={`/${locale}`} className="hover:text-[#F97316]">{homeLabel}</Link>
            <span>›</span>
            <Link href={`/${locale}/destinations`} className="hover:text-[#F97316]">{destLabel}</Link>
            <span>›</span>
            <span className="text-[#1A1A2E]">{dest.city}</span>
          </nav>
          <h1 className="text-[32px] sm:text-[40px] md:text-[48px] font-extrabold text-[#1A1A2E] leading-[1.15]">
            {dest.h1[l]}
          </h1>
          <p className="mt-4 text-[17px] text-[#4B5563] leading-[1.6] max-w-[720px]">{dest.intro[l]}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-7">
            <Stat label={l === "en" ? "Distance" : l === "uz" ? "Masofa" : "Расстояние"} value={`${dest.facts.distanceKm} km`} />
            <Stat label={l === "en" ? "Driving time" : l === "uz" ? "Yo'l vaqti" : "Время в пути"} value={dest.facts.drivingHours} />
            <Stat label={l === "en" ? "Best season" : l === "uz" ? "Eng yaxshi mavsum" : "Сезон"} value={dest.facts.bestSeason[l]} />
            <Stat label={l === "en" ? "Recommended" : l === "uz" ? "Tavsiya" : "Рекомендуем"} value={dest.facts.recommendedClass[l]} />
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="mx-auto max-w-[1080px] px-6 md:px-10 py-10 grid lg:grid-cols-[1fr_320px] gap-10 items-start">
          <div>
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-[#F5F5F0] mb-8">
              <Image src={dest.cover} alt={dest.city} fill sizes="(min-width: 1024px) 720px, 100vw" priority className="object-cover" />
            </div>
            <div>
              {dest.body[l].map((s, i) => (
                <Section key={i} s={s} />
              ))}
            </div>

            {dest.faqs[l].length > 0 && (
              <div className="mt-12">
                <h2 className="text-[24px] font-bold text-[#1A1A2E] mb-4">FAQ</h2>
                <div className="space-y-3">
                  {dest.faqs[l].map((f, i) => (
                    <details key={i} className="group bg-[#F5F5F0] rounded-2xl p-5 [&_summary::-webkit-details-marker]:hidden">
                      <summary className="flex items-center justify-between cursor-pointer list-none">
                        <span className="text-[15px] font-semibold text-[#1A1A2E] pr-4">{f.q}</span>
                        <svg className="h-4 w-4 text-[#9CA3AF] shrink-0 group-open:rotate-180 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </summary>
                      <p className="mt-3 text-[14px] text-[#4B5563] leading-[1.65]">{f.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="lg:sticky lg:top-[88px] space-y-4">
            <div className="bg-[#1A1A2E] rounded-2xl p-6 text-white">
              <p className="text-[12px] uppercase tracking-wider text-[#9CA3AF]">
                {l === "en" ? "Pickup" : l === "uz" ? "Olish joyi" : "Где забрать"}
              </p>
              <h3 className="text-[20px] font-bold mt-1">Tashkent</h3>
              <p className="text-[13px] text-[#9CA3AF] mt-2 leading-[1.5]">
                {l === "en"
                  ? "Pick up the car in Tashkent and drive to your destination on your own schedule."
                  : l === "uz"
                  ? "Avtomobilni Toshkentda oling va o'z vaqtingizda manzilingizga boring."
                  : "Забираете авто в Ташкенте и едете в направлении в свободном графике."}
              </p>
              <Link
                href={`/${locale}/cars`}
                className="mt-5 inline-flex items-center justify-center w-full rounded-full bg-[#F97316] px-6 py-3 text-[14px] font-bold text-white hover:bg-[#EA580C] transition"
              >
                {tc("reserveYourCar")}
              </Link>
            </div>

            {recommendedCars.length > 0 && (
              <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5">
                <p className="text-[12px] uppercase tracking-wider text-[#9CA3AF] font-semibold mb-3">
                  {l === "en" ? "Best for this trip" : l === "uz" ? "Ushbu sayohat uchun" : "Лучшие для поездки"}
                </p>
                <div className="space-y-3">
                  {recommendedCars.map((rc) => (
                    <Link key={rc.slug} href={`/${locale}/cars/${rc.slug}`} className="flex items-center gap-3 group">
                      <div className="relative h-14 w-20 rounded-lg overflow-hidden bg-[#F5F5F0] shrink-0">
                        <CarImage car={rc} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[14px] font-bold text-[#1A1A2E] truncate group-hover:text-[#F97316] transition-colors">{rc.brand} {rc.model}</p>
                        <p className="text-[12px] text-[#9CA3AF]"><span className="font-bold text-[#F97316]">${rc.pricePerDay}</span> {tc("perDay")}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </article>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white rounded-xl px-4 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="text-[11px] uppercase tracking-wider text-[#9CA3AF] font-semibold">{label}</div>
      <div className="text-[15px] font-bold text-[#1A1A2E] mt-1 leading-tight">{value}</div>
    </div>
  );
}
