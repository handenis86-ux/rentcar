import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

/* ─── Meta ──────────────────────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "BlogPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

/* ─── Mock data ─────────────────────────────────────────────────────────── */

const POSTS = [
  {
    id: 1,
    title: "Топ-10 маршрутов для автопутешествия по Узбекистану",
    category: "Путешествия",
    excerpt:
      "Узбекистан богат уникальными достопримечательностями. Мы собрали лучшие маршруты для самостоятельного путешествия на арендованном автомобиле — от Ташкента до Нукуса.",
    date: "15 марта 2026",
    readTime: "7 мин",
    colorClass: "bg-orange-50",
    badgeColor: "bg-orange-100 text-orange-600",
  },
  {
    id: 2,
    title: "Как выбрать автомобиль для аренды: гид для начинающих",
    category: "Советы",
    excerpt:
      "Первый раз арендуете машину? Рассказываем, на что обратить внимание при выборе класса авто, какие документы взять с собой и как избежать скрытых платежей.",
    date: "10 марта 2026",
    readTime: "5 мин",
    colorClass: "bg-teal-50",
    badgeColor: "bg-teal-100 text-teal-600",
  },
  {
    id: 3,
    title: "Новые правила аренды авто в Узбекистане 2026",
    category: "Новости",
    excerpt:
      "С 1 января 2026 года вступили в силу изменения в законодательстве об аренде транспортных средств. Разбираем, что изменилось и как это влияет на арендаторов.",
    date: "5 марта 2026",
    readTime: "4 мин",
    colorClass: "bg-blue-50",
    badgeColor: "bg-blue-100 text-blue-600",
  },
  {
    id: 4,
    title: "Самарканд–Бухара на машине: полный гид",
    category: "Путешествия",
    excerpt:
      "Маршрут Самарканд–Бухара — один из самых живописных в Центральной Азии. Подробный путеводитель: дорожное покрытие, заправки, отели и обязательные остановки.",
    date: "1 марта 2026",
    readTime: "9 мин",
    colorClass: "bg-orange-50",
    badgeColor: "bg-orange-100 text-orange-600",
  },
  {
    id: 5,
    title: "Электромобили в аренду: BYD Song Plus обзор",
    category: "Обзоры",
    excerpt:
      "BYD Song Plus появился в нашем парке в 2025 году. Делимся честным обзором электромобиля: запас хода, зарядная инфраструктура Ташкента и впечатления клиентов.",
    date: "25 февраля 2026",
    readTime: "6 мин",
    colorClass: "bg-teal-50",
    badgeColor: "bg-teal-100 text-teal-600",
  },
  {
    id: 6,
    title: "Корпоративная аренда: как сэкономить до 30%",
    category: "Бизнес",
    excerpt:
      "Корпоративные клиенты получают специальные условия: персональный менеджер, единый счёт, скидки от объёма. Рассказываем, как перейти на корпоративный тариф.",
    date: "20 февраля 2026",
    readTime: "5 мин",
    colorClass: "bg-blue-50",
    badgeColor: "bg-blue-100 text-blue-600",
  },
] as const;

/* ─── Inline SVG Icons ───────────────────────────────────────────────────── */

function IconClock({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function IconCalendar({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function IconChevronRight({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

/* ─── Blog Card ──────────────────────────────────────────────────────────── */

function BlogCard({
  post,
  locale,
}: {
  post: (typeof POSTS)[number];
  locale: Locale;
}) {
  return (
    <article className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col">
      {/* Colored placeholder with category badge */}
      <div className={`${post.colorClass} h-48 relative flex items-end p-4 flex-shrink-0`}>
        <span
          className={`${post.badgeColor} text-xs font-semibold rounded-full px-3 py-1`}
        >
          {post.category}
        </span>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col gap-2 flex-1">
        {/* Category tag */}
        <span className="text-[#FFA633] text-xs font-semibold uppercase tracking-wide">
          {post.category}
        </span>

        {/* Title */}
        <h2 className="text-lg font-bold text-[#201F1D] leading-snug">
          <a
            href={`/${locale}/blog/${post.id}`}
            className="hover:text-[#FFA633] transition-colors"
          >
            {post.title}
          </a>
        </h2>

        {/* Excerpt */}
        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
          {post.excerpt}
        </p>

        {/* Date + read time */}
        <div className="flex items-center gap-4 text-xs text-gray-400 mt-auto pt-3 border-t border-gray-100">
          <span className="flex items-center gap-1">
            <IconCalendar />
            {post.date}
          </span>
          <span className="flex items-center gap-1">
            <IconClock />
            {post.readTime}
          </span>
        </div>
      </div>
    </article>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return (
    <>
      {/* ── Hero banner ──────────────────────────────────────────────────── */}
      <section className="bg-[#f5f5f5] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-1.5 text-sm text-gray-400 mb-6"
            aria-label="Breadcrumb"
          >
            <a
              href={`/${locale}`}
              className="hover:text-[#FFA633] transition-colors"
            >
              Главная
            </a>
            <IconChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="text-[#2F2F2F] font-medium">Блог</span>
          </nav>

          {/* Title */}
          <h1 className="text-3xl font-bold text-[#201F1D]">Блог</h1>
          <p className="mt-2 text-gray-500 text-base">
            Советы, обзоры и новости мира автопутешествий
          </p>
        </div>
      </section>

      {/* ── Blog grid ────────────────────────────────────────────────────── */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {POSTS.map((post) => (
              <BlogCard key={post.id} post={post} locale={locale} />
            ))}
          </div>

          {/* Pagination placeholder */}
          <div className="mt-12 flex justify-center">
            <nav
              className="flex items-center gap-2"
              aria-label="Pagination"
            >
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#FFA633] text-white text-sm font-semibold">
                1
              </span>
              <a
                href={`/${locale}/blog?page=2`}
                className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 text-gray-500 text-sm hover:border-[#FFA633] hover:text-[#FFA633] transition-colors"
              >
                2
              </a>
              <a
                href={`/${locale}/blog?page=3`}
                className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 text-gray-500 text-sm hover:border-[#FFA633] hover:text-[#FFA633] transition-colors"
              >
                3
              </a>
              <a
                href={`/${locale}/blog?page=2`}
                className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 text-gray-500 hover:border-[#FFA633] hover:text-[#FFA633] transition-colors"
                aria-label="Next page"
              >
                <IconChevronRight className="w-4 h-4" />
              </a>
            </nav>
          </div>
        </div>
      </section>
    </>
  );
}
