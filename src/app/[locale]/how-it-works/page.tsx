import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/SiteChrome";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "how" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: `/${locale}/how-it-works`,
      languages: { ru: "/ru/how-it-works", uz: "/uz/how-it-works", en: "/en/how-it-works", "x-default": "/en/how-it-works" },
    },
  };
}

export default async function HowItWorksPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "how" });
  const tc = await getTranslations({ locale, namespace: "common" });

  // Material Symbols (filled) — directions_car, credit_card, vpn_key
  const I_CAR = "M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z";
  const I_CARD = "M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z";
  const I_KEY = "M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z";

  const steps = [
    { icon: I_CAR,  title: t("step2Title"), desc: t("step2Desc") },
    { icon: I_CARD, title: t("step3Title"), desc: t("step3Desc") },
    { icon: I_KEY,  title: t("step4Title"), desc: t("step4Desc") },
  ];

  const included = [
    { dot: "#22C55E", title: t("inc1Title"), desc: t("inc1Desc") },
    { dot: "#0EA5E9", title: t("inc2Title"), desc: t("inc2Desc") },
    { dot: "#F97316", title: t("inc3Title"), desc: t("inc3Desc") },
    { dot: "#EAB308", title: t("inc4Title"), desc: t("inc4Desc") },
    { dot: "#F97316", title: t("inc5Title"), desc: t("inc5Desc") },
    { dot: "#22C55E", title: t("inc6Title"), desc: t("inc6Desc") },
  ];

  return (
    <>
      <PageHero title={t("title")} subtitle={t("subtitle")} />

      <section className="bg-white">
        <div className="mx-auto max-w-[1312px] px-6 md:px-16 py-20">
          <h2 className="text-[32px] font-bold text-[#1A1A2E] text-center mb-12">{t("stepsTitle")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <div key={s.title} className="bg-white rounded-2xl p-8 text-center space-y-4 shadow-[0_2px_8px_rgba(0,0,0,0.05)] border border-[#F5F5F0]">
                <div className="mx-auto h-14 w-14 rounded-full bg-[#F97316] text-white text-[18px] font-bold flex items-center justify-center">
                  {i + 1}
                </div>
                <div className="mx-auto h-12 w-12 rounded-[10px] bg-[#FFF7ED] text-[#F97316] flex items-center justify-center">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d={s.icon} />
                  </svg>
                </div>
                <h3 className="text-[20px] font-semibold text-[#1A1A2E]">{s.title}</h3>
                <p className="text-[14px] text-[#4B5563] leading-[1.6]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F5F5F0]">
        <div className="mx-auto max-w-[1312px] px-6 md:px-16 py-16">
          <h2 className="text-[32px] font-bold text-[#1A1A2E] text-center mb-10">{t("includedTitle")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {included.map((it) => (
              <div key={it.title} className="bg-white rounded-[10px] p-6 flex items-start gap-4">
                <span className="h-7 w-7 rounded-full flex-shrink-0 block" style={{ boxShadow: `inset 0 0 0 2px ${it.dot}` }} />
                <div>
                  <div className="text-[16px] font-semibold text-[#1A1A2E]">{it.title}</div>
                  <div className="text-[13px] text-[#4B5563] mt-1">{it.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#1A1A2E]">
        <div className="mx-auto max-w-[1312px] px-6 md:px-16 py-16 text-center">
          <h2 className="text-[32px] md:text-[36px] font-bold text-white">{t("ctaTitle")}</h2>
          <p className="text-[16px] text-[#9CA3AF] mt-3 max-w-[500px] mx-auto">{t("ctaSubtitle")}</p>
          <div className="mt-8">
            <Link href={`/${locale}/cars`} className="inline-flex items-center justify-center rounded-full bg-[#F97316] px-9 py-3.5 text-[16px] font-semibold text-white hover:bg-[#EA580C] transition">
              {tc("browseFleet")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
