import { expect, test } from "@playwright/test";

function readMessage(href: string | null) {
  expect(href).toBeTruthy();
  const url = new URL(href as string);
  expect(url.hostname).toBe("wa.me");
  expect(url.pathname).toBe("/8801865385348");
  return url.searchParams.get("text") ?? "";
}

test("site-wide WhatsApp entry points prefill qualification context", async ({ page }) => {
  await page.goto("/");

  const navbar = page.getByRole("link", { name: "Ask AIPS" });
  const floating = page.getByTestId("floating-whatsapp");

  const navbarHref = await navbar.getAttribute("href");
  const floatingHref = await floating.getAttribute("href");
  const message = readMessage(navbarHref);

  expect(floatingHref).toBe(navbarHref);
  expect(message).toContain("I need help choosing the right AI subscription");
  expect(message).toContain("Main goal:");
  expect(message).toContain("Budget: [BDT]");
  expect(message).toContain("Preferred access (if available):");
  expect(message).toContain("confirm the exact details before payment");
});

test("floating WhatsApp CTA emits the controlled conversion event", async ({ page }) => {
  await page.goto("/");

  await page.evaluate(() => {
    const state = window as typeof window & { __aipsGtagEvents?: unknown[][] };
    state.__aipsGtagEvents = [];
    window.gtag = (...args: unknown[]) => {
      state.__aipsGtagEvents?.push(args);
    };
    document.querySelector('[data-testid="floating-whatsapp"]')?.addEventListener(
      "click",
      (event) => event.preventDefault(),
      { capture: true },
    );
  });

  await page.getByTestId("floating-whatsapp").click();

  const events = await page.evaluate(() => {
    const state = window as typeof window & { __aipsGtagEvents?: unknown[][] };
    return state.__aipsGtagEvents ?? [];
  });

  expect(events).toContainEqual([
    "event",
    "whatsapp_click",
    expect.objectContaining({
      product_name: "general_assistance",
      page_path: "/",
      button_location: "floating_sitewide",
    }),
  ]);
});
