"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import type { CarCategory, Transmission, FuelType } from "@/types";

// ─── Types ────────────────────────────────────────────────────────────────────

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
  city: string;
  initials: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const MOCK_CARS: MockCar[] = [
  { id: "1",  brand: "Chevrolet", model: "Spark",    year: 2022, category: "ECONOMY",  transmission: "MANUAL",    fuelType: "GAS",      seats: 5, pricePerDay: 120_000, city: "Ташкент", initials: "CS" },
  { id: "2",  brand: "Chevrolet", model: "Cobalt",   year: 2023, category: "ECONOMY",  transmission: "MANUAL",    fuelType: "GAS",      seats: 5, pricePerDay: 150_000, city: "Ташкент", initials: "CC" },
  { id: "3",  brand: "Chevrolet", model: "Lacetti",  year: 2021, category: "COMFORT",  transmission: "MANUAL",    fuelType: "GAS",      seats: 5, pricePerDay: 170_000, city: "Ташкент", initials: "CL" },
  { id: "4",  brand: "Chevrolet", model: "Tracker",  year: 2023, category: "SUV",      transmission: "AUTOMATIC", fuelType: "PETROL",   seats: 5, pricePerDay: 280_000, city: "Ташкент", initials: "CT" },
  { id: "5",  brand: "Kia",       model: "Sportage", year: 2023, category: "SUV",      transmission: "AUTOMATIC", fuelType: "PETROL",   seats: 5, pricePerDay: 350_000, city: "Ташкент", initials: "KS" },
  { id: "6",  brand: "Kia",       model: "K5",       year: 2022, category: "BUSINESS", transmission: "AUTOMATIC", fuelType: "PETROL",   seats: 5, pricePerDay: 400_000, city: "Ташкент", initials: "KK" },
  { id: "7",  brand: "Toyota",    model: "Camry",    year: 2023, category: "BUSINESS", transmission: "AUTOMATIC", fuelType: "HYBRID",   seats: 5, pricePerDay: 500_000, city: "Ташкент", initials: "TC" },
  { id: "8",  brand: "BYD",       model: "Seal",     year: 2024, category: "BUSINESS", transmission: "AUTOMATIC", fuelType: "ELECTRIC", seats: 5, pricePerDay: 450_000, city: "Ташкент", initials: "BS" },
  { id: "9",  brand: "Kia",       model: "Carnival", year: 2022, category: "MINIVAN",  transmission: "AUTOMATIC", fuelType: "DIESEL",   seats: 8, pricePerDay: 550_000, city: "Ташкент", initials: "KC" },
  { id: "10", brand: "Toyota",    model: "Prado",    year: 2021, category: "PREMIUM",  transmission: "AUTOMATIC", fuelType: "PETROL",   seats: 7, pricePerDay: 800_000, city: "Ташкент", initials: "TP" },
];

const INITIALS_STYLES: Record<string, { bg: string; text: string }> = {
  CS: { bg: "bg-amber-50",   text: "text-amber-600"   },
  CC: { bg: "bg-sky-50",     text: "text-sky-600"     },
  CL: { bg: "bg-stone-100",  text: "text-stone-500"   },
  CT: { bg: "bg-rose-50",    text: "text-rose-600"    },
  KS: { bg: "bg-orange-50",  text: "text-orange-600"  },
  KK: { bg: "bg-indigo-50",  text: "text-indigo-600"  },
  TC: { bg: "bg-teal-50",    text: "text-teal-600"    },
  BS: { bg: "bg-emerald-50", text: "text-emerald-600" },
  KC: { bg: "bg-violet-50",  text: "text-violet-600"  },
  TP: { bg: "bg-cyan-50",    text: "text-cyan-600"    },
};

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

const BRANDS = ["Все", "Chevrolet", "Kia", "Toyota", "BYD"] as const;

const CATEGORY_OPTIONS: CarCategory[] = [
  "ECONOMY", "COMFORT", "BUSINESS", "SUV", "MINIVAN", "PREMIUM",
];

const SEATS_OPTIONS = [2, 4, 5, 7, 8];

// ─── SVG Icons ────────────────────────────────────────────────────────────────

