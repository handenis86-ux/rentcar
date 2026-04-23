import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getCarBySlug, CATALOG } from "@/lib/catalog";
import { CarImage } from "@/components/CarImage";

export async function generateStaticParams() {
  return CATALOG.map((c) => ({ slug: c.slug }));
}

export default async function CarDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const car = getCarBySlug(slug);
  if (!car) notFound();

  const t = await getTranslations({ locale, namespace: "fleet" });
  const tc = await getTranslations({ locale, namespace: "common" });

  const badgeLabel: Record<string, string> = {
    economy: t("filterEconomy"),
    comfort: t("filterComfort"),
    premium: t("filterPremium"),
    suv:     t("filterSUV"),
    minivan: t("filterMinivan"),
  };

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1312px] px-6 md:px-16 py-16 grid md:grid-cols-[1.2fr_1fr] gap-10 items-start">
        <div className="rounded-2xl overflow-hidden bg-[#F5F5F0] aspect-[16/10]">
          <CarImage car={car} />
        </div>

        <div className="space-y-5">
          <span className={`inline-block rounded-full px-3 py-1 text-[12px] font-semibold ${
            car.category === "economy" ? "bg-[#FFF7ED] text-[#F97316]" :
            car.category === "comfort" ? "bg-[#F0F9FF] text-[#0EA5E9]" :
            car.category === "premium" ? "bg-[#FEF3C7] text-[#B45309]" :
            car.category === "suv"     ? "bg-[#ECFDF5] text-[#16A34A]" :
                                          "bg-[#F5F3FF] text-[#7C3AED]"
          }`}>
            {badgeLabel[car.category]}
          </span>
          <h1 className="text-[32px] md:text-[40px] font-bold text-[#1A1A2E] leading-tight">
            {car.brand} {car.model}
          </h1>
          <div className="flex items-end gap-1">
            <span className="text-[36px] font-extrabold text-[#F97316]">${car.pricePerDay}</span>
            <span className="text-[15px] text-[#9CA3AF] mb-1">{tc("perDay")}</span>
          </div>

          <dl className="grid grid-cols-2 gap-4 text-[14px] pt-2">
            <Spec label={tc("seats")} value={String(car.seats)} />
            <Spec label={car.bags === 1 ? t("bagUnit") : t("bagsUnit")} value={String(car.bags)} />
            <Spec label="Transmission" value={car.transmission === "auto" ? tc("auto") : tc("manual")} />
            <Spec label="Fuel" value={car.fuel} />
          </dl>

          <div className="flex items-center gap-3 pt-2">
            <button type="button" className="inline-flex items-center justify-center rounded-full bg-[#F97316] px-7 py-3 text-[14px] font-semibold text-white hover:bg-[#EA580C] transition">
              {tc("reserveYourCar")}
            </button>
            <Link href={`/${locale}/cars`} className="inline-flex items-center rounded-full bg-white px-6 py-3 text-[14px] font-semibold text-[#1A1A2E] border border-[#D1D5DB] hover:border-[#1A1A2E] transition">
              ← {tc("browseFleet")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#F5F5F0] rounded-[10px] px-4 py-3">
      <dt className="text-[11px] uppercase tracking-wide font-semibold text-[#9CA3AF]">{label}</dt>
      <dd className="text-[15px] font-semibold text-[#1A1A2E] mt-0.5 capitalize">{value}</dd>
    </div>
  );
}
