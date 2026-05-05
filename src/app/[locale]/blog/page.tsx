import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { POSTS, type BlogLocale } from "@/content/blog";

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
    alternates: {
      canonical: `/${locale}/blog`,
      languages: { ru: "/ru/blog", uz: "/uz/blog", en: "/en/blog", "x-default": "/en/blog" },
    },
  };
}

function pickLocale(locale: string): BlogLocale {
  return locale === "en" ? "en" : "ru";
}

function formatDate(iso: string, locale: string) {
  const d = new Date(iso);
  return d.toLocaleDateString(locale === "en" ? "en-US" : "ru-RU", {
    year: "numeric", month: "long", day: "numeric",
  });
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const l = pickLocale(locale);

  const sorted = [...POSTS].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
  const [hero, ...rest] = sorted;

  return (
    <>
      <section className="bg-[#FFF7ED]">
        <div className="mx-auto max-w-[1312px] px-6 md:px-16 py-14">
          <nav className="flex items-center gap-1.5 text-[13px] text-[#9CA3AF] mb-5" aria-label="Breadcrumb">
            <Link href={`/${locale}`} className="hover:text-[#F97316]">{locale === "en" ? "Home" : "Главная"}</Link>
            <span>›</span>
            <span className="text-[#1A1A2E]">{locale === "en" ? "Blog" : "Блог"}</span>
          </nav>
          <h1 className="text-[36px] sm:text-[42px] md:text-[48px] font-bold text-[#1A1A2E] leading-[1.15]">
            {locale === "en" ? "Blog" : "Блог"}
          </h1>
          <p className="mt-3 text-[16px] text-[#4B5563] max-w-[620px]">
            {locale === "en"
              ? "Practical tips, road-trip routes and car reviews for travelling Uzbekistan."
              : "Практические советы, маршруты путешествий и обзоры авто для поездок по Узбекистану."}
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-[1312px] px-6 md:px-16 py-14">
          {hero && (
            <Link
              href={`/${locale}/blog/${hero.slug}`}
              className="grid md:grid-cols-2 gap-8 items-center bg-white rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)] transition mb-10"
            >
              <div className="relative aspect-[16/10] md:aspect-auto md:h-[360px] bg-[#F5F5F0]">
                <Image src={hero.cover} alt={hero.title[l]} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" priority />
              </div>
              <div className="p-6 md:p-10 space-y-4">
                <span className="inline-flex items-center rounded-full bg-[#FFF7ED] text-[#F97316] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider">{hero.category[l]}</span>
                <h2 className="text-[24px] md:text-[30px] font-bold text-[#1A1A2E] leading-[1.2]">{hero.title[l]}</h2>
                <p className="text-[15px] text-[#4B5563] leading-[1.6] line-clamp-3">{hero.excerpt[l]}</p>
                <div className="flex items-center gap-4 text-[13px] text-[#9CA3AF] pt-1">
                  <span>{formatDate(hero.publishedAt, locale)}</span>
                  <span>·</span>
                  <span>{hero.readMinutes} {locale === "en" ? "min read" : "мин"}</span>
                </div>
              </div>
            </Link>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((p) => (
              <Link
                key={p.slug}
                href={`/${locale}/blog/${p.slug}`}
                className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)] transition flex flex-col"
              >
                <div className="relative aspect-[16/10] bg-[#F5F5F0]">
                  <Image src={p.cover} alt={p.title[l]} fill sizes="(min-width: 1024px) 400px, 50vw" className="object-cover" />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <span className="text-[11px] uppercase tracking-wider text-[#F97316] font-semibold">{p.category[l]}</span>
                  <h3 className="text-[17px] font-bold text-[#1A1A2E] mt-2 leading-snug">{p.title[l]}</h3>
                  <p className="text-[13px] text-[#4B5563] mt-2 line-clamp-3 leading-[1.55] flex-1">{p.excerpt[l]}</p>
                  <div className="flex items-center gap-3 mt-4 pt-3 border-t border-[#F5F5F0] text-[12px] text-[#9CA3AF]">
                    <span>{formatDate(p.publishedAt, locale)}</span>
                    <span>·</span>
                    <span>{p.readMinutes} {locale === "en" ? "min" : "мин"}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
