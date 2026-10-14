import { readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";

type ApprovedPricing = {
  schema_version: number;
  revision: string;
  currency: string;
  approved_price_by_usd: Record<string, number>;
  rules: Array<{ id: string; fixed_bdt?: number; allowed_usd?: number[]; blocked_usd?: number[] }>;
};

// Independent test expectation: read the approved source, never the generated page
// or its projection. Stop on ambiguous policy rather than guessing a new price.
function approvedPlusPrice(pricing: ApprovedPricing): number {
  if (pricing.schema_version !== 1 || pricing.currency !== "BDT" || !pricing.revision?.trim()) {
    throw new Error("Unsupported or unversioned approved pricing source");
  }
  const rules = pricing.rules.filter((rule) => rule.id === "chatgpt-plus");
  const rule = rules[0];
  if (rules.length !== 1 || !rule) throw new Error("Expected exactly one approved ChatGPT Plus pricing rule");
  let amount = rule.fixed_bdt;
  if (amount == null) {
    if (rule.allowed_usd?.length !== 1) throw new Error("ChatGPT Plus price requires explicit single-tier mapping");
    const usd = rule.allowed_usd[0];
    if (typeof usd !== "number" || !Number.isFinite(usd) || usd <= 0 || rule.blocked_usd?.includes(usd)) {
      throw new Error("ChatGPT Plus USD mapping is invalid or blocked");
    }
    amount = pricing.approved_price_by_usd[String(usd)];
  }
  if (typeof amount !== "number" || !Number.isSafeInteger(amount) || amount <= 0) {
    throw new Error("Approved ChatGPT Plus BDT price is missing or invalid");
  }
  return amount;
}

const pricing = JSON.parse(readFileSync(new URL("../../../../ops/ssot/pricing-v2.json", import.meta.url), "utf8")) as ApprovedPricing;
const EXPECTED_PLUS_PRICE = new Intl.NumberFormat("en-US").format(approvedPlusPrice(pricing));
const BLOCKED_CHATGPT_LABELS = ["Starter Shared", "Premium Shared"];

async function expectBlockedChatGptOptionsAbsent(text: string) {
  const normalized = text.toLowerCase();
  for (const label of BLOCKED_CHATGPT_LABELS) {
    expect(normalized).not.toContain(label.toLowerCase());
  }
}

test("ChatGPT Plus runtime preserves the family but exposes only the remaining eligible option", async ({ page }) => {
  await page.goto("/chatgpt-plus-bangladesh", { waitUntil: "networkidle" });

  await expect(page.getByRole("heading", { level: 1, name: "ChatGPT Plus" })).toBeVisible();
  const main = page.getByRole("main");
  const text = await main.innerText();

  await expectBlockedChatGptOptionsAbsent(text);
  expect(text).toContain("Personal");
  expect(text).toContain(EXPECTED_PLUS_PRICE);
  await expect(main.getByText("Personal access", { exact: true })).toBeVisible();
});

test("ChatGPT Plus crawler artifact excludes provider-blocked options and keeps canonical route", async ({ request }) => {
  const response = await request.get("/chatgpt-plus-bangladesh/index.html");
  expect(response.ok()).toBeTruthy();
  const html = await response.text();

  await expectBlockedChatGptOptionsAbsent(html);
  expect(html).toContain("Personal");
  expect(html).toContain(`BDT ${EXPECTED_PLUS_PRICE}`);
  expect(html).toContain('rel="canonical" href="https://aipremiumshop.com/chatgpt-plus-bangladesh"');
});

test("pricing surface does not re-expose blocked ChatGPT Plus rows", async ({ page }) => {
  await page.goto("/pricing", { waitUntil: "networkidle" });
  const main = page.getByRole("main");
  const chatgptRows = main.getByRole("row").filter({ hasText: /ChatGPT Plus/i });

  await expect(chatgptRows).toHaveCount(1);
  const rowText = await chatgptRows.first().innerText();

  await expectBlockedChatGptOptionsAbsent(rowText);
  expect(rowText).toContain("Personal");
  expect(rowText).toContain(EXPECTED_PLUS_PRICE);
});
