import { Resvg } from "@resvg/resvg-js";
import { writeFileSync, readFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "../public");

const svgContent = readFileSync(join(publicDir, "favicon.svg"), "utf-8");

const sizes = [
  { name: "favicon-16x16.png", size: 16 },
  { name: "favicon-32x32.png", size: 32 },
  { name: "favicon-192x192.png", size: 192 },
  { name: "apple-touch-icon.png", size: 180 },
];

for (const { name, size } of sizes) {
  const resvg = new Resvg(svgContent, {
    fitTo: { mode: "width", value: size },
  });
  const png = resvg.render().asPng();
  writeFileSync(join(publicDir, name), png);
  console.log(`✅ ${name} (${size}x${size}) — ${png.length} bytes`);
}
