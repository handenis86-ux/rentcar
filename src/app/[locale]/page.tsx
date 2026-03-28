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

/* ─── (car image is now /public/car-hero.png) ─────────────────────────── */

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
      {/* ── 1. HERO — DreamsRent style: white bg, text left, car image right ── */}
      <section className="relative bg-white overflow-hidden" style={{ minHeight: "580px" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row items-center gap-10">

            {/* Left column — text */}
            <div className="lg:w-1/2 space-y-6 relative z-10">
              <span className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-[#FFA633] text-sm font-medium rounded-full px-4 py-1.5">
                <span>👍</span> 100% {tHero("trustInsurance")}
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold leading-[1.1]">
                <span className="text-[#201F1D]">{headlineFirst}</span>
                <br />
                <span className="text-[#FFA633]">{headlineRest}</span>
              </h1>

              <p className="text-gray-500 text-base sm:text-lg max-w-lg leading-relaxed">
                {tHero("subheadline")}
              </p>

              <Link
                href="/cars"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-[#201F1D] text-[#201F1D] px-7 py-3 font-semibold hover:bg-[#201F1D] hover:text-white transition text-sm"
              >
                {tCars("viewAll")}
                <IconArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Right column — car image on orange background */}
            <div className="lg:w-1/2 relative min-h-[350px] lg:min-h-[450px]">
              {/* Orange shape extending to the right edge */}
              <div className="absolute -right-[200px] top-0 bottom-0 left-[10%] bg-[#FFA633]" style={{ borderRadius: "0 0 0 60px" }} />

              {/* Car image — real PNG */}
              <div className="relative z-10 flex items-center justify-center h-full">
                <img
                  src="/car-hero.png"
                  alt="Аренда автомобиля"
                  className="w-full max-w-[550px] h-auto object-contain drop-shadow-2xl"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 2. SEARCH BAR — full-width strip below hero ──────────────────── */}
      <section className="bg-[#201F1D] py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 items-end">
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">{tHero("pickupCity")}</label>
              <input type="text" placeholder={tHero("pickupCityPlaceholder")} className="w-full rounded-lg bg-white py-2.5 px-3 text-sm text-[#2F2F2F] outline-none" />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">{tHero("dropoffCity")}</label>
              <input type="text" placeholder={tHero("dropoffCityPlaceholder")} className="w-full rounded-lg bg-white py-2.5 px-3 text-sm text-[#2F2F2F] outline-none" />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">{tHero("startDate")}</label>
              <input type="date" className="w-full rounded-lg bg-white py-2.5 px-3 text-sm text-[#2F2F2F] outline-none" />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Время</label>
              <input type="time" defaultValue="10:00" className="w-full rounded-lg bg-white py-2.5 px-3 text-sm text-[#2F2F2F] outline-none" />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">{tHero("endDate")}</label>
              <input type="date" className="w-full rounded-lg bg-white py-2.5 px-3 text-sm text-[#2F2F2F] outline-none" />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Время</label>
              <input type="time" defaultValue="10:00" className="w-full rounded-lg bg-white py-2.5 px-3 text-sm text-[#2F2F2F] outline-none" />
            </div>
            <div>
              <button className="w-full bg-[#FFA633] hover:bg-[#e8952d] text-white rounded-lg py-2.5 px-4 font-semibold transition flex items-center justify-center gap-2 text-sm">
                <IconSearch className="w-4 h-4" />
                {tHero("searchButton")}
              </button>
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
