import Link from "next/link";
import { Suspense } from "react";
import { getCars, getCities, getDistinctBrands } from "@/lib/cars";
import { FilterSidebar } from "./_components/FilterSidebar";
import { SortBar } from "./_components/SortBar";
import type { CarCategory, Transmission, FuelType } from "@/types";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function sp(v: string | string[] | undefined): string {
  return Array.isArray(v) ? v[0] : (v ?? "");
}
function spArr(v: string | string[] | undefined): string[] {
  if (!v) return [];
  return Array.isArray(v) ? v : [v];
}

// ─── Labels ───────────────────────────────────────────────────────────────────

const CATEGORY_LABELS: Record<CarCategory, string> = {
  ECONOMY:  "Эконом",
  COMFORT:  "Комфорт",
  BUSINESS: "Бизнес",
  SUV:      "Внедорожник",
  MINIVAN:  "Минивэн",
  PREMIUM:  "Премиум",
};

const FUEL_LABELS: Record<FuelType, string> = {
  PETROL:   "Бензин",
  DIESEL:   "Дизель",
  GAS:      "Газ/метан",
  ELECTRIC: "Электро",
  HYBRID:   "Гибрид",
};

const TRANSMISSION_LABELS: Record<Transmission, string> = {
  AUTOMATIC: "Автомат",
  MANUAL:    "Механика",
};

// ─── SVG icons ────────────────────────────────────────────────────────────────

function IconGearbox({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="5"  cy="12" r="2" /><circle cx="19" cy="12" r="2" /><circle cx="12" cy="5" r="2" />
      <path d="M5 14v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3" /><path d="M12 7v5" />
    </svg>
  );
}
function IconFuel({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 22V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v14" /><path d="M3 22h14" />
      <path d="M17 8l2 2v8a1 1 0 0 0 2 0V9l-2-3" /><line x1="7" y1="6" x2="13" y2="6" />
    </svg>
  );
}
function IconSeats({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="7" r="3" /><path d="M5.5 21a9 9 0 0 1 13 0" />
    </svg>
  );
}
function IconSliders({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="20" y2="18" />
      <circle cx="8" cy="6" r="2" fill="white" /><circle cx="16" cy="12" r="2" fill="white" /><circle cx="10" cy="18" r="2" fill="white" />
    </svg>
  );
}

// ─── Car placeholder colors ───────────────────────────────────────────────────

const PLACEHOLDER_PALETTES = [
  { bg: "bg-amber-50",   text: "text-amber-500"   },
  { bg: "bg-sky-50",     text: "text-sky-500"      },
  { bg: "bg-rose-50",    text: "text-rose-500"     },
  { bg: "bg-orange-50",  text: "text-orange-500"   },
  { bg: "bg-indigo-50",  text: "text-indigo-500"   },
  { bg: "bg-teal-50",    text: "text-teal-500"     },
  { bg: "bg-emerald-50", text: "text-emerald-500"  },
  { bg: "bg-violet-50",  text: "text-violet-500"   },
  { bg: "bg-cyan-50",    text: "text-cyan-500"     },
];

function palette(index: number) {
  return PLACEHOLDER_PALETTES[index % PLACEHOLDER_PALETTES.length];
}

// ─── Car Card ─────────────────────────────────────────────────────────────────

interface CardCar {
  id: string;
  slug: string;
  brand: string;
  model: string;
  year: number;
  category: CarCategory;
  transmission: Transmission;
  fuelType: FuelType;
  seats: number;
  pricePerDay: number;
  images: string[];
  averageRating: number | null;
  reviewCount: number;
  city: { nameRu: string } | null;
}

