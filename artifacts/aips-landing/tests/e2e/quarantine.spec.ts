import { test, expect } from "@playwright/test";

const ROUTES = [
  "/",
  "/products",
  "/pricing",
  "/product/chatgpt-plus-bangladesh",
  "/chatgpt-plans-bangladesh",
  "/terms",
  "/privacy-policy",
];

for (const route of ROUTES) {
  test(`commerce quarantine is fail-closed on ${route}`, async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => { if (msg.type() === "error") errors.push(msg.text()); });
    page.on("pageerror", (err) => errors.push(err.message));

    const response = await page.goto(route, { waitUntil: "domcontentloaded" });
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { name: "Product availability is under verification" })).toBeVisible();

    const html = await page.content();
    expect(html).toMatch(/noindex,\s*nofollow/i);
    expect(html).not.toMatch(/starter\s+shared|premium\s+shared|shared\s+(account|plan|seat|password|credential)/i);
    expect(html).not.toMatch(/(?:BDT|৳)\s*[0-9][0-9,]*/i);
    expect(html).not.toMatch(/order\s+on\s+whatsapp|>\s*order(?:\s+now)?\s*</i);
    expect(await page.locator("script[src*='/assets/']").count()).toBe(0);
    expect(errors).toEqual([]);
  });
}
