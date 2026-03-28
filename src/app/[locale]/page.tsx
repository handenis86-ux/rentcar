import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

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
    cardBg: "bg-blue-50",
    initialsColor: "#1e40af",
    initialsBg: "#dbeafe",
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
    cardBg: "bg-rose-50",
    initialsColor: "#9f1239",
    initialsBg: "#ffe4e6",
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
    cardBg: "bg-amber-50",
    initialsColor: "#92400e",
    initialsBg: "#fef3c7",
  },
  {
    id: 4,
    brand: "Toyota",
    model: "Land Cruiser Prado",
    year: 2023,
    price: 1_500_000,
    seats: 7,
    fuel: "Дизель",
    transmission: "automatic" as const,
    initials: "TP",
    cardBg: "bg-emerald-50",
    initialsColor: "#065f46",
    initialsBg: "#d1fae5",
  },
];

const BRANDS = ["Все", "Chevrolet", "Kia", "Toyota", "BYD"];

/* ─── Inline SVG icons ──────────────────────────────────────────────────── */

function MapPinIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function CalendarIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function ArrowRightIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function CheckCircleIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function GearIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
    </svg>
  );
}

function FuelIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 22V8a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v14" />
      <path d="M3 16h12" />
      <path d="M14 10h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2 2 2 0 0 0 2-2V8l-3-3" />
    </svg>
  );
}

function UsersIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function ShieldIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function StarIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function ClockIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function HeadphonesIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </svg>
  );
}

function TagIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );
}

function CarIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6" />
      <rect x="11" y="11" width="10" height="8" rx="2" />
      <circle cx="5" cy="17" r="1" />
      <circle cx="18" cy="17" r="1" />
    </svg>
  );
}

/* ─── Hero ──────────────────────────────────────────────────────────────── */

