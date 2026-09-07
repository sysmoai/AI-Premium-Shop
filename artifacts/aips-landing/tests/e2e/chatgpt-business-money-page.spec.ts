import { expect, test } from "@playwright/test";

test("ChatGPT Business money page separates AIPS listing from OpenAI workspace rules", async ({ page }) => {
  await page.goto("/chatgpt-business-bangladesh");

  await expect(page.getByRole("heading", { level: 1, name: "ChatGPT Business Price in Bangladesh" })).toBeVisible();
  await expect(page.getByText("Current AI Premium Shop listing", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("OpenAI provider reference", { exact: true }).first()).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "How ChatGPT Business seats work" })).toBeVisible();
  await expect(page.getByText(/at least two paid seats/i).first()).toBeVisible();
  await expect(page.getByText(/API usage is separate from the Business workspace subscription/i)).toBeVisible();
  await expect(page.getByText(/not proof of an OpenAI Business workspace or seat configuration/i)).toBeVisible();

  await expect(page.getByRole("link", { name: /ChatGPT Business: General FAQ/i })).toHaveAttribute("href", "https://help.openai.com/en/articles/8542115");
  await expect(page.getByRole("link", { name: /ChatGPT Business Overview/i })).toHaveAttribute("href", "https://help.openai.com/en/articles/8792828");
  await expect(page.getByRole("link", { name: /Compare all ChatGPT plans/i })).toHaveAttribute("href", "/chatgpt-plans-bangladesh");

  const whatsapp = page.getByRole("link", { name: "Confirm Business details" });
  const href = await whatsapp.getAttribute("href");
  expect(href).toContain("https://wa.me/8801865385348?text=");
  const decoded = decodeURIComponent(href ?? "");
  expect(decoded).toContain("seat/workspace arrangement");
  expect(decoded).toContain("before payment");

  const text = (await page.locator("body").innerText()).toLowerCase();
  expect(text).not.toContain("authorized reseller");
  expect(text).not.toContain("instant delivery");
  expect(text).not.toContain("guaranteed activation");
});
