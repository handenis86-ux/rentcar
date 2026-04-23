// Rewrites catalog.ts images[] to: <slug>-hero.png first, then -g1..-gN.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";

const data = JSON.parse(readFileSync("scripts/catalog-gallery.json", "utf8"));
let s = readFileSync("src/lib/catalog.ts", "utf8");

for (const row of data) {
  if (!row.paths) continue;
  const heroAbs = path.resolve("public/cars", row.slug + "-hero.png");
  const hasHero = existsSync(heroAbs);
  const rest = row.paths
    .filter((p) => !/-hero\.(png|jpg)$/i.test(p))
    .sort((a, b) => {
      const na = Number((a.match(/-g(\d+)\./) || [])[1] || 999);
      const nb = Number((b.match(/-g(\d+)\./) || [])[1] || 999);
      return na - nb;
    });
  const ordered = [
    ...(hasHero ? [`/cars/${row.slug}-hero.png`] : []),
    ...rest,
  ];
  const arr = JSON.stringify(ordered);

  const esc = row.slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`(slug:\\s*"${esc}",[\\s\\S]*?images:\\s*)\\[[^\\]]+\\]`, "m");
  if (!re.test(s)) {
    console.log("no match for", row.slug);
    continue;
  }
  s = s.replace(re, `$1${arr}`);
}

writeFileSync("src/lib/catalog.ts", s);
console.log("patched");
