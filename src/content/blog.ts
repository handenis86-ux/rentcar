export type BlogLocale = "ru" | "en";

export type BlogSection =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string };

export interface BlogPost {
  slug: string;
  publishedAt: string;
  readMinutes: number;
  category: { ru: string; en: string };
  cover: string;
  title: Record<BlogLocale, string>;
  excerpt: Record<BlogLocale, string>;
  body: Record<BlogLocale, BlogSection[]>;
  relatedCarSlugs?: string[];
}

export const POSTS: BlogPost[] = [
  {
    slug: "documents-for-foreigners",
    publishedAt: "2026-03-04",
    readMinutes: 7,
    category: { ru: "Гайд", en: "Guide" },
    cover: "/design/generated-1776872101080.png",
    title: {
      ru: "Какие документы нужны иностранцу для аренды авто в Узбекистане",
      en: "Documents Foreigners Need to Rent a Car in Uzbekistan",
    },
    excerpt: {
      ru: "Загранпаспорт, международные права, депозит и возраст 21+ — разбираем, что реально требуется иностранному туристу, чтобы забрать машину в Ташкенте.",
      en: "Passport, IDP, deposit and age 21+ — a clear breakdown of what foreign visitors actually need to pick up a rental car in Tashkent.",
    },
    body: {
      ru: [
        {
          type: "p",
          text: "Аренда авто в Узбекистане для иностранца — процедура несложная, если заранее собрать пакет документов. В отличие от ряда соседних стран, здесь не требуют местной регистрации именно для оформления аренды, а сам прокат построен под международного клиента: договор на двух языках, оплата картой, выдача в Ташкенте. Ниже — подробный список того, что у вас должно быть с собой в момент получения ключей.",
        },
        { type: "h2", text: "Базовый пакет документов" },
        {
          type: "p",
          text: "Прокат в Узбекистане работает по понятной логике: водителя нужно идентифицировать, проверить его право управлять автомобилем и зафиксировать платёжеспособность. Поэтому набор документов сводится к трём составляющим — личность, права, депозит.",
        },
        {
          type: "ul",
          items: [
            "Действующий загранпаспорт со сроком действия не менее срока аренды",
            "Национальные водительские права страны проживания",
            "Международное водительское удостоверение (IDP) — обязательно, если права не на латинице",
            "Возраст не младше 21 года, стаж вождения от 1 года",
            "Банковская карта на имя водителя для депозита",
          ],
        },
        { type: "h2", text: "Зачем нужно международное удостоверение" },
        {
          type: "p",
          text: "Узбекистан присоединился к Венской конвенции о дорожном движении, поэтому при остановке инспектор GAI имеет право требовать права в формате, который он способен прочитать. Если ваше национальное удостоверение оформлено кириллицей или латиницей — формально его достаточно. Если права на арабской вязи, иероглифах, тайском или иврите — без IDP не обойдётся ни одна прокатная компания. Оформляется он у себя дома за один визит и стоит недорого, но без него вы рискуете застрять на первом же посту.",
        },
        { type: "h2", text: "Депозит и оплата" },
        {
          type: "p",
          text: "Депозит — это возвратная блокировка на карте, которая снимается в день возврата машины при отсутствии замечаний. Сумма зависит от класса: для эконома обычно 200-300 USD, для премиальных внедорожников — 800-1500 USD. Оплата самой аренды возможна как наличными, так и картой Visa или Mastercard. Если вы планируете брать большой внедорожник или семивэн на длительный срок, лучше заранее предупредить банк, что будут операции в Узбекистане — иначе антифрод может заблокировать платёж.",
        },
        { type: "h2", text: "Возраст и стаж" },
        {
          type: "p",
          text: "Минимальный возраст для аренды легкового автомобиля — 21 год при стаже от одного года. Для премиальных моделей и крупных внедорожников возрастной порог поднимается до 25 лет. Это связано не столько со страховкой, сколько с практикой: на горных дорогах в сторону Чимгана или на трассе на Самарканд опыт реально важнее формальной строки в правах.",
        },
        { type: "h2", text: "Что выдают вместе с машиной" },
        {
          type: "p",
          text: "При получении автомобиля вам передадут пакет, который должен лежать в бардачке всё время поездки. Без этих бумаг разговор с инспектором на посту окажется значительно длиннее, чем хотелось бы.",
        },
        {
          type: "ol",
          items: [
            "Технический паспорт автомобиля",
            "Полис обязательного страхования (ОСАГО Узбекистана)",
            "Договор аренды с подписью владельца — подтверждает ваше право управления",
            "Доверенность на выезд за пределы Ташкентской области, если планируете дальние поездки",
            "Контактный телефон поддержки 24/7",
          ],
        },
        { type: "h2", text: "Получение в Ташкенте: как это устроено" },
        {
          type: "p",
          text: "Все автомобили выдаются в Ташкенте — это единственный город, где у нас есть собственный паркинг и техническая база. Для туриста это удобно: международный аэропорт, основные отели и железнодорожный вокзал находятся в пределах 20 минут езды. Можно прилететь утром, забрать машину в обед и к ужину быть в Самарканде. Возврат тоже происходит в Ташкенте — мы не работаем по схеме one-way drop в другие города, потому что в Узбекистане это пока экономически невыгодно для клиента: межгородская подача всегда дороже самой аренды.",
        },
        { type: "h2", text: "Подведём итог" },
        {
          type: "p",
          text: "Чтобы спокойно выехать из Ташкента в путешествие по Узбекистану, иностранному гостю нужно ровно три вещи: загранпаспорт, национальные права плюс IDP, и карта для депозита. Всё остальное — формальности, которые занимают 15-20 минут в офисе. Rentz.uz работает именно с международными клиентами, договор подписывается на русском и английском, поддержка отвечает круглосуточно. Выбрать автомобиль и забронировать его под даты вашего прилёта удобнее всего на странице /cars — там же видно актуальные цены и доступность по классам.",
        },
      ],
      en: [
        {
          type: "p",
          text: "Renting a car in Uzbekistan as a foreigner is a straightforward process if you arrive with the right paperwork. Unlike some neighbouring countries, Uzbekistan does not demand a local registration slip just to sign a rental contract, and the industry has matured around the international traveller. Contracts are bilingual, card payments are normal, and pickup is centralised in Tashkent. Below is the practical list of what you need on the day you collect the keys.",
        },
        { type: "h2", text: "The core document set" },
        {
          type: "p",
          text: "Rental companies in Uzbekistan apply the same logic as anywhere else: identify the driver, verify their right to drive, and secure the deposit. That means three things — your identity, your licence, and a card.",
        },
        {
          type: "ul",
          items: [
            "Valid passport, with expiry date later than your rental return date",
            "National driving licence from your country of residence",
            "International Driving Permit (IDP) — mandatory if your licence is not in Latin script",
            "Minimum age of 21 with at least one year of driving experience",
            "Credit or debit card in the driver's name for the deposit",
          ],
        },
        { type: "h2", text: "Why an IDP matters" },
        {
          type: "p",
          text: "Uzbekistan is a signatory of the Vienna Convention on Road Traffic, so the GAI traffic police are entitled to ask for a licence they can actually read. If your national permit already uses the Latin alphabet, it is technically enough on its own. If it is printed in Arabic, Chinese, Thai, Hebrew or any non-Latin script, no rental agency in Uzbekistan will hand over the keys without an accompanying IDP. The permit costs very little and is issued in a single visit at home, but without it you risk a long conversation at the very first checkpoint.",
        },
        { type: "h2", text: "Deposit and payment" },
        {
          type: "p",
          text: "The deposit is a refundable hold on your card, released on the return day if the car comes back in order. The amount scales with class: 200-300 USD for an economy hatchback, up to 800-1500 USD for premium SUVs. Rental fees themselves can be paid either in cash or by Visa or Mastercard. If you plan to take a large SUV or a minivan for a longer trip, warn your bank in advance that operations from Uzbekistan are expected, otherwise fraud monitoring may decline the transaction.",
        },
        { type: "h2", text: "Age and experience" },
        {
          type: "p",
          text: "The minimum rental age is 21 with at least one year of driving history. For premium sedans and large SUVs the threshold rises to 25. This is not so much an insurance constraint as a practical one: on the mountain road toward Chimgan or the long highway run to Samarkand, real experience behind the wheel matters more than the date printed on a licence.",
        },
        { type: "h2", text: "What stays in the glovebox" },
        {
          type: "p",
          text: "When you collect the vehicle you also receive a small folder that must travel with the car at all times. Without these papers, any conversation at a checkpoint becomes significantly longer than it needs to be.",
        },
        {
          type: "ol",
          items: [
            "Vehicle registration document",
            "Compulsory insurance policy (Uzbekistan OSAGO)",
            "Signed rental contract — proves your right to drive the car",
            "Power of attorney for travel outside Tashkent region, if you plan a long trip",
            "Twenty-four hour support phone number",
          ],
        },
        { type: "h2", text: "Pickup in Tashkent: how it works" },
        {
          type: "p",
          text: "All cars are handed over in Tashkent — it is the only city where we run our own parking and service base. For a visitor this is convenient: the international airport, most hotels and the main railway station are all within twenty minutes of the office. You can land in the morning, pick up the car at lunchtime and be in Samarkand by dinner. Return also happens in Tashkent. We do not offer one-way drops to other cities because, in the current Uzbek market, intercity delivery quickly costs more than the rental itself.",
        },
        { type: "h2", text: "Summary" },
        {
          type: "p",
          text: "To leave Tashkent for an Uzbekistan road trip, a foreign visitor needs three things: a passport, a national licence with an IDP, and a card for the deposit. Everything else is paperwork that takes fifteen to twenty minutes in our office. Rentz.uz is built around international clients, the contract is bilingual in Russian and English, and support runs around the clock. The easiest way to lock in a vehicle for your arrival date is to browse and reserve at /cars, where current prices and availability are shown by class.",
        },
      ],
    },
  },
  {
    slug: "tashkent-samarkand-bukhara-route",
    publishedAt: "2026-03-22",
    readMinutes: 9,
    category: { ru: "Маршруты", en: "Routes" },
    cover: "/design/generated-1776872171930.png",
    title: {
      ru: "Ташкент - Самарканд - Бухара: маршрут на машине",
      en: "Tashkent to Samarkand to Bukhara: A Road Trip Guide",
    },
    excerpt: {
      ru: "Классический Шёлковый путь за 4-6 дней: расстояния, дороги, что смотреть и какую машину взять, чтобы доехать без боли в спине.",
      en: "The classic Silk Road in 4-6 days: distances, road conditions, what to see and which car to take so your back still loves you at the end.",
    },
    body: {
      ru: [
        {
          type: "p",
          text: "Маршрут Ташкент - Самарканд - Бухара остаётся самым понятным способом увидеть Узбекистан за короткий отпуск. Это три города, три эпохи и около 580 километров асфальта в одну сторону. Поезд Afrosiyob тоже хороший вариант, но машина даёт то, чего не даст вокзальный график: остановиться у чайханы в кишлаке, заехать в Шахрисабз по пути или встретить закат на холмах между регионами. Ниже — реалистичный план поездки на 4-6 дней.",
        },
        { type: "h2", text: "День 1. Ташкент - Самарканд: 308 км по М39" },
        {
          type: "p",
          text: "Главная магистраль М39 связывает столицу с Самаркандом и идёт через Сырдарьинскую и Джизакскую области. Дорога двухполосная с участками четырёхполосного скоростного шоссе, асфальт по большей части ровный. Рассчитывайте 4 часа чистого времени плюс 30-40 минут на остановки и заправку. Лучше выехать рано утром: до Джизакского перевала жара ощущается уже к 11 утра летом, а после перевала открывается долина Зарафшана.",
        },
        {
          type: "ul",
          items: [
            "Заправки Uzbekneftegaz и UNG регулярно встречаются каждые 30-50 км",
            "Бензин АИ-92 и АИ-95 есть стабильно, газ метан и пропан — на брендированных АЗС",
            "Платных участков на трассе нет, но есть посты GAI: документы держите под рукой",
            "Связь Ucell и Beeline работает почти везде, кроме коротких отрезков в горах",
          ],
        },
        { type: "h2", text: "День 2-3. Самарканд" },
        {
          type: "p",
          text: "В Самарканде стоит остановиться минимум на две ночи. Регистан с тремя медресе — главная площадь, и да, она заслуживает того ажиотажа, что вокруг неё. Помимо площади, обязательны мавзолей Гур-Эмир, где похоронен Тимур, ансамбль Шахи-Зинда с майоликой, обсерватория Улугбека и базар Сиаб с лучшими в городе лепёшками. На машине удобно тем, что отель можно взять не в центре, а на тихой улице, и быстро доезжать до объектов без долгого торга с такси.",
        },
        { type: "h2", text: "День 3-4. Самарканд - Бухара: 270 км" },
        {
          type: "p",
          text: "Между Самаркандом и Бухарой ровно 270 километров по той же М39. Дорога идёт через Навоийскую область, пейзаж — сухая степь с редкими хлопковыми полями. Времени уходит около 3,5 часов. По пути имеет смысл сделать остановку в Гиждуване — там работает керамическая школа Нарзуллаевых, керамика семьи признана ЮНЕСКО. Заехать в мастерскую можно прямо с трассы, занимает 40 минут.",
        },
        { type: "h2", text: "День 4-5. Бухара" },
        {
          type: "p",
          text: "Бухара ощущается тише и компактнее Самарканда. Старый город пешеходный, машину паркуете у отеля и забываете о ней на двое суток. Главное — комплекс Пои-Калян с минаретом, который не разрушил даже Чингисхан, цитадель Арк, мавзолей Саманидов IX века и крытые торговые купола. Вечером площадь Ляби-Хауз заполняется местными семьями и туристами, и это, пожалуй, лучшее место в городе, чтобы поужинать пловом.",
        },
        { type: "h2", text: "День 5-6. Возвращение в Ташкент" },
        {
          type: "p",
          text: "Обратная дорога Бухара - Ташкент — это 580 км и около 7-8 часов с обедом. Многие делят её на два дня с ночёвкой снова в Самарканде, но на свежей машине с кондиционером можно проехать и за один день, выехав в 6 утра. К вечеру вы в Ташкенте и сдаёте автомобиль на следующий день.",
        },
        { type: "h2", text: "Какую машину взять под этот маршрут" },
        {
          type: "p",
          text: "Дороги между тремя городами — асфальт, поэтому полноприводный внедорожник тут не обязателен. Выбор скорее про комфорт и багаж.",
        },
        {
          type: "ul",
          items: [
            "Chevrolet Malibu 2 — седан бизнес-класса, лучший компромисс цены и комфорта на трассе для двоих с чемоданами",
            "Hyundai Tucson — кроссовер, если хочется чуть выше посадку и место для четверых с багажом",
            "Toyota Land Cruiser Prado — выбор группы или семьи, плюс запас по проходимости, если вы решите свернуть с маршрута в горы или пустыню",
          ],
        },
        { type: "h2", text: "Бронирование и пикап" },
        {
          type: "p",
          text: "Все автомобили Rentz.uz выдаются в Ташкенте, поэтому маршрут Ташкент - Самарканд - Бухара - Ташкент удобен ещё и логистически: вы возвращаете машину туда же, откуда забрали, и улетаете из того же аэропорта. Подобрать модель под группу и даты можно на /cars — у каждой машины указаны цена за сутки, депозит и реальная фотогалерея.",
        },
      ],
      en: [
        {
          type: "p",
          text: "The Tashkent to Samarkand to Bukhara loop is still the clearest way to experience Uzbekistan in a short holiday. Three cities, three eras and roughly 580 kilometres of asphalt one way. The Afrosiyob high-speed train is also a fine option, but a car buys you something the station timetable cannot: a teahouse stop in a village, a detour through Shakhrisabz, or a sunset over the hills between regions. Here is a realistic 4-6 day plan.",
        },
        { type: "h2", text: "Day 1. Tashkent to Samarkand: 308 km on the M39" },
        {
          type: "p",
          text: "The M39 highway links the capital to Samarkand through the Syrdarya and Jizzakh regions. It is a two-lane road with stretches of four-lane expressway, mostly in good condition. Plan four hours of pure driving plus thirty to forty minutes for fuel and breaks. An early morning start is wise — in summer the Jizzakh pass starts to feel hot by 11 AM, and the Zarafshan valley opens up just after it.",
        },
        {
          type: "ul",
          items: [
            "Uzbekneftegaz and UNG petrol stations appear every 30-50 km",
            "AI-92 and AI-95 are reliably available; methane and propane only at branded stations",
            "There are no toll sections, but GAI checkpoints are routine — keep documents handy",
            "Ucell and Beeline coverage is solid, with short gaps in mountain stretches",
          ],
        },
        { type: "h2", text: "Days 2-3. Samarkand" },
        {
          type: "p",
          text: "Plan at least two nights in Samarkand. The Registan square with its three madrasas is the headline act, and yes, it earns the hype. Beyond Registan, you should add the Gur-Emir mausoleum where Timur is buried, the Shah-i-Zinda necropolis with its remarkable tilework, Ulugh Beg's observatory, and the Siab bazaar where the city's best flatbreads are baked. Having a car lets you stay outside the centre on a quieter street and reach each site without arguing fares with a taxi driver.",
        },
        { type: "h2", text: "Day 3-4. Samarkand to Bukhara: 270 km" },
        {
          type: "p",
          text: "Samarkand and Bukhara are exactly 270 kilometres apart on the same M39 highway. The road runs through the Navoi region across dry steppe with occasional cotton fields. Allow about 3.5 hours of driving. A worthwhile stop along the way is Gijduvan, home to the Narzullaev family ceramic school whose work is recognised by UNESCO. The workshop sits right off the highway and a visit takes about forty minutes.",
        },
        { type: "h2", text: "Days 4-5. Bukhara" },
        {
          type: "p",
          text: "Bukhara feels quieter and more compact than Samarkand. The old city is pedestrian, so you park at the hotel and forget about the car for two days. The must-see core is the Po-i-Kalyan complex with its minaret that even Genghis Khan reportedly chose to spare, the Ark fortress, the ninth-century Samanid mausoleum, and the covered trading domes. In the evening Lyabi-Hauz square fills with local families and visitors and is probably the best spot in town for plov.",
        },
        { type: "h2", text: "Days 5-6. Back to Tashkent" },
        {
          type: "p",
          text: "The return Bukhara to Tashkent run is 580 km and about 7-8 hours including lunch. Many travellers split it across two days with another night in Samarkand, but with a comfortable air-conditioned car a single day is realistic if you leave by 6 AM. You arrive in Tashkent in the evening and return the car the next morning.",
        },
        { type: "h2", text: "Choosing the right car for this route" },
        {
          type: "p",
          text: "The roads between the three cities are paved, so a four-wheel-drive SUV is not required. The decision is mostly about comfort and luggage capacity.",
        },
        {
          type: "ul",
          items: [
            "Chevrolet Malibu 2 — a business-class sedan and the best comfort-for-money option for two with suitcases",
            "Hyundai Tucson — a crossover if you want a higher ride height and room for four with bags",
            "Toyota Land Cruiser Prado — the call for a family or group, plus reserve capability if you decide to detour into the mountains or desert",
          ],
        },
        { type: "h2", text: "Booking and pickup" },
        {
          type: "p",
          text: "All Rentz.uz cars are handed over in Tashkent, which makes the Tashkent-Samarkand-Bukhara-Tashkent loop logistically tidy too: you return the car where you collected it and fly out of the same airport. To match a model to your group and dates, browse /cars — every vehicle lists the daily rate, deposit and a real photo gallery.",
        },
      ],
    },
    relatedCarSlugs: ["chevrolet-malibu-2", "hyundai-tucson", "toyota-land-cruiser-prado"],
  },
  {
    slug: "tashkent-rental-prices-parking-rules",
    publishedAt: "2026-04-08",
    readMinutes: 8,
    category: { ru: "Гайд", en: "Guide" },
    cover: "/design/generated-1776872186016.png",
    title: {
      ru: "Аренда авто в Ташкенте: цены, парковки и правила",
      en: "Renting a Car in Tashkent: Prices, Parking and Road Rules",
    },
    excerpt: {
      ru: "Сколько реально стоит машина в день, где парковаться в центре, какие штрафы и что обязательно держать в бардачке — разбираем без украшений.",
      en: "What a car really costs per day, where to park in the centre, which fines hurt the most, and what to always keep in the glovebox — no fluff.",
    },
    body: {
      ru: [
        {
          type: "p",
          text: "Ташкент — самый автомобильный город Центральной Азии. Метро удобное, такси дешёвые, но как только вы хотите выехать за пределы кольцевой М39 или поужинать в горах в одно из выходных, машина становится самым простым решением. Ниже — что нужно знать о ценах, правилах и парковке, прежде чем садиться за руль.",
        },
        { type: "h2", text: "Сколько стоит аренда" },
        {
          type: "p",
          text: "Цены в Ташкенте довольно прозрачные и слабо отличаются между крупными игроками. Разброс задаёт класс автомобиля и срок аренды — на длинных периодах от 7 дней почти всегда есть скидка 10-20%.",
        },
        {
          type: "ul",
          items: [
            "Эконом (Chevrolet Spark, Cobalt) — от 25 USD в сутки",
            "Комфорт (Lacetti, Onix, Tracker) — 35-55 USD",
            "Бизнес-седаны и кроссоверы (Malibu, K5, Tucson) — 60-90 USD",
            "Большие внедорожники (Prado 120, Trailblazer) — 100-150 USD",
            "Премиум (Land Cruiser 200/300, G-class, Lixiang L9) — 180-240 USD и выше",
          ],
        },
        {
          type: "p",
          text: "Депозит идёт отдельно и зависит от модели: 200 USD на эконом и до 1500 USD на топовые внедорожники. Это блокировка, а не платёж — деньги размораживаются после возврата машины без замечаний.",
        },
        { type: "h2", text: "Правила движения в двух абзацах" },
        {
          type: "p",
          text: "Движение в Узбекистане правостороннее, рулю место слева. Ремни обязательны на всех сиденьях. Алкоголь за рулём — ноль промилле, проверки бывают серьёзные, особенно в выходные ночью. Поворот направо на красный запрещён, если нет отдельной зелёной стрелки. Разворот через двойную сплошную — минус права на полгода.",
        },
        {
          type: "p",
          text: "Скоростной режим простой и его легко запомнить: 70 км/ч в городе по умолчанию, 100 км/ч на загородной трассе, 110 км/ч на отдельных скоростных участках вроде М39 южнее Ташкента, где так указано знаком. Камеры стоят активно, штрафы приходят на номер арендной компании и потом перевыставляются клиенту.",
        },
        { type: "h2", text: "Посты GAI и что в них происходит" },
        {
          type: "p",
          text: "На выезде из города и на областных границах работают стационарные посты дорожной полиции. Останавливают не всех — выборочно. Если остановили, спокойно подайте права, техпаспорт и страховку. Договор аренды у вас уже на руках — он подтверждает право управления. Никаких неформальных платежей платить не нужно: реальные штрафы выписываются по протоколу с QR-кодом и оплачиваются через приложение Click или Payme.",
        },
        { type: "h2", text: "Парковка в центре Ташкента" },
        {
          type: "p",
          text: "Центр стал платным несколько лет назад, и это, наверное, лучшее, что случилось с городом за десятилетие — машина на парковке у вас точно найдётся. Тарифы умеренные.",
        },
        {
          type: "ol",
          items: [
            "Вдоль улицы (Бабура, Шота Руставели, Афросиаб): 5000-8000 сум в час, оплата через приложение Park-Up или паркомат",
            "Подземные паркинги ТРЦ Compass, Samarkand Darvoza, Tashkent City Mall: первые 1-2 часа бесплатно при чеке, дальше 10000-15000 сум в час",
            "Отельные парковки — обычно бесплатны для гостей, но место надо запрашивать заранее",
            "На окраинах и в спальных районах парковка бесплатная, но во дворах работает зональная разметка",
          ],
        },
        { type: "h2", text: "Что обязательно держать в машине" },
        {
          type: "p",
          text: "Минимальный набор — это техпаспорт, страховой полис, договор аренды и ваши права с международным удостоверением. Кроме них в машину должны быть включены аптечка, огнетушитель и знак аварийной остановки — это требование закона, и инспектор имеет право проверить их наличие. У Rentz.uz всё это входит в комплект.",
        },
        { type: "h2", text: "Топливо" },
        {
          type: "p",
          text: "Большинство автомобилей в Узбекистане работают на АИ-92 — это стандарт, и он есть везде. АИ-95 встречается стабильно в Ташкенте и на крупных трассах, на районных АЗС реже. Дизель распространён хуже, но если вы берёте Isuzu D-Max или дизельный Prado, заранее планируйте заправки. Цена бензина — около 12000 сум за литр АИ-92, что соответствует примерно 0,95 USD.",
        },
        { type: "h2", text: "Как у нас всё устроено" },
        {
          type: "p",
          text: "Rentz.uz выдаёт автомобили в Ташкенте, и для городских и загородных поездок мы держим понятную линейку: от Spark и Cobalt для коротких пробегов по столице до Prado и Land Cruiser 300 для серьёзных маршрутов. Цены на /cars указаны в USD за сутки, без скрытых сборов; депозит и условия видно на карточке каждой модели до бронирования.",
        },
      ],
      en: [
        {
          type: "p",
          text: "Tashkent is the most car-friendly city in Central Asia. The metro is convenient and taxis are cheap, but the moment you want to leave the M39 ring road or grab dinner in the mountains, a rental car becomes the simplest answer. Here is what you need to know about prices, rules and parking before you take the wheel.",
        },
        { type: "h2", text: "What rentals actually cost" },
        {
          type: "p",
          text: "Prices in Tashkent are reasonably transparent and don't vary much between the major players. Vehicle class and rental length set the rate — discounts of 10-20% are normal once you cross seven days.",
        },
        {
          type: "ul",
          items: [
            "Economy (Chevrolet Spark, Cobalt) — from 25 USD per day",
            "Comfort (Lacetti, Onix, Tracker) — 35-55 USD",
            "Business sedans and crossovers (Malibu, K5, Tucson) — 60-90 USD",
            "Large SUVs (Prado 120, Trailblazer) — 100-150 USD",
            "Premium (Land Cruiser 200/300, G-class, Lixiang L9) — 180-240 USD and up",
          ],
        },
        {
          type: "p",
          text: "The deposit is separate and depends on the model: 200 USD on an economy car, up to 1500 USD on top SUVs. It is a hold rather than a payment, released after the car comes back clean.",
        },
        { type: "h2", text: "Road rules in two paragraphs" },
        {
          type: "p",
          text: "Uzbekistan drives on the right, with the steering wheel on the left. Seatbelts are mandatory in every seat. The drink-drive limit is zero, with serious checks on weekend nights. Right turn on red is not allowed unless a dedicated green arrow lights up. A U-turn over a double solid line costs you your licence for six months.",
        },
        {
          type: "p",
          text: "Speed limits are easy to remember: 70 km/h in town by default, 100 km/h on intercity highways, 110 km/h on certain expressway stretches like the M39 south of Tashkent where signs allow it. Speed cameras are everywhere; fines reach the rental company first and are passed to the customer.",
        },
        { type: "h2", text: "GAI checkpoints and what happens there" },
        {
          type: "p",
          text: "Permanent traffic police checkpoints sit on city exits and at regional borders. Not every car is stopped — it is selective. If you are pulled in, calmly hand over your licence, vehicle registration and insurance. Your rental contract proves your right to drive. There is no need to pay any informal fees: real fines are written with a QR-coded protocol and settled through the Click or Payme apps.",
        },
        { type: "h2", text: "Parking in central Tashkent" },
        {
          type: "p",
          text: "The centre became paid a few years ago, and it is probably the best thing that happened to the city in a decade — a parking spot is now actually findable. Rates are moderate.",
        },
        {
          type: "ol",
          items: [
            "On-street (Babur, Shota Rustaveli, Afrosiab): 5,000-8,000 sum per hour, paid via the Park-Up app or a meter",
            "Underground parking at Compass, Samarkand Darvoza and Tashkent City Mall: 1-2 free hours with a receipt, then 10,000-15,000 sum per hour",
            "Hotel parking — normally free for guests, but request a slot in advance",
            "Suburban and residential areas are free, but courtyards now have zoned marking",
          ],
        },
        { type: "h2", text: "What must stay in the car" },
        {
          type: "p",
          text: "The minimum kit is the vehicle registration, the insurance policy, the rental contract and your driving licence with the IDP. The car itself must also carry a first-aid kit, a fire extinguisher and a warning triangle — this is a legal requirement and a traffic officer can ask to see them. Every Rentz.uz car ships with the full set.",
        },
        { type: "h2", text: "Fuel" },
        {
          type: "p",
          text: "Most cars in Uzbekistan run on AI-92 petrol — it is the default and is sold everywhere. AI-95 is reliable in Tashkent and on major highways but rarer at rural stations. Diesel is less widespread, so if you book an Isuzu D-Max or a diesel Prado, plan refuelling stops in advance. Petrol costs around 12,000 sum per litre of AI-92, roughly 0.95 USD.",
        },
        { type: "h2", text: "How we operate" },
        {
          type: "p",
          text: "Rentz.uz hands over cars in Tashkent and keeps a clear lineup for both city and intercity use: from a Spark or Cobalt for short urban hops to a Prado or Land Cruiser 300 for serious road trips. Prices on /cars are listed in USD per day with no hidden surcharges, and the deposit and conditions for each model are visible on the card before you book.",
        },
      ],
    },
    relatedCarSlugs: ["chevrolet-spark", "chevrolet-cobalt", "chevrolet-malibu-2", "toyota-land-cruiser-prado"],
  },
  {
    slug: "chimgan-beldersay-by-car",
    publishedAt: "2026-04-19",
    readMinutes: 7,
    category: { ru: "Маршруты", en: "Routes" },
    cover: "/design/generated-1776872206548.png",
    title: {
      ru: "Чимган и Бельдерсай на машине: что нужно знать",
      en: "Chimgan and Beldersay by Car: What You Need to Know",
    },
    excerpt: {
      ru: "80 километров от Ташкента, полтора часа за рулём, серпантин и горы. Когда лучше ехать, какую машину взять и что положить в багажник.",
      en: "Eighty kilometres from Tashkent, an hour and a half behind the wheel, switchbacks and mountains. When to go, which car to take and what to throw in the boot.",
    },
    body: {
      ru: [
        {
          type: "p",
          text: "Чимган и Бельдерсай — это две главные точки на горизонте Ташкента. Их видно из окна офиса в верхней части города в ясный день, и расстояние до них обманчиво близкое — всего 80 километров. На карте это полтора часа, в реальности — от часа двадцати до двух часов в зависимости от погоды и того, насколько резво вы войдёте в серпантин Чарвакского водохранилища.",
        },
        { type: "h2", text: "Дорога: что вас ждёт" },
        {
          type: "p",
          text: "Маршрут уходит из Ташкента по трассе А376 в сторону посёлка Газалкент, дальше — мимо Чарвакского водохранилища, и в финальной части начинается горный участок до Чимгана и Бельдерсая. Первые 50 километров — спокойная двухполоска, дальше начинается серпантин с подъёмом примерно до 1600 метров. Покрытие хорошее, дорогу регулярно ремонтируют, но местами есть участки без отбойников. Ночью ехать не рекомендуем.",
        },
        { type: "h2", text: "Когда ехать" },
        {
          type: "p",
          text: "Узбекистан на удивление разнообразен по сезонам, и Чимган с Бельдерсаем — это главное горное направление, которое работает круглый год.",
        },
        {
          type: "ul",
          items: [
            "Октябрь - март: горнолыжный сезон, бугели и кресельные подъёмники Бельдерсая работают; снег обычно стабилен в декабре - феврале",
            "Апрель - май: маковые поля и зелень, идеально для пеших прогулок",
            "Июнь - август: спасение от ташкентской жары, температура в горах на 8-10 градусов ниже",
            "Сентябрь: золотая осень, ясные дни, минимальный туристический трафик",
          ],
        },
        { type: "h2", text: "Какую машину выбрать" },
        {
          type: "p",
          text: "Зимой и в межсезонье горный участок становится мокрым, местами с льдом. Полный привод не обязателен, но крайне желателен. Седан с летней резиной зимой просто не доедет до верхней парковки Бельдерсая.",
        },
        {
          type: "ul",
          items: [
            "Chevrolet Tracker 2 — городской кроссовер с приличным клиренсом, хороший вариант на сухой сезон",
            "Hyundai Tucson — полный привод и достаточный запас мощности на подъёмах",
            "Toyota Prado 120 — выбор для зимы, с серьёзной геометрией и полным приводом, спокойно идёт по обледенелому серпантину",
          ],
        },
        { type: "h2", text: "Что взять с собой" },
        {
          type: "p",
          text: "Даже если вы едете на день, погода в горах меняется быстрее, чем кажется. Ниже — короткий чек-лист, который выручал нас десятки раз.",
        },
        {
          type: "ol",
          items: [
            "Тёплая куртка и шапка даже летом — вечер на 1500 метрах прохладный",
            "Удобная обувь с протектором, лучше непромокаемая",
            "Литр воды на человека и перекус — кафе на верху работают, но не всегда",
            "Powerbank — связь в ущельях прерывистая",
            "Зимой дополнительно: цепи, лопата и плед в багажнике",
          ],
        },
        { type: "h2", text: "Что посмотреть и попробовать на месте" },
        {
          type: "p",
          text: "Бельдерсай — это лыжная база с одним основным склоном и кресельным подъёмником, который летом тоже работает и поднимает на смотровую площадку с видом на Большой Чимган. Сам Большой Чимган — гора 3309 метров, покорить пешком за день её не получится, но прогулка к Гульбасайскому ущелью и обратно занимает 4-5 часов и доступна большинству. Внизу, у Чарваксого водохранилища, летом работают лодочные станции. Поесть лучше всего в чайханах посёлка Чимган — стандартный шашлык, плов и лагман.",
        },
        { type: "h2", text: "Логистика поездки" },
        {
          type: "p",
          text: "Если вы едете на один день, удобная схема — выехать из Ташкента в 7-8 утра, к 10 быть на месте, погулять или покататься 4-5 часов, пообедать и вернуться к 18-19 часам. Машину Rentz.uz можно взять в Ташкенте утром и сдать на следующий день. Под этот маршрут лучше всего смотреть кроссоверы и внедорожники на /cars — фильтр по типу кузова покажет подходящие варианты.",
        },
      ],
      en: [
        {
          type: "p",
          text: "Chimgan and Beldersay are the two main shapes on the Tashkent horizon. From the upper part of the city you can see them on a clear day, and the distance is deceptively short — only 80 kilometres. On the map that is 90 minutes; in practice it ranges from one hour twenty to two hours depending on weather and how aggressively you enter the switchbacks above the Charvak reservoir.",
        },
        { type: "h2", text: "The drive: what to expect" },
        {
          type: "p",
          text: "The route leaves Tashkent on the A376 toward Gazalkent, then runs alongside the Charvak reservoir, and the final section is a true mountain road climbing into Chimgan and Beldersay. The first fifty kilometres are a calm two-lane road; after that the climb begins, peaking around 1,600 metres. Asphalt is good and is repaired regularly, though some sections lack guardrails. Night driving is not recommended.",
        },
        { type: "h2", text: "When to go" },
        {
          type: "p",
          text: "Uzbekistan is surprisingly seasonal, and Chimgan-Beldersay is the main mountain destination that works all year round.",
        },
        {
          type: "ul",
          items: [
            "October to March: ski season, the Beldersay chairlift and drag lifts run, snow is most stable December to February",
            "April to May: poppy fields and bright greenery, ideal for hiking",
            "June to August: an escape from Tashkent's heat, mountain temperatures sit 8-10 °C lower",
            "September: golden autumn, clear days, minimal tourist traffic",
          ],
        },
        { type: "h2", text: "Choosing the car" },
        {
          type: "p",
          text: "In winter and shoulder season the mountain stretch becomes wet and patchy with ice. All-wheel drive is not strictly required, but it is strongly preferred. A sedan on summer tyres simply will not reach the upper parking at Beldersay in winter.",
        },
        {
          type: "ul",
          items: [
            "Chevrolet Tracker 2 — a city crossover with decent clearance, fine for the dry season",
            "Hyundai Tucson — AWD and enough torque to handle the climbs",
            "Toyota Prado 120 — the winter pick, with real geometry and four-wheel drive, calm even on icy switchbacks",
          ],
        },
        { type: "h2", text: "What to bring" },
        {
          type: "p",
          text: "Even on a day trip, mountain weather shifts faster than you expect. Below is a short checklist that has saved us dozens of times.",
        },
        {
          type: "ol",
          items: [
            "A warm jacket and hat even in summer — evenings at 1,500 metres are cold",
            "Sturdy shoes with a real tread, ideally waterproof",
            "A litre of water per person and a snack — upper cafés are not always open",
            "A power bank, since signal drops in the gorges",
            "In winter, also: snow chains, a shovel and a blanket in the boot",
          ],
        },
        { type: "h2", text: "What to do once you are there" },
        {
          type: "p",
          text: "Beldersay is a ski base with one main slope and a chairlift that also runs in summer to a viewpoint overlooking Big Chimgan. Big Chimgan itself is a 3,309-metre peak — too much for a day hike, but a walk to Gulbasay gorge and back takes four to five hours and suits most fitness levels. Below, at the Charvak reservoir, boat rental stations operate in summer. The best food is in the teahouses of Chimgan village: classic shashlik, plov and lagman.",
        },
        { type: "h2", text: "Trip logistics" },
        {
          type: "p",
          text: "For a day trip, the natural pattern is to leave Tashkent at 7-8 AM, arrive by 10, spend four or five hours walking or skiing, have lunch, and be back by 6-7 PM. A Rentz.uz car can be picked up in Tashkent in the morning and returned the next day. For this route, look at crossovers and SUVs on /cars — the body-type filter will surface the right options.",
        },
      ],
    },
    relatedCarSlugs: ["chevrolet-tracker-2", "hyundai-tucson", "toyota-prado-120"],
  },
  {
    slug: "economy-vs-suv-in-uzbekistan",
    publishedAt: "2026-04-29",
    readMinutes: 8,
    category: { ru: "Авто", en: "Cars" },
    cover: "/design/generated-1776872215898.png",
    title: {
      ru: "Эконом или внедорожник: какую машину брать в Узбекистане",
      en: "Economy or SUV: Which Rental Car Suits Uzbekistan",
    },
    excerpt: {
      ru: "Когда хватит Spark, когда лучше Malibu, а когда без Prado реально некомфортно. Сравниваем по сценариям, расходу и реальным дорогам.",
      en: "When a Spark is enough, when a Malibu makes sense, and when only a Prado feels right. A scenario-by-scenario comparison.",
    },
    body: {
      ru: [
        {
          type: "p",
          text: "Главный вопрос, который задаёт почти каждый турист: что выгоднее — взять самый дешёвый эконом и сэкономить, или сразу заплатить за внедорожник и не думать. Универсального ответа нет, потому что Узбекистан — страна с очень разными дорогами: от шестиполосного Ташкента до пыльных грунтовок в Кызылкумах. Ниже три реальных сценария и наша честная рекомендация по каждому.",
        },
        { type: "h2", text: "Сценарий 1. Только Ташкент" },
        {
          type: "p",
          text: "Если вы прилетели на 3-4 дня, поселились в центре и планируете ужины, торговые центры и пару поездок к Чарваку — большой машины не нужно. Эконом-класс закроет 100% задач, а парковаться в узких дворах будет в разы проще.",
        },
        {
          type: "ul",
          items: [
            "Chevrolet Spark — самый компактный, идеален для одного-двух человек, расход 5-6 литров на сотню",
            "Chevrolet Cobalt — седан, чуть больше багажника и комфортнее на скорости 70-90 км/ч в городе",
          ],
        },
        {
          type: "p",
          text: "Дневная аренда обоих — от 25-30 USD. На неделе по городу вы потратите примерно 30-40 USD на топливо. По сравнению с такси Yandex такая схема выгодна уже на втором дне.",
        },
        { type: "h2", text: "Сценарий 2. Ташкент плюс Самарканд" },
        {
          type: "p",
          text: "Когда маршрут включает один-два загородных рывка по 300+ километров, эконом перестаёт быть правильным выбором. Дело не в проходимости, а в усталости: 4 часа в Spark на трассе с фурами — это не отдых. Сюда напрашивается комфорт-класс и бизнес-седаны.",
        },
        {
          type: "ul",
          items: [
            "Chevrolet Malibu 2 — большой бизнес-седан с тихим салоном, хорошей шумоизоляцией и круиз-контролем; идеален для двоих с двумя чемоданами",
            "Kia K5 G5 — современный конкурент Malibu, чуть динамичнее и со свежим дизайном",
          ],
        },
        {
          type: "p",
          text: "Цена прыгает до 60-90 USD в сутки, расход у обоих седанов реальный 7-8 литров по трассе. Зато после 4-часовой дороги вы выйдете в Самарканде с прямой спиной и желанием идти на Регистан, а не лежать в отеле.",
        },
        { type: "h2", text: "Сценарий 3. Полный круг по Шёлковому пути" },
        {
          type: "p",
          text: "Если ваш план — Ташкент, Самарканд, Бухара, Хива, плюс Айдаркуль или Нурата с заездом в пустыню, разговор уже не про комфорт, а про инфраструктуру и безопасность. Здесь окупается полноразмерный внедорожник.",
        },
        {
          type: "ul",
          items: [
            "Hyundai Tucson — кроссовер для тех, кому нужен полный привод и приличная динамика, но без ощущения корабля",
            "Toyota Land Cruiser Prado — классика для серьёзных дистанций, выдержит и грейдер до Айдаркуля, и трассу на Хиву",
          ],
        },
        {
          type: "p",
          text: "Аренда — 90-150 USD в сутки, расход 11-13 литров. Кажется дорого, но на маршруте 1800-2000 км за неделю разница в стоимости между седаном и Prado размывается на фоне общего бюджета поездки и удобства.",
        },
        { type: "h2", text: "Реальные дороги: на что обращать внимание" },
        {
          type: "p",
          text: "Между крупными городами асфальт адекватный, но есть нюансы, которые меняют ваш выбор машины.",
        },
        {
          type: "ol",
          items: [
            "Магистрали М39 (на юг) и А373 (Ферганская долина) — седан проедет без проблем",
            "Региональные дороги между кишлаками — выбоины, козы, медленная фура впереди — комфортнее в кроссовере",
            "Подъезды к Айдаркулю, Сармышу, юрточным лагерям в Кызылкумах — грейдер и песок, нужен полный привод",
            "Горные дороги к Чимгану, Бельдерсаю и Заамину зимой — без AWD рискованно",
          ],
        },
        { type: "h2", text: "Считаем расход" },
        {
          type: "p",
          text: "Бензин в Узбекистане недорогой: АИ-92 — около 0,95 USD за литр, АИ-95 — около 1,1 USD. На маршруте Ташкент - Самарканд - Бухара - Ташкент (~1200 км) Spark съест примерно 75 литров, Malibu — 95, Prado — 145. В долларах это 70 / 100 / 160 USD соответственно. Разница меньше, чем кажется на первый взгляд, и в общем бюджете поездки она почти не ощущается.",
        },
        { type: "h2", text: "Итоговая рекомендация" },
        {
          type: "p",
          text: "Берите эконом, если вы в Ташкенте на короткий срок и не планируете трасс. Бизнес-седан или комфорт-кроссовер — для классики Самарканд - Бухара. Внедорожник — если вас манят пустыни, горы и юрточные лагеря. Все эти классы есть у Rentz.uz, выдача в Ташкенте, и конкретные модели с актуальной ценой и доступностью смотрите на /cars. Если вы не уверены, что взять, напишите нам с описанием маршрута — подберём машину под бюджет и комфорт.",
        },
      ],
      en: [
        {
          type: "p",
          text: "The question almost every visitor asks: is it cheaper to take the smallest economy car and save, or go straight to an SUV and stop worrying. There is no universal answer, because Uzbekistan offers a remarkable range of roads — from the six-lane avenues of Tashkent to dust tracks across the Kyzylkum desert. Below are three realistic scenarios and our honest recommendation for each.",
        },
        { type: "h2", text: "Scenario 1. Tashkent only" },
        {
          type: "p",
          text: "If you are in for 3-4 days, staying centrally, and planning dinners, malls and maybe a trip to Charvak, a big car is unnecessary. Economy class covers everything and is far easier to park in narrow courtyards.",
        },
        {
          type: "ul",
          items: [
            "Chevrolet Spark — the most compact option, ideal for one or two people, fuel use 5-6 L/100 km",
            "Chevrolet Cobalt — a sedan with more boot space and noticeably calmer at 70-90 km/h",
          ],
        },
        {
          type: "p",
          text: "Daily rental for both starts at 25-30 USD. Over a week of city use you will spend around 30-40 USD on fuel. Compared with stacking Yandex taxi rides, the rental pays for itself by day two.",
        },
        { type: "h2", text: "Scenario 2. Tashkent plus Samarkand" },
        {
          type: "p",
          text: "Once your itinerary includes one or two intercity runs of 300+ km, economy stops being the right call. The issue is not capability, it is fatigue: four hours in a Spark sharing the road with trucks is not a holiday. This is comfort-class and business-sedan territory.",
        },
        {
          type: "ul",
          items: [
            "Chevrolet Malibu 2 — a large business sedan with a quiet cabin, good sound insulation and cruise control; perfect for two with two suitcases",
            "Kia K5 G5 — a modern Malibu rival, a touch sportier with fresher styling",
          ],
        },
        {
          type: "p",
          text: "The rate climbs to 60-90 USD per day, with realistic highway fuel use of 7-8 L/100 km on both sedans. The trade is that after a four-hour drive you arrive in Samarkand still upright and ready for the Registan, instead of horizontal in the hotel.",
        },
        { type: "h2", text: "Scenario 3. The full Silk Road circuit" },
        {
          type: "p",
          text: "If your plan covers Tashkent, Samarkand, Bukhara, Khiva, plus a side trip to Aydarkul or Nurata with a desert night, the conversation is no longer about comfort but infrastructure and safety. A full-size SUV pays for itself.",
        },
        {
          type: "ul",
          items: [
            "Hyundai Tucson — a crossover for travellers who want AWD and decent performance without driving a barge",
            "Toyota Land Cruiser Prado — the long-distance classic, equally happy on the gravel toward Aydarkul and the highway to Khiva",
          ],
        },
        {
          type: "p",
          text: "Daily rate is 90-150 USD with fuel use of 11-13 L/100 km. It sounds steep, but on a 1800-2000 km week the price gap between a sedan and a Prado fades against the overall trip budget and the gain in comfort.",
        },
        { type: "h2", text: "Real road conditions to weigh in" },
        {
          type: "p",
          text: "Asphalt between major cities is fine, but there are nuances that should shape your choice.",
        },
        {
          type: "ol",
          items: [
            "M39 (south to Samarkand) and A373 (Fergana valley) — a sedan handles them without issues",
            "Regional roads between villages — potholes, goats and slow trucks make a crossover much more pleasant",
            "Approaches to Aydarkul, Sarmysh and Kyzylkum yurt camps — gravel and sand, AWD is necessary",
            "Mountain roads to Chimgan, Beldersay and Zaamin in winter — risky without all-wheel drive",
          ],
        },
        { type: "h2", text: "Running the fuel maths" },
        {
          type: "p",
          text: "Petrol in Uzbekistan is inexpensive: AI-92 is about 0.95 USD per litre, AI-95 about 1.1 USD. On a Tashkent-Samarkand-Bukhara-Tashkent loop (~1,200 km) a Spark burns roughly 75 litres, a Malibu 95, a Prado 145. In dollars that is 70 / 100 / 160 USD respectively. The gap is smaller than people assume and barely registers against the trip total.",
        },
        { type: "h2", text: "Bottom line" },
        {
          type: "p",
          text: "Take an economy car if you are in Tashkent briefly and not heading to the highways. A business sedan or comfort crossover is the right call for the classic Samarkand-Bukhara loop. An SUV makes sense if deserts, mountains and yurt camps are on your list. All of these classes live with Rentz.uz, with pickup in Tashkent — current models, prices and availability are on /cars. If you are unsure which class fits, send us your route and we will recommend a car that matches both your budget and your comfort expectations.",
        },
      ],
    },
    relatedCarSlugs: [
      "chevrolet-spark",
      "chevrolet-cobalt",
      "chevrolet-malibu-2",
      "kia-k5-g515",
      "hyundai-tucson",
      "toyota-land-cruiser-prado",
    ],
  },
];