function CarCard({ car, locale, index }: { car: CardCar; locale: string; index: number }) {
  const { bg, text } = palette(index);
  const initials = (car.brand[0] + car.model[0]).toUpperCase();

  return (
    <Link
      href={`/${locale}/cars/${car.slug}`}
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col group"
    >
      {/* Image / placeholder */}
      <div className={`relative h-48 flex items-center justify-center overflow-hidden ${car.images.length > 0 ? "" : bg}`}>
        {car.images.length > 0 ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={car.images[0]}
            alt={`${car.brand} ${car.model}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <span className={`font-black text-5xl tracking-tight select-none ${text}`}>
            {initials}
          </span>
        )}

        {/* Year badge */}
        <span className="absolute top-3 left-3 bg-white text-[#201F1D] text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
          {car.year}
        </span>

        {/* Category badge */}
        <span className="absolute top-3 right-3 bg-[#FFA633]/10 text-[#FFA633] text-xs font-medium px-3 py-1 rounded-full">
          {CATEGORY_LABELS[car.category]}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Brand + Model */}
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">{car.brand}</p>
          <h3 className="text-lg font-bold text-[#201F1D] leading-tight mt-0.5">{car.model}</h3>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col items-center gap-1">
            <IconGearbox className="w-4 h-4 text-[#127384]" />
            <span className="text-xs text-gray-500 text-center leading-tight">
              {TRANSMISSION_LABELS[car.transmission]}
            </span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <IconFuel className="w-4 h-4 text-[#127384]" />
            <span className="text-xs text-gray-500 text-center leading-tight">
              {FUEL_LABELS[car.fuelType]}
            </span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <IconSeats className="w-4 h-4 text-[#127384]" />
            <span className="text-xs text-gray-500 text-center leading-tight">
              {car.seats} мест
            </span>
          </div>
        </div>

        {/* Location + rating */}
        <div className="flex items-center justify-between gap-2">
          {car.city && (
            <p className="text-xs text-gray-400">
              <span className="mr-1">📍</span>
              {car.city.nameRu}
            </p>
          )}
          {car.reviewCount > 0 && (
            <p className="text-xs text-gray-400 flex items-center gap-1">
              <span className="text-yellow-400">★</span>
              {car.averageRating?.toFixed(1)} ({car.reviewCount})
            </p>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100" />

        {/* Price + Button */}
        <div className="flex items-center justify-between gap-2 mt-auto">
          <div className="leading-tight">
            <span className="font-bold text-[#201F1D] text-base">
              от {car.pricePerDay.toLocaleString("ru-RU")} сум
            </span>
            <span className="text-xs text-gray-400 ml-1">/сутки</span>
          </div>
          <span className="rounded-full bg-[#127384] text-white text-sm font-medium px-5 py-2 group-hover:bg-[#0e5d6a] transition-colors whitespace-nowrap flex-shrink-0">
            Подробнее
          </span>
        </div>
      </div>
    </Link>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-12 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <IconSliders className="w-7 h-7 text-gray-400" />
      </div>
      <h3 className="font-bold text-[#201F1D] text-lg mb-1">Ничего не найдено</h3>
      <p className="text-gray-400 text-sm">Попробуйте изменить параметры фильтра</p>
    </div>
  );
}

// ─── Mobile filter toggle ─────────────────────────────────────────────────────

function MobileFilterToggle({ cities }: { cities: { id: string; slug: string; nameRu: string; nameUz: string; nameEn: string }[] }) {
  // Rendered server-side, Suspense wrapper allows FilterSidebar inside to be client
  return (
    <details className="lg:hidden mb-4 group">
      <summary className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-5 py-2.5 text-sm font-medium text-[#201F1D] hover:border-[#127384] transition-colors shadow-sm cursor-pointer list-none">
        <IconSliders className="w-4 h-4 text-[#127384]" />
        Фильтры
        <svg className="w-4 h-4 text-gray-400 ml-auto transition-transform group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </summary>
      <div className="mt-3">
        <FilterSidebar cities={cities} />
      </div>
    </details>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function CarsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: SearchParams;
}) {
  const { locale } = await params;
  const sp2 = await searchParams;

  // Parse URL params
  const categories    = spArr(sp2.category)    as CarCategory[];
  const transmissions = spArr(sp2.transmission) as Transmission[];
  const city          = sp(sp2.city) || undefined;
  const brand         = sp(sp2.brand) || undefined;
  const minPrice      = sp2.minPrice ? Number(sp(sp2.minPrice)) : undefined;
  const maxPrice      = sp2.maxPrice ? Number(sp(sp2.maxPrice)) : undefined;
  const sortBy        = (sp(sp2.sortBy) || "price_asc") as "price_asc" | "price_desc" | "newest";
  const page          = sp2.page ? Number(sp(sp2.page)) : 1;

  // Fetch everything in parallel
  const [{ cars, total, totalPages }, cities, brands] = await Promise.all([
    getCars({ city, categories, transmissions, minPrice, maxPrice, brand, sortBy, page, limit: 12 }),
    getCities(),
    getDistinctBrands(),
  ]);

  return (
    <div className="min-h-screen bg-[#f7f7f7]">

      {/* Page header */}
      <div className="bg-[#f7f7f7] border-b border-gray-200">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-3">
            <a href={`/${locale}`} className="hover:text-[#127384] transition-colors">Главная</a>
            <span>/</span>
            <span className="text-[#201F1D] font-medium">Каталог автомобилей</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-black text-[#201F1D] tracking-tight">
            Каталог автомобилей
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {total} авто доступно для аренды
          </p>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* Mobile filter toggle */}
        <Suspense fallback={null}>
          <MobileFilterToggle cities={cities} />
        </Suspense>

        <div className="flex gap-6 items-start">

          {/* Desktop sidebar */}
          <div className="hidden lg:block">
            <Suspense fallback={
              <aside className="w-[280px] flex-shrink-0">
                <div className="bg-white rounded-xl shadow-sm p-5 h-96 animate-pulse" />
              </aside>
            }>
              <FilterSidebar cities={cities} />
            </Suspense>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">

            {/* Sort + brand tabs */}
            <Suspense fallback={<div className="h-24 bg-white rounded-xl animate-pulse mb-5" />}>
              <SortBar total={total} brands={brands} />
            </Suspense>

            {/* Grid */}
            {cars.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {cars.map((car, i) => (
                    <CarCard
                      key={car.id}
                      car={car}
                      locale={locale}
                      index={i}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center gap-2 mt-8">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                      const params2 = new URLSearchParams(
                        Object.entries(sp2)
                          .filter(([, v]) => v !== undefined)
                          .flatMap(([k, v]) =>
                            Array.isArray(v) ? v.map((vv) => [k, vv]) : [[k, String(v)]]
                          )
                      );
                      params2.set("page", String(p));
                      return (
                        <a
                          key={p}
                          href={`/${locale}/cars?${params2.toString()}`}
                          className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-colors ${
                            p === page
                              ? "bg-[#127384] text-white"
                              : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                          }`}
                        >
                          {p}
                        </a>
                      );
                    })}
                  </div>
                )}
              </>
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
