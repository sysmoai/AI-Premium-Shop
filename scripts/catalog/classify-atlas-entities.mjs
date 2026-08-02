// Deterministic entity classifier for the ATLAS consolidated dataset.
//
// Turns 343 raw research rows into canonical entities WITHOUT pretending each
// one is a sellable product. Every rule below keys off evidence already present
// in the raw record (aips_status_raw, category_raw, price fields); nothing is
// inferred from the model's own knowledge of the tool. Anything the rules
// cannot place with confidence becomes `unknown_needs_review` rather than a
// guess — an unresolved row is a correct outcome, a fabricated one is not.
//
// Output: data/catalog/atlas/atlas-canonical.json (+ conflicts, unresolved)
// Idempotent: same input always yields the same output. Safe to re-run.

import fs from "node:fs";
import path from "node:path";

const RAW = "data/catalog/atlas/atlas-consolidated-tools.raw.json";
const OUT_DIR = "data/catalog/atlas";

const raw = JSON.parse(fs.readFileSync(RAW, "utf8"));

const slugify = (s) =>
  String(s)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const lc = (v) => String(v ?? "").toLowerCase();

// ---------------------------------------------------------------------------
// Classification rules, evaluated in order. First match wins; each records the
// signal it fired on so a human can audit why any row landed where it did.
// ---------------------------------------------------------------------------
const RULES = [
  {
    id: "sub-product-no-price",
    entity_type: "variant",
    commercial_state: "not_for_resale",
    test: (r) => /sub-product of .*\(named only, no separate price\)/i.test(r.category_raw ?? ""),
    why: "category_raw marks it a named sub-product of a parent family with no separate price",
  },
  {
    id: "directory-mention-only",
    entity_type: "research_only",
    commercial_state: "research_only",
    test: (r) => /named in provider\/lab directory only/i.test(r.aips_status_raw ?? ""),
    why: "aips_status_raw: directory mention only, no plan or pricing attached",
  },
  {
    id: "research-only",
    entity_type: "research_only",
    commercial_state: "research_only",
    test: (r) => /^research[-\/ ]?only|research\/market-intel only|market-intel only/i.test(r.aips_status_raw ?? ""),
    why: "aips_status_raw explicitly marks the row research/market-intel only",
  },
  {
    id: "not-in-live-catalog",
    entity_type: "product_family",
    commercial_state: "watchlist",
    test: (r) => /not in live catalog/i.test(r.aips_status_raw ?? ""),
    why: "aips_status_raw states the product is not in the live catalog",
  },
  {
    id: "live-catalog-active",
    entity_type: "marketplace_offer",
    commercial_state: "pending_ceo",
    test: (r) => /active in live (aips )?(products )?catalog|active per top100|active per product index/i.test(r.aips_status_raw ?? ""),
    why: "aips_status_raw reports an active live-catalog SKU; must still reconcile against repo + CEO price approval",
  },
  {
    id: "registered-pricing-tbd",
    entity_type: "product_family",
    commercial_state: "pending_ceo",
    test: (r) => /registered|provisional|shortlist candidate|popular tool pool/i.test(r.aips_status_raw ?? ""),
    why: "aips_status_raw shows the tool registered/shortlisted but pricing or approval is unsettled",
  },
  {
    id: "regional-lab",
    entity_type: "provider",
    commercial_state: "research_only",
    test: (r) => /regional ai$/i.test(r.category_raw ?? ""),
    why: "category_raw identifies a regional AI lab/provider, not a purchasable plan",
  },
  {
    id: "model-or-api-platform",
    entity_type: "api_platform",
    commercial_state: "api_credit",
    test: (r) =>
      /cloud, inference and model platforms|cloud ai platform|model platform|api platform/i.test(r.category_raw ?? ""),
    why: "category_raw identifies an inference/model/API platform rather than a consumer subscription",
  },
];

