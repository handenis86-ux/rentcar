// Fleet catalog — factual data (make/model/year/class/seats/trans/price).
// Photos are stock studio shots from our design package, mapped by body class.
// Descriptions are our own wording.

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
  img: string;
}

const IMG = {
  sparkWhite:   "/design/generated-1776872171930.png",
  sparkFleet:   "/design/generated-1776872193435.png",
  cobaltWhite:  "/design/generated-1776872215898.png",
  cobaltFleet:  "/design/generated-1776872227969.png",
  malibuHome:   "/design/generated-1776872206548.png",
  malibuFleet:  "/design/generated-1776872229856.png",
  malibuSilver: "/design/generated-1776872222722.png",
  camryHome:    "/design/generated-1776872186016.png",
  camryFleet:   "/design/generated-1776872246573.png",
  tucson:       "/design/generated-1776872248909.png",
  mercedesHome: "/design/generated-1776872233134.png",
  mercedesFlt:  "/design/generated-1776872265176.png",
  hero:         "/design/generated-1776872101080.png",
} as const;

export const CATALOG: Car[] = [
  { slug: "chevrolet-spark",            brand: "Chevrolet",    model: "Spark",                 category: "economy", seats: 4, bags: 1, transmission: "auto", fuel: "petrol", pricePerDay: 25,  img: IMG.sparkFleet    },
  { slug: "chevrolet-cobalt",           brand: "Chevrolet",    model: "Cobalt",                category: "economy", seats: 5, bags: 2, transmission: "auto", fuel: "petrol", pricePerDay: 32,  img: IMG.cobaltFleet   },
  { slug: "chevrolet-lacetti",          brand: "Chevrolet",    model: "Lacetti",               category: "economy", seats: 5, bags: 2, transmission: "auto", fuel: "petrol", pricePerDay: 36,  img: IMG.cobaltWhite   },
  { slug: "chevrolet-onix-ltz-turbo",   brand: "Chevrolet",    model: "Onix LTZ Turbo",        category: "comfort", seats: 5, bags: 2, transmission: "auto", fuel: "petrol", pricePerDay: 40,  img: IMG.camryHome     },
  { slug: "chevrolet-monza",            brand: "Chevrolet",    model: "Monza",                 category: "comfort", seats: 5, bags: 3, transmission: "auto", fuel: "petrol", pricePerDay: 40,  img: IMG.malibuSilver  },
  { slug: "toyota-prado-120",           brand: "Toyota",       model: "Prado 120",             category: "suv",     seats: 7, bags: 4, transmission: "auto", fuel: "diesel", pricePerDay: 60,  img: IMG.tucson        },
  { slug: "chevrolet-tracker-2",        brand: "Chevrolet",    model: "Tracker 2",             category: "suv",     seats: 5, bags: 3, transmission: "auto", fuel: "petrol", pricePerDay: 55,  img: IMG.hero          },
  { slug: "kia-sonet",                  brand: "Kia",          model: "Sonet",                 category: "suv",     seats: 5, bags: 3, transmission: "auto", fuel: "petrol", pricePerDay: 55,  img: IMG.sparkWhite    },
  { slug: "chevrolet-orlando-redline",  brand: "Chevrolet",    model: "Orlando Redline 530T",  category: "minivan", seats: 7, bags: 4, transmission: "auto", fuel: "petrol", pricePerDay: 64,  img: IMG.malibuHome    },
  { slug: "byd-chazor-dm1",             brand: "BYD",          model: "Chazor DM-i",           category: "comfort", seats: 5, bags: 3, transmission: "auto", fuel: "hybrid", pricePerDay: 80,  img: IMG.malibuFleet   },
  { slug: "chevrolet-equinox",          brand: "Chevrolet",    model: "Equinox",               category: "suv",     seats: 5, bags: 4, transmission: "auto", fuel: "petrol", pricePerDay: 95,  img: IMG.mercedesFlt   },
  { slug: "kia-k5-g515",                brand: "Kia",          model: "K5 G515",               category: "comfort", seats: 4, bags: 3, transmission: "auto", fuel: "petrol", pricePerDay: 95,  img: IMG.camryFleet    },
  { slug: "chevrolet-malibu-2",         brand: "Chevrolet",    model: "Malibu 2",              category: "comfort", seats: 5, bags: 3, transmission: "auto", fuel: "petrol", pricePerDay: 95,  img: IMG.malibuSilver  },
  { slug: "chevrolet-trailblazer-ltz",  brand: "Chevrolet",    model: "Trailblazer LTZ",       category: "suv",     seats: 7, bags: 4, transmission: "auto", fuel: "petrol", pricePerDay: 95,  img: IMG.tucson        },
  { slug: "kia-carnival",               brand: "Kia",          model: "Carnival",              category: "minivan", seats: 7, bags: 4, transmission: "auto", fuel: "petrol", pricePerDay: 87,  img: IMG.hero          },
  { slug: "byd-song-plus",              brand: "BYD",          model: "Song Plus",             category: "suv",     seats: 5, bags: 3, transmission: "auto", fuel: "hybrid", pricePerDay: 95,  img: IMG.camryHome     },
  { slug: "hyundai-tucson",             brand: "Hyundai",      model: "Tucson",                category: "suv",     seats: 5, bags: 4, transmission: "auto", fuel: "petrol", pricePerDay: 95,  img: IMG.tucson        },
  { slug: "isuzu-d-max-irbis",          brand: "Isuzu",        model: "D-Max Irbis AT",        category: "suv",     seats: 4, bags: 4, transmission: "auto", fuel: "diesel", pricePerDay: 120, img: IMG.mercedesHome  },
  { slug: "toyota-land-cruiser-prado",  brand: "Toyota",       model: "Land Cruiser Prado 150 4.0L", category: "premium", seats: 7, bags: 4, transmission: "auto", fuel: "petrol", pricePerDay: 127, img: IMG.tucson },
  { slug: "kia-carnival-g03i",          brand: "Kia",          model: "Carnival G03I",         category: "minivan", seats: 8, bags: 4, transmission: "auto", fuel: "petrol", pricePerDay: 127, img: IMG.hero          },
  { slug: "toyota-land-cruiser-200",    brand: "Toyota",       model: "Land Cruiser 200",      category: "premium", seats: 7, bags: 4, transmission: "auto", fuel: "petrol", pricePerDay: 160, img: IMG.mercedesFlt   },
  { slug: "lixiang-l9-ultra",           brand: "Lixiang",      model: "L9 Ultra",              category: "premium", seats: 7, bags: 4, transmission: "auto", fuel: "hybrid", pricePerDay: 240, img: IMG.mercedesHome  },
  { slug: "toyota-land-cruiser-300",    brand: "Toyota",       model: "Land Cruiser 300 SFX",  category: "premium", seats: 7, bags: 4, transmission: "auto", fuel: "petrol", pricePerDay: 240, img: IMG.mercedesFlt   },
  { slug: "mercedes-benz-g400d",        brand: "Mercedes-Benz", model: "G400d",                category: "premium", seats: 5, bags: 4, transmission: "auto", fuel: "diesel", pricePerDay: 635, img: IMG.mercedesHome  },
];

export function getCarBySlug(slug: string): Car | undefined {
  return CATALOG.find((c) => c.slug === slug);
}
