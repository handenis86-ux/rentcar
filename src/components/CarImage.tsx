import type { Car } from "@/lib/catalog";

function SedanSilhouette({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 200 80" className={className} style={style} fill="currentColor" aria-hidden>
      <path d="M10 58c0-3 2-5 5-5h4c1-4 4-8 9-11l22-13c4-2 8-3 13-3h51c5 0 10 2 14 5l22 17h32c5 0 9 4 9 9v6c0 3-2 5-5 5h-8a13 13 0 0 1-26 0H59a13 13 0 0 1-26 0H15c-3 0-5-2-5-5v-5zm40 5a7 7 0 1 0 14 0 7 7 0 0 0-14 0zm110 0a7 7 0 1 0 14 0 7 7 0 0 0-14 0zM64 38l-17 10h57V35H81c-6 0-12 1-17 3zm55-3v13h45l-15-11c-3-2-6-3-10-3h-20z"/>
    </svg>
  );
}

function SuvSilhouette({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 200 80" className={className} style={style} fill="currentColor" aria-hidden>
      <path d="M8 58c0-3 2-5 5-5h3c1-4 3-8 7-11l12-10c4-3 9-5 14-5h84c4 0 8 1 11 4l16 14h31c5 0 9 4 9 9v6c0 3-2 5-5 5h-8a13 13 0 0 1-26 0H57a13 13 0 0 1-26 0H13c-3 0-5-2-5-5v-2zm40 5a7 7 0 1 0 14 0 7 7 0 0 0-14 0zm112 0a7 7 0 1 0 14 0 7 7 0 0 0-14 0zM48 34l-10 10h55V30H63c-5 0-11 1-15 4zm55-4v14h53l-13-11c-3-2-7-3-11-3h-29z"/>
    </svg>
  );
}

function MinivanSilhouette({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 200 80" className={className} style={style} fill="currentColor" aria-hidden>
      <path d="M8 58c0-3 2-5 5-5h3c1-4 3-8 7-11l6-5c5-4 11-6 17-6h106c5 0 9 4 9 9v2h20c5 0 9 4 9 9v7c0 3-2 5-5 5h-8a13 13 0 0 1-26 0H57a13 13 0 0 1-26 0H13c-3 0-5-2-5-5zm40 5a7 7 0 1 0 14 0 7 7 0 0 0-14 0zm112 0a7 7 0 1 0 14 0 7 7 0 0 0-14 0zM44 36l-8 8h55V30H58c-5 0-10 2-14 6zm55-6v14h55l-4-8a8 8 0 0 0-7-6H99z"/>
    </svg>
  );
}

function iconFor(cat: Car["category"]) {
  if (cat === "suv" || cat === "premium") return SuvSilhouette;
  if (cat === "minivan") return MinivanSilhouette;
  return SedanSilhouette;
}

// Whitelist of slugs where we have a studio photo that actually matches the model.
const HAS_PHOTO = new Set<string>([
  "chevrolet-spark",
  "chevrolet-cobalt",
  "chevrolet-lacetti",
  "chevrolet-malibu-2",
  "chevrolet-monza",
  "hyundai-tucson",
]);

export function CarImage({ car, className = "" }: { car: Car; className?: string }) {
  if (HAS_PHOTO.has(car.slug)) {
    return <img src={car.img} alt={`${car.brand} ${car.model}`} className={`w-full h-full object-cover ${className}`} />;
  }

  const Icon = iconFor(car.category);
  const palette: Record<Car["category"], { bg: string; fg: string; accent: string }> = {
    economy: { bg: "#FFF7ED", fg: "#F97316", accent: "#FED7AA" },
    comfort: { bg: "#F0F9FF", fg: "#0EA5E9", accent: "#BAE6FD" },
    premium: { bg: "#FEF3C7", fg: "#B45309", accent: "#FDE68A" },
    suv:     { bg: "#ECFDF5", fg: "#16A34A", accent: "#BBF7D0" },
    minivan: { bg: "#F5F3FF", fg: "#7C3AED", accent: "#DDD6FE" },
  };
  const p = palette[car.category];

  return (
    <div
      className={`relative w-full h-full flex items-end justify-center p-6 ${className}`}
      style={{ background: `linear-gradient(135deg, ${p.bg} 0%, ${p.accent} 100%)` }}
    >
      <div className="absolute top-5 left-5 right-5 flex items-start justify-between">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-[0.15em]" style={{ color: p.fg }}>{car.brand}</div>
          <div className="text-[18px] font-bold text-[#1A1A2E] leading-tight mt-1 max-w-[160px]">{car.model}</div>
        </div>
      </div>
      <Icon className="w-[78%] max-w-[260px]" style={{ color: p.fg, opacity: 0.85 }} />
    </div>
  );
}
