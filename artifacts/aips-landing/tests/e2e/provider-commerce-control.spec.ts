import { expect, test } from "@playwright/test";

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
  expect(text).toContain("2,990");
  await expect(main.getByText("Personal access", { exact: true })).toBeVisible();
});

test("ChatGPT Plus crawler artifact excludes provider-blocked options and keeps canonical route", async ({ request }) => {
  const response = await request.get("/chatgpt-plus-bangladesh/index.html");
  expect(response.ok()).toBeTruthy();
  const html = await response.text();

  await expectBlockedChatGptOptionsAbsent(html);
  expect(html).toContain("Personal");
  expect(html).toContain("BDT 2,990");
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
  expect(rowText).toContain("2,990");
});
