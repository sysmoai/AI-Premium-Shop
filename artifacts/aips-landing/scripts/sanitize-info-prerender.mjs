#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const APP = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(APP, "dist/public");
const SITE = "https://aipremiumshop.com";

const ROUTES = {
  "/about": {
    title: "About AI Premium Shop | AI Tools in Bangladesh",
    description: "Learn how AI Premium Shop presents current AI catalog prices and access models in Bangladesh, with provider-controlled details verified before purchase.",
    h1: "About AI Premium Shop",
    body: `<p>AI Premium Shop helps people in Bangladesh compare AI product families, published AIPS prices and stated access models. AIPS has served customers since 2022 while keeping provider-controlled features and order-specific details separate from its own catalog data.</p><h2>How the site separates facts</h2><ul><li>Catalog evidence: current product identity, published AIPS BDT price and stated access model.</li><li>Provider verification: models, credits, quotas, exports, integrations, licensing and other provider-controlled entitlements must be checked for the exact plan.</li><li>Order confirmation: availability, delivery ETA, payment instructions and applicable terms are confirmed for the exact order before payment.</li></ul><h2>What not to assume</h2><p>An access label does not by itself prove a privacy or account-control arrangement. A product listing does not guarantee immediate availability or a fixed delivery time. A published AIPS price does not imply a provider discount unless a current comparison basis is explicitly stated.</p>`,
  },
  "/faq": {
    title: "AI Premium Shop FAQ | Orders, Access & Support",
    description: "Answers about AIPS catalog prices, access models, delivery confirmation, payment instructions, provider limits, support and order resolution.",
    h1: "Frequently Asked Questions",
    body: `<h2>What information on a product page should I rely on?</h2><p>Use current product identity, published AIPS BDT price and stated access model as AIPS catalog information. Provider-controlled features and limits can change.</p><h2>What do access labels mean?</h2><p>Shared, Personal, Team and Service are catalog labels. They do not by themselves guarantee a particular privacy, credential, ownership or simultaneous-use arrangement.</p><h2>How long will delivery take?</h2><p>Delivery depends on the exact product, access model and current availability. Confirm the current ETA for the order before payment.</p><h2>How do I pay?</h2><p>Payment instructions are confirmed for the exact order after the product, plan, duration, price and access model are agreed. Never share a PIN, OTP, password or unrelated financial credential.</p><h2>How are order issues resolved?</h2><p>Review the current Refund & Resolution Policy and the terms confirmed for the exact order. No blanket coverage period or outcome should be assumed.</p>`,
  },
  "/support": {
    title: "AI Premium Shop Support | Order & Access Help",
    description: "Get help with AIPS orders, access issues, provider changes and order terms. Send the exact plan context without sharing passwords, PINs or OTPs.",
    h1: "Support for Your AIPS Order",
    body: `<p>Support starts with the exact order, plan and access model. Availability, delivery ETA, refund/replacement coverage and provider-controlled limits are reviewed against the terms that applied to that order.</p><h2>What to send</h2><ul><li>Product or plan name and stated access model.</li><li>Approximate order time and payment reference when relevant.</li><li>A clear description of the issue and a screenshot if useful.</li></ul><h2>Protect sensitive credentials</h2><p>Do not send passwords, banking PINs, OTPs, full card details or unrelated private data. Mask credentials in screenshots.</p>`,
  },
  "/how-to-order": {
    title: "How to Order AI Tools from AIPS | Bangladesh",
    description: "How to order from AI Premium Shop: choose the exact plan, confirm price/access/availability/terms, receive payment instructions and verify access.",
    h1: "How to Order from AI Premium Shop",
    body: `<ol><li><strong>Choose the exact product and plan.</strong> Note the plan, duration and access model.</li><li><strong>Confirm the order details.</strong> Confirm current AIPS price, access model, availability, provider-controlled limits, delivery ETA and applicable terms.</li><li><strong>Receive order-specific payment instructions.</strong> Pay only after the amount and method are confirmed. Never share a banking PIN, OTP, password or full card details.</li><li><strong>Receive and verify the access details.</strong> Check that the arrangement matches what was confirmed and raise any mismatch with support.</li></ol>`,
  },
  "/contact": {
    title: "Contact AI Premium Shop | WhatsApp Support",
    description: "Contact AI Premium Shop on WhatsApp for current plan, order and access questions. Do not send passwords, PINs, OTPs or unrelated financial credentials.",
    h1: "Contact AI Premium Shop",
    body: `<p>Use WhatsApp for current plan, order and support questions. Response time depends on current support load.</p><h2>Before payment</h2><p>Confirm the exact product, plan, duration, published AIPS price, access model, availability, delivery ETA and applicable terms for the order.</p><h2>What to include in your message</h2><ul><li>The product or plan you are considering.</li><li>The duration and access model shown on the site, if applicable.</li><li>Whether you are asking about a new order or an existing order issue.</li><li>For an existing order, include an approximate order time or payment reference when relevant.</li></ul><h2>What support can confirm</h2><p>Support can confirm current AIPS pricing, stated access model, current availability, delivery ETA and the order-specific terms that apply before payment. Provider-controlled features, quotas and model availability should be checked for the exact plan because they may change outside AIPS.</p><h2>Protect sensitive information</h2><p>Do not send banking PINs, OTPs, passwords, full card details or unrelated private information. Use screenshots that mask sensitive data.</p>`,
  },
  "/refund-policy": {
    title: "Refund & Resolution Policy | AI Premium Shop",
    description: "How AI Premium Shop reviews order mismatches, access issues and resolution requests. Order-specific coverage and exclusions are confirmed before payment.",
    h1: "Refund & Resolution Policy",
    body: `<p>Last updated: 14 August 2026.</p><p>AIPS does not publish a blanket refund, replacement or warranty period that should be assumed for every product. Coverage depends on the exact order, access arrangement, issue and terms confirmed before payment.</p><h2>How a request is reviewed</h2><p>AIPS reviews what was confirmed, what was delivered, the current state of the access, any provider-side change and relevant customer actions. Depending on the facts and applicable order terms, a resolution may include correcting access, replacement where available, account/order credit, or a refund. No single outcome is guaranteed for every case.</p><h2>Keep evidence</h2><p>Keep the order confirmation, relevant payment reference and screenshots showing the issue. Mask credentials before sharing evidence.</p>`,
  },
  "/terms": {
    title: "Terms of Service | AI Premium Shop",
    description: "AIPS terms covering exact order details, third-party provider controls, payment safety, access responsibilities, privacy and order-specific resolutions.",
    h1: "Terms of Service",
    body: `<p>Last updated: 14 August 2026.</p><p>These terms describe the general AIPS service framework. The exact product, access model, price, availability and any order-specific coverage should be confirmed before payment.</p><h2>Exact order controls</h2><p>Confirm the product, plan, duration, published AIPS price, stated access model, availability, delivery ETA and applicable support/refund terms before payment.</p><h2>Third-party providers</h2><p>Underlying AI platforms are operated by third-party providers. They control their models, credits, quotas, storage, exports, integrations, licensing, availability and platform terms. AIPS is independent from those providers unless a page explicitly states and evidences a different relationship.</p><h2>Customer responsibilities</h2><p>Use access only as confirmed for the order, protect credentials, follow applicable provider rules and review AI outputs before relying on them.</p>`,
  },
  "/privacy-policy": {
    title: "Privacy Policy | AI Premium Shop",
    description: "How AI Premium Shop handles contact, order, AI concierge, analytics and third-party service data, plus practical guidance for protecting sensitive information.",
    h1: "Privacy Policy",
    body: `<p>Last updated: 14 August 2026.</p><p>This notice describes current site and contact flows without promising a retention, deletion or security outcome that is not mechanically guaranteed by the application.</p><h2>Information you choose to send</h2><p>AIPS may receive information you voluntarily send through WhatsApp or other contact channels. Do not send passwords, banking PINs, OTPs, full card details or unrelated sensitive information.</p><h2>Site integrations</h2><p>The current contact form prepares a WhatsApp message in your browser. The site also includes analytics and advertising integrations configured to activate after cookie consent. External services operate under their own policies.</p><h2>Retention and security</h2><p>AIPS may retain order and support records for operational, accounting, security, dispute-resolution and legal needs. Retention can vary. No internet or third-party messaging system can be guaranteed to be completely secure.</p><h2>Access-model privacy</h2><p>A Shared, Personal, Team or Service label is not itself a privacy guarantee. Confirm the exact arrangement and provider controls before using sensitive information.</p>`,
  },
};

