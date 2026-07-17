import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "payment" });
  return {
    title: t("successTitle"),
    robots: { index: false, follow: false },
  };
}

export default async function PaymentSuccessPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ bookingId?: string }>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  const t = await getTranslations({ locale, namespace: "payment" });

  return (
    <section className="bg-white min-h-[60vh] flex items-center justify-center px-6 py-16">
      <div className="max-w-md w-full text-center">
        {/* Success icon */}
        <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
          <svg
            className="w-10 h-10 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-[#201F1D] mb-3">
          {t("successTitle")}
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed mb-2">
          {t("successMessage")}
        </p>
        {sp.bookingId && (
          <p className="text-xs text-gray-400 mb-6">
            {t("bookingId")}: <code className="bg-gray-100 px-2 py-0.5 rounded">{sp.bookingId}</code>
          </p>
        )}

        <div className="flex flex-col gap-3 mt-8">
          <Link
            href={`/${locale}/cars`}
            className="w-full inline-flex items-center justify-center bg-[#FFA633] text-white font-bold py-3.5 rounded-xl hover:bg-[#e8952d] transition-colors"
          >
            {t("browseMore")}
          </Link>
          <Link
            href={`/${locale}`}
            className="w-full inline-flex items-center justify-center border border-gray-200 text-[#201F1D] font-semibold py-3.5 rounded-xl hover:border-gray-400 transition-colors text-sm"
          >
            {t("backHome")}
          </Link>
        </div>
      </div>
    </section>
  );
}
