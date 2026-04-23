// Fleet catalog. Photos are scraped from rentcar.uz (used here per partnership
// agreement with RentCar.uz — source of truth is scripts/catalog-scraped.json).
// Descriptions and extended specs are our own wording.

export type CarCategory = "economy" | "comfort" | "premium" | "suv" | "minivan";
export type BodyType = "hatchback" | "sedan" | "crossover" | "suv" | "minivan" | "pickup";
export type DriveType = "fwd" | "rwd" | "awd";
export type Locale = "ru" | "en" | "uz";

export interface Car {
  slug: string;
  brand: string;
  model: string;
  year: number;
  body: BodyType;
  category: CarCategory;
  seats: number;
  bags: number;
  transmission: "auto" | "manual";
  fuel: "petrol" | "diesel" | "hybrid" | "electric";
  engine: string; // e.g. "1.2 L", "3.5 L Turbo"
  drive: DriveType;
  pricePerDay: number; // USD
  deposit: number; // UZS in K
  images: string[];
  description: Record<Locale, string>;
}

const D = (ru: string, en: string, uz: string): Record<Locale, string> => ({ ru, en, uz });

export const CATALOG: Car[] = [
  {
    slug: "chevrolet-spark", brand: "Chevrolet", model: "Spark", year: 2023, body: "hatchback",
    category: "economy", seats: 4, bags: 1, transmission: "auto", fuel: "petrol",
    engine: "1.2 L", drive: "fwd", pricePerDay: 25, deposit: 3000,
    images: ["/cars/chevrolet-spark-hero.png","/cars/chevrolet-spark-g1.jpg","/cars/chevrolet-spark-g2.jpg","/cars/chevrolet-spark-g3.jpg","/cars/chevrolet-spark-g4.jpg"],
    description: D(
      "Компактный городской хэтчбек. Маневренный, экономичный, лёгкая парковка. Оптимален для одного-двух пассажиров в пределах Ташкента.",
      "Compact city hatchback. Easy to manoeuvre, fuel-efficient, simple to park. Best for 1–2 passengers around Tashkent.",
      "Ixcham shahar xetchbegi. Parvarish qilish oson, yoqilg'i tejamkor, Toshkent ichida 1–2 yo'lovchi uchun ideal."
    ),
  },
  {
    slug: "chevrolet-cobalt", brand: "Chevrolet", model: "Cobalt", year: 2024, body: "sedan",
    category: "economy", seats: 5, bags: 2, transmission: "auto", fuel: "petrol",
    engine: "1.5 L", drive: "fwd", pricePerDay: 32, deposit: 3000,
    images: ["/cars/chevrolet-cobalt-hero.png","/cars/chevrolet-cobalt-g1.jpg","/cars/chevrolet-cobalt-g2.jpg","/cars/chevrolet-cobalt-g3.jpg","/cars/chevrolet-cobalt-g4.jpg","/cars/chevrolet-cobalt-g5.jpg"],
    description: D(
      "Просторный седан эконом-класса. Вместительный багажник, низкий расход. Подходит для повседневных поездок и коротких трипов за город.",
      "Spacious economy sedan with a roomy trunk and low fuel use. A solid daily driver and short road-trip companion.",
      "Keng iqtisodiy sedan. Hajmli yuk bo'limi, past yoqilg'i sarfi. Kundalik va qisqa sayohatlar uchun."
    ),
  },
  {
    slug: "chevrolet-lacetti", brand: "Chevrolet", model: "Lacetti", year: 2022, body: "sedan",
    category: "economy", seats: 5, bags: 2, transmission: "auto", fuel: "petrol",
    engine: "1.5 L", drive: "fwd", pricePerDay: 36, deposit: 3000,
    images: ["/cars/chevrolet-lacetti-hero.png","/cars/chevrolet-lacetti-g1.jpg","/cars/chevrolet-lacetti-g2.jpg","/cars/chevrolet-lacetti-g3.jpg","/cars/chevrolet-lacetti-g4.jpg","/cars/chevrolet-lacetti-g5.jpg","/cars/chevrolet-lacetti-g6.jpg"],
    description: D(
      "Проверенный временем седан. Надёжный, простой в обслуживании, удобный салон. Хороший выбор для семьи из четырёх.",
      "A time-tested sedan. Reliable, simple to service, comfortable cabin — a solid pick for a family of four.",
      "Vaqt sinovidan o'tgan sedan. Ishonchli, xizmat ko'rsatishga qulay, qulay salon."
    ),
  },
  {
    slug: "chevrolet-onix-ltz-turbo", brand: "Chevrolet", model: "Onix LTZ Turbo", year: 2024, body: "sedan",
    category: "comfort", seats: 5, bags: 2, transmission: "auto", fuel: "petrol",
    engine: "1.0 L Turbo", drive: "fwd", pricePerDay: 40, deposit: 4000,
    images: ["/cars/chevrolet-onix-ltz-turbo-hero.png","/cars/chevrolet-onix-ltz-turbo-g1.jpg","/cars/chevrolet-onix-ltz-turbo-g2.jpg","/cars/chevrolet-onix-ltz-turbo-g3.jpg","/cars/chevrolet-onix-ltz-turbo-g4.jpg","/cars/chevrolet-onix-ltz-turbo-g5.jpg","/cars/chevrolet-onix-ltz-turbo-g6.jpg"],
    description: D(
      "Современный турбо-седан с богатой комплектацией LTZ. Мультимедиа с Apple CarPlay, камера, круиз-контроль, активная безопасность.",
      "Modern turbo sedan in top LTZ trim. Apple CarPlay, rear camera, cruise control and active-safety kit come standard.",
      "Zamonaviy turbo-sedan, to'liq LTZ komplekti. Apple CarPlay, kamera, kruiz-kontrol va xavfsizlik tizimlari."
    ),
  },
  {
    slug: "chevrolet-monza", brand: "Chevrolet", model: "Monza", year: 2024, body: "sedan",
    category: "comfort", seats: 5, bags: 3, transmission: "auto", fuel: "petrol",
    engine: "1.5 L Turbo", drive: "fwd", pricePerDay: 40, deposit: 4000,
    images: ["/cars/chevrolet-monza-hero.png","/cars/chevrolet-monza-g1.jpg","/cars/chevrolet-monza-g2.jpg","/cars/chevrolet-monza-g3.jpg","/cars/chevrolet-monza-g4.jpg","/cars/chevrolet-monza-g5.jpg","/cars/chevrolet-monza-g6.jpg"],
    description: D(
      "Стильный седан бизнес-эконом класса с турбо-мотором. Уверенная динамика, просторный салон, качественная отделка.",
      "Stylish business-economy sedan with a turbo engine. Confident dynamics, roomy cabin, quality trim.",
      "Turbo motorli zamonaviy sedan. Ishonchli dinamika, keng salon, sifatli bezak."
    ),
  },
  {
    slug: "toyota-prado-120", brand: "Toyota", model: "Prado 120", year: 2008, body: "suv",
    category: "suv", seats: 7, bags: 4, transmission: "auto", fuel: "diesel",
    engine: "3.0 TD", drive: "awd", pricePerDay: 60, deposit: 6000,
    images: ["/cars/toyota-prado-120-hero.png","/cars/toyota-prado-120-g1.jpg","/cars/toyota-prado-120-g2.jpg","/cars/toyota-prado-120-g3.jpg","/cars/toyota-prado-120-g4.jpg","/cars/toyota-prado-120-g5.jpg","/cars/toyota-prado-120-g6.jpg"],
    description: D(
      "Легендарный рамный внедорожник. Постоянный полный привод, три ряда сидений, проходимость по горным и степным дорогам.",
      "The classic body-on-frame SUV. Full-time 4WD, three rows of seats, tackles mountain and steppe roads with ease.",
      "Ramali klassik SUV. Doimiy to'rt g'ildirakli uzatma, uch qator o'rindiq, tog' va dasht yo'llariga mos."
    ),
  },
  {
    slug: "chevrolet-tracker-2", brand: "Chevrolet", model: "Tracker 2", year: 2023, body: "crossover",
    category: "suv", seats: 5, bags: 3, transmission: "auto", fuel: "petrol",
    engine: "1.2 L Turbo", drive: "fwd", pricePerDay: 55, deposit: 5000,
    images: ["/cars/chevrolet-tracker-2-hero.png","/cars/chevrolet-tracker-2-g1.jpg","/cars/chevrolet-tracker-2-g2.jpg","/cars/chevrolet-tracker-2-g3.jpg","/cars/chevrolet-tracker-2-g4.jpg","/cars/chevrolet-tracker-2-g5.jpg","/cars/chevrolet-tracker-2-g6.jpg"],
    description: D(
      "Городской кроссовер нового поколения. Высокая посадка, современные ассистенты и комфорт в дальней дороге.",
      "New-generation urban crossover. Higher seating, modern driver assists and long-distance comfort.",
      "Yangi avlod shahar krossoveri. Yuqori o'rindiq, zamonaviy yordamchilar, uzoq yo'lda qulaylik."
    ),
  },
  {
    slug: "kia-sonet", brand: "Kia", model: "Sonet", year: 2023, body: "crossover",
    category: "suv", seats: 5, bags: 3, transmission: "auto", fuel: "petrol",
    engine: "1.5 L", drive: "fwd", pricePerDay: 55, deposit: 5000,
    images: ["/cars/kia-sonet-hero.png","/cars/kia-sonet-g1.jpg","/cars/kia-sonet-g2.jpg","/cars/kia-sonet-g3.jpg","/cars/kia-sonet-g4.jpg","/cars/kia-sonet-g5.jpg"],
    description: D(
      "Компактный корейский кроссовер. Современный дизайн, цифровая панель, экономичный двигатель.",
      "Compact Korean crossover. Modern look, digital dash, fuel-efficient powertrain.",
      "Ixcham Koreys krossover. Zamonaviy dizayn, raqamli panel, tejamkor dvigatel."
    ),
  },
  {
    slug: "chevrolet-orlando-redline", brand: "Chevrolet", model: "Orlando Redline 530T", year: 2023, body: "minivan",
    category: "minivan", seats: 7, bags: 4, transmission: "auto", fuel: "petrol",
    engine: "1.3 L Turbo", drive: "fwd", pricePerDay: 64, deposit: 5000,
    images: ["/cars/chevrolet-orlando-redline-hero.png","/cars/chevrolet-orlando-redline-g1.jpg","/cars/chevrolet-orlando-redline-g2.jpg","/cars/chevrolet-orlando-redline-g3.jpg","/cars/chevrolet-orlando-redline-g4.jpg","/cars/chevrolet-orlando-redline-g5.jpg"],
    description: D(
      "Семиместный минивэн в топовой версии Redline. Подойдёт для большой семьи или компании на загородный выезд.",
      "Seven-seat minivan in top Redline trim. Good for a large family or a group on a weekend trip.",
      "7 o'rinli miniven, Redline komplektatsiyasi. Katta oila yoki kompaniya uchun qulay."
    ),
  },
  {
    slug: "byd-chazor-dm1", brand: "BYD", model: "Chazor DM-i", year: 2024, body: "sedan",
    category: "comfort", seats: 5, bags: 3, transmission: "auto", fuel: "hybrid",
    engine: "1.5 L + Electric", drive: "fwd", pricePerDay: 80, deposit: 8000,
    images: ["/cars/byd-chazor-dm1-hero.png","/cars/byd-chazor-dm1-g1.jpg","/cars/byd-chazor-dm1-g2.jpg","/cars/byd-chazor-dm1-g3.jpg","/cars/byd-chazor-dm1-g4.jpg","/cars/byd-chazor-dm1-g5.jpg"],
    description: D(
      "Гибридный седан DM-i с ультранизким расходом топлива. Тихий ход, большой сенсорный дисплей, умные ассистенты.",
      "DM-i hybrid sedan with extra-low fuel use. Silent ride, large touchscreen, smart assists.",
      "DM-i gibrid sedan, ultra past yoqilg'i sarfi. Jim yurish, katta ekran, aqlli yordamchilar."
    ),
  },
  {
    slug: "chevrolet-equinox", brand: "Chevrolet", model: "Equinox", year: 2024, body: "suv",
    category: "suv", seats: 5, bags: 4, transmission: "auto", fuel: "petrol",
    engine: "1.5 L Turbo", drive: "awd", pricePerDay: 95, deposit: 8000,
    images: ["/cars/chevrolet-equinox-hero.png","/cars/chevrolet-equinox-g1.jpg","/cars/chevrolet-equinox-g2.jpg","/cars/chevrolet-equinox-g3.jpg","/cars/chevrolet-equinox-g4.jpg","/cars/chevrolet-equinox-g5.jpg"],
    description: D(
      "Среднеразмерный SUV с полным приводом. Уверенно держит трассу, просторный багажник, богатая комплектация.",
      "Mid-size AWD SUV. Confident on the highway, generous boot, rich trim.",
      "O'rta o'lchamli AWD SUV. Magistralda ishonchli, hajmli yuk bo'limi, boy komplektatsiya."
    ),
  },
  {
    slug: "kia-k5-g515", brand: "Kia", model: "K5 G515", year: 2024, body: "sedan",
    category: "comfort", seats: 4, bags: 3, transmission: "auto", fuel: "petrol",
    engine: "2.5 L", drive: "fwd", pricePerDay: 95, deposit: 8000,
    images: ["/cars/kia-k5-g515-hero.png","/cars/kia-k5-g515-g1.jpg","/cars/kia-k5-g515-g2.jpg","/cars/kia-k5-g515-g3.jpg","/cars/kia-k5-g515-g4.jpg"],
    description: D(
      "Бизнес-седан с динамичным дизайном и мощным 2.5-литровым мотором. Комфорт премиум-класса за разумные деньги.",
      "Business sedan with dynamic styling and a punchy 2.5 L engine. Premium comfort at a fair price.",
      "Kuchli 2.5 L motorli biznes-sedan. Oqilona narxda premium qulaylik."
    ),
  },
  {
    slug: "chevrolet-malibu-2", brand: "Chevrolet", model: "Malibu 2", year: 2024, body: "sedan",
    category: "comfort", seats: 5, bags: 3, transmission: "auto", fuel: "petrol",
    engine: "1.5 L Turbo", drive: "fwd", pricePerDay: 95, deposit: 8000,
    images: ["/cars/chevrolet-malibu-2-hero.png","/cars/chevrolet-malibu-2-g1.jpg","/cars/chevrolet-malibu-2-g2.jpg","/cars/chevrolet-malibu-2-g3.jpg","/cars/chevrolet-malibu-2-g4.jpg","/cars/chevrolet-malibu-2-g5.jpg","/cars/chevrolet-malibu-2-g6.jpg"],
    description: D(
      "Полноразмерный американский седан. Мягкая подвеска, большой салон, идеален для дальних поездок по Узбекистану.",
      "Full-size American sedan. Soft suspension, large cabin — perfect for long Uzbekistan trips.",
      "Katta amerikacha sedan. Yumshoq osma, keng salon — uzoq safarlar uchun ideal."
    ),
  },
  {
    slug: "chevrolet-trailblazer-ltz", brand: "Chevrolet", model: "Trailblazer LTZ", year: 2023, body: "suv",
    category: "suv", seats: 7, bags: 4, transmission: "auto", fuel: "petrol",
    engine: "2.5 L", drive: "awd", pricePerDay: 95, deposit: 8000,
    images: ["/cars/chevrolet-trailblazer-ltz-hero.png","/cars/chevrolet-trailblazer-ltz-g1.jpg","/cars/chevrolet-trailblazer-ltz-g2.jpg","/cars/chevrolet-trailblazer-ltz-g3.jpg","/cars/chevrolet-trailblazer-ltz-g4.jpg","/cars/chevrolet-trailblazer-ltz-g5.jpg","/cars/chevrolet-trailblazer-ltz-g6.jpg","/cars/chevrolet-trailblazer-ltz-g7.jpg"],
    description: D(
      "Семиместный кроссовер в комплектации LTZ. Полный привод, кожаный салон, вместительный багажник для туристического багажа.",
      "Seven-seat crossover in LTZ trim. AWD, leather cabin, roomy trunk for tourist luggage.",
      "7 o'rinli krossover, LTZ. To'rt g'ildirakli uzatma, charm salon, keng yuk bo'limi."
    ),
  },
  {
    slug: "kia-carnival", brand: "Kia", model: "Carnival", year: 2022, body: "minivan",
    category: "minivan", seats: 7, bags: 4, transmission: "auto", fuel: "petrol",
    engine: "3.5 L", drive: "fwd", pricePerDay: 87, deposit: 8000,
    images: ["/cars/kia-carnival-hero.png","/cars/kia-carnival-g1.jpg","/cars/kia-carnival-g2.jpg","/cars/kia-carnival-g3.jpg","/cars/kia-carnival-g4.jpg","/cars/kia-carnival-g5.jpg","/cars/kia-carnival-g6.jpg"],
    description: D(
      "Представительский минивэн. Семь отдельных кресел, тихий салон, раздвижные двери. Отличный вариант для трансферов и групп туристов.",
      "Executive minivan. Seven separate seats, quiet cabin, sliding doors — great for transfers and tour groups.",
      "Prezident-minivanlar. 7 alohida o'rindiq, jim salon, sirpanma eshiklar."
    ),
  },
  {
    slug: "byd-song-plus", brand: "BYD", model: "Song Plus", year: 2024, body: "suv",
    category: "suv", seats: 5, bags: 3, transmission: "auto", fuel: "hybrid",
    engine: "1.5 L + Electric", drive: "fwd", pricePerDay: 95, deposit: 8000,
    images: ["/cars/byd-song-plus-hero.png","/cars/byd-song-plus-g1.jpg","/cars/byd-song-plus-g2.jpg","/cars/byd-song-plus-g3.jpg","/cars/byd-song-plus-g4.jpg","/cars/byd-song-plus-g5.jpg","/cars/byd-song-plus-g6.jpg"],
    description: D(
      "Гибридный среднеразмерный SUV. Большой планшет в салоне, панорамная крыша, ультра-экономичный ход.",
      "Mid-size hybrid SUV. Large in-cabin tablet, panoramic roof, ultra-efficient drivetrain.",
      "O'rta o'lchamli gibrid SUV. Katta planshet, panoramik tom, tejamkor uzatma."
    ),
  },
  {
    slug: "hyundai-tucson", brand: "Hyundai", model: "Tucson", year: 2023, body: "suv",
    category: "suv", seats: 5, bags: 4, transmission: "auto", fuel: "petrol",
    engine: "2.0 L", drive: "awd", pricePerDay: 95, deposit: 8000,
    images: ["/cars/hyundai-tucson-hero.png","/cars/hyundai-tucson-g1.jpg","/cars/hyundai-tucson-g2.jpg","/cars/hyundai-tucson-g3.jpg"],
    description: D(
      "Современный SUV с отточенной геометрией. Приятное вождение, расширенный список ассистентов, комфортная подвеска.",
      "Modern SUV with refined styling. Pleasant drive, extensive ADAS and a comfortable ride.",
      "Zamonaviy SUV. Qulay yurish, keng ADAS tizimlari, yumshoq osma."
    ),
  },
  {
    slug: "isuzu-d-max-irbis", brand: "Isuzu", model: "D-Max Irbis AT", year: 2023, body: "pickup",
    category: "suv", seats: 4, bags: 4, transmission: "auto", fuel: "diesel",
    engine: "1.9 TD", drive: "awd", pricePerDay: 120, deposit: 10000,
    images: ["/cars/isuzu-d-max-irbis-hero.png","/cars/isuzu-d-max-irbis-g1.jpg","/cars/isuzu-d-max-irbis-g2.jpg","/cars/isuzu-d-max-irbis-g3.jpg","/cars/isuzu-d-max-irbis-g4.jpg","/cars/isuzu-d-max-irbis-g5.jpg","/cars/isuzu-d-max-irbis-g6.jpg"],
    description: D(
      "Пикап для экспедиций и работы. Полный привод, рамная конструкция, грузовой отсек. Не боится бездорожья.",
      "Expedition-ready pickup. 4WD, body-on-frame, open bed — unfazed by off-road.",
      "Ekspeditsiya pikapi. To'rt g'ildirakli uzatma, ramaviy konstruksiya, yuk bo'limi."
    ),
  },
  {
    slug: "toyota-land-cruiser-prado", brand: "Toyota", model: "Land Cruiser Prado 150 4.0L", year: 2019, body: "suv",
    category: "premium", seats: 7, bags: 4, transmission: "auto", fuel: "petrol",
    engine: "4.0 L V6", drive: "awd", pricePerDay: 127, deposit: 12000,
    images: ["/cars/toyota-land-cruiser-prado-hero.png","/cars/toyota-land-cruiser-prado-g1.jpg","/cars/toyota-land-cruiser-prado-g2.jpg","/cars/toyota-land-cruiser-prado-g3.jpg","/cars/toyota-land-cruiser-prado-g4.jpg","/cars/toyota-land-cruiser-prado-g5.jpg","/cars/toyota-land-cruiser-prado-g6.jpg"],
    description: D(
      "Эталонный внедорожник бизнес-класса. Атмосферный V6, семь мест, кожаный салон. Горы Чимгана и степи — по плечу.",
      "Benchmark business-class SUV. Naturally aspirated V6, seven seats, leather cabin — ready for Chimgan peaks and steppe alike.",
      "Biznes-klass SUV. V6 motori, 7 o'rindiq, charm salon. Chimg'on va dasht yo'llarida."
    ),
  },
  {
    slug: "kia-carnival-g03i", brand: "Kia", model: "Carnival G03I", year: 2023, body: "minivan",
    category: "minivan", seats: 8, bags: 4, transmission: "auto", fuel: "petrol",
    engine: "3.5 L V6", drive: "fwd", pricePerDay: 127, deposit: 10000,
    images: ["/cars/kia-carnival-g03i-hero.png","/cars/kia-carnival-g03i-g1.jpg","/cars/kia-carnival-g03i-g2.jpg","/cars/kia-carnival-g03i-g3.jpg","/cars/kia-carnival-g03i-g4.jpg","/cars/kia-carnival-g03i-g5.jpg","/cars/kia-carnival-g03i-g6.jpg","/cars/kia-carnival-g03i-g7.jpg"],
    description: D(
      "Флагманский минивэн нового поколения. Восемь мест, премиум-отделка, большие экраны. Под группы и VIP-туры.",
      "Flagship new-gen minivan. Eight seats, premium trim, large displays — built for groups and VIP tours.",
      "Flagman minivan. 8 o'rindiq, premium bezak, katta ekranlar. Guruhlar va VIP-turlar uchun."
    ),
  },
  {
    slug: "toyota-land-cruiser-200", brand: "Toyota", model: "Land Cruiser 200", year: 2020, body: "suv",
    category: "premium", seats: 7, bags: 4, transmission: "auto", fuel: "petrol",
    engine: "4.6 L V8", drive: "awd", pricePerDay: 160, deposit: 15000,
    images: ["/cars/toyota-land-cruiser-200-hero.png","/cars/toyota-land-cruiser-200-g1.jpg","/cars/toyota-land-cruiser-200-g2.jpg","/cars/toyota-land-cruiser-200-g3.jpg","/cars/toyota-land-cruiser-200-g4.jpg","/cars/toyota-land-cruiser-200-g5.jpg","/cars/toyota-land-cruiser-200-g6.jpg"],
    description: D(
      "Икона бескомпромиссного внедорожника. V8, семь мест, проверенная надёжность. Для тех, кто хочет проехать везде и с комфортом.",
      "The uncompromising full-size SUV. V8, seven seats, proven reliability — go anywhere, in comfort.",
      "Murosasiz SUV. V8, 7 o'rindiq, ishonchlilik. Hamma joyga qulaylik bilan."
    ),
  },
  {
    slug: "lixiang-l9-ultra", brand: "Lixiang", model: "L9 Ultra", year: 2024, body: "suv",
    category: "premium", seats: 7, bags: 4, transmission: "auto", fuel: "hybrid",
    engine: "1.5 L Turbo + Electric", drive: "awd", pricePerDay: 240, deposit: 20000,
    images: ["/cars/lixiang-l9-ultra-hero.png","/cars/lixiang-l9-ultra-g1.jpg","/cars/lixiang-l9-ultra-g2.jpg","/cars/lixiang-l9-ultra-g3.jpg","/cars/lixiang-l9-ultra-g4.jpg","/cars/lixiang-l9-ultra-g5.jpg","/cars/lixiang-l9-ultra-g6.jpg","/cars/lixiang-l9-ultra-g7.jpg"],
    description: D(
      "Премиальный гибридный SUV топ-комплектации Ultra. Салон уровня представительского авто, огромный запас хода, тишина в движении.",
      "Premium hybrid SUV in top Ultra trim. Executive-grade cabin, huge range, whisper-quiet ride.",
      "Premium gibrid SUV, top Ultra. Prezident-darajadagi salon, katta zaxira, jim yurish."
    ),
  },
  {
    slug: "toyota-land-cruiser-300", brand: "Toyota", model: "Land Cruiser 300 SFX", year: 2023, body: "suv",
    category: "premium", seats: 7, bags: 4, transmission: "auto", fuel: "petrol",
    engine: "3.5 L V6 Twin-Turbo", drive: "awd", pricePerDay: 240, deposit: 20000,
    images: ["/cars/toyota-land-cruiser-300-hero.png","/cars/toyota-land-cruiser-300-g1.jpg","/cars/toyota-land-cruiser-300-g2.jpg","/cars/toyota-land-cruiser-300-g3.jpg","/cars/toyota-land-cruiser-300-g4.jpg","/cars/toyota-land-cruiser-300-g5.jpg"],
    description: D(
      "Новое поколение легендарного внедорожника. Twin-Turbo V6, пневмоподвеска, богатая электроника. Уровень комфорта премиум-класса.",
      "The all-new generation of the legend. Twin-turbo V6, air suspension, advanced electronics — full premium comfort.",
      "Afsonaning yangi avlodi. Twin-Turbo V6, havo osmasi, boy elektronika."
    ),
  },
  {
    slug: "mercedes-benz-g400d", brand: "Mercedes-Benz", model: "G400d", year: 2023, body: "suv",
    category: "premium", seats: 5, bags: 4, transmission: "auto", fuel: "diesel",
    engine: "3.0 L TD I6", drive: "awd", pricePerDay: 635, deposit: 50000,
    images: ["/cars/mercedes-benz-g400d-hero.png","/cars/mercedes-benz-g400d-g1.jpg","/cars/mercedes-benz-g400d-g2.jpg","/cars/mercedes-benz-g400d-g3.jpg","/cars/mercedes-benz-g400d-g4.jpg","/cars/mercedes-benz-g400d-g5.jpg","/cars/mercedes-benz-g400d-g6.jpg","/cars/mercedes-benz-g400d-g7.jpg"],
    description: D(
      "Культовый G-класс в дизельной версии 400d. Три блокировки, роскошный салон, безукоризненное исполнение. Для особых случаев и VIP-поездок.",
      "The iconic G-Class in 400d diesel. Three diff locks, a lavish cabin, flawless build — for special occasions and VIP trips.",
      "Afsonaviy G-klass, 400d dizel. Uchta blokirovka, hashamatli salon, benuqson tayyorlash."
    ),
  },
];

export function getCarBySlug(slug: string): Car | undefined {
  return CATALOG.find((c) => c.slug === slug);
}

export function primaryImage(car: Car): string {
  return car.images[0];
}

export function carDescription(car: Car, locale: string): string {
  const key = (locale === "en" || locale === "uz") ? locale : "ru";
  return car.description[key as Locale];
}
