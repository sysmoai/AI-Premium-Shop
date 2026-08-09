import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const appDir = path.resolve(here, "..");
const repoRoot = path.resolve(appDir, "../..");
const outDir = path.resolve(appDir, "dist/public");
const commercialPath = path.resolve(repoRoot, "ops/ssot/commercial.json");

if (!fs.existsSync(outDir)) throw new Error(`Build output not found: ${outDir}`);
if (!fs.existsSync(commercialPath)) throw new Error(`Commercial SSOT not found: ${commercialPath}`);

const commercial = JSON.parse(fs.readFileSync(commercialPath, "utf8"));
const existingRoot = fs.readFileSync(path.join(outDir, "index.html"), "utf8");

// Vite fingerprints these files at build time. Preserve the generated asset tags
// while replacing only the public HTML projection produced by the historical
// prerender system.
const moduleScripts = [...existingRoot.matchAll(/<script\b[^>]*type="module"[^>]*src="[^"]+"[^>]*><\/script>/g)]
  .map((m) => m[0]).join("\n");
const styleLinks = [...existingRoot.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*href="[^"]+"[^>]*>/g)]
  .map((m) => m[0]).join("\n");

const esc = (s) => String(s ?? "")
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;");

const WA = "https://wa.me/8801865385348?text=Hi%2C%20I%20have%20a%20question%20about%20AI%20Premium%20Shop.";

const nav = `<nav><a href="/">Home</a><a href="/products">Products</a><a href="/about">About</a><a href="/faq">FAQ</a><a href="/support">Support</a></nav>`;
const footer = `<footer><strong>AI Premium Shop</strong><span>Bangladesh-focused AI product discovery and verified offers.</span><a href="/privacy-policy">Privacy</a><a href="/terms">Terms</a></footer>`;

function doc({ title, description, body, canonical, noindex = false, lang = "en" }) {
  const canon = canonical ? `<link rel="canonical" href="${esc(canonical)}" />` : "";
  const robots = noindex ? `<meta name="robots" content="noindex,nofollow" />` : `<meta name="robots" content="index,follow" />`;
  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}" />
${robots}
${canon}
<meta name="theme-color" content="#070b1d" />
<style>
:root{color-scheme:dark}*{box-sizing:border-box}body{margin:0;background:#070b1d;color:#fff;font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}a{color:inherit}.wrap{width:min(1120px,calc(100% - 32px));margin:auto}.top{position:sticky;top:0;z-index:5;border-bottom:1px solid rgba(255,255,255,.1);background:rgba(7,11,29,.92);backdrop-filter:blur(14px)}.top .wrap{min-height:64px;display:flex;align-items:center;justify-content:space-between;gap:20px}.brand{font-weight:900;text-decoration:none}.top nav{display:flex;gap:18px}.top nav a{font-size:14px;color:#c9ceda;text-decoration:none}.hero{padding:78px 0 66px}.pill{display:inline-block;border:1px solid rgba(244,185,66,.3);background:rgba(244,185,66,.09);color:#f4b942;border-radius:999px;padding:7px 10px;font-size:12px;font-weight:800}.hero h1{font-size:clamp(38px,7vw,72px);line-height:1;letter-spacing:-.045em;margin:20px 0;max-width:930px}.hero p,.copy{color:#b8c1d9;line-height:1.75;max-width:780px}.actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:26px}.btn{display:inline-flex;min-height:46px;align-items:center;justify-content:center;border-radius:12px;padding:0 18px;text-decoration:none;font-weight:800;border:1px solid rgba(255,255,255,.14)}.btn.primary{background:#fff;color:#070b1d}.btn.wa{background:#25d366;color:#07140b;border-color:#25d366}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;padding:8px 0 60px}.card{border:1px solid rgba(255,255,255,.1);background:#0d1330;border-radius:18px;padding:20px}.card h2,.card h3{margin:0 0 10px}.card p{margin:0;color:#9faac4;line-height:1.65;font-size:14px}.section{padding:46px 0;border-top:1px solid rgba(255,255,255,.08)}.section h2{font-size:28px;margin:0 0 18px}.list{display:grid;gap:10px}.item{border:1px solid rgba(255,255,255,.1);border-radius:14px;padding:15px;background:rgba(255,255,255,.025)}footer{border-top:1px solid rgba(255,255,255,.1);padding:28px 0;color:#8792ad;display:flex;gap:16px;flex-wrap:wrap;font-size:13px}footer a{color:#cbd3e8}.review{min-height:62vh;display:flex;align-items:center}.review .card{max-width:760px}.review h1{font-size:clamp(34px,6vw,54px);line-height:1.05;letter-spacing:-.035em;margin:15px 0}html.js #prerender-shell{display:none!important}@media(max-width:760px){.top nav{display:none}.grid{grid-template-columns:1fr}.hero{padding-top:54px}.section{padding:36px 0}}
</style>
<script>document.documentElement.className += " js";</script>
${styleLinks}
</head>
<body>
<div id="root"><div id="prerender-shell">
<header class="top"><div class="wrap"><a class="brand" href="/">AI Premium Shop</a>${nav}</div></header>
${body}
<div class="wrap">${footer}</div>
</div></div>
${moduleScripts}
</body>
</html>`;
}

const core = new Map([
  ["/", {
    title: "AI Premium Shop Bangladesh | AI Tools, Guides & Verified Offers",
    description: "Explore AI tools and buying guidance for Bangladesh. Commercial offers are published only after pricing, access and provider-compliance checks.",
    body: `<main><section class="hero"><div class="wrap"><span class="pill">Public website restored · verified-only commerce</span><h1>Find the right AI tools without guessing what you are buying.</h1><p>AI Premium Shop is rebuilding its catalog so rich product pages, posters and conversion flows are separated from unverified prices, access methods and provider claims.</p><div class="actions"><a class="btn primary" href="/products">Browse products</a><a class="btn wa" href="${WA}">Contact support</a></div></div></section><section class="wrap grid"><div class="card"><h2>AI Assistants</h2><p>Research, writing, analysis and general-purpose AI tools.</p></div><div class="card"><h2>AI Creative</h2><p>Image, video, design and creator tools.</p></div><div class="card"><h2>AI Productivity</h2><p>Coding, workspace and business productivity tools.</p></div></section><section class="section"><div class="wrap"><h2>How product pages are being rebuilt</h2><div class="grid"><div class="card"><h3>1. Verify</h3><p>Check current provider facts, access rules and the commercial record.</p></div><div class="card"><h3>2. Create</h3><p>Build a website-ready product poster and responsive media variants.</p></div><div class="card"><h3>3. Release</h3><p>Verify Vercel preview, pass checks, merge and verify production.</p></div></div></div></section></main>`
  }],
  ["/products", {
    title: "AI Products & Categories | AI Premium Shop Bangladesh",
    description: "Browse AI product categories. Commercial offers return only after current pricing, access, delivery and provider-compliance checks.",
    body: `<main><section class="hero"><div class="wrap"><span class="pill">Verified-offer catalog rebuilding</span><h1>AI products, organized by what you actually need to do.</h1><p>The historical catalog is not being republished as current. Each offer returns only after its commercial facts are cleared.</p></div></section><section class="wrap grid"><div class="card"><h2>AI Assistants</h2><p>Offers under verification.</p></div><div class="card"><h2>AI Image & Design</h2><p>Offers under verification.</p></div><div class="card"><h2>AI Video</h2><p>Offers under verification.</p></div><div class="card"><h2>AI Coding</h2><p>Offers under verification.</p></div><div class="card"><h2>AI Writing</h2><p>Offers under verification.</p></div><div class="card"><h2>AI Workspace</h2><p>Offers under verification.</p></div></section></main>`
  }],
  ["/about", {
    title: "About AI Premium Shop",
    description: "About AI Premium Shop, a Bangladesh-focused AI product discovery and verified-offer platform.",
    body: `<main><section class="hero"><div class="wrap"><h1>About AI Premium Shop</h1><p>AI Premium Shop is building a Bangladesh-focused catalog for AI software, plans and practical buying guidance. Public commercial claims are versioned and reviewed before publication.</p></div></section></main>`
  }],
  ["/faq", {
    title: "FAQ | AI Premium Shop",
    description: "Frequently asked questions about AI Premium Shop product verification, posters and support.",
    body: `<main><section class="hero"><div class="wrap"><h1>Frequently asked questions</h1><div class="list"><div class="item"><strong>Why are some products under review?</strong><p class="copy">Prices, access models, availability and provider rules can change. Those facts stay unpublished until current.</p></div><div class="item"><strong>Will product posters be added?</strong><p class="copy">Yes. Approved products and plans can receive a dedicated website poster after the visual matches the verified facts.</p></div><div class="item"><strong>Can I still ask about a product?</strong><p class="copy">Yes. Use the public WhatsApp support channel.</p></div></div></div></section></main>`
  }],
  ["/support", {
    title: "Support | AI Premium Shop",
    description: "Contact AI Premium Shop support for current product and availability questions.",
    body: `<main><section class="hero"><div class="wrap"><h1>Need help choosing an AI tool?</h1><p>Use the public support channel for current availability questions. Do not send passwords, OTPs or other account credentials.</p><div class="actions"><a class="btn wa" href="${WA}">Open WhatsApp support</a></div></div></section></main>`
  }],
  ["/contact", {
    title: "Contact | AI Premium Shop",
    description: "Contact AI Premium Shop support for current product and availability questions.",
    body: `<main><section class="hero"><div class="wrap"><h1>Contact AI Premium Shop</h1><p>For current product and availability questions, use the public WhatsApp support channel. Do not send passwords or one-time codes.</p><div class="actions"><a class="btn wa" href="${WA}">Open WhatsApp support</a></div></div></section></main>`
  }],
  ["/privacy", {
    title: "Privacy Policy | AI Premium Shop",
    description: "Privacy information for the AI Premium Shop website.",
    body: `<main><section class="hero"><div class="wrap"><h1>Privacy Policy</h1><p>This website may collect basic technical information needed to operate the service. Do not send passwords, OTPs or other sensitive account credentials through public support channels.</p></div></section></main>`
  }],
  ["/privacy-policy", {
    title: "Privacy Policy | AI Premium Shop",
    description: "Privacy information for the AI Premium Shop website.",
    body: `<main><section class="hero"><div class="wrap"><h1>Privacy Policy</h1><p>This website may collect basic technical information needed to operate the service. Do not send passwords, OTPs or other sensitive account credentials through public support channels.</p></div></section></main>`
  }],
  ["/terms", {
    title: "Terms | AI Premium Shop",
    description: "Website terms for AI Premium Shop.",
    body: `<main><section class="hero"><div class="wrap"><h1>Website Terms</h1><p>Product names and trademarks belong to their respective owners. AI Premium Shop does not claim provider authorization unless that relationship is explicitly verified and published.</p><p>Prices, availability, delivery methods, warranties, refunds and access models are not binding unless shown as a current approved public offer at the time of purchase.</p></div></section></main>`
  }],
]);

function chatgptReviewBody() {
  return `<main><section class="hero"><div class="wrap"><span class="pill">Commercial offer blocked pending compliant delivery model</span><h1>ChatGPT Plus availability review</h1><p>OpenAI describes ChatGPT Plus as an individual paid subscription. OpenAI's current account-sharing guidance says an account is for the individual who created it and should not be shared with other people.</p><p>Because of that, the historical "ChatGPT Plus Shared" offer is not being published or sold from this route until AI Premium Shop has a delivery model compatible with current provider terms.</p><div class="actions"><a class="btn" href="https://help.openai.com/en/articles/10471989" rel="nofollow noopener">OpenAI account-sharing policy</a><a class="btn wa" href="${WA}">Ask support</a></div></div></section></main>`;
}

function reviewBody(route) {
  return `<main class="review"><div class="wrap"><div class="card"><span class="pill">Commercial route review</span><h1>This page is being rebuilt from verified information.</h1><p class="copy">The legacy route still exists, but its historical commercial content is not being projected as current. Use the live catalog or support while this route is audited.</p><div class="actions"><a class="btn primary" href="/products">Browse live catalog</a><a class="btn wa" href="${WA}">Ask support</a></div><p class="copy">Route: ${esc(route)}</p></div></div></main>`;
}

function routeFor(file) {
  const rel = path.relative(outDir, file).replace(/\\/g, "/");
  if (rel === "index.html") return "/";
  if (rel === "404.html") return "/404";
  return `/${rel.replace(/\/index\.html$/, "")}`;
}

let htmlCount = 0;
let indexableCount = 0;
const files = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.isFile() && entry.name.endsWith(".html")) files.push(full);
  }
}
walk(outDir);

