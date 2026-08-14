// Build-time gate for the Higgsfield offer (spec section 7).
//
// This runs BEFORE vite build. Every rule here is a claim that, if published
// wrong, is a legal or trust problem rather than a cosmetic bug — so each one
// exits non-zero rather than warning. The whole point is that no future session
// can quietly ship an expired offer, an unscoped "unlimited", or the word
// "official" by editing a component.
//
// It checks two surfaces:
//   1. data/higgsfield-offer.json — internal consistency of the source of truth.
//   2. The page component + the catalog record — that nothing bypasses (1) by
//      hardcoding a price, a credit count, or a banned word.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const APP = path.join(here, "..");

const errors = [];
const warnings = [];
const fail = (msg) => errors.push(msg);
const warn = (msg) => warnings.push(msg);

const offer = JSON.parse(fs.readFileSync(path.join(APP, "data/higgsfield-offer.json"), "utf8"));
const { products } = JSON.parse(fs.readFileSync(path.join(APP, "data/products.json"), "utf8"));

// Dhaka "today". The offer is sold in Bangladesh; an offer that expires at
// midnight Dhaka must not read as live because the build machine is in UTC.
const dhakaNow = new Date(Date.now() + 6 * 60 * 60 * 1000);
const today = dhakaNow.toISOString().split("T")[0];

const c = offer.compliance;
const o = offer.offer;

// ---- 1. Compliance state is coherent -------------------------------------

const VALID_STATUS = ["inquiry-only", "active", "paused", "blocked"];
if (!VALID_STATUS.includes(c.status)) {
  fail(`compliance.status "${c.status}" is not one of ${VALID_STATUS.join(", ")}`);
}
if (!/^[A-G]$/.test(c.category)) {
  fail(`compliance.category "${c.category}" must be a single letter A-G (spec section 2)`);
}
// F = unverified delivery model, G = prohibited. Spec section 2: "Do not enable
// checkout for F or G."
if (["F", "G"].includes(c.category) && (c.ctaEnabled || c.transactionalCheckout)) {
  fail(`compliance.category ${c.category} forbids a transactional CTA, but ctaEnabled=${c.ctaEnabled} / transactionalCheckout=${c.transactionalCheckout}`);
}
if (c.authorizationOnFile && !c.authorizationEvidence) {
  fail("compliance.authorizationOnFile is true but authorizationEvidence is null — an authorization claim needs a pointer to the document");
}
if (!c.authorizationOnFile && c.category !== "F" && c.category !== "G") {
  fail(`no authorization on file, so compliance.category must be F or G — got ${c.category}`);
}
if (!c.disclaimer || c.disclaimer.length < 40) {
  fail("compliance.disclaimer is missing or too short — an independent-provider disclaimer is required (spec section 2)");
}
const reviewDocPath = path.join(APP, "..", "..", c.reviewDoc);
if (!fs.existsSync(reviewDocPath)) {
  fail(`compliance.reviewDoc "${c.reviewDoc}" is missing from the build context — the decision record is required`);
}

// ---- 2. Offer dates -------------------------------------------------------

// Spec section 7: "fail when the offer end date is before the current Dhaka
// time" and "an offer is expired but still marked active".
if (o.offerEnd) {
  if (o.offerEnd < today) {
    fail(`offer.offerEnd ${o.offerEnd} is in the past (Dhaka today: ${today}) — an expired promotion must not be published`);
  }
  if (o.offerStart && o.offerStart > o.offerEnd) {
    fail(`offer.offerStart ${o.offerStart} is after offer.offerEnd ${o.offerEnd}`);
  }
}
// The expired poster date must never become a published date.
if (o.offerEnd && o.offerEnd === o.expiredCreativeDate) {
  fail(`offer.offerEnd was set to the expired creative's date ${o.expiredCreativeDate} — that promotion is over`);
}

// ---- 3. Price is never published without a fresh, sourced verification ----

if (o.priceBDT != null) {
  if (!o.priceVerifiedOn) {
    fail("offer.priceBDT is set but offer.priceVerifiedOn is missing — a visible price requires a verification date (spec section 7)");
  }
  if (!o.priceSource) {
    fail("offer.priceBDT is set but offer.priceSource is missing");
  }
  if (!["indicative", "confirmed"].includes(o.priceStatus)) {
    fail(`offer.priceStatus "${o.priceStatus}" must be "indicative" or "confirmed"`);
  }
  // A price older than 90 days is stale enough to mislead.
  const ageDays = (Date.parse(today) - Date.parse(o.priceVerifiedOn)) / 86400000;
  if (ageDays > 90) {
    fail(`offer.priceVerifiedOn ${o.priceVerifiedOn} is ${Math.round(ageDays)} days old — re-verify before publishing a price`);
  }
}

// ---- 4. Account-ownership language must match the delivery model ----------

// Spec section 7: fail when "a personal account is described as shared or vice
// versa". The whole compliance position rests on the customer owning the
// account, so the two fields must agree.
const OWNERSHIP_MODELS = {
  customer: ["customer-owned-account-setup-assistance", "customer-owned-account-purchase-assistance"],
  aips: ["authorized-reseller-sale", "team-seat"],
};
if (o.accountOwnership === "customer" && !OWNERSHIP_MODELS.customer.includes(o.deliveryModel)) {
  fail(`offer.accountOwnership is "customer" but deliveryModel "${o.deliveryModel}" implies otherwise`);
}
if (o.accountOwnership === "customer" && o.renewalOwner !== "customer") {
  fail("a customer-owned account cannot have renewalOwner other than 'customer'");
}

