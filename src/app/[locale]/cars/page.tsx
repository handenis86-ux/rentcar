import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/SiteChrome";
import { CATALOG, carDescription, type Car, type CarCategory } from "@/lib/catalog";
import { EXTRAS } from "@/lib/catalog-extras";
import { CarImage } from "@/components/CarImage";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "fleet" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

type SP = { category?: string; trans?: string; price?: string };

const BADGE_COLOR: Record<CarCategory, string> = {
  economy: "bg-[#FFF7ED] text-[#F97316]",
  comfort: "bg-[#F0F9FF] text-[#0EA5E9]",
  premium: "bg-[#FEF3C7] text-[#B45309]",
  suv:     "bg-[#ECFDF5] text-[#16A34A]",
  minivan: "bg-[#F5F3FF] text-[#7C3AED]",
};

const PRICE_PREDICATE: Record<string, (p: number) => boolean> = {
  low:  (p) => p <= 50,
  mid:  (p) => p > 50 && p <= 100,
  high: (p) => p > 100,
};

function Spec({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <dt className="text-[#9CA3AF] text-[11px] uppercase tracking-wide">{k}</dt>
      <dd className="text-[#1A1A2E] font-medium truncate">{v}</dd>
    </div>
  );
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function buildHref(
  basePath: string,
  current: SP,
  toggleKey: keyof SP,
  toggleValue: string | null,
): string {
  const next: SP = { ...current };
  if (toggleValue === null) delete next[toggleKey];
  else if (current[toggleKey] === toggleValue) delete next[toggleKey];
  else next[toggleKey] = toggleValue;

  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(next)) if (v) qs.set(k, v);
  const s = qs.toString();
  return s ? `${basePath}?${s}` : basePath;
}

