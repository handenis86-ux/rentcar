// Fleet catalog. Photos are scraped from rentcar.uz (used here per partnership
// agreement with RentCar.uz — source of truth is scripts/catalog-scraped.json).

export type CarCategory = "economy" | "comfort" | "premium" | "suv" | "minivan";

export interface Car {
  slug: string;
  brand: string;
  model: string;
  category: CarCategory;
  seats: number;
  bags: number;
  transmission: "auto" | "manual";
  fuel: "petrol" | "diesel" | "hybrid" | "electric";
  pricePerDay: number; // USD
  images: string[]; // first is primary; all shown in detail page gallery
}

export const CATALOG: Car[] = [
  { slug: "chevrolet-spark",            brand: "Chevrolet",     model: "Spark",                        category: "economy", seats: 4, bags: 1, transmission: "auto", fuel: "petrol", pricePerDay: 25,  images: ["/cars/chevrolet-spark-main.png","/cars/chevrolet-spark-4.jpg","/cars/chevrolet-spark-5.jpg","/cars/chevrolet-spark-6.jpg"] },
  { slug: "chevrolet-cobalt",           brand: "Chevrolet",     model: "Cobalt",                       category: "economy", seats: 5, bags: 2, transmission: "auto", fuel: "petrol", pricePerDay: 32,  images: ["/cars/chevrolet-cobalt-1.jpg","/cars/chevrolet-cobalt-2.jpg","/cars/chevrolet-cobalt-3.jpg","/cars/chevrolet-cobalt-4.jpg","/cars/chevrolet-cobalt-5.jpg","/cars/chevrolet-cobalt-6.jpg"] },
  { slug: "chevrolet-lacetti",          brand: "Chevrolet",     model: "Lacetti",                      category: "economy", seats: 5, bags: 2, transmission: "auto", fuel: "petrol", pricePerDay: 36,  images: ["/cars/chevrolet-lacetti-1.jpg","/cars/chevrolet-lacetti-2.jpg","/cars/chevrolet-lacetti-3.jpg","/cars/chevrolet-lacetti-4.jpg","/cars/chevrolet-lacetti-5.jpg","/cars/chevrolet-lacetti-6.jpg"] },
  { slug: "chevrolet-onix-ltz-turbo",   brand: "Chevrolet",     model: "Onix LTZ Turbo",               category: "comfort", seats: 5, bags: 2, transmission: "auto", fuel: "petrol", pricePerDay: 40,  images: ["/cars/chevrolet-onix-ltz-turbo-1.jpg","/cars/chevrolet-onix-ltz-turbo-2.jpg","/cars/chevrolet-onix-ltz-turbo-3.jpg","/cars/chevrolet-onix-ltz-turbo-4.jpg","/cars/chevrolet-onix-ltz-turbo-5.jpg","/cars/chevrolet-onix-ltz-turbo-6.jpg"] },
  { slug: "chevrolet-monza",            brand: "Chevrolet",     model: "Monza",                        category: "comfort", seats: 5, bags: 3, transmission: "auto", fuel: "petrol", pricePerDay: 40,  images: ["/cars/chevrolet-monza-1.jpg","/cars/chevrolet-monza-2.jpg","/cars/chevrolet-monza-3.jpg","/cars/chevrolet-monza-4.jpg","/cars/chevrolet-monza-5.jpg","/cars/chevrolet-monza-6.jpg"] },
  { slug: "toyota-prado-120",           brand: "Toyota",        model: "Prado 120",                    category: "suv",     seats: 7, bags: 4, transmission: "auto", fuel: "diesel", pricePerDay: 60,  images: ["/cars/toyota-prado-120-1.jpg","/cars/toyota-prado-120-2.jpg","/cars/toyota-prado-120-3.jpg","/cars/toyota-prado-120-4.jpg","/cars/toyota-prado-120-5.jpg","/cars/toyota-prado-120-6.jpg"] },
  { slug: "chevrolet-tracker-2",        brand: "Chevrolet",     model: "Tracker 2",                    category: "suv",     seats: 5, bags: 3, transmission: "auto", fuel: "petrol", pricePerDay: 55,  images: ["/cars/chevrolet-tracker-2-1.jpg","/cars/chevrolet-tracker-2-2.jpg","/cars/chevrolet-tracker-2-3.jpg","/cars/chevrolet-tracker-2-4.jpg","/cars/chevrolet-tracker-2-5.jpg","/cars/chevrolet-tracker-2-6.jpg"] },
  { slug: "kia-sonet",                  brand: "Kia",           model: "Sonet",                        category: "suv",     seats: 5, bags: 3, transmission: "auto", fuel: "petrol", pricePerDay: 55,  images: ["/cars/kia-sonet-5.jpg","/cars/kia-sonet-6.jpg"] },
  { slug: "chevrolet-orlando-redline",  brand: "Chevrolet",     model: "Orlando Redline 530T",         category: "minivan", seats: 7, bags: 4, transmission: "auto", fuel: "petrol", pricePerDay: 64,  images: ["/cars/chevrolet-orlando-redline-1.jpg","/cars/chevrolet-orlando-redline-2.jpg","/cars/chevrolet-orlando-redline-3.jpg","/cars/chevrolet-orlando-redline-4.jpg","/cars/chevrolet-orlando-redline-5.jpg"] },
  { slug: "byd-chazor-dm1",             brand: "BYD",           model: "Chazor DM-i",                  category: "comfort", seats: 5, bags: 3, transmission: "auto", fuel: "hybrid", pricePerDay: 80,  images: ["/cars/byd-chazor-dm1-1.jpg","/cars/byd-chazor-dm1-2.jpg","/cars/byd-chazor-dm1-3.jpg","/cars/byd-chazor-dm1-4.jpg","/cars/byd-chazor-dm1-5.jpg"] },
  { slug: "chevrolet-equinox",          brand: "Chevrolet",     model: "Equinox",                      category: "suv",     seats: 5, bags: 4, transmission: "auto", fuel: "petrol", pricePerDay: 95,  images: ["/cars/chevrolet-equinox-1.jpg","/cars/chevrolet-equinox-2.jpg","/cars/chevrolet-equinox-3.jpg","/cars/chevrolet-equinox-4.jpg","/cars/chevrolet-equinox-5.jpg"] },
  { slug: "kia-k5-g515",                brand: "Kia",           model: "K5 G515",                      category: "comfort", seats: 4, bags: 3, transmission: "auto", fuel: "petrol", pricePerDay: 95,  images: ["/cars/kia-k5-g515-1.jpg","/cars/kia-k5-g515-2.jpg","/cars/kia-k5-g515-3.jpg","/cars/kia-k5-g515-4.jpg"] },
  { slug: "chevrolet-malibu-2",         brand: "Chevrolet",     model: "Malibu 2",                     category: "comfort", seats: 5, bags: 3, transmission: "auto", fuel: "petrol", pricePerDay: 95,  images: ["/cars/chevrolet-malibu-2-1.jpg","/cars/chevrolet-malibu-2-2.jpg","/cars/chevrolet-malibu-2-3.jpg","/cars/chevrolet-malibu-2-4.jpg","/cars/chevrolet-malibu-2-5.jpg","/cars/chevrolet-malibu-2-6.jpg"] },
  { slug: "chevrolet-trailblazer-ltz",  brand: "Chevrolet",     model: "Trailblazer LTZ",              category: "suv",     seats: 7, bags: 4, transmission: "auto", fuel: "petrol", pricePerDay: 95,  images: ["/cars/chevrolet-trailblazer-ltz-1.jpg","/cars/chevrolet-trailblazer-ltz-2.jpg","/cars/chevrolet-trailblazer-ltz-3.jpg","/cars/chevrolet-trailblazer-ltz-4.jpg","/cars/chevrolet-trailblazer-ltz-5.jpg","/cars/chevrolet-trailblazer-ltz-6.jpg"] },
  { slug: "kia-carnival",               brand: "Kia",           model: "Carnival",                     category: "minivan", seats: 7, bags: 4, transmission: "auto", fuel: "petrol", pricePerDay: 87,  images: ["/cars/kia-carnival-1.jpg","/cars/kia-carnival-2.jpg","/cars/kia-carnival-3.jpg","/cars/kia-carnival-4.jpg","/cars/kia-carnival-5.jpg","/cars/kia-carnival-6.jpg"] },
  { slug: "byd-song-plus",              brand: "BYD",           model: "Song Plus",                    category: "suv",     seats: 5, bags: 3, transmission: "auto", fuel: "hybrid", pricePerDay: 95,  images: ["/cars/byd-song-plus-1.jpg","/cars/byd-song-plus-2.jpg","/cars/byd-song-plus-3.jpg","/cars/byd-song-plus-4.jpg","/cars/byd-song-plus-5.jpg","/cars/byd-song-plus-6.jpg"] },
  { slug: "hyundai-tucson",             brand: "Hyundai",       model: "Tucson",                       category: "suv",     seats: 5, bags: 4, transmission: "auto", fuel: "petrol", pricePerDay: 95,  images: ["/cars/hyundai-tucson-1.jpg","/cars/hyundai-tucson-2.jpg","/cars/hyundai-tucson-3.jpg"] },
  { slug: "isuzu-d-max-irbis",          brand: "Isuzu",         model: "D-Max Irbis AT",               category: "suv",     seats: 4, bags: 4, transmission: "auto", fuel: "diesel", pricePerDay: 120, images: ["/cars/isuzu-d-max-irbis-1.jpg","/cars/isuzu-d-max-irbis-2.jpg","/cars/isuzu-d-max-irbis-3.jpg","/cars/isuzu-d-max-irbis-4.jpg","/cars/isuzu-d-max-irbis-5.jpg","/cars/isuzu-d-max-irbis-6.jpg"] },
  { slug: "toyota-land-cruiser-prado",  brand: "Toyota",        model: "Land Cruiser Prado 150 4.0L",  category: "premium", seats: 7, bags: 4, transmission: "auto", fuel: "petrol", pricePerDay: 127, images: ["/cars/toyota-land-cruiser-prado-1.jpg","/cars/toyota-land-cruiser-prado-2.jpg","/cars/toyota-land-cruiser-prado-3.jpg","/cars/toyota-land-cruiser-prado-4.jpg","/cars/toyota-land-cruiser-prado-5.jpg","/cars/toyota-land-cruiser-prado-6.jpg"] },
  { slug: "kia-carnival-g03i",          brand: "Kia",           model: "Carnival G03I",                category: "minivan", seats: 8, bags: 4, transmission: "auto", fuel: "petrol", pricePerDay: 127, images: ["/cars/kia-carnival-g03i-1.jpg","/cars/kia-carnival-g03i-2.jpg","/cars/kia-carnival-g03i-3.jpg","/cars/kia-carnival-g03i-4.jpg","/cars/kia-carnival-g03i-5.jpg","/cars/kia-carnival-g03i-6.jpg"] },
  { slug: "toyota-land-cruiser-200",    brand: "Toyota",        model: "Land Cruiser 200",             category: "premium", seats: 7, bags: 4, transmission: "auto", fuel: "petrol", pricePerDay: 160, images: ["/cars/toyota-land-cruiser-200-1.jpg","/cars/toyota-land-cruiser-200-2.jpg","/cars/toyota-land-cruiser-200-3.jpg","/cars/toyota-land-cruiser-200-4.jpg","/cars/toyota-land-cruiser-200-5.jpg","/cars/toyota-land-cruiser-200-6.jpg"] },
  { slug: "lixiang-l9-ultra",           brand: "Lixiang",       model: "L9 Ultra",                     category: "premium", seats: 7, bags: 4, transmission: "auto", fuel: "hybrid", pricePerDay: 240, images: ["/cars/lixiang-l9-ultra-1.jpg","/cars/lixiang-l9-ultra-2.jpg","/cars/lixiang-l9-ultra-3.jpg","/cars/lixiang-l9-ultra-4.jpg","/cars/lixiang-l9-ultra-5.jpg","/cars/lixiang-l9-ultra-6.jpg"] },
  { slug: "toyota-land-cruiser-300",    brand: "Toyota",        model: "Land Cruiser 300 SFX",         category: "premium", seats: 7, bags: 4, transmission: "auto", fuel: "petrol", pricePerDay: 240, images: ["/cars/toyota-land-cruiser-300-1.jpg","/cars/toyota-land-cruiser-300-2.jpg","/cars/toyota-land-cruiser-300-3.jpg","/cars/toyota-land-cruiser-300-4.jpg","/cars/toyota-land-cruiser-300-5.jpg"] },
  { slug: "mercedes-benz-g400d",        brand: "Mercedes-Benz", model: "G400d",                        category: "premium", seats: 5, bags: 4, transmission: "auto", fuel: "diesel", pricePerDay: 635, images: ["/cars/mercedes-benz-g400d-1.jpg","/cars/mercedes-benz-g400d-2.jpg","/cars/mercedes-benz-g400d-3.jpg","/cars/mercedes-benz-g400d-4.jpg","/cars/mercedes-benz-g400d-5.jpg","/cars/mercedes-benz-g400d-6.jpg"] },
];

export function getCarBySlug(slug: string): Car | undefined {
  return CATALOG.find((c) => c.slug === slug);
}

export function primaryImage(car: Car): string {
  return car.images[0];
}
