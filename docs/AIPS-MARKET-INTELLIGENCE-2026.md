# AIPS MARKET INTELLIGENCE & GROWTH MASTER DOCUMENT
**Version 1.0 — 2026-07-30 — compiled by Claude Fable 5 (AI CEO session)**

**Method note (read first):** Everything in §1–§4 is measured from our own repository, catalog and live site. §5–§7 combine our catalog data with the master-prompt provider universe and general market knowledge. §6 competitor names come from live web search today (sources listed) — their traffic numbers are NOT publicly verifiable without Similarweb/Ahrefs access, so none are invented here. §8's traffic math is a model, labeled as such. Where a number needs a tool we don't have, it says so.

---

## §1 DEPLOYMENT CONTINUITY — THE VERCEL LIMITATION, SOLVED IN LAYERS

**The limit (measured today):** Vercel Hobby (free) allows ~100 deployments/day. We hit it (`api-deployments-free-per-day`, HTTP 402) after 69+ commits from two parallel sessions — because **every commit deployed, including docs-only commits**.

**Layer 1 — shipped now (free):** `ignoreCommand` added to `artifacts/aips-landing/vercel.json`: builds are skipped when nothing under the app directory changed. COORDINATION.md checkpoints, docs/ commits, and root-level changes stop consuming builds. Takes effect from the first successful deploy after the quota resets.

**Layer 2 — process discipline (free, both sessions):** batch doc commits with their code commits; never push twice in ten minutes when once will do; the deploy log in COORDINATION.md is the shared budget.

