import { expect, test } from "@playwright/test";

const BLOCKED_COMPARISON_COPY = [
  "5-30 minutes",
  "5–30 minutes",
  "30-day warranty",
  "30 day warranty",
  "gpt-5.4",
  "claude opus 5",
  "1m token context",
  "independent benchmarks",
  "cheapest ai",
  "clear winner",
  "buy both",
];

const NONCANONICAL_SITEMAP_PATHS = [
  "/chatgpt-vs-claude-bangladesh",
  "/chatgpt-plans-comparison-bangladesh",
  "/google-ai-pro-bangladesh",
  "/best-ai-budget-bangladesh",
  "/replit-bangladesh",
  "/product/replit-bangladesh",
];

test("comparison runtime uses current catalog evidence instead of stale feature claims", async ({ page }) => {
  await page.goto("/chatgpt-vs-claude", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "ChatGPT Plus vs Claude" })).toBeVisible();
  await expect(page.getByText("Current public-catalog comparison")).toBeVisible();
  await expect(page.getByText("Lowest published price").first()).toBeVisible();
  await expect(page.getByRole("link", { name: /View current product details/ }).first()).toBeVisible();

  const main = page.getByRole("main");
  await expect(main).toHaveCount(1);
  const text = (await main.innerText()).toLowerCase();
  for (const phrase of BLOCKED_COMPARISON_COPY) expect(text).not.toContain(phrase);
  expect(text).toContain("verify");
  expect(text).toContain("provider");
});

test("comparison generated HTML is self-canonical and fail-closed", async ({ request }) => {
  const response = await request.get("/chatgpt-vs-claude/index.html");
  expect(response.ok()).toBeTruthy();
  const html = (await response.text()).toLowerCase();

  expect(html).toContain('rel="canonical" href="https://aipremiumshop.com/chatgpt-vs-claude"');
  expect(html).toContain("compare current ai premium shop catalog records");
  for (const phrase of BLOCKED_COMPARISON_COPY) expect(html).not.toContain(phrase);
});

test("deployed sitemap artifact contains only canonical current routes", async ({ request }) => {
  const response = await request.get("/sitemap.xml");
  expect(response.ok()).toBeTruthy();
  const xml = await response.text();
  expect(xml).toContain("https://aipremiumshop.com/chatgpt-vs-claude</loc>");
  for (const route of NONCANONICAL_SITEMAP_PATHS) {
    expect(xml).not.toContain(`https://aipremiumshop.com${route}</loc>`);
  }
});
