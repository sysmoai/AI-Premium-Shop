import { expect, test } from "@playwright/test";

const STALE_UNIVERSAL_CLAIMS = [
  "30-day warranty",
  "30 day warranty",
  "30-day replacement warranty",
  "5-30 min delivery",
  "5–30 min delivery",
  "fast delivery",
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

test("products raw HTML does not emit stale universal FAQ commerce claims", async ({ request }) => {
  const response = await request.get("/products");
  expect(response.ok()).toBeTruthy();
  const html = (await response.text()).toLowerCase();

  for (const claim of STALE_UNIVERSAL_CLAIMS) {
    expect(html).not.toContain(claim);
  }
  expect(html).not.toContain('"@type":"faqpage"');
  expect(html).not.toContain("replit-bangladesh");
});
