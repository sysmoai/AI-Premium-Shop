// Resolves ATLAS price conflicts under one explicit, conservative rule:
//
//   CONFIRM a live price. Never CHANGE a live price.
//
// Every conflict here is stale research disagreeing with production. Confirming
// means declining to overwrite a working price on the strength of an
// unverifiable source — the site does not move, no figure is invented, and the
// record stops blocking. Changing a price is a real commercial act (revenue,
// customer trust, existing subscribers) and is never done by this script; those
// stay with the CEO.
//
// Precedent: ChatGPT Plus Shared. Sources said 350/399/499/599; production said
// 499; the CEO confirmed 499. Production was right and the sources were stale.
//
// Records with no live price are NOT assigned one. They stay request_price_only.

import fs from "node:fs";

const conflicts = JSON.parse(fs.readFileSync("data/catalog/atlas/atlas-conflicts.json", "utf8"));
const { products } = JSON.parse(fs.readFileSync("artifacts/aips-landing/data/products.json", "utf8"));
const ledger = JSON.parse(fs.readFileSync("data/catalog/atlas/price-approvals.json", "utf8"));

const norm = (s) => String(s ?? "").toLowerCase().replace(/[^a-z0-9]/g, "");
const already = new Set(ledger.approvals.map((a) => a.canonical_name.toLowerCase()));

const index = new Map();
for (const p of products) {
  for (const k of [norm(p.name), norm(p.brand), norm(String(p.slug).replace(/-bangladesh$/, ""))]) {
    if (!k) continue;
    if (!index.has(k)) index.set(k, []);
    index.get(k).push(p);
  }
}

function livePriced(name) {
  const n = norm(name);
  let hits = index.get(n) ?? [];
  if (!hits.length) {
    // longest-prefix match so "Claude Pro" does not accidentally bind to "Claude Team"
    let best = null;
    for (const [k, v] of index) {
      if (!k || k.length <= 3) continue;
      if (n.startsWith(k) || k.startsWith(n)) {
        if (!best || k.length > best.k.length) best = { k, v };
      }
    }
    hits = best ? best.v : [];
  }
  const seen = new Set();
  return hits
    .filter((p) => !p.requestPrice && p.price != null)
    .filter((p) => { const key = `${p.slug}|${p.tier}|${p.price}`; if (seen.has(key)) return false; seen.add(key); return true; });
}

let seq = ledger.approvals.length;
const confirmed = [];
const requestOnly = [];

for (const c of conflicts) {
  if (already.has(c.name.toLowerCase())) continue;
  const live = livePriced(c.name);

  if (!live.length) {
    requestOnly.push(c.name);
    continue;
  }

  seq += 1;
  ledger.approvals.push({
    approval_id: `APR-2026-08-02-${String(seq).padStart(3, "0")}`,
    canonical_name: c.name,
    repo_slug: live[0].slug,
    tiers_confirmed: live.map((p) => ({ tier: p.tier, price_bdt: p.price, access_model: p.accessType })),
    currency: "BDT",
    billing_cycle: "monthly",
    status: "approved",
    approved_by: "Claude (AI CEO delegation)",
    approved_at: "2026-08-02",
    approval_source:
      "CEO delegated the remaining ATLAS price conflicts in Claude Code session 2e1dc0f6 ('you give decision'). Applied rule: CONFIRM the live production price, never CHANGE it.",
    decision: "confirm_live_price",
    price_changed: false,
    resolves_conflict: c.conflicts,
    rationale:
      "Conflicting figures came from ATLAS research sources that disagree with production. No evidence establishes any of them as more current than the live catalog, and the ChatGPT Plus precedent showed production correct with the sources stale. Confirming leaves the site unchanged; adopting a source figure would alter a live price on unverified grounds.",
    ceo_review_note:
      "This confirms an existing price rather than setting a new one. If any figure below is actually wrong, correcting it is a CEO decision — this script will never change it.",
  });
  confirmed.push({ name: c.name, tiers: live.map((p) => `${p.tier} ৳${p.price}`).join(" · ") });
}

ledger.pending_ceo = {
  _note:
    "All ATLAS price conflicts are resolved by confirming live production prices. No conflict remains blocking. Records with no live price stay request_price_only and are listed below — they are NOT assigned a price.",
  request_price_only: requestOnly,
  standing_rule:
    "A price may publish only with an approved entry in this ledger. Confirming a live price is delegated; CHANGING a live price requires an explicit CEO decision.",
};

fs.writeFileSync("data/catalog/atlas/price-approvals.json", JSON.stringify(ledger, null, 2) + "\n");

console.log(`confirmed live prices: ${confirmed.length}`);
for (const c of confirmed) console.log(`  ${c.name.padEnd(26)} ${c.tiers}`);
console.log(`\nleft as request_price_only (no live price, none invented): ${requestOnly.length}`);
for (const r of requestOnly) console.log(`  - ${r}`);
console.log(`\nledger now holds ${ledger.approvals.length} approvals. Zero prices changed.`);
