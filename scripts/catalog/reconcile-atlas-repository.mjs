// Reconciles ATLAS commercial candidates against the live repository catalog.
// Read-only: produces a report, changes no catalog data. Nothing here promotes
// an ATLAS row into a sellable product — that requires CEO price approval.

import fs from "node:fs";

const canonical = JSON.parse(fs.readFileSync("data/catalog/atlas/atlas-canonical.json", "utf8"));
const { products } = JSON.parse(fs.readFileSync("artifacts/aips-landing/data/products.json", "utf8"));

const norm = (s) => String(s ?? "").toLowerCase().replace(/[^a-z0-9]/g, "");

const repoKeys = new Set();
const repoBrands = new Set();
for (const p of products) {
  repoKeys.add(norm(p.name));
  repoKeys.add(norm(p.brand));
  repoKeys.add(norm(String(p.slug).replace(/-bangladesh$/, "")));
  if (p.brand) repoBrands.add(norm(p.brand));
}

const candidates = canonical.filter(
  (e) => e.entity_type === "marketplace_offer" || e.entity_type === "product_family",
);

const matched = [];
const missing = [];
for (const e of candidates) {
  const n = norm(e.canonical_name);
  const hit = repoKeys.has(n) || [...repoBrands].some((b) => b && (n.startsWith(b) || b.startsWith(n)));
  (hit ? matched : missing).push(e);
}

const L = [];
L.push("# ATLAS vs Repository Catalog Diff");
L.push("");
L.push(`**Generated:** ${new Date().toISOString()}`);
L.push("");
L.push("Compares ATLAS commercial candidates (`marketplace_offer` + `product_family`)");
L.push("against the live repo catalog at `artifacts/aips-landing/data/products.json`.");
L.push("");
L.push("| Metric | Count |");
L.push("|---|---|");
L.push(`| ATLAS commercial candidates | ${candidates.length} |`);
L.push(`| Already represented in repo | ${matched.length} |`);
L.push(`| Not in repo catalog | ${missing.length} |`);
L.push(`| Repo distinct products | ${new Set(products.map((p) => p.slug)).size} |`);
L.push(`| Repo plan/tier records | ${products.length} |`);
L.push("");
L.push("## Not currently in the repo catalog");
L.push("");
L.push("These ATLAS candidates have no obvious match on the live site. They are **not**");
L.push("automatically new products: each needs a CEO-approved BDT price and an");
L.push("access-model review before it could be sold. Until then they stay `pending_ceo`");
L.push("and appear nowhere public.");
L.push("");
for (const e of missing) {
  L.push(
    `- **${e.canonical_name}** (${e.provider ?? "unknown provider"}) — state: \`${e.aips_commercial_state}\`, sources: ${e.source_count}`,
  );
}
L.push("");
L.push("## Already represented in the repo catalog");
L.push("");
for (const e of matched) L.push(`- ${e.canonical_name} (${e.provider ?? "?"})`);
L.push("");

fs.writeFileSync("reports/catalog/atlas-vs-repository-diff.md", L.join("\n"));

console.log(`candidates: ${candidates.length} | in repo: ${matched.length} | missing: ${missing.length}`);
console.log("report: reports/catalog/atlas-vs-repository-diff.md");
