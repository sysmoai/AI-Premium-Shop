#!/usr/bin/env node
import { existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const APP = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(APP, "dist/public");
const rootPath = join(dist, "index.html");
const productsPath = join(dist, "products/index.html");
const previewDir = join(dist, "__preview/homepage-v2");
const previewPath = join(previewDir, "index.html");
const catalogLite = JSON.parse(readFileSync(join(APP, "data/catalog-lite.json"), "utf8"));
const RETIRED_PRODUCT_SLUGS = new Set(["replit-bangladesh"]);
const activeCatalogRecords = catalogLite.products.filter((product) => !RETIRED_PRODUCT_SLUGS.has(product.slug));
const activeFamilyCount = new Set(activeCatalogRecords.map((product) => product.slug)).size;

const shell = `
      <div id="prerender-shell">
        <main>
          <section>
            <p>AI Premium Shop for Bangladesh</p>
            <h1>Find the right AI tool. Pay locally. Know exactly what access you get.</h1>
            <p>Compare AI tools by the work you need to do, understand the access model before paying, and move from research to the right product without sorting through the entire catalog yourself.</p>
            <p><a href="/products">Browse all AI tools</a> · <a href="/pricing">Compare AI tool pricing</a></p>
          </section>
          <section>
            <h2>Browse AI tools by category</h2>
            <ul>
              <li><a href="/ai-assistant">AI chat and assistants</a></li>
              <li><a href="/ai-image">AI image and design tools</a></li>
              <li><a href="/ai-video">AI video tools</a></li>
              <li><a href="/ai-voice-music">AI voice and music tools</a></li>
              <li><a href="/ai-code">AI coding and development tools</a></li>
              <li><a href="/ai-workspace">AI workspace and productivity tools</a></li>
              <li><a href="/ai-writing">AI writing and SEO tools</a></li>
              <li><a href="/ai-design">AI design and creative tools</a></li>
              <li><a href="/bundles">AI bundles and setup services</a></li>
            </ul>
          </section>
          <section>
            <h2>What do you want AI to help you do?</h2>
            <ul>
              <li><a href="/best-ai-for-students">Study and research</a></li>
              <li><a href="/best-ai-for-freelancers">Freelancing and client work</a></li>
              <li><a href="/best-ai-for-creators">Content and video creation</a></li>
              <li><a href="/best-ai-for-developers">Coding and app development</a></li>
              <li><a href="/best-ai-for-business">Business and automation</a></li>
              <li><a href="/best-ai-for-job-seekers">CV, interview and job-search workflows</a></li>
            </ul>
          </section>
          <section>
            <h2>Compare by budget and use case</h2>
            <ul>
              <li><a href="/ai-under-500">AI tools under BDT 500</a></li>
              <li><a href="/ai-under-1000">AI tools under BDT 1,000</a></li>
              <li><a href="/ai-under-3000">AI tools under BDT 3,000</a></li>
              <li><a href="/chatgpt-vs-claude-bangladesh">ChatGPT vs Claude</a></li>
              <li><a href="/chatgpt-vs-gemini">ChatGPT vs Gemini</a></li>
              <li><a href="/copilot-vs-cursor">GitHub Copilot vs Cursor</a></li>
              <li><a href="/midjourney-vs-ideogram">Midjourney vs Ideogram</a></li>
              <li><a href="/best-ai-subscription-2026">Best AI subscription guide</a></li>
            </ul>
          </section>
          <section>
            <h2>Understand the access model before you pay</h2>
            <p>Personal, Shared, Bundle and Setup or Service arrangements are explicit buying information rather than details hidden behind a price card.</p>
            <p>Product-specific pages remain the source for current availability, access details and approved commercial terms.</p>
          </section>
        </main>
      </div>`;

function replaceRoot(html) {
  const match = /<div\s+id=["']root["'][^>]*>/i.exec(html);
  const bodyEnd = html.search(/<\/body>/i);
  if (!match || bodyEnd < 0 || match.index >= bodyEnd) {
    throw new Error("Homepage V2 prerender refused: built document has no replaceable #root before </body>");
  }
  return `${html.slice(0, match.index)}<div id="root">${shell}\n    </div>\n  ${html.slice(bodyEnd)}`;
}

function setTitle(html, title) {
  if (/<title>[^<]*<\/title>/i.test(html)) return html.replace(/<title>[^<]*<\/title>/i, `<title>${title}</title>`);
  return html.replace(/<head([^>]*)>/i, `<head$1>\n    <title>${title}</title>`);
}

function setDescription(html, description) {
  const tag = `<meta name="description" content="${description}">`;
  if (/<meta\s+name=["']description["'][^>]*>/i.test(html)) {
    return html.replace(/<meta\s+name=["']description["'][^>]*>/i, tag);
  }
  return html.replace(/<head([^>]*)>/i, `<head$1>\n    ${tag}`);
}

function setCanonical(html) {
  const canonical = '<link rel="canonical" href="https://aipremiumshop.com/">';
  if (/<link\s+rel=["']canonical["'][^>]*>/i.test(html)) {
    return html.replace(/<link\s+rel=["']canonical["'][^>]*>/i, canonical);
  }
  return html.replace(/<head([^>]*)>/i, `<head$1>\n    ${canonical}`);
}

function setOg(html, property, value) {
  const escaped = property.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`<meta\\s+property=["']${escaped}["'][^>]*>`, "i");
  const tag = `<meta property="${property}" content="${value}">`;
  if (re.test(html)) return html.replace(re, tag);
  return html.replace(/<head([^>]*)>/i, `<head$1>\n    ${tag}`);
}

function removeRobots(html) {
  return html.replace(/\s*<meta\s+name=["']robots["'][^>]*>/gi, "");
}

function removeJsonLdType(html, targetType) {
  return html.replace(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, (block) => {
    const match = block.match(/<script\b[^>]*>([\s\S]*?)<\/script>/i);
    if (!match) return block;
    try {
      const parsed = JSON.parse(match[1]);
      const nodes = Array.isArray(parsed) ? parsed : [parsed];
      const containsTarget = nodes.some((node) => {
        const type = node && typeof node === "object" ? node["@type"] : null;
        return Array.isArray(type) ? type.includes(targetType) : type === targetType;
      });
      return containsTarget ? "" : block;
    } catch {
      return block;
    }
  });
}

function sanitizeProductsStatic() {
  if (!existsSync(productsPath)) throw new Error("Products prerender is missing before truth sanitization");
  let html = readFileSync(productsPath, "utf8");
  const title = `AI Tools in Bangladesh — ${activeFamilyCount} Active Tool Families | AI Premium Shop`;
  const description = `Browse ${activeFamilyCount} active AI tool families by category and compare public BDT prices. Check each product page for current access, availability and delivery details.`;

  html = removeJsonLdType(html, "FAQPage");
  html = setTitle(html, title);
  html = setDescription(html, description);
  html = setOg(html, "og:title", title);
  html = setOg(html, "og:description", description);
  html = setOg(html, "og:url", "https://aipremiumshop.com/products");
  html = html.replace(/All \d+ AI Tools/g, `All ${activeFamilyCount} AI Tools`);
  html = html.replace(
    /<p>\d+ premium subscriptions with BDT prices\.[^<]*<\/p>/i,
    `<p>${activeCatalogRecords.length} current public plan records with BDT prices where available. Check each product page for current access, availability and delivery details before purchase.</p>`,
  );
  html = html.replace(/<li><a href=["']\/replit-bangladesh["'][^>]*>[\s\S]*?<\/li>/gi, "");

  if (/fast delivery/i.test(html)) throw new Error("Products prerender truth guard failed: stale fast-delivery claim remains");
  if (/replit-bangladesh/i.test(html)) throw new Error("Products prerender truth guard failed: retired Replit route remains");
  if (/30[- ]day (replacement )?warranty/i.test(html)) throw new Error("Products prerender truth guard failed: stale universal warranty remains");

  writeFileSync(productsPath, html, "utf8");
  console.log(`[products-truth] sanitized static /products for ${activeFamilyCount} active tool families`);
}

function productionDocument(source) {
  let html = replaceRoot(source);
  html = removeRobots(html);
  html = removeJsonLdType(html, "FAQPage");
  html = html.replace(/\sdata-aips-preview=["']homepage-v2["']/gi, "");
  html = setCanonical(html);
  html = setTitle(html, "AI Premium Shop — Find the Right AI Tool in Bangladesh");
  html = setDescription(html, "Find and compare AI tools for study, freelancing, coding, content and business. Understand access models, pay locally in Bangladesh and choose from the current public AIPS catalog.");
  html = setOg(html, "og:title", "AI Premium Shop — Find the Right AI Tool in Bangladesh");
  html = setOg(html, "og:description", "Find and compare AI tools for study, freelancing, coding, content and business. Understand access models and pay locally in Bangladesh.");
  html = setOg(html, "og:url", "https://aipremiumshop.com/");
  const head = html.match(/<head[\s\S]*?<\/head>/i)?.[0] ?? "";
  if (/noindex/i.test(head)) throw new Error("Homepage V2 production prerender refused: root head contains noindex");
  if (/"@type"\s*:\s*"FAQPage"/i.test(head)) throw new Error("Homepage V2 production prerender refused: stale FAQPage schema remains");
  if (!html.includes("Find the right AI tool. Pay locally. Know exactly what access you get.")) {
    throw new Error("Homepage V2 production prerender refused: V2 H1 missing");
  }
  return html;
}

function previewDocument(productionHtml) {
  let html = productionHtml.replace(/<html([^>]*)>/i, '<html$1 data-aips-preview="homepage-v2">');
  const robots = '<meta name="robots" content="noindex, nofollow">';
  html = html.replace(/<head([^>]*)>/i, `<head$1>\n    ${robots}`);
  html = setTitle(html, "Homepage V2 Preview — AI Premium Shop");
  html = setDescription(html, "Private noindex preview of the next AI Premium Shop homepage: guided AI-tool discovery, access-model clarity and Bangladesh buying guidance.");
  return html;
}

sanitizeProductsStatic();

const source = readFileSync(rootPath, "utf8");
const productionHtml = productionDocument(source);
writeFileSync(rootPath, productionHtml, "utf8");
console.log(`[homepage-v2] wrote production static shell to ${rootPath}`);

const previewHtml = previewDocument(productionHtml);
mkdirSync(previewDir, { recursive: true });
writeFileSync(previewPath, previewHtml, "utf8");
console.log(`[homepage-v2-preview] wrote ${previewPath} with static noindex decision shell`);