export type Transmission = "AUTOMATIC" | "MANUAL";
export type FuelType = "PETROL" | "DIESEL" | "ELECTRIC" | "HYBRID" | "GAS";
export type CarCategory = "ECONOMY" | "COMFORT" | "BUSINESS" | "SUV" | "MINIVAN" | "PREMIUM";
export type BookingStatus = "PENDING" | "CONFIRMED" | "ACTIVE" | "COMPLETED" | "CANCELLED";
export type PaymentStatus = "PENDING" | "PAID" | "REFUNDED";
export type PaymentMethod = "CASH" | "CLICK" | "PAYME" | "CARD";
export type UserRole = "RENTER" | "OWNER" | "ADMIN";
export type Language = "RU" | "UZ" | "EN";

interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User extends BaseEntity {
  email: string;
  phone: string;
  name: string;
  role: UserRole;
  language: Language;
  avatar: string | null;
  isVerified: boolean;
}

export interface City {
  id: string;
  slug: string;
  nameRu: string;
  nameUz: string;
  nameEn: string;
}

export interface Company extends BaseEntity {
  slug: string;
  name: string;
  description: string | null;
  logo: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  ownerId: string;
  isVerified: boolean;
  owner?: User;
}

export interface Car extends BaseEntity {
  slug: string;
  ownerId: string;
  companyId: string | null;
  cityId: string;
  brand: string;
  model: string;
  year: number;
  category: CarCategory;
  transmission: Transmission;
  fuelType: FuelType;
  seats: number;
  pricePerDay: number;
  deposit: number;
  mileageLimit: number | null;
  address: string | null;
  images: string[];
  features: string[];
  description: string | null;
  isOwnFleet: boolean;
  isAvailable: boolean;
  isApproved: boolean;
  owner?: User;
  company?: Company;
  city?: City;
  reviews?: Review[];
  averageRating?: number;
  reviewCount?: number;
}

export interface Booking extends BaseEntity {
  carId: string;
  renterId: string;
  ownerId: string;
  startDate: string;
  endDate: string;
  pickupLocation: string;
  dropoffLocation: string;
  totalPrice: number;
  depositAmount: number;
  commission: number;
  status: BookingStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  notes: string | null;
  car?: Car;
  renter?: User;
  owner?: User;
}

export interface Review {
  id: string;
  bookingId: string;
  reviewerId: string;
  carId: string;
  rating: number;
  comment: string | null;
  createdAt: Date;
  reviewer?: User;
}

export interface Page extends BaseEntity {
  slug: string;
  titleRu: string;
  titleUz: string;
  titleEn: string;
  contentRu: string;
  contentUz: string;
  contentEn: string;
  metaDescription: string | null;
  isPublished: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface CarSearchParams {
  city?: string;
  startDate?: string;
  endDate?: string;
  category?: CarCategory[];
  transmission?: Transmission[];
  fuelType?: FuelType[];
  minPrice?: number;
  maxPrice?: number;
  seats?: number;
  sortBy?: "price_asc" | "price_desc" | "rating" | "newest";
  page?: number;
  limit?: number;
}
