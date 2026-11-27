import { expect, test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

// A product with a validated guide (data/product-guides.json) shows long-form
// content, published BDT prices and an FAQ, in both the app and the crawler HTML.
const ROUTE = "/product/cartesia-bangladesh";
const guides = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data/product-guides.json"), "utf8")).guides;
const guide = guides["cartesia-bangladesh"];
const commercial = JSON.parse(fs.readFileSync(path.join(process.cwd(), "../../ops/ssot/commercial.json"), "utf8"));
const approvedMethods: string[] = commercial.public_claim_policy.payment.approved_public_methods;

const BLOCKED = [
  "warranty", "guarantee", "instant delivery", "instant access", "official reseller", "authorized reseller",
  "authentic subscription", "no international card", "best value", "trusted by", "rocket", "bank transfer", "upay",
];

test("guided product page shows plans, prices, guide sections and FAQ", async ({ page }) => {
  await page.goto(ROUTE, { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { level: 1, name: "Cartesia" })).toBeVisible();
  const guideRoot = page.getByTestId("product-guide");
  await expect(guideRoot).toBeVisible();

  for (const price of ["৳990", "৳8,290", "৳50,190"]) await expect(guideRoot.getByText(price).first()).toBeVisible();
  for (const section of guide.sections) await expect(guideRoot.getByRole("heading", { level: 2, name: section.heading })).toBeVisible();

  const first = guideRoot.locator("details").first();
  await expect(guideRoot.locator("details")).toHaveCount(guide.faq.length);
  await first.locator("summary").click();
  await expect(first.locator("p")).toBeVisible();

  const text = (await page.getByRole("main").innerText()).toLowerCase();
  for (const phrase of BLOCKED) expect(text, phrase).not.toContain(phrase);
  for (const method of approvedMethods) expect(text).toContain(method.toLowerCase());
  expect(text).toContain("not affiliated with or endorsed by cartesia");
  expect(await page.locator('a[href^="https://wa.me/8801865385348"]').count()).toBeGreaterThan(0);
});

test("guided product crawler HTML carries the guide, FAQ schema and no blocked claims", async ({ request }) => {
  const response = await request.get(`${ROUTE}/index.html`);
  expect(response.ok()).toBeTruthy();
  const raw = await response.text();
  const html = raw.toLowerCase();

  expect(raw).toContain(`<title>${guide.seoTitle}</title>`);
  expect(html).toContain('rel="canonical" href="https://aipremiumshop.com/product/cartesia-bangladesh"');
  expect((raw.match(/<h1[\s>]/g) ?? []).length).toBe(1);
  for (const price of ["bdt 990", "bdt 8,290", "bdt 50,190"]) expect(html).toContain(price);
  expect(html).toContain("before payment");

  const blocks = [...raw.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
  const faq = blocks.find((block) => block["@type"] === "FAQPage");
  expect(faq).toBeTruthy();
  expect(faq.mainEntity).toHaveLength(guide.faq.length);
  expect(faq.mainEntity[0].name).toBe(guide.faq[0].q);
  expect(html).not.toContain('"availability":"https://schema.org/instock"');
  expect(html).not.toContain("aggregaterating");
  for (const phrase of BLOCKED) expect(html, phrase).not.toContain(phrase);
});

test("a product without a guide keeps the generic page with no FAQ", async ({ page }) => {
  await page.goto("/product/copy-ai-pro-bangladesh", { waitUntil: "networkidle" });
  await expect(page.getByTestId("product-guide")).toHaveCount(0);
});
