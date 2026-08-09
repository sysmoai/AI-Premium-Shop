import fs from "node:fs";
import path from "node:path";

const outDir = path.resolve("dist/public");
const marker = "Product availability is under verification";
const indexPath = path.join(outDir, "index.html");

function listHtml(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) listHtml(full, out);
    else if (entry.isFile() && entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

if (fs.existsSync(indexPath) && fs.readFileSync(indexPath, "utf8").includes(marker)) {
  const files = listHtml(outDir);
  const errors = [];
  const prohibited = [
    /starter\s+shared/i,
    /premium\s+shared/i,
    /shared\s+(?:account|plan|seat|password|credential)/i,
    /(?:BDT|৳)\s*[0-9][0-9,]*/i,
    /order\s+on\s+whatsapp/i,
    />\s*order(?:\s+now)?\s*</i,
  ];

  for (const file of files) {
    const html = fs.readFileSync(file, "utf8");
    const rel = path.relative(outDir, file);
    if (!html.includes(marker)) errors.push(`${rel}: missing quarantine marker`);
    if (!/name=["']robots["'][^>]*content=["']noindex,\s*nofollow["']/i.test(html)) errors.push(`${rel}: missing noindex,nofollow`);
    if (/<script\b/i.test(html)) errors.push(`${rel}: executable client script present in quarantine HTML`);
    for (const rule of prohibited) if (rule.test(html)) errors.push(`${rel}: prohibited commercial/shared pattern ${rule}`);
  }

  if (!files.length) errors.push("no generated HTML files found");
  if (errors.length) {
    console.error(`commerce-quarantine SEO gate failed (${errors.length} issue${errors.length === 1 ? "" : "s"})`);
    for (const error of errors.slice(0, 50)) console.error(`- ${error}`);
    process.exit(1);
  }

  console.log(`commerce-quarantine SEO gate: ${files.length} HTML files are fail-closed, noindexed, script-free and free of blocked commercial/shared patterns`);
} else {
  await import("./seo-check.mjs");
}
