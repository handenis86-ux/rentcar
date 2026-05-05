import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { DESTINATIONS, type DestinationLocale } from "@/content/destinations";

function pickLocale(locale: string): DestinationLocale {
  return locale === "en" ? "en" : locale === "uz" ? "uz" : "ru";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = pickLocale(locale);
  const title =
    l === "en" ? "Destinations — road trips by car from Tashkent"
    : l === "uz" ? "Yo'nalishlar — Toshkentdan avtomobilda sayohatlar"
    : "Направления — автопутешествия из Ташкента";
  const description =
    l === "en" ? "The best routes from Tashkent: Samarkand, Bukhara, Khiva, Chimgan. Distances, what to see, recommended cars."
    : l === "uz" ? "Toshkentdan eng yaxshi yo'nalishlar: Samarqand, Buxoro, Xiva, Chimg'on. Masofalar, nimani ko'rish, tavsiya etilgan avtomobillar."
    : "Лучшие маршруты из Ташкента: Самарканд, Бухара, Хива, Чимган. Расстояния, что посмотреть, какие авто рекомендуем.";

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/destinations`,
      languages: {
        ru: "/ru/destinations",
        en: "/en/destinations",
        uz: "/uz/destinations",
        "x-default": "/en/destinations",
      },
    },
  };
}

export default async function DestinationsIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const l = pickLocale(locale);

  return (
    <>
      <section className="bg-[#FFF7ED]">
        <div className="mx-auto max-w-[1312px] px-6 md:px-16 py-14">
          <nav className="flex items-center gap-1.5 text-[13px] text-[#9CA3AF] mb-5" aria-label="Breadcrumb">
            <Link href={`/${locale}`} className="hover:text-[#F97316]">{l === "en" ? "Home" : l === "uz" ? "Bosh sahifa" : "Главная"}</Link>
            <span>›</span>
            <span className="text-[#1A1A2E]">{l === "en" ? "Destinations" : l === "uz" ? "Yo'nalishlar" : "Направления"}</span>
          </nav>
          <h1 className="text-[36px] sm:text-[42px] md:text-[48px] font-bold text-[#1A1A2E] leading-[1.15]">
            {l === "en" ? "Where to go from Tashkent" : l === "uz" ? "Toshkentdan qayerga borish" : "Куда поехать из Ташкента"}
          </h1>
          <p className="mt-3 text-[16px] text-[#4B5563] max-w-[640px]">
            {l === "en"
              ? "Pick up your car in Tashkent and drive to the most iconic places in Uzbekistan — Silk Road cities, mountains, and desert towns."
              : l === "uz"
              ? "Avtomobilni Toshkentda oling va O'zbekistonning eng iconik joylariga boring — Ipak yo'li shaharlari, tog'lar va cho'l shaharchalari."
              : "Заберите авто в Ташкенте и поезжайте по самым знаковым местам Узбекистана — городам Шёлкового пути, горам и пустынным локациям."}
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-[1312px] px-6 md:px-16 py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {DESTINATIONS.map((d) => (
              <Link
                key={d.slug}
                href={`/${locale}/destinations/${d.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)] transition flex flex-col"
              >
                <div className="relative aspect-[4/3] bg-[#F5F5F0]">
                  <Image src={d.cover} alt={d.city} fill sizes="(min-width: 1024px) 300px, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h2 className="text-[18px] font-bold text-[#1A1A2E]">{d.city}</h2>
                  <p className="text-[12px] font-medium text-[#F97316] mt-0.5">{d.facts.distanceKm} km · {d.facts.drivingHours}</p>
                  <p className="text-[13px] text-[#4B5563] mt-2 line-clamp-3 leading-[1.55] flex-1">{d.description[l]}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
