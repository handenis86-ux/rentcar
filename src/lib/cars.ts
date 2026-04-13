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
  sortBy?: "price_asc" | "price_desc" | "newest";
  page?: number;
  limit?: number;
}

export async function getCars(filter: CarsFilter = {}) {
  const {
    city,
    categories = [],
    transmissions = [],
    fuelTypes = [],
    minPrice,
    maxPrice,
    seats,
    brand,
    sortBy = "price_asc",
    page = 1,
    limit = 12,
  } = filter;

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
  };

  const orderBy =
    sortBy === "price_desc" ? { pricePerDay: "desc" as const } :
    sortBy === "newest"     ? { year: "desc" as const }        :
                              { pricePerDay: "asc" as const };

  const [cars, total] = await Promise.all([
    prisma.car.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        city: true,
        company: { select: { id: true, name: true, slug: true, isVerified: true } },
        reviews: { select: { rating: true } },
      },
    }),
    prisma.car.count({ where }),
  ]);

  return {
    cars: cars.map((car) => ({
      ...car,
      averageRating:
        car.reviews.length > 0
          ? car.reviews.reduce((sum, r) => sum + r.rating, 0) / car.reviews.length
          : null,
      reviewCount: car.reviews.length,
    })),
    total,
    totalPages: Math.ceil(total / limit),
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

export async function getCities() {
  return prisma.city.findMany({ orderBy: { nameRu: "asc" } });
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
