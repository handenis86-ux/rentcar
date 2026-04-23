// Re-scrape the legacy rentcar.uz page (api.rentcar.uz/cars/{id}) which has
// structured feature bullets. We extract the feature list only — facts, not
// prose. Output: scripts/catalog-features.json

import { writeFile } from "node:fs/promises";
import path from "node:path";

const BASE = "https://api.rentcar.uz/cars";
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

async function fetchHtml(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

function extractFeaturesFromMainCard(html) {
  // Only parse the FIRST <section class="card-section"> block, not the
  // "similar cars" slides below.
  const cardStart = html.indexOf('<section class="card-section">');
  if (cardStart < 0) return { features: [], price: null, deposit: null, mileage: null };
  const cardEnd = html.indexOf('<section', cardStart + 1);
  const card = html.slice(cardStart, cardEnd > 0 ? cardEnd : undefined);

  // Grab bullets only inside card-features group
  const featBlockMatch = card.match(/card-features[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/);
  const featBlock = featBlockMatch ? featBlockMatch[0] : "";
  const tooltipRe = /<div class="tooltip">([^<]+)<\/div>/g;
  const features = [];
  let mm;
  while ((mm = tooltipRe.exec(featBlock))) features.push(mm[1].trim());

  // Price: first card-header__price
  const priceMatch = card.match(/card-header__price">\s*([\d\s ]+)\s*<span>uzs<\/span>/);
  const price = priceMatch ? Number(priceMatch[1].replace(/\D/g, "")) : null;

  // Deposit and mileage from bullet list nearby
  const depositMatch = card.match(/Залог:\s*<span>([\d\s ]+)uzs<\/span>/);
  const deposit = depositMatch ? Number(depositMatch[1].replace(/\D/g, "")) : null;
  const mileageMatch = card.match(/Лимит:\s*<span>\s*([\d]+)\s*км/);
  const mileage = mileageMatch ? Number(mileageMatch[1]) : null;

  return { features, price, deposit, mileage };
}

async function main() {
  const out = [];
  for (const car of CARS) {
    const url = `${BASE}/${car.id}`;
    process.stdout.write(`• ${car.slug.padEnd(32)}`);
    try {
      const html = await fetchHtml(url);
      const data = extractFeaturesFromMainCard(html);
      out.push({ ...car, url, ...data });
      console.log(" OK  feats=" + data.features.length + "  price=" + data.price + "  deposit=" + data.deposit + "  mileage=" + data.mileage);
    } catch (err) {
      console.log(" FAIL " + err.message);
      out.push({ ...car, url, error: String(err) });
    }
  }
  const dest = path.resolve("scripts/catalog-features.json");
  await writeFile(dest, JSON.stringify(out, null, 2), "utf8");
  console.log("\nWrote " + dest);
}

main().catch((e) => { console.error(e); process.exit(1); });
