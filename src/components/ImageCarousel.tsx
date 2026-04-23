"use client";

import { useState } from "react";

export function ImageCarousel({ images, alt }: { images: string[]; alt: string }) {
  const [idx, setIdx] = useState(0);
  if (images.length === 0) return null;
  const go = (delta: number) => {
    setIdx((v) => (v + delta + images.length) % images.length);
  };
  return (
    <div className="space-y-3">
      <div className="relative rounded-2xl overflow-hidden bg-[#F5F5F0] aspect-[16/10] group">
        <img
          key={images[idx]}
          src={images[idx]}
          alt={`${alt} — ${idx + 1}/${images.length}`}
          className="w-full h-full object-cover transition-opacity duration-200"
        />
        {images.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous photo"
              onClick={() => go(-1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 shadow-[0_2px_8px_rgba(0,0,0,0.15)] flex items-center justify-center text-[#1A1A2E] hover:bg-white transition"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next photo"
              onClick={() => go(1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 shadow-[0_2px_8px_rgba(0,0,0,0.15)] flex items-center justify-center text-[#1A1A2E] hover:bg-white transition"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
            <div className="absolute bottom-3 right-3 rounded-full bg-black/55 text-white text-[12px] px-2.5 py-1 font-medium">
              {idx + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 scroll-smooth [scrollbar-width:thin]">
          {images.map((src, i) => (
            <button
              type="button"
              key={src}
              onClick={() => setIdx(i)}
              aria-label={`Show photo ${i + 1}`}
              className={`shrink-0 rounded-[10px] overflow-hidden bg-[#F5F5F0] aspect-[4/3] w-[120px] transition ${
                i === idx ? "ring-2 ring-[#F97316]" : "opacity-70 hover:opacity-100"
              }`}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
