import { expect, test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const APP = process.cwd();

test("editorial index crawler shells match governed runtime intent", async ({ request }) => {
  const blogResponse = await request.get("/blog/index.html");
  expect(blogResponse.ok()).toBeTruthy();
  const blogHtml = await blogResponse.text();
  expect(blogHtml).toContain("<h1>AI Guides for Bangladesh</h1>");
  expect(blogHtml).toContain("Verification-first");
  expect(blogHtml).toContain("/blog/openai-codex-vs-claude-code-bangladesh-2026");
  expect(blogHtml).not.toContain("Replit");
  expect(blogHtml).not.toContain("pay for themselves");
  expect(blogHtml.length).toBeGreaterThan(12000);

  const guidesResponse = await request.get("/guides/index.html");
  expect(guidesResponse.ok()).toBeTruthy();
  const guidesHtml = await guidesResponse.text();
  expect(guidesHtml).toContain("<h1>Choose an AI Tool by the Decision You Need to Make</h1>");
  expect(guidesHtml).toContain("Confirm current price, access model, availability");
  expect(guidesHtml).toContain('href="/guides/educators"');
  expect(guidesHtml).not.toContain("Free guides to help you pick");
  expect(guidesHtml).not.toContain("local payment methods");
  expect(guidesHtml.length).toBeGreaterThan(9000);
});

test("SEO warning policy uses the final sitemap for indexability", async () => {
  const checker = fs.readFileSync(path.join(APP, "scripts/seo-check.mjs"), "utf8");
  expect(checker).toContain("indexableRoutes");
  expect(checker).toContain("isIndexable && title.length > 70");
  expect(checker).toContain("isIndexable && text.length < 600");
  expect(checker).toContain("isIndexable && /\\bunlimited\\b/i.test(sentence)");

  const sitemap = fs.readFileSync(path.join(APP, "dist/public/sitemap.xml"), "utf8");
  expect(sitemap).not.toContain("/plans/");
  expect(sitemap).not.toContain("/guides/students</loc>");
  expect(sitemap).toContain("/guides/educators</loc>");
});
