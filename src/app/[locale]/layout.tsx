import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { Header, Footer } from "@/components/SiteChrome";
import { FloatingActions } from "@/components/FloatingActions";
import { TawkToLoader } from "@/components/TawkToLoader";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rentz.uz";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  const title = t("metaTitle");
  const description = t("metaDescription");

  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `${SITE_URL}/${l}`]),
  );

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: "%s — Rentz.uz" },
    description,
    keywords: [
      "аренда авто Узбекистан",
      "аренда машины Ташкент",
      "rent a car Uzbekistan",
      "car rental Tashkent",
      "Samarkand car rental",
      "Bukhara car rental",
      "прокат авто Ташкент",
    ],
    alternates: {
      canonical: `/${locale}`,
      languages: { ...languages, "x-default": `${SITE_URL}/en` },
    },
    openGraph: {
      type: "website",
      siteName: "Rentz.uz",
      url: `${SITE_URL}/${locale}`,
      locale: locale === "ru" ? "ru_RU" : locale === "uz" ? "uz_UZ" : "en_US",
      title,
      description,
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Rentz.uz — Premium car rental in Uzbekistan",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.jpg"],
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    icons: {
      icon: [
        { url: "/icon.svg", type: "image/svg+xml" },
        { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
        { url: "/icon-16.png", sizes: "16x16", type: "image/png" },
      ],
      apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    },
    manifest: "/manifest.webmanifest",
  };
}

export const viewport: Viewport = {
  themeColor: "#F97316",
  width: "device-width",
  initialScale: 1,
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

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoRentalCompany",
    "@id": `${SITE_URL}/#org`,
    name: "Rentz.uz",
    url: `${SITE_URL}/${locale}`,
    logo: `${SITE_URL}/og-image.jpg`,
    description:
      "Premium car rental service in Uzbekistan. Pickup at Tashkent airport, full insurance, 24/7 support in English and Russian.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tashkent",
      addressCountry: "UZ",
      streetAddress: "15 Amir Temur Avenue",
    },
    telephone: "+998-71-200-00-00",
    email: "info@rentz.uz",
    areaServed: { "@type": "Country", name: "Uzbekistan" },
    priceRange: "$$",
    sameAs: [],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: `${SITE_URL}/${locale}`,
    name: "Rentz.uz",
    inLanguage: locale,
    publisher: { "@id": `${SITE_URL}/#org` },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/${locale}/cars?category={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <div className="flex min-h-screen flex-col">
        <Header locale={locale as Locale} />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer locale={locale as Locale} />
      </div>
      <FloatingActions />
      <TawkToLoader />
    </NextIntlClientProvider>
  );
}
