import { expect, test } from "@playwright/test";

const BLOCKED = [
  "top 10 ai tools", "best value", "highest roi", "top pick", "cheapest entry point", "best for developers", "best for images", "best for research",
  "unlimited code completions", "300 premium model requests", "gpt-5.4", "1m token", "83% off", "official price",
  "5-30 min", "5–30 min", "30-day warranty", "instant delivery", "no international card", "bkash", "nagad", "replit"
];

test("best subscription runtime is a transparent decision guide, not a typed ranking", async ({ page }) => {
  await page.goto("/best-ai-subscription-2026", { waitUntil: "networkidle" });
  const main = page.locator("#main-content");
  await expect(main.getByRole("heading", { name: "How to Choose the Best AI Subscription in Bangladesh" })).toBeVisible();
  await expect(main.getByText("Current catalog categories")).toBeVisible();
  await expect(main.getByText("Mechanical entry-price examples")).toBeVisible();
  await expect(main.getByText(/not quality rankings or endorsements/i)).toBeVisible();
  await expect(page.locator("main")).toHaveCount(1);

  const text = (await main.innerText()).toLowerCase();
  for (const phrase of BLOCKED) expect(text, phrase).not.toContain(phrase.toLowerCase());
  expect(text).toContain("provider-controlled");
  expect(text).toContain("published ai premium shop entry price");
});

test("best subscription current examples use product links and exclude retired Replit", async ({ page }) => {
  await page.goto("/best-ai-subscription-2026", { waitUntil: "networkidle" });
  const main = page.locator("#main-content");
  const detailLinks = main.getByRole("link", { name: "View current details" });
  expect(await detailLinks.count()).toBeGreaterThan(3);
  const hrefs = await detailLinks.evaluateAll((links) => links.map((link) => link.getAttribute("href") ?? ""));
  expect(hrefs.every((href) => href.startsWith("/"))).toBeTruthy();
  expect(hrefs.some((href) => href.includes("replit"))).toBeFalsy();
});

test("best subscription crawler artifact is self-canonical, runtime-capable and sanitized", async ({ request }) => {
  const response = await request.get("/best-ai-subscription-2026/index.html");
  expect(response.ok()).toBeTruthy();
  const html = (await response.text()).toLowerCase();
  expect(html).toContain('rel="canonical" href="https://aipremiumshop.com/best-ai-subscription-2026"');
  expect(html).toContain("there is no single objectively best subscription for every user");
  expect(html).toContain("current catalog categories");
  expect(html).toContain('<script type="module"');
  expect(html).not.toContain('"@type":"faqpage"');
  expect(html).not.toContain('"@type":"product"');
  for (const phrase of BLOCKED) expect(html, phrase).not.toContain(phrase.toLowerCase());
});
