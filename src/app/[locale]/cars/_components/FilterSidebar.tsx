"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import type { CarCategory, Transmission, City } from "@/types";

const CATEGORY_LABELS: Record<CarCategory, string> = {
  ECONOMY:  "Эконом",
  COMFORT:  "Комфорт",
  BUSINESS: "Бизнес",
  SUV:      "Внедорожник",
  MINIVAN:  "Минивэн",
  PREMIUM:  "Премиум",
};

const TRANSMISSION_LABELS: Record<Transmission, string> = {
  AUTOMATIC: "Автомат",
  MANUAL:    "Механика",
};

const CATEGORY_OPTIONS: CarCategory[] = [
  "ECONOMY", "COMFORT", "BUSINESS", "SUV", "MINIVAN", "PREMIUM",
];

const MIN_PRICE = 100_000;
const MAX_PRICE = 900_000;

interface FilterSidebarProps {
  cities: City[];
}

export function FilterSidebar({ cities }: FilterSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeCategories   = searchParams.getAll("category") as CarCategory[];
  const activeTransmissions = searchParams.getAll("transmission") as Transmission[];
  const activeCity         = searchParams.get("city") ?? "";
  const urlMinPrice        = Number(searchParams.get("minPrice") || MIN_PRICE);
  const urlMaxPrice        = Number(searchParams.get("maxPrice") || MAX_PRICE);

  // Local price state — commit to URL on blur
  const [localMin, setLocalMin] = useState(urlMinPrice);
  const [localMax, setLocalMax] = useState(urlMaxPrice);

  // Sync local state when URL changes (e.g. reset)
  useEffect(() => { setLocalMin(urlMinPrice); }, [urlMinPrice]);
  useEffect(() => { setLocalMax(urlMaxPrice); }, [urlMaxPrice]);

  function pushParams(updates: Record<string, string | string[] | null>) {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page"); // reset pagination on filter change
    for (const [key, value] of Object.entries(updates)) {
      params.delete(key);
      if (value === null) continue;
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v));
      } else {
        params.set(key, value);
      }
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  function toggleCategory(cat: CarCategory) {
    const next = activeCategories.includes(cat)
      ? activeCategories.filter((c) => c !== cat)
      : [...activeCategories, cat];
    pushParams({ category: next.length > 0 ? next : null });
  }

  function toggleTransmission(t: Transmission) {
    const next = activeTransmissions.includes(t)
      ? activeTransmissions.filter((x) => x !== t)
      : [...activeTransmissions, t];
    pushParams({ transmission: next.length > 0 ? next : null });
  }

  function commitPrice() {
    pushParams({
      minPrice: localMin !== MIN_PRICE ? String(localMin) : null,
      maxPrice: localMax !== MAX_PRICE ? String(localMax) : null,
    });
  }

  function handleReset() {
    setLocalMin(MIN_PRICE);
    setLocalMax(MAX_PRICE);
    router.push(pathname);
  }

  return (
    <aside className="w-full lg:w-[280px] flex-shrink-0">
      <div className="bg-white rounded-xl shadow-sm p-5 flex flex-col gap-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-[#201F1D] text-base">Фильтры</h2>
          <button
            onClick={handleReset}
            className="text-sm text-[#FFA633] hover:underline font-medium"
          >
            Сбросить
          </button>
        </div>

        {/* City */}
        {cities.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Город
            </p>
            <select
              value={activeCity}
              onChange={(e) => pushParams({ city: e.target.value || null })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-[#201F1D] focus:outline-none focus:border-[#127384] bg-white cursor-pointer"
            >
              <option value="">Все города</option>
              {cities.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.nameRu}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Category */}
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Категория
          </p>
          <div className="flex flex-col gap-1.5">
            {CATEGORY_OPTIONS.map((cat) => {
              const active = activeCategories.includes(cat);
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
              const active = activeTransmissions.includes(t);
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
                max={localMax}
                step={10_000}
                value={localMin}
                onChange={(e) => setLocalMin(Math.min(Number(e.target.value), localMax))}
                onBlur={commitPrice}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-[#201F1D] focus:outline-none focus:border-[#127384]"
              />
            </div>
            <div className="flex-1">
              <label className="text-xs text-gray-400 block mb-1">До</label>
              <input
                type="number"
                min={localMin}
                max={MAX_PRICE}
                step={10_000}
                value={localMax}
                onChange={(e) => setLocalMax(Math.max(Number(e.target.value), localMin))}
                onBlur={commitPrice}
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
              value={localMin}
              onChange={(e) =>
                setLocalMin(Math.min(Number(e.target.value), localMax - 10_000))
              }
              onMouseUp={commitPrice}
              onTouchEnd={commitPrice}
              className="w-full accent-[#127384] h-1.5 cursor-pointer"
            />
            <input
              type="range"
              min={MIN_PRICE}
              max={MAX_PRICE}
              step={10_000}
              value={localMax}
              onChange={(e) =>
                setLocalMax(Math.max(Number(e.target.value), localMin + 10_000))
              }
              onMouseUp={commitPrice}
              onTouchEnd={commitPrice}
              className="w-full accent-[#FFA633] h-1.5 cursor-pointer"
            />
          </div>
        </div>

      </div>
    </aside>
  );
}
