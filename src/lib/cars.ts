import { unstable_cache } from "next/cache";
import { prisma } from "./prisma";
import type { CarCategory, Transmission, FuelType } from "@/types";

export interface CarsFilter {
  city?: string;
  categories?: CarCategory[];
  transmissions?: Transmission[];
  fuelTypes?: FuelType[];
  minPrice?: number;
  maxPrice?: number;
  seats?: number;
  brand?: string;
  pickupDate?: Date;
  returnDate?: Date;
  sortBy?: "price_asc" | "price_desc" | "newest";
  page?: number;
  limit?: number;
}

const ACTIVE_BOOKING_STATUSES = ["PENDING", "CONFIRMED", "ACTIVE"] as const;

export async function getCars(filter: CarsFilter = {}) {
  const datesProvided = !!(
    filter.pickupDate &&
    filter.returnDate &&
    filter.returnDate > filter.pickupDate
  );

  // Without dates the filter is fully serialisable and the result is the same
  // for every visitor — cache it. With dates, availability depends on bookings,
  // so query straight through.
  if (!datesProvided) {
    const { pickupDate: _p, returnDate: _r, ...keyable } = filter;
    void _p; void _r;
    return getCarsCached(keyable);
  }
  return getCarsRaw(filter);
}

const getCarsCached = unstable_cache(
  (filter: Omit<CarsFilter, "pickupDate" | "returnDate">) => getCarsRaw(filter),
  ["cars"],
  { tags: ["cars"], revalidate: 60 },
);

async function getCarsRaw(filter: CarsFilter) {
  const {
    city,
    categories = [],
    transmissions = [],
    fuelTypes = [],
    minPrice,
    maxPrice,
    seats,
    brand,
    pickupDate,
    returnDate,
    sortBy = "price_asc",
    page = 1,
    limit = 12,
  } = filter;

  const datesProvided = !!(pickupDate && returnDate && returnDate > pickupDate);

  const where = {
    isAvailable: true,
    isApproved: true,
    ...(city ? { city: { slug: city } } : {}),
    ...(categories.length > 0 ? { category: { in: categories } } : {}),
    ...(transmissions.length > 0 ? { transmission: { in: transmissions } } : {}),
    ...(fuelTypes.length > 0 ? { fuelType: { in: fuelTypes } } : {}),
    ...(seats ? { seats } : {}),
    ...(brand ? { brand } : {}),
    ...(minPrice !== undefined || maxPrice !== undefined
      ? {
          pricePerDay: {
            ...(minPrice !== undefined ? { gte: minPrice } : {}),
            ...(maxPrice !== undefined ? { lte: maxPrice } : {}),
          },
        }
      : {}),
    ...(datesProvided
      ? {
          bookings: {
            none: {
              status: { in: [...ACTIVE_BOOKING_STATUSES] },
              startDate: { lt: returnDate! },
              endDate:   { gt: pickupDate! },
            },
          },
        }
      : {}),
  };

  const orderBy =
    sortBy === "price_desc" ? { pricePerDay: "desc" as const } :
    sortBy === "newest"     ? { year: "desc" as const }        :
                              { pricePerDay: "asc" as const };

  const cars = await prisma.car.findMany({
    where,
    orderBy,
    skip: (page - 1) * limit,
    take: limit,
    include: {
      city: true,
      company: { select: { id: true, name: true, slug: true, isVerified: true } },
      reviews: { select: { rating: true } },
    },
  });

  return {
    cars: cars.map((car) => ({
      ...car,
      averageRating:
        car.reviews.length > 0
          ? car.reviews.reduce((sum, r) => sum + r.rating, 0) / car.reviews.length
          : null,
      reviewCount: car.reviews.length,
    })),
    page,
  };
}

export async function getCarBySlug(slug: string) {
  const car = await prisma.car.findUnique({
    where: { slug },
    include: {
      city: true,
      company: true,
      owner: {
        select: { id: true, name: true, phone: true, avatar: true, isVerified: true },
      },
      reviews: {
        include: {
          reviewer: { select: { id: true, name: true, avatar: true } },
        },
        orderBy: { createdAt: "desc" },
        take: 10,
      },
    },
  });

  if (!car) return null;

  return {
    ...car,
    averageRating:
      car.reviews.length > 0
        ? car.reviews.reduce((sum, r) => sum + r.rating, 0) / car.reviews.length
        : null,
    reviewCount: car.reviews.length,
  };
}

export const getCities = unstable_cache(
  async () => prisma.city.findMany({ orderBy: { nameRu: "asc" } }),
  ["cities"],
  { tags: ["cities"], revalidate: 3600 },
);

export async function isCarAvailable(carId: string, pickupDate: Date, returnDate: Date) {
  const conflict = await prisma.booking.findFirst({
    where: {
      carId,
      status: { in: [...ACTIVE_BOOKING_STATUSES] },
      startDate: { lt: returnDate },
      endDate:   { gt: pickupDate },
    },
    select: { id: true },
  });
  return !conflict;
}

export async function getDistinctBrands() {
  const rows = await prisma.car.findMany({
    where: { isAvailable: true, isApproved: true },
    select: { brand: true },
    distinct: ["brand"],
    orderBy: { brand: "asc" },
  });
  return rows.map((r) => r.brand);
}
