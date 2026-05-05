import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/SiteChrome";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: `/${locale}/contact`,
      languages: { ru: "/ru/contact", uz: "/uz/contact", en: "/en/contact", "x-default": "/en/contact" },
    },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  // Solid SVG icons (Material Symbols filled): location, phone, mail, schedule
  const I_PIN    = "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z";
  const I_PHONE  = "M6.62 10.79a15 15 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.04-.24c1.12.37 2.33.57 3.55.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.22.2 2.43.57 3.55a1 1 0 0 1-.24 1.04l-2.21 2.2z";
  const I_MAIL   = "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z";
  const I_CLOCK  = "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z";

  const info = [
    { d: I_PIN,   title: t("officeTitle"), lines: [t("officeLine1"), t("officeLine2")] },
    { d: I_PHONE, title: t("phoneTitle"),  lines: ["+998 71 123 45 67", "+998 90 987 65 43"] },
    { d: I_MAIL,  title: t("emailTitle"),  lines: ["info@rentz.uz", "support@rentz.uz"] },
    { d: I_CLOCK, title: t("hoursTitle"),  lines: [t("hoursLine1"), t("hoursLine2")] },
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
                <div className="h-11 w-11 rounded-[10px] bg-white text-[#F97316] flex items-center justify-center shadow-[0_1px_2px_rgba(0,0,0,0.05)] shrink-0">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d={i.d} /></svg>
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
          <div className="rounded-[10px] border border-dashed border-[#E5E7EB] h-[140px] flex items-center justify-center gap-2 text-[#9CA3AF] text-[13px]">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z" /></svg>
            {t("mapLabel")}
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
