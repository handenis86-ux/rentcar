"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

function Accordion({ items, startIndex }: { items: { q: string; a: string }[]; startIndex: number }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div>
      {items.map((it, i) => {
        const key = startIndex + i;
        const isOpen = open === key;
        return (
          <div key={key} className="border-b border-[#E5E7EB]">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : key)}
              className="w-full flex items-center justify-between py-5 text-left"
            >
              <span className="text-[15px] font-semibold text-[#1A1A2E]">{it.q}</span>
              <svg className={`h-4 w-4 text-[#9CA3AF] transition-transform ${isOpen ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {isOpen && <p className="pb-5 text-[14px] text-[#4B5563] leading-[1.6]">{it.a}</p>}
          </div>
        );
      })}
    </div>
  );
}

export default function FAQPage() {
  const params = useParams<{ locale: string }>();
  const locale = params.locale ?? "ru";
  const t = useTranslations("faq");

  const left = [1, 2, 3, 4].map((i) => ({ q: t(`q${i}` as `q${1 | 2 | 3 | 4}`), a: t(`a${i}` as `a${1 | 2 | 3 | 4}`) }));
  const right = [5, 6, 7, 8].map((i) => ({ q: t(`q${i}` as `q${5 | 6 | 7 | 8}`), a: t(`a${i}` as `a${5 | 6 | 7 | 8}`) }));

  return (
    <>
      <section className="bg-[#FFF7ED]">
        <div className="mx-auto max-w-[1312px] px-6 md:px-16 py-16 text-center">
          <h1 className="text-[42px] md:text-[48px] font-bold text-[#1A1A2E]">{t("title")}</h1>
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
          <div className="mx-auto h-12 w-12 rounded-full bg-[#FFF7ED] text-[#F97316] text-[24px] flex items-center justify-center">💬</div>
          <h2 className="text-[28px] md:text-[32px] font-bold text-[#1A1A2E]">{t("ctaTitle")}</h2>
          <p className="text-[15px] text-[#4B5563] max-w-[480px] mx-auto">{t("ctaSubtitle")}</p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <Link href={`/${locale}/contact`} className="inline-flex items-center gap-2 rounded-full bg-[#F97316] px-7 py-3 text-[14px] font-semibold text-white hover:bg-[#EA580C] transition">
              ✉️ {t("emailUs")}
            </Link>
            <a href="tel:+998711234567" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-[14px] font-semibold text-[#1A1A2E] border border-[#D1D5DB] hover:border-[#1A1A2E] transition">
              📞 {t("callUs")}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
