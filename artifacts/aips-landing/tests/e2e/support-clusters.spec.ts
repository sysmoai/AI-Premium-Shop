import { test, expect } from "@playwright/test";

function types(node: any): string[] {
  const value = node?.["@type"];
  return Array.isArray(value) ? value : value ? [value] : [];
}

async function jsonLd(page: import("@playwright/test").Page) {
  const raw = await page.locator('script[type="application/ld+json"]').allTextContents();
  return raw.flatMap((value) => {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      return [];
    }
  });
}

test("ChatGPT vs Claude hydrates without stale shared-plan advice or duplicate WebPage schema", async ({ page }) => {
  await page.goto("/chatgpt-vs-claude");
  await expect(page.getByRole("heading", { level: 1, name: /ChatGPT Plus vs Claude/i })).toBeVisible();

  const body = await page.locator("body").innerText();
  expect(body).not.toMatch(/You can use shared access|Compare shared plans|shared-access arrangement/i);
  expect(await page.getByText("Not currently published", { exact: true }).count()).toBeGreaterThanOrEqual(2);

  await expect(page.locator('a[href="/chatgpt-plus-bangladesh"]')).toHaveCount(1);
  await expect(page.locator('a[href="/claude-pro-bangladesh"]')).toHaveCount(1);
  await expect(page.locator('a[href="/best-ai-for-students"]')).toBeVisible();

  const nodes = await jsonLd(page);
  expect(nodes.filter((node) => types(node).includes("BreadcrumbList"))).toHaveLength(1);
  expect(nodes.filter((node) => types(node).includes("WebPage"))).toHaveLength(1);
  expect(nodes.filter((node) => types(node).includes("Product"))).toHaveLength(0);
  expect(nodes.filter((node) => types(node).includes("Offer") || types(node).includes("AggregateOffer"))).toHaveLength(0);
});

test("student guide stays informational and routes users to current canonical product owners", async ({ page }) => {
  await page.goto("/best-ai-for-students");
  await expect(page.getByRole("heading", { level: 1, name: "AI Tools for Students in Bangladesh" })).toBeVisible();
  await expect(page.getByText(/Ordered by guide relevance, not an objective ranking/i)).toBeVisible();
  expect(await page.locator('a[href$="-bangladesh"], a[href^="/product/"]').count()).toBeGreaterThanOrEqual(3);
  await expect(page.locator('a[href="/guides/students"]')).toHaveCount(0);
  const body = await page.locator("body").innerText();
  expect(body).not.toMatch(/#1|number one|guaranteed earnings|30-day warranty/i);
});

test("budget hub is a current catalog filter, not a ranking page", async ({ page }) => {
  await page.goto("/ai-under-1000");
  await expect(page.getByRole("heading", { level: 1, name: "AI Tools Under BDT 1,000" })).toBeVisible();
  await expect(page.getByText("Current budget filter")).toBeVisible();
  expect(await page.locator('a[href$="-bangladesh"], a[href^="/product/"]').count()).toBeGreaterThan(0);
  await expect(page.locator('a[href="/best-ai-budget-bangladesh"]')).toHaveCount(0);
  const body = await page.locator("body").innerText();
  expect(body).not.toMatch(/cheapest in Bangladesh|best value|biggest savings|% off/i);
});

test("umbrella guide stays workflow-first and does not claim a universal winner", async ({ page }) => {
  await page.goto("/best-ai-subscription-2026");
  await expect(page.getByRole("heading", { level: 1, name: /Best AI Subscription|Choose the Best AI Subscription/i })).toBeVisible();
  const body = await page.locator("body").innerText();
  expect(body).not.toMatch(/#1 AI|number one AI|guaranteed best/i);
  await expect(page.locator('a[href="/products"]').first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Current pricing", exact: true })).toBeVisible();
});
