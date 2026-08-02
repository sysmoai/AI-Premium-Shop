# 365+ Blog Roadmap — AI Premium Shop

Goal: scale from 18 posts to 365+, organized so every post slots into the
taxonomy in `artifacts/aips-landing/src/lib/blogTaxonomy.ts` (also used live
by the Navbar Blog mega-menu, the footer, and the `/blog` category filter —
so this roadmap and the site's navigation can never drift apart).

## Why this structure

Each of the 10 categories below maps to one real customer segment or intent
from the Notion SEO & AIO Keyword Universe and Problem Library. A post
without a category is a post nobody can browse to — every title below is
pre-assigned one.

## Cadence to reach 365 in 12 months

- **1 post/day average** = 365/year. Realistic split: 5 posts/week from a
  written brief (this roadmap), rotated across categories so no single
  category dumps 30 posts in one week and starves the others.
- Every post needs: a target keyword (BN/Banglish/EN — see Notion Keyword
  Universe for exact phrasing), one comparison table or price table where
  relevant, 3-5 internal links (to relevant product/category pages — the
  BlogPostPage/prerender pattern already supports this), and one WhatsApp CTA.
- **Reuse the machine, not just the words**: `scripts/prerender-products.mjs`
  already parses blog metadata from `BlogPostPage.tsx`'s `ALL_POSTS_META` at
  build time — add a post there (and to `BlogPage.tsx`'s `POSTS` array with a
  `categoryKey`) and it is automatically: listed on `/blog`, filterable by
  category, included in the sitemap-coverage build, and prerendered to static
  HTML. No script changes needed to scale past 18.

## Category quotas (365 total, weighted by real search volume)

| Category | Target | Rationale |
|---|---|---|
| 🧠 AI Assistants | 70 | Highest search volume — ChatGPT/Claude/Gemini/Grok BD queries dominate the Keyword Universe |
| 🎬 Image & Video AI | 55 | Second-highest — Midjourney, Runway, HeyGen, CapCut, growing fast |
| 💻 AI for Developers | 40 | Copilot, Cursor — smaller volume but highest-intent, highest-value customers |
| 🎵 Voice & Music AI | 30 | ElevenLabs, Suno — creator-segment growth category |
| 🤖 AI Agents | 25 | Manus and the agentic shift — 2026's fastest-growing search cluster |
| 💳 Payments & Access | 35 | The #1 documented pain (no international card) — every new tool needs its own "how to pay" post |
| 🛡 Safety & Scams | 20 | Trust-building content; also ranks well and is highly shareable |
| 🎓 For Students | 35 | Second-largest segment after freelancers |
| 💼 For Freelancers | 35 | Largest segment by transaction volume |
| 💡 Strategy & Comparisons | 20 | Evergreen "vs" and "best of" content, high backlink potential |

## Per-category topic banks (first 90 days, ~90 posts)

### 🧠 AI Assistants (18 for Q1)
Price-in-Bangladesh posts for every assistant not yet covered: Gemini 3
Advanced, Grok 4 SuperGrok, DeepSeek, Le Chat Pro, Poe, You.com, Monica,
NotebookLM. Comparison posts: ChatGPT vs Gemini, Claude vs Gemini, Grok vs
ChatGPT, "5 best AI assistants for BD businesses 2026". Use-case posts:
"ChatGPT for Bangla content", "Claude for legal drafting BD", "Gemini for
Google Workspace users in BD".

### 🎬 Image & Video AI (14 for Q1)
Ideogram, Leonardo, Kling AI, Freepik AI, Pika, D-ID, Vidu, Hailuo price
posts. "Midjourney vs Ideogram for BD e-commerce photos", "How to make a
product video with CapCut + Runway", "AI thumbnail generators compared".

### 💻 AI for Developers (10 for Q1)
Cursor, Windsurf, v0.dev, Replit AI, Tabnine, JetBrains AI, Devin price/setup
posts. "GitHub Copilot vs Cursor for BD freelance devs", "Best AI pair
programmer for Upwork developers".

### 🎵 Voice & Music AI (8 for Q1)
Murf, Udio, PlayHT, Speechify BD price posts. "ElevenLabs vs Murf for
Bangla-accented English voiceovers", "AI music for YouTube without copyright
strikes".

### 🤖 AI Agents (6 for Q1)
"What is Manus, explained for beginners", "Manus vs ChatGPT Agent mode",
"Building your first AI agent workflow — no code".

### 💳 Payments & Access (10 for Q1)
One post per major new-tool addition from this cycle's catalog work (Ahrefs,
Figma, Coursera Plus, etc.): "How to pay for X from Bangladesh". Plus:
"bKash vs Nagad vs Rocket for AI subscriptions — which is faster",
"Binance/crypto payment for AI tools — is it worth it".

### 🛡 Safety & Scams (6 for Q1)
"How to verify an AI subscription reseller is real", "What happens if a
shared ChatGPT account gets banned", "Reading a WhatsApp seller's replies —
red flags checklist v2".

### 🎓 For Students (9 for Q1)
Per-university or per-subject angles: "AI tools for medical students BD",
"AI for engineering thesis writing", "Best free + paid AI stack for HSC/SSC
prep", "NotebookLM for exam revision".

### 💼 For Freelancers (9 for Q1)
Per-platform: "AI tools that win more Upwork proposals", "Fiverr gig
descriptions with Claude", "Client research with Perplexity before a
pitch", "Invoicing + AI bookkeeping for BD freelancers".

### 💡 Strategy & Comparisons (5 for Q1)
"The 2026 BD AI tool stack by budget: ৳500 / ৳2,000 / ৳5,000 tiers",
"Shared vs Personal — a full cost/privacy breakdown", "How much do
Bangladeshi freelancers actually save using AI in 2026".

## Publishing checklist per post (enforced by the same validators already in CI)

1. Title states the real, current price if transactional — pull from
   `products.json`/`catalogStats`, never type a number by hand
   ([[aips-pricing-invariant]]).
2. Add to `BlogPostPage.tsx` `ALL_POSTS_META` + full content map, and to
   `BlogPage.tsx` `POSTS` with a `categoryKey` from `blogTaxonomy.ts`.
3. Add the URL to `public/sitemap.xml`.
4. Run `node scripts/validate-catalog.mjs` and `pnpm run build` — the build's
   prerender step will fail loudly if the sitemap and static output disagree
   (fallback sweep only masks genuinely new route classes, not typos).
5. 3-5 internal links to real product/category/persona pages.
6. One WhatsApp CTA with a slug-specific message.

## Explicitly out of scope for AI-generated bulk content

Do not mass-generate 300 posts from templates with find/replace — thin,
near-duplicate content is a Google Helpful Content Update target and would
undo the crawlability work already shipped. Every post needs a distinct
angle, not just a swapped tool name. Batch by category, write for the
specific pain, and let the roadmap's quotas — not a script — set the pace.
