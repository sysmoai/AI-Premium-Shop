// Builds an answerable CEO price decision sheet.
//
// Key design choice: for every conflicted ATLAS record we look up what the LIVE
// site currently sells. Most "conflicts" are stale research sources disagreeing
// with a production price that is already correct — as ChatGPT Plus turned out
// to be. Surfacing the live figure next to the conflicting ones turns a research
// puzzle into a yes/no question the CEO can answer in seconds.

import fs from "node:fs";

const conflicts = JSON.parse(fs.readFileSync("data/catalog/atlas/atlas-conflicts.json", "utf8"));
const { products } = JSON.parse(fs.readFileSync("artifacts/aips-landing/data/products.json", "utf8"));
const approvals = JSON.parse(fs.readFileSync("data/catalog/atlas/price-approvals.json", "utf8"));

const approvedNames = new Set(approvals.approvals.map((a) => a.canonical_name.toLowerCase()));
const norm = (s) => String(s ?? "").toLowerCase().replace(/[^a-z0-9]/g, "");

// index live products by normalized brand + name so we can find what we actually sell
const live = new Map();
for (const p of products) {
  for (const key of [norm(p.name), norm(p.brand), norm(String(p.slug).replace(/-bangladesh$/, ""))]) {
    if (!key) continue;
    if (!live.has(key)) live.set(key, []);
    live.get(key).push(p);
  }
}

function livePricesFor(name) {
  const n = norm(name);
  let hits = live.get(n) ?? [];
  if (!hits.length) {
    for (const [k, v] of live) {
      if (k && (n.startsWith(k) || k.startsWith(n)) && k.length > 3) { hits = v; break; }
    }
  }
  const seen = new Set();
  return hits
    .filter((p) => { const k = `${p.tier}|${p.price}`; if (seen.has(k)) return false; seen.add(k); return true; })
    .map((p) => `${p.tier}: BDT ${p.price}`);
}

const L = [];
L.push("# CEO Price Decision Sheet");
L.push("");
L.push(`**Generated:** ${new Date().toISOString().slice(0, 10)}  |  **For:** Emon Hossain`);
L.push("");
L.push("Per your instruction (option A), no conflicted price publishes until you confirm it");
L.push("individually. Each item below shows **what your live site sells right now** next to the");
L.push("conflicting figures from the research sources.");
L.push("");
L.push("**In most cases the live price is already correct and the conflict is just stale research.**");
L.push("Where that is so, you only need to reply \"confirm\" — nothing changes on the site.");
L.push("");
L.push("**Safe default:** anything you do not answer stays `request_price_only` and shows");
L.push("\"Request current price on WhatsApp\" instead of a number. Nothing breaks.");
L.push("");
L.push("---");
L.push("");

let resolved = 0;
let n = 0;
for (const c of conflicts) {
  if (approvedNames.has(c.name.toLowerCase())) { resolved++; continue; }
  n++;
  const lp = livePricesFor(c.name);
  L.push(`## ${n}. ${c.name}`);
  L.push("");
  L.push(lp.length ? `**Live site sells now:** ${lp.join("  ·  ")}` : "**Live site:** not currently sold");
  L.push("");
  L.push("Conflicting sources say:");
  for (const cf of c.conflicts) L.push(`> ${cf}`);
  L.push("");
  L.push(lp.length
    ? "**Your answer:** `confirm` (keep live price) — or state the correct BDT figure."
    : "**Your answer:** state the BDT price, or `request-only` to keep it quote-based.");
  L.push("");
  L.push("---");
  L.push("");
}

L.push("## Already decided");
L.push("");
for (const a of approvals.approvals) {
  L.push(`- **${a.canonical_name} — ${a.tier}: BDT ${a.approved_price_bdt}** (${a.approval_id}, ${a.approved_at})`);
  L.push(`  - ${a.conflict_resolution_note}`);
}
L.push("");

fs.writeFileSync("docs/coordination/CEO_PRICE_DECISION_SHEET.md", L.join("\n"));
console.log(`decision sheet: ${n} awaiting decision, ${resolved} already approved`);
console.log("→ docs/coordination/CEO_PRICE_DECISION_SHEET.md");