**Layer 3 — the real fix (needs Emon, ~$20/mo):** Vercel Pro. 100/day is a hobby ceiling; a commercial operation that deploys continuously needs the paid tier. One blocked hotfix on a broken revenue page (today's /pricing) costs more than a month of Pro.

**Layer 4 — contingency (documented, NOT recommended now):** Cloudflare Pages / Netlify free tiers could mirror the static build. But the domain, redirects, headers and SPA rewrite live in Vercel config, and this repo's history includes a domain-detach outage. Migration is a planned project with CEO sign-off, not a workaround.

**What is NOT a solution:** burning quota with retries (tested today — hard 402), or manual CLI deploys (counts against the same limit).

---

## §2 WHAT WE HAVE — THE MEASURED PRODUCT UNIVERSE (126 records, live)

**By category (live catalog):** ai-assistant, ai-image, ai-video, ai-voice-music, ai-code, ai-workspace, ai-writing, ai-design, bundles — all with live category hubs.

**By provider family (live):**
- **OpenAI:** ChatGPT Plans hub, Plus (3 tiers), Go, Business (3 tiers), Pro
- **Anthropic:** Claude Pro/Shared/Max 5x/Max 20x/Team (6 records)
- **Google:** AI Pro (Shared/Personal), AI Ultra (request-price), AI Studio setup
- **Microsoft/GitHub:** Copilot Pro, M365 Copilot (request-price), GitHub Copilot
- **Agents:** Manus (base + Pro + Team), Perplexity, SuperGrok
- **Video:** Higgsfield, Runway, Kling, HeyGen, Synthesia, Pika, Luma, CapCut, Descript, OpusClip, Riverside, Veed, Pictory, InVideo-class tools
- **Image/design:** Midjourney, Firefly, Canva, Ideogram, Leonardo, Freepik, remove.bg
- **Voice/music:** ElevenLabs, Murf, Suno, Udio
- **Code:** GitHub Copilot, Cursor, Windsurf, Replit, v0
- **Writing:** Grammarly, QuillBot, Jasper, Writesonic, Wordtune, Copy.ai
- **Workspace:** Notion (3 forms), Gamma, Otter, Tome, ClickUp, Monday, Airtable
- **APIs/dev-services:** DeepSeek API setup, Qwen/Model Studio setup, NVIDIA-backed services
- **Ops/marketing services:** Zapier/Make/n8n automation, Mailchimp, Hootsuite, Buffer, Semrush, Surfer, HubSpot, Intercom, Tidio, Chatbase, Looker dashboards
- **Bundles:** Student, Freelancer, Business, B2B implementation

**Access models in production:** fixed-price (CEO-owned prices), request-price (8 records — provider pricing volatile), API-setup services, bundles. All three surfaces (cards, pages, WhatsApp) read one canonical record; JSON-LD never fabricates offers.

## §3 THE WORLD UNIVERSE — WHAT WE DON'T YET SELL, DEMAND-TIERED FOR BD

Tiering = BD demand logic: payment-pain × global adoption × earning-relevance for our segments. (Formal 100-point scoring per master prompt §10 lives with each future record.)

**TIER 1 — add next (high BD demand, clear seller fit):**
- OpenAI **Sora** standalone access (video hype leader; part of ChatGPT tiers — document which tier includes it rather than a fake standalone SKU)
- **NotebookLM Plus** angle (inside Google AI plans — content exists, needs a dedicated landing/guide)
- **CapCut Pro** ✓ have; **Filmora AI**, **InVideo AI** — F-commerce video demand
- **Kimi (Moonshot)**, **GLM/Z.ai**, **MiniMax/Hailuo** — free/cheap China assistants: education content first, API setup service second
- **Fal.ai / Replicate / Together / OpenRouter credits setup** — freelance devs increasingly asked to run open models; same API-setup service model as DeepSeek
- **Poe** (multi-model on one sub — direct answer to "which one do I buy?")

**TIER 2 — content-first (educate now, sell when demand shows in WhatsApp):**
Mistral Le Chat Pro, Cohere, Stability, Recraft, Photoroom, Krea, Magnific, PlayHT, Speechify, AssemblyAI/Deepgram (dev), Fireflies/Fathom (meetings), Beautiful.ai, Sana, Lindy/Relay/Gumloop (agents), Cline/Roo/Continue (free coding agents — education content, drives API-setup sales)

**TIER 3 — enterprise/infra (request-price only, no consumer content):**
Bedrock, Vertex, Azure AI Foundry, watsonx, OCI, NIM/NeMo, Databricks, Snowflake Cortex, SiliconFlow — sell as consulting/setup engagements via B2B implementation SKU.

**TIER 4 — regional watchlist (named queues, master prompt §8):**
KR (Naver HyperCLOVA X, Kakao), JP (Softbank/NTT models, Sakana), IN (Sarvam, Krutrim), MENA (Falcon, ALLaM), plus sovereign-AI launches. Watch, don't build.

---

## §4 SEGMENTATION — 14 GROUPS, MEASURED AGAINST LIVE PAGES

Every group below already has a live landing surface (verified in today's 148-URL sweep). This table is the one-page map of need → pain → product → content → WhatsApp angle.

| Segment | Core need | Sharpest pain | Lead products | Live surfaces |
|---|---|---|---|---|
| University students | Study help, thesis, exam prep | Can't afford + can't pay intl | ChatGPT Shared 499, Google AI Pro 599 (NotebookLM!), Student Bundle | /best-ai-for-students, /guides/students, students article |
| Freelancers (writing/VA) | Faster delivery, better English | Client-grade quality on a budget | ChatGPT, Claude Pro, Grammarly | /best-ai-for-freelancers, /guides/freelancers, freelancing articles |
| Freelance designers | Client visuals | Midjourney has no free tier | Midjourney, Canva, Ideogram, Leonardo | /best-ai-for-designers |
| Video creators | Shorts/Reels output | Rendering skills + tool cost | Higgsfield, CapCut, Runway, ElevenLabs, Suno | /best-ai-for-creators, Higgsfield article |
| Developers | Coding speed, API access | API billing needs intl card | Copilot, Cursor, DeepSeek/Qwen API setup | /best-ai-for-developers, /ai-code |
| F-commerce sellers | Product content, ads | No studio, no design skill | Canva, Higgsfield UGC, CapCut, remove.bg | /best-ai-for-ecommerce |
| Marketers/agencies | Volume content, SEO | Multi-tool cost stack | Jasper, Semrush, Surfer, ChatGPT Business | /best-ai-for-marketers, /smb |
| SMB owners | Automation, docs | Don't know what to buy | M365 Copilot, Notion, Zapier setups, Business Bundle | /guides/smallbusiness, /best-ai-for-business |
| Educators/coaching | Materials, grading | Bangla content generation | ChatGPT, Gamma, Canva, NotebookLM | /guides/educators |
| Job seekers | CV, interview prep | English polish | ChatGPT, Grammarly, Claude | /best-ai-for-job-seekers |
| Researchers | Papers, citations | Access + synthesis | Claude Pro (long docs), Perplexity, Elicit, Scholarcy | catalog + students guide |
| Content writers (Bangla) | Local-language content | Most AI weak in Bangla | ChatGPT, Gemini (strongest Bangla), QuillBot | blog Bangla-first articles |
| Corporate teams | Seats, admin, privacy | Procurement + compliance | Claude Team, ChatGPT Business, M365 Copilot, named seats | request-price + B2B SKU |
| New AI users (mass) | "What is this? Is it safe?" | Fear of scams, confusion | Free education → cheapest shared tier | scam guide, no-card guide, /how-to-order |

**Consumer behavior notes (BD-specific, from our own site data patterns + market logic):**
1. **Payment trust is the conversion moment.** The buyer's fear is not price — it's "will this vanish after I pay?" Hence: scam guide, no-PIN/OTP messaging, own-account activation, written process. Every trust element is a conversion asset.
2. **bKash-first mental model.** People search "X bkash diye" — payment-method keywords convert far better than tool keywords.
3. **Price anchoring in BDT.** "৳499" reads as one meal out; "$20" reads as luxury. Always lead in BDT.
4. **Shared-tier entry, personal-tier upgrade.** The ladder: cheap shared trial → personal account once value is felt → team seats for businesses. Catalog already models this ladder.
5. **Earning intent dominates.** The most emotionally-charged searches are "AI diye income" variants. Earning guides are the top-of-funnel; tools are the mid-funnel; WhatsApp is the close.
6. **Bangla builds trust; English carries precision.** Mixed-language content (as our articles do) matches how the audience actually reads.

---

## §5 TRENDS & EARNING-OPPORTUNITY MAP (mid-2026)

**Trend lines that matter to us:** agentic AI going mainstream (Manus-class) — buyers need credit-economics education, we're first with it locally; AI video quality crossing the ad-usable threshold (Higgsfield/Kling/Veo) — F-commerce demand compounding; China models free/cheap (DeepSeek/Kimi/Qwen) — the free-tier educated user becomes an API-setup customer; multi-model fatigue ("which one?") — comparison content + Poe-style bundles win; provider price volatility increasing — our request-price model is the durable answer.

**Earning-opportunity map (each = article + product pairing; conservative, no income promises):**
| Service a BD person can sell | Tools (our SKUs) | Buyer |
|---|---|---|
| AI ad videos for local shops | Higgsfield, CapCut | F-commerce pages |
| Voice-over (Bangla/English) | ElevenLabs, Murf | YouTubers, agencies |
| SEO content packages | ChatGPT/Claude, Surfer | Businesses, agencies |
| Chatbot setup for pages | Chatbase, Tidio, ManyChat-class | Local businesses |
| Automation builds | Zapier/Make/n8n setups | SMBs |
| CV/LinkedIn makeovers | ChatGPT, Grammarly | Job seekers |
| Thesis formatting/research aid | Claude, Perplexity, Zotero setup | Students (ethically bounded) |
| Product photography replacement | Midjourney, Photoroom, remove.bg | E-commerce |

---

## §6 COMPETITOR LANDSCAPE (verified today via web search — sources below)

Active BD competitors selling the same category: **Big Premiums** (bigpremiums.com — wide catalog, fast-delivery claims), **BD Subscription** (bdsubscription.com — full ChatGPT tier coverage), **StreamGo BD** (streamgobd.com — streaming+AI mix), **Digivate IT** (digivateit.com), **Subscriptions BD** (subscriptionsbd.net — oldest presence, review count visible), **Ullu Subscription BD** (ullusubscriptionbd.com — entertainment-led), **OneBrain** (onebrain.app — different model: one multi-model app at ৳799, our only *product* competitor rather than reseller competitor).

**What the field does that we now beat:** thin product pages (we have 126 structured records + schema), no honest risk content (our scam/no-card guides are unique in the niche as of today's search), price-only messaging (we sell process + trust), no request-price honesty (they print stale prices).
**What they have that we lack:** age in the index (older domains rank on history), visible review volume (Subscriptions BD shows 240+ reviews — real social proof we cannot fake and must EARN: post-delivery review collection is a future CEO project), payment-gateway checkout on some (we are WhatsApp-first by design).
**Traffic reality check:** none of their organic numbers are publicly verifiable without Similarweb/Ahrefs; treat any figure you see quoted as marketing. Our own baseline comes only from Search Console once Emon connects it.

Sources: bigpremiums.com, bdsubscription.com, streamgobd.com, digivateit.com, subscriptionsbd.net, ullusubscriptionbd.com, onebrain.app (all surfaced in live search 2026-07-30).

---

## §7 THE 50K ORGANIC ROADMAP — MODEL, NOT PROMISE

**The math (labeled as model):** 50K monthly visits ≈ 1,650/day. Achievable shape: ~40 pages averaging 40 visits/day (rank 3–8 on mid-volume BD queries) + 2–3 pages at 200+/day (rank 1–3 on head terms like "chatgpt price in bangladesh"). We have 149 indexed URLs; the model needs roughly double the current *content* depth plus index age.

**The plan by quarter:**
- **Now (done):** 15/15 mandatory cluster + trust pillars + full technical SEO (canonicals, schema, sitemap, noindex, 148-page render audit).
- **Q3-2026 (next 8 weeks):** per-segment earning articles (8 from §5 map), 5 comparison pages (Higgsfield vs Kling vs Runway; Poe vs individual subs; DeepSeek vs GPT API cost; Gemini vs ChatGPT for Bangla; Copilot vs Cursor), Bangla-first variants of the 5 top transactional guides. Cadence: 2–3/week, quality-gated.
- **Q4-2026:** refresh cycle (provider prices/plans change → every refresh is a lastmod signal), review-collection program (CEO), YouTube/Shorts derivatives of top articles (social → search flywheel).
- **Continuous:** WhatsApp question log → new FAQ/articles (real demand signal we already own).

**Dependencies only Emon can unlock:** Google Search Console (10 min — without it we fly blind on which queries win), Vercel Pro (deploy continuity), review collection consent flow (real social proof), optional Ahrefs/Similarweb subscription (competitor truth).

---

## §8 GAP REGISTER (brutal, current, all known gaps in one place)

1. **/pricing blank on live** — fixed in `6a6656d`, deploys on quota reset. (Only known live defect.)
2. **Google AI Pro price drift** — brand copy 499 vs catalog 599/2990. CEO decision pending.
3. **11 slugs with diverging sibling plans arrays** — first-record-wins staleness risk; mechanical reconciliation queued (validator warns).
4. **Governance fields absent** (commercialStatus/verificationDate per record) — schema exists in validator warnings; population is bulk work, low user-visible value, scheduled after content push.
5. **9 records carry dead fabricated reviewCount data** — not rendered anywhere (verified); cleanup cosmetic.
6. **No Search Console** — cannot see real queries (Emon).
7. **No real reviews** — competitors have them; we must earn them (CEO program).
8. **Brand-page hand-written price strings** — last unvalidated price surface (validator extension queued).
9. **Entry chunk 827 kB** — perf lever, needs framer-motion deferral refactor (pre-existing, non-urgent, FCP 3.0s).
10. **Notion control pages unreachable** — no MCP/token (Emon, if still wanted).

*Everything else claimed done above was verified live today — 148-URL browser sweep, 2026-07-30.*
