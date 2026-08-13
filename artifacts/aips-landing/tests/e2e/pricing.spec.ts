import { test, expect } from "@playwright/test";

test("pricing table shows real delivery values and no literal undefined", async ({ page }) => {
  await page.goto("/pricing", { waitUntil: "networkidle" });

  const tableBody = page.locator("table tbody");
  await expect(tableBody).toBeVisible();
  const text = await tableBody.innerText();

  expect(text, "pricing table must never render the literal string undefined").not.toContain("undefined");
  expect(text, "delivery column must not be blank").not.toMatch(/⚡\s*(?:\t|\n|$)/);
});
