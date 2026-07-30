# Architectural Decisions — AI Premium Shop

**Status:** ⏸️ **THREE CRITICAL DECISIONS PENDING EMON APPROVAL**

---

## DECISION 1: FRONTEND ARCHITECTURE (Blocks all content/SEO work)

**Question:** Should we promote aips-website (Next.js) to production, or continue optimizing aips-landing (Vite SPA)?

### Current State
- **LIVE:** aips-landing (Vite React SPA on Vercel)
  - 87 products, homepage only
  - Prices verified and correct
  - Client-side rendering only (no server-side HTML)
  - SEO limited: ~10 indexable pages

- **READY:** aips-website (Next.js 16 with App Router on Vercel)
  - 155 pre-rendered static pages
  - Bangla content, product pages, categories, comparisons, blogs
  - Full SEO structure
  - Complete AGENTS.md documentation
  - Manual 2-min Cloudflare deployment ready (no code changes needed)

### Options

#### A: PROMOTE aips-website to production (RECOMMENDED)
- **Action:** Emon clicks "Deploy" in Cloudflare Pages dashboard (2 min)
- **Rollback:** Available (1-click in Cloudflare)
- **Impact:** 
  - +150 crawlable pages (vs 10 now)
  - Bangla content goes live
  - Proper site structure for SEO
  - 50K qualified monthly visitor potential
- **Timeline:** Immediate (2 min deploy, then content expansion)
- **Risk:** Low (rollback available, tested build)

#### B: OPTIMIZE aips-landing (aips-landing stays live)
- **Action:** Build static export, meta generation, per-route crawlability
- **Impact:**
  - ~30-50 new indexable pages
  - Some SEO improvement
  - Keeps current Vercel setup
- **Timeline:** 2-3 weeks of engineering
- **Risk:** High (SPA limitations mean indexability will plateau)
- **Outcome:** Still inferior to aips-website (Option A)

#### C: PARALLEL RUN (Both live temporarily)
- **Action:** Deploy aips-website to production, keep aips-landing as rollback
- **Duration:** 1-2 weeks for monitoring
- **Risk:** Duplicate content (both at aipremiumshop.com), DNS confusion
- **Outcome:** Eventually need to pick one (reverts to A or B)

### DECISION NEEDED
**Which option should Claude proceed with?**
- [ ] A (promote aips-website — recommended)
- [ ] B (optimize aips-landing)
- [ ] C (parallel run, then pick)
- [ ] Other: _______________

---

## DECISION 2: SHARED-ACCESS AUTHORIZATION (Blocks catalog publication)

**Question:** Which 44 "shared" products have current legal authorization from providers?

### Current Risk
- **Count:** 44 products marked accessType="shared"
- **Problem:** No documentation showing provider authorization
- **Legal exposure:** ToS violations on most platforms prohibit credential sharing
- **Examples:**
  ```
  ChatGPT Plus Starter Shared    (OpenAI — does their ToS allow sharing?)
  Claude Pro Shared             (Anthropic — official family-sharing plan exists)
  Midjourney Shared             (Midjourney — team plan exists, but "shared" ≠ team)
  Notion Business Shared        (Notion — multi-seat plans exist)
  ```

