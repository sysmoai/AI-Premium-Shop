import { expect, test } from "@playwright/test";

const ROUTES = [
  "/bn",
  "/students-bn",
  "/developers-bn",
  "/freelancers-bn",
  "/creators-bn",
  "/smb-bn",
  "/educators-bn",
];

const BLOCKED = [
  "৫-৩০ মিনিট",
  "৫–৩০ মিনিট",
  "5-30 min",
  "৩০ দিনের ওয়ারেন্টি",
  "30 দিনের ওয়ারেন্টি",
  "৩০ দিনের গ্যারান্টি",
  "৩ মাস সাপোর্ট",
  "৩টি মাস ওয়ারেন্টি",
  "২ মিনিটে উত্তর",
  "২৪/৭ সহায়তা",
  "সবচেয়ে সাশ্রয়ী",
  "সবচেয়ে জনপ্রিয়",
  "সর্বোত্তম মূল্য",
  "বিদেশি কার্ড লাগে না",
];

for (const route of ROUTES) {
  test(`${route} runtime has governed Bangla commercial claims`, async ({ page }) => {
    await page.goto(route, { waitUntil: "networkidle" });
    await expect(page.getByRole("main")).toHaveCount(1);
    const text = (await page.locator("body").innerText()).toLowerCase();
    for (const phrase of BLOCKED) {
      expect(text, `${route}: ${phrase}`).not.toContain(phrase.toLowerCase());
    }

    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(canonical).toBe(`https://aipremiumshop.com${route}`);
    const title = await page.title();
    expect(title.length, `${route}: title too long`).toBeLessThanOrEqual(70);
  });

  test(`${route} crawler shell is Bangla, self-canonical and free of blocked claims`, async ({ request }) => {
    const response = await request.get(`${route}/index.html`);
    expect(response.ok(), route).toBeTruthy();
    const html = await response.text();
    const lower = html.toLowerCase();
    expect((html.match(/rel="canonical"/g) ?? []).length, `${route}: canonical count`).toBe(1);
    expect((html.match(/<h1[\s>]/g) ?? []).length, `${route}: h1 count`).toBe(1);
    expect(html).toContain('lang="bn-BD"');
    for (const phrase of BLOCKED) {
      expect(lower, `${route}: ${phrase}`).not.toContain(phrase.toLowerCase());
    }
  });
}

test("/bn crawler and runtime share the governed homepage source claims", async ({ page, request }) => {
  await page.goto("/bn", { waitUntil: "networkidle" });
  const runtime = (await page.getByRole("main").innerText()).replace(/\s+/g, " ");
  const html = (await (await request.get("/bn/index.html")).text()).replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ");

  for (const claim of [
    "Payment method অর্ডার অনুযায়ী আগে নিশ্চিত করা হয়",
    "Personal label-ও universal privacy guarantee নয়",
    "Blanket refund, replacement বা warranty period ধরে নেবেন না",
  ]) {
    expect(runtime, `runtime missing: ${claim}`).toContain(claim);
    expect(html, `crawler missing: ${claim}`).toContain(claim);
  }
});
