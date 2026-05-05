export type DestinationLocale = "ru" | "en" | "uz";

export type DestSection =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "stat"; label: string; value: string };

export interface Destination {
  slug: string;
  cover: string;
  city: string;
  facts: {
    distanceKm: number;
    drivingHours: string;
    bestSeason: Record<DestinationLocale, string>;
    recommendedClass: Record<DestinationLocale, string>;
  };
  title: Record<DestinationLocale, string>;
  description: Record<DestinationLocale, string>;
  h1: Record<DestinationLocale, string>;
  intro: Record<DestinationLocale, string>;
  body: Record<DestinationLocale, DestSection[]>;
  faqs: Record<DestinationLocale, { q: string; a: string }[]>;
  recommendedCarSlugs: string[];
}

export const DESTINATIONS: Destination[] = [
  {
    slug: "tashkent-samarkand",
    cover: "/design/generated-1776872101080.png",
    city: "Samarkand",
    facts: {
      distanceKm: 308,
      drivingHours: "~4 hours",
      bestSeason: {
        ru: "март – октябрь",
        en: "March – October",
        uz: "mart – oktyabr",
      },
      recommendedClass: {
        ru: "Комфорт-седан или кроссовер",
        en: "Comfort sedan or crossover",
        uz: "Komfort sedan yoki krossover",
      },
    },
    title: {
      ru: "Аренда авто Ташкент – Самарканд: маршрут на 308 км по M39 | Rentz.uz",
      en: "Tashkent to Samarkand by Car: 308 km M39 Road Trip | Rentz.uz",
      uz: "Toshkent – Samarqand avtomobil bilan: 308 km M39 yo‘nalishi | Rentz.uz",
    },
    description: {
      ru: "Дорога из Ташкента в Самарканд на арендованном авто: 308 км по трассе M39, ~4 часа, что посмотреть в городе и где остановиться по пути.",
      en: "A practical guide to driving from Tashkent to Samarkand: 308 km on the M39, around four hours, what to see and where to stop along the way.",
      uz: "Toshkentdan Samarqandga arenda avtomobilda yo‘l: M39 trassasi bo‘ylab 308 km, taxminan 4 soat, nimalarni ko‘rish va qayerda to‘xtash haqida.",
    },
    h1: {
      ru: "Ташкент – Самарканд на машине",
      en: "Tashkent to Samarkand by Car",
      uz: "Toshkentdan Samarqandga avtomobilda",
    },
    intro: {
      ru: "Самарканд — самый узнаваемый город Узбекистана и логичная первая поездка из Ташкента. Машину вы забираете в нашем офисе в Ташкенте, а до Самарканда едете сами — около четырёх часов по хорошей трассе M39.",
      en: "Samarkand is the most recognisable city in Uzbekistan and the natural first road trip from Tashkent. You collect the car at our Tashkent office and drive yourself — around four hours on the well-kept M39 highway.",
      uz: "Samarqand — O‘zbekistonning eng mashhur shahri va Toshkentdan birinchi sayohat uchun mantiqiy tanlov. Avtomobilni Toshkentdagi ofisimizdan olasiz va M39 trassasi bo‘ylab taxminan 4 soat o‘zingiz haydaysiz.",
    },
    body: {
      ru: [
        { type: "p", text: "Маршрут Ташкент – Самарканд — это 308 километров по трассе M39, которую за последние годы привели в порядок: примерно 90% пути это ровный двух- или трёхполосный асфальт, без серьёзных провалов. Средний водитель проезжает дорогу за 4 – 4,5 часа без спешки, с одной остановкой на кофе и заправку." },
        { type: "p", text: "Поезд «Афросиаб» довезёт вас за 2 часа 10 минут, и многие выбирают именно его. Но машина даёт то, чего не даёт поезд: остановиться у Тимура в Шахрисабзе по дороге обратно, доехать до винодельни Хованренко, заехать в Ургут на ковровый базар или спокойно увезти из Сиабского рынка ящик гранатов и сухофруктов. Если едете семьёй или с детьми — авто почти всегда выгоднее по совокупности." },
        { type: "h2", text: "Дорога: чего ждать" },
        { type: "p", text: "Выезжать из Ташкента лучше до 8 утра — так вы минуете пробки на Куйлюке и до Чиназа доедете спокойно. После Гулистана трасса становится свободной, и до самого Джизака можно идти 110 км/ч. Дальше — небольшой перевал Сангзар (бывший Тимурлановские ворота), затем равнинный участок до Самарканда." },
        { type: "ul", items: [
          "Заправки Lukoil и UNG стоят через каждые 40 – 60 км, бензин AI-92 и AI-95 в наличии стабильно.",
          "На постах ГАИ держите при себе паспорт, права и договор аренды — этого достаточно.",
          "Скоростной режим на трассе — 100 км/ч, в населённых пунктах 70 км/ч, камеры стоят в Гулистане и перед Джизаком.",
          "Связь МТС/Ucell/Beeline ловит почти везде, кроме короткого участка перевала.",
        ]},
        { type: "h2", text: "Что посмотреть в Самарканде" },
        { type: "p", text: "На сам город закладывайте минимум полтора дня. Регистан вечером с подсветкой — обязательная программа, утром туда же стоит вернуться без толпы. Шахи-Зинда лучше посещать ближе к закату: керамика на стенах в это время даёт самый чистый цвет. Гур-Эмир — мавзолей Тимура — компактный, но сильный объект, ехать туда от Регистана 7 минут. Биби-Ханым стоит напротив входа на Сиабский рынок, эти две точки логично совмещать." },
        { type: "p", text: "На Сиабском базаре обязательно купите самаркандскую лепёшку — её пекут только здесь и она реально другая. Ужинать езжайте в район Боги-Шамол или в один из ресторанов вдоль улицы Регистанской — местная кухня в Самарканде сильнее ташкентской по плову и шашлыку." },
        { type: "h2", text: "Где парковаться и ночевать" },
        { type: "p", text: "У Регистана есть платная парковка, 5000 сум за заезд. У Шахи-Зинды парковка бесплатная, но узкая — приезжайте утром. Большинство гостиниц в исторической части (Old Town, Boutique Minzifa, Jahongir B&B) имеют свои парковки во дворе; современные отели на проспекте Амира Тимура — открытые охраняемые стоянки." },
        { type: "h2", text: "Какую машину взять" },
        { type: "p", text: "Для пары или небольшой семьи без перегруза идеально подходит седан комфорт-класса — Chevrolet Malibu 2 или Kia K5 уверенно идут на трассе и экономично едут по топливу. Если вы планируете дополнительно заехать в Шахрисабз через перевал Тахта-Карача или просто хотите больше свободы по багажу, берите кроссовер Hyundai Tucson — клиренс выше, и на грунтовку, если вдруг свернёте, заедете спокойно. Все эти модели есть в каталоге Rentz.uz, и забрать их можно сразу в день вашего прилёта в Ташкент." },
      ],
      en: [
        { type: "p", text: "Tashkent to Samarkand is 308 kilometres on the M39 highway. The road has been resurfaced over the past few years and roughly 90% of it is solid two- or three-lane asphalt with no serious potholes. A relaxed pace gets you there in four to four-and-a-half hours, with one stop for coffee and fuel." },
        { type: "p", text: "The Afrosiyob high-speed train does the same trip in two hours ten minutes, and many travellers take it. A car gives you what the train cannot: a detour to Shahrisabz on the way back, a stop at the Khovrenko winery, a side trip to the Urgut carpet bazaar, or simply room to bring a crate of pomegranates and dried fruit home from Siyob market. For families or groups, a car almost always works out better." },
        { type: "h2", text: "What the drive is like" },
        { type: "p", text: "Leave Tashkent before 8 a.m. to skip the Quyliq traffic and reach Chinaz cleanly. After Gulistan the road opens up and you can hold 110 km/h all the way to Jizzakh. Then comes the modest Sangzar pass (the historical Timurid Gates), and a flat run into Samarkand." },
        { type: "ul", items: [
          "Lukoil and UNG petrol stations sit every 40 to 60 km. AI-92 and AI-95 are reliably available.",
          "At traffic-police checkpoints, your passport, driving licence and rental contract are enough.",
          "Speed limits: 100 km/h on the highway, 70 km/h through villages. Cameras around Gulistan and before Jizzakh.",
          "Mobile coverage on MTS, Ucell and Beeline is solid except for a short stretch over the pass.",
        ]},
        { type: "h2", text: "What to see in Samarkand" },
        { type: "p", text: "Plan a minimum of a day and a half in the city. Registan square at night under floodlights is the obvious headline, and worth a second visit early next morning before the crowds. Shah-i-Zinda is best near sunset, when the tilework on the walls reads at its truest colour. Gur-Emir, Timur’s mausoleum, is small but powerful — seven minutes by car from Registan. Bibi-Khanum mosque sits directly opposite the entrance to Siyob bazaar, so pair them." },
        { type: "p", text: "At Siyob market buy a Samarkand non — the round bread is only baked here and is genuinely different from Tashkent’s. For dinner head to the Boghi Shamol area or one of the restaurants along Registan Street; Samarkand outperforms the capital on plov and shashlik in our experience." },
        { type: "h2", text: "Parking and where to stay" },
        { type: "p", text: "There is paid parking at Registan, around 5,000 soum per entry. Shah-i-Zinda parking is free but tight — arrive in the morning. Most hotels in the old town (Old Town, Boutique Minzifa, Jahongir B&B) have private courtyards; modern hotels on Amir Temur avenue offer guarded open lots." },
        { type: "h2", text: "Which car to choose" },
        { type: "p", text: "For a couple or a small family without overload, a comfort-class sedan is ideal — the Chevrolet Malibu 2 or Kia K5 both cruise confidently and stay light on fuel. If you plan to add Shahrisabz over the Takhta-Karacha pass or simply want extra luggage room, take a Hyundai Tucson crossover: higher clearance and easy on the occasional gravel detour. All three are available from the Rentz.uz fleet and can be collected the day you land in Tashkent." },
      ],
      uz: [
        { type: "p", text: "Toshkent – Samarqand yo‘li M39 trassasi bo‘ylab 308 kilometr. So‘nggi yillarda yo‘l qaytadan asfaltlandi, taxminan 90 foizi sifatli ikki yoki uch qatorli yo‘l. Bir marta qahva va benzin uchun to‘xtab, taxminan 4 – 4,5 soatda yetib borasiz." },
        { type: "p", text: "«Afrosiyob» poyezdi bu masofani 2 soatu 10 daqiqada bosib o‘tadi va ko‘pchilik shuni tanlaydi. Lekin avtomobil sizga o‘ziga xos erkinlik beradi: qaytishda Shahrisabzga burilish, Xovrenko vinochiligi yoki Urgut gilam bozoriga tashrif, yoki Siyob bozoridan bir quti anor va quruq meva olib kelish imkoni. Oilaviy yoki guruh bo‘lib sayohat qilsangiz, avtomobil ko‘pincha foydaliroq." },
        { type: "h2", text: "Yo‘l qanday bo‘ladi" },
        { type: "p", text: "Toshkentdan ertalab soat 8 gacha chiqing — Quyliqdagi tirbandlikdan qutilasiz. Guliston ortida yo‘l bo‘shashadi, Jizzaxgacha 110 km/soat tezlikda borish mumkin. Keyin Sangzar dovoni (Temur Darvozasi) va Samarqandgacha tekis yo‘l." },
        { type: "ul", items: [
          "Lukoil va UNG shoxobchalari har 40 – 60 km da. AI-92 va AI-95 doim mavjud.",
          "YPX postlarida pasport, haydovchilik guvohnomasi va ijara shartnomasini ko‘rsating — yetarli.",
          "Tezlik: trassada 100 km/soat, qishloqlardan o‘tganda 70 km/soat. Kameralar Guliston va Jizzax oldida.",
          "Mobil aloqa MTS, Ucell, Beeline deyarli hamma joyda ishlaydi, faqat dovonda qisqa uzilish bo‘ladi.",
        ]},
        { type: "h2", text: "Samarqandda nimani ko‘rish kerak" },
        { type: "p", text: "Shaharga kamida bir yarim kun ajrating. Registon kechki yoritishda majburiy dastur, ertalab esa olomonsiz qaytib borish ham arziydi. Shohizinda quyosh botishidan oldin chiroyli — devorlardagi sopol naqshlar haqiqiy rangini ko‘rsatadi. Go‘ri Amir — Amir Temur maqbarasi — kichik, lekin kuchli yodgorlik, Registondan 7 daqiqa. Bibi-Xonim masjidi Siyob bozori kirishi qarshisida joylashgan, bu ikkalasini birga ko‘ring." },
        { type: "p", text: "Siyob bozoridan albatta Samarqand nonini oling — uni faqat shu yerda yopadi va Toshkent nonidan ancha boshqacha. Kechki ovqat uchun Bog‘i Shamol yoki Registon ko‘chasi bo‘ylab restoranlardan birini tanlang — Samarqand oshi va shashligi haqiqatan boshqacha." },
        { type: "h2", text: "Qayerda to‘xtash va tunash" },
        { type: "p", text: "Registon yonida pullik avtoturargoh — 5000 so‘m. Shohizinda yonidagi joy bepul, lekin tor — ertalab boring. Eski shahardagi mehmonxonalar (Old Town, Boutique Minzifa, Jahongir B&B) o‘z hovlilariga ega; Amir Temur shoh ko‘chasidagi zamonaviy mehmonxonalarda qo‘riqlanadigan ochiq joy bor." },
        { type: "h2", text: "Qaysi avtomobilni olish kerak" },
        { type: "p", text: "Juftlik yoki kichik oila uchun komfort sinfidagi sedan — Chevrolet Malibu 2 yoki Kia K5 — ideal. Trassada ishonchli, yonilg‘ini tejaydi. Agar Shahrisabzga ham bormoqchi bo‘lsangiz yoki yuk uchun joy kerak bo‘lsa, Hyundai Tucson krossoverini oling: klirensi yuqori, agar tuproq yo‘lga burilsangiz ham bemalol o‘tasiz. Har uchchalasi Rentz.uz katalogida bor va Toshkentga qo‘ngan kuningizdan boshlab olishingiz mumkin." },
      ],
    },
    faqs: {
      ru: [
        { q: "Сколько ехать из Ташкента в Самарканд на машине?", a: "Около 4 – 4,5 часов чистого времени за рулём. С остановкой на обед получится 5 часов. Лучше выезжать рано утром." },
        { q: "Нужен ли полный привод для поездки в Самарканд?", a: "Нет. Вся трасса M39 — асфальт, обычный седан проходит её без проблем. Полный привод имеет смысл, только если планируете заехать в горы или в Шахрисабз через перевал зимой." },
        { q: "Где можно заправиться по дороге?", a: "Lukoil и UNG расположены примерно через каждые 40 – 60 км. Самые удобные точки — выезд из Чиназа, Гулистан, Джизак. Бензин AI-92 и AI-95 есть стабильно, дизель тоже." },
        { q: "Что показывать на постах ГАИ?", a: "Узбекистанский паспорт или иностранный паспорт, водительское удостоверение и договор аренды от Rentz.uz. На некоторых постах попросят показать содержимое багажника — это нормально." },
        { q: "Можно ли поехать на одну ночь?", a: "Можно, но плотно. Реалистичный минимум — выехать утром, переночевать в Самарканде, вернуться вечером следующего дня. Если есть третий день, добавьте Шахрисабз." },
        { q: "Что лучше — поезд «Афросиаб» или машина?", a: "Поезд быстрее (2 ч 10 мин), но машина даёт свободу: остановки по дороге, перевозка покупок с базара, поездки по самой Самаркандской области. Семье из 3 – 4 человек авто чаще выгоднее." },
      ],
      en: [
        { q: "How long is the drive from Tashkent to Samarkand?", a: "About 4 to 4.5 hours of pure driving. Add a lunch stop and you are at 5 hours. Leaving Tashkent before 8 a.m. avoids the city traffic." },
        { q: "Do I need a 4x4 for Samarkand?", a: "No. The entire M39 is paved and a regular sedan handles it easily. 4x4 only matters if you also plan to climb into the mountains or cross the Takhta-Karacha pass to Shahrisabz in winter." },
        { q: "Where can I refuel on the way?", a: "Lukoil and UNG stations sit roughly every 40 to 60 km. Easiest stops are leaving Chinaz, Gulistan and Jizzakh. AI-92 and AI-95 petrol are reliably stocked, diesel as well." },
        { q: "What do I show at police checkpoints?", a: "Your passport, driving licence (international permit if your local one is not in Latin script) and the Rentz.uz rental contract. Some checkpoints ask to glance into the boot — that is routine." },
        { q: "Can I do it as an overnight trip?", a: "Yes, but it is tight. The realistic minimum is leave in the morning, sleep in Samarkand, drive back the next evening. With a third day you can add Shahrisabz." },
        { q: "Train or car — which is better?", a: "The Afrosiyob train is faster (2h 10m) but a car gives you flexibility: roadside stops, hauling bazaar purchases, side trips around Samarkand region. For families of three or four, the car usually comes out cheaper overall." },
      ],
      uz: [
        { q: "Toshkentdan Samarqandga avtomobilda qancha vaqt ketadi?", a: "Sof haydash 4 – 4,5 soat. Tushlik bilan 5 soat. Ertalab erta chiqsangiz, Toshkent tirbandligini chetlab o‘tasiz." },
        { q: "Samarqandga 4x4 kerakmi?", a: "Yo‘q. M39 to‘liq asfalt, oddiy sedan bemalol o‘tadi. 4x4 faqat tog‘ga chiqmoqchi bo‘lsangiz yoki qishda Tahta-Qoracha dovoni orqali Shahrisabzga bormoqchi bo‘lsangiz kerak." },
        { q: "Yo‘lda qayerda yonilg‘i quydirish mumkin?", a: "Lukoil va UNG har 40 – 60 km da. Qulay nuqtalar — Chinoz chiqishi, Guliston, Jizzax. AI-92, AI-95 va dizel doim bor." },
        { q: "YPX postida nimani ko‘rsatish kerak?", a: "Pasport, haydovchilik guvohnomasi va Rentz.uz ijara shartnomasi. Ba’zan yuk joyiga qarab qo‘yishadi — bu odatiy hol." },
        { q: "Bir kechalik sayohat qilsa bo‘ladimi?", a: "Bo‘ladi, lekin zich. Real minimum — ertalab chiqib, Samarqandda tunab, ertasi kuni kechqurun qaytish. Uchinchi kun bo‘lsa, Shahrisabzni qo‘shing." },
        { q: "Poyezdmi yoki avtomobil?", a: "«Afrosiyob» tezroq (2 soat 10 daqiqa), lekin avtomobil erkinlik beradi: yo‘l-yo‘lakay to‘xtash, bozordan yuk olib qaytish, viloyat bo‘ylab harakat. 3 – 4 kishilik oila uchun avtomobil ko‘pincha foydaliroq." },
      ],
    },
    recommendedCarSlugs: ["chevrolet-malibu-2", "kia-k5-g515", "hyundai-tucson"],
  },
  {
    slug: "tashkent-bukhara",
    cover: "/design/generated-1776872171930.png",
    city: "Bukhara",
    facts: {
      distanceKm: 578,
      drivingHours: "~7 hours",
      bestSeason: {
        ru: "апрель – июнь, сентябрь – октябрь",
        en: "April – June, September – October",
        uz: "aprel – iyun, sentyabr – oktyabr",
      },
      recommendedClass: {
        ru: "Комфорт-седан или кроссовер",
        en: "Comfort sedan or crossover",
        uz: "Komfort sedan yoki krossover",
      },
    },
    title: {
      ru: "Аренда авто Ташкент – Бухара: маршрут на 578 км и где остановиться | Rentz.uz",
      en: "Tashkent to Bukhara by Car: 578 km Route and Stopover Tips | Rentz.uz",
      uz: "Toshkent – Buxoro avtomobilda: 578 km yo‘nalishi | Rentz.uz",
    },
    description: {
      ru: "Поездка из Ташкента в Бухару на арендованном авто: 578 км по M37, около 7 часов. Что посмотреть, где переночевать в Самарканде и какую машину выбрать.",
      en: "Driving from Tashkent to Bukhara: 578 km via the M37, around seven hours. Itinerary tips, an overnight in Samarkand, and the right car for the job.",
      uz: "Toshkentdan Buxoroga arenda avtomobilda: M37 bo‘ylab 578 km, taxminan 7 soat. Qayerda tunash va qaysi avtomobilni tanlash haqida.",
    },
    h1: {
      ru: "Ташкент – Бухара на машине",
      en: "Tashkent to Bukhara by Car",
      uz: "Toshkentdan Buxoroga avtomobilda",
    },
    intro: {
      ru: "Бухара дальше Самарканда: 578 километров от Ташкента и около семи часов чистого времени. Большинство наших клиентов едут с ночёвкой в Самарканде, и это правильно — две большие точки за один день впитать невозможно. Машину забирают в Ташкенте, маршрут проходит по трассам M39 и M37.",
      en: "Bukhara sits beyond Samarkand: 578 kilometres from Tashkent and about seven hours of actual driving. Most of our customers break the trip with a night in Samarkand, which is the right call — you cannot absorb both cities in a single day. You collect the car in Tashkent and follow the M39 and then the M37.",
      uz: "Buxoro Samarqanddan keyinda: Toshkentdan 578 kilometr va taxminan 7 soatlik haydash. Mijozlarimizning aksariyati Samarqandda bir kechib o‘tishadi — bu to‘g‘ri qaror. Avtomobil Toshkentda olinadi, yo‘nalish M39 va keyin M37 bo‘ylab.",
    },
    body: {
      ru: [
        { type: "p", text: "На карте кажется, что 578 км можно одолеть за один день, но в Узбекистане это не лучшая идея. Реальное чистое время за рулём — около 7 часов, плюс посты, заправки, обед и неизбежные «давайте остановимся пофотографировать перевал». В сумме легко получается 9 – 10 часов. Куда лучше разбить дорогу: первый день Ташкент – Самарканд (4 часа), вторая половина дня в Самарканде, на третий день Самарканд – Бухара (3 – 3,5 часа)." },
        { type: "h2", text: "Дорога: M39 и M37" },
        { type: "p", text: "До Самарканда — та же M39, что и для самостоятельной поездки в Самарканд: 308 км, в основном свежий асфальт. После Самарканда трасса меняет название на M37 и идёт по равнине через Каттакурган и Навои. Это самый монотонный участок: степь, редкие посёлки, длинные прямые. Качество покрытия в целом хорошее, но местами встречаются волны — держите скорость в районе 100 км/ч." },
        { type: "ul", items: [
          "Заправляйтесь в Самарканде или в Навои — между ними длинный участок с меньшей плотностью АЗС.",
          "В Навои есть нормальные кафе и туалеты на стоянках Lukoil/UNG.",
          "Постов ГАИ на этом участке больше, чем на M39. Соблюдайте скорость, особенно перед Бухарой.",
          "Связь стабильная по всей M37, в том числе мобильный интернет.",
        ]},
        { type: "h2", text: "Что смотреть в Бухаре" },
        { type: "p", text: "Бухара — компактная: исторический центр обходится пешком за день. Логичный круг: Ляби-Хауз с тремя медресе вокруг пруда, дальше торговые купола Токи-Заргарон, Токи-Тельпак-Фурушон и Токи-Саррафон, потом ансамбль Пои-Калян с минаретом Калян (47 метров, тот самый «башня смерти», с которой раньше сбрасывали приговорённых), мечеть Калян и медресе Мири-Араб напротив. Чор-Минор — отдельная небольшая прогулка чуть в стороне, дойти от Ляби-Хауза 15 минут пешком." },
        { type: "p", text: "Цитадель Арк — крепость, где жил эмир, открыта как музей. Времени на неё уходит примерно полтора часа. Если остаётся ещё полдня, езжайте за город: летняя резиденция эмира Ситораи Мохи-Хоса в 4 километрах от центра — отдельный сюжет, и парковка там свободная." },
        { type: "h2", text: "Где парковаться" },
        { type: "p", text: "Внутри Ляби-Хауза проезд закрыт; ближайшие парковки — у Боло-Хауза и со стороны Хакикат. Большинство гостевых домов в старом городе либо имеют двор-стоянку, либо помогут с местом у соседа. Ставка ночью обычно 10 – 20 тысяч сум, дневная — 5 – 10 тысяч." },
        { type: "h2", text: "Какую машину взять" },
        { type: "p", text: "На семь часов трассы важен комфорт — спина не должна сесть к Бухаре. Chevrolet Malibu 2 — самый универсальный вариант: тихий, мягкий, экономичный, легко идёт 110 км/ч. Если едете втроём-вчетвером с чемоданами, кроссовер Hyundai Tucson даёт больше места и выше посадку, что на длинной дороге субъективно легче. Для тех, кто после Бухары планирует двигаться дальше — на Хиву или в горы — мы советуем Toyota Land Cruiser Prado: он избавит от необходимости менять машину в середине маршрута. Все три модели берутся в нашем офисе в Ташкенте на любой срок от трёх дней." },
      ],
      en: [
        { type: "p", text: "On a map 578 km looks like one long day. In Uzbekistan it really is not. Pure driving time is about 7 hours, plus checkpoints, fuel, lunch and the inevitable photo stops, which puts the door-to-door figure at 9 – 10 hours. The better split is Tashkent to Samarkand on day one (4 hours), an afternoon and morning in Samarkand, then Samarkand to Bukhara on day three (3 – 3.5 hours)." },
        { type: "h2", text: "The drive: M39 then M37" },
        { type: "p", text: "Up to Samarkand you are on the same M39 as the standalone Samarkand trip: 308 km of mostly fresh asphalt. After Samarkand the road becomes the M37 and runs across flat country through Kattakurgan and Navoiy. This is the most monotonous section — steppe, sparse villages, long straights. Surface quality is generally good with occasional rippling, so a steady 100 km/h is comfortable." },
        { type: "ul", items: [
          "Refuel in Samarkand or in Navoiy — the stretch between has fewer stations.",
          "Navoiy has decent cafés and toilets at the Lukoil and UNG stations.",
          "Police checkpoints are more frequent here than on the M39. Mind the speed limit, especially approaching Bukhara.",
          "Mobile coverage is solid the whole way, including data.",
        ]},
        { type: "h2", text: "What to see in Bukhara" },
        { type: "p", text: "Bukhara is compact — the historic centre is comfortably walkable in a day. A logical loop: Lyab-i-Hauz with the three madrasas around the pond, then the trading domes Toki-Zargaron, Toki-Telpak-Furushon and Toki-Sarrafon, the Po-i-Kalyan ensemble with the 47-metre Kalyan minaret (the famous Tower of Death, from which condemned prisoners were once thrown), the Kalyan mosque and the still-active Mir-i-Arab madrasa opposite. Chor-Minor is a short side trip, 15 minutes on foot from Lyab-i-Hauz." },
        { type: "p", text: "The Ark fortress — where the emir lived — is open as a museum and takes about an hour and a half. With a spare half-day, drive out to Sitorai Mohi-Khosa, the emir’s summer palace four kilometres from the centre. Parking there is free and easy." },
        { type: "h2", text: "Where to park" },
        { type: "p", text: "Vehicles cannot enter the immediate Lyab-i-Hauz area. The nearest parking is by Bolo-Hauz and on the Khakikat side. Most guesthouses in the old town either have a courtyard or arrange a neighbour’s spot. Overnight is usually 10 – 20 thousand soum, daytime 5 – 10 thousand." },
        { type: "h2", text: "Which car to choose" },
        { type: "p", text: "Seven hours of highway means comfort matters — your back should not give up before Bukhara. The Chevrolet Malibu 2 is the all-rounder pick: quiet, soft, economical, happy at 110 km/h. For three or four people with luggage, the Hyundai Tucson crossover gives more space and a higher seating position that subjectively eases the long stretch. If your plan continues past Bukhara — towards Khiva or into the mountains — the Toyota Land Cruiser Prado spares you a mid-trip car change. All three are available from the Rentz.uz Tashkent office on rentals from three days up." },
      ],
      uz: [
        { type: "p", text: "Xaritada 578 km bir kunlik yo‘l bo‘lib ko‘rinadi. O‘zbekistonda bu unday emas. Sof haydash 7 soat, postlar, yonilg‘i, tushlik va majburiy fotoga to‘xtashlar bilan 9 – 10 soatga aylanadi. Eng yaxshi taqsim: birinchi kun Toshkent – Samarqand (4 soat), Samarqandda yarim kun, uchinchi kun Samarqand – Buxoro (3 – 3,5 soat)." },
        { type: "h2", text: "Yo‘l: M39 va keyin M37" },
        { type: "p", text: "Samarqandgacha xuddi mustaqil Samarqand sayohati kabi M39 bo‘ylab 308 km. Samarqanddan keyin yo‘l M37 ga aylanib, Kattaqo‘rg‘on va Navoiy orqali tekislikdan o‘tadi. Bu eng bir xil qism — dasht, kam aholi punktlari, uzun to‘g‘ri yo‘l. Asfalt sifati umuman yaxshi, faqat ba’zi joylarda to‘lqinlanish bor — 100 km/soat tezligi qulay." },
        { type: "ul", items: [
          "Samarqand yoki Navoiyda yonilg‘i quying — orasidagi qism shoxobchalarga kambag‘al.",
          "Navoiyda Lukoil va UNG da yaxshi kafelar va hojatxonalar bor.",
          "Bu yerda YPX postlari M39 dan ko‘proq. Tezlikka rioya qiling, ayniqsa Buxoroga yaqinlashganda.",
          "Mobil aloqa va internet butun yo‘l bo‘ylab barqaror.",
        ]},
        { type: "h2", text: "Buxoroda nimani ko‘rish kerak" },
        { type: "p", text: "Buxoro ixcham — eski shaharni bir kunda piyoda aylanib bo‘ladi. Mantiqiy yo‘nalish: Labi-Hovuz va atrofidagi uch madrasa, keyin Toqi-Zargaron, Toqi-Telpakfurushon, Toqi-Sarrofon savdo gumbazlari, Po‘yi Kalon majmuasi — 47 metrli Kalon minorasi (mahkumlar tashlangan «O‘lim minorasi»), Kalon masjidi va ro‘paradagi hozir ham faoliyat ko‘rsatayotgan Mir-i-Arab madrasasi. Chor-Minor — Labi-Hovuzdan 15 daqiqalik piyoda yo‘l." },
        { type: "p", text: "Ark qal’asi — amir yashagan joy — muzey sifatida ochiq, taxminan 1,5 soat ketadi. Yarim kun qo‘shimcha bo‘lsa, markazdan 4 km uzoqlikdagi Sitorai Mohi-Xosa amirning yozgi qarorgohiga boring — avtoturargoh bepul." },
        { type: "h2", text: "Qayerda to‘xtash" },
        { type: "p", text: "Labi-Hovuzning o‘ziga avtomobil kira olmaydi. Eng yaqin avtoturargohlar Bolo-Hovuz va Hakikat tomonida. Eski shahardagi ko‘pchilik mehmonxonalarning hovlisi bor yoki qo‘shni joydan o‘rin tashkil qilib berishadi. Bir kecha — 10 – 20 ming so‘m, kunduzgi — 5 – 10 ming." },
        { type: "h2", text: "Qaysi avtomobilni olish kerak" },
        { type: "p", text: "Yetti soatlik trassa uchun qulaylik muhim — Buxoroga yetib borguningizgacha bel og‘rib ketmasin. Chevrolet Malibu 2 — eng ko‘p qirrali tanlov: jim, yumshoq, tejamkor, 110 km/soat tezlikda bemalol ishlaydi. Uch-to‘rt kishi yuk bilan bo‘lsa, Hyundai Tucson krossoverida joy ko‘proq va o‘rindiq balandroq. Buxorodan keyin Xivaga yoki tog‘larga davom etmoqchi bo‘lsangiz, Toyota Land Cruiser Prado avtomobilni almashtirmaslik imkonini beradi. Har uchchalasi Rentz.uz ofisidan kamida 3 kunlik ijara bilan olinadi." },
      ],
    },
    faqs: {
      ru: [
        { q: "Можно ли доехать до Бухары за один день?", a: "Технически да: 7 часов чистого времени и около 10 часов с остановками. Но мы советуем разбить маршрут с ночёвкой в Самарканде — иначе на сам город сил не остаётся." },
        { q: "Нужен ли внедорожник?", a: "Нет. M39 и M37 — асфальт почти на всём протяжении. Седан комфорт-класса полностью справляется. Внедорожник нужен, только если из Бухары вы пойдёте дальше в Хиву через пустыню." },
        { q: "Где лучше переночевать по дороге?", a: "Стандартный вариант — Самарканд: гостиниц много, парковки во дворе, после ужина приятно гулять у Регистана. Гостиницы в Навои или Каттакургане как промежуточная база — вариант скорее запасной." },
        { q: "Что с заправками между Самаркандом и Бухарой?", a: "АЗС реже, чем на M39. Самые надёжные точки — выезд из Самарканда, Навои, въезд в Бухару. Лучше держать бак не ниже половины." },
        { q: "Есть ли платные дороги?", a: "На M39/M37 платных участков нет. Парковки у достопримечательностей в Самарканде и Бухаре платные, ставка небольшая (5 – 20 тысяч сум)." },
        { q: "Сколько дней закладывать на всю поездку?", a: "Минимум — 4 дня (1 на дорогу туда с ночёвкой в Самарканде, 1,5 на Бухару, 1,5 обратно). Комфортный вариант — 5 – 6 дней с днём на Самарканд и днём на Бухару." },
      ],
      en: [
        { q: "Can I drive to Bukhara in a single day?", a: "Technically yes — 7 hours of driving, around 10 with stops. But we strongly suggest breaking the trip with a night in Samarkand. Otherwise you arrive too tired to enjoy Bukhara." },
        { q: "Do I need an SUV?", a: "No. The M39 and M37 are paved end to end. A comfort sedan handles the route fine. You only need an SUV if you continue past Bukhara to Khiva across the desert." },
        { q: "Where is best for the overnight stop?", a: "Samarkand is the standard pick — plenty of hotels, courtyard parking, evening walks around Registan. Hotels in Navoiy or Kattakurgan work only as a fallback." },
        { q: "What about fuel between Samarkand and Bukhara?", a: "Stations are less dense than on the M39. The reliable points are leaving Samarkand, Navoiy and entering Bukhara. Keep the tank above half." },
        { q: "Are there toll roads?", a: "No tolls on the M39 or M37. Tourist-site parking in Samarkand and Bukhara is paid but cheap, around 5,000 – 20,000 soum." },
        { q: "How many days should I plan for the whole trip?", a: "Minimum 4 days (1 driving with a Samarkand overnight, 1.5 in Bukhara, 1.5 back). Comfortable plan: 5 – 6 days with a full day each in Samarkand and Bukhara." },
      ],
      uz: [
        { q: "Buxoroga bir kunda yetib borsa bo‘ladimi?", a: "Texnik jihatdan ha — 7 soat sof haydash, to‘xtashlar bilan 10 soat. Lekin Samarqandda bir kechib o‘tishingizni maslahat beramiz, aks holda Buxoroga charchab borasiz." },
        { q: "SUV kerakmi?", a: "Yo‘q. M39 va M37 to‘liq asfalt. Komfort sedan yetarli. SUV faqat Buxorodan keyin sahrodan Xivaga davom etsangiz kerak bo‘ladi." },
        { q: "Yo‘lda qayerda tunash yaxshi?", a: "Standart tanlov — Samarqand: mehmonxona ko‘p, hovlida avtoturargoh, kechqurun Registon atrofida sayr. Navoiy yoki Kattaqo‘rg‘ondagi mehmonxonalar faqat zaxira variant." },
        { q: "Samarqand va Buxoro orasida yonilg‘i bilan qanday?", a: "AZS lar M39 dagiga qaraganda kamroq. Ishonchli nuqtalar — Samarqand chiqishi, Navoiy va Buxoroga kirish. Bakni yarmidan yuqori saqlang." },
        { q: "Pullik yo‘l bormi?", a: "M39 va M37 da pullik qism yo‘q. Samarqand va Buxorodagi ziyoratgohlar yonidagi avtoturargohlar pullik, lekin arzon (5 – 20 ming so‘m)." },
        { q: "Butun sayohatga necha kun kerak?", a: "Minimum 4 kun (1 — yo‘l + Samarqand kechasi, 1,5 — Buxoro, 1,5 — qaytish). Qulay reja — 5 – 6 kun, Samarqand va Buxoroga bittadan to‘liq kun." },
      ],
    },
    recommendedCarSlugs: ["chevrolet-malibu-2", "hyundai-tucson", "toyota-land-cruiser-prado"],
  },
  {
    slug: "tashkent-khiva",
    cover: "/design/generated-1776872186016.png",
    city: "Khiva",
    facts: {
      distanceKm: 1100,
      drivingHours: "12 – 14 hours total",
      bestSeason: {
        ru: "апрель – май, сентябрь – октябрь",
        en: "April – May, September – October",
        uz: "aprel – may, sentyabr – oktyabr",
      },
      recommendedClass: {
        ru: "Внедорожник или пикап (обязательно)",
        en: "SUV or pickup (mandatory)",
        uz: "SUV yoki pikap (majburiy)",
      },
    },
    title: {
      ru: "Аренда авто Ташкент – Хива: 1100 км через Кызылкум | Rentz.uz",
      en: "Tashkent to Khiva by Car: 1,100 km Across the Kyzylkum | Rentz.uz",
      uz: "Toshkent – Xiva avtomobilda: Qizilqum orqali 1100 km | Rentz.uz",
    },
    description: {
      ru: "Маршрут Ташкент – Хива: 1100 км, около 12 – 14 часов за рулём, обязательная пустынная часть Бухара – Ургенч. Какой внедорожник выбрать и как разбить путь.",
      en: "The Tashkent to Khiva route: 1,100 km, 12 – 14 hours of driving, an obligatory desert stretch from Bukhara to Urgench. Choosing the right SUV and pacing the trip.",
      uz: "Toshkent – Xiva yo‘nalishi: 1100 km, 12 – 14 soatlik haydash, Buxoro – Urganch oralig‘ida sahro qismi. Qaysi SUV ni olish va yo‘lni qanday bo‘lish haqida.",
    },
    h1: {
      ru: "Ташкент – Хива на машине",
      en: "Tashkent to Khiva by Car",
      uz: "Toshkentdan Xivaga avtomobilda",
    },
    intro: {
      ru: "Хива — самая дальняя классическая точка для самостоятельной поездки из Ташкента: 1100 километров и около 12 – 14 часов чистого времени за рулём. Это не однодневная вылазка, а полноценный мульти-сити маршрут на 5 – 7 дней. Машину забираем в Ташкенте, и из-за пустынного участка между Бухарой и Ургенчем нужен внедорожник или пикап с нормальным клиренсом.",
      en: "Khiva is the furthest of the classic self-drive destinations from Tashkent: 1,100 kilometres and 12 – 14 hours of pure driving. This is not a day out; it is a 5 – 7 day multi-city itinerary. The car is collected in Tashkent, and because the Bukhara to Urgench stretch crosses the Kyzylkum desert, an SUV or pickup with proper clearance is required.",
      uz: "Xiva — Toshkentdan mustaqil sayohat uchun eng uzoq klassik nuqta: 1100 kilometr va 12 – 14 soatlik sof haydash. Bu bir kunlik chiqish emas, 5 – 7 kunlik ko‘p shaharli sayohat. Avtomobil Toshkentda olinadi, Buxoro – Urganch oralig‘ida Qizilqum sahrosi sababli yaxshi klirensli SUV yoki pikap kerak.",
    },
    body: {
      ru: [
        { type: "p", text: "Самый частый вопрос: «Можно ли доехать до Хивы за один день?» Технически — нельзя по-человечески. 1100 км в Узбекистане это не 1100 км по немецкому автобану. Реальный путь: Ташкент → Самарканд (4 ч) → Бухара (3,5 ч) → Хива (5 – 6 ч через пустыню). Вместе — 12 – 14 часов чистого времени. Любой здравомыслящий план разбивает это на 3 – 4 дня в одну сторону." },
        { type: "h2", text: "Логичный маршрут на 5 – 7 дней" },
        { type: "ol", items: [
          "День 1: Ташкент → Самарканд (4 ч), вечер у Регистана.",
          "День 2: целый день на Самарканд.",
          "День 3: Самарканд → Бухара (3,5 ч), вечер на Ляби-Хаузе.",
          "День 4: целый день на Бухару.",
          "День 5: Бухара → Хива через пустыню Кызылкум (5 – 6 ч), вечер в Ичан-Кале.",
          "День 6: Хива целиком.",
          "День 7: возвращение в Ташкент через Бухару (либо самолёт из Ургенча и сдача авто в нашу филиал — спросите менеджера).",
        ]},
        { type: "h2", text: "Что с пустынной дорогой Бухара – Ургенч" },
        { type: "p", text: "Этот участок — главная причина, по которой нельзя ехать в Хиву на седане. 450 километров через Кызылкум: пустыня, пыльные ветра, перепады температур, и асфальт качества «временами 70%, временами 30%». В худшие куски встречаются глубокие выбоины, песчаные наносы, провалы у обочин. Заправок мало, кафе ещё меньше — реалистично планируйте две полные заправки и термос воды. Связь местами проседает на 30 – 60 минут." },
        { type: "ul", items: [
          "Выезжайте из Бухары с полным баком — следующая надёжная заправка в Газли (~100 км), потом крупные АЗС только в Учкудуке и Ургенче.",
          "Не выезжайте после 14:00 — ночью пустынная дорога опасна из-за фур и плохой видимости.",
          "Возьмите с собой минимум 5 литров воды на машину и какой-то перекус.",
          "Кондиционер летом съедает топливо заметно больше — с этим тоже считайтесь.",
        ]},
        { type: "h2", text: "Хива и Ичан-Кала" },
        { type: "p", text: "Внутри стен Ичан-Калы — около 50 памятников на 26 гектарах, и весь город охраняется ЮНЕСКО как единый объект. На осмотр без спешки нужно полтора дня. Главные точки: минарет Кальта-Минор (тот самый «огрызок», бирюзовый и недостроенный), дворец Таш-Хаули с его айванами, Джума-мечеть с 213 резными колоннами, медресе Мухаммад Амин-хана и Куня-Арк со смотровой площадкой, откуда видно всю крепость." },
        { type: "p", text: "Внутри стен машина не нужна и не пройдёт — оставляйте её на стоянке у Западных ворот (Ата-Дарваза). Ставка обычно 20 – 30 тысяч сум за сутки, под охраной." },
        { type: "h2", text: "Когда ехать" },
        { type: "p", text: "Лето в Хорезме — это 45 °C и пылевые бури, не лучшие условия для гранд-тура. Реалистичные окна: апрель – середина мая и середина сентября – октябрь. Зимой ехать можно, но пустынный участок становится ещё менее предсказуемым." },
        { type: "h2", text: "Какую машину брать" },
        { type: "p", text: "На Хиву мы выдаём только полноразмерные внедорожники и пикапы. Hyundai Tucson — минимально допустимый вариант для пары без перегруза. Toyota Land Cruiser Prado и Toyota Land Cruiser 200 — рабочие лошадки этого маршрута: высокий клиренс, выносливая подвеска, кондиционер не сдаётся в +40. Isuzu D-Max Irbis имеет смысл, если вы любите пикап-формат и едете без багажника на крыше. Все эти машины есть в каталоге Rentz.uz, и под маршрут на 7 дней мы готовим полный пакет: запасное колесо проверенное, омывайка, аптечка." },
      ],
      en: [
        { type: "p", text: "The first question we get is: can I drive to Khiva in a day? In practice, no — not as a sane human being. 1,100 km in Uzbekistan is not 1,100 km on a German autobahn. The real schedule reads Tashkent → Samarkand (4h) → Bukhara (3.5h) → Khiva (5 – 6h through desert). Total 12 – 14 hours of driving. Any sensible plan splits this across 3 – 4 days outbound." },
        { type: "h2", text: "A sensible 5 – 7 day itinerary" },
        { type: "ol", items: [
          "Day 1: Tashkent to Samarkand (4h), evening at Registan.",
          "Day 2: full day in Samarkand.",
          "Day 3: Samarkand to Bukhara (3.5h), evening at Lyab-i-Hauz.",
          "Day 4: full day in Bukhara.",
          "Day 5: Bukhara to Khiva across the Kyzylkum (5 – 6h), evening inside Ichan-Kala.",
          "Day 6: full day in Khiva.",
          "Day 7: return to Tashkent via Bukhara, or fly Urgench to Tashkent and drop the car at our branch — ask your manager about the option.",
        ]},
        { type: "h2", text: "About the Bukhara to Urgench desert leg" },
        { type: "p", text: "This stretch is the single reason you cannot do Khiva in a sedan. 450 kilometres across the Kyzylkum: desert, dust winds, temperature swings and asphalt that is sometimes 70% intact, sometimes 30%. In the worst sections you get deep potholes, sand drifts and crumbling shoulders. Fuel stations are sparse, cafés rarer; plan for two full refuels and a thermos of water. Mobile signal drops out for 30 – 60 minutes in places." },
        { type: "ul", items: [
          "Leave Bukhara with a full tank — the next reliable station is in Gazli (~100 km), then larger fuel stops are at Uchkuduk and Urgench.",
          "Do not start the desert leg after 14:00. Night driving here is hazardous because of trucks and limited visibility.",
          "Carry at least 5 litres of water per car and some snacks.",
          "Air-conditioning eats noticeably more fuel in summer — factor it in.",
        ]},
        { type: "h2", text: "Khiva and Ichan-Kala" },
        { type: "p", text: "Inside the walls of Ichan-Kala there are around 50 monuments across 26 hectares, and the whole walled city is a single UNESCO World Heritage site. Allow a day and a half to see it without rushing. Headline stops: the Kalta-Minor minaret (the famous unfinished turquoise stub), the Tash-Khauli palace with its iwans, the Juma mosque with 213 carved wooden columns, the Muhammad Amin Khan madrasa, and the Kunya-Ark with its viewing platform looking out over the entire fortress." },
        { type: "p", text: "Cars cannot enter inside the walls — park at the West Gate (Ota-Darvoza). Rate is usually 20 – 30 thousand soum per day with security." },
        { type: "h2", text: "When to go" },
        { type: "p", text: "Khorezm summer is 45°C and dust storms — not what you want for a grand tour. Realistic windows: April to mid-May and mid-September to October. Winter is doable, but the desert leg becomes even less predictable." },
        { type: "h2", text: "Which car for Khiva" },
        { type: "p", text: "We only release full-size SUVs and pickups for Khiva. The Hyundai Tucson is the minimum acceptable for a couple without overload. Toyota Land Cruiser Prado and Toyota Land Cruiser 200 are the workhorses of this route: real ground clearance, durable suspension, air-conditioning that stays alive at +40°C. The Isuzu D-Max Irbis pickup makes sense if you prefer the format and travel without a roof load. All of these are in the Rentz.uz fleet, and for a 7-day Khiva run we prepare the car with verified spare wheel, washer fluid topped up and a road first-aid kit." },
      ],
      uz: [
        { type: "p", text: "Birinchi savol odatda shu: bir kunda Xivaga yetib borib bo‘ladimi? Amalda — yo‘q, oddiy odam uchun. O‘zbekistondagi 1100 km nemis avtobaniga teng emas. Real jadval: Toshkent → Samarqand (4 soat) → Buxoro (3,5 soat) → Xiva (5 – 6 soat sahro orqali). Jami 12 – 14 soatlik haydash. Mantiqiy reja buni 3 – 4 kunga bo‘ladi." },
        { type: "h2", text: "Mantiqiy 5 – 7 kunlik reja" },
        { type: "ol", items: [
          "1-kun: Toshkent → Samarqand (4 s), kechqurun Registon.",
          "2-kun: kun bo‘yi Samarqand.",
          "3-kun: Samarqand → Buxoro (3,5 s), kechqurun Labi-Hovuz.",
          "4-kun: kun bo‘yi Buxoro.",
          "5-kun: Buxoro → Xiva, Qizilqum orqali (5 – 6 s), kechqurun Ichan-Qal’a.",
          "6-kun: kun bo‘yi Xiva.",
          "7-kun: Buxoro orqali Toshkentga qaytish; yoki Urganchdan Toshkentga uchish va avtomobilni filialga topshirish — menejerdan so‘rang.",
        ]},
        { type: "h2", text: "Buxoro – Urganch sahro qismi haqida" },
        { type: "p", text: "Aynan shu qism tufayli Xivaga sedanda borib bo‘lmaydi. Qizilqum orqali 450 km: sahro, changli shamol, harorat farqlari, asfalt ba’zan 70 foiz, ba’zan 30 foiz holatda. Eng yomon joylarda chuqur o‘ralar, qum bosgan qism, yo‘l chetidagi o‘pirilishlar bor. Yonilg‘i shoxobchalari kam, kafe yana ham kamroq — ikki to‘liq quyish va termos suvni rejalashtiring. Mobil aloqa 30 – 60 daqiqa uzilishi mumkin." },
        { type: "ul", items: [
          "Buxorodan to‘la bak bilan chiqing — keyingi ishonchli AZS Gazlida (~100 km), so‘ng Uchquduq va Urganchda.",
          "Sahro qismini soat 14:00 dan keyin boshlamang. Tunda yuk mashinalari va ko‘rinish yomonligi xavfli.",
          "Har avtomobil uchun kamida 5 litr suv va biron yengil ovqat oling.",
          "Yozda konditsioner ko‘proq yonilg‘i yeydi — buni hisobga oling.",
        ]},
        { type: "h2", text: "Xiva va Ichan-Qal’a" },
        { type: "p", text: "Ichan-Qal’a devorlari ichida 26 gektarda 50 ga yaqin yodgorlik, butun devorlangan shahar YUNESKO ro‘yxatida. Sekinroq ko‘rishga 1,5 kun kerak. Asosiylar: Kalta-Minor minorasi (mashhur tugatilmagan firuza minora), Tosh-Hovli saroyi va uning ayvonlari, 213 yog‘och ustunli Juma masjidi, Muhammad Amin-xon madrasasi va Ko‘hna Ark — uning kuzatish maydonchasidan butun qal’a ko‘rinadi." },
        { type: "p", text: "Devor ichiga avtomobil kira olmaydi — G‘arbiy darvoza (Ota-Darvoza) yonida qoldiring. Sutkasiga 20 – 30 ming so‘m, qo‘riqlanadi." },
        { type: "h2", text: "Qachon borish kerak" },
        { type: "p", text: "Xorazm yozi 45°C va chang bo‘ronlari — sayohat uchun mos emas. Real oynalar: aprel – may o‘rtasi va sentyabr o‘rtasi – oktyabr. Qishda ham bo‘ladi, lekin sahro qismi yanada nostabil bo‘ladi." },
        { type: "h2", text: "Qaysi avtomobilni olish kerak" },
        { type: "p", text: "Xiva uchun faqat to‘liq o‘lchamli SUV va pikaplarni beramiz. Hyundai Tucson — juftlik uchun minimum darajada qabul qilinadi. Toyota Land Cruiser Prado va Toyota Land Cruiser 200 — bu yo‘nalishning ish otlari: yuqori klirens, chidamli ressor, +40°C da ham yaxshi konditsioner. Isuzu D-Max Irbis pikap formatini yoqtirsangiz va tom yukisiz sayohat qilsangiz mos. Hammasi Rentz.uz katalogida, 7 kunlik Xiva uchun zahira g‘ildirak, oyna suvi va birinchi yordam quti tayyorlanadi." },
      ],
    },
    faqs: {
      ru: [
        { q: "За сколько часов реально доехать из Ташкента до Хивы?", a: "12 – 14 часов чистого времени за рулём. С остановками, постами и обедами это легко превращается в 16 – 18. Реалистично — разбить путь на 3 – 4 дня." },
        { q: "Обязательно ли брать внедорожник?", a: "Да. Участок Бухара – Ургенч проходит через пустыню Кызылкум, и качество асфальта там негарантированное. На седане вы рискуете подвеской и нервами. Минимум — кроссовер класса Tucson; оптимально — Prado, Land Cruiser 200 или D-Max." },
        { q: "Где заправляться в пустыне?", a: "Рабочие точки между Бухарой и Ургенчем — Газли, Учкудук, далее Ургенч. Между ними расстояния по 150 – 200 км, поэтому Бухару покидайте с полным баком." },
        { q: "Что показывать на постах?", a: "Паспорт, права, договор аренды от Rentz.uz. На дальних постах могут попросить открыть багажник — нормальная процедура. На границе Каракалпакстана не делают ничего особенного, это часть Узбекистана." },
        { q: "Где ночевать в Хиве?", a: "В пределах Ичан-Калы много гостевых домов в реставрированных медресе и старых усадьбах — Orient Star, Malika Kheivak, Khorezm Palace. Парковка обычно на стоянке у Ата-Дарваза или у Северных ворот." },
        { q: "Можно ли сдать машину в Ургенче и улететь в Ташкент?", a: "Да, мы оборудуем такой возврат по индивидуальной договорённости — спросите менеджера при бронировании. Это удобно, если на обратную дорогу нет сил или времени." },
        { q: "Когда лучше всего ехать?", a: "Апрель – середина мая и середина сентября – октябрь. Лето в Хорезме — это 45 °C и пыльные бури, ехать можно, но удовольствие сильно меньше." },
      ],
      en: [
        { q: "Realistically, how long does Tashkent to Khiva take?", a: "12 – 14 hours of pure driving. Add stops, checkpoints and meals and it easily becomes 16 – 18. Sensible plans break the trip into 3 – 4 days." },
        { q: "Is an SUV really mandatory?", a: "Yes. The Bukhara to Urgench leg crosses the Kyzylkum and the asphalt quality is not guaranteed. A sedan risks suspension damage and a bad time. Tucson is the minimum; Prado, Land Cruiser 200 or D-Max are the comfortable picks." },
        { q: "Where do I refuel in the desert?", a: "The working stations between Bukhara and Urgench are at Gazli, Uchkuduk, then Urgench. Distances between them run 150 – 200 km, so leave Bukhara with a full tank." },
        { q: "What documents at police checkpoints?", a: "Passport, driving licence and the Rentz.uz rental contract. On remote checkpoints you may be asked to open the boot — that is routine. The Karakalpakstan border is not a hard border; it is part of Uzbekistan." },
        { q: "Where to stay in Khiva?", a: "Inside Ichan-Kala there are guesthouses in restored madrasas and old courtyards — Orient Star, Malika Kheivak, Khorezm Palace. Parking is at the Ota-Darvoza or North Gate lots." },
        { q: "Can I drop the car in Urgench and fly back?", a: "Yes, we arrange that on case-by-case terms — ask your manager at booking. Useful when you have no time or energy for the return drive." },
        { q: "When is the best time to go?", a: "April through mid-May and mid-September through October. Khorezm summer is 45°C with dust storms — possible, but a lot less pleasant." },
      ],
      uz: [
        { q: "Toshkentdan Xivaga real qancha vaqt ketadi?", a: "Sof haydash 12 – 14 soat. To‘xtashlar, postlar, ovqat bilan 16 – 18 soat. Mantiqiy reja — 3 – 4 kunga bo‘lish." },
        { q: "SUV haqiqatan majburiymi?", a: "Ha. Buxoro – Urganch oralig‘i Qizilqumdan o‘tadi va asfalt sifati kafolatlanmagan. Sedanda ressorga zarar va asabbuzarlikka tayyor turing. Tucson — minimum, Prado, Land Cruiser 200 yoki D-Max — qulay tanlov." },
        { q: "Sahroda qayerda yonilg‘i quyish mumkin?", a: "Buxoro va Urganch oralig‘ida ishlaydigan AZS lar — Gazli, Uchquduq, keyin Urganch. Orasida 150 – 200 km, shuning uchun Buxorodan to‘la bak bilan chiqing." },
        { q: "Postlarda qanday hujjat kerak?", a: "Pasport, haydovchilik guvohnomasi va Rentz.uz shartnomasi. Uzoq postlarda yuk joyiga qarab qo‘yishlari mumkin — bu odatiy. Qoraqalpog‘iston chegarasi qattiq chegara emas, u O‘zbekiston tarkibida." },
        { q: "Xivada qayerda tunash?", a: "Ichan-Qal’a ichida ta’mirlangan madrasa va eski hovlilarda mehmon uylari bor — Orient Star, Malika Kheivak, Khorezm Palace. Avtomobil Ota-Darvoza yoki Shimoliy darvoza yonida qoldiriladi." },
        { q: "Avtomobilni Urganchda qoldirib, samolyotda qaytsa bo‘ladimi?", a: "Ha, individual kelishuv asosida tashkillaymiz — bron paytida menejerdan so‘rang. Qaytishga vaqt yoki kuch bo‘lmaganda qulay." },
        { q: "Qachon borish yaxshi?", a: "Aprel – may o‘rtasi va sentyabr o‘rtasi – oktyabr. Xorazm yozi 45°C va chang bo‘ronlari — bo‘ladi, lekin ancha noqulay." },
      ],
    },
    recommendedCarSlugs: ["hyundai-tucson", "toyota-land-cruiser-prado", "toyota-land-cruiser-200", "isuzu-d-max-irbis"],
  },
  {
    slug: "chimgan",
    cover: "/design/generated-1776872206548.png",
    city: "Chimgan",
    facts: {
      distanceKm: 80,
      drivingHours: "1.5 hours",
      bestSeason: {
        ru: "октябрь – март (горы), июнь – август (треккинг)",
        en: "October – March (snow), June – August (trekking)",
        uz: "oktyabr – mart (qor), iyun – avgust (yurish)",
      },
      recommendedClass: {
        ru: "Кроссовер или внедорожник",
        en: "Crossover or SUV",
        uz: "Krossover yoki SUV",
      },
    },
    title: {
      ru: "Аренда авто Ташкент – Чимган: горы и Чарвак за 1,5 часа | Rentz.uz",
      en: "Tashkent to Chimgan: Mountains and Charvak in 90 Minutes | Rentz.uz",
      uz: "Toshkent – Chimg‘on: tog‘lar va Chorvoq 1,5 soatda | Rentz.uz",
    },
    description: {
      ru: "Однодневная поездка из Ташкента в Чимган и Бельдерсай: 80 км, 1,5 часа, маршруты через Хосилот и Чарвакское водохранилище. Какой авто выбрать летом и зимой.",
      en: "A day trip from Tashkent to Chimgan and Beldersay: 80 km, 1.5 hours, via the Khosilot or Charvak Reservoir route. The right car for summer and winter.",
      uz: "Toshkentdan Chimg‘on va Beldarsoyga bir kunlik sayohat: 80 km, 1,5 soat, Hosilot yoki Chorvoq suv ombori orqali. Yoz va qish uchun avtomobil tanlovi.",
    },
    h1: {
      ru: "Чимган и Бельдерсай: горы рядом с Ташкентом",
      en: "Chimgan and Beldersay: Mountains Next Door to Tashkent",
      uz: "Chimg‘on va Beldarsoy: Toshkent yonidagi tog‘lar",
    },
    intro: {
      ru: "Чимган — это «домашние горы» Ташкента. 80 километров, полтора часа за рулём, и вы из тридцатиградусного города попадаете в тенистую долину или, зимой, на горнолыжный склон. Это самая частая однодневная поездка наших клиентов: машину можно вернуть тем же вечером.",
      en: "Chimgan is Tashkent’s home mountain range. 80 kilometres, ninety minutes of driving, and you swap a 30-degree city for a shaded valley — or, in winter, a ski slope. This is our most popular day-trip booking: collect in the morning, return the same evening.",
      uz: "Chimg‘on — Toshkentning «uy tog‘lari». 80 kilometr, 1,5 soatlik haydash va siz 30 darajali shahardan soyaviy vodiyga, qishda esa chang‘i yonbag‘riga o‘tasiz. Mijozlarimiz orasida eng mashhur bir kunlik sayohat: ertalab olasiz, kechqurun qaytarasiz.",
    },
    body: {
      ru: [
        { type: "p", text: "Маршрут хорош тем, что у него есть варианты. Прямая дорога — через Газалкент и далее на Чимган, идёт около часа сорока. Живописная — через Хосилот и Чарвакское водохранилище: чуть длиннее по времени, но виды того стоят. На обратном пути обычно меняют направление, чтобы не повторяться." },
        { type: "h2", text: "Что вы увидите" },
        { type: "p", text: "Чарвакское водохранилище — большое бирюзовое озеро в горном кольце, видно с десятков точек по дороге. Летом там купаются, зимой просто фотографируют. Сам Чимган — это поселок и горнолыжный курорт у подножия Большого Чимгана (3309 м). Бельдерсай в 8 километрах дальше — там более длинные склоны и канатка. Летом обе точки превращаются в стартовую базу для треккинга к Гульнаре и водопадам." },
        { type: "ul", items: [
          "Зимой (декабрь – март): горные лыжи, сноуборд, прокат на месте, склоны от 800 до 2200 метров.",
          "Лето (июнь – август): треккинг, канатка работает, в горах прохладнее на 8 – 12 °C.",
          "Осень (сентябрь – октябрь): лучшее время для пеших маршрутов и фотографии.",
          "Апрель – май лучше пропустить: грунтовки превращаются в кашу, склоны грязные и опасные.",
        ]},
        { type: "h2", text: "Дорога: что нужно знать" },
        { type: "p", text: "До Газалкента — обычная двухполосная трасса, асфальт хороший. После Газалкента дорога идёт серпантином: не критично, но в зимнем гололёде требует уверенности. Зимой колёса должны быть зимние (что у нас в Rentz.uz штатно с декабря по март), а сама поездка иногда требует цепей — на въезде в зону снега их выдают и снимают на постах ГАИ." },
        { type: "ul", items: [
          "Заправляйтесь в Ташкенте до выезда. На самой трассе АЗС есть в Газалкенте, дальше реже.",
          "На въезде в Бостанлыкский район иногда работают экологические/курортные посты, на них смотрят паспорт и иногда берут небольшой сбор за машину (5 – 10 тыс. сум).",
          "Связь по всей дороге устойчивая, в горах слабее, но не пропадает.",
          "Парковка в Чимгане у канатки бесплатная или 5 – 10 тыс. сум, в Бельдерсае похожая ситуация.",
        ]},
        { type: "h2", text: "Чарвак как самостоятельная цель" },
        { type: "p", text: "Если в Чимган не хочется подниматься, можно сделать день у Чарвака: пляж в Бричмулле, прокат катамаранов, рыба и плов в кафе на берегу. С детьми это часто более удачный вариант — без серпантинов, без перепадов давления, и день получается ленивее." },
        { type: "h2", text: "Какую машину взять" },
        { type: "p", text: "На лето идеально подходит компактный кроссовер: Chevrolet Tracker 2 экономичен и легко справляется с подъёмами, Chevrolet Equinox — чуть просторнее и тише. Если едете семьёй или планируете заехать на грунтовку к водопадам, выбирайте Hyundai Tucson — клиренс выше, объём багажника больше. Зимой, особенно после снегопада, я лично рекомендую Toyota Prado 120 — это рамный полный привод, на снежном серпантине ведёт себя совсем по-другому, чем кроссоверы. У Rentz.uz все эти модели есть в Ташкенте, и их можно взять буквально на сутки." },
      ],
      en: [
        { type: "p", text: "What makes this route nice is that it has options. The direct road runs through Gazalkent straight up to Chimgan and takes about 1h 40m. The scenic alternative goes via Khosilot and the Charvak Reservoir — slightly longer, but the views earn the extra minutes. Most people swap directions for the way back to avoid repeating themselves." },
        { type: "h2", text: "What you actually see" },
        { type: "p", text: "Charvak Reservoir is a big turquoise lake ringed by mountains, visible from dozens of points along the road. People swim in it in summer and photograph it in winter. Chimgan itself is a small settlement and ski resort at the foot of Greater Chimgan (3,309 m). Beldersay, 8 km further on, has longer slopes and a chairlift. In summer both turn into trekking bases for routes towards Gulnara and the local waterfalls." },
        { type: "ul", items: [
          "Winter (December – March): skiing, snowboarding, on-site rental, slopes from 800 to 2,200 metres.",
          "Summer (June – August): trekking, chairlift running, mountain air is 8 – 12°C cooler than the city.",
          "Autumn (September – October): best season for hiking and photography.",
          "April and May are best skipped: gravel turns to mud and slopes become greasy and unsafe.",
        ]},
        { type: "h2", text: "What the road is like" },
        { type: "p", text: "The road to Gazalkent is normal two-lane asphalt in decent condition. Past Gazalkent it becomes a switchback — not extreme, but in winter ice it asks for confidence. In winter you need winter tyres (Rentz.uz fits them by default from December through March) and occasionally chains, which the traffic police hand out and remove at posts on the snowline." },
        { type: "ul", items: [
          "Refuel in Tashkent before leaving. There are stations in Gazalkent, sparser beyond.",
          "There can be a Bostanliq district environmental/resort checkpoint that looks at your passport and may charge a small per-vehicle fee (5 – 10 thousand soum).",
          "Mobile coverage along the road is stable, slightly weaker in the mountains but not lost.",
          "Parking at the Chimgan and Beldersay lifts is either free or 5 – 10 thousand soum.",
        ]},
        { type: "h2", text: "Charvak as the destination on its own" },
        { type: "p", text: "If you do not want to climb up to Chimgan, you can spend the day at Charvak instead: the Brichmulla beach, pedal boats, fish and plov at lakeside cafés. With kids this is often the better call — no switchbacks, no altitude, and the day stays lazy." },
        { type: "h2", text: "Which car to choose" },
        { type: "p", text: "Summer is perfect for a compact crossover: the Chevrolet Tracker 2 is economical and climbs the inclines without complaining, and the Chevrolet Equinox adds space and quieter cabin. If you travel as a family or want to detour onto the gravel near the waterfalls, the Hyundai Tucson gives you more clearance and luggage room. In winter — especially after fresh snow — we point people at the Toyota Prado 120: a body-on-frame proper 4x4, which behaves completely differently from a crossover on a snowy switchback. All of these are in the Rentz.uz Tashkent fleet and can be rented for a single day." },
      ],
      uz: [
        { type: "p", text: "Bu yo‘nalishning yaxshi tomoni — variantlar bor. To‘g‘ri yo‘l G‘azalkent orqali bevosita Chimg‘onga olib boradi, taxminan 1 soatu 40 daqiqa. Manzarali yo‘l Hosilot va Chorvoq suv ombori orqali — birozga uzunroq, lekin manzaralar buni qoplaydi. Ko‘pchilik qaytishda boshqa yo‘ldan ketadi." },
        { type: "h2", text: "Nimani ko‘rasiz" },
        { type: "p", text: "Chorvoq suv ombori — tog‘lar bilan o‘ralgan katta firuza ko‘l, yo‘l bo‘ylab o‘nlab nuqtadan ko‘rinadi. Yozda cho‘miladi, qishda foto. Chimg‘onning o‘zi — Katta Chimg‘on (3309 m) etagidagi qishloq va chang‘i kurorti. Beldarsoy 8 km uzoqlikda, yonbag‘irlar uzunroq, kanat yo‘li bor. Yozda ikkalasi ham Gulnora va sharsharalarga yurish boshlash bazasiga aylanadi." },
        { type: "ul", items: [
          "Qish (dekabr – mart): chang‘i, snoubord, joyida prokat, yonbag‘irlar 800 – 2200 metr.",
          "Yoz (iyun – avgust): yurish, kanat ishlaydi, tog‘ havosi shahardan 8 – 12°C salqinroq.",
          "Kuz (sentyabr – oktyabr): piyoda yurish va foto uchun eng yaxshi mavsum.",
          "Aprel va may o‘tkazib yuborgan ma’qul: tuproq yo‘l balchiqqa aylanadi, yonbag‘irlar sirpanchiq.",
        ]},
        { type: "h2", text: "Yo‘l haqida" },
        { type: "p", text: "G‘azalkentgacha — odatdagi ikki qatorli asfalt, holati yaxshi. G‘azalkentdan keyin serpantin boshlanadi: og‘ir emas, lekin qishda muzlikda ishonch kerak. Qishda qishki shinalar shart (Rentz.uz da dekabr – mart oralig‘ida standart). Ba’zan zanjir kerak bo‘ladi — uni qor zonasi kirish postida YPX beradi va olib qoladi." },
        { type: "ul", items: [
          "Yonilg‘ini Toshkentda quyib chiqing. G‘azalkentda AZS bor, undan keyin kamroq.",
          "Bo‘stonliq tumaniga kirishda ekologik/kurort posti pasportni qaraydi va ba’zan kichik to‘lov oladi (5 – 10 ming so‘m).",
          "Mobil aloqa yo‘l bo‘ylab barqaror, tog‘da kuchsizroq, lekin yo‘qolmaydi.",
          "Chimg‘on va Beldarsoy ko‘taruvchilari yonidagi avtoturargoh bepul yoki 5 – 10 ming so‘m.",
        ]},
        { type: "h2", text: "Chorvoqni alohida maqsad sifatida" },
        { type: "p", text: "Chimg‘onga ko‘tarilishni xohlamasangiz, kunni Chorvoqda o‘tkazing: Brichmulla plyaji, katamaran, ko‘l bo‘yidagi kafeda baliq va osh. Bolalar bilan ko‘pincha yaxshiroq variant — serpantin yo‘q, balandlik yo‘q, kun yengilroq o‘tadi." },
        { type: "h2", text: "Qaysi avtomobilni olish kerak" },
        { type: "p", text: "Yoz uchun ixcham krossover ideal: Chevrolet Tracker 2 tejamkor va ko‘tarilishlarda yaxshi ishlaydi, Chevrolet Equinox kengroq va jimroq. Oila bilan yoki sharshara yonidagi tuproq yo‘lga burilmoqchi bo‘lsangiz, Hyundai Tucson — klirens va yuk joyi ko‘proq. Qishda, ayniqsa qordan keyin, biz Toyota Prado 120 ni tavsiya qilamiz: ramali to‘liq yurituvchi, qor serpantinida krossoverdan butunlay boshqacha tutadi. Hammasi Rentz.uz Toshkent katalogida, hatto bir kunga ham olinadi." },
      ],
    },
    faqs: {
      ru: [
        { q: "Сколько ехать из Ташкента до Чимгана?", a: "По прямому маршруту через Газалкент — около 1 ч 30 мин – 1 ч 40 мин в одну сторону. Через Чарвакское водохранилище получится на 20 – 30 минут дольше, но красивее." },
        { q: "Можно ли за один день и съездить, и вернуться?", a: "Да, это самый частый формат. Выезд в 8 – 9 утра, к обеду вы на месте, вечером возвращаетесь в Ташкент. Машину при необходимости можно сдать в тот же день." },
        { q: "Нужен ли полный привод летом?", a: "Не обязательно. Кроссовер уровня Chevrolet Tracker 2 или Hyundai Tucson спокойно делает маршрут летом. 4WD имеет смысл, если планируете грунтовки к менее популярным точкам." },
        { q: "А зимой?", a: "Зимой мы рекомендуем рамный внедорожник вроде Toyota Prado 120 или хороший кроссовер с полным приводом. Шипованные/зимние шины у нас стоят с декабря по март по умолчанию. После снегопадов на постах могут потребовать цепи." },
        { q: "Что брать с собой?", a: "Зимой — тёплую одежду, перчатки, очки от солнца. Летом — воду, головной убор, простые походные кроссовки, если планируете прогулку. На пляже Чарвака полезен крем от солнца." },
        { q: "Где поесть?", a: "На Чарваке десятки кафе и рыбных ресторанов. В Чимгане работают точки у канатки, в Бельдерсае — небольшой ресторан в гостинице. Местная рыба, плов, шашлык — стандартный набор и обычно вкусный." },
      ],
      en: [
        { q: "How long is the drive from Tashkent to Chimgan?", a: "Direct via Gazalkent: about 1h 30m – 1h 40m one way. Via Charvak Reservoir adds 20 – 30 minutes but is the prettier route." },
        { q: "Can I do it as a same-day trip?", a: "Yes — this is the typical format. Leave at 8 – 9 a.m., arrive by lunch, drive back in the evening. The car can be returned the same day if you wish." },
        { q: "Do I need 4x4 in summer?", a: "Not really. A crossover such as the Chevrolet Tracker 2 or Hyundai Tucson handles the route easily in summer. 4x4 only matters if you plan to detour onto gravel toward less-visited spots." },
        { q: "What about winter?", a: "In winter we recommend a body-on-frame SUV such as the Toyota Prado 120 or a strong AWD crossover. Winter tyres are fitted by default from December through March. After heavy snowfall, traffic police may require chains at the snowline." },
        { q: "What should I bring?", a: "Winter: warm layers, gloves, sunglasses (snow glare). Summer: water, hat, light hiking shoes if you plan a walk. Sunscreen helps at Charvak beach." },
        { q: "Where to eat?", a: "Around Charvak there are dozens of cafés and fish restaurants. Chimgan has eateries by the chairlift; Beldersay has a small hotel restaurant. Local fish, plov, shashlik — the usual line-up and typically good." },
      ],
      uz: [
        { q: "Toshkentdan Chimg‘ongacha qancha vaqt?", a: "G‘azalkent orqali to‘g‘ri yo‘l: bir tomonga 1 soat 30 – 40 daqiqa. Chorvoq orqali 20 – 30 daqiqa uzunroq, lekin chiroyliroq." },
        { q: "Bir kunda borib qaytsa bo‘ladimi?", a: "Ha, eng keng tarqalgan format. Soat 8 – 9 da chiqib, tushlikgacha yetib borasiz, kechqurun qaytasiz. Avtomobilni o‘sha kuni ham qaytarsa bo‘ladi." },
        { q: "Yozda 4x4 kerakmi?", a: "Albatta emas. Chevrolet Tracker 2 yoki Hyundai Tucson kabi krossover yozda yo‘nalishni bemalol bajaradi. 4x4 faqat tuproq yo‘lga burilmoqchi bo‘lsangiz kerak." },
        { q: "Qishda-chi?", a: "Qishda Toyota Prado 120 kabi ramali SUV yoki kuchli AWD krossoverni tavsiya qilamiz. Qishki shinalar dekabr – mart oralig‘ida standart. Ko‘p qor yog‘gandan keyin postda zanjir talab qilinishi mumkin." },
        { q: "O‘zim bilan nima olib chiqishim kerak?", a: "Qish: issiq kiyim, qo‘lqop, quyosh ko‘zoynagi. Yoz: suv, bosh kiyim, oddiy yurish poyabzal. Chorvoq plyajida quyosh kremi foydali." },
        { q: "Qayerda ovqatlanish mumkin?", a: "Chorvoq atrofida o‘nlab kafe va baliq restoranlari. Chimg‘onda kanat yonidagi joylar, Beldarsoyda kichik mehmonxona restorani. Mahalliy baliq, osh, shashlik — odatda mazali." },
      ],
    },
    recommendedCarSlugs: ["chevrolet-tracker-2", "hyundai-tucson", "toyota-prado-120", "chevrolet-equinox"],
  },
];

export const DESTINATION_SLUGS = DESTINATIONS.map((d) => d.slug);

export function getDestinationBySlug(slug: string): Destination | undefined {
  return DESTINATIONS.find((d) => d.slug === slug);
}
