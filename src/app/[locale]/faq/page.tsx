import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Accordion } from "./_components/Accordion";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rentz.uz";

const I_MAIL = "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z";
const I_PHONE = "M6.62 10.79a15 15 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.04-.24c1.12.37 2.33.57 3.55.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.22.2 2.43.57 3.55a1 1 0 0 1-.24 1.04l-2.21 2.2z";
const I_CHAT = "M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faq" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: `/${locale}/faq`,
      languages: { ru: "/ru/faq", uz: "/uz/faq", en: "/en/faq", "x-default": "/en/faq" },
    },
  };
}

export default async function FAQPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faq" });

  const left  = [1, 2, 3, 4, 5, 6].map((i) => ({ q: t(`q${i}` as `q${1 | 2 | 3 | 4 | 5 | 6}`), a: t(`a${i}` as `a${1 | 2 | 3 | 4 | 5 | 6}`) }));
  const right = [7, 8, 9, 10, 11, 12].map((i) => ({ q: t(`q${i}` as `q${7 | 8 | 9 | 10 | 11 | 12}`), a: t(`a${i}` as `a${7 | 8 | 9 | 10 | 11 | 12}`) }));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [...left, ...right].map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: t("title") },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <section className="bg-[#FFF7ED]">
        <div className="mx-auto max-w-[1312px] px-6 md:px-16 py-16 text-center">
          <h1 className="text-[36px] sm:text-[42px] md:text-[48px] font-bold text-[#1A1A2E] leading-[1.15]">{t("title")}</h1>
          <p className="mt-3 text-[17px] text-[#4B5563] max-w-[560px] mx-auto">{t("subtitle")}</p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-[1312px] px-6 md:px-16 py-16 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-[20px] font-bold text-[#1A1A2E] mb-4">{t("leftTitle")}</h2>
            <Accordion items={left} startIndex={0} />
          </div>
          <div>
            <h2 className="text-[20px] font-bold text-[#1A1A2E] mb-4">{t("rightTitle")}</h2>
            <Accordion items={right} startIndex={100} />
          </div>
        </div>
      </section>

      <section className="bg-[#F5F5F0]">
        <div className="mx-auto max-w-[1312px] px-6 md:px-16 py-16 text-center space-y-5">
          <div className="mx-auto h-12 w-12 rounded-full bg-[#FFF7ED] text-[#F97316] flex items-center justify-center">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d={I_CHAT} /></svg>
          </div>
          <h2 className="text-[28px] md:text-[32px] font-bold text-[#1A1A2E]">{t("ctaTitle")}</h2>
          <p className="text-[15px] text-[#4B5563] max-w-[480px] mx-auto">{t("ctaSubtitle")}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link href={`/${locale}/contact`} className="inline-flex items-center gap-2 rounded-full bg-[#F97316] px-7 py-3 text-[14px] font-semibold text-white hover:bg-[#EA580C] transition">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d={I_MAIL} /></svg>
              {t("emailUs")}
            </Link>
            <a href="tel:+998711234567" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-[14px] font-semibold text-[#1A1A2E] border border-[#D1D5DB] hover:border-[#1A1A2E] transition">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d={I_PHONE} /></svg>
              {t("callUs")}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
