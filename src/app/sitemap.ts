import type { MetadataRoute } from "next";
import { CATALOG } from "@/lib/catalog";
import { routing } from "@/i18n/routing";
import { POSTS } from "@/content/blog";
import { DESTINATIONS } from "@/content/destinations";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rentz.uz";

const STATIC_PATHS = [
  { path: "",             priority: 1.0, changefreq: "weekly" as const },
  { path: "/cars",        priority: 0.9, changefreq: "daily"  as const },
  { path: "/destinations",priority: 0.8, changefreq: "weekly" as const },
  { path: "/about",       priority: 0.6, changefreq: "monthly" as const },
  { path: "/contact",     priority: 0.6, changefreq: "monthly" as const },
  { path: "/faq",         priority: 0.6, changefreq: "monthly" as const },
  { path: "/how-it-works",priority: 0.7, changefreq: "monthly" as const },
  { path: "/blog",        priority: 0.7, changefreq: "weekly" as const },
  { path: "/terms",       priority: 0.3, changefreq: "yearly" as const },
  { path: "/privacy",     priority: 0.3, changefreq: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const urls: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const { path, priority, changefreq } of STATIC_PATHS) {
      urls.push({
        url: `${BASE}/${locale}${path}`,
        lastModified: now,
        changeFrequency: changefreq,
        priority,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [l, `${BASE}/${l}${path}`]),
          ),
        },
      });
    }
    for (const car of CATALOG) {
      urls.push({
        url: `${BASE}/${locale}/cars/${car.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [l, `${BASE}/${l}/cars/${car.slug}`]),
          ),
        },
      });
    }
    for (const post of POSTS) {
      urls.push({
        url: `${BASE}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.publishedAt),
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [l, `${BASE}/${l}/blog/${post.slug}`]),
          ),
        },
      });
    }
    for (const dest of DESTINATIONS) {
      urls.push({
        url: `${BASE}/${locale}/destinations/${dest.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.85,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [l, `${BASE}/${l}/destinations/${dest.slug}`]),
          ),
        },
      });
    }
  }

  return urls;
}
