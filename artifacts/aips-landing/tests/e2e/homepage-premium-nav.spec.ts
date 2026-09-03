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
  await expect(mega.getByTestId("mega-subcategory-link").filter({ hasText: "AI avatars" })).toHaveAttribute("href", "/products?category=ai-video&q=avatar");

  const productLinks = mega.getByTestId("mega-product-link");
  expect(await productLinks.count()).toBeGreaterThan(0);
  for (const href of await productLinks.evaluateAll((links) => links.map((link) => link.getAttribute("href")))) {
    expect(href).toBeTruthy();
    expect(href).not.toContain("replit-bangladesh");
  }
});

test("premium homepage search is modal, task-aware and restores focus", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(PREVIEW, { waitUntil: "networkidle" });

  const searchButton = page.getByRole("button", { name: "Search AI tools" });
  await searchButton.click();
  const overlay = page.getByTestId("premium-search-overlay");
  await expect(overlay).toBeVisible();
  await expect(overlay.getByRole("dialog")).toHaveAttribute("aria-modal", "true");
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");

  await overlay.getByRole("searchbox", { name: "Search AI tools" }).fill("AI avatars");
  await expect(overlay.getByRole("link").first()).toBeVisible();
  await expect(overlay.getByRole("link").first()).toHaveAttribute("href", /.+/);

  await page.keyboard.press("Escape");
  await expect(overlay).toHaveCount(0);
  await expect(searchButton).toBeFocused();

  await page.getByRole("button", { name: "Solutions", exact: true }).hover();
  await expect(page.getByRole("link", { name: "Students", exact: true }).first()).toBeVisible();

  const bodyText = (await page.locator("body").innerText()).toLowerCase();
  for (const prohibited of ["30-day warranty", "30 day warranty", "5-30 min delivery", "5–30 min delivery"]) {
    expect(bodyText).not.toContain(prohibited);
  }
});

test("premium homepage mobile navigation exposes categories, task subcategories and viewport-safe scrolling", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(PREVIEW, { waitUntil: "networkidle" });

  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(page.getByRole("button", { name: "Products & categories" })).toBeVisible();
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");

  const aiVideo = page.getByRole("link", { name: /AI Video/ }).first();
  await expect(aiVideo).toBeVisible();
  await expect(aiVideo).toHaveAttribute("href", "/ai-video");

  await page.getByRole("button", { name: "Show AI Video tasks" }).click();
  const avatarTask = page.getByTestId("mobile-subcategory-link").filter({ hasText: "AI avatars" });
  await expect(avatarTask).toBeVisible();
  await expect(avatarTask).toHaveAttribute("href", "/products?category=ai-video&q=avatar");

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

test("SPA return from catalog always reboots into the governed homepage", async ({ page }) => {
  await page.goto("/products", { waitUntil: "networkidle" });
  const homeLink = page.locator('a[href="/"]').first();
  await expect(homeLink).toBeVisible();

  await homeLink.click();
  await page.waitForLoadState("networkidle");
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByTestId("homepage-v2-access-models")).toBeVisible();

  const bodyText = (await page.locator("body").innerText()).toLowerCase();
  for (const prohibited of [
    "30-day replacement warranty",
    "30-day warranty",
    "5-30 min delivery",
    "4 payment methods",
    "rocket",
    "all brands, all features, all working",
  ]) {
    expect(bodyText).not.toContain(prohibited);
  }
});