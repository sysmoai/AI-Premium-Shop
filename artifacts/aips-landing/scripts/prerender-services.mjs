#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const APP = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(APP, "dist/public");
const SITE = "https://aipremiumshop.com";
const services = JSON.parse(fs.readFileSync(path.join(APP, "data/services.json"), "utf8")).services ?? [];

const templatePath = path.join(DIST, "index.html");
if (!fs.existsSync(templatePath)) throw new Error("[services-prerender] dist/public/index.html missing");
const template = fs.readFileSync(templatePath, "utf8");

const esc = (s) => String(s ?? "")
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;");

const priceLabel = (service) => {
  const amount = `BDT ${Number(service.priceBdt).toLocaleString("en-BD")}`;
  if (service.priceSuffix === "from") return `${amount} থেকে`;
  if (service.priceSuffix === "setup from") return `${amount} setup থেকে`;
  if (service.priceSuffix === "per month from") return `${amount}/month থেকে`;
  return amount;
};

const write = (route, title, description, body, jsonLd = []) => {
  const canonical = `${SITE}${route}`;
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(description)}$2`)
    .replace('<div id="root"></div>', `<div id="root"><div id="prerender-shell">${body}</div></div>`);

  html = html.replace(
    "</head>",
    `<link rel="canonical" href="${esc(canonical)}" />
<meta property="og:title" content="${esc(title)}" />
<meta property="og:description" content="${esc(description)}" />
<meta property="og:url" content="${esc(canonical)}" />
${jsonLd.map((entry) => `<script type="application/ld+json">${JSON.stringify(entry)}</script>`).join("\n")}
</head>`
  );

  const dir = path.join(DIST, route.replace(/^\//, ""));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html);
};

const indexBody = `
<main>
<nav aria-label="breadcrumb"><a href="/">Home</a> › Services</nav>
<h1>AI, Website, SEO & Automation Services in Bangladesh</h1>
<p>AI Premium Shop offers practical setup, website, automation, SEO, maintenance and AI-assisted content services. Third-party provider costs are separate unless explicitly included in the quotation.</p>
<ul>
${services.map((service) => `<li><a href="/services/${esc(service.slug)}">${esc(service.name)}</a> — ${esc(priceLabel(service))}. ${esc(service.summary)}</li>`).join("\n")}
</ul>
<p>Paid AI/API usage, domains, premium software, gateway fees, paid hosting and other third-party costs are separate unless explicitly included. SEO rankings, traffic, leads, sales and AI accuracy are not guaranteed outcomes.</p>
</main>`;

write(
  "/services",
  "AI, Website, SEO & Automation Services in Bangladesh | AI Premium Shop",
  "AI Premium Shop service packages for AI/API setup, developer setup, websites, e-commerce, automation, SEO, maintenance and content production.",
  indexBody,
  [{
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "AI Premium Shop Services",
    url: `${SITE}/services`,
    numberOfItems: services.length,
  }]
);

for (const service of services) {
  const route = `/services/${service.slug}`;
  const body = `
<main>
<nav aria-label="breadcrumb"><a href="/">Home</a> › <a href="/services">Services</a> › ${esc(service.name)}</nav>
<h1>${esc(service.name)}</h1>
<p><strong>${esc(priceLabel(service))}</strong></p>
<p>${esc(service.summary)}</p>
<h2>What you get</h2>
<ul>${(service.features ?? []).map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
<h2>Duration</h2>
<p>${esc(service.duration)}</p>
<h2>Important limits</h2>
<ul>${(service.limitations ?? []).map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
<p>Final scope, third-party provider charges and delivery details are confirmed before payment.</p>
<p><a href="/services">View all AIPS services</a></p>
</main>`;

  write(
    route,
    `${service.name} in Bangladesh | AI Premium Shop`,
    service.summary,
    body,
    [{
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.name,
      description: service.summary,
      url: `${SITE}${route}`,
      provider: {
        "@type": "Organization",
        name: "AI Premium Shop",
        url: SITE,
      },
      offers: {
        "@type": "Offer",
        priceCurrency: "BDT",
        price: String(service.priceBdt),
        url: `${SITE}${route}`,
      },
    }]
  );
}

console.log(`[services-prerender] wrote ${services.length + 1} static service pages`);
