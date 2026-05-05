"use client";

import { useState } from "react";

export function Accordion({
  items,
  startIndex,
}: {
  items: { q: string; a: string }[];
  startIndex: number;
}) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div>
      {items.map((it, i) => {
        const key = startIndex + i;
        const isOpen = open === key;
        return (
          <div key={key} className="border-b border-[#E5E7EB]">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : key)}
              className="w-full flex items-center justify-between py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-[15px] font-semibold text-[#1A1A2E]">{it.q}</span>
              <svg className={`h-4 w-4 text-[#9CA3AF] transition-transform ${isOpen ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {isOpen && <p className="pb-5 text-[14px] text-[#4B5563] leading-[1.6]">{it.a}</p>}
          </div>
        );
      })}
    </div>
  );
}
