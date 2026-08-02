// Measures the live catalog against the full CEO tools universe.
//
// Matching is deliberately conservative in BOTH directions:
//  - an alias table handles the same commercial product under different names
//    (Make/Integromat, Gemini Advanced/Google AI Pro, Hailuo/MiniMax)
//  - a short generic token like "Flow" or "Spark" is NEVER prefix-matched,
//    because "Flow" would otherwise "match" Flowise and report false coverage.
// Over-reporting coverage is the failure mode that matters here, so ambiguous
// cases resolve to MISSING and get looked at rather than silently counted.

import fs from "node:fs";

const universe = JSON.parse(fs.readFileSync("data/coverage/tools-universe.json", "utf8"));
const { products } = JSON.parse(fs.readFileSync("artifacts/aips-landing/data/products.json", "utf8"));
const routesSrc = fs.readFileSync("artifacts/aips-landing/src/lib/productRoutes.ts", "utf8");
const sitemap = fs.readFileSync("artifacts/aips-landing/public/sitemap.xml", "utf8");

const norm = (s) => String(s ?? "").toLowerCase().replace(/[^a-z0-9]/g, "");

// Same commercial product, different names in the universe list.
const ALIAS = {
  "geminiadvanced": "googleaipro", "googleaipro": "googleaipro",
  "make": "makeintegromat", "makepro": "makeintegromat",
  "hailuo": "minimax", "minimaxmusic": "minimax",
  "flux": "blackforestlabs",
  "dalle credits setup": "dallecredits",
  "supergrokheavy": "supergrok", "supergroklite": "supergrok",
  "chatgptprobd": "chatgptpro",
  "canvaproai": "canvapro", "capcutproai": "capcutpro",
  "leonardoai": "leonardo", "leonardoai2": "leonardo",
};

// Words that carry no identifying signal — stripped before token comparison so
// "Poe Pro" still matches "Poe", and "Looker Studio Setup" matches
// "Looker Studio Dashboard Setup".
const STOP = new Set([
  "ai","pro","plus","premium","free","setup","service","cloud","studio","app",
  "the","bd","bangladesh","subscription","plan","access","credits","assist",
  "assistant","creator","starter","basic","standard","max","team","business",
  "enterprise","monthly","annual","api","com","io","dev","new",
]);

// Distinctive tokens for a name, lowercased and de-punctuated. A name that is
// ENTIRELY stopwords keeps its raw tokens so it can still match something.
function tokens(s) {
  const raw = String(s ?? "").toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
  const kept = raw.filter((t) => !STOP.has(t));
  return kept.length ? kept : raw;
}

// Tokens generic enough that a match on them ALONE means nothing.
const AMBIGUOUS = new Set(["flow","spark","nova","gemma","llama","codex","ada","relay","pi","yi","chat","search","code","video","image","music","voice","design","write","meta"]);

const brandRoutes = new Set(
  [...(routesSrc.match(/export const BRAND_PAGE_SLUGS = \[([\s\S]*?)\]/)?.[1] ?? "").matchAll(/"([^"]+)"/g)].map((m) => m[1]),
);
const sitemapPaths = new Set(
  [...sitemap.matchAll(/<loc>https:\/\/aipremiumshop\.com([^<]*)<\/loc>/g)].map((m) => m[1]),
);

// Build a searchable index of everything the catalog actually contains.
const index = [];
for (const p of products) {
  const sources = [p.name, p.brand, p.provider, String(p.slug).replace(/-bangladesh$/, "").replace(/-/g, " ")];
  index.push({
    keys: sources.map(norm).filter(Boolean),
    tokenSets: sources.filter(Boolean).map(tokens),
    slug: p.slug,
    tier: p.tier,
    priced: !p.requestPrice && p.price != null,
    requestPrice: !!p.requestPrice,
    price: p.price,
  });
}

