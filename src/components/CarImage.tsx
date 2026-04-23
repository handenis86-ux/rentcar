import type { Car } from "@/lib/catalog";

export function CarImage({ car, className = "" }: { car: Car; className?: string }) {
  const src = car.images[0];
  return (
    <img
      src={src}
      alt={`${car.brand} ${car.model}`}
      className={`w-full h-full object-cover ${className}`}
    />
  );
}