const BLOCKED = ["30-day warranty", "30 day warranty", "5-30 min", "5–30 min", "5-15 min", "5–15 min", "2-4 hours", "2–4 hours", "under 5 min", "under-5-minute", "respond within 5", "delivered in minutes", "instant delivery", "no international card", "no questions asked", "all local and international payment", "own chat history", "don't see each other", "discount codes", "8+ hrs/week", "mastered in 1 hour"];
const esc = (value) => String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function cleanJsonLd(html) {
  return html.replace(/\s*<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi, (full, json) => json.toLowerCase().includes('"faqpage"') ? "" : full);
}

function setMeta(html, title, description, canonical) {
  let out = html
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(title)}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*(")/i, `$1${esc(description)}$2`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/>/i, `<meta property="og:title" content="${esc(title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/>/i, `<meta property="og:description" content="${esc(description)}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/>/i, `<meta property="og:url" content="${esc(canonical)}" />`);
  if (/<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/i.test(out)) out = out.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/i, `<link rel="canonical" href="${esc(canonical)}" />`);
  else out = out.replace(/<\/head>/i, `<link rel="canonical" href="${esc(canonical)}" />\n</head>`);
  return out;
}

function replaceRoot(html, body) {
  const start = /<div\s+id="root"[^>]*>/i.exec(html);
  const end = html.search(/<\/body>/i);
  if (!start || end < 0) throw new Error("[info-truth] generated root not found");
  return `${html.slice(0, start.index)}<div id="root"><div id="prerender-shell">${body}</div></div>\n  ${html.slice(end)}`;
}

for (const [route, config] of Object.entries(ROUTES)) {
  const file = path.join(DIST, route.slice(1), "index.html");
  if (!fs.existsSync(file)) throw new Error(`[info-truth] missing ${route}`);
  const canonical = `${SITE}${route}`;
  const body = `<main><nav aria-label="breadcrumb"><a href="/">Home</a> › ${esc(config.h1)}</nav><h1>${esc(config.h1)}</h1>${config.body}<p><a href="/products">Current catalog</a> · <a href="/pricing">Current pricing</a> · <a href="/support">Support</a></p></main>`;
  let html = cleanJsonLd(fs.readFileSync(file, "utf8"));
  html = setMeta(html, config.title, config.description, canonical);
  html = replaceRoot(html, body);
  const lower = html.toLowerCase();
  for (const phrase of BLOCKED) if (lower.includes(phrase.toLowerCase())) throw new Error(`[info-truth] ${route} contains blocked phrase: ${phrase}`);
  if ((html.match(/rel="canonical"/gi) ?? []).length !== 1) throw new Error(`[info-truth] ${route} must contain one canonical`);
  if ((html.match(/<h1[\s>]/gi) ?? []).length !== 1) throw new Error(`[info-truth] ${route} must contain one h1`);
  fs.writeFileSync(file, html, "utf8");
  console.log(`[info-truth] sanitized ${route}`);
}