for (const file of files) {
  const route = routeFor(file);
  let output;
  if (route === "/404") {
    output = doc({
      title: "Page Not Found | AI Premium Shop",
      description: "The requested page could not be found.",
      noindex: true,
      body: reviewBody("404"),
    });
  } else if (core.has(route)) {
    const meta = core.get(route);
    output = doc({ ...meta, canonical: `https://aipremiumshop.com${route === "/" ? "/" : route}` });
    indexableCount += 1;
  } else if (route === "/chatgpt-plus-bangladesh" || route === "/product/chatgpt-plus-bangladesh") {
    output = doc({
      title: "ChatGPT Plus Availability Review | AI Premium Shop",
      description: "AI Premium Shop is reviewing its ChatGPT Plus commercial delivery model against current provider terms before publication.",
      canonical: "https://aipremiumshop.com/chatgpt-plus-bangladesh",
      noindex: true,
      body: chatgptReviewBody(),
    });
  } else {
    output = doc({
      title: "Page Under Review | AI Premium Shop",
      description: "This AI Premium Shop route is being reviewed before public commercial publication.",
      canonical: `https://aipremiumshop.com${route}`,
      noindex: true,
      body: reviewBody(route),
    });
  }
  fs.writeFileSync(file, output, "utf8");
  htmlCount += 1;
}

console.log(`[public-projection] wrote ${htmlCount} safe HTML pages; ${indexableCount} core informational routes indexable; commerce publication_allowed=${Boolean(commercial.publication_allowed)} quarantine=${Boolean(commercial.quarantine)}`);
