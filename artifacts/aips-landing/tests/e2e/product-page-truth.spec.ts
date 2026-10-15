import { expect, test } from "@playwright/test";

const BLOCKED_PRODUCT_COPY = [
  "30-day warranty",
  "30 day warranty",
  "replacement guarantee",
  "instant delivery",
  "instant access",
  "fast delivery",
  "5-15 min",
  "5–15 min",
  "5-30 min",
  "5–30 min",
  "trusted by",
  "10,000+ customers",
  "best seller",
  "bestseller",
  "best value",
  "authorized reseller",
  "official reseller",
  "authentic subscription",
  "no international card",
  "nobody can see anyone else's",
];

// Keep the generic commerce assertions on a current non-restricted product.
// Provider-restricted URL preservation is tested separately below.
const COMMERCE_PRODUCT_ROUTE = "/product/copy-ai-pro-bangladesh";
const RESTRICTED_PRODUCT_ROUTE = "/product/removebg-pro-bangladesh";

test("generic active product runtime is confirm-first and does not invent trust or delivery facts", async ({ page }) => {
  await page.goto(COMMERCE_PRODUCT_ROUTE, { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: /Copy\.ai Pro/i })).toBeVisible();
  await expect(page.getByText("Current AI Premium Shop listing")).toBeVisible();
  await expect(page.getByRole("link", { name: "Confirm current plan" })).toBeVisible();
  await expect(page.getByRole("main")).toHaveCount(1);

  const text = (await page.getByRole("main").innerText()).toLowerCase();
  for (const phrase of BLOCKED_PRODUCT_COPY) expect(text).not.toContain(phrase);
  expect(text).toContain("confirm the exact access model");
  expect(text).toContain("delivery eta");
  expect(text).toContain("provider");
  expect(text).not.toContain("in stock");
  expect(text).not.toContain("direct abroad");
});

test("generic active product generated HTML removes stale FAQ, stock and universal commercial claims", async ({ request }) => {
  const response = await request.get(`${COMMERCE_PRODUCT_ROUTE}/index.html`);
  expect(response.ok()).toBeTruthy();
  const html = (await response.text()).toLowerCase();

  expect(html).toContain('rel="canonical" href="https://aipremiumshop.com/product/copy-ai-pro-bangladesh"');
  expect(html).toContain("before payment");
  expect(html).toContain("provider-controlled credits");
  for (const phrase of BLOCKED_PRODUCT_COPY) expect(html).not.toContain(phrase);
  expect(html).not.toContain('"@type":"faqpage"');
  expect(html).not.toContain('"availability":"https://schema.org/instock"');
  expect(html).not.toContain('"@type":["product","softwareapplication"]');
  expect(html).not.toContain('http-equiv="last-modified"');
});

test("generic request-price product never invents fixed-price Personal cards or SLA", async ({ page }) => {
  await page.goto(COMMERCE_PRODUCT_ROUTE, { waitUntil: "networkidle" });
  // Copy.ai currently remains in the governed public catalog as request-price.
  await expect(page.getByRole("heading", { name: "Current plan details are confirmed on request" })).toBeVisible();
  await expect(page.getByText("Confirm on WhatsApp", { exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Confirm current plan" })).toBeVisible();
  await expect(page.getByRole("button", { name: /Personal|Shared|Team/i })).toHaveCount(0);
  const text = (await page.getByRole("main").innerText()).toLowerCase();
  expect(text).toContain("this listing does not publish a fixed plan price");
  expect(text).toContain("before payment");
  expect(text).not.toMatch(/\b8 seats?\b/);
  expect(text).not.toMatch(/\b[0-9]+\s*[–-]\s*[0-9]+\s*(min|hrs?)/);
});

test("provider-restricted product runtime preserves the URL without exposing commerce", async ({ page }) => {
  await page.goto(RESTRICTED_PRODUCT_ROUTE, { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "Remove.bg Pro" })).toBeVisible();
  await expect(page.getByText("Current listing status", { exact: true })).toBeVisible();
  await expect(page.getByText(/No current purchasable AI Premium Shop plan is published/i)).toBeVisible();
  await expect(page.getByRole("link", { name: "Browse active alternatives" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Confirm current plan" })).toHaveCount(0);
  await expect(page.getByRole("button", { name: /Shared|Personal/i })).toHaveCount(0);

  const text = (await page.locator("#main-content").innerText()).toLowerCase();
  expect(text).toContain("no provider authorization is implied");
  expect(text).toContain("no price or access plan is offered");
  for (const phrase of BLOCKED_PRODUCT_COPY) expect(text).not.toContain(phrase);
});

test("provider-restricted product generated HTML is indexable identity content without Product/Offer commerce schema", async ({ request }) => {
  const response = await request.get(`${RESTRICTED_PRODUCT_ROUTE}/index.html`);
  expect(response.ok()).toBeTruthy();
  const html = (await response.text()).toLowerCase();

  expect(html).toContain('rel="canonical" href="https://aipremiumshop.com/product/removebg-pro-bangladesh"');
  expect(html).toContain("current listing status");
  expect(html).toContain("no current purchasable ai premium shop plan is published");
  expect(html).toContain("no provider authorization is implied");
  expect(html).not.toContain("confirm current plan");
  expect(html).not.toContain('"@type":"product"');
  expect(html).not.toContain('"@type":"offer"');
  expect(html).not.toContain('"@type":["product","softwareapplication"]');
  expect(html).not.toContain('name="robots" content="noindex');
  for (const phrase of BLOCKED_PRODUCT_COPY) expect(html).not.toContain(phrase);
});

test("retired Replit generic product route is not rendered by the ProductPage", async ({ page }) => {
  // Vercel permanently redirects this in production; SPA/browser coverage here
  // ensures the React catch-all itself also fails closed if a host bypasses edge redirects.
  await page.goto("/product/replit-bangladesh", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "Product Not Found" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Browse Current Products" })).toBeVisible();
});
