#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const APP = path.join(here, "..");
const DIST = path.join(APP, "dist/public");
const SITE = "https://aipremiumshop.com";
const catalogPath = path.join(APP, "public/generated/plan-catalog.json");

const { plans = [] } = JSON.parse(fs.readFileSync(catalogPath, "utf8"));
const template = fs.readFileSync(path.join(DIST, "index.html"), "utf8");
if (!template.includes('<div id="root"></div>')) {
  throw new Error("plan prerender requires a clean Vite dist/public/index.html template");
}

const esc = (value) => String(value ?? "")
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;");
const fmtBDT = (value) => `৳${Number(value).toLocaleString("en-US")}`;

function replaceOrAppendHead(html, tag) {
  return html.replace("</head>", `${tag}\n</head>`);
}

function render(plan) {
  const sellable = !plan.requestPrice && typeof plan.priceBDT === "number";
  const canonical = plan.indexPolicy === "INDEX_SELF"
    ? `${SITE}${plan.canonicalPath}`
    : `${SITE}${plan.parentCanonicalPath}`;
  const robots = plan.indexPolicy === "INDEX_SELF" ? "index,follow" : "noindex,follow";
  const title = `${plan.productName} ${plan.planName} — Plan Details | AI Premium Shop`;
  const description = `${plan.productName} ${plan.planName} plan details for Bangladesh. Review the current public price or request the current price from AI Premium Shop.`;
  const features = [...new Set([...(plan.whatsIncluded ?? []), ...(plan.features ?? [])])]
    .filter(Boolean)
    .slice(0, 12);

  const body = `<div id="prerender-shell"><main>
<nav aria-label="breadcrumb"><a href="/">Home</a> › <a href="/products">Products</a> › <a href="${esc(plan.parentCanonicalPath)}">${esc(plan.productName)}</a> › <span>${esc(plan.planName)}</span></nav>
<h1>${esc(plan.productName)} — ${esc(plan.planName)}</h1>
<p>This is the dedicated plan view for ${esc(plan.productName)} ${esc(plan.planName)}.</p>
<h2>Current public price</h2>
<p><strong>${sellable ? esc(fmtBDT(plan.priceBDT)) : "Request current price"}</strong>${sellable && plan.billingCycle ? ` per ${esc(plan.billingCycle)}` : ""}</p>
${plan.billingCycle ? `<p>Billing: ${esc(plan.billingCycle)}</p>` : ""}
${plan.accessType ? `<p>Access model: ${esc(plan.accessType)}</p>` : ""}
${features.length ? `<h2>What this plan includes</h2><ul>${features.map((feature) => `<li>${esc(feature)}</li>`).join("")}</ul>` : ""}
${plan.bestFor ? `<h2>Best fit</h2><p>${esc(plan.bestFor)}</p>` : ""}
${plan.limitations?.length ? `<h2>Plan limitations</h2><ul>${plan.limitations.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>` : ""}
<h2>Product context</h2>
<p>The main product page remains the canonical source while plan-level SEO and verification are progressively normalized.</p>
<p><a href="${esc(plan.parentCanonicalPath)}">View ${esc(plan.productName)} product page</a></p>
</main></div>`;

  let html = template.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`);
  html = html.replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${esc(description)}" />`);
  html = replaceOrAppendHead(html, `<meta name="robots" content="${robots}" />`);
  html = replaceOrAppendHead(html, `<link rel="canonical" href="${esc(canonical)}" />`);
  html = replaceOrAppendHead(html, `<meta property="og:title" content="${esc(title)}" />`);
  html = replaceOrAppendHead(html, `<meta property="og:description" content="${esc(description)}" />`);
  html = replaceOrAppendHead(html, `<meta property="og:url" content="${esc(`${SITE}${plan.canonicalPath}`)}" />`);
  return html;
}

let written = 0;
for (const plan of plans) {
  if (!plan.canonicalPath?.startsWith("/product/") || !plan.canonicalPath.includes("/plans/")) {
    throw new Error(`invalid plan canonical path: ${plan.canonicalPath}`);
  }
  const rel = plan.canonicalPath.replace(/^\//, "");
  const dir = path.join(DIST, rel);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), render(plan), "utf8");
  written += 1;
}

console.log(`[prerender-plans] wrote ${written} dedicated plan pages; default index policy is canonical-parent/noindex`);
