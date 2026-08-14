import { expect, test } from "@playwright/test";

const CATEGORY_ROUTES = ["ai-assistant", "ai-image", "ai-video", "ai-voice-music", "ai-code", "ai-workspace", "ai-writing", "ai-design", "bundles"];
const BLOCKED = [
  "30-day warranty", "30 day warranty", "replacement guarantee", "instant delivery", "instant access", "fast delivery",
  "5-15 min", "5–15 min", "5-30 min", "5–30 min", "30-60 min", "30–60 min", "2-4 hours", "2–4 hours",
  "no international card", "no intl card", "no chat history sharing", "full privacy", "best value", "top choice", "bestseller", "best seller",
  "% off", "save ৳", "save bdt", "gpt-5.4", "opus 5", "gen-4", "unlimited", "commercial licensing", "royalty-free", "replit"
];

test("AI assistant category runtime uses governed family cards and confirm-first guidance", async ({ page }) => {
  await page.goto("/ai-assistant", { waitUntil: "networkidle" });
  const main = page.locator("#main-content");
  await expect(main.getByRole("heading", { name: "AI Assistants & Chat" })).toBeVisible();
  await expect(main.getByText("Current public catalog")).toBeVisible();
  await expect(main.getByText("Published AIPS entry price").first()).toBeVisible();
  await expect(main.getByRole("link", { name: "Confirm current details" })).toBeVisible();
  const text = (await main.innerText()).toLowerCase();
  for (const phrase of BLOCKED) expect(text, phrase).not.toContain(phrase.toLowerCase());
  expect(text).toContain("provider-controlled");
});

test("AI code category runtime excludes retired Replit and fixed SLA/model claims", async ({ page }) => {
  await page.goto("/ai-code", { waitUntil: "networkidle" });
  const main = page.locator("#main-content");
  await expect(main.getByRole("heading", { name: "AI Code & Development" })).toBeVisible();
  const text = (await main.innerText()).toLowerCase();
  for (const phrase of BLOCKED) expect(text, phrase).not.toContain(phrase.toLowerCase());
  expect(text).toContain("catalog families");
  expect(text).toContain("repository privacy");
});

test("bundles runtime removes typed savings/value packages and uses current catalog records", async ({ page }) => {
  await page.goto("/bundles", { waitUntil: "networkidle" });
  const main = page.locator("#main-content");
  await expect(main.getByRole("heading", { name: "Bundles & Services" })).toBeVisible();
  const text = (await main.innerText()).toLowerCase();
  expect(text).toContain("exact inclusions");
  expect(text).not.toContain("student essentials package");
  expect(text).not.toContain("replace bdt");
  for (const phrase of BLOCKED) expect(text, phrase).not.toContain(phrase.toLowerCase());
});

test("all category crawler artifacts are self-canonical, runtime-capable and truth-sanitized", async ({ request }) => {
  for (const category of CATEGORY_ROUTES) {
    const route = category === "bundles" ? "/bundles" : `/${category}`;
    const response = await request.get(`${route}/index.html`);
    expect(response.ok(), route).toBeTruthy();
    const html = (await response.text()).toLowerCase();
    expect(html, route).toContain(`rel="canonical" href="https://aipremiumshop.com${route}"`);
    expect(html, route).toContain("browse current public aips catalog families");
    expect(html, route).toContain("confirm current availability, delivery eta and applicable terms before payment");
    expect(html, route).toContain('<script type="module"');
    expect(html, route).not.toContain('"@type":"faqpage"');
    for (const phrase of BLOCKED) expect(html, `${route}: ${phrase}`).not.toContain(phrase.toLowerCase());
  }
});
