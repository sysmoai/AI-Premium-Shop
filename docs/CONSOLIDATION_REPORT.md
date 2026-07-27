# AIPS Repository Consolidation Report

Date: 2026-07-27 · Branch: `claude/aips-repo-consolidation-q4j508`

## 1. Repository audit

| Repo | Size (working tree) | Commits | Last commit | Default branch | Role |
|---|---|---|---|---|---|
| **sysmoai/AI-Premium-Shop** | 7.8 MB | 77 | 2026-07-27 — "Definitive pricing sweep" | main | **PRIMARY** — pnpm monorepo (`artifacts/`, `lib/`, `scripts/`) |
| sysmoai/aips-website | 39 MB (19 MB is .git; ~18 MB screenshots) | 50 | 2026-07-27 — "Final BUILD_STATE" | main | Project Phoenix — Next.js 16 rebuild, deployed at https://aips-website-smoky.vercel.app/ |
| sysmoai/aipremiumshop-frontend | 3.0 MB | 4 | 2026-07-23 | main | Vite/React landing — **older fork twin of `artifacts/aips-landing`** |
| sysmoai/Aipswebsitev2 | 1.3 MB | 2 | 2026-04-09 — "Add files from Figma Make" | main | Figma Make design export (reference only) |

**Primary repo: `sysmoai/AI-Premium-Shop`** — it already had the monorepo layout and the most active history.

## 2. What was merged where

| Source | Destination in AI-Premium-Shop | Notes |
|---|---|---|
| aips-website (full source) | `artifacts/aips-website/` | node_modules/.next excluded; root debug screenshots relocated |
| aips-website root screenshots (54 PNG, ~18 MB) | `media/screenshots/` | Session/debug captures, kept for zero-loss |
| aips-website `aips-phoenix-static.tar.gz` | `media/` | Static-export snapshot |
| Aipswebsitev2 (full source) | `artifacts/figma-make-v2/` | Design reference |
| aipremiumshop-frontend (full source) | `artifacts/legacy/aipremiumshop-frontend/` | See duplicate analysis below |
| Env templates | `config/*.env.example` | No secrets committed |
| New media stack | `lib/media/` | See `lib/media/README.md` |

## 3. Duplicate analysis: aipremiumshop-frontend vs artifacts/aips-landing

These are the same app, diverged in both directions:

- `artifacts/aips-landing` is **newer** (CEO pricing sweep through 2026-07-27) — it stays canonical.
- `aipremiumshop-frontend` (last touched 2026-07-23) has files aips-landing lacks:
  `src/components/BottomSafeContext.tsx`, `CountUpValue.tsx`, `scripts/prerender-meta.mjs`, `eslint.config.mjs`, plus older versions of data/pages.
- To guarantee zero loss, the full frontend snapshot is preserved under `artifacts/legacy/`.
  **Action for a follow-up PR:** cherry-pick the frontend-only components into aips-landing if wanted, then delete `artifacts/legacy/`.

## 4. Security finding (action required)

`.env.local` (with a live `NEXTAUTH_SECRET`) was **tracked in git** at the repo root — R1 violation.
This branch untracks it and adds `.env*` ignore rules, but the secret remains in git history.

- 🔴 **Rotate `NEXTAUTH_SECRET` immediately** (and review the Supabase keys in the same file).
- Optionally scrub history with `git filter-repo` before making the repo public — never do this on a repo others have cloned without coordinating.

## 5. Media stack

`lib/media` (`@aips/media` workspace package): responsive `<picture>`/srcset images with AVIF/WebP,
IntersectionObserver lazy loading, HLS/MP4/WebM video player (lazy hls.js) with poster thumbnails,
dependency-free carousel, sharp-based optimization/conversion, EXIF metadata (GPS stripped by default),
magic-byte upload validation, svgo for SVG. CDN convention documented in `lib/media/README.md`
(`https://media.aipremiumshop.com`, `NEXT_PUBLIC_MEDIA_URL`).

## 6. What was NOT done (needs owner/admin action)

These require permissions this session does not have (repo admin, org settings, Vercel/Notion accounts):

- Granting collaborator access / verifying PATs — GitHub → repo Settings → Collaborators; PAT at github.com/settings/tokens.
- Branch protection on `main` — Settings → Branches → Add rule (require PR + status checks per R2/R4).
- Webhooks / auto-deploy — Vercel Git integration already covers deploys for aips-website; connect AI-Premium-Shop in the Vercel dashboard if desired.
- Notion connection — needs `NOTION_API_KEY` + DB IDs (see `artifacts/aips-website/NOTION_SETUP.md`); run `scripts/import-from-notion.ts` per R11.

## 7. Git history of secondary repos

File contents are fully preserved here, but **git history is not** (a subtree copy keeps files, not commits).
Do **not delete** the secondary repos — **archive** them on GitHub (Settings → General → Archive this repository).
Archiving is free, read-only, reversible, and preserves history. `scripts/archive-backup.sh` also produces
local `git bundle` + tar.gz backups if offline copies are wanted before archiving.
