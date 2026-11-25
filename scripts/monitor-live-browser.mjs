#!/usr/bin/env node
// Real-browser half of the live monitor. The curl checks read the prerendered
// HTML, but browsers that run JS hide that shell until React renders (see
// docs/performance/page-load-flash.md). If React fails, customers get a blank
// page while curl still sees correct content. Read-only: loads pages, clicks
// nothing, sends nothing.
import { appendFileSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(new URL("../artifacts/aips-landing/package.json", import.meta.url));
const { chromium } = require("@playwright/test");

const SITE = (process.env.SITE_URL ?? "https://aipremiumshop.com").replace(/\/$/, "");
const WHATSAPP = "https://wa.me/8801865385348";
const ROUTES = ["/", "/pricing", "/products", "/bn", "/chatgpt-plus-bangladesh", "/product/higgsfield-ai-bangladesh", "/contact", "/how-to-order", "/blog"];

const flagFile = new URL("../artifacts/aips-landing/src/lib/conciergeAvailability.ts", import.meta.url);
const flag = readFileSync(flagFile, "utf8").match(/CONCIERGE_AI_ENABLED: boolean = (true|false);/)?.[1];
if (!flag) throw new Error("CONCIERGE_AI_ENABLED not found");

async function check(browser, route) {
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  const problems = [];
  page.on("pageerror", (e) => problems.push(`uncaught error: ${e.message.slice(0, 160)}`));
  try {
    const res = await page.goto(SITE + route, { waitUntil: "load", timeout: 30_000 });
    if (res?.status() !== 200) problems.push(`HTTP ${res?.status()}`);
    await page.locator("#root h1:visible").first().waitFor({ timeout: 15_000 })
      .catch(() => problems.push("no visible heading: the page did not render"));
    await page.locator(`a[href^="${WHATSAPP}"]:visible`).first().waitFor({ timeout: 15_000 })
      .catch(() => problems.push("no visible WhatsApp link"));
    const assistants = await page.locator('[aria-controls="concierge-panel"]').count();
    if (flag === "false" && assistants) problems.push("AI assistant is offered although it is switched off");
  } catch (e) {
    problems.push(`did not load: ${e.message.split("\n")[0].slice(0, 160)}`);
  } finally {
    await page.close();
  }
  return problems;
}

const browser = await chromium.launch();
const failures = [];
// Parallel, so a fully broken site still reports well inside the job timeout.
await Promise.all(ROUTES.map(async (route) => {
  let problems = await check(browser, route);
  // One retry, so a single dropped connection does not open an issue.
  if (problems.length) problems = await check(browser, route);
  console.log(`${problems.length ? "FAIL" : "ok  "} ${route} ${problems.join("; ")}`);
  if (problems.length) failures.push(`- \`${route}\` in a real browser: ${problems.join("; ")}`);
}));
await browser.close();

if (failures.length) {
  if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `failures<<MONITOR_EOF\n${failures.join("\n")}\nMONITOR_EOF\n`);
  process.exit(1);
}
console.log("All browser checks passed.");
