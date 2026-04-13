"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

function IconChevronDown({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

interface SortBarProps {
  total: number;
  brands: string[];
}

export function SortBar({ total, brands }: SortBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const sortBy  = searchParams.get("sortBy") ?? "price_asc";
  const activeBrand = searchParams.get("brand") ?? "Все";

  function setParam(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    if (value === null || value === "" || value === "Все") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  const allBrands = ["Все", ...brands];

  return (
    <div className="flex flex-col gap-4 mb-5">
      {/* Brand tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {allBrands.map((brand) => {
          const active = activeBrand === brand;
          return (
            <button
              key={brand}
              onClick={() => setParam("brand", brand)}
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

      {/* Sort bar */}
      <div className="bg-white rounded-xl shadow-sm px-5 py-3.5 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          <span className="font-bold text-[#201F1D]">{total}</span> авто
        </p>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 hidden sm:inline">Сортировка:</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setParam("sortBy", e.target.value)}
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
    </div>
  );
}
