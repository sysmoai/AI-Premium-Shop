import { expect, test } from "@playwright/test";

const BLOCKED = [
  "30-day warranty", "30 day warranty", "5-30 min", "5–30 min", "5-15 min", "5–15 min",
  "instant delivery", "best value", "% off", "replit-bangladesh", "gpt-5.4", "claude opus",
  "earn bdt", "earn $", "unlimited searches", "unlimited generations",
];

test("audience guide runtime uses current catalog evidence instead of stale rankings and earnings claims", async ({ page }) => {
  await page.goto("/best-ai-for-students", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: /AI Tools for Students/i })).toBeVisible();
  await expect(page.getByText("Current-catalog decision guide", { exact: true })).toBeVisible();
  const main = page.getByRole("main");
  const text = (await main.innerText()).toLowerCase();
  for (const phrase of BLOCKED) expect(text).not.toContain(phrase.toLowerCase());
  expect(text).toContain("not an objective ranking");
  expect(text).toContain("verify current provider");
});

test("audience guide generated HTML is self-canonical and fail-closed", async ({ request }) => {
  const response = await request.get("/best-ai-for-students/index.html");
  expect(response.ok()).toBeTruthy();
  const html = (await response.text()).toLowerCase();
  expect(html).toContain('rel="canonical" href="https://aipremiumshop.com/best-ai-for-students"');
  expect(html).toContain("current-catalog decision guide");
  expect(html).toContain("confirm current availability");
  for (const phrase of BLOCKED) expect(html).not.toContain(phrase.toLowerCase());
});

test("all nine audience guide artifacts are present and crawler-safe", async ({ request }) => {
  for (const key of ["students", "freelancers", "creators", "business", "developers", "job-seekers", "designers", "marketers", "ecommerce"]) {
    const response = await request.get(`/best-ai-for-${key}/index.html`);
    expect(response.ok()).toBeTruthy();
    const html = (await response.text()).toLowerCase();
    expect(html).toContain(`rel="canonical" href="https://aipremiumshop.com/best-ai-for-${key}"`);
    for (const phrase of BLOCKED) expect(html).not.toContain(phrase.toLowerCase());
  }
});