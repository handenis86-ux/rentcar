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
    transmission: "manual" as const,
    initials: "CS",
    initialsClass: "bg-blue-100 text-blue-800",
  },
  {
    id: 2,
    brand: "Chevrolet",
    model: "Tracker",
    year: 2024,
    price: 650_000,
    seats: 5,
    transmission: "automatic" as const,
    initials: "CT",
    initialsClass: "bg-rose-100 text-rose-800",
  },
  {
    id: 3,
    brand: "Toyota",
    model: "Camry",
    year: 2024,
    price: 900_000,
    seats: 5,
    transmission: "automatic" as const,
    initials: "TC",
    initialsClass: "bg-amber-100 text-amber-800",
  },
  {
    id: 4,
    brand: "Toyota",
    model: "Land Cruiser Prado",
    year: 2023,
    price: 1_500_000,
    seats: 7,
    transmission: "automatic" as const,
    initials: "TP",
    initialsClass: "bg-emerald-100 text-emerald-800",
  },
];

/* ─── SVG Icons ─────────────────────────────────────────────────────────── */

function MapPinIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

/* ─── Hero ──────────────────────────────────────────────────────────────── */

function HeroSection() {
  const t = useTranslations("Hero");

  return (
    <section
      className="relative bg-gradient-to-b from-blue-900 to-blue-800 py-28 pb-36"
      style={{
        clipPath: "ellipse(120% 100% at 50% 0%)",
      }}
    >
      {/* Text block */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
          {t("headline")}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-stone-300">
          {t("subheadline")}
        </p>
      </div>

      {/* Search card — overlaps into next section */}
      <div className="mx-auto mt-12 max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10 -mb-16">
        <div className="rounded-2xl bg-white shadow-xl p-6 sm:p-8">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-stone-400">
            {t("searchTitle")}
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Pickup city */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
                {t("pickupCity")}
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-400">
                  <MapPinIcon />
                </span>
                <input
                  type="text"
                  placeholder={t("pickupCityPlaceholder")}
                  className="w-full rounded-lg border border-stone-200 py-2.5 pl-9 pr-3 text-sm text-stone-900 placeholder-stone-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>

            {/* Dropoff city */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
                {t("dropoffCity")}
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-400">
                  <MapPinIcon />
                </span>
                <input
                  type="text"
                  placeholder={t("dropoffCityPlaceholder")}
                  className="w-full rounded-lg border border-stone-200 py-2.5 pl-9 pr-3 text-sm text-stone-900 placeholder-stone-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>

            {/* Start date */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
                {t("startDate")}
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-400">
                  <CalendarIcon />
                </span>
                <input
                  type="date"
                  className="w-full rounded-lg border border-stone-200 py-2.5 pl-9 pr-3 text-sm text-stone-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>

            {/* End date */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
                {t("endDate")}
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-400">
                  <CalendarIcon />
                </span>
                <input
                  type="date"
                  className="w-full rounded-lg border border-stone-200 py-2.5 pl-9 pr-3 text-sm text-stone-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>
          </div>

          {/* Search button */}
          <button
            type="button"
            className="mt-5 w-full rounded-xl bg-orange-500 py-4 text-sm font-bold text-white transition hover:bg-orange-600 active:scale-[0.99]"
          >
            {t("searchButton")}
          </button>

          {/* Trust badges */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-1">
            <span className="text-xs text-stone-500">
              <span className="mr-1 font-bold text-orange-500">&#10003;</span>
              {t("trustFreeCancel") || "Бесплатная отмена"}
            </span>
            <span className="text-xs text-stone-500">
              <span className="mr-1 font-bold text-orange-500">&#10003;</span>
              {t("trustInsurance") || "Полная страховка"}
            </span>
            <span className="text-xs text-stone-500">
              <span className="mr-1 font-bold text-orange-500">&#10003;</span>
              {t("trustRating") || "Рейтинг 4.9"}
            </span>
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
    <section className="bg-white pt-28 pb-20 sm:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-500">
              {t("eyebrow")}
            </p>
            <h2 className="mt-1 text-2xl font-bold text-stone-900 sm:text-3xl">
              {t("heading")}
            </h2>
            <p className="mt-1 text-stone-500">{t("subheading")}</p>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-800 hover:text-orange-500 whitespace-nowrap transition-colors"
          >
            {t("viewAll")}
            <ArrowRightIcon />
          </a>
        </div>

        {/* Cards grid */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {POPULAR_CARS.map((car) => (
            <div
              key={car.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white transition-shadow hover:shadow-lg hover:border-blue-200"
            >
              {/* Car visual — colored rectangle with initials */}
              <div
                className={`flex items-center justify-center ${car.initialsClass} py-10 relative`}
              >
                <span className="text-4xl font-black tracking-tight select-none">
                  {car.initials}
                </span>
                <span className="absolute right-3 top-3 rounded-full bg-white/80 px-2 py-0.5 text-[11px] font-semibold text-stone-600 border border-stone-100">
                  {car.year}
                </span>
              </div>

              {/* Card body */}
              <div className="flex flex-1 flex-col gap-3 p-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-400">
                    {car.brand}
                  </p>
                  <h3 className="mt-0.5 text-base font-bold text-stone-900">
                    {car.model}
                  </h3>
                </div>

                {/* Specs row */}
                <p className="text-xs text-stone-500">
                  {car.year}&nbsp;&middot;&nbsp;
                  {tCatalog(car.transmission)}&nbsp;&middot;&nbsp;
                  {car.seats} мест
                </p>

                {/* Price + CTA */}
                <div className="mt-auto flex items-center justify-between border-t border-stone-100 pt-3">
                  <div>
                    <p className="text-lg font-extrabold text-stone-900">
                      {car.price.toLocaleString("ru-RU")}
                    </p>
                    <p className="text-[11px] text-stone-400">
                      {tCommon("currency")} / {tCar("perDay")}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="rounded-lg bg-orange-500 px-3 py-2 text-xs font-bold text-white transition hover:bg-orange-600"
                  >
                    {tCommon("book")}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── How It Works ──────────────────────────────────────────────────────── */

const HOW_IT_WORKS = [
  {
    num: "01",
    title: "Выберите авто",
    desc: "Просмотрите каталог и выберите подходящий автомобиль для вашей поездки.",
  },
  {
    num: "02",
    title: "Забронируйте",
    desc: "Укажите даты, подтвердите детали и оплатите бронирование за несколько минут.",
  },
  {
    num: "03",
    title: "В путь!",
    desc: "Заберите автомобиль в удобном месте и отправляйтесь навстречу приключениям.",
  },
];

function HowItWorksSection() {
  return (
    <section className="bg-stone-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-orange-500">
            Просто и быстро
          </p>
          <h2 className="mt-2 text-2xl font-bold text-stone-900 sm:text-3xl">
            Как это работает
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-stone-500">
            От выбора до старта — мы сделали всё максимально просто.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-3 relative">
          {/* Connector line — desktop only */}
          <div
            className="hidden lg:block absolute top-9 left-[calc(1/6*100%+2rem)] right-[calc(1/6*100%+2rem)] h-px bg-stone-200"
            aria-hidden="true"
          />

          {HOW_IT_WORKS.map(({ num, title, desc }) => (
            <div key={num} className="flex flex-col items-center text-center relative">
              {/* Faded background number */}
              <div className="relative flex items-center justify-center">
                <span
                  className="absolute text-[72px] font-black text-blue-900/10 leading-none select-none"
                  aria-hidden="true"
                >
                  {num}
                </span>
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-2 border-orange-500 bg-white text-lg font-extrabold text-blue-900">
                  {num}
                </div>
              </div>
              <h3 className="mt-5 text-lg font-bold text-stone-900">{title}</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-stone-500">
                {desc}
              </p>
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
    <section className="bg-blue-900 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-2 gap-10 lg:grid-cols-4">
          {stats.map(({ valueKey, labelKey }) => (
            <div key={valueKey} className="text-center">
              <dt className="text-4xl font-extrabold text-white sm:text-5xl">
                {t(valueKey)}
              </dt>
              <dd className="mt-2 text-sm font-medium text-blue-200">
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

const ADVANTAGE_DOTS = [
  "bg-blue-500",
  "bg-orange-500",
  "bg-emerald-500",
  "bg-purple-500",
  "bg-rose-500",
  "bg-amber-500",
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
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-orange-500">
            {t("eyebrow")}
          </p>
          <h2 className="mt-2 text-2xl font-bold text-stone-900 sm:text-3xl">
            {t("heading")}
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-stone-500">
            {t("subheading")}
          </p>
        </div>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map(({ titleKey, descKey }, idx) => (
            <div
              key={titleKey}
              className="rounded-xl bg-stone-50 p-6 transition hover:bg-white hover:shadow-md"
            >
              {/* Colored dot */}
              <div
                className={`mb-4 h-2 w-2 rounded-full ${ADVANTAGE_DOTS[idx]}`}
                aria-hidden="true"
              />
              <h3 className="text-sm font-semibold text-stone-900">
                {t(titleKey)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-500">
                {t(descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA Section ───────────────────────────────────────────────────────── */

function CTASection() {
  const tNav = useTranslations("nav");

  return (
    <section className="bg-stone-900 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Готовы к поездке?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-stone-400">
          Тысячи водителей по всему Узбекистану уже доверяют нам. Забронируйте
          автомобиль за несколько минут.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          {/* Primary — orange */}
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-8 py-3.5 text-sm font-bold text-white transition hover:bg-orange-600"
          >
            {tNav("catalog")}
          </a>

          {/* Secondary — white outline */}
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-xl border border-white/40 px-8 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
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
