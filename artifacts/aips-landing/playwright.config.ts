import { defineConfig, devices } from "@playwright/test";

// Smoke-tests the BUILT app in a real browser -- see BLOCKERS.md B9. Every
// other gate in this repo (build, seo:check, audit-prerender, the live-site
// monitor) inspects HTML text without ever executing the React app, so a
// hook-order crash that emptied #root on every page shipped to production
// undetected in 2026-08-06 (it passed all of them). This is the only check
// that would have caught it: load the real bundle, assert #root actually has
// rendered children, and fail on any console error.
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: `http://localhost:${process.env.PORT ?? "4173"}`,
    trace: "retain-on-failure",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: {
    // Serves the already-built dist/public -- run `pnpm run build` first.
    // Does NOT build here: this suite runs after the build step everywhere
    // it's wired in (CI, the pre-push hook), and re-building inside the test
    // runner would double the cost of every run for no benefit.
    command: `vite preview --config vite.config.ts --port ${process.env.PORT ?? "4173"} --strictPort`,
    port: Number(process.env.PORT ?? "4173"),
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
});
