import { expect, test } from "@playwright/test";

const PREVIEW = "/__preview/homepage-v2";

test("homepage WhatsApp analytics joins the site-wide funnel only after consent", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.removeItem("cookie_consent");
    const calls: unknown[] = [];
    Object.defineProperty(window, "__aipsGtagCalls", {
      value: calls,
      configurable: false,
      writable: false,
    });
    (window as typeof window & { gtag: (...args: unknown[]) => void }).gtag = (...args: unknown[]) => calls.push(args);
  });

  await page.goto(PREVIEW, { waitUntil: "networkidle" });

  await page.evaluate(() => {
    window.dispatchEvent(new CustomEvent("aips:homepage-analytics", {
      detail: { name: "homepage_whatsapp_click", placement: "header" },
    }));
  });

  let calls = await page.evaluate(() => (
    window as typeof window & { __aipsGtagCalls: unknown[] }
  ).__aipsGtagCalls);
  expect(calls).toEqual([]);

  await page.getByRole("button", { name: "Accept" }).click();
  await expect(page.getByRole("button", { name: "Accept" })).toHaveCount(0);

  await page.evaluate(() => {
    window.dispatchEvent(new CustomEvent("aips:homepage-analytics", {
      detail: { name: "homepage_whatsapp_click", placement: "header" },
    }));
    window.dispatchEvent(new CustomEvent("aips:homepage-analytics", {
      detail: { name: "homepage_whatsapp_click", placement: "final_cta" },
    }));
  });

  calls = await page.evaluate(() => (
    window as typeof window & { __aipsGtagCalls: unknown[] }
  ).__aipsGtagCalls);

  expect(calls).toContainEqual([
    "event",
    "whatsapp_click",
    {
      product_name: "general_assistance",
      page_path: PREVIEW,
      button_location: "homepage_header",
    },
  ]);
  expect(calls).toContainEqual([
    "event",
    "whatsapp_click",
    {
      product_name: "general_assistance",
      page_path: PREVIEW,
      button_location: "homepage_final_cta",
    },
  ]);

  expect(JSON.stringify(calls)).not.toContain("homepage_whatsapp_click");
});
