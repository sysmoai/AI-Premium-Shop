import { test, expect, type Page } from "@playwright/test";

// See BLOCKERS.md B9: a hook-order bug threw React error #310 at the App
// root, createRoot emptied #root, and every page went blank in production --
// while build, seo:check, audit-prerender, and the live-site monitor all
// stayed green, because none of them execute the app. This suite does.
//
// Routes are chosen to cover distinct render paths (home, catalog, product,
// audience guide, Bangla, the enquiry-only Higgsfield page, a 404), not to
// be exhaustive -- a global mount-crash breaks every route identically, so
// a handful of structurally different pages is enough to catch it. Full
// click-through user journeys are a separate, larger effort (BACKLOG #22).

const ROUTES = [
  "/",
  "/products",
  "/pricing",
  "/ai-video",
  "/product/higgsfield-ai-bangladesh",
  "/guides/students",
  "/bn",
  "/this-route-does-not-exist",
];

function collectPageErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(`pageerror: ${err.message}`));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(`console.error: ${msg.text()}`);
  });
  return errors;
}

for (const route of ROUTES) {
  test(`${route} renders into #root with no console errors`, async ({ page }) => {
    const errors = collectPageErrors(page);

    await page.goto(route, { waitUntil: "networkidle" });

    const rootChildCount = await page.locator("#root").evaluate(
      (el) => el.childElementCount,
    );
    expect(
      rootChildCount,
      `#root has no children on ${route} -- the app failed to mount (see BLOCKERS.md B9)`,
    ).toBeGreaterThan(0);

    // Real, visible text must be on the page -- an empty-but-truthy #root
    // (e.g. a single empty wrapper div) would pass the child-count check
    // above but still be a blank page to a user.
    const bodyText = await page.locator("body").innerText();
    expect(bodyText.trim().length, `page body has no visible text on ${route}`).toBeGreaterThan(20);

    expect(errors, `console/page errors on ${route}:\n${errors.join("\n")}`).toEqual([]);
  });
}
