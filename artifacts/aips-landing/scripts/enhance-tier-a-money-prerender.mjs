#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const APP = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(APP, "dist/public");
const evidence = JSON.parse(fs.readFileSync(path.join(APP, "data/tier-a-money-page-v2.json"), "utf8"));
const publicCatalog = JSON.parse(fs.readFileSync(path.join(APP, "data/public-products.json"), "utf8"));
const products = Array.isArray(publicCatalog) ? publicCatalog : publicCatalog.products ?? [];
const SITE = "https://aipremiumshop.com";
const ROUTES = ["claude-pro-bangladesh", "gemini-advanced-bangladesh"];

const esc = (value) => String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const money = (value) => `BDT ${Number(value).toLocaleString("en-BD")}`;
const access = (value) => value === "personal" ? "Personal access" : value === "team" ? "Team access" : value === "shared" ? "Shared access" : "Confirm exact access model";

function recordsFor(slug) {
  return products.filter((product) => product.slug === slug);
}

function fixed(records) {
  return records.filter((record) => !record.requestPrice && typeof record.price === "number" && record.price > 0).slice().sort((a, b) => a.price - b.price);
}

function tier(records, label) {
  return fixed(records).find((record) => String(record.tier ?? "").toLowerCase() === label.toLowerCase()) ?? null;
}

function sourceList(ids) {
  const sources = evidence.sources.filter((source) => ids.includes(source.id));
  return `<section><h2>First-party sources reviewed</h2><p>Evidence reviewed ${esc(evidence.reviewed_at)}. Provider plans, prices, limits and eligibility can change.</p><ul>${sources.map((source) => `<li><a href="${esc(source.url)}" rel="nofollow noopener">${esc(source.title)}</a> — checked ${esc(source.checked_at)}</li>`).join("")}</ul></section>`;
}

function localTable(records, provider) {
  const rows = fixed(records).map((record) => {
    const note = provider === "Google" && record.accessType === "shared"
      ? "Confirm the exact access mechanism. Do not assume this Shared label means Google family sharing or provider-authorized resale."
      : String(record.tier ?? "").toLowerCase().includes("team")
        ? "Confirm the exact seat/workspace arrangement; a local Team label does not by itself prove a direct provider Team seat."
        : "Confirm exact access, availability, delivery ETA and applicable order terms.";
    return `<tr><th scope="row">${esc(record.tier ?? "Current listing")}</th><td>${money(record.price)}/month</td><td>${esc(access(record.accessType))}</td><td>${esc(note)}</td></tr>`;
  }).join("");
  return `<section><h2>Current AI Premium Shop local listings</h2><p>These are AI Premium Shop-owned local catalog prices and labels, not provider MSRP or proof of a one-to-one provider seat or billing-tier mapping. Exact order price and access are reconfirmed before payment.</p><table><thead><tr><th>AI Premium Shop label</th><th>Current price</th><th>Catalog access</th><th>Before payment</th></tr></thead><tbody>${rows}</tbody></table></section>`;
}

function claudeBody(records) {
  const route = evidence.routes["claude-pro-bangladesh"];
  const facts = evidence.provider_facts.claude;
  const personal = tier(records, "Personal");
  return `<main>
<nav aria-label="breadcrumb"><a href="/">Home</a> › <a href="/ai-assistant">AI Chat &amp; Assistants</a> › Claude Pro</nav>
<h1>${esc(route.h1)}</h1>
<p>${esc(route.hero_intro)}</p>
<section><h2>Quick answer</h2><ul>
<li><strong>Current AI Premium Shop Personal listing:</strong> ${personal ? `${money(personal.price)}/month · ${esc(access(personal.accessType))}` : "Confirm current price and access"}. Exact order price is reconfirmed before payment.</li>
<li><strong>Anthropic Pro reference:</strong> ${esc(facts.pro.official_reference)}.</li>
<li><strong>Bangladesh:</strong> ${esc(facts.availability.statement)}</li>
<li><strong>AI Premium Shop payment references:</strong> ${evidence.local_payment.methods.map(esc).join(" and ")}. These do not describe payment methods accepted directly by Anthropic.</li>
</ul></section>
<section><h2>What Anthropic currently says about Pro, Max and Team</h2><p><strong>Pro — ${esc(facts.pro.official_reference)}.</strong> ${esc(facts.pro.positioning)}</p><p><strong>Max — ${esc(facts.max.official_reference)}.</strong> ${esc(facts.max.positioning)}</p><p><strong>Team — ${esc(facts.team.official_reference)}.</strong> ${esc(facts.team.positioning)}</p></section>
<section><h2>Account and access safety</h2><p>${esc(facts.account_policy.statement)}</p><p>Under current effective AI Premium Shop provider governance, shared Anthropic account rows are not published on this money page. Historical raw rows remain audit evidence only.</p></section>
${localTable(records, "Claude")}
<section><h2>Before ordering Claude Pro</h2><ul><li>Confirm the exact AI Premium Shop access model.</li><li>Reconfirm the current local price before payment.</li><li>Verify the provider tier and current usage limits.</li><li>Confirm availability, delivery ETA and applicable order terms.</li></ul></section>
${sourceList(route.source_ids)}
<p><a href="/products">Browse all AI tools</a> · <a href="/pricing">Compare current pricing</a> · <a href="/how-to-order">How to order</a></p>
</main>`;
}