function find(toolName) {
  let n = norm(toolName);
  if (ALIAS[n]) n = ALIAS[n];

  const exact = index.filter((r) => r.keys.includes(n));
  if (exact.length) return { hits: exact, how: "exact" };

  // Token containment: every distinctive token of the tool name appears in one
  // of the record's token sets. "Poe Pro" -> ["poe"] matches record ["poe"];
  // "Looker Studio Setup" -> ["looker"] matches ["looker","dashboard"].
  const tt = tokens(toolName);
  if (!tt.length) return { hits: [], how: "none" };
  const meaningful = tt.filter((t) => !AMBIGUOUS.has(t) && t.length >= 3);
  if (!meaningful.length) return { hits: [], how: "none" };

  const hits = index.filter((r) =>
    r.tokenSets.some((set) => meaningful.every((t) => set.includes(t))),
  );
  if (hits.length) return { hits, how: "token" };

  return { hits: [], how: "none" };
}

const rows = [];
for (const [group, def] of Object.entries(universe.groups)) {
  for (const tool of def.tools) {
    const { hits, how } = find(tool);
    let status, on, route = null, evidence, action = null, blocked = null;

    if (!hits.length) {
      on = "no";
      status = def.sellable ? "MISSING" : "NOT_APPLICABLE";
      evidence = "no catalog record matched name/brand/provider/slug";
      if (def.sellable) action = "evaluate for request-price listing";
      else blocked = def._why ?? "not a resellable consumer subscription";
    } else {
      const priced = hits.filter((h) => h.priced);
      const rp = hits.filter((h) => h.requestPrice);
      route = hits[0].slug;
      const inSitemap =
        sitemapPaths.has(`/product/${route}`) || sitemapPaths.has(`/${route}`) || brandRoutes.has(route);
      on = "yes";
      if (priced.length) {
        status = "PRESENT_FULL";
        evidence = `${priced.length} priced tier(s): ${priced.map((h) => `${h.tier} BDT ${h.price}`).join(", ")}`;
      } else if (rp.length) {
        status = "REQUEST_PRICE_ONLY";
        evidence = `request-price record, no published price`;
      } else {
        status = "PRESENT_PARTIAL";
        evidence = "record exists but neither priced nor request-price";
      }
      if (!inSitemap) {
        status = status === "PRESENT_FULL" ? "PRESENT_PARTIAL" : status;
        evidence += " | NOT in sitemap/brand routes";
        action = "add to sitemap";
      }
      if (how === "token") evidence += " | matched by token overlap, verify family is correct";
    }

    rows.push({
      tool_name: tool,
      group,
      sellable_universe: def.sellable,
      on_website: on,
      website_slug_or_route: route,
      commercial_status: status,
      evidence,
      action_needed: action,
      blocked_reason: blocked,
    });
  }
}

const by = (s) => rows.filter((r) => r.commercial_status === s);
const sellable = rows.filter((r) => r.sellable_universe);
const missing = by("MISSING");
const partial = by("PRESENT_PARTIAL");
const present = [...by("PRESENT_FULL"), ...by("REQUEST_PRICE_ONLY")];
const na = by("NOT_APPLICABLE");

fs.writeFileSync("data/coverage/full-tools-coverage-report.json", JSON.stringify(rows, null, 2) + "\n");
fs.writeFileSync("data/coverage/missing-tools.json", JSON.stringify(missing, null, 2) + "\n");
fs.writeFileSync("data/coverage/partial-tools.json", JSON.stringify(partial, null, 2) + "\n");
fs.writeFileSync("data/coverage/present-tools.json", JSON.stringify(present, null, 2) + "\n");

console.log(`TOTAL_SYSTEM_TOOLS        ${rows.length}`);
console.log(`  of which sellable       ${sellable.length}`);
console.log(`  not-applicable          ${na.length}  (labs / cloud infra / free)`);
console.log(`PRESENT (full+req-price)  ${present.length}`);
console.log(`PARTIAL                   ${partial.length}`);
console.log(`MISSING (sellable only)   ${missing.length}`);
console.log(`\nsellable coverage: ${present.length}/${sellable.length} = ${Math.round((present.length / sellable.length) * 100)}%`);
console.log("\nMISSING by group:");
const g = {};
for (const m of missing) g[m.group] = (g[m.group] ?? 0) + 1;
for (const [k, v] of Object.entries(g).sort((a, b) => b[1] - a[1])) console.log(`  ${String(v).padStart(3)}  ${k}`);
