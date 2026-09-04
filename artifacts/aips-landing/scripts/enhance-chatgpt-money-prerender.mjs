#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const APP = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(APP, "dist/public");
const evidence = JSON.parse(fs.readFileSync(path.join(APP, "data/chatgpt-money-page-v2.json"), "utf8"));
const publicCatalog = JSON.parse(fs.readFileSync(path.join(APP, "data/public-products.json"), "utf8"));
const products = Array.isArray(publicCatalog) ? publicCatalog : publicCatalog.products ?? [];
const SITE = "https://aipremiumshop.com";
const ROUTES = ["chatgpt-plus-bangladesh", "chatgpt-plans-bangladesh"];

const esc = (value) => String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const money = (value) => `BDT ${Number(value).toLocaleString("en-BD")}`;
const access = (value) => value === "personal" ? "Personal access" : value === "team" ? "Team access" : "Confirm exact access model";

function recordsFor(slug) {
  if (slug === "chatgpt-plans-bangladesh") {
    return products.filter((product) => ["chatgpt-go-bangladesh", "chatgpt-plus-bangladesh", "chatgpt-pro-bangladesh", "chatgpt-business-bangladesh"].includes(product.slug));
  }
  return products.filter((product) => product.slug === slug);
}

function currentRecord(records, slug) {
  return records
    .filter((record) => record.slug === slug && !record.requestPrice && typeof record.price === "number" && record.price > 0)
    .sort((a, b) => a.price - b.price)[0] ?? null;
}

function sourceList(ids) {
  const sources = evidence.sources.filter((source) => ids.includes(source.id));
  return `<section><h2>First-party sources reviewed</h2><p>Evidence reviewed ${esc(evidence.reviewed_at)}. Provider prices, plans, models and usage limits can change.</p><ul>${sources.map((source) => `<li><a href="${esc(source.url)}" rel="nofollow noopener">${esc(source.title)}</a> — checked ${esc(source.checked_at)}</li>`).join("")}</ul></section>`;
}

function safetySection() {
  return `<section><h2>Account and access safety</h2><p>${esc(evidence.provider_facts.account_policy.statement)}</p><p>Under current AI Premium Shop provider governance, shared OpenAI account offers are not published on these ChatGPT money pages. Confirm the exact access model before payment.</p></section>`;
}

function plusBody(records) {
  const route = evidence.routes["chatgpt-plus-bangladesh"];
  const plus = evidence.provider_facts.plus;
  const listing = currentRecord(records, "chatgpt-plus-bangladesh");
  return `<main>
<nav aria-label="breadcrumb"><a href="/">Home</a> › <a href="/ai-assistant">AI Chat & Assistants</a> › ChatGPT Plus</nav>
<h1>${esc(route.h1)}</h1>
<p>Compare the current AI Premium Shop Personal listing with OpenAI's first-party ChatGPT Plus reference before you order in Bangladesh.</p>
<section><h2>Quick answer</h2><ul>
<li><strong>Current AI Premium Shop listing:</strong> ${listing ? `${money(listing.price)}/month · ${esc(access(listing.accessType))}` : "Confirm current price and access"}. Exact order price is reconfirmed before payment.</li>
<li><strong>OpenAI provider reference:</strong> ${esc(plus.official_reference)} · ${esc(plus.billing)}.</li>
<li><strong>AI Premium Shop payment references:</strong> ${evidence.local_payment.methods.map(esc).join(" and ")}. These do not describe payment methods accepted directly by OpenAI.</li>
</ul></section>
<section><h2>What OpenAI currently says ChatGPT Plus includes</h2><p>${esc(plus.positioning)}</p><ul>${plus.features.map((feature) => `<li>${esc(feature)}</li>`).join("")}</ul><p>Model names, feature availability and usage limits are provider-controlled and can change.</p></section>
${safetySection()}
<section><h2>Before ordering ChatGPT Plus</h2><ul><li>Confirm Personal access for the exact order.</li><li>Reconfirm the current AI Premium Shop price before payment.</li><li>Check OpenAI's current model and usage limits for Plus.</li><li>Confirm availability, delivery ETA and applicable order terms.</li></ul></section>
<section><h2>Need to compare other ChatGPT plans?</h2><p><a href="/chatgpt-plans-bangladesh">Compare ChatGPT Go vs Plus vs Pro vs Business in Bangladesh</a>.</p></section>
${sourceList(route.source_ids)}
<p><a href="/products">Browse all AI tools</a> · <a href="/pricing">Compare current pricing</a> · <a href="/how-to-order">How to order</a></p>
</main>`;
}

