import { test, expect } from "@playwright/test";

function schemaNodes(raw: string[]) {
  return raw.flatMap((value) => {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      return [];
    }
  });
}

function types(node: any): string[] {
  const value = node?.["@type"];
  return Array.isArray(value) ? value : value ? [value] : [];
}

async function jsonLd(page: import("@playwright/test").Page) {
  return schemaNodes(await page.locator('script[type="application/ld+json"]').allTextContents());
}

for (const route of [
  "/chatgpt-plus-bangladesh",
  "/claude-pro-bangladesh",
  "/gemini-advanced-bangladesh",
  "/midjourney-bangladesh",
]) {
  test(`${route} has hydrated Tier-A Product + Breadcrumb schema without protected merchant fields`, async ({ page }) => {
    await page.goto(route);
    const links = page.locator("[data-tier-a-internal-links]");
    await expect(links).toBeVisible();
    await expect(links.getByRole("heading", { name: "Compare related AI tools" })).toBeVisible();
    expect(await links.locator('a[href^="/"]').count()).toBeGreaterThanOrEqual(3);

    await expect(page.locator('script[data-tier-a-static="true"]')).toHaveCount(0);
    await expect(page.locator('script[data-tier-a-runtime="true"]')).toHaveCount(2);

    const nodes = await jsonLd(page);
    const products = nodes.filter((node) => types(node).includes("Product"));
    const breadcrumbs = nodes.filter((node) => types(node).includes("BreadcrumbList"));
    expect(products).toHaveLength(1);
    expect(breadcrumbs).toHaveLength(1);
    expect(products[0].url).toBe(`https://aipremiumshop.com${route}`);
    const productText = JSON.stringify(products[0]);
    expect(productText).not.toMatch(/"availability"|"shippingDetails"|"hasMerchantReturnPolicy"|"priceValidUntil"|"aggregateRating"|"review"|"dateModified"/i);
    if (products[0].offers) {
      expect(["Offer", "AggregateOffer"]).toContain(types(products[0].offers)[0]);
      expect(products[0].offers.priceCurrency).toBe("BDT");
    }
  });
}

test("Midjourney keeps only governed commerce while blocked shared tiers stay absent", async ({ page }) => {
  await page.goto("/midjourney-bangladesh");
  await expect(page.locator("[data-tier-a-internal-links]")).toBeVisible();
  await expect(page.getByText(/Pro Shared|Premium Shared/i)).toHaveCount(0);
  const nodes = await jsonLd(page);
  const products = nodes.filter((node) => types(node).includes("Product"));
  expect(products).toHaveLength(1);
  expect(products[0].offers).toBeTruthy();
  expect(JSON.stringify(products[0])).not.toMatch(/authorized reseller|provider-authorized|aggregateRating|review/i);
});

test("Higgsfield remains inquiry-only with Product schema but no Offer", async ({ page }) => {
  await page.goto("/product/higgsfield-ai-bangladesh");
  await expect(page.getByText("Enquiry only — no payment is taken on this site.")).toBeVisible();
  await expect(page.locator("[data-tier-a-internal-links]")).toBeVisible();
  await expect(page.locator('script[data-tier-a-static="true"]')).toHaveCount(0);
  await expect(page.locator('script[data-tier-a-runtime="true"]')).toHaveCount(0);
  const nodes = await jsonLd(page);
  const products = nodes.filter((node) => types(node).includes("Product"));
  const breadcrumbs = nodes.filter((node) => types(node).includes("BreadcrumbList"));
  expect(products).toHaveLength(1);
  expect(breadcrumbs).toHaveLength(1);
  expect(products[0].offers).toBeUndefined();
  expect(JSON.stringify(products[0])).not.toMatch(/"availability"|"aggregateRating"|"review"/i);
});