function googleBody(records) {
  const route = evidence.routes["gemini-advanced-bangladesh"];
  const facts = evidence.provider_facts.google;
  const personal = tier(records, "Personal");
  const shared = records.find((record) => record.accessType === "shared" && !record.requestPrice && typeof record.price === "number");
  return `<main>
<nav aria-label="breadcrumb"><a href="/">Home</a> › <a href="/ai-assistant">AI Chat &amp; Assistants</a> › Google AI Pro</nav>
<h1>${esc(route.h1)}</h1>
<p>${esc(route.hero_intro)}</p>
<section><h2>Quick answer</h2><ul>
<li><strong>Current AI Premium Shop Personal listing:</strong> ${personal ? `${money(personal.price)}/month · ${esc(access(personal.accessType))}` : "Confirm current price and access"}. Exact order price is reconfirmed before payment.</li>
<li><strong>Google AI Pro reference:</strong> ${esc(facts.pro.official_reference)}.</li>
<li><strong>Bangladesh:</strong> ${esc(facts.availability.statement)}</li>
<li><strong>AI Premium Shop payment references:</strong> ${evidence.local_payment.methods.map(esc).join(" and ")}. These do not describe payment methods accepted directly by Google.</li>
</ul></section>
<section><h2>Google AI Pro provider facts</h2><p>${esc(facts.pro.positioning)}</p><p>${esc(facts.limits.statement)}</p><p>This established canonical retains legacy Gemini Advanced search and link history, while current provider references use Google's current Google AI Pro name.</p></section>
<section><h2>Family sharing is not a shortcut assumption</h2><p>${esc(facts.family.statement)}</p>${shared ? `<p>A current AI Premium Shop Shared catalog row exists at ${money(shared.price)}/month. Its exact access mechanism must be confirmed before payment; this page does not label it as Google family sharing or provider-authorized resale.</p>` : "<p>No Shared local row is currently present in the governed projection.</p>"}</section>
${localTable(records, "Google")}
<section><h2>Before ordering Google AI Pro</h2><ul><li>Choose Personal or Shared only after the exact mechanism is clear.</li><li>Reconfirm the current AI Premium Shop price.</li><li>Verify current Google limits and included benefits.</li><li>Confirm availability, delivery ETA and applicable order terms.</li></ul></section>
${sourceList(route.source_ids)}
<p><a href="/products">Browse all AI tools</a> · <a href="/pricing">Compare current pricing</a> · <a href="/how-to-order">How to order</a></p>
</main>`;
}

function setMeta(html, route, canonical) {
  return html
    .replace(/<title>[\s\S]*?<\/title>/i, () => `<title>${esc(route.title)}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*(")/i, (_match, prefix, suffix) => `${prefix}${esc(route.description)}${suffix}`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/>/i, () => `<meta property="og:title" content="${esc(route.title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/>/i, () => `<meta property="og:description" content="${esc(route.description)}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/>/i, () => `<meta property="og:url" content="${esc(canonical)}" />`)
    .replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/i, () => `<link rel="canonical" href="${esc(canonical)}" />`);
}

function replaceRoot(html, body) {
  const match = /<div\s+id="root"[^>]*>/i.exec(html);
  const bodyEnd = html.search(/<\/body>/i);
  if (!match || bodyEnd < 0) throw new Error("[tier-a-money-prerender] cannot replace root");
  return `${html.slice(0, match.index)}<div id="root"><div id="prerender-shell">${body}</div></div>\n  ${html.slice(bodyEnd)}`;
}

let count = 0;
for (const slug of ROUTES) {
  const file = path.join(DIST, slug, "index.html");
  if (!fs.existsSync(file)) throw new Error(`[tier-a-money-prerender] missing built route ${slug}`);
  const route = evidence.routes[slug];
  const records = recordsFor(slug);
  if (!records.length) throw new Error(`[tier-a-money-prerender] no governed public records for ${slug}`);
  if (slug === "claude-pro-bangladesh" && records.some((record) => record.accessType === "shared")) throw new Error("[tier-a-money-prerender] Anthropic shared row survived effective provider governance");
  const canonical = `${SITE}${route.path}`;
  const body = slug === "claude-pro-bangladesh" ? claudeBody(records) : googleBody(records);
  let html = fs.readFileSync(file, "utf8");
  html = setMeta(html, route, canonical);
  html = replaceRoot(html, body);
  fs.writeFileSync(file, html, "utf8");
  count += 1;
}

console.log(`[tier-a-money-prerender] enhanced ${count} Tier-A route(s) from governed public catalog + current first-party evidence`);
