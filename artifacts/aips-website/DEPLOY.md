# AI Premium Shop — Phoenix Rebuild Deployment Guide

## What was built

This is a complete SEO-optimized rebuild of `aipremiumshop.com` using Next.js 16 App Router.

### Key improvements over the live Vite SPA

| Feature | Live Site (Vite SPA) | Phoenix (Next.js 16) |
|---------|---------------------|----------------------|
| Page rendering | Client-side only (`<div id="root"></div>`) | Server-side + static generation |
| Unique titles per page | ❌ Same title on all 60 pages | ✅ Unique title/meta on every page |
| Canonical URLs | ❌ All point to homepage | ✅ Correct canonical per page |
| AI crawler access | ❌ Blocks ClaudeBot, GPTBot, Google-Extended | ✅ Allows all major AI crawlers |
| Structured data | ❌ None | ✅ Product, Offer, FAQPage, HowTo, Organization |
| `llms.txt` | ❌ Missing | ✅ Comprehensive GEO manifest |
| Sitemap | ❌ Basic XML | ✅ Dynamic with all 30 product pages |
| Security headers | ❌ None | ✅ HSTS, CSP, X-Frame-Options |

### Pages included

- **Homepage** (`/`) — Featured products, FAQ schema, HowTo schema
- **Products** (`/products`) — Grid of all 30 product groups
- **Product detail** (`/products/[slug]`) — 30 pages with variants, pricing, FAQ
  - ChatGPT Plus, ChatGPT Pro, ChatGPT Business, ChatGPT Go
  - Claude Pro, Claude Max, Claude Team
  - Gemini Advanced, SuperGrok, Perplexity Pro
  - Midjourney, Ideogram, Leonardo AI, Runway, HeyGen
  - ElevenLabs, Suno AI, Udio
  - GitHub Copilot, Cursor Pro, v0.dev, Replit Core
  - Notion Business, Manus AI, Otter.ai, Gamma, Writesonic
  - Student Package, Freelancer Bundle, Business Package, B2B Implementation
- **About** (`/about`) — Organization schema, E-E-A-T content
- **Contact** (`/contact`) — ContactPoint info
- **FAQ** (`/faq`) — FAQPage schema with 10 Q&As
- **Blog** (`/blog`) + blog posts (`/blog/[slug]`)
- **robots.txt** — AI-crawler friendly
- **sitemap.xml** — 40+ URLs
- **llms.txt** + **llms-full.txt** — GEO optimization

### Product data

All 56 SKUs extracted from the live site and mapped to the database schema:
- 8 categories
- 30 product pages
- 56 variants with prices, capabilities, delivery SLAs

## Build status

```bash
pnpm install
pnpm build      # ✅ Pass
pnpm lint       # ✅ 0 errors
pnpm typecheck  # ✅ Pass
```

## Current Status

- ✅ Code pushed to `https://github.com/sysmoai/aips-website`
- ✅ GitHub Pages preview live: `https://sysmoai.github.io/aips-website/`
- ✅ Static export built: `aips-phoenix-static.zip` (1.6 MB, 408 files, 47 pages)
- ⚠️ Live deployment to `aipremiumshop.com` requires Cloudflare Pages access

## Deployment options

### Option A: Cloudflare Pages — Direct Upload (FASTEST — 2 minutes)

**Project:** `aips-landing` (already exists, connected to `aipremiumshop.com`)
**Account:** `sysmoai.com@gmail.com` (Account ID: `4ca6269edabb6ad2906d70ec6845de22`)

1. Go to https://dash.cloudflare.com/4ca6269edabb6ad2906d70ec6845de22/pages/view/aips-landing
2. Click **"Create deployment"** or **"Direct Upload"**
3. Upload the file: `C:\Users\emonh\AI Premium Shop\01-phoenix-website\aips-phoenix-static.zip`
4. Set **production branch** = `main`
5. Wait 30 seconds for deployment
6. Verify at `https://aipremiumshop.com`

### Option B: Cloudflare Pages — Wrangler CLI

```bash
cd "C:\Users\emonh\AI Premium Shop\01-phoenix-website"
npm install -g wrangler
wrangler login
wrangler pages deploy dist --project-name=aips-landing
```

**Note:** The existing API token (`CLOUDFLARE_API_TOKEN`) is invalid. Use `wrangler login` for OAuth.

### Option C: GitHub Pages (Preview only)

Already live at: `https://sysmoai.github.io/aips-website/`
- Branch: `gh-pages`
- Build: Static export with `output: export`
- ⚠️ Asset paths use root-relative URLs — works for root domains, preview may have minor path issues

### Option D: Vercel

Existing project: `prj_MmnqCkLADrA0jNpt9qCIA8TLMrZa`
Team: `aipremiumshopbd-8091s`
Requires Vercel CLI auth or dashboard upload.

## Post-deployment checklist

- [ ] Verify all 30 product pages load correctly
- [ ] Check `robots.txt` allows AI crawlers
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Test schema validation on product pages
- [ ] Verify `llms.txt` is accessible at `/llms.txt`
- [ ] Set up GSC verification meta tag in `src/app/layout.tsx`
- [ ] Set up Bing verification meta tag in `src/app/layout.tsx`
- [ ] Configure `www` → apex redirect in Cloudflare DNS

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

```env
NEXT_PUBLIC_SITE_URL=https://aipremiumshop.com
NEXT_PUBLIC_WA_PRIMARY=8801865385348
```

For full functionality (optional):
```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
DATABASE_URL=
RESEND_API_KEY=
SENTRY_DSN=
```

## Live site vs Phoenix — critical fixes

### robots.txt comparison

**Live site (broken for GEO):**
```
User-agent: ClaudeBot
Disallow: /
User-agent: GPTBot
Disallow: /
User-agent: Google-Extended
Disallow: /
```

**Phoenix (GEO-optimized):**
```
User-agent: ClaudeBot
Allow: /
User-agent: GPTBot
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: PerplexityBot
Allow: /
```

### Meta tags comparison

**Live site (every page):**
```html
<title>AI Premium Shop — 56 Premium AI Tools Bangladesh | From BDT 350/mo</title>
<meta name="description" content="56 premium AI tools...">
<link rel="canonical" href="https://aipremiumshop.com/">
```

**Phoenix (product page example):**
```html
<title>ChatGPT Plus in Bangladesh — Buy at Best Price | AI Premium Shop</title>
<meta name="description" content="Buy ChatGPT Plus in Bangladesh...">
<link rel="canonical" href="https://aipremiumshop.com/products/chatgpt-plus-bangladesh">
```

## Next steps after deployment

1. **Content depth** — Expand product pages to 1500+ words with BD-specific use cases
2. **Blog cluster** — Create 30+ blog posts targeting commercial + informational intent
3. **Bangla pages** — Add `bn-BD` hreflang variants
4. **Reviews** — Integrate real customer reviews into Product schema
5. **IndexNow** — Automate Bing/Yandex submission on every deploy
6. **GSC integration** — Automate URL inspection and indexing requests

## Contact

Built by AIPS-DOMINATOR SEO Engine for EMON HOSSAIN.
Repository: `/c/Users/emonh/AI Premium Shop/01-phoenix-website/`
