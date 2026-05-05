import sharp from "sharp";
import path from "node:path";
import fs from "node:fs/promises";

const PUBLIC = path.join(process.cwd(), "public");

const ICON_SVG = `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="120" fill="#F97316"/>
  <text x="256" y="362" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif" font-weight="900" font-size="340" fill="white" text-anchor="middle">R</text>
</svg>`;

const SQUARE_SIZES = [16, 32, 48, 192, 512];
const APPLE_SIZE = 180;

async function main() {
  console.log("Generating favicon set + manifest...");
  for (const size of SQUARE_SIZES) {
    const out = path.join(PUBLIC, `icon-${size}.png`);
    await sharp(Buffer.from(ICON_SVG)).resize(size, size).png().toFile(out);
    console.log(` ${path.relative(process.cwd(), out)}`);
  }
  await sharp(Buffer.from(ICON_SVG)).resize(APPLE_SIZE, APPLE_SIZE).png().toFile(path.join(PUBLIC, "apple-icon.png"));
  console.log(` public/apple-icon.png`);

  // SVG favicon (modern browsers)
  await fs.writeFile(path.join(PUBLIC, "icon.svg"), ICON_SVG);
  console.log(" public/icon.svg");

  // Compress og-image to <300KB JPEG
  const ogIn  = path.join(PUBLIC, "og-image.png");
  const ogOut = path.join(PUBLIC, "og-image.jpg");
  try {
    await sharp(ogIn).resize(1200, 630, { fit: "cover" }).jpeg({ quality: 85, progressive: true, mozjpeg: true }).toFile(ogOut);
    const stat = await fs.stat(ogOut);
    console.log(` public/og-image.jpg (${Math.round(stat.size / 1024)}KB)`);
  } catch (e) {
    console.warn(" og-image.png not found, skipping OG compression");
  }

  // Manifest
  const manifest = {
    name: "Rentz.uz — Premium car rental in Uzbekistan",
    short_name: "Rentz",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#F97316",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any maskable" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any maskable" },
    ],
  };
  await fs.writeFile(path.join(PUBLIC, "manifest.webmanifest"), JSON.stringify(manifest, null, 2));
  console.log(" public/manifest.webmanifest");

  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