### Required Evidence
For each shared-access product, provide ONE of:
1. **Official team/family/seat plan link** (e.g., Anthropic's Claude family plan documentation)
2. **Provider written authorization email** (explicit permission to resell seat access)
3. **Screenshot of official sharing policy** (provider docs allow account sharing)
4. **Affiliate agreement** (official reseller program)

### Action Required
Emon must either:
1. **Provide authorization evidence** for 44 products (doc/email/screenshot per product)
2. **Delist products without evidence** (change accessType from "shared" to "personal" or remove)
3. **Switch to customer-owned accounts** (customers provide their own OpenAI account, AIPS manages billing/access)

### Consequence of Inaction
- Cannot publish catalog to production without verification
- Validator will HARD-FAIL on any deployed products without evidence
- Risk: ToS violations, provider account termination, legal liability

### DECISION NEEDED
**How should AIPS handle shared-access products?**
- [ ] Provide authorization evidence (please list)
- [ ] Delist/reclass without evidence
- [ ] Switch to customer-owned accounts (customer provides their API key or account)
- [ ] Mix (some with evidence, some delisted)
- [ ] Other: _______________

---

## DECISION 3: LMARENA DATA USAGE (Blocks "model performance" content)

**Question:** What claims can AIPS make about LMArena leaderboard rankings?

### Current Issue
- LMArena is a **performance-intelligence dataset**, not an endorsement
- Must not claim: "ranked #1 so buy it", "higher score = better for you", "we recommend based on rankings"
- Must show: arena, category, publication date, score, confidence, methodology

### Safe Usage (Allowed)
```
✅ "On LMArena's reasoning arena (latest), Claude 3.5 Sonnet ranks #2 
   with 93.2 Elo (vs GPT-4o's 93.4). Reasoning ability matters for complex problem-solving."

❌ "Our data shows Claude is the best AI tool — buy it."
❌ "GPT-4 ranks higher so it must be better for your business."
❌ "LMArena endorses these products."
```

### Content Guidelines (LMArena Must Appear As)
1. **Reference point only** ("for benchmarking, LMArena shows...")
2. **One signal among many** (speed, cost, privacy, features, support also matter)
3. **Methodology-aware** (mention arena, category, date, confidence, observation count)
4. **Never predictive** (don't claim a score guarantees user success)
5. **Always linked** (always link to official LMArena page + publication date)

### What Data to Ingest
```
Required:
- Latest leaderboard (all arenas)
- Publication date per arena
- Model names, aliases, organizations
- Elo scores with confidence intervals
- Observation counts

Optional:
- Historical snapshots (trending analysis)
- Per-model methodology documentation
- Arena-specific category breakdowns
```

### DECISION NEEDED
**Approve LMArena usage guidelines?**
- [ ] Yes, use as reference signal only (no predictive claims)
- [ ] No, don't mention LMArena
- [ ] Custom rules: _______________

---

## DECISION 4: PRODUCT CONTENT STRATEGY (Blocks page creation)

**Question:** Should Claude create content for multiple audience segments?

### Current Gaps
- **Generic descriptions:** All products have 1-2 sentence descriptions (no unique value)
- **No audience pages:** No content for students, developers, designers, freelancers, etc.
- **No Bangla guides:** No translated product pages or localized tutorials
- **No solution stacks:** No "how to launch a website with AI" or "how to build a brand" guides

### Proposed Content Matrix

| Segment | Best-selling products | Content type | Est. pages | Timeline |
|---------|---|---|---|---|
| Students | ChatGPT Plus, Claude Pro, Perplexity | Academic writing, research, coding | 8 | 1 week |
| Developers | GitHub Copilot, Claude Pro, Cursor | Code generation, debugging, learning | 12 | 1.5 weeks |
| Designers | Midjourney, Ideogram, Canva | Image generation, design system, mockups | 10 | 1 week |
| Freelancers | ChatGPT, Claude, Runway, CapCut | Proposal writing, content creation, editing | 12 | 1.5 weeks |
| Creators | Suno, ElevenLabs, Runway, CapCut | Music, voice, video, thumbnails | 10 | 1 week |
| Researchers | Perplexity, Claude, ChatGPT | Literature review, analysis, synthesis | 8 | 1 week |
| Bangladeshi Context | All | Payment methods, legal, timing, alternatives | 15 | 2 weeks |

### DECISION NEEDED
**Approve content strategy?**
- [ ] Yes, create 65-page content expansion (Bangla + audience-specific)
- [ ] No, stick to product pages only
- [ ] Partial: _______________

---

## DECISION 5: NOTION AS CANONICAL (Blocked without access)

**Question:** Is Notion the single source of truth for product/plan definitions?

### Current State
- **Emon provided Notion URL** but Claude cannot access it (no web browsing)
- **Two catalogs in repo** (aips-landing vs aips-website)
- **No documented sync process** from Notion → repo

### Required for This Decision
1. **Paste Notion page content** (or key sections: product families, plans, canonical hierarchy)
2. **Clarify sync authority:** Should Notion be authoritative?
3. **Document sync method:** Notion → products.json → code (or vice versa?)

### DECISION NEEDED
**What is the canonical product/plan source?**
- [ ] Notion (user pastes page content)
- [ ] artifacts/aips-landing/data/products.json (already in use)
- [ ] artifacts/aips-website/src/data/products.json
- [ ] Hybrid (describe)
- [ ] Other: _______________

---

## SUMMARY TABLE

| Decision | Blocker | Required By | Approval Gate |
|----------|---------|----------|---|
| 1. Frontend arch (aips-website promotion) | Content/SEO work | Before expanded deployment | Emon ("promote" or "optimize" or "parallel") |
| 2. Shared-access auth (44 products) | Catalog publication | Before any sync automation | Emon (evidence per product or delist) |
| 3. LMArena usage (reference-only rules) | Model content | Before leaderboard pages | Emon (approve guidelines or custom) |
| 4. Content strategy (Bangla + audiences) | Page volume | Before expansion sprint | Emon (approved matrix or custom) |
| 5. Notion access (canonical product source) | Data sync automation | Before Notion-first sync | Emon (paste Notion page or clarify source) |

---

**To proceed:** Emon must provide decisions + any Notion page content. Claude will NOT proceed with content/deployment work until blockers are resolved.

Created: 2026-07-31 21:30 UTC
