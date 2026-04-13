import { notFound } from "next/navigation";
import Link from "next/link";
import { getCarBySlug } from "@/lib/cars";
import { BookingForm } from "./_components/BookingForm";
import type { CarCategory, Transmission, FuelType } from "@/types";

// ─── Labels ───────────────────────────────────────────────────────────────────

const CATEGORY_LABELS: Record<CarCategory, string> = {
  ECONOMY:  "Эконом",
  COMFORT:  "Комфорт",
  BUSINESS: "Бизнес",
  SUV:      "Внедорожник",
  MINIVAN:  "Минивэн",
  PREMIUM:  "Премиум",
};

const FUEL_LABELS: Record<FuelType, string> = {
  PETROL:   "Бензин",
  DIESEL:   "Дизель",
  GAS:      "Газ/метан",
  ELECTRIC: "Электро",
  HYBRID:   "Гибрид",
};

const TRANSMISSION_LABELS: Record<Transmission, string> = {
  AUTOMATIC: "Автоматическая",
  MANUAL:    "Механическая",
};

// ─── Spec row ─────────────────────────────────────────────────────────────────

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-semibold text-[#201F1D]">{value}</span>
    </div>
  );
}

// ─── Star rating ─────────────────────────────────────────────────────────────

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i <= Math.round(rating) ? "text-yellow-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function CarDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const car = await getCarBySlug(slug);

  if (!car) notFound();

  const initials = (car.brand[0] + car.model[0]).toUpperCase();

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Link href={`/${locale}`} className="hover:text-[#127384] transition-colors">
            Главная
          </Link>
          <span>/</span>
          <Link href={`/${locale}/cars`} className="hover:text-[#127384] transition-colors">
            Каталог
          </Link>
          <span>/</span>
          <span className="text-[#201F1D] font-medium">{car.brand} {car.model}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">

          {/* ── Left column ───────────────────────────────────────────── */}
          <div className="flex flex-col gap-6">

            {/* Gallery */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              {car.images.length > 0 ? (
                <div className="relative">
                  {/* Main image */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={car.images[0]}
                    alt={`${car.brand} ${car.model}`}
                    className="w-full h-80 sm:h-[420px] object-cover"
                  />
                  {/* Thumbnails */}
                  {car.images.length > 1 && (
                    <div className="flex gap-2 p-4 overflow-x-auto">
                      {car.images.slice(1).map((src, i) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          key={i}
                          src={src}
                          alt={`${car.brand} ${car.model} фото ${i + 2}`}
                          className="h-20 w-28 object-cover rounded-lg flex-shrink-0 border-2 border-transparent hover:border-[#127384] transition-colors cursor-pointer"
                        />
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-80 sm:h-[420px] flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 gap-4">
                  <span className="font-black text-8xl text-gray-300 tracking-tight select-none">
                    {initials}
                  </span>
                  <span className="text-sm text-gray-400">Фото скоро появятся</span>
                </div>
              )}
            </div>

            {/* Description */}
            {car.description && (
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="font-bold text-[#201F1D] text-lg mb-3">Описание</h2>
                <p className="text-gray-600 text-sm leading-relaxed">{car.description}</p>
              </div>
            )}

            {/* Features */}
            {car.features.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="font-bold text-[#201F1D] text-lg mb-4">Комплектация</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {car.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-2 h-2 rounded-full bg-[#FFA633] flex-shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            {car.reviews.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-bold text-[#201F1D] text-lg">Отзывы</h2>
                  <div className="flex items-center gap-2">
                    <Stars rating={car.averageRating ?? 0} />
                    <span className="text-sm font-semibold text-[#201F1D]">
                      {car.averageRating?.toFixed(1)}
                    </span>
                    <span className="text-sm text-gray-400">
                      ({car.reviewCount} отзывов)
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-5">
                  {car.reviews.map((review) => (
                    <div key={review.id} className="flex gap-4">
                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-full bg-[#127384]/10 flex items-center justify-center flex-shrink-0 text-[#127384] font-bold text-sm">
                        {review.reviewer.name[0].toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm text-[#201F1D]">
                            {review.reviewer.name}
                          </span>
                          <Stars rating={review.rating} />
                        </div>
                        {review.comment && (
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {review.comment}
                          </p>
                        )}
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(review.createdAt).toLocaleDateString("ru-RU", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Right column ──────────────────────────────────────────── */}
          <div className="flex flex-col gap-4">

            {/* Sticky booking card */}
            <div className="bg-white rounded-2xl shadow-sm p-6 lg:sticky lg:top-28">
              {/* Title */}
              <div className="mb-4">
                <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-0.5">
                  {car.brand}
                </p>
                <h1 className="text-2xl font-black text-[#201F1D] leading-tight">
                  {car.model}
                </h1>
                <div className="flex items-center gap-2 mt-2">
                  <span className="bg-[#FFA633]/10 text-[#FFA633] text-xs font-medium px-3 py-1 rounded-full">
                    {CATEGORY_LABELS[car.category]}
                  </span>
                  <span className="text-xs text-gray-400">{car.year} г.</span>
                  {car.city && (
                    <span className="text-xs text-gray-400">
                      📍 {car.city.nameRu}
                    </span>
                  )}
                </div>
              </div>

              {/* Price */}
              <div className="bg-gray-50 rounded-xl p-4 mb-5">
                <div className="flex items-end gap-1">
                  <span className="text-3xl font-black text-[#201F1D]">
                    {car.pricePerDay.toLocaleString("ru-RU")}
                  </span>
                  <span className="text-sm text-gray-500 mb-1">сум/сутки</span>
                </div>
                {car.deposit > 0 && (
                  <p className="text-xs text-gray-400 mt-1">
                    Залог: {car.deposit.toLocaleString("ru-RU")} сум
                  </p>
                )}
              </div>

              {/* Book button → modal form */}
              <BookingForm
                car={{
                  id:          car.id,
                  ownerId:     car.ownerId,
                  brand:       car.brand,
                  model:       car.model,
                  pricePerDay: car.pricePerDay,
                  deposit:     car.deposit,
                  address:     car.address,
                }}
              />
              <p className="text-xs text-gray-400 text-center mt-3">
                Без предоплаты · Подтверждение за 1 час
              </p>

              {/* Contact */}
              {car.owner?.phone && (
                <a
                  href={`tel:${car.owner.phone}`}
                  className="mt-4 flex items-center justify-center gap-2 w-full border-2 border-[#201F1D] text-[#201F1D] font-semibold py-3.5 rounded-xl hover:bg-[#201F1D] hover:text-white transition-colors text-sm"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25Z" />
                  </svg>
                  Позвонить владельцу
                </a>
              )}
            </div>

            {/* Specs card */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="font-bold text-[#201F1D] text-base mb-2">Характеристики</h2>
              <div className="divide-y divide-gray-100">
                <SpecRow label="Год выпуска"    value={String(car.year)} />
                <SpecRow label="Коробка"        value={TRANSMISSION_LABELS[car.transmission]} />
                <SpecRow label="Топливо"        value={FUEL_LABELS[car.fuelType]} />
                <SpecRow label="Мест"           value={String(car.seats)} />
                <SpecRow label="Категория"      value={CATEGORY_LABELS[car.category]} />
                {car.mileageLimit && (
                  <SpecRow label="Лимит пробега" value={`${car.mileageLimit.toLocaleString("ru-RU")} км/сутки`} />
                )}
                {car.address && (
                  <SpecRow label="Адрес выдачи"  value={car.address} />
                )}
              </div>
            </div>

            {/* Company / owner card */}
            {(car.company || car.owner) && (
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="font-bold text-[#201F1D] text-base mb-4">
                  {car.company ? "Компания" : "Владелец"}
                </h2>
                {car.company ? (
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#127384]/10 flex items-center justify-center text-[#127384] font-bold text-lg flex-shrink-0">
                      {car.company.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-[#201F1D] text-sm flex items-center gap-1">
                        {car.company.name}
                        {car.company.isVerified && (
                          <span className="text-[#127384]" title="Проверено">✓</span>
                        )}
                      </p>
                      {car.company.phone && (
                        <p className="text-xs text-gray-400 mt-0.5">{car.company.phone}</p>
                      )}
                    </div>
                  </div>
                ) : car.owner ? (
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#FFA633]/10 flex items-center justify-center text-[#FFA633] font-bold text-lg flex-shrink-0">
                      {car.owner.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-[#201F1D] text-sm flex items-center gap-1">
                        {car.owner.name}
                        {car.owner.isVerified && (
                          <span className="text-[#127384]" title="Проверено">✓</span>
                        )}
                      </p>
                      {car.owner.phone && (
                        <p className="text-xs text-gray-400 mt-0.5">{car.owner.phone}</p>
                      )}
                    </div>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
