# Known Risks & Blockers — AI Premium Shop

**Document Last Updated:** 2026-07-31 21:30 UTC  
**Severity Levels:** P0 (blocks launch), P1 (affects 50K traffic goal), P2 (polish/scaling)

---

## P0 RISKS (BLOCKS EVERYTHING)

### R0.1: Shared-Access Legal Liability
**Risk:** 44 products claim "shared" access without documented provider authorization.

**Failure Mode:**
- OpenAI/Anthropic/Midjourney detect terms-of-service violation
- Provider terminates AIPS affiliate/reseller account
- Customers lose access; AIPS liable for refunds
- Legal action from provider

**Current Evidence:** None found in repo.

**Mitigation:**
1. Audit all 44 "shared" products vs official provider ToS
2. Document authorization (team plan links, affiliate agreements, written permission)
3. Delist any product without evidence
4. Retool as "customer-owned" (customer brings their own API key/account)

**Owner:** Emon (must provide evidence or delist)  
**Timeline:** Before any expanded deployment

---

### R0.2: Catalog Divergence
**Risk:** Two different products.json files in repo (aips-landing vs aips-website) with different schemas.

**Failure Mode:**
- Sync automation can't determine canonical source
- Deploy aips-website with stale catalog → prices don't match live site
- Customers see outdated product listings
- Search engine crawls see different data than homepage

**Current State:**
```
aips-landing/data/products.json:   129 records, 7.6KB
aips-website/src/data/products.json: Schema incompatible, 6.0KB
Both in Git → no single source of truth
```

