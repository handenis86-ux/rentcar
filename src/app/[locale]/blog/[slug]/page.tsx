import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { POSTS, type BlogLocale, type BlogPost, type BlogSection } from "@/content/blog";
import { CATALOG } from "@/lib/catalog";
import { CarImage } from "@/components/CarImage";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rentz.uz";

function pickLocale(locale: string): BlogLocale {
  return locale === "en" ? "en" : "ru";
}

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  const l = pickLocale(locale);
  return {
    title: post.title[l],
    description: post.excerpt[l],
    alternates: {
      canonical: `/${locale}/blog/${slug}`,
      languages: {
        ru: `/ru/blog/${slug}`,
        en: `/en/blog/${slug}`,
        uz: `/ru/blog/${slug}`,
        "x-default": `/en/blog/${slug}`,
      },
    },
    openGraph: {
      type: "article",
      title: post.title[l],
      description: post.excerpt[l],
      url: `/${locale}/blog/${slug}`,
      images: [{ url: post.cover, width: 1200, height: 630, alt: post.title[l] }],
      publishedTime: post.publishedAt,
    },
    twitter: { card: "summary_large_image", title: post.title[l], description: post.excerpt[l], images: [post.cover] },
  };
}

function Section({ s }: { s: BlogSection }) {
  switch (s.type) {
    case "h2":    return <h2 className="text-[24px] md:text-[28px] font-bold text-[#1A1A2E] mt-10 mb-3 leading-[1.2]">{s.text}</h2>;
    case "h3":    return <h3 className="text-[19px] md:text-[20px] font-semibold text-[#1A1A2E] mt-7 mb-2">{s.text}</h3>;
    case "p":     return <p className="text-[16px] text-[#374151] leading-[1.75] mt-3">{s.text}</p>;
    case "ul":    return <ul className="list-disc pl-6 mt-3 space-y-1.5 text-[16px] text-[#374151] leading-[1.7]">{s.items.map((it, i) => <li key={i}>{it}</li>)}</ul>;
    case "ol":    return <ol className="list-decimal pl-6 mt-3 space-y-1.5 text-[16px] text-[#374151] leading-[1.7]">{s.items.map((it, i) => <li key={i}>{it}</li>)}</ol>;
    case "quote": return <blockquote className="border-l-4 border-[#F97316] bg-[#FFF7ED] px-5 py-4 my-6 text-[16px] italic text-[#1A1A2E] leading-[1.7]">{s.text}</blockquote>;
  }
}

