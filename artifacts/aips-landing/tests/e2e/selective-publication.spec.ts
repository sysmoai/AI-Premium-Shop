import { test, expect, type Page } from "@playwright/test";

function collectPageErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(`pageerror: ${err.message}`));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(`console.error: ${msg.text()}`);
  });
  return errors;
}

test("homepage is a real public storefront, not the old sitewide verification screen", async ({ page }) => {
  const errors = collectPageErrors(page);
  await page.goto("/", { waitUntil: "networkidle" });

  await expect(page.getByRole("heading", { level: 1 })).toContainText(/find the right ai tools/i);
  await expect(page.getByRole("link", { name: /browse products/i })).toBeVisible();
  await expect(page.getByText(/product availability is under verification/i)).toHaveCount(0);
  await expect(page.getByText(/10,000\+ customers/i)).toHaveCount(0);
  await expect(page.getByText(/30-day warranty/i)).toHaveCount(0);
  expect(errors).toEqual([]);
});

test("products route is restored without exposing historical prices", async ({ page }) => {
  const errors = collectPageErrors(page);
  await page.goto("/products", { waitUntil: "networkidle" });

  await expect(page.getByRole("heading", { level: 1 })).toContainText(/ai products/i);
  await expect(page.getByText(/offers under verification/i).first()).toBeVisible();
  await expect(page.locator("body")).not.toContainText(/৳\s*\d+/);
  expect(errors).toEqual([]);
});

test("ChatGPT shared-account commercial route is visibly blocked", async ({ page }) => {
  const errors = collectPageErrors(page);
  await page.goto("/chatgpt-plus-bangladesh", { waitUntil: "networkidle" });

  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/chatgpt plus/i);
  await expect(page.getByText(/historical "ChatGPT Plus Shared" offer is not being published or sold/i)).toBeVisible();
  await expect(page.locator("body")).not.toContainText(/499\s*৳|৳\s*499/);
  await expect(page.getByRole("link", { name: /openai account-sharing policy/i })).toBeVisible();
  expect(errors).toEqual([]);
});

test("legacy commercial routes fail closed into review state instead of stale storefront UI", async ({ page }) => {
  const errors = collectPageErrors(page);
  await page.goto("/product/higgsfield-ai-bangladesh", { waitUntil: "networkidle" });

  await expect(page.getByRole("heading", { level: 1 })).toContainText(/rebuilt from verified information/i);
  await expect(page.getByText(/historical commercial content is not being projected as current/i)).toBeVisible();
  await expect(page.getByRole("link", { name: /browse live catalog/i })).toBeVisible();
  expect(errors).toEqual([]);
});

test("support route warns against credential sharing", async ({ page }) => {
  const errors = collectPageErrors(page);
  await page.goto("/support", { waitUntil: "networkidle" });

  await expect(page.getByRole("heading", { level: 1 })).toContainText(/need help choosing an ai tool/i);
  await expect(page.getByText(/do not send passwords, one-time codes or other account credentials/i)).toBeVisible();
  await expect(page.getByRole("link", { name: /open whatsapp support/i })).toHaveAttribute("href", /^https:\/\/wa\.me\/8801865385348/);
  expect(errors).toEqual([]);
});
