import { expect, test } from "@playwright/test";

const BLOCKED = [
  "30-day warranty", "30 day warranty", "replacement guarantee", "instant delivery", "5-15 min", "5–15 min", "5-30 min", "5–30 min",
  "trusted by", "best seller", "bestseller", "% off", "authorized reseller", "exclusive promotional rate", "no intl card", "no international card",
  "gpt-5.4", "your conversations are private from other users",
];

test("brand runtime uses current catalog evidence and confirm-first language", async ({ page }) => {
  await page.goto("/chatgpt-plus-bangladesh", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: /ChatGPT.*Bangladesh/i })).toBeVisible();
  await expect(page.getByText("Current public catalog")).toBeVisible();
  await expect(page.getByRole("main")).toHaveCount(1);
  const text = (await page.getByRole("main").innerText()).toLowerCase();
  for (const phrase of BLOCKED) expect(text).not.toContain(phrase.toLowerCase());
  expect(text).toContain("confirm current availability");
  expect(text).toContain("provider-controlled");
});

test("brand crawler artifact strips stale FAQ, warranty, SLA and social proof", async ({ request }) => {
  const response = await request.get("/chatgpt-plus-bangladesh/index.html");
  expect(response.ok()).toBeTruthy();
  const html = (await response.text()).toLowerCase();
  expect(html).toContain('rel="canonical" href="https://aipremiumshop.com/chatgpt-plus-bangladesh"');
  for (const phrase of BLOCKED) expect(html).not.toContain(phrase.toLowerCase());
  expect(html).not.toContain('"@type":"faqpage"');
  expect(html).toContain("confirm");
});

test("retired Replit does not render as a brand page in SPA fallback", async ({ page }) => {
  await page.goto("/replit-bangladesh", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "Listing not available" })).toBeVisible();
});
