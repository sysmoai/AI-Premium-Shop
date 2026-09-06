#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const APP = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const REPO = path.resolve(APP, "../..");
const DIST = path.join(APP, "dist/public");
const ownership = JSON.parse(fs.readFileSync(path.join(REPO, "ops/seo/support-cluster-ownership-2026-09-07.json"), "utf8"));
const keywordOwnership = JSON.parse(fs.readFileSync(path.join(REPO, "ops/seo/keyword-ownership-2026-09-03.json"), "utf8"));
const projectionRaw = JSON.parse(fs.readFileSync(path.join(APP, "data/public-products.json"), "utf8"));
const products = (Array.isArray(projectionRaw) ? projectionRaw : projectionRaw.products ?? [])
  .filter((product) => product.publicStatus !== "retired" && product.slug !== "replit-bangladesh");
const routesSource = fs.readFileSync(path.join(APP, "src/lib/productRoutes.ts"), "utf8");
const brandSlugs = new Set([...routesSource.matchAll(/"([a-z0-9-]+)"/g)].map((match) => match[1]));

const esc = (value) => String(value ?? "")
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;");
const baseName = (value) => String(value ?? "AI tool").split(/—\s*/)[0].split(/\s+-\s+/)[0].trim();
const productHref = (slug) => brandSlugs.has(slug) ? `/${slug}` : `/product/${slug}`;
const currentSlugs = new Set(products.map((product) => product.slug));
const redirectSources = new Set((ownership.legacy_aliases ?? []).map((entry) => entry.source));

function familyName(slug) {
  const row = products.find((product) => product.slug === slug);
  return baseName(row?.brand || row?.name || slug.replace(/-bangladesh$/, "").replaceAll("-", " "));
}

function routeLabel(route) {
  const exact = {
    "/chatgpt-vs-claude": "ChatGPT vs Claude",
    "/chatgpt-vs-gemini": "ChatGPT vs Google AI Pro",
    "/chatgpt-vs-perplexity": "ChatGPT vs Perplexity",
    "/claude-vs-gemini": "Claude vs Google AI Pro",
    "/canva-vs-adobe-express": "Canva vs Adobe Express",
    "/copilot-vs-cursor": "GitHub Copilot vs Cursor",
    "/midjourney-vs-ideogram": "Midjourney vs Ideogram",
    "/best-ai-subscription-2026": "AI subscription decision guide",
    "/best-ai-for-students": "AI tools for students",
    "/best-ai-for-freelancers": "AI tools for freelancers",
    "/best-ai-for-creators": "AI tools for creators",
    "/best-ai-for-business": "AI tools for business",
    "/best-ai-for-developers": "AI tools for developers",
    "/best-ai-for-job-seekers": "AI tools for job seekers",
    "/best-ai-for-designers": "AI tools for designers",
    "/best-ai-for-marketers": "AI tools for marketers",
    "/best-ai-for-ecommerce": "AI tools for e-commerce",
    "/ai-under-500": "AI tools under BDT 500",
    "/ai-under-1000": "AI tools under BDT 1,000",
    "/ai-under-3000": "AI tools under BDT 3,000"
  };
  return exact[route] ?? route.replace(/^\//, "").replaceAll("-", " ");
}

function minFixedPrice(slug) {
  const values = products
    .filter((product) => product.slug === slug && !product.requestPrice && typeof product.price === "number" && product.price > 0)
    .map((product) => Number(product.price));
  return values.length ? Math.min(...values) : null;
}

const tierASlugs = [...new Set((keywordOwnership.owners ?? [])
  .filter((owner) => owner.tier_a === true)
  .map((owner) => owner.primary_url)
  .map((url) => {
    const entry = products.find((product) => productHref(product.slug) === url);
    return entry?.slug ?? null;
  })
  .filter(Boolean))];

const owners = [
  ...(ownership.comparisons ?? []).map((entry) => ({ ...entry, kind: "comparison" })),
  ...(ownership.audience_guides ?? []).map((entry) => ({ ...entry, kind: "audience" })),
  ...(ownership.budget_hubs ?? []).map((entry) => ({ ...entry, kind: "budget" })),
  { ...(ownership.umbrella ?? {}), kind: "umbrella" }
].filter((entry) => entry.route);

let updated = 0;
for (const owner of owners) {
  const route = owner.route;
  if (redirectSources.has(route)) throw new Error(`[support-links] canonical owner cannot also be a legacy alias: ${route}`);
  const file = path.join(DIST, route.replace(/^\//, ""), "index.html");
  if (!fs.existsSync(file)) throw new Error(`[support-links] generated support route missing: ${route}`);

  let productSlugs = Array.isArray(owner.product_slugs) ? owner.product_slugs.filter((slug) => currentSlugs.has(slug)) : [];
  if (owner.kind === "budget") {
    productSlugs = tierASlugs
      .map((slug) => ({ slug, price: minFixedPrice(slug) }))
      .filter((entry) => entry.price != null && entry.price <= Number(owner.max_bdt))
      .sort((a, b) => a.price - b.price || familyName(a.slug).localeCompare(familyName(b.slug)))
      .slice(0, 6)
      .map((entry) => entry.slug);
  }
  productSlugs = [...new Set(productSlugs)].slice(0, 8);

  const supportRoutes = [...new Set((owner.support_routes ?? []).filter((href) => href !== route && !redirectSources.has(href)))].slice(0, 6);
  const productItems = productSlugs
    .map((slug) => `<li><a href="${esc(productHref(slug))}">${esc(familyName(slug))} current product page</a></li>`)
    .join("");
  const supportItems = supportRoutes
    .map((href) => `<li><a href="${esc(href)}">${esc(routeLabel(href))}</a></li>`)
    .join("");
  if (!productItems && !supportItems) throw new Error(`[support-links] ${route} has no current canonical links to project`);

  const section = `<section data-go6-support-links="${esc(route)}"><h2>Continue the decision</h2><p>Use the canonical pages below for the next question. Exact product price and order intent stays on each product page; these guides and comparisons remain decision-support pages.</p>${productItems ? `<h3>Related current product pages</h3><ul>${productItems}</ul>` : ""}${supportItems ? `<h3>Related decision guides</h3><ul>${supportItems}</ul>` : ""}</section>`;

  let html = fs.readFileSync(file, "utf8");
  html = html.replace(/<section\s+data-go6-support-links=["'][^"']*["'][\s\S]*?<\/section>/gi, "");
  if (!/<\/main>/i.test(html)) throw new Error(`[support-links] ${route} has no </main> insertion point`);
  html = html.replace(/<\/main>/i, `${section}\n</main>`);

  for (const source of redirectSources) {
    if (new RegExp(`href=["']${source.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?:["'#?])`, "i").test(html)) {
      throw new Error(`[support-links] ${route} links to redirect-source alias ${source}`);
    }
  }
  fs.writeFileSync(file, html, "utf8");
  updated += 1;
}

console.log(`[support-links] projected canonical product/support links onto ${updated} existing support owners; no new routes created`);
