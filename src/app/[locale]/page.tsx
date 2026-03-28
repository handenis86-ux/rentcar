import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";

/* ─── Meta ─────────────────────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HomePage" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

/* ─── Mock data ─────────────────────────────────────────────────────────── */

const POPULAR_CARS = [
  {
    id: 1,
    brand: "Chevrolet",
    model: "Spark",
    year: 2023,
    price: 300_000,
    seats: 4,
    fuel: "Бензин",
    transmission: "manual" as const,
    initials: "CS",
    bgClass: "bg-amber-50",
    textClass: "text-amber-600",
    city: "Ташкент",
  },
  {
    id: 2,
    brand: "Chevrolet",
    model: "Tracker",
    year: 2024,
    price: 650_000,
    seats: 5,
    fuel: "Бензин",
    transmission: "automatic" as const,
    initials: "CT",
    bgClass: "bg-rose-50",
    textClass: "text-rose-600",
    city: "Ташкент",
  },
  {
    id: 3,
    brand: "Toyota",
    model: "Camry",
    year: 2024,
    price: 900_000,
    seats: 5,
    fuel: "Бензин",
    transmission: "automatic" as const,
    initials: "TC",
    bgClass: "bg-teal-50",
    textClass: "text-teal-600",
    city: "Ташкент",
  },
  {
    id: 4,
    brand: "Toyota",
    model: "Prado",
    year: 2024,
    price: 1_500_000,
    seats: 7,
    fuel: "Дизель",
    transmission: "automatic" as const,
    initials: "TP",
    bgClass: "bg-emerald-50",
    textClass: "text-emerald-600",
    city: "Ташкент",
  },
];

const BRAND_TABS = ["Все", "Chevrolet", "Kia", "Toyota", "BYD"];

/* ─── Inline SVG Icons ─────────────────────────────────────────────────── */

