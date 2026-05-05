import "dotenv/config";
import { PrismaClient } from "@/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import {
  CATALOG,
  CITY_BY_SLUG,
  categoryToDb,
  fuelToDb,
  transmissionToDb,
} from "@/lib/catalog";
import { EXTRAS } from "@/lib/catalog-extras";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const USD_TO_UZS = 12_500;

async function main() {
  console.log("Seeding database...");

  await prisma.review.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.car.deleteMany();
  await prisma.company.deleteMany();
  await prisma.city.deleteMany();
  await prisma.user.deleteMany();
  await prisma.page.deleteMany();

  const cities = await Promise.all([
    prisma.city.create({ data: { slug: "tashkent",  nameRu: "Ташкент",   nameUz: "Toshkent",  nameEn: "Tashkent"  } }),
    prisma.city.create({ data: { slug: "samarkand", nameRu: "Самарканд", nameUz: "Samarqand", nameEn: "Samarkand" } }),
    prisma.city.create({ data: { slug: "bukhara",   nameRu: "Бухара",    nameUz: "Buxoro",    nameEn: "Bukhara"   } }),
    prisma.city.create({ data: { slug: "fergana",   nameRu: "Фергана",   nameUz: "Farg'ona",  nameEn: "Fergana"   } }),
    prisma.city.create({ data: { slug: "namangan",  nameRu: "Наманган",  nameUz: "Namangan",  nameEn: "Namangan"  } }),
    prisma.city.create({ data: { slug: "nukus",     nameRu: "Нукус",     nameUz: "Nukus",     nameEn: "Nukus"     } }),
  ]);
  const cityIdBySlug = Object.fromEntries(cities.map((c) => [c.slug, c.id]));

  await prisma.user.create({
    data: {
      email: "admin@rentz.uz",
      phone: "+998901234567",
      name: "Rentz Admin",
      role: "ADMIN",
      language: "RU",
      passwordHash: "$2b$10$placeholder_hash_replace_me",
      isVerified: true,
    },
  });

  const owner1 = await prisma.user.create({
    data: {
      email: "owner1@rentz.uz",
      phone: "+998901111111",
      name: "Азиз Каримов",
      role: "OWNER",
      language: "RU",
      passwordHash: "$2b$10$placeholder_hash_replace_me",
      isVerified: true,
    },
  });

  const owner2 = await prisma.user.create({
    data: {
      email: "owner2@rentz.uz",
      phone: "+998902222222",
      name: "Дилшод Рахимов",
      role: "OWNER",
      language: "UZ",
      passwordHash: "$2b$10$placeholder_hash_replace_me",
      isVerified: true,
    },
  });

  const company1 = await prisma.company.create({
    data: {
      slug: "tashkent-avto",
      name: "Tashkent Avto",
      description: "Крупнейший автопарк в Ташкенте. Более 50 автомобилей.",
      phone: "+998901111111",
      email: "info@tashkentavto.uz",
      address: "ул. Амира Темура, 100",
      ownerId: owner1.id,
      isVerified: true,
    },
  });

  const company2 = await prisma.company.create({
    data: {
      slug: "silk-road-cars",
      name: "Silk Road Cars",
      description: "Аренда авто по всему Узбекистану. Доставка в аэропорт.",
      phone: "+998902222222",
      email: "info@silkroadcars.uz",
      address: "ул. Навои, 55",
      ownerId: owner2.id,
      isVerified: true,
    },
  });

  // Cars: generate from CATALOG so slugs match the static data used by the frontend.
  let i = 0;
  for (const car of CATALOG) {
    const citySlug = CITY_BY_SLUG[car.slug] ?? "tashkent";
    const cityId   = cityIdBySlug[citySlug];
    const extras   = EXTRAS[car.slug];
    const inTashkent = citySlug === "tashkent";
    const ownerId   = inTashkent ? owner1.id : owner2.id;
    const companyId = inTashkent ? company1.id : company2.id;

    await prisma.car.create({
      data: {
        slug:         car.slug,
        brand:        car.brand,
        model:        car.model,
        year:         car.year,
        category:     categoryToDb(car.category),
        transmission: transmissionToDb(car.transmission),
        fuelType:     fuelToDb(car.fuel),
        seats:        car.seats,
        pricePerDay:  car.pricePerDay * USD_TO_UZS,
        deposit:      extras?.depositUzs ?? car.deposit * 1000,
        mileageLimit: extras?.dailyKm ?? 300,
        cityId,
        ownerId,
        companyId,
        features:     extras?.features ?? [],
        description:  car.description.ru,
        images:       car.images,
        isOwnFleet:   true,
        isApproved:   true,
        isAvailable:  true,
      },
    });
    i++;
  }

  console.log("Seeded:");
  console.log(`  ${cities.length} cities`);
  console.log("  3 users (1 admin, 2 owners)");
  console.log("  2 companies");
  console.log(`  ${i} cars (from CATALOG)`);
  console.log("Done!");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
