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

  const telegramUsername = process.env.NEXT_PUBLIC_TELEGRAM_USERNAME ?? "rentzuz";
  const sameAs = [
    `https://t.me/${telegramUsername}`,
    "https://instagram.com/rentz.uz",
    "https://facebook.com/rentz.uz",
    "https://youtube.com/@rentz.uz",
  ];

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#org`,
    name: "Rentz.uz",
    legalName: "Rentz.uz",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/icon-512.png`,
      width: 512,
      height: 512,
    },
    description:
      "Car rental service in Uzbekistan. Pickup at Tashkent airport, third-party insurance, 24/7 support in English, Russian and Uzbek.",
    telephone: "+998712000000",
    email: "info@rentz.uz",
    address: {
      "@type": "PostalAddress",
      streetAddress: "15 Amir Temur Avenue",
      addressLocality: "Tashkent",
      addressCountry: "UZ",
      postalCode: "100000",
    },
    sameAs,
  };

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "CarRental"],
    "@id": `${SITE_URL}/#localbusiness`,
    name: "Rentz.uz",
    url: `${SITE_URL}/${locale}`,
    image: `${SITE_URL}/icon-512.png`,
    logo: `${SITE_URL}/icon-512.png`,
    telephone: "+998712000000",
    email: "info@rentz.uz",
    description:
      "Car rental in Tashkent and across Uzbekistan. 24 vehicles from $25/day, airport pickup, third-party insurance, 24/7 support.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "15 Amir Temur Avenue",
      addressLocality: "Tashkent",
      addressCountry: "UZ",
      postalCode: "100000",
    },
    areaServed: { "@type": "Country", name: "Uzbekistan" },
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    sameAs,
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "Rentz.uz",
    inLanguage: locale,
    publisher: { "@id": `${SITE_URL}/#org` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/${locale}/cars?city={search_term_string}`,
      },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
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
