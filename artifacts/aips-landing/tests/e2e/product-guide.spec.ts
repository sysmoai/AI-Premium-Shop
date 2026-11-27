import { expect, test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

// A product with a validated guide (data/product-guides.json) shows long-form
// content, published BDT prices and an FAQ, in both the app and the crawler HTML.
const ROUTE = "/product/cartesia-bangladesh";
const guides = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data/product-guides.json"), "utf8")).guides;
const guide = guides["cartesia-bangladesh"];
const commercial = JSON.parse(fs.readFileSync(path.join(process.cwd(), "../../ops/ssot/commercial.json"), "utf8"));
const approvedMethods: string[] = commercial.public_claim_policy.payment.approved_public_methods;

const BLOCKED = [
  "warranty", "guarantee", "instant delivery", "instant access", "official reseller", "authorized reseller",
  "authentic subscription", "no international card", "best value", "trusted by", "usdt", "crypto", "credit card", "debit card",
];

const LOGO_URI = "https://media.aipremiumshop.com/brands/cartesia/cartesia-logo-white-v1.svg";
const STUB_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="579" height="83" viewBox="0 0 579 83"><rect width="579" height="83" fill="#FEFEFE"/></svg>';

test("registered provider logo is shown from the media registry, unaltered in proportion", async ({ page, request }) => {
  // The media origin is stubbed so the test does not depend on the network.
  await page.route("https://media.aipremiumshop.com/**", (route) => route.fulfill({ status: 200, contentType: "image/svg+xml", body: STUB_SVG }));
  await page.goto(ROUTE, { waitUntil: "networkidle" });
  const logo = page.getByTestId("product-brand-logo");
  await expect(logo).toBeVisible();
  await expect(logo).toHaveAttribute("src", LOGO_URI);
  await expect(logo).toHaveAttribute("alt", "Cartesia logo");
  const box = await logo.boundingBox();
  expect(Math.round(box!.height)).toBe(28);
  expect(Math.abs(box!.width / box!.height - 579 / 83)).toBeLessThan(0.1);
  await expect(page.getByRole("heading", { level: 1, name: "Cartesia", exact: true })).toBeVisible();

  const html = await (await request.get(`${ROUTE}/index.html`)).text();
  expect(html).toContain(`<img src="${LOGO_URI}" alt="Cartesia logo"`);
});

test("a logo that fails to load falls back to the brand tile, never a broken image", async ({ page }) => {
  await page.route("https://media.aipremiumshop.com/**", (route) => route.abort());
  await page.goto(ROUTE, { waitUntil: "networkidle" });
  await expect(page.getByTestId("product-brand-logo")).toHaveCount(0);
  await expect(page.getByRole("heading", { level: 1, name: "Cartesia", exact: true })).toBeVisible();
  const broken = await page.locator("#main-content img").evaluateAll((images) => images.filter((image) => (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth === 0).length);
  expect(broken).toBe(0);
});

test("guided product page fits a phone: the wide table scrolls inside its box, the page does not", async ({ page, request }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(ROUTE, { waitUntil: "networkidle" });
  const region = page.getByTestId("guide-comparison-scroll");
  await region.scrollIntoViewIfNeeded();
  await expect(region).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  const scrolls = await region.evaluate((element) => element.scrollWidth > element.clientWidth);
  expect(scrolls).toBe(true);

  // Every alternative points at a page that exists.
  for (const item of guide.alternatives.items) expect((await request.get(`${item.href}/index.html`)).ok(), item.href).toBeTruthy();
});

test("guided product page shows plans, prices, guide sections and FAQ", async ({ page }) => {
  await page.goto(ROUTE, { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { level: 1, name: "Cartesia", exact: true })).toBeVisible();
  const guideRoot = page.getByTestId("product-guide");
  await expect(guideRoot).toBeVisible();

  for (const price of ["৳990", "৳8,290", "৳50,190"]) await expect(guideRoot.getByText(price).first()).toBeVisible();
  for (const section of guide.sections) await expect(guideRoot.getByRole("heading", { level: 2, name: section.heading })).toBeVisible();

  // Plan comparison table: one row per registered feature, prices in the first row.
  const table = guideRoot.getByRole("table");
  await expect(table.locator("tbody tr")).toHaveCount(guide.comparison.rows.length);
  await expect(table.locator("tbody tr").first()).toContainText("BDT 990");
  for (const item of guide.alternatives.items) await expect(guideRoot.locator(`a[href="${item.href}"]`)).toBeVisible();

  const first = guideRoot.locator("details").first();
  await expect(guideRoot.locator("details")).toHaveCount(guide.faq.length);
  await first.locator("summary").click();
  await expect(first.locator("p")).toBeVisible();

  const text = (await page.getByRole("main").innerText()).toLowerCase();
  for (const phrase of BLOCKED) expect(text, phrase).not.toContain(phrase);
  for (const method of approvedMethods) expect(text).toContain(method.toLowerCase());
  expect(text).toContain("not affiliated with or endorsed by cartesia");
  expect(await page.locator('a[href^="https://wa.me/8801865385348"]').count()).toBeGreaterThan(0);
});

test("guided product crawler HTML carries the guide, FAQ schema and no blocked claims", async ({ request }) => {
  const response = await request.get(`${ROUTE}/index.html`);
  expect(response.ok()).toBeTruthy();
  const raw = await response.text();
  const html = raw.toLowerCase();

  expect(raw).toContain(`<title>${guide.seoTitle}</title>`);
  expect(html).toContain('rel="canonical" href="https://aipremiumshop.com/product/cartesia-bangladesh"');
  expect((raw.match(/<h1[\s>]/g) ?? []).length).toBe(1);
  for (const price of ["bdt 990", "bdt 8,290", "bdt 50,190"]) expect(html).toContain(price);
  expect(html).toContain("before payment");

  const blocks = [...raw.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
  const faq = blocks.find((block) => block["@type"] === "FAQPage");
  expect(faq).toBeTruthy();
  expect(faq.mainEntity).toHaveLength(guide.faq.length);
  expect(faq.mainEntity[0].name).toBe(guide.faq[0].q);

  // Product schema: published BDT prices only, in the approved Tier-A shape.
  const product = blocks.find((block) => block["@type"] === "Product");
  expect(product).toBeTruthy();
  expect(product.name).toBe("Cartesia");
  expect(product.offers).toMatchObject({ "@type": "AggregateOffer", lowPrice: 990, highPrice: 50190, offerCount: 3, priceCurrency: "BDT" });
  expect(JSON.stringify(product)).not.toMatch(/"availability"|"shippingDetails"|"hasMerchantReturnPolicy"|"priceValidUntil"|"aggregateRating"|"review"|"image"/i);

  // Every related guide link points at a page that exists.
  for (const related of guide.relatedGuides) {
    expect(raw).toContain(`href="${related.href}"`);
    expect((await request.get(`${related.href}/index.html`)).ok(), related.href).toBeTruthy();
  }
  expect(html).not.toContain('"availability":"https://schema.org/instock"');
  expect(html).not.toContain("aggregaterating");
  for (const phrase of BLOCKED) expect(html, phrase).not.toContain(phrase);
});

test("a product without a guide keeps the generic page with no FAQ", async ({ page }) => {
  await page.goto("/product/copy-ai-pro-bangladesh", { waitUntil: "networkidle" });
  await expect(page.getByTestId("product-guide")).toHaveCount(0);
});
