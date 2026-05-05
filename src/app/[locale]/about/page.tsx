import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/SiteChrome";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: `/${locale}/about`,
      languages: { ru: "/ru/about", uz: "/uz/about", en: "/en/about", "x-default": "/en/about" },
    },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  const stats = [
    { value: "5,000+", label: t("stat1") },
    { value: "2,000+", label: t("stat2") },
    { value: "50+",    label: t("stat3") },
    { value: "4.8",    label: t("stat4") },
  ];

  // Solid icons (Material Symbols filled): shield-check, support-agent, verified
  const I_SHIELD = "M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1.06 14.71L7.4 12.17l1.41-1.41 2.12 2.12 4.24-4.24 1.41 1.42-5.65 5.65z";
  const I_SUPPORT = "M21 12.22A9 9 0 0 0 3 12v5a3 3 0 0 0 3 3h2v-7H4v-1a8 8 0 0 1 16 0v1h-4v7h2.31a.69.69 0 0 1-.31.6c-.65.4-1.99.4-2-1.6h-1.5c-.01 1.7 1 2.5 2 2.5h1.5a2.5 2.5 0 0 0 2.5-2.5V12.22zM7 14h2v3H7v-3zm10 0v3h-2v-3h2z";
  const I_VERIFIED = "m23 12-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 12l2.44 2.79-.34 3.7 3.61.82 1.89 3.2L12 21.03l3.4 1.46 1.89-3.19 3.61-.82-.34-3.69L23 12zm-12.91 4.72-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48-7.33 7.35z";

  const values = [
    { d: I_SHIELD,   title: t("value1Title"), desc: t("value1Desc") },
    { d: I_SUPPORT,  title: t("value2Title"), desc: t("value2Desc") },
    { d: I_VERIFIED, title: t("value3Title"), desc: t("value3Desc") },
  ];

  const team = [
    { name: t("team1Name"), role: t("team1Role"), bio: t("team1Bio"), img: "/design/generated-1776872420369.png" },
    { name: t("team2Name"), role: t("team2Role"), bio: t("team2Bio"), img: "/design/generated-1776872423594.png" },
    { name: t("team3Name"), role: t("team3Role"), bio: t("team3Bio"), img: "/design/generated-1776872426963.png" },
  ];

  return (
    <>
      <PageHero title={t("title")} subtitle={t("subtitle")} />

      <section className="bg-white">
        <div className="mx-auto max-w-[1312px] px-6 md:px-16 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <h2 className="text-[32px] font-bold text-[#1A1A2E]">{t("storyTitle")}</h2>
            <p className="text-[16px] text-[#4B5563] leading-[1.7]">{t("storyP1")}</p>
            <p className="text-[16px] text-[#4B5563] leading-[1.7]">{t("storyP2")}</p>
            <p className="text-[16px] text-[#4B5563] leading-[1.7]">{t("storyP3")}</p>
          </div>
          <div className="relative rounded-2xl overflow-hidden h-[400px] bg-[#F5F5F0]">
            <Image
              src="/design/generated-1776872356086.png"
              alt={t("storyTitle")}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#F5F5F0]">
        <div className="mx-auto max-w-[1312px] px-6 md:px-16 py-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl p-8 text-center shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              <div className="text-[36px] font-bold text-[#F97316] font-mono">{s.value}</div>
              <div className="text-[14px] text-[#4B5563] mt-2">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-[1312px] px-6 md:px-16 py-20">
          <h2 className="text-[32px] font-bold text-[#1A1A2E] text-center mb-10">{t("valuesTitle")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-[#F5F5F0] rounded-2xl p-8 text-center space-y-4">
                <div className="mx-auto h-14 w-14 rounded-[14px] bg-[#FFF7ED] text-[#F97316] flex items-center justify-center">
                  <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d={v.d} /></svg>
                </div>
                <h3 className="text-[18px] font-semibold text-[#1A1A2E]">{v.title}</h3>
                <p className="text-[14px] text-[#4B5563] leading-[1.6]">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F5F5F0]">
        <div className="mx-auto max-w-[1312px] px-6 md:px-16 py-20">
          <div className="text-center mb-10">
            <h2 className="text-[32px] font-bold text-[#1A1A2E]">{t("teamTitle")}</h2>
            <p className="text-[16px] text-[#4B5563] mt-2">{t("teamSubtitle")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1040px] mx-auto">
            {team.map((m) => (
              <div key={m.name} className="bg-white rounded-2xl p-8 text-center space-y-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                <div className="relative mx-auto h-[100px] w-[100px] rounded-full overflow-hidden bg-[#E5E7EB]">
                  <Image src={m.img} alt={m.name} fill sizes="100px" className="object-cover" />
                </div>
                <h3 className="text-[18px] font-semibold text-[#1A1A2E]">{m.name}</h3>
                <p className="text-[14px] font-medium text-[#F97316]">{m.role}</p>
                <p className="text-[13px] text-[#9CA3AF]">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
