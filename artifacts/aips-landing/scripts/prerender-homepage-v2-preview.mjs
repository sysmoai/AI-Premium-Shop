#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const APP = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(APP, "dist/public");
const sourcePath = join(dist, "index.html");
const outDir = join(dist, "__preview/homepage-v2");
const outPath = join(outDir, "index.html");

let html = readFileSync(sourcePath, "utf8");

const robots = '<meta name="robots" content="noindex, nofollow">';
if (/<meta\s+name=["']robots["'][^>]*>/i.test(html)) {
  html = html.replace(/<meta\s+name=["']robots["'][^>]*>/i, robots);
} else {
  html = html.replace(/<head([^>]*)>/i, `<head$1>\n    ${robots}`);
}

const canonical = '<link rel="canonical" href="https://aipremiumshop.com/">';
if (/<link\s+rel=["']canonical["'][^>]*>/i.test(html)) {
  html = html.replace(/<link\s+rel=["']canonical["'][^>]*>/i, canonical);
} else {
  html = html.replace(/<head([^>]*)>/i, `<head$1>\n    ${canonical}`);
}

const description = '<meta name="description" content="Private noindex preview of the next AI Premium Shop homepage: guided AI-tool discovery, access-model clarity and Bangladesh buying guidance.">';
if (/<meta\s+name=["']description["'][^>]*>/i.test(html)) {
  html = html.replace(/<meta\s+name=["']description["'][^>]*>/i, description);
} else {
  html = html.replace(/<head([^>]*)>/i, `<head$1>\n    ${description}`);
}

html = html.replace(/<title>[^<]*<\/title>/i, "<title>Homepage V2 Preview — AI Premium Shop</title>");
html = html.replace(/<html([^>]*)>/i, '<html$1 data-aips-preview="homepage-v2">');

// Keep this body intentionally free of prices, delivery times, warranties,
// rankings and other protected commercial claims. It is a noindex canary shell
// whose job is to describe the same decision architecture as HomeV2.tsx before
// React mounts. The existing head-level anti-flash contract hides
// #prerender-shell from JS-capable browsers on the first paint, while non-JS
// inspection still gets meaningful content instead of an empty root.
const shell = `
      <div id="prerender-shell">
        <main>
          <section>
            <p>AI Premium Shop Homepage V2 preview for Bangladesh</p>
            <h1>Find the right AI tool. Pay locally. Know exactly what access you get.</h1>
            <p>Compare AI tools by the work you need to do, understand the access model before paying, and move from research to the right product without sorting through the entire catalog yourself.</p>
            <p><a href="/products">Browse all AI tools</a></p>
          </section>
          <section>
            <h2>What do you want AI to help you do?</h2>
            <ul>
              <li><a href="/best-ai-for-students">Study and research</a></li>
              <li><a href="/best-ai-for-freelancers">Freelancing and client work</a></li>
              <li><a href="/best-ai-for-creators">Content and video creation</a></li>
              <li><a href="/best-ai-for-developers">Coding and app development</a></li>
              <li><a href="/best-ai-for-business">Business and automation</a></li>
              <li><a href="/products">Writing, marketing and SEO</a></li>
            </ul>
          </section>
          <section>
            <h2>Understand the access model before you pay</h2>
            <p>Homepage V2 makes Personal, Shared, Bundle and Setup or Service arrangements explicit buying information rather than hiding them behind a price card.</p>
            <p>Product-specific pages remain the source for current availability, access details and any approved commercial terms.</p>
          </section>
        </main>
      </div>`;

if (!/<div\s+id=["']root["']>\s*<\/div>/i.test(html)) {
  throw new Error("Homepage V2 preview refused: built Vite shell no longer has an empty #root");
}
html = html.replace(/<div\s+id=["']root["']>\s*<\/div>/i, `<div id="root">${shell}\n    </div>`);

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, html, "utf8");
console.log(`[homepage-v2-preview] wrote ${outPath} with static noindex decision shell`);