const FALLBACK = {
  id: "unresolved",
  entity_type: "unknown_needs_review",
  commercial_state: "watchlist",
  why: "no rule matched with sufficient evidence; requires human classification",
};

// ---------------------------------------------------------------------------

const canonical = [];
const conflicts = [];
const unresolved = [];
const seenIds = new Map();

for (const [i, r] of raw.entries()) {
  const rule = RULES.find((x) => x.test(r)) ?? FALLBACK;

  // canonical_id must be stable across runs and unique across the set.
  let base = slugify(`${r.provider ?? "unknown"}-${r.name}`);
  let id = base;
  let n = 2;
  while (seenIds.has(id)) id = `${base}-${n++}`;
  seenIds.set(id, true);

  const hasConflict = Array.isArray(r.conflicts) && r.conflicts.length > 0;

  const entity = {
    canonical_id: id,
    canonical_name: r.name,
    aliases: r.aliases ?? [],
    entity_type: rule.entity_type,
    classification_rule: rule.id,
    classification_evidence: rule.why,
    provider: r.provider ?? null,
    canonical_slug: slugify(r.name),
    category_raw: r.category_raw ?? null,
    // Prices are preserved verbatim as OBSERVATIONS, never promoted to a
    // sellable price. Promotion requires explicit CEO approval.
    price_observations: {
      usd_raw: r.price_usd_raw ?? null,
      bdt_raw: r.price_bdt_raw ?? null,
    },
    aips_price_bdt: null,
    aips_price_approval_id: null,
    aips_commercial_state: rule.commercial_state,
    evidence_tier: "UNVERIFIED",
    evidence_sources: r.sources ?? [],
    source_count: (r.sources ?? []).length,
    source_record_index: i,
    conflict_flags: r.conflicts ?? [],
    notes: r.notes ?? null,
    website_page_state: "none",
    notion_page_id: null,
    last_imported: null,
  };

  canonical.push(entity);
  if (hasConflict) conflicts.push({ canonical_id: id, name: r.name, conflicts: r.conflicts });
  if (rule.id === "unresolved") unresolved.push({ canonical_id: id, name: r.name, raw: r });
}

fs.writeFileSync(path.join(OUT_DIR, "atlas-canonical.json"), JSON.stringify(canonical, null, 2) + "\n");
fs.writeFileSync(path.join(OUT_DIR, "atlas-conflicts.json"), JSON.stringify(conflicts, null, 2) + "\n");
fs.writeFileSync(path.join(OUT_DIR, "atlas-unresolved.json"), JSON.stringify(unresolved, null, 2) + "\n");

// ---- accounting: every raw row must land somewhere -------------------------
const byType = {};
const byState = {};
for (const e of canonical) {
  byType[e.entity_type] = (byType[e.entity_type] ?? 0) + 1;
  byState[e.aips_commercial_state] = (byState[e.aips_commercial_state] ?? 0) + 1;
}

console.log(`raw records in:            ${raw.length}`);
console.log(`canonical entities out:    ${canonical.length}`);
console.log(`accounted for:             ${canonical.length === raw.length ? "ALL" : "MISMATCH"}`);
console.log(`unique canonical_ids:      ${new Set(canonical.map((e) => e.canonical_id)).size}`);
console.log(`rows carrying conflicts:   ${conflicts.length}`);
console.log(`unresolved (need review):  ${unresolved.length}`);
console.log("\nby entity_type:");
for (const [k, v] of Object.entries(byType).sort((a, b) => b[1] - a[1])) console.log(`  ${String(v).padStart(4)}  ${k}`);
console.log("\nby commercial_state:");
for (const [k, v] of Object.entries(byState).sort((a, b) => b[1] - a[1])) console.log(`  ${String(v).padStart(4)}  ${k}`);
console.log("\nNOTE: zero entities are `approved`. No price here may be published");
console.log("      until CEO approval promotes it. See reports/catalog/.");
