import { test, expect, type Page } from "@playwright/test";

// Covers the AI Concierge widget's client-side contract: accessibility
// (dialog semantics, focus management, keyboard), the always-visible
// credential-safety notice, and graceful degradation when the backend is
// unreachable.
//
// Deliberately does NOT exercise real model replies: `webServer` here is
// `vite preview`, which serves only the static build and has no /api/*
// serverless functions (those only run on Vercel). A POST to /api/concierge
// resolves 404 under this server, which is exactly the "backend failed"
// path this suite verifies — without spending real NVIDIA/Anthropic quota.
// Live-model behavior (retrieval, grounding, compliance rules baked into
// the system prompt) is verified separately against production; see
// docs/agent/BACKLOG.md #30.

function collectPageErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(`pageerror: ${err.message}`));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(`console.error: ${msg.text()}`);
  });
  return errors;
}

test("launcher is visible and closed by default, with an accessible name", async ({ page }) => {
  const errors = collectPageErrors(page);
  await page.goto("/", { waitUntil: "networkidle" });

  const launcher = page.getByRole("button", { name: /open ai assistant/i });
  await expect(launcher).toBeVisible();
  await expect(launcher).toHaveAttribute("aria-expanded", "false");
  await expect(page.getByRole("dialog", { name: /ai premium shop ai assistant/i })).toHaveCount(0);

  expect(errors).toEqual([]);
});

test("opens as an accessible dialog, focuses the input, and Escape returns focus to the launcher", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  // aria-controls is stable across open/close; the accessible NAME is not
  // (it flips between "Open AI assistant" and "Close AI assistant"), so a
  // name-based locator stops matching the instant the button is clicked.
  const launcher = page.locator('[aria-controls="concierge-panel"]');
  await launcher.click();

  const dialog = page.getByRole("dialog", { name: /ai premium shop ai assistant/i });
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveAttribute("aria-modal", "true");
  await expect(launcher).toHaveAttribute("aria-expanded", "true");

  const input = page.getByRole("textbox", { name: /ask the ai assistant/i });
  await expect(input).toBeFocused();

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(launcher).toBeFocused();
});

test("the PIN/OTP safety notice is always visible while the dialog is open", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: /open ai assistant/i }).click();
  await expect(page.getByText(/never share a pin or otp/i)).toBeVisible();
});

test("a failed backend call degrades gracefully: no crash, a WhatsApp fallback appears, retry is offered", async ({ page }) => {
  const errors = collectPageErrors(page);
  await page.goto("/", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: /open ai assistant/i }).click();

  const input = page.getByRole("textbox", { name: /ask the ai assistant/i });
  await input.fill("Best AI for coding?");
  await page.getByRole("button", { name: /^send$/i }).click();

  // The user's own message still renders even though the reply will fail.
  await expect(page.getByText("Best AI for coding?")).toBeVisible();

  // /api/concierge 404s under vite preview (no serverless functions locally)
  // -> the client's own error path renders, not an unhandled exception.
  const whatsappFallback = page.getByRole("link", { name: /whatsapp-এ মেসেজ করুন/i });
  await expect(whatsappFallback).toBeVisible({ timeout: 10_000 });
  await expect(whatsappFallback).toHaveAttribute("href", /^https:\/\/wa\.me\//);

  await expect(page.getByRole("button", { name: /আবার চেষ্টা করুন/i })).toBeVisible();

  // The dialog itself must still be usable afterwards -- the app did not crash.
  await expect(page.getByRole("dialog", { name: /ai premium shop ai assistant/i })).toBeVisible();

  // Chrome itself logs "Failed to load resource: ... 404" as a console.error
  // for ANY failed HTTP request -- that's the browser reporting the request
  // this test intentionally triggers, not the app doing something wrong.
  // Everything else (an uncaught exception, an app-level console.error) must
  // still be zero.
  const unexpected = errors.filter((e) => !/Failed to load resource.*404/.test(e));
  expect(unexpected, `unexpected console/page errors after a failed concierge call:\n${unexpected.join("\n")}`).toEqual([]);
});