function HeroSection() {
  const t = useTranslations("Hero");

  return (
    <section className="bg-white pt-10 pb-20 sm:pt-16 sm:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left — text + search form */}
          <div>
            {/* Orange badge */}
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold"
              style={{ background: "#FFF3E0", color: "#FFA633" }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "#FFA633" }}
                aria-hidden="true"
              />
              Лучший сервис аренды
            </span>

            {/* Headline */}
            <h1
              className="mt-4 text-4xl font-bold leading-tight sm:text-5xl"
              style={{ color: "#201F1D" }}
            >
              {t("headline")}
            </h1>
            <p className="mt-4 text-lg text-gray-500">{t("subheadline")}</p>

            {/* Search card */}
            <div className="mt-8 rounded-2xl bg-white shadow-xl p-5 sm:p-6 border border-gray-100">
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-400">
                {t("searchTitle")}
              </p>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {/* Pickup city */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    {t("pickupCity")}
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <MapPinIcon />
                    </span>
                    <input
                      type="text"
                      placeholder={t("pickupCityPlaceholder")}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-3 text-sm text-gray-900 placeholder-gray-400 focus:border-[#FFA633] focus:outline-none focus:ring-1 focus:ring-[#FFA633]"
                    />
                  </div>
                </div>

                {/* Dropoff city */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    {t("dropoffCity")}
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <MapPinIcon />
                    </span>
                    <input
                      type="text"
                      placeholder={t("dropoffCityPlaceholder")}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-3 text-sm text-gray-900 placeholder-gray-400 focus:border-[#FFA633] focus:outline-none focus:ring-1 focus:ring-[#FFA633]"
                    />
                  </div>
                </div>

                {/* Start date */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    {t("startDate")}
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <CalendarIcon />
                    </span>
                    <input
                      type="date"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-3 text-sm text-gray-900 focus:border-[#FFA633] focus:outline-none focus:ring-1 focus:ring-[#FFA633]"
                    />
                  </div>
                </div>

                {/* End date */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    {t("endDate")}
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <CalendarIcon />
                    </span>
                    <input
                      type="date"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-3 text-sm text-gray-900 focus:border-[#FFA633] focus:outline-none focus:ring-1 focus:ring-[#FFA633]"
                    />
                  </div>
                </div>
              </div>

              {/* Search button */}
              <button
                type="button"
                className="mt-4 w-full rounded-full py-3.5 text-sm font-semibold text-white transition hover:bg-[#e8952d] active:scale-[0.99]"
                style={{ background: "#FFA633" }}
              >
                {t("searchButton")}
              </button>
            </div>

            {/* Trust badges */}
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
              <span className="flex items-center gap-1.5 text-sm text-gray-600">
                <CheckCircleIcon className="h-4 w-4 text-[#127384]" />
                {t("trustFreeCancel")}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-gray-600">
                <CheckCircleIcon className="h-4 w-4 text-[#127384]" />
                {t("trustInsurance")}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-gray-600">
                <CheckCircleIcon className="h-4 w-4 text-[#127384]" />
                {t("trustRating")}
              </span>
            </div>
          </div>

          {/* Right — car image placeholder */}
          <div className="hidden lg:flex items-center justify-center">
            <div
              className="relative w-full max-w-lg rounded-3xl overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #e0f4f7 0%, #b2e0e8 100%)",
                aspectRatio: "4/3",
              }}
            >
              {/* Decorative circles */}
              <div
                className="absolute -top-10 -right-10 h-48 w-48 rounded-full opacity-30"
                style={{ background: "#127384" }}
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-8 -left-8 h-36 w-36 rounded-full opacity-20"
                style={{ background: "#FFA633" }}
                aria-hidden="true"
              />

              {/* Car emoji placeholder */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#127384"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-24 w-24 opacity-70"
                  aria-hidden="true"
                >
                  <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6" />
                  <rect x="11" y="11" width="10" height="8" rx="2" />
                  <circle cx="5" cy="17" r="1" />
                  <circle cx="18" cy="17" r="1" />
                </svg>
                <span
                  className="text-sm font-semibold tracking-wide opacity-60"
                  style={{ color: "#127384" }}
                >
                  DreamsRent
                </span>
              </div>

              {/* Floating badge */}
              <div
                className="absolute top-5 left-5 rounded-2xl px-4 py-2 shadow-lg"
                style={{ background: "#127384" }}
              >
                <p className="text-xs font-bold text-white">500+ авто</p>
                <p className="text-[10px] text-teal-200">по всему Узбекистану</p>
              </div>

              {/* Floating price badge */}
              <div className="absolute bottom-5 right-5 rounded-2xl bg-white px-4 py-2 shadow-lg">
                <p className="text-[10px] text-gray-400">от</p>
                <p className="text-sm font-extrabold" style={{ color: "#FFA633" }}>
                  300 000 сум
                </p>
                <p className="text-[10px] text-gray-400">в сутки</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Popular Cars ──────────────────────────────────────────────────────── */

function PopularCarsSection() {
  const t = useTranslations("PopularCars");
  const tCommon = useTranslations("common");
  const tCatalog = useTranslations("catalog");
  const tCar = useTranslations("car");

  return (
    <section style={{ background: "#f7f7f7" }} className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#FFA633" }}>
            {t("eyebrow")}
          </p>
          <h2
            className="mt-2 text-2xl font-bold sm:text-3xl"
            style={{ color: "#201F1D" }}
          >
            {t("heading")}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-gray-500">{t("subheading")}</p>
        </div>

        {/* Brand filter pills */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {BRANDS.map((brand, idx) => (
            <button
              key={brand}
              type="button"
              className="rounded-full px-5 py-2 text-sm font-semibold transition"
              style={
                idx === 0
                  ? { background: "#127384", color: "#fff" }
                  : {
                      background: "#fff",
                      color: "#2F2F2F",
                      border: "1px solid #e5e7eb",
                    }
              }
            >
              {brand}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {POPULAR_CARS.map((car) => (
            <div
              key={car.id}
              className="flex flex-col overflow-hidden rounded-xl bg-white shadow-sm transition hover:shadow-md"
            >
              {/* Car visual */}
              <div
                className="relative flex items-center justify-center py-10"
                style={{ background: car.initialsBg }}
              >
                <span
                  className="text-4xl font-black tracking-tight select-none"
                  style={{ color: car.initialsColor }}
                >
                  {car.initials}
                </span>
                {/* Year badge */}
                <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-[11px] font-semibold text-gray-600 shadow-sm">
                  {car.year}
                </span>
              </div>

              {/* Card body */}
              <div className="flex flex-1 flex-col gap-3 p-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                    {car.brand}
                  </p>
                  <h3 className="mt-0.5 text-base font-bold" style={{ color: "#201F1D" }}>
                    {car.model}
                  </h3>
                </div>

                {/* Specs grid */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex flex-col items-center gap-1 rounded-lg bg-gray-50 px-2 py-2">
                    <GearIcon className="h-3.5 w-3.5 text-gray-400" />
                    <span className="text-[10px] text-gray-500 text-center leading-tight">
                      {tCatalog(car.transmission)}
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1 rounded-lg bg-gray-50 px-2 py-2">
                    <FuelIcon className="h-3.5 w-3.5 text-gray-400" />
                    <span className="text-[10px] text-gray-500 text-center leading-tight">
                      {car.fuel}
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1 rounded-lg bg-gray-50 px-2 py-2">
                    <UsersIcon className="h-3.5 w-3.5 text-gray-400" />
                    <span className="text-[10px] text-gray-500 text-center leading-tight">
                      {car.seats} мест
                    </span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <MapPinIcon className="h-3.5 w-3.5" />
                  Ташкент
                </div>

                {/* Price + CTA */}
                <div className="mt-auto flex items-end justify-between border-t border-gray-100 pt-3">
                  <div>
                    <p className="text-base font-extrabold" style={{ color: "#201F1D" }}>
                      {car.price.toLocaleString("ru-RU")}
                    </p>
                    <p className="text-[11px] text-gray-400">
                      {tCommon("currency")} / {tCar("perDay")}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="rounded-full px-4 py-2 text-xs font-semibold text-white transition hover:opacity-90"
                    style={{ background: "#127384" }}
                  >
                    {tCommon("book")}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all link */}
        <div className="mt-10 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full border px-6 py-2.5 text-sm font-semibold transition hover:shadow-sm"
            style={{
              borderColor: "#127384",
              color: "#127384",
            }}
          >
            {t("viewAll")}
            <ArrowRightIcon />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── How It Works ──────────────────────────────────────────────────────── */

const HOW_IT_WORKS = [
  {
    num: "01",
    title: "Выберите место",
    desc: "Укажите город получения и возврата автомобиля. Мы работаем по всему Узбекистану.",
  },
  {
    num: "02",
    title: "Выберите дату",
    desc: "Задайте удобные даты аренды и мгновенно получите расчёт стоимости.",
  },
  {
    num: "03",
    title: "Забронируйте авто",
    desc: "Подтвердите бронь за несколько кликов и заберите автомобиль в нужное время.",
  },
] as const;

function HowItWorksSection() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#FFA633" }}>
            Просто и быстро
          </p>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl" style={{ color: "#201F1D" }}>
            Как это работает
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-gray-500">
            От выбора до старта — мы сделали всё максимально просто.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mt-14 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Dotted connector line — desktop */}
          <div
            className="hidden lg:block absolute top-10 left-[calc(16.67%+2.5rem)] right-[calc(16.67%+2.5rem)] border-t-2 border-dashed"
            style={{ borderColor: "#e5e7eb" }}
            aria-hidden="true"
          />

          {HOW_IT_WORKS.map(({ num, title, desc }) => (
            <div
              key={num}
              className="flex flex-col items-center rounded-2xl bg-white p-8 text-center shadow-sm"
              style={{ border: "1px solid #f0f0f0" }}
            >
              {/* Orange numbered circle */}
              <div
                className="flex h-20 w-20 items-center justify-center rounded-full text-2xl font-extrabold text-white"
                style={{ background: "linear-gradient(135deg, #FFA633 0%, #e8952d 100%)" }}
              >
                {num}
              </div>

              <h3
                className="mt-5 text-lg font-semibold"
                style={{ color: "#201F1D" }}
              >
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Stats Banner ──────────────────────────────────────────────────────── */

function StatsBanner() {
  const t = useTranslations("Stats");

  const stats = [
    { valueKey: "carsValue", labelKey: "carsLabel" },
    { valueKey: "citiesValue", labelKey: "citiesLabel" },
    { valueKey: "clientsValue", labelKey: "clientsLabel" },
    { valueKey: "yearsValue", labelKey: "yearsLabel" },
  ] as const;

  return (
    <section style={{ background: "#127384" }} className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-2 gap-10 lg:grid-cols-4">
          {stats.map(({ valueKey, labelKey }) => (
            <div key={valueKey} className="text-center">
              <dt className="text-4xl font-extrabold text-white sm:text-5xl">
                {t(valueKey)}
              </dt>
              <dd
                className="mt-2 text-sm font-medium"
                style={{ color: "#a5d8e0" }}
              >
                {t(labelKey)}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ─── Why Choose Us ─────────────────────────────────────────────────────── */

const ADVANTAGE_ICONS = [
  ShieldIcon,
  ClockIcon,
  StarIcon,
  HeadphonesIcon,
  TagIcon,
  CarIcon,
] as const;

function WhyChooseUsSection() {
  const t = useTranslations("WhyChooseUs");

  const advantages = [
    { titleKey: "advantage1Title", descKey: "advantage1Desc" },
    { titleKey: "advantage2Title", descKey: "advantage2Desc" },
    { titleKey: "advantage3Title", descKey: "advantage3Desc" },
    { titleKey: "advantage4Title", descKey: "advantage4Desc" },
    { titleKey: "advantage5Title", descKey: "advantage5Desc" },
    { titleKey: "advantage6Title", descKey: "advantage6Desc" },
  ] as const;

  return (
    <section style={{ background: "#f7f7f7" }} className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#FFA633" }}>
            {t("eyebrow")}
          </p>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl" style={{ color: "#201F1D" }}>
            {t("heading")}
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-gray-500">{t("subheading")}</p>
        </div>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map(({ titleKey, descKey }, idx) => {
            const Icon = ADVANTAGE_ICONS[idx];
            return (
              <div
                key={titleKey}
                className="group rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-l-4 hover:border-l-[#FFA633]"
              >
                {/* Icon in orange circle */}
                <div
                  className="mb-4 flex h-11 w-11 items-center justify-center rounded-full"
                  style={{ background: "#FFF3E0" }}
                >
                  <span style={{ color: "#FFA633" }} className="flex items-center justify-center">
                    <Icon className="h-5 w-5" />
                  </span>
                </div>

                <h3 className="text-sm font-semibold" style={{ color: "#201F1D" }}>
                  {t(titleKey)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                  {t(descKey)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA Section ───────────────────────────────────────────────────────── */

function CTASection() {
  const tNav = useTranslations("nav");

  return (
    <section style={{ background: "#201F1D" }} className="py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Готовы к поездке?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-gray-400">
          Тысячи водителей по всему Узбекистану уже доверяют нам. Забронируйте
          автомобиль за несколько минут.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          {/* Primary — orange pill */}
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
            style={{ background: "#FFA633" }}
          >
            {tNav("catalog")}
          </a>

          {/* Secondary — teal outline pill */}
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full border px-8 py-3.5 text-sm font-semibold transition hover:bg-white/5"
            style={{ borderColor: "#127384", color: "#fff" }}
          >
            {tNav("listYourCar")}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PopularCarsSection />
      <HowItWorksSection />
      <StatsBanner />
      <WhyChooseUsSection />
      <CTASection />
    </>
  );
}
