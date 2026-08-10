import { test, expect } from "@playwright/test";

const PREVIEW = "/__preview/homepage-v2";

test("Homepage V2 finder selects matching Personal plans inside the chosen budget", async ({ page }) => {
  await page.goto(PREVIEW, { waitUntil: "networkidle" });

  await page.getByTestId("finder-intent-content-video").click();
  await page.getByTestId("finder-access-personal").click();
  await page.getByTestId("finder-budget-1001-3000").click();

  const results = page.locator('[data-testid^="finder-result-"]');
  await expect(results).toHaveCount(3);
  await expect(page.getByTestId("finder-result-midjourney-bangladesh")).toContainText("Personal");
  await expect(page.getByTestId("finder-result-runway-bangladesh")).toContainText("Personal");
  await expect(page.getByTestId("finder-result-canva-pro-bangladesh")).toContainText("Personal");
});

test("Homepage V2 finder fails closed when no governed plan matches filters", async ({ page }) => {
  await page.goto(PREVIEW, { waitUntil: "networkidle" });

  await page.getByTestId("finder-intent-content-video").click();
  await page.getByTestId("finder-access-personal").click();
  await page.getByTestId("finder-budget-under-1000").click();

  await expect(page.getByTestId("finder-results")).toContainText(
    "No governed recommendation matches all selected filters.",
  );
  await expect(page.locator('[data-testid^="finder-result-"]')).toHaveCount(0);
});

test("Homepage V2 guided finder remains usable on a 390px mobile viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(PREVIEW, { waitUntil: "networkidle" });

  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.getByTestId("finder-intent-study-research").click();
  await expect(page.getByTestId("finder-panel")).toBeVisible();
  await expect(page.getByTestId("finder-results")).toBeVisible();

  const bodyWidth = await page.locator("body").evaluate((el) => el.scrollWidth);
  expect(bodyWidth).toBeLessThanOrEqual(390);
});
