// One-off scraper: pulls car detail pages from rentcar.uz, extracts
// primary images and RU description, downloads images to public/cars/.
// Run: `node scripts/scrape-catalog.mjs`

import { mkdir, writeFile } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import path from "node:path";

const BASE = "https://rentcar.uz";
const OUT_IMG_DIR = path.resolve("public/cars");
const OUT_JSON = path.resolve("scripts/catalog-scraped.json");

const CARS = [
  { id: 155, slug: "chevrolet-spark" },
  { id: 13,  slug: "chevrolet-cobalt" },
  { id: 23,  slug: "chevrolet-lacetti" },
  { id: 162, slug: "chevrolet-onix-ltz-turbo" },
  { id: 156, slug: "chevrolet-monza" },
  { id: 85,  slug: "toyota-prado-120" },
  { id: 152, slug: "chevrolet-tracker-2" },
  { id: 180, slug: "kia-sonet" },
  { id: 196, slug: "chevrolet-orlando-redline" },
  { id: 5,   slug: "byd-chazor-dm1" },
  { id: 21,  slug: "chevrolet-equinox" },
  { id: 69,  slug: "kia-k5-g515" },
  { id: 115, slug: "chevrolet-malibu-2" },
  { id: 154, slug: "chevrolet-trailblazer-ltz" },
  { id: 187, slug: "kia-carnival" },
  { id: 99,  slug: "byd-song-plus" },
  { id: 120, slug: "hyundai-tucson" },
  { id: 59,  slug: "isuzu-d-max-irbis" },
  { id: 76,  slug: "toyota-land-cruiser-prado" },
  { id: 122, slug: "kia-carnival-g03i" },
  { id: 193, slug: "toyota-land-cruiser-200" },
  { id: 191, slug: "lixiang-l9-ultra" },
  { id: 129, slug: "toyota-land-cruiser-300" },
  { id: 198, slug: "mercedes-benz-g400d" },
];

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0 Safari/537.36";

async function fetchHtml(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA, "Accept-Language": "ru,en;q=0.9" } });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

function unique(arr) { return [...new Set(arr)]; }

function extractImages(html) {
  // grab everything that matches api.rentcar.uz/...jpeg or png
  const re = /https:\/\/api\.rentcar\.uz\/[^"'()\s&]+\.(?:jpe?g|png)/gi;
  const re2 = /api\.rentcar\.uz%2F[^"'&\s]+\.(?:jpe?g|png)/gi; // url-encoded inside next/image
  const raw = [
    ...(html.match(re) ?? []),
    ...(html.match(re2) ?? []).map((s) => "https://" + decodeURIComponent(s)),
  ];
  return unique(raw)
    .filter((u) => !u.toLowerCase().includes("logo"))
    .filter((u) => !u.toLowerCase().includes("favicon"));
}

function extractDescription(html) {
  // Site uses react/next, strings often sit in __NEXT_DATA__ or as plain <p>.
  // First try: content between a description-like container; fallback: longest paragraph.
  const paragraphs = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((m) => m[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim())
    .filter((s) => s.length > 60 && /[а-яА-Я]/.test(s));
  // longest first
  paragraphs.sort((a, b) => b.length - a.length);
  return paragraphs[0] ?? "";
}

async function downloadImage(url, destPath) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const body = res.body;
  if (!body) throw new Error("no body");
  await pipeline(body, createWriteStream(destPath));
}

async function main() {
  await mkdir(OUT_IMG_DIR, { recursive: true });
  const results = [];

  for (const car of CARS) {
    const url = `${BASE}/ru/car/${car.id}`;
    process.stdout.write(`• ${car.slug.padEnd(32)} ${url} ... `);
    try {
      const html = await fetchHtml(url);
      const images = extractImages(html).slice(0, 6);
      const description = extractDescription(html);

      const localImages = [];
      for (let i = 0; i < images.length; i++) {
        const src = images[i];
        const extMatch = src.match(/\.(jpe?g|png)(?:$|\?)/i);
        const ext = (extMatch ? extMatch[1] : "jpg").toLowerCase().replace("jpeg", "jpg");
        const fname = `${car.slug}-${i + 1}.${ext}`;
        const destPath = path.join(OUT_IMG_DIR, fname);
        try {
          await downloadImage(src, destPath);
          localImages.push(`/cars/${fname}`);
        } catch (err) {
          // skip broken image
        }
      }

      results.push({
        id: car.id,
        slug: car.slug,
        url,
        description,
        images: localImages,
        sourceImages: images,
      });
      console.log(`OK (${localImages.length} imgs, ${description.length} chars)`);
    } catch (err) {
      console.log(`FAIL ${err.message}`);
      results.push({ id: car.id, slug: car.slug, url, error: String(err) });
    }
  }

  await writeFile(OUT_JSON, JSON.stringify(results, null, 2), "utf8");
  console.log(`\nWrote ${OUT_JSON}`);
}

main().catch((err) => { console.error(err); process.exit(1); });