**Mitigation:**
1. Designate canonical source (recommend aips-landing, it's live)
2. Archive or delete non-canonical copy
3. Create sync script: canonical → all other locations
4. Add pre-commit hook to prevent divergence

**Owner:** Claude (can automate), needs Emon approval  
**Timeline:** Before promoting aips-website

---

### R0.3: Frontend Architecture Decision Pending
**Risk:** Two complete implementations exist; unclear which to use for future work.

**Failure Mode:**
- Invest weeks in aips-landing SEO optimization, then Emon decides to use aips-website
- Create content for aips-website, then Emon wants aips-landing optimized
- Duplicate work across two codebases

**Current State:**
- **aips-landing:** Live on Vercel (87 products, minimal SEO)
- **aips-website:** Built locally, ready to deploy (155 pages, full SEO)
- **No documented decision** on which is canonical going forward

**Mitigation:** Emon chooses Option A (promote aips-website), B (optimize aips-landing), or C (parallel).

**Owner:** Emon  
**Timeline:** ASAP (before content/SEO work starts)

---

### R0.4: Notion Inaccessible to Claude
**Risk:** Master specification exists in Notion, but Claude CLI cannot access it.

**Failure Mode:**
- Don't know what's supposed to be in product families, plan structures, audience segments
- Can't implement data sync (Notion → repo)
- Can't verify requirements in product pages

**Current State:**
- Emon provided Notion URL: https://app.notion.com/p/3ad968d9162881e8a321e45068dbb291
- Claude cannot access URLs (no web browsing in CLI)
- Page content not pasted

**Mitigation:** Emon pastes Notion page content (or key sections: product families, plans, canonical hierarchy).

**Owner:** Emon  
**Timeline:** Before implementing Notion sync

---

## P1 RISKS (AFFECTS 50K TRAFFIC GOAL)

### R1.1: SPA Not Crawlable for SEO
**Risk:** aips-landing (Vite SPA) renders all content with JavaScript only.

**Failure Mode:**
- Google/Bing cannot crawl /products/[slug] routes independently
- No metadata per product route (all routes have same title/description)
- Even with JavaScript enabled, Googlebot may not execute Framer Motion animations
- Estimated indexable pages: <10 vs potential 150+
- Traffic plateau: likely <5K/month (vs 50K goal)

**Current Evidence:**
- Every unmatched route returns HTTP 200 + empty HTML (client renders)
- No server-side rendering for metadata
- Each product card is a React component, not a separate page in HTML

**Mitigation (if sticking with aips-landing):**
1. Static export + pre-rendering all /products/[slug] pages at build time
2. Generate unique <title>, <meta description>, JSON-LD per product
3. Vercel middleware to serve pre-rendered HTML for product routes

**OR:** Promote aips-website (Next.js SSG already does this).

**Owner:** Claude (can implement), Emon (decide architecture)  
**Timeline:** Critical path for 50K traffic goal  
**Severity:** HIGH (blocks traffic target)

---

### R1.2: No Bangla Content or Localization
**Risk:** Site is 100% English; no localized content for Bangladesh market.

**Failure Mode:**
- Users searching in Bangla (60%+ of Bangladesh searches) won't find AIPS
- Can't compete with Bangla-language alternatives
- Lost market opportunity in home country

**Current Evidence:**
- aips-landing: Zero Bangla strings (only English)
- aips-website: Has descriptionBN, useCasesBN, faqBN (not live)
- /bn landing page exists in aips-website but not deployed

**Mitigation:**
1. Create /bn landing page (Bangla hero, CTA, FAQ)
2. Translate 25 P0 product pages to Bangla
3. Create Bangla-language guides (payment methods, activation, troubleshooting)
4. Deploy Bangla blog posts

**Owner:** Claude (content generation + translation), Emon (review)  
**Timeline:** 2-3 weeks for core pages  
**Severity:** HIGH (market share in home country)

---

### R1.3: Role-Based Content Missing
**Risk:** No guidance for students, developers, designers, freelancers, etc.

**Failure Mode:**
- Users can't find "best AI for [my job]" content
- No solution stacks (e.g., "tools to launch a website with AI")
- Losing long-tail search traffic from problem-specific queries
- Estimated lost traffic: 30-40% of 50K goal (15K+ qualified visitors)

**Current Evidence:**
- aips-website has 12 audience page templates (best-ai-for-students, etc.) but NOT deployed
- aips-landing has zero audience pages

**Mitigation:**
1. Deploy aips-website OR create equivalent in aips-landing
2. Create 8-15 content pieces per audience segment
3. Link from product pages to audience pages (internal linking)
4. Create solution stacks (5-8 tools + tutorials for common workflows)

**Owner:** Claude (can generate), Emon (approve audience matrix)  
**Timeline:** 2-4 weeks after architecture decision  
**Severity:** HIGH (long-tail traffic)

---

### R1.4: No Affiliate or Provider Relationships
**Risk:** No documented affiliate programs, team-plan agreements, or official partnerships.

**Failure Mode:**
- Can't claim "official reseller" for any product
- Competitors with affiliate agreements get commission + social proof
- No incentive alignment with providers for co-marketing

**Current Evidence:**
- AGENTS.md mentions "affiliate relationships where available" but none listed
- No affiliate link strategy in codebase
- No commission tracking

**Mitigation:**
1. Identify providers with affiliate programs (most AI SaaS have them)
2. Sign up for programs (ChatGPT, Claude, GitHub Copilot, Midjourney, etc.)
3. Track affiliate performance (traffic, conversions, commission)
4. Co-market with providers

**Owner:** Emon (business development), Claude (track + report)  
**Timeline:** Ongoing, low priority  
**Severity:** MEDIUM (revenue optimization)

---

## P2 RISKS (POLISH/SCALING)

### R2.1: Analytics Dormant
**Risk:** GA4 and FB Pixel configured but IDs not provided; zero traffic data collected.

**Failure Mode:**
- Can't measure conversion funnel (views → WhatsApp clicks → orders)
- Can't optimize for ROI
- No proof of 50K traffic goal progress

**Current Evidence:**
- HANDOFF-2026-07-30.md: "Analytics is dormant — GA4 / FB Pixel have no real IDs"
- Home.tsx loads placeholders but no actual IDs

**Mitigation:**
1. Emon provides GA4 Measurement ID (from Google Analytics 4 property)
2. Emon provides FB Pixel ID (from Meta Business)
3. Claude configures both in environment variables
4. Verify events firing (WhatsApp clicks, order submissions)

**Owner:** Emon (IDs), Claude (wiring)  
**Timeline:** 1 day, before scaling  
**Severity:** LOW (doesn't block launch, but needed for optimization)

---

### R2.2: Generic Product Descriptions
**Risk:** All product pages copy generic industry descriptions; no unique AIPS value.

**Failure Mode:**
- Users can't distinguish AIPS offering from official provider site
- No SEO differentiation (search engines see duplicate content)
- No persuasive reason to buy from AIPS vs direct

**Current Evidence:**
```
ChatGPT Plus description (current):
"Budget-friendly shared ChatGPT Plus. GPT-5 series for text, code, vision, search, DALL-E, AI agent"

(This is generic—says nothing about AIPS value: affordability, local payment, fast delivery, Bangla support)
```

**Mitigation:**
1. Rewrite each product to lead with AIPS value (local payment, 5-30 min delivery, Bangla support)
2. Add use cases specific to Bangladesh market
3. Compare vs buying direct (cost, time, hassle, legal risk)
4. Add Bangla-language context

**Owner:** Claude (can generate), Emon (review)  
**Timeline:** 2-3 weeks for top 25 products  
**Severity:** MEDIUM (conversion optimization)

---

### R2.3: No Competitor Analysis
**Risk:** No documented competitive landscape or AIPS differentiation strategy.

**Failure Mode:**
- Can't position AIPS vs other AI resellers
- Can't exploit competitor gaps
- Missing market opportunity

**Current Evidence:**
- No comparison pages for alternatives
- No documented competitor list
- No differentiation statement beyond "local payment + fast delivery"

**Mitigation:**
1. List 5-10 top competitors in Bangladesh/global
2. Create comparison pages (AIPS vs Notion's official pricing, vs other local resellers)
3. Document AIPS unique selling propositions
4. Create gap-exploitation content

**Owner:** Claude (research + analysis), Emon (strategy)  
**Timeline:** 1-2 weeks, ongoing  
**Severity:** LOW (important for scaling, not launch-blocking)

---

### R2.4: No Automated Source Expiry Detection
**Risk:** If an official provider changes pricing/availability, AIPS site will show stale claims.

**Failure Mode:**
- Official ChatGPT Plus changes from $20 to $25 USD
- AIPS still claims "৳299 = 99% discount" (false)
- Legal/compliance risk

**Mitigation:**
1. Build automated script to check official provider pricing weekly
2. Alert if discrepancy detected
3. Flag stale source dates in catalog metadata
4. Require human review before publishing updates

**Owner:** Claude (can build automation)  
**Timeline:** 2-3 weeks, pre-50K traffic  
**Severity:** MEDIUM (compliance risk)

---

## SUMMARY: BLOCKERS BY PRIORITY

### Must Resolve BEFORE Expanding Content/SEO
1. **R0.1** (Shared-access legal) — Emon must provide evidence or delist 44 products
2. **R0.3** (Frontend decision) — Emon chooses aips-website promotion OR aips-landing optimization
3. **R0.4** (Notion access) — Emon pastes Notion page content

### Must Resolve BEFORE 50K Traffic Target
4. **R1.1** (SPA crawlability) — Promote aips-website OR static-export aips-landing
5. **R1.2** (Bangla content) — Create /bn landing page + top 25 product translations
6. **R1.3** (Role-based content) — Deploy audience pages + solution stacks
7. **R2.4** (Source expiry) — Implement automated freshness checks

### Nice-to-Have (Doesn't Block Launch)
8. **R1.4** (Affiliate programs) — Emon signs up for provider affiliate programs
9. **R2.1** (Analytics) — Emon provides GA4/FB Pixel IDs
10. **R2.2** (Description quality) — Rewrite product copy for AIPS differentiation
11. **R2.3** (Competitor analysis) — Document competitive landscape

---

**To unblock Stage 1 (Content & SEO work):**
Emon must provide decisions for R0.1, R0.3, R0.4.

Created: 2026-07-31 21:30 UTC

---

## SESSION 4 ADDITIONS (2026-08-02) — new risks found, existing ones unchanged unless noted

### R0.4 update: Notion is no longer inaccessible
This session connected to Notion via MCP and read the coordinator + checkpoint pages in full. R0.4 as originally written ("Claude cannot access URLs") is stale — reclassify as "Notion accessible, canonical-source decision still pending" rather than a hard access blocker.

### R0.5 (NEW): Exposed secret in Git history
`NEXTAUTH_SECRET` and a Supabase anon key were committed in `.env.local` at commit `c8ae002` (2026-07-26). Removed from the current tree but permanently retrievable from history by anyone who clones the repo. **Owner:** Emon/admin (rotate at Supabase + NextAuth config; decide separately on history rewriting). `.gitignore` was missing `.env*` entirely — fixed this session to prevent recurrence, but the existing exposure itself is unresolved.

### R0.6 (NEW): Live unsupported "3,000+ customers" claim
The production homepage meta description currently states "3,000+ customers" — an exact repeat of a claim category already corrected once (commit `d9e46cd`). Needs its actual source (static file vs. build-time generation) identified before it can be fixed durably rather than patched once and left to regress again.

### R0.7 (NEW): GitHub Actions billing lock (account-wide)
Every workflow on `sysmoai/AI-Premium-Shop` fails immediately ("account is locked due to a billing issue"). This blocks all CI-based validation (lint/typecheck/test/secret-scan gating) described as required tooling — currently the only gate is whatever is run manually, since Vercel's deploy doesn't depend on Actions passing. **Owner:** Emon (GitHub billing, account-wide — affects other `sysmoai` repos too).

### R0.8 (NEW, near-miss, already contained): dangerous local-only commit
A local `main` commit (`ba7cb8f`) that deleted the entire application tree was found never-pushed and neutralized this session (tagged, then local `main` reset to origin). No repo or production impact occurred. Recorded so no future session re-creates or cherry-picks from it by SHA without knowing what it is.
