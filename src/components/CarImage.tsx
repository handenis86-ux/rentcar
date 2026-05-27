import Image from "next/image";
import type { Car } from "@/lib/catalog";

export function CarImage({
  car,
  className = "",
  priority = false,
}: {
  car: Car;
  className?: string;
  priority?: boolean;
}) {
  const src = car.images[0];
  return (
    <Image
      src={src}
      alt={`${car.brand} ${car.model} — аренда в Узбекистане`}
      fill
      sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
      className={`object-contain ${className}`}
      priority={priority}
    />
  );
}
