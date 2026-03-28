"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { CarCategory, Transmission, FuelType } from "@/types";

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

interface MockCar {
  id: string;
  brand: string;
  model: string;
  year: number;
  category: CarCategory;
  transmission: Transmission;
  fuelType: FuelType;
  seats: number;
  pricePerDay: number;
  initials: string;
  initialsClasses: string;
}

const MOCK_CARS: MockCar[] = [
  {
    id: "1",
    brand: "Chevrolet",
    model: "Spark",
    year: 2023,
    category: "ECONOMY",
    transmission: "MANUAL",
    fuelType: "PETROL",
    seats: 5,
    pricePerDay: 300_000,
    initials: "CS",
    initialsClasses: "bg-sky-100 text-sky-700",
  },
  {
    id: "2",
    brand: "Chevrolet",
    model: "Cobalt",
    year: 2023,
    category: "ECONOMY",
    transmission: "AUTOMATIC",
    fuelType: "GAS",
    seats: 5,
    pricePerDay: 400_000,
    initials: "CC",
    initialsClasses: "bg-blue-100 text-blue-700",
  },
  {
    id: "3",
    brand: "Chevrolet",
    model: "Lacetti",
    year: 2022,
    category: "COMFORT",
    transmission: "MANUAL",
    fuelType: "GAS",
    seats: 5,
    pricePerDay: 450_000,
    initials: "CL",
    initialsClasses: "bg-stone-200 text-stone-600",
  },
  {
    id: "4",
    brand: "Chevrolet",
    model: "Tracker",
    year: 2024,
    category: "SUV",
    transmission: "AUTOMATIC",
    fuelType: "PETROL",
    seats: 5,
    pricePerDay: 650_000,
    initials: "CT",
    initialsClasses: "bg-rose-100 text-rose-700",
  },
  {
    id: "5",
    brand: "Kia",
    model: "Sonet",
    year: 2023,
    category: "SUV",
    transmission: "AUTOMATIC",
    fuelType: "PETROL",
    seats: 5,
    pricePerDay: 700_000,
    initials: "KS",
    initialsClasses: "bg-amber-100 text-amber-700",
  },
  {
    id: "6",
    brand: "Kia",
    model: "K5",
    year: 2023,
    category: "BUSINESS",
    transmission: "AUTOMATIC",
    fuelType: "PETROL",
    seats: 5,
    pricePerDay: 800_000,
    initials: "KK",
    initialsClasses: "bg-indigo-100 text-indigo-700",
  },
  {
    id: "7",
    brand: "Toyota",
    model: "Camry",
    year: 2024,
    category: "BUSINESS",
    transmission: "AUTOMATIC",
    fuelType: "HYBRID",
    seats: 5,
    pricePerDay: 900_000,
    initials: "TC",
    initialsClasses: "bg-teal-100 text-teal-700",
  },
  {
    id: "8",
    brand: "BYD",
    model: "Song Plus",
    year: 2024,
    category: "SUV",
    transmission: "AUTOMATIC",
    fuelType: "ELECTRIC",
    seats: 5,
    pricePerDay: 750_000,
    initials: "BS",
    initialsClasses: "bg-green-100 text-green-700",
  },
  {
    id: "9",
    brand: "Kia",
    model: "Carnival",
    year: 2023,
    category: "MINIVAN",
    transmission: "AUTOMATIC",
    fuelType: "DIESEL",
    seats: 8,
    pricePerDay: 1_100_000,
    initials: "KC",
    initialsClasses: "bg-violet-100 text-violet-700",
  },
  {
    id: "10",
    brand: "Toyota",
    model: "Prado",
    year: 2023,
    category: "PREMIUM",
    transmission: "AUTOMATIC",
    fuelType: "DIESEL",
    seats: 7,
    pricePerDay: 1_500_000,
    initials: "TP",
    initialsClasses: "bg-emerald-100 text-emerald-700",
  },
];

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const PRICE_MIN = 300_000;
const PRICE_MAX = 1_500_000;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatPrice(amount: number): string {
  return amount.toLocaleString("ru-RU");
}

