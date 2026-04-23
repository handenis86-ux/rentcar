// Re-scrape rentcar.uz detail pages for structured specs and raw description.
// Writes scripts/catalog-details.json.

import { writeFile } from "node:fs/promises";
import path from "node:path";

const BASE = "https://rentcar.uz";
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

// Next.js streams data blobs like:  self.__next_f.push([1, "...data..."])
// The embedded strings contain all page data. We stitch them and then
// search for known patterns.
function stitchNextData(html) {
  const re = /self\.__next_f\.push\(\[1,\s*"((?:\\.|[^"\\])*)"\]\)/g;
  const chunks = [];
  let m;
  while ((m = re.exec(html))) {
    try {
      // The string is JS-escaped; turn it back using JSON.parse on a wrapped string
      chunks.push(JSON.parse('"' + m[1] + '"'));
    } catch {
      chunks.push(m[1]);
    }
  }
  return chunks.join("");
}

function extractStringKey(blob, key) {
  // tolerant regex: "key":"value with escapes"
  const re = new RegExp(`"${key}"\\s*:\\s*"((?:\\\\.|[^"\\\\])*)"`, "g");
  const vals = [];
  let m;
  while ((m = re.exec(blob))) {
    try { vals.push(JSON.parse('"' + m[1] + '"')); } catch { vals.push(m[1]); }
  }
  return vals;
}

function extractFeaturesList(blob) {
  // Look for objects that have "name":"X" in a list-like context close to "features"
  const feats = new Set();
  const re = /"features"\s*:\s*\[([\s\S]*?)\]/g;
  let m;
  while ((m = re.exec(blob))) {
    const inner = m[1];
    const nameRe = /"name"\s*:\s*"([^"]+)"/g;
    let n;
    while ((n = nameRe.exec(inner))) feats.add(n[1]);
  }
  return [...feats];
}

function pickBest(values) {
  // Keep only strings with Cyrillic and min length, pick the longest.
  const good = values
    .filter((s) => s && /[А-Яа-яЁё]/.test(s) && s.length > 80)
    .sort((a, b) => b.length - a.length);
  return good[0] ?? "";
}

async function fetchHtml(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA, "Accept-Language": "ru,en;q=0.9" } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

async function main() {
  const results = [];
  for (const car of CARS) {
    const url = `${BASE}/ru/car/${car.id}`;
    process.stdout.write(`• ${car.slug.padEnd(32)}`);
    try {
      const html = await fetchHtml(url);
      const blob = stitchNextData(html);
      const title       = pickBest(extractStringKey(blob, "title"));
      const description = pickBest(extractStringKey(blob, "description"));
      const text        = pickBest(extractStringKey(blob, "text"));
      const details     = pickBest(extractStringKey(blob, "details"));
      const yearVals    = extractStringKey(blob, "year");
      const engineVals  = extractStringKey(blob, "engine");
      const powerVals   = extractStringKey(blob, "power");
      const consumption = extractStringKey(blob, "consumption");
      const body        = extractStringKey(blob, "body");
      const transmission= extractStringKey(blob, "transmission");
      const drive       = extractStringKey(blob, "drive");
      const fuel        = extractStringKey(blob, "fuel");
      const features    = extractFeaturesList(blob);

      results.push({
        id: car.id, slug: car.slug, url,
        title, description, text, details,
        year: yearVals, engine: engineVals, power: powerVals,
        consumption, body, transmission, drive, fuel,
        features,
      });
      console.log(" OK  desc=" + ((description || text || details).length) + "  feats=" + features.length);
    } catch (err) {
      console.log(" FAIL " + err.message);
      results.push({ id: car.id, slug: car.slug, url, error: String(err) });
    }
  }
  const out = path.resolve("scripts/catalog-details.json");
  await writeFile(out, JSON.stringify(results, null, 2), "utf8");
  console.log("\nWrote " + out);
}

main().catch((e) => { console.error(e); process.exit(1); });
