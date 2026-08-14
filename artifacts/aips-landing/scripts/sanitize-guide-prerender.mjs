#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const APP = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(APP, "dist/public");
const projection = JSON.parse(fs.readFileSync(path.join(APP, "data/public-products.json"), "utf8"));
const products = (Array.isArray(projection) ? projection : projection.products ?? []).filter((p) => p.publicStatus !== "retired" && p.slug !== "replit-bangladesh");
const routesSource = fs.readFileSync(path.join(APP, "src/lib/productRoutes.ts"), "utf8");
const brandSlugs = new Set([...routesSource.matchAll(/"([a-z0-9-]+)"/g)].map((m) => m[1]));
const SITE = "https://aipremiumshop.com";

const GUIDES = {
  students: { heading: "AI Tools for Students in Bangladesh", categories: ["ai-assistant", "ai-writing", "ai-workspace"] },
  freelancers: { heading: "AI Tools for Freelancers in Bangladesh", categories: ["ai-assistant", "ai-writing", "ai-design", "ai-code", "ai-workspace"] },
  creators: { heading: "AI Tools for Content Creators in Bangladesh", categories: ["ai-video", "ai-image", "ai-design", "ai-voice-music", "ai-writing"] },
  business: { heading: "AI Tools for Businesses in Bangladesh", categories: ["ai-workspace", "ai-assistant", "ai-code", "bundles"] },
  developers: { heading: "AI Coding Tools for Developers in Bangladesh", categories: ["ai-code", "ai-assistant"] },
  "job-seekers": { heading: "AI Tools for Job Seekers in Bangladesh", categories: ["ai-assistant", "ai-writing", "ai-workspace"] },
  designers: { heading: "AI Design Tools for Designers in Bangladesh", categories: ["ai-design", "ai-image", "ai-video"] },
  marketers: { heading: "AI Tools for Marketers in Bangladesh", categories: ["ai-writing", "ai-design", "ai-workspace", "ai-assistant"] },
  ecommerce: { heading: "AI Tools for E-commerce in Bangladesh", categories: ["ai-writing", "ai-design", "ai-workspace", "ai-assistant"] },
};

const BLOCKED = ["30-day warranty", "30 day warranty", "5-30 min", "5–30 min", "5-15 min", "5–15 min", "instant delivery", "best value", "% off", "replit-bangladesh", "gpt-5.4", "claude opus", "earn bdt", "earn $", "unlimited searches", "unlimited generations"];
const esc = (v) => String(v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const money = (n) => `BDT ${Number(n).toLocaleString("en-BD")}`;
const nameOf = (v) => String(v ?? "AI tool").split(/—\s*/)[0].split(/\s+-\s+/)[0].trim();
const hrefFor = (slug) => brandSlugs.has(slug) ? `/${slug}` : `/product/${slug}`;
const access = (v) => v === "shared" ? "Shared" : v === "personal" ? "Personal" : v === "team" ? "Team" : v === "bundle" ? "Bundle" : v ? "Service" : "Confirm";

function uniqueFor(categories) {
  const seen = new Set();
  const out = [];
  for (const category of categories) {
    const rows = products.filter((p) => p.category === category).sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
    for (const row of rows) {
      if (seen.has(row.slug)) continue;
      seen.add(row.slug);
      out.push(row);
      if (out.length >= 10) return out;
    }
  }
  return out;
}

function cleanJsonLd(html) {
  return html.replace(/\s*<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi, (full, json) => {
    const lower = json.toLowerCase();
    return lower.includes('"faqpage"') || lower.includes('"product"') ? "" : full;
  });
}
function setMeta(html, title, description, canonical) {
  return html
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(title)}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*(")/i, `$1${esc(description)}$2`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/>/i, `<meta property="og:title" content="${esc(title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/>/i, `<meta property="og:description" content="${esc(description)}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/>/i, `<meta property="og:url" content="${esc(canonical)}" />`)
    .replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/i, `<link rel="canonical" href="${esc(canonical)}" />`);
}
function replaceRoot(html, body) {
  const start = /<div\s+id="root"[^>]*>/i.exec(html);
  const end = html.search(/<\/body>/i);
  if (!start || end < 0) throw new Error("[guide-truth] cannot replace generated root");
  return `${html.slice(0, start.index)}<div id="root"><div id="prerender-shell">${body}</div></div>\n  ${html.slice(end)}`;
}

let sanitized = 0;
for (const [key, guide] of Object.entries(GUIDES)) {
  const route = `/best-ai-for-${key}`;
  const file = path.join(DIST, route.slice(1), "index.html");
  if (!fs.existsSync(file)) throw new Error(`[guide-truth] missing ${route}`);
  const shortlist = uniqueFor(guide.categories);
  const list = shortlist.map((row) => `<li><a href="${esc(hrefFor(row.slug))}">${esc(nameOf(row.name))}</a> — ${row.requestPrice || typeof row.price !== "number" ? "Check current price" : money(row.price)} · ${esc(access(row.accessType))}</li>`).join("");
  const title = `${guide.heading} | Current AIPS Guide`;
  const description = `Compare current AI Premium Shop catalog options for ${key.replaceAll("-", " ")} by published BDT price and access. Confirm provider limits, availability, delivery ETA and terms before payment.`;
  const canonical = `${SITE}${route}`;
  const body = `<main><nav aria-label="breadcrumb"><a href="/">Home</a> › <a href="/guides">Guides</a> › ${esc(key.replaceAll("-", " "))}</nav><h1>${esc(guide.heading)}</h1><p>This is a current-catalog decision guide. The shortlist helps discovery; it is not an objective product ranking and does not publish fixed provider model, quota, earnings or delivery claims.</p><h2>Relevant current catalog options</h2><ul>${list}</ul><h2>Before choosing</h2><ul><li>Choose an access model appropriate for the data and workflow.</li><li>Verify provider-controlled features and limits for the exact plan.</li><li>Confirm current availability, delivery ETA and applicable terms before payment.</li></ul><p><a href="/products">Browse all tools</a> · <a href="/pricing">Current pricing</a> · <a href="/guides">All guides</a></p></main>`;
  let html = fs.readFileSync(file, "utf8");
  html = cleanJsonLd(setMeta(html, title, description, canonical));
  html = replaceRoot(html, body);
  const lower = html.toLowerCase();
  for (const phrase of BLOCKED) if (lower.includes(phrase.toLowerCase())) throw new Error(`[guide-truth] ${route} contains blocked phrase: ${phrase}`);
  fs.writeFileSync(file, html, "utf8");
  sanitized++;
}
console.log(`[guide-truth] sanitized ${sanitized} audience guide crawler pages`);
