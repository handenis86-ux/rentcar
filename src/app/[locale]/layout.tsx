import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { Header, Footer } from "@/components/SiteChrome";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://rentcar.uz"),
  title: { default: "RentCar.uz — Premium Car Rental in Uzbekistan", template: "%s — RentCar.uz" },
  description:
    "Explore Uzbekistan on your own pace. Premium car rental with 24/7 support, full insurance and transparent pricing.",
  openGraph: { type: "website", siteName: "RentCar.uz" },
  alternates: { canonical: "/", languages: { ru: "/ru", uz: "/uz", en: "/en" } },
  robots: { index: true, follow: true },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const messages = await getMessages();
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="flex min-h-screen flex-col">
        <Header locale={locale as Locale} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale as Locale} />
      </div>
    </NextIntlClientProvider>
  );
}