const PLAN_SPECS = [
  { slug: "chatgpt-go-bangladesh", label: "Go", fact: "go", fit: "Lower-cost individual access when you need more core ChatGPT use than Free.", check: "Check OpenAI's current country/currency price and current Go limits before comparing it with Plus." },
  { slug: "chatgpt-plus-bangladesh", label: "Plus", fact: "plus", fit: "Individual use when broader tools, higher limits and advanced reasoning access matter.", check: "Model availability and usage limits can change; verify the current account before purchase." },
  { slug: "chatgpt-pro-bangladesh", label: "Pro", fact: "pro", fit: "Higher-usage individual work where additional Pro allowance is valuable.", check: "OpenAI currently documents $100 and $200 Pro tiers. Confirm which exact provider tier the local listing corresponds to before payment." },
  { slug: "chatgpt-business-bangladesh", label: "Business", fact: "business", fit: "A team workspace when centralized billing and admin controls are required.", check: "OpenAI Business requires at least two paid seats. Confirm the exact seat and workspace arrangement instead of inferring it from a local listing name." }
];

function plansBody(records) {
  const route = evidence.routes["chatgpt-plans-bangladesh"];
  const rows = PLAN_SPECS.map((spec) => {
    const listing = currentRecord(records, spec.slug);
    const fact = evidence.provider_facts[spec.fact];
    return `<tr><th scope="row"><a href="/${esc(spec.slug)}">${esc(spec.label)}</a></th><td><strong>${esc(fact.official_reference)}</strong><br>${esc(fact.positioning)}</td><td>${listing ? `<strong>${money(listing.price)}/month</strong><br>${esc(access(listing.accessType))}` : "Confirm current price and access"}</td><td>${esc(spec.fit)}<br><small>${esc(spec.check)}</small></td></tr>`;
  }).join("");
  return `<main>
<nav aria-label="breadcrumb"><a href="/">Home</a> › <a href="/ai-assistant">AI Chat & Assistants</a> › ChatGPT plans</nav>
<h1>${esc(route.h1)}</h1>
<p>Compare OpenAI's current plan structure with the separate AI Premium Shop local catalog references. Provider references and local seller prices are different facts and should not be treated as a hidden conversion of each other.</p>
<section><h2>Go vs Plus vs Pro vs Business</h2><table><thead><tr><th>Plan</th><th>OpenAI reference</th><th>Current AI Premium Shop listing</th><th>Best fit and what to check</th></tr></thead><tbody>${rows}</tbody></table><p>AI Premium Shop prices come from the current governed public catalog and are reconfirmed before payment.</p></section>
<section><h2>How to choose</h2><ul><li>Start with whether this is individual use or a team workspace.</li><li>Compare provider-controlled limits and tools for the exact plan.</li><li>Use the AI Premium Shop BDT price only as the current local seller reference.</li><li>Confirm access, availability, delivery ETA and applicable order terms before payment.</li></ul></section>
<section><h2>Buying ChatGPT Plus specifically?</h2><p><a href="/chatgpt-plus-bangladesh">Open the dedicated ChatGPT Plus price and buying guide</a>.</p></section>
${safetySection()}
${sourceList(route.source_ids)}
<p><a href="/products">Browse all AI tools</a> · <a href="/pricing">Compare current pricing</a> · <a href="/how-to-order">How to order</a></p>
</main>`;
}

function setMeta(html, route, canonical) {
  return html
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(route.title)}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*(")/i, `$1${esc(route.description)}$2`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/>/i, `<meta property="og:title" content="${esc(route.title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/>/i, `<meta property="og:description" content="${esc(route.description)}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/>/i, `<meta property="og:url" content="${esc(canonical)}" />`)
    .replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/i, `<link rel="canonical" href="${esc(canonical)}" />`);
}

function replaceRoot(html, body) {
  const match = /<div\s+id="root"[^>]*>/i.exec(html);
  const bodyEnd = html.search(/<\/body>/i);
  if (!match || bodyEnd < 0) throw new Error("[chatgpt-money-prerender] cannot replace root");
  return `${html.slice(0, match.index)}<div id="root"><div id="prerender-shell">${body}</div></div>\n  ${html.slice(bodyEnd)}`;
}

let count = 0;
for (const slug of ROUTES) {
  const file = path.join(DIST, slug, "index.html");
  if (!fs.existsSync(file)) throw new Error(`[chatgpt-money-prerender] missing built route ${slug}`);
  const route = evidence.routes[slug];
  const records = recordsFor(slug);
  if (!records.length) throw new Error(`[chatgpt-money-prerender] no governed public records for ${slug}`);
  const canonical = `${SITE}${route.path}`;
  const body = slug === "chatgpt-plus-bangladesh" ? plusBody(records) : plansBody(records);
  let html = fs.readFileSync(file, "utf8");
  html = setMeta(html, route, canonical);
  html = replaceRoot(html, body);
  fs.writeFileSync(file, html, "utf8");
  count += 1;
}

console.log(`[chatgpt-money-prerender] enhanced ${count} owned ChatGPT route(s) from governed public catalog + first-party evidence`);
