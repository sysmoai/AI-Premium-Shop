import { expect, test } from "@playwright/test";

const BLOCKED = [
  "30-day warranty",
  "30 day warranty",
  "30-day replacement guarantee",
  "full replacement guarantee",
  "instant delivery",
  "instant activation",
  "5–15 min",
  "5-15 min",
  "5–30 min",
  "5-30 min",
  "trusted by",
];

function assertNoBlockedClaims(text: string) {
  const lower = text.toLowerCase();
  for (const claim of BLOCKED) expect(lower).not.toContain(claim.toLowerCase());
}

test("request-price product fails closed on warranty, delivery and authorization defaults", async ({ page }) => {
  await page.goto("/product/google-ai-ultra-bangladesh", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { level: 1, name: /Google AI Ultra/i })).toBeVisible();

  const body = await page.locator("body").innerText();
  assertNoBlockedClaims(body);
  await expect(page.getByText(/Confirm current delivery ETA before payment/i).first()).toBeVisible();
  await expect(page.getByText(/does not claim provider authorization unless explicitly documented/i)).toBeVisible();
});

test("fixed-price generic product does not invent delivery, warranty, seats or freshness", async ({ page }) => {
  await page.goto("/product/removebg-pro-bangladesh", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { level: 1, name: /Remove\.bg Pro/i })).toBeVisible();

  const body = await page.locator("body").innerText();
  assertNoBlockedClaims(body);
  expect(body).not.toMatch(/\b8 seats?\b/i);
  expect(body).not.toMatch(/Price last verified:\s*July 2026/i);
  await expect(page.getByText(/Delivery ETA: confirm before payment/i).first()).toBeVisible();
});

test("raw generic product HTML removes unverified FAQ, stock and synthetic freshness schema", async ({ request }) => {
  const response = await request.get("/product/google-ai-ultra-bangladesh");
  expect(response.ok()).toBeTruthy();
  const html = await response.text();
  assertNoBlockedClaims(html);
  expect(html).not.toContain('"@type":"FAQPage"');
  expect(html).not.toContain("https://schema.org/InStock");
  expect(html).not.toContain('"dateModified"');
  expect(html).not.toContain('http-equiv="last-modified"');
});
