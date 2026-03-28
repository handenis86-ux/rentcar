import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";

/* ─── Meta ─────────────────────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: `О компании — ${t("siteName")}`,
    description: "Узнайте о компании RentCar — надёжный прокат автомобилей по всему Узбекистану.",
  };
}

/* ─── Inline SVG Icons ─────────────────────────────────────────────────── */

function IconShield({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function IconCheck({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function IconClock({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function IconStar({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function IconChevronRight({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function IconArrowRight({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

/* ─── Static data ───────────────────────────────────────────────────────── */

const STATS = [
  { value: "200+",    label: "Автомобилей в парке" },
  { value: "12",      label: "Городов Узбекистана"  },
  { value: "15 000+", label: "Довольных клиентов"   },
  { value: "7 лет",   label: "На рынке"              },
];

const WHY_CARDS = [
  {
    icon: IconShield,
    title: "Полная страховка",
    desc:  "Все автомобили застрахованы по КАСКО и ОСАГО. Вы в безопасности в любой ситуации на дороге.",
  },
  {
    icon: IconCheck,
    title: "Прозрачные цены",
    desc:  "Никаких скрытых платежей. Цена при бронировании — это финальная цена без сюрпризов.",
  },
  {
    icon: IconClock,
    title: "Поддержка 24/7",
    desc:  "Наша служба поддержки доступна круглосуточно по телефону и в мессенджерах.",
  },
  {
    icon: IconStar,
    title: "Качественный сервис",
    desc:  "Регулярное техническое обслуживание автомобилей и строгий контроль качества на каждом этапе.",
  },
];

/* ─── Page Component ───────────────────────────────────────────────────── */

export default function AboutPage() {
  const tCommon = useTranslations("common");

  return (
    <>
      {/* ── 1. HERO BANNER ─────────────────────────────────────────────── */}
      <section className="bg-[#f5f5f5] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-gray-400 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#FFA633] transition-colors">
              Главная
            </Link>
            <IconChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="text-[#2F2F2F] font-medium">О нас</span>
          </nav>

          {/* Title */}
          <h1 className="text-3xl font-bold text-[#201F1D] mb-3">
            О компании RentCar
          </h1>
          <p className="text-gray-500 max-w-xl">
            Мы делаем аренду автомобилей простой, удобной и доступной для каждого жителя и гостя Узбекистана.
          </p>

        </div>
      </section>

      {/* ── 2. COMPANY INFO ────────────────────────────────────────────── */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Left — text */}
            <div className="space-y-5">
              <h2 className="text-2xl font-bold text-[#201F1D]">
                Кто мы такие
              </h2>
              <p className="text-[#2F2F2F] leading-relaxed">
                RentCar — ведущая платформа аренды автомобилей в Узбекистане. Мы работаем с 2017 года и за это время помогли более чем 15 000 клиентам найти идеальный автомобиль для любых задач — от деловых поездок до семейных путешествий.
              </p>
              <p className="text-[#2F2F2F] leading-relaxed">
                <span className="font-semibold text-[#201F1D]">Наша миссия</span> — сделать аренду автомобиля такой же простой, как вызов такси. Мы убрали всю лишнюю бюрократию: бронирование занимает три минуты, автомобиль доставляется в удобное место, а поддержка работает круглосуточно.
              </p>
              <p className="text-[#2F2F2F] leading-relaxed">
                <span className="font-semibold text-[#201F1D]">Наши ценности</span> — честность, надёжность и забота о клиенте. Никаких скрытых платежей, никаких неприятных сюрпризов. Только прозрачные условия и качественный сервис.
              </p>
              <p className="text-[#2F2F2F] leading-relaxed">
                Сегодня наш автопарк насчитывает более 200 автомобилей в 12 городах страны: от бюджетных моделей до премиальных внедорожников. Мы постоянно обновляем парк, чтобы вы всегда ездили на современных и технически исправных машинах.
              </p>
            </div>

            {/* Right — stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {STATS.map(({ value, label }) => (
                <div
                  key={label}
                  className="bg-[#f5f5f5] rounded-xl p-6 flex flex-col items-center text-center"
                >
                  <span className="text-4xl font-extrabold text-[#FFA633] leading-none">
                    {value}
                  </span>
                  <span className="mt-2 text-sm text-[#2F2F2F] font-medium">
                    {label}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. WHY CHOOSE US ───────────────────────────────────────────── */}
      <section className="bg-[#f5f5f5] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <h2 className="text-2xl font-bold text-[#201F1D] text-center mb-3">
            Почему выбирают нас
          </h2>
          <p className="text-gray-500 text-center max-w-2xl mx-auto mb-10">
            Мы делаем аренду автомобиля простой и безопасной для каждого клиента.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHY_CARDS.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col items-start"
              >
                {/* Orange icon circle */}
                <div className="h-12 w-12 rounded-full bg-[#FFF3E0] flex items-center justify-center text-[#FFA633] mb-4 flex-shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-[#201F1D] mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 4. CONTACT CTA ─────────────────────────────────────────────── */}
      <section className="bg-[#201F1D] py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">
            Есть вопросы?
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
            Наша команда готова ответить на любые вопросы и помочь выбрать подходящий автомобиль.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#FFA633] hover:bg-[#e8952d] text-white rounded-full px-8 py-3.5 font-semibold transition"
          >
            Связаться с нами
            <IconArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
