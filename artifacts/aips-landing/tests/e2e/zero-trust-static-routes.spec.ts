import { expect, test } from "@playwright/test";

const blockedClaims = [
  "30-day warranty",
  "30 day warranty",
  "30-day replacement guarantee",
  "instant delivery",
  "instant access",
  "5–15 min",
  "5-15 min",
  "5–30 min",
  "5-30 min",
  "authorized reseller",
  "exclusive promotional rate",
  "trusted by",
  "bestseller",
];

function expectTruthSafe(html: string) {
  const lower = html.toLowerCase();
  for (const claim of blockedClaims) expect(lower).not.toContain(claim.toLowerCase());
  expect(lower).not.toContain("replit-bangladesh");
}

test("budget route is a governed static page with no legacy React runtime", async ({ request }) => {
  const response = await request.get("/ai-under-500");
  expect(response.ok()).toBeTruthy();
  const html = await response.text();
  expect(html).toContain("AI Tools Under BDT 500 in Bangladesh");
  expect(html).toContain('rel="canonical" href="https://aipremiumshop.com/ai-under-500"');
  expect(html).not.toMatch(/type=["']module["']/i);
  expectTruthSafe(html);
});

test("comparison route is a governed static page with current-catalog framing", async ({ request }) => {
  const response = await request.get("/chatgpt-vs-claude");
  expect(response.ok()).toBeTruthy();
  const html = await response.text();
  expect(html).toContain("ChatGPT Plus vs Claude in Bangladesh");
  expect(html).toContain("Lowest published AIPS price");
  expect(html).toContain('rel="canonical" href="https://aipremiumshop.com/chatgpt-vs-claude"');
  expect(html).not.toMatch(/type=["']module["']/i);
  expectTruthSafe(html);
});

test("deployed sitemap excludes retired and permanent-redirect aliases", async ({ request }) => {
  const response = await request.get("/sitemap.xml");
  expect(response.ok()).toBeTruthy();
  const xml = await response.text();
  const excluded = [
    "/replit-bangladesh",
    "/product/replit-bangladesh",
    "/chatgpt-vs-claude-bangladesh",
    "/chatgpt-plans-comparison-bangladesh",
    "/google-ai-pro-bangladesh",
    "/best-ai-budget-bangladesh",
  ];
  for (const route of excluded) expect(xml).not.toContain(`https://aipremiumshop.com${route}`);
  expect((xml.match(/<loc>/g) ?? []).length).toBeGreaterThan(250);
});

test("pricing crawler metadata is fully resolved and truth-safe", async ({ request }) => {
  const response = await request.get("/pricing");
  expect(response.ok()).toBeTruthy();
  const html = await response.text();
  expect(html).toContain("AI Tool Pricing in Bangladesh | AI Premium Shop");
  expect(html).not.toContain("${");
  expectTruthSafe(html);
});
