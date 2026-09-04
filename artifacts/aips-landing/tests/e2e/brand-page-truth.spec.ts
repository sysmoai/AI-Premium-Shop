import { expect, test } from "@playwright/test";

const BLOCKED = [
  "30-day warranty", "30 day warranty", "replacement guarantee", "instant delivery", "5-15 min", "5–15 min", "5-30 min", "5–30 min",
  "trusted by", "best seller", "bestseller", "% off", "authorized reseller", "official reseller", "official distributor", "exclusive promotional rate",
  "no intl card", "no international card", "lifetime support", "gpt-5.4", "your conversations are private from other users",
];

const PLUS_META_DESCRIPTION = "ChatGPT Plus in Bangladesh: compare the current AI Premium Shop personal price, OpenAI's $20/month reference, bKash/Nagad and key checks before payment.";

function assertBlockedAbsent(text: string) {
  const lower = text.toLowerCase();
  for (const phrase of BLOCKED) expect(lower).not.toContain(phrase.toLowerCase());
}

test("ChatGPT Plus V2 owns exact transactional intent with first-party evidence", async ({ page }) => {
  await page.goto("/chatgpt-plus-bangladesh", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { level: 1, name: "ChatGPT Plus Price in Bangladesh" })).toBeVisible();
  await expect(page.getByText("$20/month", { exact: true })).toBeVisible();
  await expect(page.getByText(/bKash/)).toBeVisible();
  await expect(page.getByText(/Nagad/)).toBeVisible();
  await expect(page.getByText(/account is meant for the individual who created it/i)).toBeVisible();
  await expect(page.getByRole("link", { name: /Compare all ChatGPT plans/i })).toHaveAttribute("href", "/chatgpt-plans-bangladesh");
  await expect(page.getByText("Personal access").first()).toBeVisible();
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", PLUS_META_DESCRIPTION);
  const text = await page.getByRole("main").innerText();
  expect(text).toMatch(/৳[0-9,]+\/month/);
  expect(text.toLowerCase()).not.toContain("shared access");
  assertBlockedAbsent(text);
});

test("ChatGPT plan-family V2 owns broad Go vs Plus vs Pro vs Business comparison", async ({ page }) => {
  await page.goto("/chatgpt-plans-bangladesh", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { level: 1, name: "ChatGPT Plans in Bangladesh: Go vs Plus vs Pro vs Business" })).toBeVisible();
  const main = page.getByRole("main");
  const text = await main.innerText();
  for (const plan of ["Go", "Plus", "Pro", "Business"]) expect(text).toContain(plan);
  expect(text).toContain("$100 and $200 tiers");
  expect(text.toLowerCase()).toContain("at least two paid seats");
  expect(text).toContain("OpenAI reference");
  expect(text).toContain("Current AI Premium Shop listing");
  expect(text.toLowerCase()).not.toContain("shared access");
  assertBlockedAbsent(text);
  await expect(page.getByRole("link", { name: /Open the ChatGPT Plus buying guide/i })).toHaveAttribute("href", "/chatgpt-plus-bangladesh");
});

test("ChatGPT Plus crawler artifact carries V2 evidence without stale commerce", async ({ request }) => {
  const response = await request.get("/chatgpt-plus-bangladesh/index.html");
  expect(response.ok()).toBeTruthy();
  const html = await response.text();
  const lower = html.toLowerCase();
  expect(html).toContain('<title>ChatGPT Plus Price in Bangladesh | AI Premium Shop</title>');
  expect(html).toContain(`<meta name="description" content="${PLUS_META_DESCRIPTION}" />`);
  expect(html).toContain('rel="canonical" href="https://aipremiumshop.com/chatgpt-plus-bangladesh"');
  expect(html).toContain("$20/month");
  expect(html).toContain("bKash");
  expect(html).toContain("Nagad");
  expect(lower).toContain("account is meant for the individual who created it");
  expect(lower).toContain("first-party sources reviewed");
  expect(lower).not.toContain("shared access");
  expect(lower).not.toContain('"@type":"faqpage"');
  assertBlockedAbsent(html);
});

test("ChatGPT plan-family crawler artifact remains distinct from exact Plus intent", async ({ request }) => {
  const response = await request.get("/chatgpt-plans-bangladesh/index.html");
  expect(response.ok()).toBeTruthy();
  const html = await response.text();
  const lower = html.toLowerCase();
  expect(html).toContain('<title>ChatGPT Plans Bangladesh: Go vs Plus vs Pro vs Business</title>');
  expect(html).toContain('rel="canonical" href="https://aipremiumshop.com/chatgpt-plans-bangladesh"');
  expect(html).toContain("$100 and $200 Pro tiers");
  expect(lower).toContain("at least two paid seats");
  expect(html).toContain("/chatgpt-plus-bangladesh");
  expect(lower).not.toContain("shared access");
  assertBlockedAbsent(html);
});

test("retired Replit does not render as a brand page in SPA fallback", async ({ page }) => {
  await page.goto("/replit-bangladesh", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "Listing not available" })).toBeVisible();
});
