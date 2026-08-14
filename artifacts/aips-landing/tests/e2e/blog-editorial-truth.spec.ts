import { expect, test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const APP = process.cwd();
const definitions = JSON.parse(fs.readFileSync(path.join(APP, "data/blog-guides.json"), "utf8"));
const BLOCKED = [
  "replit",
  "unlimited",
  "5-30 min",
  "5–30 min",
  "instant delivery",
  "30-day warranty",
  "pay for themselves",
  "earn in 7 days",
  "44% more",
  "gpt-5.4",
  "200k token",
  "no international card required",
];

const htmlEscape = (value: string) => value
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;");

test("all governed blog definitions are unique, concise and free of legacy claim phrases", async () => {
  expect(definitions.posts).toHaveLength(19);
  expect(new Set(definitions.posts.map((post: { slug: string }) => post.slug)).size).toBe(19);
  for (const post of definitions.posts) {
    expect(post.title.length, `${post.slug} title length`).toBeLessThanOrEqual(70);
    expect(post.description.length, `${post.slug} description length`).toBeLessThanOrEqual(170);
    expect(post.checks.length).toBeGreaterThanOrEqual(3);
    const text = JSON.stringify(post).toLowerCase();
    for (const phrase of BLOCKED) expect(text, `${post.slug}: ${phrase}`).not.toContain(phrase.toLowerCase());
  }
});

test("blog index and representative articles use the governed editorial renderer", async ({ page }) => {
  await page.goto("/blog", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "AI Guides for Bangladesh" })).toBeVisible();
  await expect(page.getByText("Verification-first editorial")).toBeVisible();
  await expect(page.getByRole("link", { name: "Read decision guide" }).first()).toBeVisible();
  await expect(page.getByRole("main")).toHaveCount(1);

  for (const route of [
    "/blog/openai-codex-vs-claude-code-bangladesh-2026",
    "/blog/ai-tools-for-freelancers-bangladesh",
    "/blog/midjourney-bangladesh-guide",
  ]) {
    await page.goto(route, { waitUntil: "networkidle" });
    await expect(page.getByText("Verification-first editorial")).toBeVisible();
    await expect(page.getByRole("heading", { name: "What to verify first" })).toBeVisible();
    await expect(page.getByRole("main")).toHaveCount(1);
    const text = (await page.locator("body").innerText()).toLowerCase();
    for (const phrase of BLOCKED) expect(text, `${route}: ${phrase}`).not.toContain(phrase.toLowerCase());
    expect(text).toContain("provider facts and aips commercial facts are different");
  }
});

test("guide index uses decision language and includes educators", async ({ page }) => {
  await page.goto("/guides", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "Choose an AI Tool by the Decision You Need to Make" })).toBeVisible();
  await expect(page.getByRole("link", { name: /Educators/ })).toHaveAttribute("href", "/guides/educators");
  const text = (await page.locator("body").innerText()).toLowerCase();
  expect(text).not.toContain("perfect ai tool");
  expect(text).not.toContain("2 minutes");
  expect(text).not.toContain("best value tier");
  expect(text).toContain("confirm current price");
});

test("all 19 blog crawler pages are self-canonical and sanitized", async ({ request }) => {
  for (const post of definitions.posts) {
    const response = await request.get(`/blog/${post.slug}/index.html`);
    expect(response.ok(), post.slug).toBeTruthy();
    const html = await response.text();
    const lower = html.toLowerCase();
    expect(html).toContain(`<title>${htmlEscape(post.title)}</title>`);
    expect(html).toContain(`rel="canonical" href="https://aipremiumshop.com/blog/${post.slug}"`);
    expect(lower).toContain('"@type":"blogposting"');
    expect(lower).toContain("separate provider facts from aips commercial facts");
    for (const phrase of BLOCKED) expect(lower, `${post.slug}: ${phrase}`).not.toContain(phrase.toLowerCase());
  }
});