function formatDate(iso: string, locale: string) {
  const d = new Date(iso);
  return d.toLocaleDateString(locale === "en" ? "en-US" : locale === "uz" ? "uz-UZ" : "ru-RU", {
    year: "numeric", month: "long", day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) notFound();
  const l = pickLocale(locale);
  const tc = await getTranslations({ locale, namespace: "common" });
  const tFleet = await getTranslations({ locale, namespace: "fleet" });
  const categoryLabel: Record<string, string> = {
    economy: tFleet("filterEconomy"),
    comfort: tFleet("filterComfort"),
    premium: tFleet("filterPremium"),
    suv:     tFleet("filterSUV"),
    minivan: tFleet("filterMinivan"),
  };

  const related: BlogPost[] = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);
  const relatedCars = (post.relatedCarSlugs ?? [])
    .map((s) => CATALOG.find((c) => c.slug === s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c))
    .slice(0, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title[l],
    description: post.excerpt[l],
    datePublished: post.publishedAt,
    image: post.cover.startsWith("http") ? post.cover : `${SITE_URL}${post.cover}`,
    author: { "@type": "Organization", name: "Rentz.uz", url: SITE_URL },
    publisher: { "@id": `${SITE_URL}/#org` },
    mainEntityOfPage: `${SITE_URL}/${locale}/blog/${slug}`,
    inLanguage: l,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: locale === "en" ? "Home" : "Главная", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: locale === "en" ? "Blog" : "Блог",   item: `${SITE_URL}/${locale}/blog` },
      { "@type": "ListItem", position: 3, name: post.title[l] },
    ],
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="bg-[#FFF7ED]">
        <div className="mx-auto max-w-[820px] px-6 md:px-10 pt-10 pb-8">
          <nav className="flex items-center gap-1.5 text-[13px] text-[#9CA3AF] mb-6" aria-label="Breadcrumb">
            <Link href={`/${locale}`} className="hover:text-[#F97316] transition-colors">{locale === "en" ? "Home" : "Главная"}</Link>
            <span>›</span>
            <Link href={`/${locale}/blog`} className="hover:text-[#F97316] transition-colors">{locale === "en" ? "Blog" : "Блог"}</Link>
            <span>›</span>
            <span className="text-[#1A1A2E] line-clamp-1">{post.title[l]}</span>
          </nav>
          <span className="inline-flex items-center rounded-full bg-[#F97316] px-3 py-1 text-[11px] font-semibold text-white uppercase tracking-wider">
            {post.category[l]}
          </span>
          <h1 className="text-[32px] sm:text-[40px] md:text-[44px] font-extrabold text-[#1A1A2E] leading-[1.15] mt-4">
            {post.title[l]}
          </h1>
          <div className="flex items-center gap-4 mt-5 text-[13px] text-[#9CA3AF]">
            <span>{formatDate(post.publishedAt, locale)}</span>
            <span>·</span>
            <span>{post.readMinutes} {locale === "en" ? "min read" : "мин"}</span>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="mx-auto max-w-[820px] px-6 md:px-10 py-10">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-[#F5F5F0] mb-10">
            <Image src={post.cover} alt={post.title[l]} fill sizes="(min-width: 1024px) 820px, 100vw" priority className="object-cover" />
          </div>

          <p className="text-[18px] text-[#4B5563] leading-[1.7] mb-2 font-medium">{post.excerpt[l]}</p>

          <div>
            {post.body[l].map((s, i) => (
              <Section key={i} s={s} />
            ))}
          </div>

          {relatedCars.length > 0 && (
            <div className="mt-14 pt-8 border-t border-[#E5E7EB]">
              <h2 className="text-[22px] font-bold text-[#1A1A2E] mb-5">
                {locale === "en" ? "Cars mentioned in this article" : "Авто из этой статьи"}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {relatedCars.map((car) => (
                  <Link key={car.slug} href={`/${locale}/cars/${car.slug}`} className="block bg-white rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition overflow-hidden">
                    <div className="relative aspect-[16/10] bg-[#F5F5F0]">
                      <CarImage car={car} />
                    </div>
                    <div className="p-4">
                      <h3 className="text-[15px] font-bold text-[#1A1A2E]">{car.brand} {car.model}</h3>
                      <div className="text-[12px] text-[#9CA3AF] mt-1">{categoryLabel[car.category]}</div>
                      <div className="mt-2 text-[#F97316] font-bold">${car.pricePerDay}<span className="text-[12px] text-[#9CA3AF] font-normal"> {tc("perDay")}</span></div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <div className="bg-[#F5F5F0]">
          <div className="mx-auto max-w-[1080px] px-6 md:px-10 py-14">
            <h2 className="text-[22px] font-bold text-[#1A1A2E] mb-5">
              {locale === "en" ? "Read also" : "Читайте также"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map((r) => (
                <Link key={r.slug} href={`/${locale}/blog/${r.slug}`} className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition flex flex-col">
                  <div className="relative aspect-[16/10] bg-[#F5F5F0]">
                    <Image src={r.cover} alt={r.title[l]} fill sizes="(min-width: 768px) 320px, 100vw" className="object-cover" />
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <span className="text-[11px] uppercase tracking-wider text-[#F97316] font-semibold">{r.category[l]}</span>
                    <h3 className="text-[16px] font-bold text-[#1A1A2E] mt-2 leading-snug">{r.title[l]}</h3>
                    <p className="text-[13px] text-[#4B5563] mt-2 line-clamp-2 leading-[1.55]">{r.excerpt[l]}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
