# AIPS Access & Capability Report

Run date: 2026-08-02 (Asia/Dhaka)
Session role: Chat B (Repository, Production and QA Executor) — per the Notion coordinator page's multi-chat model

## Model / tool identity

- Claude Code CLI version (via `claude --version`): 2.1.220
- Actual model for this session: set via `/model claude-sonnet-5` (Claude Sonnet 5) earlier in this conversation. No other model claim should be trusted for this session's output.
- Working directory at session start: `C:\Users\emonh` (not inside a repo). AI-Premium-Shop repo located at `C:\Users\emonh\SYSmoAI-Stack\apps\AI-Premium-Shop`.

## Local system

- Git: present, functional.
- Node.js: v24.15.0.
- Package manager: pnpm (repo is a pnpm workspace; `preinstall` script hard-blocks npm/yarn).
- `gh` (GitHub CLI): authenticated as account `sysmoai`, scopes `gist, read:org, repo, workflow`.
- Python: **not available** (`python3`/`python` not found — Microsoft Store shim only). Any instruction assuming Python tooling must use Node.js instead.
- No dedicated Lighthouse/PageSpeed CLI, secret-scanner, or link-checker binary confirmed installed; used ad-hoc `git log -p | grep` for secret scanning this session (see Conflict Ledger / Current Truth for result).

## GitHub

- Repository: `sysmoai/AI-Premium-Shop`, confirmed via `git remote -v`.
- Default branch: `main`.
- Branches present at session start: `main`, `gh-pages`, `replit-agent`, `claude/aips-repo-consolidation-q4j508` (a prior session's branch, not yet reviewed in depth this session).
- **Self-correction:** an early check of `artifacts/` against a stale-cached `origin/main` ref (before this session's `git fetch`) showed only 3 subdirectories and led this session to initially (and wrongly) report `aips-website` as not existing. After fetching, current HEAD's `artifacts/` actually has 6: `aips-landing`, `aips-website`, `api-server`, `figma-make-v2`, `legacy`, `mockup-sandbox`. See `docs/AIPS_CURRENT_TRUTH.md` for the corrected, evidenced version. Recorded here as a reminder that this session itself is not immune to the stale-cache mistake it was investigating.
- Local checkout was on `gh-pages` at session start (near-empty static branch: `index.html`, `.nojekyll`, deployment docs only) — **not** representative of the real application. Switched to `main`.
- A local-only commit on `main` (`ba7cb8f`, "Deploy: AI-Premium-Shop - Production", 2026-07-27, never pushed) was a wholesale deletion of the entire application tree — almost certainly an accidental "prepare gh-pages content" operation applied to the wrong branch. **Not merged.** Preserved via tag `preserved/local-main-ba7cb8f-pre-reset` for recoverability, then local `main` was hard-reset to match verified `origin/main`.
- GitHub Actions: **billing-locked on the `sysmoai` account.** Every workflow run fails in 3-11 seconds with "The job was not started because your account is locked due to a billing issue." Confirmed via `gh run view`, affects all three workflows (`CI`, `Deploy`→Cloudflare Pages, `Deploy to GitHub Pages`). This is a pre-existing, known condition (also documented for the sibling AITP project) — not something this session caused or can fix (billing is a red-lane/CEO action).
- Two of the three workflows target **different, non-Vercel hosts** (Cloudflare Pages via `wrangler`, and GitHub Pages via `gh-pages`) despite Vercel being the actual live host (see below). Both are broken anyway (billing lock), so they are currently inert, but they misrepresent the deployment architecture to anyone reading the workflow files.
- An org-level `.github` repo (implied by the reusable-workflow reference `.github#1` seen in `gh run view` annotations, providing a `notion-drift` job) could not be inspected — `gh repo view sysmoai/.github` returned "could not resolve to a Repository." Unresolved; not blocking.

## Notion

- MCP endpoint: connected (`mcp__a3ee7350-5501-4ee0-a35b-353950071a2e__notion-*` tools). Verified via `fetch id="self"`.
- Workspace: "EMON HOSSAIN" (emon@emonhossain.pro). All Notion tools report `"status":"available"`.
- Fetched successfully this session:
  - AIPS Master Coordinator page (`3ad968d9162881adb64ec138483a782f`) — dated 2026-07-30, in full.
  - AIPS Audit Checkpoint (`40aeb22149f84330b132ba4217747f2b`) — 176,698 characters, exceeded direct-read token limit; delegated to a subagent that read it in full via chunked slicing and returned a structured summary (see Conflict Ledger for extracted facts).
- Not yet fetched this session (deferred to keep this pass small): canonical product-families DB, canonical product-plans DB, canonical solution-stacks DB, historical master subscription catalog, AIPS Hub, the v3.4 master prompt, the pricing/compliance decision package.

## Production and hosting

- DNS: `www.aipremiumshop.com` → CNAME `cname.vercel-dns.com`; apex `aipremiumshop.com` → `76.76.21.21` (Vercel). **Apex is canonical** — `www` 308-redirects to apex (confirmed via `curl -I`), the reverse of the sibling AITP project's `www`-canonical setup. Do not assume the same canonical-host convention across AIPS and AITP.
- Live homepage `Last-Modified` header exactly matches the commit timestamp of `82e5c4b` ("Remove 16 dead, stale plans[] arrays..."), confirming **Vercel deploys directly from GitHub pushes via its own Git integration**, completely bypassing the billing-locked GitHub Actions. Production is current with `main` HEAD.
- No `vercel.json` or `.vercel/` found in the repository tree — the Vercel project's build settings (framework preset, output directory, env vars) are configured entirely in the Vercel dashboard, not in-repo. This is a gap: nobody reading the repo alone can see the deploy config.
- Security headers present on live responses: CSP, HSTS (`max-age=31536000; includeSubDomains; preload`), X-Frame-Options DENY, X-Content-Type-Options nosniff, Permissions-Policy, Referrer-Policy — all reasonable.
- robots.txt and sitemap.xml both resolve live and are well-formed.

## Analytics and SEO systems

- Not checked this session (no credentials presented, no MCP for GSC/GA4/Bing/Clarity/Ahrefs/Semrush surfaced). Recorded as a missing data source per Section 5.5 — does not block technical fixes, blocks traffic-impact measurement.

## Summary judgement

Access is sufficient to do real, safe, evidenced work this session: local repo (read/write on a feature branch), GitHub (read confirmed, push not yet attempted), Notion (full read confirmed), live site (read-only via curl/DNS). Nothing in this session's scope required GREEN-LANE-prohibited or RED-LANE actions. Two RED-LANE items were discovered and are reported, not acted on: (1) a real secret in Git history requiring rotation, (2) GitHub Actions billing lock requiring an account-level fix. Both belong to the CEO/admin, per Section 6.
