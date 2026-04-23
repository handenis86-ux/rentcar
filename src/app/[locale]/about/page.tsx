import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/SiteChrome";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("metaTitle"), description: t("metaDescription") };
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

  const values = [
    { icon: "🛡️", title: t("value1Title"), desc: t("value1Desc") },
    { icon: "💬",  title: t("value2Title"), desc: t("value2Desc") },
    { icon: "✨",  title: t("value3Title"), desc: t("value3Desc") },
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
          <div className="rounded-2xl overflow-hidden h-[400px] bg-[#F5F5F0]">
            <img src="/design/generated-1776872356086.png" alt="Our story" className="w-full h-full object-cover" />
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
                <div className="mx-auto h-14 w-14 rounded-full bg-[#FFF7ED] text-[#F97316] text-[24px] flex items-center justify-center">
                  {v.icon}
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
                <div className="mx-auto h-[100px] w-[100px] rounded-full overflow-hidden bg-[#E5E7EB]">
                  <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
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
