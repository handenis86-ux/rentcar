import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getCarBySlug, carDescription, CATALOG } from "@/lib/catalog";
import { EXTRAS } from "@/lib/catalog-extras";
import { ImageCarousel } from "@/components/ImageCarousel";
import { CarImage } from "@/components/CarImage";
import { getCarBySlug as getDbCarBySlug } from "@/lib/cars";
import { BookingForm } from "./_components/BookingForm";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rentz.uz";

export async function generateStaticParams() {
  return CATALOG.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const car = getCarBySlug(slug);
  if (!car) return {};
  const description = car.description[locale === "en" ? "en" : locale === "uz" ? "uz" : "ru"];
  const title =
    locale === "en"
      ? `Rent ${car.brand} ${car.model} ${car.year} in Uzbekistan from $${car.pricePerDay}/day`
      : locale === "uz"
      ? `${car.brand} ${car.model} ${car.year} ijaraga olish — kuniga $${car.pricePerDay}`
      : `Аренда ${car.brand} ${car.model} ${car.year} в Узбекистане — от $${car.pricePerDay}/день`;
  const url = `/${locale}/cars/${slug}`;
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ru: `/ru/cars/${slug}`,
        uz: `/uz/cars/${slug}`,
        en: `/en/cars/${slug}`,
        "x-default": `/en/cars/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      images: [{ url: car.images[0], width: 1200, height: 750, alt: `${car.brand} ${car.model}` }],
    },
    twitter: { card: "summary_large_image", title, description, images: [car.images[0]] },
  };
}

export default async function CarDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<{ pickup?: string; return?: string }>;
}) {
  const { locale, slug } = await params;
  const sp = await searchParams;
  const car = getCarBySlug(slug);
  if (!car) notFound();

  const dbCar = await getDbCarBySlug(slug);
  if (!dbCar) notFound();

  const t = await getTranslations({ locale, namespace: "fleet" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const extra = EXTRAS[car.slug];

  const badgeLabel: Record<string, string> = {
    economy: t("filterEconomy"),
    comfort: t("filterComfort"),
    premium: t("filterPremium"),
    suv:     t("filterSUV"),
    minivan: t("filterMinivan"),
  };

  const bookingCar = {
    id:          dbCar.id,
    ownerId:     dbCar.ownerId,
    brand:       dbCar.brand,
    model:       dbCar.model,
    pricePerDay: dbCar.pricePerDay,
    deposit:     dbCar.deposit,
    address:     dbCar.address,
  };

  const vehicleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    name: `${car.brand} ${car.model}`,
    brand: { "@type": "Brand", name: car.brand },
    model: car.model,
    vehicleModelDate: String(car.year),
    bodyType: car.body,
    fuelType: car.fuel,
    vehicleTransmission: car.transmission === "auto" ? "AutomaticTransmission" : "ManualTransmission",
    seatingCapacity: car.seats,
    image: car.images.map((src) => src.startsWith("http") ? src : `${SITE_URL}${src}`),
    description: carDescription(car, locale),
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/${locale}/cars/${car.slug}`,
      priceCurrency: "USD",
      price: car.pricePerDay,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: car.pricePerDay,
        priceCurrency: "USD",
        unitCode: "DAY",
      },
      availability: "https://schema.org/InStock",
      seller: { "@id": `${SITE_URL}/#org` },
    },
  };

  const homeName = locale === "en" ? "Home" : locale === "uz" ? "Bosh sahifa" : "Главная";
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: homeName,    item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: t("title"),  item: `${SITE_URL}/${locale}/cars` },
      { "@type": "ListItem", position: 3, name: `${car.brand} ${car.model}`, item: `${SITE_URL}/${locale}/cars/${car.slug}` },
    ],
  };

  // Related cars: same category, exclude current
  const related = CATALOG
    .filter((c) => c.slug !== car.slug && c.category === car.category)
    .slice(0, 3);

  return (
    <section className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(vehicleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="mx-auto max-w-[1312px] px-6 md:px-16 pt-8">
        <nav className="flex items-center gap-1.5 text-[13px] text-[#9CA3AF]" aria-label="Breadcrumb">
          <Link href={`/${locale}`} className="hover:text-[#F97316] transition-colors">{locale === "en" ? "Home" : locale === "uz" ? "Bosh sahifa" : "Главная"}</Link>
          <span>›</span>
          <Link href={`/${locale}/cars`} className="hover:text-[#F97316] transition-colors">{t("title")}</Link>
          <span>›</span>
          <span className="text-[#1A1A2E]">{car.brand} {car.model}</span>
        </nav>
      </div>
      <div className="mx-auto max-w-[1312px] px-6 md:px-16 py-10 grid md:grid-cols-[1.2fr_1fr] gap-10 items-start">
        <ImageCarousel images={car.images} alt={`${car.brand} ${car.model}`} />

        <div className="space-y-5">
          <span className={`inline-block rounded-full px-3 py-1 text-[12px] font-semibold ${
            car.category === "economy" ? "bg-[#FFF7ED] text-[#F97316]" :
            car.category === "comfort" ? "bg-[#F0F9FF] text-[#0EA5E9]" :
            car.category === "premium" ? "bg-[#FEF3C7] text-[#B45309]" :
            car.category === "suv"     ? "bg-[#ECFDF5] text-[#16A34A]" :
                                          "bg-[#F5F3FF] text-[#7C3AED]"
          }`}>
            {badgeLabel[car.category]}
          </span>
          <h1 className="text-[32px] md:text-[40px] font-bold text-[#1A1A2E] leading-tight">
            {car.brand} {car.model}
          </h1>
          <p className="text-[13px] text-[#9CA3AF]">{car.year} · <span className="capitalize">{car.body}</span></p>

          <p className="text-[15px] text-[#4B5563] leading-[1.7]">
            {carDescription(car, locale)}
          </p>

          <div className="flex items-end gap-1">
            <span className="text-[36px] font-extrabold text-[#F97316]">${car.pricePerDay}</span>
            <span className="text-[15px] text-[#9CA3AF] mb-1">{tc("perDay")}</span>
          </div>

          <dl className="grid grid-cols-2 gap-3 text-[14px] pt-2">
            <Spec label={tc("seats")} value={String(car.seats)} />
            <Spec label={car.bags === 1 ? t("bagUnit") : t("bagsUnit")} value={String(car.bags)} />
            <Spec label="Transmission" value={car.transmission === "auto" ? tc("auto") : tc("manual")} />
            <Spec label="Engine" value={car.engine} />
            <Spec label="Drive" value={car.drive.toUpperCase()} />
            <Spec label="Fuel" value={capitalize(car.fuel)} />
            {extra && (
              <>
                <Spec label={tc("deposit")} value={`${extra.depositUzs.toLocaleString("ru-RU")} ${tc("uzs")}`} />
                <Spec label={tc("dailyLimit")} value={`${extra.dailyKm} ${tc("km")}`} />
              </>
            )}
          </dl>

          {extra && extra.features.length > 0 && (
            <div className="pt-2">
              <h2 className="text-[13px] uppercase tracking-wide font-semibold text-[#9CA3AF] mb-3">{tc("equipment")}</h2>
              <div className="flex flex-wrap gap-1.5">
                {extra.features.map((f) => (
                  <span key={f} className="inline-flex items-center rounded-full bg-[#F5F5F0] text-[#1A1A2E] text-[12px] px-3 py-1.5">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          )}

          {extra && (
            <div className="bg-[#F5F5F0] rounded-2xl p-5 mt-2">
              <h2 className="text-[13px] uppercase tracking-wide font-semibold text-[#9CA3AF] mb-3">
                {locale === "en" ? "Rental terms" : locale === "uz" ? "Ijara shartlari" : "Условия аренды"}
              </h2>
              <ul className="space-y-2 text-[13px] text-[#1A1A2E]">
                {[
                  locale === "en"
                    ? "Third-party insurance included"
                    : locale === "uz"
                    ? "Uchinchi tomon sug'urtasi narxga kiritilgan"
                    : "Страховка ОСАГО включена",
                  locale === "en"
                    ? `Mileage allowance: ${extra.dailyKm} km/day, extra from 2,000 UZS/km`
                    : locale === "uz"
                    ? `Probeg limiti: kuniga ${extra.dailyKm} km, ortig'i 2 000 so'm/km dan`
                    : `Лимит пробега: ${extra.dailyKm} км/день, превышение от 2 000 сум/км`,
                  locale === "en"
                    ? `Deposit ${extra.depositUzs.toLocaleString("en-US")} UZS, refunded in 7–10 business days`
                    : locale === "uz"
                    ? `Garov ${extra.depositUzs.toLocaleString("ru-RU")} so'm, 7–10 ish kunida qaytariladi`
                    : `Залог ${extra.depositUzs.toLocaleString("ru-RU")} сум, возврат за 7–10 рабочих дней`,
                  locale === "en"
                    ? "Free pickup and drop-off across Tashkent"
                    : locale === "uz"
                    ? "Toshkent bo'ylab bepul yetkazib berish va qaytarib olish"
                    : "Бесплатная подача и возврат по Ташкенту",
                  locale === "en"
                    ? "Full-to-full fuel policy"
                    : locale === "uz"
                    ? "Yoqilg'i: to'liq olasiz, to'liq qaytarasiz"
                    : "Топливо: с полным баком и возврат с полным",
                ].map((line, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <svg className="h-4 w-4 text-[#16A34A] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="m9 16.17-3.88-3.88a.996.996 0 1 0-1.41 1.41l4.59 4.59c.39.39 1.02.39 1.41 0L21.7 7.21a.996.996 0 1 0-1.41-1.41L9 16.17z"/></svg>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-stretch gap-3 pt-4">
            <div className="flex-1">
              <BookingForm
                car={bookingCar}
                initialPickup={sp.pickup}
                initialReturn={sp.return}
              />
            </div>
            <Link
              href={`/${locale}/cars`}
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-[14px] font-semibold text-[#1A1A2E] border border-[#D1D5DB] hover:border-[#1A1A2E] transition"
            >
              ← {tc("browseFleet")}
            </Link>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="bg-[#F5F5F0] border-t border-[#E5E7EB]">
          <div className="mx-auto max-w-[1312px] px-6 md:px-16 py-14">
            <h2 className="text-[24px] md:text-[28px] font-bold text-[#1A1A2E] mb-6">
              {locale === "en" ? "Similar cars" : locale === "uz" ? "O'xshash avtomobillar" : "Похожие авто"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((rc) => (
                <Link key={rc.slug} href={`/${locale}/cars/${rc.slug}`} className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition flex flex-col">
                  <div className="relative aspect-[16/10] bg-[#F5F5F0]">
                    <CarImage car={rc} />
                  </div>
                  <div className="p-5 flex items-center justify-between">
                    <div>
                      <h3 className="text-[16px] font-bold text-[#1A1A2E]">{rc.brand} {rc.model}</h3>
                      <p className="text-[12px] text-[#9CA3AF] mt-0.5">{rc.year} · {badgeLabel[rc.category]}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[18px] font-bold text-[#F97316]">${rc.pricePerDay}</span>
                      <span className="text-[12px] text-[#9CA3AF]"> {tc("perDay")}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#F5F5F0] rounded-[10px] px-4 py-3">
      <dt className="text-[11px] uppercase tracking-wide font-semibold text-[#9CA3AF]">{label}</dt>
      <dd className="text-[15px] font-semibold text-[#1A1A2E] mt-0.5 break-words">{value}</dd>
    </div>
  );
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
