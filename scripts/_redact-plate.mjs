import sharp from "sharp";
import path from "node:path";

// Blur a rectangular region. Coords are absolute pixels.
async function blurRegion(file, { x, y, w, h }) {
  const meta = await sharp(file).metadata();
  const left = Math.max(0, Math.min(meta.width - 1, x));
  const top  = Math.max(0, Math.min(meta.height - 1, y));
  const width = Math.max(1, Math.min(meta.width - left, w));
  const height = Math.max(1, Math.min(meta.height - top, h));

  const region = await sharp(file)
    .extract({ left, top, width, height })
    .blur(30)
    .toBuffer();

  const tmp = file + ".tmp";
  await sharp(file)
    .composite([{ input: region, left, top }])
    .jpeg({ quality: 88 })
    .toFile(tmp);
  const { renameSync } = await import("node:fs");
  renameSync(tmp, file);
  console.log("blurred", path.basename(file), `at ${left},${top} ${width}x${height}`);
}

const [, , file, sx, sy, sw, sh] = process.argv;
if (!file) { console.error("usage: node _redact-plate.mjs <file> <x> <y> <w> <h>"); process.exit(1); }
await blurRegion(path.resolve(file), { x: +sx, y: +sy, w: +sw, h: +sh });
