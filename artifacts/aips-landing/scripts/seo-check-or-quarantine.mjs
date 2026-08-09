import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const appDir = path.resolve(here, "..");
const repoRoot = path.resolve(appDir, "../..");
const outDir = path.resolve(appDir, "dist/public");
const site = JSON.parse(fs.readFileSync(path.join(repoRoot, "ops/ssot/site.json"), "utf8"));
const commercial = JSON.parse(fs.readFileSync(path.join(repoRoot, "ops/ssot/commercial.json"), "utf8"));
const state = site?.current_publication_state ?? {};

function listHtml(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) listHtml(full, out);
    else if (entry.isFile() && entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

function routeFor(file) {
  const rel = path.relative(outDir, file).replace(/\\/g, "/");
  if (rel === "index.html") return "/";
  if (rel === "404.html") return "/404";
  return `/${rel.replace(/\/index\.html$/, "")}`;
}

function fileFor(route) {
  if (route === "/") return path.join(outDir, "index.html");
  return path.join(outDir, route.replace(/^\//, ""), "index.html");
}

function hasNoindex(html) {
  return /<meta\s+name="robots"\s+content="[^"]*noindex/i.test(html);
}

if (state.public_indexing === "selective") {
  const errors = [];
  const expected = new Set((state.indexable_routes ?? []).map((r) => r.replace(/\/$/, "") || "/"));
  const sitemap = fs.readFileSync(path.join(appDir, "public/sitemap.xml"), "utf8");
  const sitemapRoutes = new Set(
    [...sitemap.matchAll(/<loc>https:\/\/aipremiumshop\.com([^<]*)<\/loc>/g)]
      .map((m) => (m[1] || "/").replace(/\/$/, "") || "/")
  );

  const missingFromSitemap = [...expected].filter((r) => !sitemapRoutes.has(r));
  const unexpectedInSitemap = [...sitemapRoutes].filter((r) => !expected.has(r));
  if (missingFromSitemap.length) errors.push(`SSOT indexable routes missing from sitemap: ${missingFromSitemap.join(", ")}`);
  if (unexpectedInSitemap.length) errors.push(`sitemap contains routes not approved for indexing: ${unexpectedInSitemap.join(", ")}`);
  if (commercial.publication_allowed !== false || commercial.quarantine !== true) {
    errors.push("selective recovery expects commercial publication to remain disabled and quarantined");
  }

  const blockedPatterns = [
    /10,000\+\s+customers/i,
    /30-day\s+(?:replacement\s+)?warranty/i,
    /5\s*[–-]\s*30\s*min(?:ute)?/i,
    /instant\s+delivery/i,
    /starter\s+shared/i,
    /(?:৳|BDT\s*)\s*[0-9][0-9,]*/i,
  ];

  for (const route of expected) {
    const file = fileFor(route);
    if (!fs.existsSync(file)) {
      errors.push(`${route}: approved indexable route has no static HTML`);
      continue;
    }
    const html = fs.readFileSync(file, "utf8");
    if (hasNoindex(html)) errors.push(`${route}: approved indexable route is noindex`);
    if (!/<title>[^<]+<\/title>/i.test(html)) errors.push(`${route}: missing title`);
    if (!/<meta\s+name="description"\s+content="[^"]+"/i.test(html)) errors.push(`${route}: missing meta description`);
    if ((html.match(/<h1[\s>]/gi) ?? []).length !== 1) errors.push(`${route}: must contain exactly one H1`);
    const canonical = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i)?.[1];
    const expectedCanonical = `https://aipremiumshop.com${route === "/" ? "/" : route}`;
    if (canonical !== expectedCanonical) errors.push(`${route}: canonical is ${canonical ?? "missing"}, expected ${expectedCanonical}`);
    if (!html.includes('id="prerender-shell"')) errors.push(`${route}: missing prerender shell`);
    if (!/<script\b[^>]*type="module"[^>]*src="[^"]+"/i.test(html)) errors.push(`${route}: missing built client module`);
    for (const pattern of blockedPatterns) {
      if (pattern.test(html)) errors.push(`${route}: blocked historical commercial claim matched ${pattern}`);
    }
  }

  // Everything outside the audited indexable set is review-gated by default.
  // /privacy is a legacy alias whose React canonical points to /privacy-policy;
  // it is tolerated here until the alias is converted to a redirect.
  const toleratedAliases = new Set(["/privacy"]);
  for (const file of listHtml(outDir)) {
    const route = routeFor(file);
    if (expected.has(route) || toleratedAliases.has(route) || route === "/404") continue;
    const html = fs.readFileSync(file, "utf8");
    if (!hasNoindex(html)) errors.push(`${route}: non-approved route is indexable during commerce quarantine`);
  }

  const chatgptPaths = ["/chatgpt-plus-bangladesh", "/product/chatgpt-plus-bangladesh"];
  for (const route of chatgptPaths) {
    const file = fileFor(route);
    if (!fs.existsSync(file)) continue;
    const html = fs.readFileSync(file, "utf8");
    if (!hasNoindex(html)) errors.push(`${route}: ChatGPT compliance-review route must be noindex`);
    if (!/shared[^<]{0,80}(?:not being published|should not be shared|blocked)/i.test(html)) {
      errors.push(`${route}: missing explicit shared-account publication block`);
    }
  }

  if (errors.length) {
    console.error(`selective-publication SEO gate failed (${errors.length} issue${errors.length === 1 ? "" : "s"})`);
    errors.slice(0, 80).forEach((error) => console.error(`- ${error}`));
    process.exit(1);
  }
  console.log(`selective-publication SEO gate: ${expected.size} audited routes indexable; all other commercial routes review-gated`);
} else {
  const marker = "Product availability is under verification";
  const indexPath = path.join(outDir, "index.html");

  if (fs.existsSync(indexPath) && fs.readFileSync(indexPath, "utf8").includes(marker)) {
    const files = listHtml(outDir);
    const errors = [];
    const prohibited = [
      /starter\s+shared/i,
      /premium\s+shared/i,
      /shared\s+(?:account|plan|seat|password|credential)/i,
      /(?:BDT|৳)\s*[0-9][0-9,]*/i,
      /order\s+on\s+whatsapp/i,
      />\s*order(?:\s+now)?\s*</i,
    ];

    for (const file of files) {
      const html = fs.readFileSync(file, "utf8");
      const rel = path.relative(outDir, file);
      if (!html.includes(marker)) errors.push(`${rel}: missing quarantine marker`);
      if (!/name=["']robots["'][^>]*content=["']noindex,\s*nofollow["']/i.test(html)) errors.push(`${rel}: missing noindex,nofollow`);
      if (/<script\b/i.test(html)) errors.push(`${rel}: executable client script present in quarantine HTML`);
      for (const rule of prohibited) if (rule.test(html)) errors.push(`${rel}: prohibited commercial/shared pattern ${rule}`);
    }

    if (!files.length) errors.push("no generated HTML files found");
    if (errors.length) {
      console.error(`commerce-quarantine SEO gate failed (${errors.length} issue${errors.length === 1 ? "" : "s"})`);
      for (const error of errors.slice(0, 50)) console.error(`- ${error}`);
      process.exit(1);
    }

    console.log(`commerce-quarantine SEO gate: ${files.length} HTML files are fail-closed and noindexed`);
  } else {
    await import("./seo-check.mjs");
  }
}