function FilterPill({
  label,
  href,
  active,
}: {
  label: string;
  href: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      scroll={false}
      className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-[13px] font-medium transition-colors ${
        active
          ? "bg-[#F97316] text-white"
          : "bg-[#F5F5F0] text-[#4B5563] hover:bg-[#FFE4D2] hover:text-[#F97316]"
      }`}
    >
      {label}
    </Link>
  );
}

export default async function FleetPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<SP>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  const t = await getTranslations({ locale, namespace: "fleet" });
  const tc = await getTranslations({ locale, namespace: "common" });

  const basePath = `/${locale}/cars`;

  const filtered = CATALOG.filter((car: Car) => {
    if (sp.category && car.category !== sp.category) return false;
    if (sp.trans && car.transmission !== sp.trans) return false;
    const pricePred = sp.price ? PRICE_PREDICATE[sp.price] : null;
    if (pricePred && !pricePred(car.pricePerDay)) return false;
    return true;
  });

  const badgeLabel: Record<CarCategory, string> = {
    economy: t("filterEconomy"),
    comfort: t("filterComfort"),
    premium: t("filterPremium"),
    suv:     t("filterSUV"),
    minivan: t("filterMinivan"),
  };

  const categories: { value: CarCategory | null; label: string }[] = [
    { value: null,       label: t("filterAll") },
    { value: "economy",  label: t("filterEconomy") },
    { value: "comfort",  label: t("filterComfort") },
    { value: "premium",  label: t("filterPremium") },
    { value: "suv",      label: t("filterSUV") },
    { value: "minivan",  label: t("filterMinivan") },
  ];

  const trans: { value: "auto" | "manual"; label: string }[] = [
    { value: "auto",   label: t("filterAuto") },
    { value: "manual", label: t("filterManual") },
  ];

  const prices: { value: "low" | "mid" | "high"; label: string }[] = [
    { value: "low",  label: t("filterPrice1") },
    { value: "mid",  label: t("filterPrice2") },
    { value: "high", label: t("filterPrice3") },
  ];

  return (
    <>
      <PageHero title={t("title")} subtitle={t("subtitle")} />

      <section className="bg-white border-b border-[#E5E7EB]">
        <div className="mx-auto max-w-[1312px] px-6 md:px-16 py-5 flex flex-wrap items-center justify-center gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((c) => (
              <FilterPill
                key={c.value ?? "__all"}
                label={c.label}
                href={buildHref(basePath, sp, "category", c.value)}
                active={c.value === null ? !sp.category : sp.category === c.value}
              />
            ))}
          </div>
          <span className="hidden md:inline-block h-8 w-px bg-[#E5E7EB]" />
          <div className="flex flex-wrap items-center gap-2">
            {trans.map((o) => (
              <FilterPill
                key={o.value}
                label={o.label}
                href={buildHref(basePath, sp, "trans", o.value)}
                active={sp.trans === o.value}
              />
            ))}
          </div>
          <span className="hidden md:inline-block h-8 w-px bg-[#E5E7EB]" />
          <div className="flex flex-wrap items-center gap-2">
            {prices.map((o) => (
              <FilterPill
                key={o.value}
                label={o.label}
                href={buildHref(basePath, sp, "price", o.value)}
                active={sp.price === o.value}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-[1312px] px-6 md:px-16 py-12">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-[#4B5563]">
              <p className="text-[16px]">—</p>
              <p className="text-[14px] mt-2">
                {locale === "en"
                  ? "No cars match the selected filters."
                  : locale === "uz"
                  ? "Tanlangan filtr bo'yicha avtomobil topilmadi."
                  : "По выбранным фильтрам ничего не найдено."}
              </p>
              <Link
                href={basePath}
                className="inline-flex mt-5 items-center rounded-full bg-[#1A1A2E] text-white px-5 py-2.5 text-[13px] font-semibold hover:bg-[#F97316] transition"
              >
                {locale === "en" ? "Reset filters" : locale === "uz" ? "Filtrlarni tiklash" : "Сбросить фильтры"}
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((car: Car) => {
                const extra = EXTRAS[car.slug];
                const previewFeatures = (extra?.features ?? []).slice(0, 4);
                const moreCount = (extra?.features.length ?? 0) - previewFeatures.length;

                return (
                  <article key={car.slug} className="bg-white rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col">
                    <div className="aspect-[16/10] bg-[#F5F5F0]">
                      <CarImage car={car} />
                    </div>
                    <div className="p-5 space-y-3 flex-1 flex flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-[18px] font-bold text-[#1A1A2E]">{car.brand} {car.model}</h3>
                          <p className="text-[12px] text-[#9CA3AF] mt-0.5">{car.year} · <span className="capitalize">{car.body}</span></p>
                        </div>
                        <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap ${BADGE_COLOR[car.category]}`}>
                          {badgeLabel[car.category]}
                        </span>
                      </div>

                      <p className="text-[13px] text-[#4B5563] leading-[1.55] line-clamp-3 min-h-[60px]">
                        {carDescription(car, locale)}
                      </p>

                      <dl className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[12px] pt-1">
                        <Spec k={tc("seats")} v={String(car.seats)} />
                        <Spec k={tc("auto") + " / " + tc("manual")} v={car.transmission === "auto" ? tc("auto") : tc("manual")} />
                        <Spec k="Engine" v={car.engine} />
                        <Spec k="Drive" v={car.drive.toUpperCase()} />
                        <Spec k="Fuel" v={capitalize(car.fuel)} />
                        <Spec k={car.bags === 1 ? t("bagUnit") : t("bagsUnit")} v={String(car.bags)} />
                      </dl>

                      {previewFeatures.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {previewFeatures.map((f) => (
                            <span key={f} className="inline-flex items-center rounded-full bg-[#F5F5F0] text-[#4B5563] text-[11px] px-2.5 py-1">
                              {f}
                            </span>
                          ))}
                          {moreCount > 0 && (
                            <span className="inline-flex items-center rounded-full bg-[#FFF7ED] text-[#F97316] text-[11px] px-2.5 py-1 font-medium">
                              +{moreCount}
                            </span>
                          )}
                        </div>
                      )}

                      {extra && (
                        <div className="flex items-center gap-3 text-[11px] text-[#9CA3AF] pt-1">
                          <span>Залог: <span className="font-medium text-[#1A1A2E]">{extra.depositUzs.toLocaleString("ru-RU")} сум</span></span>
                          <span>·</span>
                          <span>Лимит: <span className="font-medium text-[#1A1A2E]">{extra.dailyKm} км/день</span></span>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-3 mt-auto border-t border-[#F5F5F0]">
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
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
