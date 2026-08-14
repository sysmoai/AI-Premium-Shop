import { expect, test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const APP = process.cwd();
const ROUTES = ["/about", "/faq", "/support", "/how-to-order", "/contact", "/refund-policy", "/terms", "/privacy-policy"];
const BLOCKED = [
  "30-day warranty", "30 day warranty", "5-30 min", "5–30 min", "5-15 min", "5–15 min",
  "2-4 hours", "2–4 hours", "under 5 min", "under-5-minute", "respond within 5",
  "delivered in minutes", "instant delivery", "no international card", "no questions asked",
  "all local and international payment", "own chat history", "don't see each other", "discount codes",
  "8+ hrs/week", "mastered in 1 hour", "2hr expert setup", "5hr training", "best value",
];

for (const route of ROUTES) {
  test(`${route} runtime is confirm-first and free of blanket commercial promises`, async ({ page }) => {
    await page.goto(route, { waitUntil: "networkidle" });
    await expect(page.getByRole("main")).toHaveCount(1);
    const text = (await page.locator("body").innerText()).toLowerCase();
    for (const phrase of BLOCKED) expect(text, `${route}: ${phrase}`).not.toContain(phrase.toLowerCase());
  });
}

test("secondary-page navbar keeps discovery/search without typed bundle promises", async ({ page }) => {
  await page.goto("/about", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Products" }).click();
  await expect(page.getByText(/current families/).first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Browse the full current catalog" })).toBeVisible();
  const navText = (await page.getByRole("banner").innerText()).toLowerCase();
  for (const phrase of BLOCKED) expect(navText, phrase).not.toContain(phrase.toLowerCase());

  await page.getByRole("button", { name: "Search catalog" }).click();
  const input = page.getByPlaceholder("Search current AI catalog");
  await input.fill("ChatGPT");
  await expect(page.getByText("ChatGPT Plus").first()).toBeVisible();
});

test("info and policy crawler shells are governed and self-canonical", async ({ request }) => {
  for (const route of ROUTES) {
    const response = await request.get(`${route}/index.html`);
    expect(response.ok(), route).toBeTruthy();
    const html = await response.text();
    const lower = html.toLowerCase();
    expect((html.match(/rel="canonical"/g) ?? []).length, route).toBe(1);
    expect((html.match(/<h1[\s>]/g) ?? []).length, route).toBe(1);
    for (const phrase of BLOCKED) expect(lower, `${route}: ${phrase}`).not.toContain(phrase.toLowerCase());
  }
  const faq = await (await request.get("/faq/index.html")).text();
  expect(faq.toLowerCase()).not.toContain('"@type":"faqpage"');
});

test("privacy alias is a permanent redirect source and shared components are neutral", async () => {
  const vercel = JSON.parse(fs.readFileSync(path.join(APP, "vercel.json"), "utf8"));
  const privacy = vercel.redirects.find((entry: { source: string }) => entry.source === "/privacy");
  expect(privacy).toEqual(expect.objectContaining({ destination: "/privacy-policy", permanent: true }));

  for (const file of ["src/components/PageFooter.tsx", "src/components/Navbar.tsx", "src/components/PaymentBadges.tsx"]) {
    const text = fs.readFileSync(path.join(APP, file), "utf8").toLowerCase();
    for (const phrase of BLOCKED) expect(text, `${file}: ${phrase}`).not.toContain(phrase.toLowerCase());
  }
});
