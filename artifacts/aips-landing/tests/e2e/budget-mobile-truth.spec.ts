import { expect, test } from "@playwright/test";

const BLOCKED_BUDGET_COPY = [
  "30-day warranty",
  "30 day warranty",
  "30-day replacement warranty",
  "5-30 min",
  "5–30 min",
  "fast delivery",
  "cheapest premium ai",
  "best value",
  "biggest savings",
  "official price",
  "% off",
  "replit-bangladesh",
];

test("budget runtime is a current threshold filter, not a legacy ranking page", async ({ page }) => {
  await page.goto("/ai-under-500", { waitUntil: "networkidle" });

  await expect(page.getByRole("heading", { name: "AI Tools Under BDT 500" })).toBeVisible();
  await expect(page.getByText("Current budget filter")).toBeVisible();
  await expect(page.getByText("Published AI Premium Shop price").first()).toBeVisible();
  await expect(page.getByRole("main")).toHaveCount(1);

  const text = (await page.getByRole("main").innerText()).toLowerCase();
  for (const phrase of BLOCKED_BUDGET_COPY) expect(text).not.toContain(phrase);
  expect(text).toContain("confirm current availability");
  await expect(page.locator('a[href*="replit-bangladesh"]')).toHaveCount(0);
});

test("all generated budget artifacts are fail-closed and self-canonical", async ({ request }) => {
  for (const route of ["ai-under-500", "ai-under-1000", "ai-under-3000"]) {
    const response = await request.get(`/${route}/index.html`);
    expect(response.ok()).toBeTruthy();
    const html = (await response.text()).toLowerCase();

    expect(html).toContain("this page filters the current fixed-price public ai premium shop catalog");
    expect(html).toContain(`rel="canonical" href="https://aipremiumshop.com/${route}"`);
    expect(html).toContain("confirm current availability");
    for (const phrase of BLOCKED_BUDGET_COPY) expect(html).not.toContain(phrase);
  }
});

test("mobile plan help is confirm-first and viewport safe", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/products", { waitUntil: "networkidle" });
  await page.evaluate(() => window.scrollTo(0, Math.max(700, document.body.scrollHeight / 3)));

  const bar = page.getByTestId("mobile-plan-help");
  await expect(bar).toBeVisible();
  await expect(bar).toContainText("Need help choosing?");
  await expect(bar).toContainText("Confirm the exact plan before payment");
  await expect(bar.getByRole("link", { name: "Ask AI Premium Shop" })).toHaveAttribute("href", /confirming%20a%20current%20AI%20plan/i);

  const barText = (await bar.innerText()).toLowerCase();
  expect(barText).not.toContain("bdt 299");
  expect(barText).not.toContain("order now");

  const bodyWidth = await page.locator("body").evaluate((element) => element.scrollWidth);
  expect(bodyWidth).toBeLessThanOrEqual(390);
});

test("mobile plan help does not cover policy and support routes", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of ["/terms", "/privacy-policy", "/support", "/how-to-order"]) {
    await page.goto(route, { waitUntil: "networkidle" });
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.getByTestId("mobile-plan-help")).toHaveCount(0);
  }
});
