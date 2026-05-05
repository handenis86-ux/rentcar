"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

interface CategoryOption {
  value: string; // lowercase: economy, comfort, premium, suv, minivan
  label: string;
}

interface Labels {
  pickupDate:  string;
  returnDate:  string;
  carType:     string;
  search:      string;
  carTypeAny:  string;
}

function todayStr() { return new Date().toISOString().split("T")[0]; }
function addDays(s: string, n: number) {
  const d = new Date(s); d.setDate(d.getDate() + n);
  return d.toISOString().split("T")[0];
}

export function HeroSearch({
  locale,
  categories,
  labels,
}: {
  locale: string;
  categories: CategoryOption[];
  labels: Labels;
}) {
  const router = useRouter();
  const today = todayStr();
  const [pickup,   setPickup]   = useState(today);
  const [retDate,  setRet]      = useState(addDays(today, 3));
  const [category, setCategory] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const qs = new URLSearchParams();
    if (pickup)   qs.set("pickup",   pickup);
    if (retDate)  qs.set("return",   retDate);
    if (category) qs.set("category", category);
    const s = qs.toString();
    router.push(`/${locale}/cars${s ? `?${s}` : ""}`);
  }

  const cellCls =
    "bg-[#F5F5F0] rounded-[10px] px-3 py-2 flex-1 min-w-0 cursor-pointer focus-within:ring-2 focus-within:ring-[#F97316]/40 transition";
  const labelCls =
    "text-[11px] font-semibold uppercase tracking-wide text-[#9CA3AF] block";
  const controlCls =
    "w-full bg-transparent text-[14px] font-medium text-[#1A1A2E] focus:outline-none cursor-pointer appearance-none";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.1)] p-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
    >
      <label className={cellCls}>
        <span className={labelCls}>{labels.pickupDate}</span>
        <input
          type="date"
          min={today}
          value={pickup}
          onChange={(e) => {
            setPickup(e.target.value);
            if (retDate <= e.target.value) setRet(addDays(e.target.value, 1));
          }}
          className={controlCls}
        />
      </label>

      <label className={cellCls}>
        <span className={labelCls}>{labels.returnDate}</span>
        <input
          type="date"
          min={addDays(pickup, 1)}
          value={retDate}
          onChange={(e) => setRet(e.target.value)}
          className={controlCls}
        />
      </label>

      <label className={cellCls}>
        <span className={labelCls}>{labels.carType}</span>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={controlCls}
        >
          <option value="">{labels.carTypeAny}</option>
          {categories.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </label>

      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-full bg-[#F97316] px-8 py-4 text-[15px] font-semibold text-white hover:bg-[#EA580C] transition shrink-0"
      >
        {labels.search}
      </button>
    </form>
  );
}
