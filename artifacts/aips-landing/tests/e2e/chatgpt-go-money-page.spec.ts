import { expect, test } from "@playwright/test";

test("ChatGPT Go money page renders current evidence and governed buying guidance", async ({ page }) => {
  await page.goto("/chatgpt-go-bangladesh");

  await expect(page.getByRole("heading", { level: 1, name: "ChatGPT Go Price in Bangladesh" })).toBeVisible();
  await expect(page.getByText("Current AI Premium Shop listing", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("OpenAI provider reference", { exact: true }).first()).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "What ChatGPT Go is for" })).toBeVisible();
  await expect(page.getByText(/API usage is not included and is billed independently/i)).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Account and access safety" })).toBeVisible();

  const source = page.getByRole("link", { name: /What is ChatGPT Go/i });
  await expect(source).toHaveAttribute("href", "https://help.openai.com/en/articles/11989085");

  await expect(page.getByRole("link", { name: /Open the ChatGPT Plus guide/i })).toHaveAttribute("href", "/chatgpt-plus-bangladesh");
  await expect(page.getByRole("link", { name: /Compare all ChatGPT plans/i })).toHaveAttribute("href", "/chatgpt-plans-bangladesh");

  const whatsapp = page.getByRole("link", { name: "Confirm Go on WhatsApp" });
  const href = await whatsapp.getAttribute("href");
  expect(href).toContain("https://wa.me/8801865385348?text=");
  expect(decodeURIComponent(href ?? "")).toContain("confirm the current AI Premium Shop price");

  const text = (await page.locator("body").innerText()).toLowerCase();
  expect(text).not.toContain("shared access");
  expect(text).not.toContain("authorized reseller");
  expect(text).not.toContain("instant delivery");
});
