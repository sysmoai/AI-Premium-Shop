import { expect, test } from "@playwright/test";

const BLOCKED = [
  "30-day warranty", "30 day warranty", "replacement guarantee", "instant delivery", "5-15 min", "5–15 min", "5-30 min", "5–30 min",
  "trusted by", "best seller", "bestseller", "% off", "authorized reseller", "official reseller", "official distributor", "exclusive promotional rate",
  "lifetime support", "guaranteed activation", "guaranteed delivery",
];

const CLAUDE_DESCRIPTION = "Claude Pro in Bangladesh: compare the current AI Premium Shop Personal listing, Anthropic's $20/month Pro reference, bKash/Nagad and buying checks.";
const GOOGLE_DESCRIPTION = "Google AI Pro in Bangladesh: compare current AI Premium Shop Personal and Shared listings, Google's $19.99/month reference, bKash/Nagad and key access checks.";

function assertBlockedAbsent(text: string) {
  const lower = text.toLowerCase();
  for (const phrase of BLOCKED) expect(lower).not.toContain(phrase.toLowerCase());
}

test("Claude Pro V2 removes shared Anthropic commerce and separates provider references", async ({ page }) => {
  await page.goto("/claude-pro-bangladesh", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { level: 1, name: "Claude Pro Price in Bangladesh" })).toBeVisible();
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", CLAUDE_DESCRIPTION);
  const main = page.getByRole("main");
  const text = await main.innerText();
  expect(text).toContain("$20/month or $200/year");
  expect(text).toContain("$100/month for Max 5x or $200/month for Max 20x");
  expect(text).toContain("bKash");
  expect(text).toContain("Nagad");
  expect(text).toMatch(/৳[0-9,]+\/month/);
  expect(text.toLowerCase()).toContain("shared anthropic account rows are not published");
  expect(text.toLowerCase()).not.toContain("premium shared");
  expect(text.toLowerCase()).not.toContain("starter shared");
  expect(text.toLowerCase()).not.toContain("shared access");
  await expect(page.getByRole("link", { name: /Anthropic — Consumer Terms of Service/i })).toBeVisible();
  assertBlockedAbsent(text);
});

test("Google AI Pro V2 keeps legacy canonical but does not equate Shared with family sharing", async ({ page }) => {
  await page.goto("/gemini-advanced-bangladesh", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { level: 1, name: "Google AI Pro Price in Bangladesh" })).toBeVisible();
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", GOOGLE_DESCRIPTION);
  const main = page.getByRole("main");
  const text = await main.innerText();
  expect(text).toContain("$19.99/month on the current Google One plan page");
  expect(text).toContain("bKash");
  expect(text).toContain("Nagad");
  expect(text).toMatch(/৳[0-9,]+\/month/);
  expect(text.toLowerCase()).toContain("legacy gemini advanced");
  expect(text.toLowerCase()).toContain("compute-based");
  expect(text.toLowerCase()).toContain("select ai benefits");
  expect(text.toLowerCase()).toContain("do not assume");
  expect(text.toLowerCase()).toContain("google family sharing");
  expect(text.toLowerCase()).toContain("provider-authorized resale");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://aipremiumshop.com/gemini-advanced-bangladesh");
  assertBlockedAbsent(text);
});

test("Claude crawler artifact matches V2 evidence and contains no shared offer", async ({ request }) => {
  const response = await request.get("/claude-pro-bangladesh/index.html");
  expect(response.ok()).toBeTruthy();
  const html = await response.text();
  const lower = html.toLowerCase();
  expect(html).toContain("<title>Claude Pro Price in Bangladesh | AI Premium Shop</title>");
  expect(html).toContain(`<meta name="description" content="${CLAUDE_DESCRIPTION}" />`);
  expect(html).toContain('rel="canonical" href="https://aipremiumshop.com/claude-pro-bangladesh"');
  expect(html).toContain("$20/month or $200/year");
  expect(lower).toContain("anthropic consumer terms");
  expect(lower).toContain("shared anthropic account rows are not published");
  expect(lower).not.toContain("premium shared");
  expect(lower).not.toContain("starter shared");
  expect(lower).not.toContain("shared access");
  expect(lower).not.toContain('"@type":"faqpage"');
  assertBlockedAbsent(html);
});

test("Google AI Pro crawler artifact preserves exact canonical and sharing caveat", async ({ request }) => {
  const response = await request.get("/gemini-advanced-bangladesh/index.html");
  expect(response.ok()).toBeTruthy();
  const html = await response.text();
  const lower = html.toLowerCase();
  expect(html).toContain("<title>Google AI Pro Price in Bangladesh | AI Premium Shop</title>");
  expect(html).toContain(`<meta name="description" content="${GOOGLE_DESCRIPTION}" />`);
  expect(html).toContain('rel="canonical" href="https://aipremiumshop.com/gemini-advanced-bangladesh"');
  expect(html).toContain("$19.99/month on the current Google One plan page");
  expect(lower).toContain("legacy gemini advanced");
  expect(lower).toContain("do not assume");
  expect(lower).toContain("google family sharing");
  expect(lower).toContain("provider-authorized resale");
  expect(lower).toContain("compute-based");
  expect(lower).not.toContain('"@type":"faqpage"');
  assertBlockedAbsent(html);
});

test("GO4 sitemap lastmod changes only the two material Tier-A routes", async ({ request }) => {
  const response = await request.get("/sitemap.xml");
  expect(response.ok()).toBeTruthy();
  const xml = await response.text();
  for (const slug of ["claude-pro-bangladesh", "gemini-advanced-bangladesh"]) {
    const escaped = slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const block = xml.match(new RegExp(`<url>\\s*<loc>https://aipremiumshop\\.com/${escaped}<\\/loc>[\\s\\S]*?<\\/url>`));
    expect(block, `${slug} sitemap block`).not.toBeNull();
    expect(block?.[0]).toContain("<lastmod>2026-09-07</lastmod>");
  }
  expect(xml).not.toContain("<changefreq>");
  expect(xml).not.toContain("<priority>");
});
