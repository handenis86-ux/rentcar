"use client";
import { useState } from "react";

export function CarGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);

  const prev = () => setActive((i) => (i - 1 + images.length) % images.length);
  const next = () => setActive((i) => (i + 1) % images.length);

  const handleDownload = async () => {
    const src = images[active];
    const filename = src.split("/").pop() ?? `${alt}-${active + 1}.jpg`;
    try {
      const res = await fetch(src);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      window.open(src, "_blank");
    }
  };

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative rounded-2xl overflow-hidden bg-[#F5F5F0] aspect-[16/10]">
        <img
          key={active}
          src={images[active]}
          alt={`${alt} ${active + 1}`}
          className="w-full h-full object-cover"
        />
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous"
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full w-9 h-9 flex items-center justify-center text-[20px] shadow transition"
            >
              ‹
            </button>
            <button
              onClick={next}
              aria-label="Next"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full w-9 h-9 flex items-center justify-center text-[20px] shadow transition"
            >
              ›
            </button>
          </>
        )}
        <button
          onClick={handleDownload}
          aria-label="Download image"
          title="Скачать фото"
          className="absolute top-3 right-3 bg-white/80 hover:bg-white rounded-full w-9 h-9 flex items-center justify-center shadow transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
        </button>
        <span className="absolute bottom-3 right-3 bg-black/50 text-white text-[11px] px-2 py-0.5 rounded-full select-none">
          {active + 1} / {images.length}
        </span>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {images.slice(0, 5).map((src, i) => (
            <button
              key={src + i}
              onClick={() => setActive(i)}
              className={`rounded-[10px] overflow-hidden bg-[#F5F5F0] aspect-[4/3] ring-2 transition-all ${
                active === i
                  ? "ring-[#F97316] opacity-100"
                  : "ring-transparent opacity-60 hover:opacity-100 hover:ring-[#D1D5DB]"
              }`}
            >
              <img src={src} alt={`${alt} ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
