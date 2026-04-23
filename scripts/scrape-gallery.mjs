// Scrape MAIN car gallery from api.rentcar.uz/cars/{id}.
// Only images inside <div class="swiper cardSwiperTop"> — not the similar-cars
// carousel below. Download and rewrite public/cars/<slug>-N.jpg.

import { mkdir, writeFile } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import path from "node:path";

const BASE = "https://api.rentcar.uz/cars";
const OUT_DIR = path.resolve("public/cars");
const OUT_JSON = path.resolve("scripts/catalog-gallery.json");

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

const UA = "Mozilla/5.0";

async function fetchText(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

function extractMainGalleryUrls(html) {
  // Isolate the first swiper cardSwiperTop block.
  const start = html.indexOf('cardSwiperTop');
  if (start < 0) return [];
  const end = html.indexOf('swiperCardThumbs', start);
  const chunk = html.slice(start, end > 0 ? end : start + 6000);
  const urls = [];
  const re = /<img[^>]+src="([^"]+)"/g;
  let m;
  while ((m = re.exec(chunk))) {
    const u = m[1];
    if (/\.(png|jpe?g)$/i.test(u) && !/logo|brand|icons|favicon/i.test(u)) {
      urls.push(u);
    }
  }
  // Put the /img/cars/... (hero PNG) first if present, then jpeg-optimizer etc.
  urls.sort((a, b) => {
    const ha = /img\/cars\//.test(a) ? 0 : 1;
    const hb = /img\/cars\//.test(b) ? 0 : 1;
    return ha - hb;
  });
  return [...new Set(urls)];
}

async function download(url, dest) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  if (!res.body) throw new Error("no body");
  await pipeline(res.body, createWriteStream(dest));
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const results = [];

  for (const car of CARS) {
    const url = `${BASE}/${car.id}`;
    process.stdout.write(`• ${car.slug.padEnd(32)}`);
    try {
      const html = await fetchText(url);
      const urls = extractMainGalleryUrls(html);
      const localPaths = [];
      let idx = 1;
      for (const src of urls) {
        // Decide extension
        let ext = src.match(/\.(png|jpe?g)(?:$|\?)/i)?.[1]?.toLowerCase() ?? "jpg";
        if (ext === "jpeg") ext = "jpg";
        // Hero PNG gets -hero suffix; others -gN.jpg
        const isHero = /img\/cars\//.test(src);
        const name = isHero ? `${car.slug}-hero.${ext}` : `${car.slug}-g${idx}.${ext}`;
        const dest = path.join(OUT_DIR, name);
        try {
          await download(src, dest);
          localPaths.push(`/cars/${name}`);
          if (!isHero) idx += 1;
        } catch {}
      }
      results.push({ slug: car.slug, urls, paths: localPaths });
      console.log(` OK  ${localPaths.length} imgs`);
    } catch (err) {
      console.log(` FAIL ${err.message}`);
      results.push({ slug: car.slug, error: String(err) });
    }
  }

  await writeFile(OUT_JSON, JSON.stringify(results, null, 2), "utf8");
  console.log(`\nWrote ${OUT_JSON}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
