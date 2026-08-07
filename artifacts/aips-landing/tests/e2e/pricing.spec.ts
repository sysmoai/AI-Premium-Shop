import { test, expect } from "@playwright/test";

// Regression test for a real bug: PricingPage.tsx's local `Product` interface
// declared `deliveryMinutes: string` and `officialUSD: number | null`, but
// `data/products.json` records actually carry `deliverySLA` (not
// `deliveryMinutes` -- that key never existed) and often omit `officialUSD`
// entirely rather than setting it to `null`. The cast at the top of the
// component (`productsData.products as unknown as Product[]`) bypasses
// TypeScript's structural check, so this compiled cleanly while rendering
// "$undefined/mo" for the 32 records missing `officialUSD` and a bare "⚡ min"
// (no number) for every row's delivery column, live on the site's
// highest-traffic commercial page. Fixed by reading the real field names and
// using `== null` (not `=== null`) so `undefined` is caught too.

test("pricing table shows real delivery times and no literal 'undefined'", async ({ page }) => {
  await page.goto("/pricing", { waitUntil: "networkidle" });

  const tableBody = page.locator("table tbody");
  await expect(tableBody).toBeVisible();
  const text = await tableBody.innerText();

  expect(text, "the pricing table must never render the literal string \"undefined\"").not.toContain("undefined");

  // Every delivery cell renders "⚡ <deliverySLA>" -- deliverySLA is always a
  // non-empty string like "5-30 min" or "3h" in the catalog, so a bare "⚡ "
  // with nothing after it (or immediately followed by a tab/newline) means
  // the field lookup failed again.
  expect(text, "delivery column must not be blank").not.toMatch(/⚡\s*(?:\t|\n|$)/);
});
