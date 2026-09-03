import { expect, test } from "@playwright/test";

const PUBLIC_ACRONYM = /\bAIPS\b/;
const ROUTES = [
  "/",
  "/products",
  "/ai-video",
  "/chatgpt-plus-bangladesh",
  "/pricing",
];

async function expectNoPublicAcronym(page: import("@playwright/test").Page) {
  const bodyText = await page.locator("body").innerText();
  expect(bodyText).not.toMatch(PUBLIC_ACRONYM);
  expect(await page.title()).not.toMatch(PUBLIC_ACRONYM);

  const metaDescriptions = await page.locator('meta[name="description"], meta[property="og:title"], meta[property="og:description"]').evaluateAll((nodes) =>
    nodes.map((node) => node.getAttribute("content") ?? ""),
  );
  for (const value of metaDescriptions) expect(value).not.toMatch(PUBLIC_ACRONYM);

  const publicAttributes = await page.locator("[aria-label], [title], [alt], [placeholder]").evaluateAll((nodes) =>
    nodes.flatMap((node) => ["aria-label", "title", "alt", "placeholder"].map((name) => node.getAttribute(name) ?? "")),
  );
  for (const value of publicAttributes) expect(value).not.toMatch(PUBLIC_ACRONYM);

  const jsonLd = await page.locator('script[type="application/ld+json"]').allTextContents();
  for (const value of jsonLd) expect(value).not.toMatch(PUBLIC_ACRONYM);
}

for (const route of ROUTES) {
  test(`approved full public brand name is enforced on ${route}`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator("#root")).not.toBeEmpty();
    await expectNoPublicAcronym(page);
  });
}

test("AI assistant cannot leak the internal acronym after client rendering", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /Open AI assistant/ }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveAttribute("aria-label", "AI Premium Shop AI Assistant chat");
  await expect(dialog).toContainText("AI Premium Shop AI Assistant");
  await expectNoPublicAcronym(page);
});

test("organization entity points to the verified current LinkedIn showcase URL", async ({ page }) => {
  await page.goto("/");
  const jsonLd = await page.locator('script[type="application/ld+json"]').allTextContents();
  const joined = jsonLd.join("\n");
  expect(joined).toContain("https://www.linkedin.com/showcase/aipremiumshop/");
  expect(joined).not.toContain("https://www.linkedin.com/company/aipremiumshop/");
});
