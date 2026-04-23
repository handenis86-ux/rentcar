// Rewrite catalog.ts images[] to include only files that actually exist.
// Ordering: <slug>-hero.(png|jpg) first, then -g1..-gN numerically.

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const DIR = path.resolve("public/cars");
const files = readdirSync(DIR);
const bySlug = new Map();

for (const f of files) {
  const m = f.match(/^([a-z0-9]+(?:-[a-z0-9]+)*?)-(hero|g\d+)\.(png|jpe?g)$/i);
  if (!m) continue;
  const slug = m[1];
  const tag  = m[2];
  const ext  = m[3];
  const list = bySlug.get(slug) ?? [];
  list.push({ tag, file: `/cars/${f}`, ext });
  bySlug.set(slug, list);
}

for (const list of bySlug.values()) {
  list.sort((a, b) => {
    if (a.tag === "hero" && b.tag !== "hero") return -1;
    if (b.tag === "hero" && a.tag !== "hero") return 1;
    const na = Number(a.tag.slice(1)); const nb = Number(b.tag.slice(1));
    return na - nb;
  });
}

let s = readFileSync("src/lib/catalog.ts", "utf8");

for (const [slug, list] of bySlug) {
  const arr = JSON.stringify(list.map((x) => x.file));
  const esc = slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`(slug:\\s*"${esc}",[\\s\\S]*?images:\\s*)\\[[^\\]]+\\]`, "m");
  if (!re.test(s)) { console.log("no match:", slug); continue; }
  s = s.replace(re, `$1${arr}`);
}

writeFileSync("src/lib/catalog.ts", s);
console.log("patched for", bySlug.size, "slugs");
