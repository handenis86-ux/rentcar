import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/SiteChrome";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  const info = [
    { icon: "📍", title: t("officeTitle"), lines: [t("officeLine1"), t("officeLine2")] },
    { icon: "📞", title: t("phoneTitle"),  lines: ["+998 71 123 45 67", "+998 90 987 65 43"] },
    { icon: "✉️", title: t("emailTitle"),  lines: ["info@rentcar.uz", "support@rentcar.uz"] },
    { icon: "⏰", title: t("hoursTitle"),  lines: [t("hoursLine1"), t("hoursLine2")] },
  ];

  return (
    <>
      <PageHero title={t("title")} subtitle={t("subtitle")} />

      <section className="bg-white">
        <div className="mx-auto max-w-[1312px] px-6 md:px-16 py-16 grid md:grid-cols-[1.3fr_1fr] gap-10">
          <form className="space-y-5">
            <h2 className="text-[24px] font-bold text-[#1A1A2E]">{t("formTitle")}</h2>

            <div className="grid grid-cols-2 gap-4">
              <Field label={t("firstName")} placeholder={t("firstNamePh")} />
              <Field label={t("lastName")}  placeholder={t("lastNamePh")} />
            </div>
            <Field label={t("email")}   placeholder={t("emailPh")} type="email" />
            <Field label={t("subject")} placeholder={t("subjectPh")} />
            <div>
              <label className="block text-[13px] font-medium text-[#1A1A2E] mb-1.5">{t("message")}</label>
              <textarea
                rows={5}
                placeholder={t("messagePh")}
                className="w-full rounded-[10px] border border-[#E5E7EB] bg-white px-3 py-2.5 text-[14px] text-[#1A1A2E] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#F97316]"
              />
            </div>
            <button type="button" className="rounded-full bg-[#F97316] px-7 py-3 text-[14px] font-semibold text-white hover:bg-[#EA580C] transition">
              {t("send")}
            </button>
          </form>

          <div className="space-y-3">
            {info.map((i) => (
              <div key={i.title} className="bg-[#F5F5F0] rounded-[10px] p-5 flex items-start gap-4">
                <div className="h-11 w-11 rounded-full bg-white text-[#F97316] text-[18px] flex items-center justify-center shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                  {i.icon}
                </div>
                <div>
                  <div className="text-[15px] font-semibold text-[#1A1A2E]">{i.title}</div>
                  {i.lines.map((l, idx) => (
                    <div key={idx} className="text-[13px] text-[#4B5563] mt-0.5">{l}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-[1312px] px-6 md:px-16 pb-20">
          <div className="rounded-[10px] border border-dashed border-[#E5E7EB] h-[140px] flex items-center justify-center text-[#9CA3AF] text-[13px]">
            <span className="mr-2">🗺️</span> {t("mapLabel")}
          </div>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-[13px] font-medium text-[#1A1A2E] mb-1.5">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-[10px] border border-[#E5E7EB] bg-white px-3 py-2.5 text-[14px] text-[#1A1A2E] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#F97316]"
      />
    </div>
  );
}
