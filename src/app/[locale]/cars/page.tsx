import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/SiteChrome";
import { CATALOG, type CarCategory } from "@/lib/catalog";
import { CarImage } from "@/components/CarImage";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "fleet" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

const BADGE_COLOR: Record<CarCategory, string> = {
  economy: "bg-[#FFF7ED] text-[#F97316]",
  comfort: "bg-[#F0F9FF] text-[#0EA5E9]",
  premium: "bg-[#FEF3C7] text-[#B45309]",
  suv:     "bg-[#ECFDF5] text-[#16A34A]",
  minivan: "bg-[#F5F3FF] text-[#7C3AED]",
};

function Pill({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-[13px] font-medium ${
        active ? "bg-[#F97316] text-white" : "bg-[#F5F5F0] text-[#4B5563]"
      }`}
    >
      {label}
    </span>
  );
}

export default async function FleetPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "fleet" });
  const tc = await getTranslations({ locale, namespace: "common" });

  const cats = [
    t("filterAll"), t("filterEconomy"), t("filterComfort"), t("filterPremium"), t("filterSUV"), t("filterMinivan"),
  ];
  const trans = [t("filterAuto"), t("filterManual")];
  const prices = [t("filterPrice1"), t("filterPrice2"), t("filterPrice3")];
  const badgeLabel: Record<CarCategory, string> = {
    economy: t("filterEconomy"),
    comfort: t("filterComfort"),
    premium: t("filterPremium"),
    suv:     t("filterSUV"),
    minivan: t("filterMinivan"),
  };

  return (
    <>
      <PageHero title={t("title")} subtitle={t("subtitle")} />

      <section className="bg-white border-b border-[#E5E7EB]">
        <div className="mx-auto max-w-[1312px] px-6 md:px-16 py-5 flex flex-wrap items-center justify-center gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {cats.map((l, i) => (
              <Pill key={l + i} label={l} active={i === 0} />
            ))}
          </div>
          <span className="hidden md:inline-block h-8 w-px bg-[#E5E7EB]" />
          <div className="flex flex-wrap items-center gap-2">
            {trans.map((l) => <Pill key={l} label={l} />)}
          </div>
          <span className="hidden md:inline-block h-8 w-px bg-[#E5E7EB]" />
          <div className="flex flex-wrap items-center gap-2">
            {prices.map((l) => <Pill key={l} label={l} />)}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-[1312px] px-6 md:px-16 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATALOG.map((car) => (
              <article key={car.slug} className="bg-white rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col">
                <div className="aspect-[16/10] bg-[#F5F5F0]">
                  <CarImage car={car} />
                </div>
                <div className="p-5 space-y-3 flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-[18px] font-bold text-[#1A1A2E]">{car.brand} {car.model}</h3>
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap ${BADGE_COLOR[car.category]}`}>
                      {badgeLabel[car.category]}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-[#9CA3AF]">
                    <span>{car.seats} {tc("seats")}</span>
                    <span>·</span>
                    <span>{car.bags} {car.bags === 1 ? t("bagUnit") : t("bagsUnit")}</span>
                    <span>·</span>
                    <span>{car.transmission === "auto" ? tc("auto") : tc("manual")}</span>
                    <span>·</span>
                    <span className="capitalize">{car.fuel}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 mt-auto">
                    <div>
                      <span className="text-[22px] font-bold text-[#F97316]">${car.pricePerDay}</span>
                      <span className="text-[13px] text-[#9CA3AF]"> {tc("perDay")}</span>
                    </div>
                    <Link
                      href={`/${locale}/cars/${car.slug}`}
                      className="rounded-full bg-[#1A1A2E] px-4 py-2 text-[12px] font-semibold text-white hover:bg-[#F97316] transition"
                    >
                      {tc("viewDetails")}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
