import { expect, test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const APP = process.cwd();
const REDIRECTS: Record<string, string> = {
  "/guides/students": "/best-ai-for-students",
  "/guides/freelancers": "/best-ai-for-freelancers",
  "/guides/creators": "/best-ai-for-creators",
  "/guides/smallbusiness": "/best-ai-for-business",
};

const BLOCKED = [
  "top 5",
  "best writing",
  "higher earnings",
  "roi within",
  "5x faster",
  "50% faster",
  "unlimited graphics",
  "unlimited image",
  "200k token",
  "gpt-5.4",
  "no international card",
  "all bangladeshi payment methods",
  "30-day warranty",
  "5-30 min",
  "replit",
];

test("legacy English guide duplicates are permanent canonical redirects", async () => {
  const vercel = JSON.parse(fs.readFileSync(path.join(APP, "vercel.json"), "utf8"));
  for (const [source, destination] of Object.entries(REDIRECTS)) {
    const redirect = vercel.redirects.find((entry: { source: string }) => entry.source === source);
    expect(redirect, `missing ${source} redirect`).toBeTruthy();
    expect(redirect.destination).toBe(destination);
    expect(redirect.permanent).toBe(true);
  }
});

test("educator guide renders governed current-catalog evidence", async ({ page }) => {
  await page.goto("/guides/educators", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "AI Tools for Educators in Bangladesh" })).toBeVisible();
  await expect(page.getByText("Current-catalog educator guide")).toBeVisible();
  await expect(page.getByText("Relevant catalog options")).toBeVisible();
  await expect(page.getByRole("link", { name: "View current details" }).first()).toBeVisible();
  const main = page.getByRole("main");
  await expect(main).toHaveCount(1);
  const text = (await main.innerText()).toLowerCase();
  for (const phrase of BLOCKED) expect(text).not.toContain(phrase);
  expect(text).toContain("verify");
  expect(text).toContain("privacy");
});

test("educator crawler HTML is self-canonical and legacy guide sources leave the sitemap", async ({ request }) => {
  const response = await request.get("/guides/educators/index.html");
  expect(response.ok()).toBeTruthy();
  const html = (await response.text()).toLowerCase();
  expect(html).toContain('rel="canonical" href="https://aipremiumshop.com/guides/educators"');
  for (const phrase of BLOCKED) expect(html).not.toContain(phrase);

  const sitemapResponse = await request.get("/sitemap.xml");
  expect(sitemapResponse.ok()).toBeTruthy();
  const sitemap = await sitemapResponse.text();
  expect(sitemap).toContain("https://aipremiumshop.com/guides/educators</loc>");
  for (const source of Object.keys(REDIRECTS)) {
    expect(sitemap).not.toContain(`https://aipremiumshop.com${source}</loc>`);
  }
});
