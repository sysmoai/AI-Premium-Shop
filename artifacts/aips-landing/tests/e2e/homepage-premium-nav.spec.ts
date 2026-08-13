import { test, expect } from "@playwright/test";

const PREVIEW = "/__preview/homepage-v2";

test("premium homepage Products hover opens the mega menu and category hover updates product discovery", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(PREVIEW, { waitUntil: "networkidle" });

  await page.getByRole("button", { name: "Products", exact: true }).hover();
  const mega = page.getByTestId("mega-products");
  await expect(mega).toBeVisible();
  await expect(page.getByTestId("mega-active-category-title")).toHaveText("AI Chat & Assistants");

  await page.getByTestId("mega-category-ai-video").hover();
  await expect(page.getByTestId("mega-active-category-title")).toHaveText("AI Video");

  const productLinks = mega.getByTestId("mega-product-link");
  expect(await productLinks.count()).toBeGreaterThan(0);
  for (const href of await productLinks.evaluateAll((links) => links.map((link) => link.getAttribute("href")))) {
    expect(href).toBeTruthy();
    expect(href).not.toContain("replit-bangladesh");
  }
});

test("premium homepage exposes search and solution navigation without stale V1 claims", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(PREVIEW, { waitUntil: "networkidle" });

  await page.getByRole("button", { name: "Search AI tools" }).click();
  await expect(page.getByTestId("premium-search-overlay")).toBeVisible();
  await page.getByPlaceholder(/Search ChatGPT/).fill("Claude");
  await expect(page.getByTestId("premium-search-overlay").getByRole("link").first()).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByTestId("premium-search-overlay")).toHaveCount(0);

  await page.getByRole("button", { name: "Solutions", exact: true }).hover();
  await expect(page.getByRole("link", { name: "Students", exact: true }).first()).toBeVisible();

  const bodyText = (await page.locator("body").innerText()).toLowerCase();
  for (const prohibited of ["30-day warranty", "30 day warranty", "5-30 min delivery", "5–30 min delivery"]) {
    expect(bodyText).not.toContain(prohibited);
  }
});

test("premium homepage mobile navigation exposes category accordions and touch-safe category paths", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(PREVIEW, { waitUntil: "networkidle" });

  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(page.getByRole("button", { name: "Products & categories" })).toBeVisible();
  const aiVideo = page.getByRole("link", { name: /AI Video/ }).first();
  await expect(aiVideo).toBeVisible();
  await expect(aiVideo).toHaveAttribute("href", "/ai-video");

  const bodyWidth = await page.locator("body").evaluate((element) => element.scrollWidth);
  expect(bodyWidth).toBeLessThanOrEqual(390);
});

test("homepage raw prerender exposes category, budget and comparison architecture to crawlers", async ({ request }) => {
  const response = await request.get(PREVIEW);
  expect(response.ok()).toBeTruthy();
  const html = await response.text();

  expect(html).toContain("Browse AI tools by category");
  expect(html).toContain("Compare by budget and use case");

  for (const href of [
    "/ai-assistant",
    "/ai-image",
    "/ai-video",
    "/ai-voice-music",
    "/ai-code",
    "/ai-workspace",
    "/ai-writing",
    "/ai-design",
    "/bundles",
    "/ai-under-500",
    "/ai-under-1000",
    "/ai-under-3000",
    "/chatgpt-vs-claude-bangladesh",
    "/copilot-vs-cursor",
    "/midjourney-vs-ideogram",
  ]) {
    expect(html).toContain(`href=\"${href}\"`);
  }

  expect(html).not.toContain('"@type":"FAQPage"');
  expect(html.toLowerCase()).not.toContain("replit-bangladesh");
});
