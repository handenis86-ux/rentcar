// Recompress static assets in public/cars (JPG) and public/design (PNG).
//
// Strategy:
//   - JPG: resize so longer side ≤ MAX_W, re-encode mozjpeg q=82, progressive.
//   - PNG: resize so longer side ≤ MAX_W, palette+quality compression. Keep
//     re-encoded copy only if it ends up smaller than the original.
//
// Idempotent: a file already at target dimensions and lower size will not
// shrink further on a second pass.

import sharp from "sharp";
import { readdirSync, statSync, renameSync, unlinkSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..", "public");
const CARS_DIR = path.join(ROOT, "cars");
const DESIGN_DIR = path.join(ROOT, "design");

const MAX_W = 1600;
const JPEG_QUALITY = 82;
const PNG_QUALITY = 82;

const pad = (s, n) => String(s).padEnd(n, " ");
const fmtKB = (b) => `${(b / 1024).toFixed(0)} KB`;

async function processJpeg(file) {
  const before = statSync(file).size;
  const meta = await sharp(file).rotate().metadata();
  const longer = Math.max(meta.width ?? 0, meta.height ?? 0);
  const tmp = file + ".tmp";

  let pipeline = sharp(file).rotate();
  if (longer > MAX_W) {
    pipeline = pipeline.resize({
      width: meta.width >= meta.height ? MAX_W : null,
      height: meta.height > meta.width ? MAX_W : null,
      withoutEnlargement: true,
    });
  }
  await pipeline
    .jpeg({ quality: JPEG_QUALITY, mozjpeg: true, progressive: true })
    .toFile(tmp);

  const after = statSync(tmp).size;
  if (after >= before) {
    unlinkSync(tmp);
    return { file, before, after: before, skipped: true };
  }
  renameSync(tmp, file);
  return { file, before, after, skipped: false };
}

async function processPng(file) {
  const before = statSync(file).size;
  const meta = await sharp(file).metadata();
  const longer = Math.max(meta.width ?? 0, meta.height ?? 0);
  const tmp = file + ".tmp";

  let pipeline = sharp(file);
  if (longer > MAX_W) {
    pipeline = pipeline.resize({
      width: meta.width >= meta.height ? MAX_W : null,
      height: meta.height > meta.width ? MAX_W : null,
      withoutEnlargement: true,
    });
  }
  await pipeline
    .png({
      quality: PNG_QUALITY,
      palette: true,
      compressionLevel: 9,
      effort: 10,
    })
    .toFile(tmp);

  const after = statSync(tmp).size;
  if (after >= before) {
    unlinkSync(tmp);
    return { file, before, after: before, skipped: true };
  }
  renameSync(tmp, file);
  return { file, before, after, skipped: false };
}

async function processDir(dir, ext, fn) {
  const entries = readdirSync(dir).filter((f) => f.toLowerCase().endsWith(ext));
  const results = [];
  for (const name of entries) {
    const full = path.join(dir, name);
    try {
      const r = await fn(full);
      results.push(r);
    } catch (e) {
      console.error(`! ${name}: ${e.message}`);
    }
  }
  return results;
}

function summarize(label, results) {
  const totalBefore = results.reduce((s, r) => s + r.before, 0);
  const totalAfter = results.reduce((s, r) => s + r.after, 0);
  const saved = totalBefore - totalAfter;
  const pct = totalBefore ? ((saved / totalBefore) * 100).toFixed(1) : "0.0";

  console.log(`\n=== ${label} ===`);
  for (const r of results) {
    const tag = r.skipped ? "skip" : "ok  ";
    const delta = r.skipped
      ? "-"
      : `${fmtKB(r.before)} -> ${fmtKB(r.after)}  (${(((r.before - r.after) / r.before) * 100).toFixed(0)}%)`;
    console.log(`  ${tag}  ${pad(path.basename(r.file), 42)}  ${delta}`);
  }
  console.log(
    `  TOTAL: ${fmtKB(totalBefore)} -> ${fmtKB(totalAfter)}  (saved ${fmtKB(saved)}, ${pct}%)`,
  );
}

const t0 = Date.now();
const carResults = await processDir(CARS_DIR, ".jpg", processJpeg);
const designResults = await processDir(DESIGN_DIR, ".png", processPng);
summarize("public/cars (jpg)", carResults);
summarize("public/design (png)", designResults);
console.log(`\nDone in ${((Date.now() - t0) / 1000).toFixed(1)}s.`);