function IconGearbox({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="5"  cy="12" r="2" />
      <circle cx="19" cy="12" r="2" />
      <circle cx="12" cy="5"  r="2" />
      <path d="M5 14v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3" />
      <path d="M12 7v5" />
    </svg>
  );
}

function IconFuel({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 22V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v14" />
      <path d="M3 22h14" />
      <path d="M17 8l2 2v8a1 1 0 0 0 2 0V9l-2-3" />
      <line x1="7" y1="6" x2="13" y2="6" />
    </svg>
  );
}

function IconSeats({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="7" r="3" />
      <path d="M5.5 21a9 9 0 0 1 13 0" />
    </svg>
  );
}

function IconChevronDown({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function IconSliders({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4"  y1="6"  x2="20" y2="6"  />
      <line x1="4"  y1="12" x2="20" y2="12" />
      <line x1="4"  y1="18" x2="20" y2="18" />
      <circle cx="8"  cy="6"  r="2" fill="white" />
      <circle cx="16" cy="12" r="2" fill="white" />
      <circle cx="10" cy="18" r="2" fill="white" />
    </svg>
  );
}

// ─── Car Card ─────────────────────────────────────────────────────────────────

function CarCard({ car }: { car: MockCar }) {
  const style = INITIALS_STYLES[car.initials] ?? { bg: "bg-gray-100", text: "text-gray-500" };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col">
      {/* Image area */}
      <div className={`relative h-48 flex items-center justify-center ${style.bg}`}>
        <span className={`font-black text-5xl tracking-tight select-none ${style.text}`}>
          {car.initials}
        </span>

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
          <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">
            {car.brand}
          </p>
          <h3 className="text-lg font-bold text-[#201F1D] leading-tight mt-0.5">
            {car.model}
          </h3>
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

        {/* Location */}
        <p className="text-xs text-gray-400">
          <span className="mr-1">📍</span>
          {car.city}
        </p>

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
          <button className="rounded-full bg-[#127384] text-white text-sm font-medium px-5 py-2 hover:bg-[#0e5d6a] transition-colors whitespace-nowrap flex-shrink-0">
            Забронировать
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Filter Sidebar ───────────────────────────────────────────────────────────

interface FilterState {
  categories: CarCategory[];
  transmissions: Transmission[];
  fuelTypes: FuelType[];
  seats: number[];
  minPrice: number;
  maxPrice: number;
}

function FilterSidebar({
  filters,
  onChange,
  onReset,
}: {
  filters: FilterState;
  onChange: (next: FilterState) => void;
  onReset: () => void;
}) {
  const MAX_PRICE = 900_000;
  const MIN_PRICE = 100_000;

  function toggleCategory(cat: CarCategory) {
    const next = filters.categories.includes(cat)
      ? filters.categories.filter((c) => c !== cat)
      : [...filters.categories, cat];
    onChange({ ...filters, categories: next });
  }

  function toggleTransmission(t: Transmission) {
    const next = filters.transmissions.includes(t)
      ? filters.transmissions.filter((x) => x !== t)
      : [...filters.transmissions, t];
    onChange({ ...filters, transmissions: next });
  }

  function toggleSeats(s: number) {
    const next = filters.seats.includes(s)
      ? filters.seats.filter((x) => x !== s)
      : [...filters.seats, s];
    onChange({ ...filters, seats: next });
  }

  return (
    <aside className="w-full lg:w-[280px] flex-shrink-0">
      <div className="bg-white rounded-xl shadow-sm p-5 flex flex-col gap-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-[#201F1D] text-base">Фильтры</h2>
          <button
            onClick={onReset}
            className="text-sm text-[#FFA633] hover:underline font-medium"
          >
            Сбросить
          </button>
        </div>

        {/* Category */}
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Категория
          </p>
          <div className="flex flex-col gap-1.5">
            {CATEGORY_OPTIONS.map((cat) => {
              const active = filters.categories.includes(cat);
              return (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={`text-left text-sm font-medium px-4 py-2.5 rounded-lg transition-colors ${
                    active
                      ? "bg-[#127384] text-white"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {CATEGORY_LABELS[cat]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Transmission */}
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Коробка передач
          </p>
          <div className="flex gap-2">
            {(["AUTOMATIC", "MANUAL"] as Transmission[]).map((t) => {
              const active = filters.transmissions.includes(t);
              return (
                <button
                  key={t}
                  onClick={() => toggleTransmission(t)}
                  className={`flex-1 text-xs font-medium px-3 py-2 rounded-full border transition-colors ${
                    active
                      ? "bg-[#127384] text-white border-[#127384]"
                      : "bg-white text-gray-600 border-gray-200 hover:border-[#127384] hover:text-[#127384]"
                  }`}
                >
                  {TRANSMISSION_LABELS[t]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Price */}
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Цена в сутки (сум)
          </p>
          <div className="flex gap-2 mb-3">
            <div className="flex-1">
              <label className="text-xs text-gray-400 block mb-1">От</label>
              <input
                type="number"
                min={MIN_PRICE}
                max={filters.maxPrice}
                step={10_000}
                value={filters.minPrice}
                onChange={(e) =>
                  onChange({
                    ...filters,
                    minPrice: Math.min(Number(e.target.value), filters.maxPrice),
                  })
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-[#201F1D] focus:outline-none focus:border-[#127384]"
              />
            </div>
            <div className="flex-1">
              <label className="text-xs text-gray-400 block mb-1">До</label>
              <input
                type="number"
                min={filters.minPrice}
                max={MAX_PRICE}
                step={10_000}
                value={filters.maxPrice}
                onChange={(e) =>
                  onChange({
                    ...filters,
                    maxPrice: Math.max(Number(e.target.value), filters.minPrice),
                  })
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-[#201F1D] focus:outline-none focus:border-[#127384]"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <input
              type="range"
              min={MIN_PRICE}
              max={MAX_PRICE}
              step={10_000}
              value={filters.minPrice}
              onChange={(e) =>
                onChange({
                  ...filters,
                  minPrice: Math.min(Number(e.target.value), filters.maxPrice - 10_000),
                })
              }
              className="w-full accent-[#127384] h-1.5 cursor-pointer"
            />
            <input
              type="range"
              min={MIN_PRICE}
              max={MAX_PRICE}
              step={10_000}
              value={filters.maxPrice}
              onChange={(e) =>
                onChange({
                  ...filters,
                  maxPrice: Math.max(Number(e.target.value), filters.minPrice + 10_000),
                })
              }
              className="w-full accent-[#FFA633] h-1.5 cursor-pointer"
            />
          </div>
        </div>

        {/* Seats */}
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Количество мест
          </p>
          <div className="flex flex-wrap gap-2">
            {SEATS_OPTIONS.map((s) => {
              const active = filters.seats.includes(s);
              return (
                <button
                  key={s}
                  onClick={() => toggleSeats(s)}
                  className={`text-xs font-medium px-4 py-2 rounded-full border transition-colors ${
                    active
                      ? "bg-[#127384] text-white border-[#127384]"
                      : "bg-white text-gray-600 border-gray-200 hover:border-[#127384] hover:text-[#127384]"
                  }`}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}

// ─── Default filter state ─────────────────────────────────────────────────────

const DEFAULT_FILTERS: FilterState = {
  categories:    [],
  transmissions: [],
  fuelTypes:     [],
  seats:         [],
  minPrice:      100_000,
  maxPrice:      900_000,
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CarsPage() {
  useTranslations("catalog");
  useTranslations("car");
  useTranslations("common");

  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [activeBrand, setActiveBrand] = useState<string>("Все");
  const [sortBy, setSortBy] = useState<string>("price_asc");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = MOCK_CARS.slice();

    if (activeBrand !== "Все") {
      result = result.filter((c) => c.brand === activeBrand);
    }
    if (filters.categories.length > 0) {
      result = result.filter((c) => filters.categories.includes(c.category));
    }
    if (filters.transmissions.length > 0) {
      result = result.filter((c) => filters.transmissions.includes(c.transmission));
    }
    if (filters.fuelTypes.length > 0) {
      result = result.filter((c) => filters.fuelTypes.includes(c.fuelType));
    }
    if (filters.seats.length > 0) {
      result = result.filter((c) => filters.seats.includes(c.seats));
    }
    result = result.filter(
      (c) => c.pricePerDay >= filters.minPrice && c.pricePerDay <= filters.maxPrice,
    );

    if (sortBy === "price_asc")  result.sort((a, b) => a.pricePerDay - b.pricePerDay);
    if (sortBy === "price_desc") result.sort((a, b) => b.pricePerDay - a.pricePerDay);
    if (sortBy === "newest")     result.sort((a, b) => b.year - a.year);

    return result;
  }, [filters, activeBrand, sortBy]);

  function handleReset() {
    setFilters(DEFAULT_FILTERS);
    setActiveBrand("Все");
  }

  return (
    <div className="min-h-screen bg-[#f7f7f7]">

      {/* ── Page Header ────────────────────────────────────────────────── */}
      <div className="bg-[#f7f7f7] border-b border-gray-200">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-3">
            <a href="/" className="hover:text-[#127384] transition-colors">
              Главная
            </a>
            <span>/</span>
            <span className="text-[#201F1D] font-medium">Каталог автомобилей</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-black text-[#201F1D] tracking-tight">
            Каталог автомобилей
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {filtered.length} авто доступно для аренды в Ташкенте
          </p>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* ── Brand Tabs ─────────────────────────────────────────────────── */}
        <div className="flex gap-2 overflow-x-auto pb-1 mb-6 scrollbar-hide">
          {BRANDS.map((brand) => {
            const active = activeBrand === brand;
            return (
              <button
                key={brand}
                onClick={() => setActiveBrand(brand)}
                className={`whitespace-nowrap text-sm font-medium px-5 py-2 rounded-full border transition-colors flex-shrink-0 ${
                  active
                    ? "bg-[#FFA633] text-white border-[#FFA633]"
                    : "bg-white text-gray-600 border-gray-200 hover:border-[#FFA633] hover:text-[#FFA633]"
                }`}
              >
                {brand}
              </button>
            );
          })}
        </div>

        {/* ── Mobile Filter Toggle ────────────────────────────────────────── */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setMobileFiltersOpen((v) => !v)}
            className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-5 py-2.5 text-sm font-medium text-[#201F1D] hover:border-[#127384] transition-colors shadow-sm"
          >
            <IconSliders className="w-4 h-4 text-[#127384]" />
            Фильтры
            <IconChevronDown
              className={`w-4 h-4 text-gray-400 transition-transform ${
                mobileFiltersOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* ── Mobile Filters Panel ───────────────────────────────────────── */}
        {mobileFiltersOpen && (
          <div className="lg:hidden mb-6">
            <FilterSidebar
              filters={filters}
              onChange={setFilters}
              onReset={handleReset}
            />
          </div>
        )}

        {/* ── Main Layout ────────────────────────────────────────────────── */}
        <div className="flex gap-6 items-start">

          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <FilterSidebar
              filters={filters}
              onChange={setFilters}
              onReset={handleReset}
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">

            {/* Sort Bar */}
            <div className="bg-white rounded-xl shadow-sm px-5 py-3.5 flex items-center justify-between mb-5">
              <p className="text-sm text-gray-500">
                <span className="font-bold text-[#201F1D]">{filtered.length}</span> авто
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 hidden sm:inline">Сортировка:</span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-gray-50 border border-gray-200 text-sm text-[#201F1D] font-medium rounded-full pl-4 pr-8 py-2 focus:outline-none focus:border-[#127384] cursor-pointer"
                  >
                    <option value="price_asc">Цена: по возрастанию</option>
                    <option value="price_desc">Цена: по убыванию</option>
                    <option value="newest">Сначала новые</option>
                  </select>
                  <IconChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Grid */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconSliders className="w-7 h-7 text-gray-400" />
                </div>
                <h3 className="font-bold text-[#201F1D] text-lg mb-1">
                  Ничего не найдено
                </h3>
                <p className="text-gray-400 text-sm mb-5">
                  Попробуйте изменить параметры фильтра
                </p>
                <button
                  onClick={handleReset}
                  className="rounded-full bg-[#127384] text-white text-sm font-medium px-6 py-2.5 hover:bg-[#0e5d6a] transition-colors"
                >
                  Сбросить фильтры
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
