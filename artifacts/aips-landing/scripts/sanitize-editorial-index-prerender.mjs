#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const APP = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(APP, "dist/public");
const SITE = "https://aipremiumshop.com";
const blog = JSON.parse(fs.readFileSync(path.join(APP, "data/blog-guides.json"), "utf8"));

const esc = (value) => String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function setMeta(html, title, description, canonical) {
  let out = html
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(title)}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*(")/i, `$1${esc(description)}$2`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/>/i, `<meta property="og:title" content="${esc(title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/>/i, `<meta property="og:description" content="${esc(description)}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/>/i, `<meta property="og:url" content="${esc(canonical)}" />`);
  if (/<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/i.test(out)) {
    out = out.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/i, `<link rel="canonical" href="${esc(canonical)}" />`);
  } else {
    out = out.replace(/<\/head>/i, `<link rel="canonical" href="${esc(canonical)}" />\n</head>`);
  }
  return out;
}

function replaceRoot(html, body) {
  const start = /<div\s+id="root"[^>]*>/i.exec(html);
  const end = html.search(/<\/body>/i);
  if (!start || end < 0) throw new Error("[editorial-index-truth] generated root not found");
  return `${html.slice(0, start.index)}<div id="root"><div id="prerender-shell">${body}</div></div>\n  ${html.slice(end)}`;
}

function writeRoute(route, title, description, body) {
  const file = route === "/" ? path.join(DIST, "index.html") : path.join(DIST, route.slice(1), "index.html");
  if (!fs.existsSync(file)) throw new Error(`[editorial-index-truth] missing ${route}`);
  const canonical = `${SITE}${route}`;
  let html = fs.readFileSync(file, "utf8");
  html = setMeta(html, title, description, canonical);
  html = replaceRoot(html, body);
  if ((html.match(/rel="canonical"/gi) ?? []).length !== 1) throw new Error(`[editorial-index-truth] ${route} must have one canonical`);
  fs.writeFileSync(file, html, "utf8");
  console.log(`[editorial-index-truth] sanitized ${route}`);
}

const blogBody = `<main>
<nav aria-label="breadcrumb"><a href="/">Home</a> › Blog</nav>
<h1>AI Guides for Bangladesh</h1>
<p>Use these verification-first guides to choose AI tools by workflow, access model and current AIPS commercial context. Provider-controlled models, credits, quotas, licensing and other entitlements can change and should be checked for the exact plan.</p>
<h2>Current editorial library</h2>
<ul>${blog.posts.map((post) => `<li><a href="/blog/${esc(post.slug)}">${esc(post.title)}</a> — ${esc(post.description)}</li>`).join("")}</ul>
<h2>Before choosing a subscription</h2>
<ul><li>Start from the workflow you need to complete.</li><li>Choose an access model appropriate for the data you will process.</li><li>Compare the current published AIPS price, then verify provider-controlled details for the exact plan.</li><li>Confirm current availability, delivery ETA and applicable order terms before payment.</li></ul>
<p><a href="/products">Current catalog</a> · <a href="/pricing">Current pricing</a> · <a href="/guides">Decision guides</a></p>
</main>`;

const guideGroups = [
  ["By audience", [
    ["Students", "/best-ai-for-students"], ["Freelancers", "/best-ai-for-freelancers"], ["Creators", "/best-ai-for-creators"], ["Business owners", "/best-ai-for-business"], ["Developers", "/best-ai-for-developers"], ["Job seekers", "/best-ai-for-job-seekers"], ["Designers", "/best-ai-for-designers"], ["Marketers", "/best-ai-for-marketers"], ["Educators", "/guides/educators"],
  ]],
  ["By workflow", [
    ["AI assistants", "/ai-assistant"], ["Writing & SEO", "/ai-writing"], ["AI image", "/ai-image"], ["AI video", "/ai-video"], ["Code & development", "/ai-code"], ["Voice & music", "/ai-voice-music"], ["Workspace", "/ai-workspace"], ["Design", "/ai-design"],
  ]],
  ["By published AIPS price", [
    ["Under BDT 500", "/ai-under-500"], ["Under BDT 1,000", "/ai-under-1000"], ["Under BDT 3,000", "/ai-under-3000"], ["Subscription decision guide", "/best-ai-subscription-2026"],
  ]],
  ["Compare exact plans", [
    ["ChatGPT vs Claude", "/chatgpt-vs-claude"], ["ChatGPT vs Gemini", "/chatgpt-vs-gemini"], ["ChatGPT vs Perplexity", "/chatgpt-vs-perplexity"], ["Claude vs Gemini", "/claude-vs-gemini"], ["Copilot vs Cursor", "/copilot-vs-cursor"], ["Midjourney vs Ideogram", "/midjourney-vs-ideogram"], ["Canva vs Adobe Express", "/canva-vs-adobe-express"],
  ]],
];

const guidesBody = `<main>
<nav aria-label="breadcrumb"><a href="/">Home</a> › Guides</nav>
<h1>Choose an AI Tool by the Decision You Need to Make</h1>
<p>Start from your workflow, access requirements and budget. AIPS pages can establish current public product identity, published BDT price and stated access model; provider-controlled features and limits should be verified for the exact plan.</p>
${guideGroups.map(([heading, items]) => `<section><h2>${esc(heading)}</h2><ul>${items.map(([label, href]) => `<li><a href="${esc(href)}">${esc(label)}</a></li>`).join("")}</ul></section>`).join("")}
<h2>Before payment</h2>
<p>Confirm current price, access model, availability, provider-controlled limits, delivery ETA and applicable terms for the exact order.</p>
<p><a href="/products">Current catalog</a> · <a href="/blog">Editorial guides</a> · <a href="/pricing">Current pricing</a></p>
</main>`;

writeRoute(
  "/blog",
  "AI Guides Bangladesh | AI Premium Shop",
  "AI decision guides for Bangladesh covering tools, access, payments, workflows and comparisons with current AIPS catalog context.",
  blogBody,
);
writeRoute(
  "/guides",
  "AI Tool Guides Bangladesh | AI Premium Shop",
  "Browse AI Premium Shop decision guides by audience, workflow, price threshold and comparison. Verify current price, access and provider limits before choosing.",
  guidesBody,
);
