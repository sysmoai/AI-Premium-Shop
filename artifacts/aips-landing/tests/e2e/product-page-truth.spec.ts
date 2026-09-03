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

const PRODUCT_ROUTE = "/product/removebg-pro-bangladesh";

test("generic product runtime is confirm-first and does not invent trust or delivery facts", async ({ page }) => {
  await page.goto(PRODUCT_ROUTE, { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "Remove.bg Pro" })).toBeVisible();
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

test("generic product generated HTML removes stale FAQ, stock and universal commercial claims", async ({ request }) => {
  const response = await request.get(`${PRODUCT_ROUTE}/index.html`);
  expect(response.ok()).toBeTruthy();
  const html = (await response.text()).toLowerCase();

  expect(html).toContain('rel="canonical" href="https://aipremiumshop.com/product/removebg-pro-bangladesh"');
  expect(html).toContain("before payment");
  expect(html).toContain("provider-controlled credits");
  for (const phrase of BLOCKED_PRODUCT_COPY) expect(html).not.toContain(phrase);
  expect(html).not.toContain('"@type":"faqpage"');
  expect(html).not.toContain('"availability":"https://schema.org/instock"');
  expect(html).not.toContain('"@type":["product","softwareapplication"]');
  expect(html).not.toContain('http-equiv="last-modified"');
});

test("generic product plan cards expose price and access without synthetic seats or SLA", async ({ page }) => {
  await page.goto(PRODUCT_ROUTE, { waitUntil: "networkidle" });
  const plan = page.getByRole("button", { name: /Shared/i }).first();
  await expect(plan).toBeVisible();
  const text = (await plan.innerText()).toLowerCase();
  expect(text).toContain("shared access");
  expect(text).toContain("confirm before payment");
  expect(text).not.toMatch(/\b8 seats?\b/);
  expect(text).not.toMatch(/\b[0-9]+\s*[–-]\s*[0-9]+\s*(min|hrs?)/);
});

test("retired Replit generic product route is not rendered by the ProductPage", async ({ page }) => {
  // Vercel permanently redirects this in production; SPA/browser coverage here
  // ensures the React catch-all itself also fails closed if a host bypasses edge redirects.
  await page.goto("/product/replit-bangladesh", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "Product Not Found" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Browse Current Products" })).toBeVisible();
});