// ---- 5. Unverified vendor claims never leak into published fields ---------

// Every pendingVerification item is a claim we are NOT allowed to state as
// fact. Assert none of them appear in the fields that render as features.
// Checked as BLOCKS, not sentences. A FAQ question and its answer are one
// claim: "Is AIPS an official partner?" / "No." is compliant, and splitting on
// sentence boundaries would read the question alone and reject it. Each block
// below is the smallest unit a reader actually sees together.
const publishedBlocks = [
  offer.platform.summary,
  ...offer.platform.capabilities,
  ...offer.platform.useCases.map((u) => `${u.title} ${u.body}`),
  ...offer.faq.map((f) => `${f.q} ${f.a}`),
  offer.credits.explainer,
  o.priceNote,
  o.accountOwnershipNote,
  offer.seo.title,
  offer.seo.metaDescription,
].map((s) => String(s ?? "").toLowerCase());

const publishedFactText = publishedBlocks.join(" ");
const NEGATED = /\b(no|not|never|neither|without|cannot|won't|will not)\b/;

// "unlimited" is allowed ONLY where the block also defines or denies a scope.
// Spec section 15: no "unlimited" without scope.
for (const block of publishedBlocks) {
  if (!block.includes("unlimited")) continue;
  const hasScope = NEGATED.test(block) || /\b(ceiling|scope|limit|fair.use|which models|every credit)\b/.test(block);
  if (!hasScope) {
    fail(`published text uses "unlimited" with no stated scope or denial: "${block.trim().slice(0, 120)}"`);
  }
}

// Banned trademark/authorization words. Allowed only inside an explicit
// negation — the disclaimer and the "are you an official partner? no" FAQ both
// need to say the word in order to deny it.
for (const term of c.bannedTerms) {
  const re = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
  for (const block of publishedBlocks) {
    if (re.test(block) && !NEGATED.test(block)) {
      fail(`banned term "${term}" used without negation: "${block.trim().slice(0, 120)}"`);
    }
  }
}

// A credit figure must not appear as fact while it sits in pendingVerification.
const creditsPending = offer.pendingVerification.items.some((i) => /credit/i.test(i.claim));
if (creditsPending && /\b\d{3,4}\s*(monthly\s*)?credits\b/i.test(publishedFactText)) {
  fail("a specific credit count appears in published text while credits are still in pendingVerification");
}

// ---- 6. The component cannot bypass this file ----------------------------

const pagePath = path.join(APP, "src/pages/HiggsfieldPage.tsx");
if (fs.existsSync(pagePath)) {
  const src = fs.readFileSync(pagePath, "utf8");
  // Strip the import line and comments before scanning for literals.
  const scan = src.replace(/^\s*(\/\/.*|\/\*[\s\S]*?\*\/)$/gm, "");
  if (String(o.priceBDT) && new RegExp(`\\b${o.priceBDT}\\b`).test(scan)) {
    fail(`HiggsfieldPage.tsx hardcodes the price ${o.priceBDT} — read it from higgsfield-offer.json instead`);
  }
  if (/\b1,?200\s*credits\b/i.test(scan)) {
    fail("HiggsfieldPage.tsx hardcodes a credit count — that claim is unverified and must come from the data file");
  }
  for (const term of ["official", "authorized reseller", "official partner"]) {
    const re = new RegExp(`["'\`][^"'\`]*\\b${term}\\b`, "i");
    if (re.test(scan)) {
      fail(`HiggsfieldPage.tsx contains a string literal using "${term}" — banned without written authorization`);
    }
  }
  if (!src.includes("higgsfield-offer.json")) {
    fail("HiggsfieldPage.tsx does not import higgsfield-offer.json — the page must be data-driven");
  }
}

// ---- 7. The catalog record agrees with this file -------------------------

const recs = products.filter((p) => p.slug === offer.productSlug);
if (!recs.length) {
  fail(`no product in products.json has slug "${offer.productSlug}"`);
} else {
  for (const r of recs) {
    if (r.price != null && c.status === "inquiry-only") {
      fail(`products.json "${r.slug}" carries price ${r.price} while the offer is inquiry-only — a published Offer price would contradict the compliance state`);
    }
    // Unsupported trust claims that spec sections 2/10/19 forbid on this page.
    const recText = JSON.stringify(r).toLowerCase();
    if (/10,000\+ customers|trusted by \d/.test(recText)) {
      fail(`products.json "${r.slug}" still carries an unsupported customer-count claim`);
    }
    if (/full privacy/.test(recText)) {
      fail(`products.json "${r.slug}" claims "full privacy" — only allowed with a documented customer-owned delivery model, and the wording must say so explicitly`);
    }
    // The broken template artifacts this session found live on the page.
    if (/confirmed on whatsapp via whatsapp|delivery in confirmed on whatsapp/.test(recText)) {
      fail(`products.json "${r.slug}" contains a broken delivery-template string`);
    }
  }
}

// ---- report ---------------------------------------------------------------

for (const w of warnings) console.warn(`  warn  ${w}`);
if (errors.length) {
  console.error(`\nvalidate-higgsfield-offer: ${errors.length} blocking problem(s)\n`);
  for (const e of errors) console.error(`  FAIL  ${e}`);
  console.error("");
  process.exit(1);
}
console.log(`validate-higgsfield-offer: OK (status=${c.status}, category=${c.category}, cta=${c.ctaEnabled ? "enabled" : "disabled"}, ${offer.pendingVerification.items.length} claims pending verification)`);
