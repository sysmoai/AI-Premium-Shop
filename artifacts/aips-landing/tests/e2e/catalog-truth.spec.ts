import { expect, test } from "@playwright/test";

const STALE_UNIVERSAL_CLAIMS = [
  "30-day warranty",
  "30 day warranty",
  "30-day replacement warranty",
  "5-30 min delivery",
  "5–30 min delivery",
  "fast delivery",
];

const STALE_PRICING_CLAIMS = [
  "$20/mo",
  "approximately bdt 2,990",
  "you pay bdt 499 for shared access",
  "no bank fees",
  "international card required",
  "biggest savings",
  "all 239 plans",
  "197 tools from bdt 299",
];

test("products catalog avoids stale universal commerce claims and retired product routes", async ({ page }) => {
  await page.goto("/products", { waitUntil: "networkidle" });
  const heading = page.getByRole("heading", { name: "Find the AI tool that fits your work" });
  await expect(heading).toBeVisible();
  const catalogSurface = heading.locator("xpath=ancestor::main[1]");
  const catalogText = (await catalogSurface.innerText()).toLowerCase();

  for (const claim of STALE_UNIVERSAL_CLAIMS) {
    expect(catalogText).not.toContain(claim);
  }
  await expect(catalogSurface.locator('a[href*="replit-bangladesh"]')).toHaveCount(0);
});

test("personal access filter uses the catalog's real personal value and persists in the URL", async ({ page }) => {
  await page.goto("/products", { waitUntil: "networkidle" });
  const accessFilter = page.getByRole("combobox", { name: "Filter by access type" });
  await accessFilter.selectOption("personal");
  await expect(page).toHaveURL(/\/products\?[^#]*access=personal/);

  const cards = page.locator("main article");
  expect(await cards.count()).toBeGreaterThan(0);
  const sampled = cards.first();
  await expect(sampled).toContainText(/personal/i);
  await expect(sampled).not.toContainText(/shared/i);
});

test("products generated HTML does not emit stale universal FAQ commerce claims", async ({ request }) => {
  // Vite preview is an SPA server and intentionally falls back to root index.html
  // for a no-JS clean-URL request. Inspect the physical prerender artifact here;
  // exact clean-URL routing is independently verified on the Vercel preview.
  const response = await request.get("/products/index.html");
  expect(response.ok()).toBeTruthy();
  const html = (await response.text()).toLowerCase();

  expect(html).toContain("all 196 ai tools");
  for (const claim of STALE_UNIVERSAL_CLAIMS) {
    expect(html).not.toContain(claim);
  }
  expect(html).not.toContain('"@type":"faqpage"');
  expect(html).not.toContain("replit-bangladesh");
});

test("pricing runtime compares only published AIPS facts and requires confirmation", async ({ page }) => {
  await page.goto("/pricing", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "AI Tool Pricing in Bangladesh" })).toBeVisible();

  const main = page.getByRole("main");
  await expect(main).toHaveCount(1);
  const text = (await main.innerText()).toLowerCase();
  for (const claim of [...STALE_UNIVERSAL_CLAIMS, ...STALE_PRICING_CLAIMS]) {
    expect(text).not.toContain(claim);
  }

  const accessFilter = page.getByRole("combobox", { name: "Filter by access type" });
  await expect(accessFilter.locator('option[value="personal"]')).toHaveCount(1);
  await expect(accessFilter.locator('option[value="private"]')).toHaveCount(0);
  await accessFilter.selectOption("personal");

  const rows = page.getByRole("row").filter({ has: page.getByRole("link", { name: "Confirm" }) });
  expect(await rows.count()).toBeGreaterThan(0);
  await expect(rows.first()).toContainText("Confirm before payment");
  await expect(page.locator('a[href*="replit-bangladesh"]')).toHaveCount(0);
});

test("pricing generated HTML is truth-safe for crawlers", async ({ request }) => {
  // Inspect the physical route artifact; Vercel preview/live clean-URL behavior
  // is checked separately before release because Vite preview uses SPA fallback.
  const response = await request.get("/pricing/index.html");
  expect(response.ok()).toBeTruthy();
  const html = (await response.text()).toLowerCase();

  expect(html).toContain("ai tool pricing in bangladesh");
  expect(html).toContain("confirm current availability");
  expect(html).toContain('rel="canonical" href="https://aipremiumshop.com/pricing"');
  for (const claim of [...STALE_UNIVERSAL_CLAIMS, ...STALE_PRICING_CLAIMS]) {
    expect(html).not.toContain(claim);
  }
  expect(html).not.toContain("replit-bangladesh");
  expect(html).not.toContain('"pricerange"');
});