function IconLocation({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconCalendar({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function IconCar({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 17h2m10 0h2M3 11l1.5-5A2 2 0 0 1 6.4 4.5h11.2a2 2 0 0 1 1.9 1.5L21 11" />
      <rect x="2" y="11" width="20" height="6" rx="2" />
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  );
}

function IconGear({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function IconDroplet({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  );
}

function IconUser({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function IconSearch({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function IconShield({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function IconCheck({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function IconArrowRight({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

/* ─── Car silhouette SVG ───────────────────────────────────────────────── */

function CarSilhouette() {
  return (
    <svg viewBox="0 0 400 180" fill="none" className="w-full h-auto">
      <path
        d="M45 130 C45 130 55 90 80 75 C105 60 140 50 180 48 C220 46 270 48 310 60 C340 68 360 85 365 95 L375 110 C378 115 380 120 380 125 L380 140 C380 145 376 148 372 148 L350 148 C346 148 342 144 340 140 C338 135 332 130 322 130 C312 130 306 135 304 140 C302 144 298 148 294 148 L110 148 C106 148 102 144 100 140 C98 135 92 130 82 130 C72 130 66 135 64 140 C62 144 58 148 54 148 L32 148 C28 148 24 145 24 140 L24 130 C24 125 28 122 32 122 L45 130Z"
        fill="#201F1D"
      />
      <circle cx="82" cy="142" r="14" fill="#444" />
      <circle cx="82" cy="142" r="8" fill="#666" />
      <circle cx="322" cy="142" r="14" fill="#444" />
      <circle cx="322" cy="142" r="8" fill="#666" />
      <path d="M100 75 C120 60 160 50 200 48 L200 48 C230 48 260 52 280 60 L270 90 L110 90 Z" fill="#333" opacity="0.5" />
      <rect x="50" y="100" width="40" height="12" rx="4" fill="#FFA633" opacity="0.8" />
      <rect x="320" y="100" width="40" height="12" rx="4" fill="#e33" opacity="0.8" />
    </svg>
  );
}

/* ─── Page Component ───────────────────────────────────────────────────── */

export default function HomePage() {
  const tHero = useTranslations("Hero");
  const tCars = useTranslations("PopularCars");
  const tStats = useTranslations("Stats");
  const tWhy = useTranslations("WhyChooseUs");
  const tCommon = useTranslations("common");
  const tCatalog = useTranslations("catalog");

  const headline = tHero("headline");
  const headlineWords = headline.split(" ");
  const headlineFirst = headlineWords.slice(0, 2).join(" ");
  const headlineRest = headlineWords.slice(2).join(" ");

  return (
    <>
      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section className="bg-[#f5f5f5] py-16 lg:py-24 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left column */}
            <div className="lg:w-1/2 space-y-6">
              <span className="inline-block bg-orange-100 text-orange-600 text-sm font-medium rounded-full px-4 py-1.5">
                Лучший сервис аренды
              </span>

              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
                <span className="text-[#201F1D]">{headlineFirst}</span>{" "}
                <span className="text-[#FFA633]">{headlineRest}</span>
              </h1>

              <p className="text-gray-500 text-lg max-w-md">
                {tHero("subheadline")}
              </p>

              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#201F1D] text-[#201F1D] px-7 py-3 font-semibold hover:bg-[#201F1D] hover:text-white transition"
              >
                {tCars("viewAll")}
                <IconArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Right column */}
            <div className="lg:w-1/2 relative min-h-[380px] flex items-center justify-center">
              {/* Diagonal orange stripe */}
              <div
                className="absolute right-0 top-0 w-[60%] h-full bg-[#FFA633] rounded-3xl"
                style={{ transform: "rotate(-12deg)", transformOrigin: "center center" }}
              />

              {/* Car card */}
              <div className="relative bg-white rounded-2xl shadow-xl p-6 w-full max-w-[420px] z-10">
                <CarSilhouette />
              </div>

              {/* Floating badge */}
              <div className="absolute top-4 left-0 lg:left-4 z-20 bg-white rounded-xl shadow-lg px-4 py-3 flex items-center gap-2">
                <span className="text-[#FFA633] font-bold text-lg">500+</span>
                <span className="text-gray-600 text-sm font-medium">авто</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. SEARCH BAR ────────────────────────────────────────────────── */}
      <section className="bg-white py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <p className="text-center text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
              {tHero("searchTitle")}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {/* Город получения */}
              <div>
                <label className="block text-xs text-gray-500 uppercase mb-1.5">
                  {tHero("pickupCity")}
                </label>
                <input
                  type="text"
                  placeholder={tHero("pickupCityPlaceholder")}
                  className="w-full border border-gray-200 rounded-lg bg-[#f5f5f5] py-2.5 px-3 text-sm text-[#2F2F2F] outline-none focus:border-[#FFA633] transition"
                  readOnly
                />
              </div>

              {/* Город возврата */}
              <div>
                <label className="block text-xs text-gray-500 uppercase mb-1.5">
                  {tHero("dropoffCity")}
                </label>
                <input
                  type="text"
                  placeholder={tHero("dropoffCityPlaceholder")}
                  className="w-full border border-gray-200 rounded-lg bg-[#f5f5f5] py-2.5 px-3 text-sm text-[#2F2F2F] outline-none focus:border-[#FFA633] transition"
                  readOnly
                />
              </div>

              {/* Дата начала */}
              <div>
                <label className="block text-xs text-gray-500 uppercase mb-1.5">
                  {tHero("startDate")}
                </label>
                <input
                  type="date"
                  className="w-full border border-gray-200 rounded-lg bg-[#f5f5f5] py-2.5 px-3 text-sm text-[#2F2F2F] outline-none focus:border-[#FFA633] transition"
                  readOnly
                />
              </div>

              {/* Время начала */}
              <div>
                <label className="block text-xs text-gray-500 uppercase mb-1.5">
                  Время начала
                </label>
                <input
                  type="time"
                  defaultValue="10:00"
                  className="w-full border border-gray-200 rounded-lg bg-[#f5f5f5] py-2.5 px-3 text-sm text-[#2F2F2F] outline-none focus:border-[#FFA633] transition"
                  readOnly
                />
              </div>

              {/* Дата окончания */}
              <div>
                <label className="block text-xs text-gray-500 uppercase mb-1.5">
                  {tHero("endDate")}
                </label>
                <input
                  type="date"
                  className="w-full border border-gray-200 rounded-lg bg-[#f5f5f5] py-2.5 px-3 text-sm text-[#2F2F2F] outline-none focus:border-[#FFA633] transition"
                  readOnly
                />
              </div>

              {/* Время окончания */}
              <div>
                <label className="block text-xs text-gray-500 uppercase mb-1.5">
                  Время окончания
                </label>
                <input
                  type="time"
                  defaultValue="10:00"
                  className="w-full border border-gray-200 rounded-lg bg-[#f5f5f5] py-2.5 px-3 text-sm text-[#2F2F2F] outline-none focus:border-[#FFA633] transition"
                  readOnly
                />
              </div>
            </div>

            <div className="mt-5 flex justify-center">
              <Link
                href="/catalog"
                className="inline-flex items-center justify-center gap-2 bg-[#FFA633] hover:bg-[#e8952d] text-white rounded-full py-3.5 px-10 font-semibold transition w-full sm:w-auto"
              >
                <IconSearch className="w-5 h-5" />
                {tHero("searchButton")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. HOW IT WORKS ──────────────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#201F1D] text-center mb-12">
            Как это работает
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {/* Step 1 */}
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-[#FFF3E0] mx-auto flex items-center justify-center text-[#FFA633]">
                <IconLocation className="w-7 h-7" />
              </div>
              <h3 className="font-semibold text-[#201F1D] mt-4">Выберите место</h3>
              <p className="text-sm text-gray-500 mt-2">
                Укажите город получения и возврата автомобиля
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-[#FFF3E0] mx-auto flex items-center justify-center text-[#FFA633]">
                <IconCalendar className="w-7 h-7" />
              </div>
              <h3 className="font-semibold text-[#201F1D] mt-4">Выберите дату</h3>
              <p className="text-sm text-gray-500 mt-2">
                Выберите даты начала и окончания аренды
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-[#FFF3E0] mx-auto flex items-center justify-center text-[#FFA633]">
                <IconCar className="w-7 h-7" />
              </div>
              <h3 className="font-semibold text-[#201F1D] mt-4">Забронируйте авто</h3>
              <p className="text-sm text-gray-500 mt-2">
                Выберите подходящий автомобиль и оформите бронь
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. POPULAR CARS ──────────────────────────────────────────────── */}
      <section className="bg-[#f5f5f5] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#201F1D] text-center mb-8">
            {tCars("heading")}
          </h2>

          {/* Brand tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {BRAND_TABS.map((tab, i) => (
              <span
                key={tab}
                className={
                  i === 0
                    ? "bg-[#FFA633] text-white rounded-full px-5 py-2 text-sm font-medium"
                    : "bg-white border border-gray-200 text-gray-600 rounded-full px-5 py-2 text-sm font-medium"
                }
              >
                {tab}
              </span>
            ))}
          </div>

          {/* Car grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {POPULAR_CARS.map((car) => (
              <div
                key={car.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                {/* Colored header with initials */}
                <div
                  className={`${car.bgClass} h-48 flex items-center justify-center`}
                >
                  <span
                    className={`${car.textClass} text-5xl font-black select-none`}
                  >
                    {car.initials}
                  </span>
                </div>

                {/* Body */}
                <div className="p-4">
                  <p className="text-xs text-gray-400 uppercase font-medium">
                    {car.brand}
                  </p>
                  <h3 className="text-lg font-bold text-[#201F1D]">
                    {car.model} {car.year}
                  </h3>

                  {/* Specs grid */}
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <IconGear className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>
                        {car.transmission === "automatic"
                          ? tCatalog("automatic")
                          : tCatalog("manual")}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <IconDroplet className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{car.fuel}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <IconUser className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{car.seats}</span>
                    </div>
                  </div>

                  {/* Location */}
                  <p className="text-xs text-gray-400 mt-2">
                    📍 {car.city}
                  </p>

                  {/* Divider */}
                  <div className="border-t mt-3 pt-3 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-[#201F1D]">
                        от {car.price.toLocaleString("ru-RU")} {tCommon("currency")}
                      </span>
                      <span className="text-gray-400 text-sm ml-1">
                        / {tCommon("perDay")}
                      </span>
                    </div>
                    <Link
                      href="/catalog"
                      className="bg-[#127384] text-white rounded-full px-5 py-2 text-sm font-medium hover:bg-[#0e5f6d] transition"
                    >
                      {tCommon("book")}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. STATS ─────────────────────────────────────────────────────── */}
      <section className="bg-[#127384] py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-extrabold text-white">
                {tStats("carsValue")}
              </p>
              <p className="text-sm text-teal-100 mt-1">
                {tStats("carsLabel")}
              </p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-white">
                {tStats("citiesValue")}
              </p>
              <p className="text-sm text-teal-100 mt-1">
                {tStats("citiesLabel")}
              </p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-white">
                {tStats("clientsValue")}
              </p>
              <p className="text-sm text-teal-100 mt-1">
                {tStats("clientsLabel")}
              </p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-white">
                {tStats("yearsValue")}
              </p>
              <p className="text-sm text-teal-100 mt-1">
                {tStats("yearsLabel")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. WHY CHOOSE US ─────────────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-semibold text-[#FFA633] uppercase tracking-wide mb-2">
            {tWhy("eyebrow")}
          </p>
          <h2 className="text-2xl font-bold text-[#201F1D] text-center mb-4">
            {tWhy("heading")}
          </h2>
          <p className="text-center text-gray-500 max-w-2xl mx-auto mb-12">
            {tWhy("subheading")}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-[#f5f5f5] rounded-xl p-8 text-center">
              <div className="h-14 w-14 rounded-full bg-[#FFF3E0] mx-auto flex items-center justify-center text-[#FFA633]">
                <IconShield className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-[#201F1D] mt-4">
                {tWhy("advantage1Title")}
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                {tWhy("advantage1Desc")}
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#f5f5f5] rounded-xl p-8 text-center">
              <div className="h-14 w-14 rounded-full bg-[#FFF3E0] mx-auto flex items-center justify-center text-[#FFA633]">
                <IconCheck className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-[#201F1D] mt-4">
                {tWhy("advantage2Title")}
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                {tWhy("advantage2Desc")}
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#f5f5f5] rounded-xl p-8 text-center">
              <div className="h-14 w-14 rounded-full bg-[#FFF3E0] mx-auto flex items-center justify-center text-[#FFA633]">
                <IconCar className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-[#201F1D] mt-4">
                {tWhy("advantage3Title")}
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                {tWhy("advantage3Desc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. CTA ───────────────────────────────────────────────────────── */}
      <section className="bg-[#201F1D] py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Готовы к поездке?
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
            Выберите автомобиль из нашего каталога и забронируйте онлайн за пару минут
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 bg-[#FFA633] hover:bg-[#e8952d] text-white rounded-full px-8 py-3.5 font-semibold transition"
            >
              {tCars("viewAll")}
              <IconArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white text-white px-8 py-3.5 font-semibold hover:bg-white hover:text-[#201F1D] transition"
            >
              Связаться с нами
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