// ---------------------------------------------------------------------------
// Label maps — using Russian directly as required by spec
// ---------------------------------------------------------------------------

const FUEL_LABELS: Record<FuelType, string> = {
  PETROL: "Бензин",
  DIESEL: "Дизель",
  GAS: "Газ/метан",
  ELECTRIC: "Электро",
  HYBRID: "Гибрид",
};

// ---------------------------------------------------------------------------
// Inline SVG icons (no lucide-react)
// ---------------------------------------------------------------------------

function IconFilter() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

function IconChevronDown() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function IconHome() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function IconSearch() {
  return (
    <svg
      width="52"
      height="52"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#d6d3d1"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Filters sidebar
// ---------------------------------------------------------------------------

interface FiltersProps {
  selectedCategory: CarCategory | "ALL";
  setSelectedCategory: (v: CarCategory | "ALL") => void;
  selectedTransmission: Transmission | "ALL";
  setSelectedTransmission: (v: Transmission | "ALL") => void;
  minPrice: number;
  setMinPrice: (v: number) => void;
  maxPrice: number;
  setMaxPrice: (v: number) => void;
  selectedSeats: number | "ALL";
  setSelectedSeats: (v: number | "ALL") => void;
  onReset: () => void;
}

function FiltersPanel({
  selectedCategory,
  setSelectedCategory,
  selectedTransmission,
  setSelectedTransmission,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  selectedSeats,
  setSelectedSeats,
  onReset,
}: FiltersProps) {
  const tCatalog = useTranslations("catalog");
  const tCommon = useTranslations("common");

  const categories: { value: CarCategory | "ALL"; labelKey: string }[] = [
    { value: "ALL",      labelKey: "all"      },
    { value: "ECONOMY",  labelKey: "economy"  },
    { value: "COMFORT",  labelKey: "comfort"  },
    { value: "BUSINESS", labelKey: "business" },
    { value: "SUV",      labelKey: "suv"      },
    { value: "MINIVAN",  labelKey: "minivan"  },
    { value: "PREMIUM",  labelKey: "premium"  },
  ];

  const seatOptions: (number | "ALL")[] = ["ALL", 5, 7, 8];

  const transmissionOptions: { value: Transmission | "ALL"; labelKey: string }[] = [
    { value: "ALL",       labelKey: "all"       },
    { value: "MANUAL",    labelKey: "manual"    },
    { value: "AUTOMATIC", labelKey: "automatic" },
  ];

  return (
    <aside className="w-full lg:w-[280px] lg:shrink-0">
      <div className="rounded-2xl border border-stone-200 bg-white p-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-widest text-stone-400">
            {tCatalog("filters")}
          </h2>
          <button
            type="button"
            onClick={onReset}
            className="text-xs font-medium text-[#1e3a8a] hover:underline"
          >
            Сбросить
          </button>
        </div>

        {/* Category */}
        <div className="mb-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-stone-400">
            {tCatalog("category")}
          </p>
          <div className="flex flex-col gap-1.5">
            {categories.map(({ value, labelKey }) => {
              const active = selectedCategory === value;
              const label =
                value === "ALL" ? tCommon("all") : tCatalog(labelKey as Parameters<typeof tCatalog>[0]);
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setSelectedCategory(value)}
                  className={`w-full rounded-xl px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                    active
                      ? "bg-[#1e3a8a] text-white"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mb-6 border-t border-stone-100" />

        {/* Transmission */}
        <div className="mb-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-stone-400">
            {tCatalog("transmission")}
          </p>
          <div className="flex gap-1.5">
            {transmissionOptions.map(({ value, labelKey }) => {
              const active = selectedTransmission === value;
              const label =
                value === "ALL" ? tCommon("all") : tCatalog(labelKey as Parameters<typeof tCatalog>[0]);
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setSelectedTransmission(value)}
                  className={`flex-1 rounded-xl py-2.5 text-xs font-semibold transition-colors ${
                    active
                      ? "bg-[#1e3a8a] text-white"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mb-6 border-t border-stone-100" />

        {/* Price range */}
        <div className="mb-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-stone-400">
            {tCatalog("priceRange")}
          </p>
          <div className="mb-3 flex items-center gap-2">
            <div className="flex-1 rounded-xl border border-stone-200 bg-stone-50 px-3 py-2">
              <p className="text-[10px] text-stone-400">от</p>
              <p className="text-sm font-bold text-stone-800">{formatPrice(minPrice)}</p>
            </div>
            <span className="text-stone-300">—</span>
            <div className="flex-1 rounded-xl border border-stone-200 bg-stone-50 px-3 py-2">
              <p className="text-[10px] text-stone-400">до</p>
              <p className="text-sm font-bold text-stone-800">{formatPrice(maxPrice)}</p>
            </div>
          </div>
          <div className="space-y-2">
            <input
              type="range"
              min={PRICE_MIN}
              max={PRICE_MAX}
              step={50_000}
              value={minPrice}
              onChange={(e) => {
                const v = Number(e.target.value);
                if (v <= maxPrice) setMinPrice(v);
              }}
              className="w-full cursor-pointer accent-[#1e3a8a]"
            />
            <input
              type="range"
              min={PRICE_MIN}
              max={PRICE_MAX}
              step={50_000}
              value={maxPrice}
              onChange={(e) => {
                const v = Number(e.target.value);
                if (v >= minPrice) setMaxPrice(v);
              }}
              className="w-full cursor-pointer accent-[#1e3a8a]"
            />
          </div>
          <div className="mt-1.5 flex justify-between text-[10px] text-stone-400">
            <span>300 000</span>
            <span>1 500 000 сум</span>
          </div>
        </div>

        <div className="mb-6 border-t border-stone-100" />

        {/* Seats */}
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-stone-400">
            {tCatalog("seats")}
          </p>
          <div className="flex gap-1.5">
            {seatOptions.map((v) => {
              const active = selectedSeats === v;
              return (
                <button
                  key={v}
                  type="button"
                  onClick={() => setSelectedSeats(v)}
                  className={`flex-1 rounded-xl py-2.5 text-xs font-semibold transition-colors ${
                    active
                      ? "bg-[#1e3a8a] text-white"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  }`}
                >
                  {v === "ALL" ? tCommon("all") : v}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom reset */}
        <div className="mt-6 border-t border-stone-100 pt-5 text-center">
          <button
            type="button"
            onClick={onReset}
            className="text-sm text-stone-400 hover:text-stone-600 hover:underline"
          >
            Сбросить
          </button>
        </div>
      </div>
    </aside>
  );
}

// ---------------------------------------------------------------------------
// Car Card
// ---------------------------------------------------------------------------

function CarCard({ car }: { car: MockCar }) {
  const tCatalog = useTranslations("catalog");
  const tCar = useTranslations("car");
  const tCommon = useTranslations("common");

  const categoryLabelMap: Record<CarCategory, string> = {
    ECONOMY:  tCatalog("economy"),
    COMFORT:  tCatalog("comfort"),
    BUSINESS: tCatalog("business"),
    SUV:      tCatalog("suv"),
    MINIVAN:  tCatalog("minivan"),
    PREMIUM:  tCatalog("premium"),
  };

  const transmissionLabel =
    car.transmission === "AUTOMATIC" ? tCatalog("automatic") : tCatalog("manual");
  const fuelLabel = FUEL_LABELS[car.fuelType];
  const categoryLabel = categoryLabelMap[car.category];

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white transition-all hover:border-blue-200 hover:shadow-lg">
      {/* Visual area — colored initials block */}
      <div className={`relative flex h-44 items-center justify-center ${car.initialsClasses}`}>
        {/* Year badge */}
        <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-0.5 text-xs font-semibold text-stone-700 shadow-sm">
          {car.year}
        </span>
        {/* Category badge */}
        <span className="absolute right-3 top-3 rounded-full bg-white px-3 py-0.5 text-xs font-semibold text-stone-700 shadow-sm">
          {categoryLabel}
        </span>
        {/* Initials */}
        <span className="select-none font-black text-5xl tracking-tight">
          {car.initials}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        {/* Brand small caps + model */}
        <p className="text-[11px] font-semibold uppercase tracking-widest text-stone-400">
          {car.brand}
        </p>
        <h3 className="mt-0.5 text-base font-bold text-stone-900 leading-tight">
          {car.model}
        </h3>

        {/* Specs */}
        <p className="mt-2 text-sm text-stone-500">
          {transmissionLabel} · {car.seats} {tCatalog("seats").toLowerCase()} · {fuelLabel}
        </p>

        {/* Price + CTA */}
        <div className="mt-auto pt-4 border-t border-stone-100 mt-4">
          <div className="mb-3">
            <span className="text-2xl font-bold text-stone-900">
              {formatPrice(car.pricePerDay)}
            </span>
            <span className="ml-1.5 text-sm text-stone-400">
              {tCommon("currency")} / {tCar("perDay")}
            </span>
          </div>
          <button
            type="button"
            className="w-full rounded-xl bg-[#f97316] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-orange-600 active:bg-orange-700"
          >
            {tCar("bookNow")}
          </button>
        </div>
      </div>
    </article>
  );
}

// ---------------------------------------------------------------------------
// Empty state
// ---------------------------------------------------------------------------

function EmptyState({ onReset }: { onReset: () => void }) {
  const tCommon = useTranslations("common");

  return (
    <div className="flex min-h-[380px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-stone-200 bg-white px-8 text-center">
      <div className="mb-5">
        <IconSearch />
      </div>
      <h3 className="mb-2 text-lg font-bold text-stone-800">{tCommon("noResults")}</h3>
      <p className="mb-6 max-w-xs text-sm text-stone-500 leading-relaxed">
        По выбранным фильтрам автомобили не найдены. Попробуйте изменить параметры поиска.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="rounded-xl bg-[#1e3a8a] px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-900"
      >
        {tCommon("book")}
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

type SortKey = "price_asc" | "price_desc" | "year_desc";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "price_asc",  label: "по цене ↑" },
  { value: "price_desc", label: "по цене ↓" },
  { value: "year_desc",  label: "по году"   },
];

export default function CarsPage() {
  const tCatalog = useTranslations("catalog");

  const [selectedCategory, setSelectedCategory] = useState<CarCategory | "ALL">("ALL");
  const [selectedTransmission, setSelectedTransmission] = useState<Transmission | "ALL">("ALL");
  const [minPrice, setMinPrice] = useState(PRICE_MIN);
  const [maxPrice, setMaxPrice] = useState(PRICE_MAX);
  const [selectedSeats, setSelectedSeats] = useState<number | "ALL">("ALL");
  const [sortBy, setSortBy] = useState<SortKey>("price_asc");
  const [filtersOpen, setFiltersOpen] = useState(false);

  function resetFilters() {
    setSelectedCategory("ALL");
    setSelectedTransmission("ALL");
    setMinPrice(PRICE_MIN);
    setMaxPrice(PRICE_MAX);
    setSelectedSeats("ALL");
  }

  const filtered = MOCK_CARS.filter((car) => {
    if (selectedCategory !== "ALL" && car.category !== selectedCategory) return false;
    if (selectedTransmission !== "ALL" && car.transmission !== selectedTransmission) return false;
    if (car.pricePerDay < minPrice || car.pricePerDay > maxPrice) return false;
    if (selectedSeats !== "ALL" && car.seats !== selectedSeats) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price_asc")  return a.pricePerDay - b.pricePerDay;
    if (sortBy === "price_desc") return b.pricePerDay - a.pricePerDay;
    if (sortBy === "year_desc")  return b.year - a.year;
    return 0;
  });

  return (
    <div className="min-h-screen bg-stone-50">
      {/* ------------------------------------------------------------------ */}
      {/* Page header                                                          */}
      {/* ------------------------------------------------------------------ */}
      <div className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav
            className="mb-3 flex items-center gap-1.5 text-sm text-stone-400"
            aria-label="Breadcrumb"
          >
            <a
              href="/"
              className="flex items-center gap-1 text-stone-400 hover:text-[#1e3a8a] transition-colors"
            >
              <IconHome />
              Главная
            </a>
            <span className="text-stone-300">/</span>
            <span className="text-stone-700 font-medium">Каталог</span>
          </nav>

          <h1 className="text-2xl font-bold text-stone-900">{tCatalog("title")}</h1>
          <p className="mt-1 text-sm text-stone-500">
            Найдено{" "}
            <span className="font-semibold text-stone-800">{MOCK_CARS.length}</span>{" "}
            автомобилей
          </p>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Main content                                                         */}
      {/* ------------------------------------------------------------------ */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Mobile filter toggle */}
        <div className="mb-4 lg:hidden">
          <button
            type="button"
            onClick={() => setFiltersOpen((v) => !v)}
            className="flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-semibold text-stone-700 shadow-sm transition-colors hover:border-[#1e3a8a] hover:text-[#1e3a8a]"
          >
            <IconFilter />
            {filtersOpen ? "Скрыть фильтры" : tCatalog("filters")}
          </button>
        </div>

        {/* Mobile filters — inline */}
        {filtersOpen && (
          <div className="mb-4 lg:hidden">
            <FiltersPanel
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedTransmission={selectedTransmission}
              setSelectedTransmission={setSelectedTransmission}
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              selectedSeats={selectedSeats}
              setSelectedSeats={setSelectedSeats}
              onReset={resetFilters}
            />
          </div>
        )}

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          {/* Sidebar — desktop only */}
          <div className="hidden lg:block">
            <FiltersPanel
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedTransmission={selectedTransmission}
              setSelectedTransmission={setSelectedTransmission}
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              selectedSeats={selectedSeats}
              setSelectedSeats={setSelectedSeats}
              onReset={resetFilters}
            />
          </div>

          {/* Results column */}
          <div className="min-w-0 flex-1">
            {/* Sort bar */}
            <div className="mb-5 flex items-center justify-between rounded-2xl border border-stone-200 bg-white px-5 py-3.5">
              <p className="text-sm text-stone-500">
                Найдено{" "}
                <span className="font-bold text-stone-900">{sorted.length}</span>{" "}
                авто
              </p>

              <div className="flex items-center gap-2.5">
                <label
                  htmlFor="sort-select"
                  className="text-sm text-stone-400 hidden sm:block"
                >
                  {tCatalog("sortBy")}:
                </label>
                <div className="relative">
                  <select
                    id="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortKey)}
                    className="appearance-none rounded-xl border border-stone-200 bg-white py-2 pl-3 pr-8 text-sm font-medium text-stone-700 transition focus:border-[#1e3a8a] focus:outline-none focus:ring-1 focus:ring-[#1e3a8a]"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400">
                    <IconChevronDown />
                  </span>
                </div>
              </div>
            </div>

            {/* Car grid or empty state */}
            {sorted.length === 0 ? (
              <EmptyState onReset={resetFilters} />
            ) : (
              <>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {sorted.map((car) => (
                    <CarCard key={car.id} car={car} />
                  ))}
                </div>

                {/* Show more */}
                {sorted.length >= 9 && (
                  <div className="mt-8 text-center">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-8 py-3 text-sm font-semibold text-stone-600 transition-colors hover:border-[#1e3a8a] hover:text-[#1e3a8a]"
                    >
                      {tCatalog("showMore")}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
