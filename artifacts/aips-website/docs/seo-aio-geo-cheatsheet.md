# SEO / AIO / GEO Mastery Cheatsheet 2025–2026

> **Last Updated:** 2026-05-20  
> **Scope:** Technical SEO, AI Overviews (AIO), Generative Engine Optimization (GEO), Local SEO for Bangladesh, Bangla-language SEO, and E-commerce structured data.  
> **Use this as:** A living reference for developers, content strategists, and SEO leads.

---

## Table of Contents
1. [Executive Summary: Top 20 Actionable Items](#1-executive-summary-top-20-actionable-items)
2. [Technical SEO Checklist](#2-technical-seo-checklist)
3. [AIO / GEO Specific Tactics](#3-aio--geo-specific-tactics)
4. [Schema.org Templates](#4-schemaorg-templates)
5. [Core Web Vitals Targets & Measurement](#5-core-web-vitals-targets--measurement)
6. [LLM Crawler Best Practices](#6-llm-crawler-best-practices)
7. [IndexNow Protocol Implementation](#7-indexnow-protocol-implementation)
8. [llms.txt & llms-full.txt Specifications](#8-llmstxt--llms-fulltxt-specifications)
9. [Local SEO for Bangladesh Market](#9-local-seo-for-bangladesh-market)
10. [Bangla SEO & Hreflang Best Practices](#10-bangla-seo--hreflang-best-practices)
11. [E-E-A-T Signals for AI-Generated Search Results](#11-e-e-a-t-signals-for-ai-generated-search-results)
12. [Source Links](#12-source-links)

---

## 1. Executive Summary: Top 20 Actionable Items

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| 1 | **Lead every page with a 40–70 word direct answer** to the primary query. | AIO/GEO citation | Low |
| 2 | **Implement JSON-LD Product + Organization + FAQ schema** on every product page. | Rich snippets + AI citation | Medium |
| 3 | **Pass all three Core Web Vitals** (LCP ≤2.5s, INP ≤200ms, CLS ≤0.1). | Ranking tiebreaker | Medium |
| 4 | **Allow GPTBot, ClaudeBot, PerplexityBot** in `robots.txt` for visibility. | AI indexing | Low |
| 5 | **Create `/llms.txt`** with a curated markdown index of key site content. | GEO discoverability | Low |
| 6 | **Add `llms-full.txt`** with full documentation/content for AI context windows. | GEO completeness | Medium |
| 7 | **Implement IndexNow** via Bing Webmaster Tools + CMS automation. | Faster indexing | Low |
| 8 | **Use `bn-BD` hreflang tags** for Bangla content; self-reference + x-default. | Local ranking | Low |
| 9 | **Build E-E-A-T signals:** author bios, credentials, case studies, review responses. | Trust + AI citation | Medium |
| 10 | **Structure content with H2/H3 question headings, lists, and tables.** | AI extraction | Low |
| 11 | **Optimize GBP (Google Business Profile)** with NAP consistency, photos, posts. | Local pack visibility | Low |
| 12 | **Get listed on BD directories** (BD Yellow Pages, Bikroy, AjkerDeal) with matching NAP. | Local citations | Medium |
| 13 | **Use `fetchpriority="high"` on hero/LCP images** and serve WebP/AVIF. | LCP improvement | Low |
| 14 | **Defer non-critical JS** and audit third-party scripts for INP. | INP improvement | Medium |
| 15 | **Publish original research, data, or expert commentary** to earn AI citations. | Authority building | High |
| 16 | **Add FAQ schema to service & product pages** with real on-page Q&A. | Rich results + AIO | Low |
| 17 | **Monitor AI citations** with tools like Wellows, Profound, or Superprompt. | Competitive intel | Low |
| 18 | **Build topical clusters** (pillar + supporting articles) with strong internal linking. | Topical authority | High |
| 19 | **Encode all Bangla content in UTF-8**; use clean Unicode URLs or romanized slugs. | Crawlability | Low |
| 20 | **Keep content fresh:** update publish dates, statistics, and prices quarterly. | Recency signal | Medium |

---

## 2. Technical SEO Checklist

### Crawl & Index
- [ ] `robots.txt` is accessible, valid, and explicitly allows AI crawlers (see §6).
- [ ] XML sitemap submitted to Google Search Console + Bing Webmaster Tools.
- [ ] Canonical tags are self-referencing and consistent across language variants.
- [ ] No index bloat: remove thin pages, tag archives, or parameterized URLs.
- [ ] Implement IndexNow (see §7) for real-time search engine notification.

### Site Architecture
- [ ] Flat URL structure: key pages ≤3 clicks from homepage.
- [ ] Breadcrumb navigation with BreadcrumbList schema.
- [ ] HTTPS sitewide; HSTS enabled.
- [ ] Mobile-first responsive design (Google indexes mobile version).

### Performance
- [ ] LCP ≤ 2.5s (see §5 for full CWV targets).
- [ ] INP ≤ 200ms.
- [ ] CLS ≤ 0.1.
- [ ] TTFB ≤ 600ms (ideal) or ≤ 800ms (acceptable).
- [ ] Images: WebP/AVIF, lazy-loaded below fold, explicit width/height attributes.
- [ ] JS: defer non-critical scripts, remove unused libraries, code-split bundles.

### Structured Data
- [ ] JSON-LD used exclusively (Google’s preferred format).
- [ ] Validate every page with [Google Rich Results Test](https://search.google.com/test/rich-results) and [Schema.org Validator](https://validator.schema.org/).
- [ ] No invisible or misleading markup (penalty risk).

---

## 3. AIO / GEO Specific Tactics

### 3.1 Google AI Overviews Optimization

> **Key Insight:** 97–99.5% of AI Overview sources come from the top 10–20 organic results. Traditional SEO remains the foundation of AIO visibility. [Source: SeoClarity, Whitehat-SEO]

**Content Structure for AIO:**
- **Direct Answer First:** Place the answer within the first 50–70 words.
- **Use Lists & Tables:** 40–61% of AI Overviews contain bullet points or step-by-step instructions.
- **Question-Based Headings:** H2/H3 should mirror actual user queries.
- **Holistic Coverage:** Answer the main question + related sub-questions in one page.
- **Freshness:** Update content dates and statistics regularly; AI favors current sources.

**Tone & Quality:**
- Neutral, factual, verifiable tone.
- Avoid promotional language or speculative claims.
- Cite sources inline for statistics.

### 3.2 Getting Cited by ChatGPT, Perplexity, Gemini & Claude

> **Key Insight:** Branded mentions have a stronger correlation with AI visibility than backlinks (r = 0.664). [Source: Ahrefs 2025]

| Platform | Citation Preference |
|----------|---------------------|
| **ChatGPT** | Conversational, comprehensive, long-form content with clear structure. |
| **Perplexity** | Fresh, news-worthy content with strong social proof; prefers inline citations. |
| **Claude** | Well-sourced, analytical content with clear reasoning chains; technical accuracy. |
| **Gemini** | Structured data-rich pages, entity-connected content, Google ecosystem integration. |

**GEO Content Formula:**
1. **Pillar + Cluster:** Build comprehensive topic clusters with internal linking.
2. **40–60 Word Blocks:** Break insights into snippet-extractable chunks.
3. **Schema Markup:** Article, FAQ, Organization, and HowTo schemas are essential.
4. **Entity Richness:** Clearly identify people, organizations, products, and concepts.
5. **Temporal Signals:** Include `datePublished`, `dateModified`, and version numbers.

> **Key Insight:** AI-referred traffic converts 4.4× better than traditional organic, with session values up to $4.56 (Claude). [Source: Superprompt, AllAboutAI]

---

## 4. Schema.org Templates

### 4.1 Product Schema (E-Commerce)

```json
{
  "@context": "https://schema.org/",
  "@type": "Product",
  "@id": "https://example.com/products/ai-toolkit#product",
  "name": "AI Premium Toolkit Pro",
  "image": [
    "https://example.com/images/ai-toolkit-1.webp",
    "https://example.com/images/ai-toolkit-2.webp"
  ],
  "description": "Complete AI tools suite for Bangladeshi entrepreneurs and developers. Includes ChatGPT prompts, automation scripts, and video courses.",
  "sku": "APT-PRO-2026",
  "gtin13": "1234567890123",
  "brand": {
    "@type": "Brand",
    "name": "AI Premium Shop"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://example.com/products/ai-toolkit",
    "priceCurrency": "BDT",
    "price": "4999.00",
    "priceValidUntil": "2026-12-31",
    "itemCondition": "https://schema.org/NewCondition",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "AI Premium Shop"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "127"
  },
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Rahim K." },
      "reviewRating": { "@type": "Rating", "ratingValue": "5" },
      "reviewBody": "Excellent toolkit for beginners in Dhaka."
    }
  ]
}
```

### 4.2 FAQPage Schema

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is included in the AI Premium Toolkit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The AI Premium Toolkit includes 500+ ChatGPT prompts, automation scripts for Python and n8n, Midjourney prompt guides, and exclusive video tutorials in Bangla and English."
      }
    },
    {
      "@type": "Question",
      "name": "How do I access the toolkit after purchase?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "After purchase, you will receive an instant download link via email. All files are hosted on our secure cloud storage with lifetime access."
      }
    }
  ]
}
```

### 4.3 HowTo Schema

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Set Up ChatGPT for Your Business in Bangladesh",
  "description": "A step-by-step guide to integrating ChatGPT into your Bangladeshi business workflow.",
  "totalTime": "PT30M",
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "BDT",
    "value": "0"
  },
  "supply": [
    { "@type": "HowToSupply", "name": "OpenAI account" },
    { "@type": "HowToSupply", "name": "Business email" }
  ],
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Create an OpenAI Account",
      "text": "Visit chat.openai.com and sign up using your business email address.",
      "url": "https://example.com/guides/chatgpt-setup#step1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Upgrade to ChatGPT Plus",
      "text": "Subscribe to ChatGPT Plus for $20/month to access GPT-4 and web browsing features.",
      "url": "https://example.com/guides/chatgpt-setup#step2"
    }
  ]
}
```

### 4.4 Organization Schema

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://example.com/#organization",
  "name": "AI Premium Shop",
  "url": "https://example.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://example.com/logo.png",
    "width": 512,
    "height": 512
  },
  "description": "Bangladesh's leading AI tools and digital products marketplace.",
  "sameAs": [
    "https://www.facebook.com/aipremiumshop",
    "https://www.linkedin.com/company/aipremiumshop",
    "https://www.youtube.com/@aipremiumshop"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+880-1XXX-XXXXXX",
    "contactType": "customer service",
    "areaServed": "BD",
    "availableLanguage": ["English", "Bengali"]
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Mirpur Road",
    "addressLocality": "Dhaka",
    "addressCountry": "BD"
  }
}
```

### 4.5 Article / BlogPosting Schema

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "10 Best AI Tools for Bangladeshi Freelancers in 2026",
  "description": "A curated list of AI tools that help Bangladeshi freelancers earn more and work faster.",
  "image": "https://example.com/images/ai-tools-bangladesh.webp",
  "author": {
    "@type": "Person",
    "name": "Emon Hossain",
    "url": "https://example.com/authors/emon-hossain",
    "sameAs": ["https://linkedin.com/in/emonhossain"]
  },
  "publisher": {
    "@id": "https://example.com/#organization"
  },
  "datePublished": "2026-05-15",
  "dateModified": "2026-05-20",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://example.com/blog/ai-tools-bangladesh"
  }
}
```

---

## 5. Core Web Vitals Targets & Measurement

### 5.1 Thresholds (2025–2026)

> Google has maintained the same thresholds since INP replaced FID in March 2024. [Source: Google Search Central, Web.dev]

| Metric | Measures | Good | Needs Improvement | Poor |
|--------|----------|------|-------------------|------|
| **LCP** (Largest Contentful Paint) | Loading performance | ≤ 2.5s | 2.5s – 4.0s | > 4.0s |
| **INP** (Interaction to Next Paint) | Responsiveness | ≤ 200ms | 200ms – 500ms | > 500ms |
| **CLS** (Cumulative Layout Shift) | Visual stability | ≤ 0.1 | 0.1 – 0.25 | > 0.25 |

**Important:** Metrics are evaluated at the **75th percentile** of real-user data (CrUX). Lab data (Lighthouse) helps debug; field data drives rankings.

### 5.2 Benchmarks

- Only **33–54.6%** of mobile pages pass all three CWV. [Source: HTTP Archive 2025, BrightEdge 2026]
- Sites failing CWV lose **8–35%** of organic traffic compared to compliant competitors. [Source: Various 2025 studies]
- INP is now the hardest metric to pass for heavy JS sites (e.g., Shopify, WordPress with page builders).

### 5.3 Quick Fixes

| Metric | Common Cause | Fix |
|--------|--------------|-----|
| LCP | Unoptimized hero image | WebP/AVIF, `fetchpriority="high"`, preload |
| LCP | Slow TTFB | CDN, edge caching, NVMe hosting, PHP 8.3+ |
| INP | Heavy JavaScript | Defer third-party scripts, code-split, <50ms tasks |
| INP | Large DOM | Reduce nodes to <1,500 |
| CLS | Images without dimensions | Add explicit `width` + `height` |
| CLS | Web font reflow | `font-display: swap`, preload fonts |

### 5.4 Measurement Tools
- [Google PageSpeed Insights](https://pagespeed.web.dev/) (lab + field)
- [Chrome UX Report (CrUX)](https://developer.chrome.com/docs/crux)
- [WebPageTest](https://www.webpagetest.org/)
- Google Search Console → Core Web Vitals report

---

## 6. LLM Crawler Best Practices

### 6.1 Major AI Crawlers (2025–2026)

| Crawler | Organization | User-Agent |
|---------|-------------|------------|
| GPTBot | OpenAI (ChatGPT) | `GPTBot` |
| OAI-SearchBot | OpenAI | `OAI-SearchBot` |
| ChatGPT-User | OpenAI | `ChatGPT-User` |
| ClaudeBot | Anthropic | `ClaudeBot` / `Claude-Web` |
| Claude-User | Anthropic | `Claude-User` |
| PerplexityBot | Perplexity AI | `PerplexityBot` |
| Perplexity-User | Perplexity AI | `Perplexity-User` |
| Google-Extended | Google (Gemini/Bard) | `Google-Extended` |
| CCBot | Common Crawl | `CCBot` |
| Bytespider | ByteDance | `Bytespider` |

### 6.2 Recommended robots.txt

```
# --- Traditional Search Engines ---
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

# --- AI Crawlers: ALLOW for visibility ---
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

User-agent: Google-Extended
Allow: /

# --- Optional: Block training crawlers only ---
# User-agent: GPTBot
# Disallow: /

# Sitemaps
Sitemap: https://yourdomain.com/sitemap.xml
```

### 6.3 Important Caveats
- **PerplexityBot compliance issues:** Cloudflare documented instances where Perplexity used undeclared bots with rotating user-agents and IPs to bypass blocks. [Source: Cloudflare 2025, Metricus]
- **Not all crawlers respect robots.txt.** Use WAF rules, rate limiting, and IP-based blocking for aggressive scrapers.
- **Publish IP ranges:** OpenAI publishes GPTBot IPs at `openai.com/gptbot.json`; Anthropic at `claude.com/crawling/bots.json`.

---

## 7. IndexNow Protocol Implementation

### 7.1 What is IndexNow?
IndexNow is a protocol that lets you proactively notify search engines (Bing, Yandex, Seznam.cz, Naver) about new, updated, or deleted content—instead of waiting for crawlers. **Google does NOT support IndexNow for general web pages.** [Source: Bing Webmaster Tools, RightBlogger]

### 7.2 Implementation Steps

1. **Generate an API key**
   - Visit [Bing Webmaster Tools IndexNow](https://www.bing.com/indexnow) or generate a random 32-character hex string.

2. **Host the key file**
   - Save it as `{your-key}.txt` in your site root.
   - Must be accessible at `https://yourdomain.com/{your-key}.txt`.

3. **Submit URLs**
   - **Single URL (GET):**
     ```
     https://api.indexnow.org/indexnow?url=https://yourdomain.com/page&key=YOUR_KEY&keyLocation=https://yourdomain.com/YOUR_KEY.txt
     ```
   - **Bulk URL (POST):** Up to 10,000 URLs per request.
     ```json
     {
       "host": "yourdomain.com",
       "key": "YOUR_KEY",
       "keyLocation": "https://yourdomain.com/YOUR_KEY.txt",
       "urlList": [
         "https://yourdomain.com/page1",
         "https://yourdomain.com/page2"
       ]
     }
     ```

4. **CMS Integration**
   - **WordPress:** Yoast SEO and Rank Math have built-in IndexNow toggles.
   - **Custom CMS:** Add a webhook on publish/update events to fire the API call.

5. **Monitor**
   - Check Bing Webmaster Tools → IndexNow section for submission logs.

---

## 8. llms.txt & llms-full.txt Specifications

### 8.1 What is llms.txt?

`llms.txt` is a proposed standard—a markdown file at `yoursite.com/llms.txt` that provides AI systems with a curated, low-noise overview of your site's key content. It improves AI summarization accuracy and reduces hallucinations. Adoption is currently ~2.13% of sites but growing rapidly. [Source: Digital Strategy Force, Webscraft]

### 8.2 llms.txt Format

```markdown
# AI Premium Shop
> Bangladesh's leading marketplace for AI tools, ChatGPT prompts, automation scripts, and digital products for entrepreneurs and developers.

## Products
- [AI Toolkit Pro](https://example.com/products/ai-toolkit): 500+ prompts, n8n automations, and video courses. Price: BDT 4,999.
- [Midjourney Mastery Guide](https://example.com/products/midjourney): Bangla-language guide to AI image generation. Price: BDT 1,499.

## Resources
- [Blog](https://example.com/blog): AI tutorials, SEO guides, and Bangladesh business tips.
- [Free Prompt Library](https://example.com/free-prompts): 100+ free ChatGPT prompts for freelancers.

## Support
- [Contact Us](https://example.com/contact): Email, WhatsApp, and phone support in Bangla and English.
- [FAQ](https://example.com/faq): Common questions about purchases, refunds, and downloads.
```

**Rules:**
- Must be served as `text/plain; charset=UTF-8` or `text/markdown`.
- Keep under **10KB** for optimal processing.
- Use `#` for H1, `##` for H2, `>` for summary blockquote.
- Localize: if your site is Bangla, write `llms.txt` in Bangla.

### 8.3 llms-full.txt Format

`llms-full.txt` contains the **complete** content/documentation (not just links). Use it when your total documentation is <100KB.

```markdown
# AI Premium Shop — Full Documentation
> Complete product catalog and documentation.

## Product: AI Toolkit Pro
The AI Toolkit Pro includes ...
[full description, specs, pricing]

## Product: Midjourney Mastery Guide
...
```

**Hybrid Strategy:** Provide both files. AI tools can choose based on context-window needs. [Source: HITL SEO, Heeya]

### 8.4 Deployment

| Platform | How |
|----------|-----|
| Next.js / Astro / Hugo | Drop in `public/` or `static/` folder |
| WordPress | Use "Website LLMs.txt" plugin or upload via FTP |
| Nginx | Place in root directory; verify MIME type |

**Verification:**
```bash
curl -I https://yourdomain.com/llms.txt
# Expect: Content-Type: text/plain; charset=UTF-8
```

**Optional link tag:**
```html
<link rel="llms-txt" href="/llms.txt" type="text/plain" />
```

---

## 9. Local SEO for Bangladesh Market

### 9.1 Google Business Profile (GBP) Optimization
- Claim and verify your GBP at [business.google.com](https://business.google.com).
- **NAP Consistency:** Name, Address, Phone must match exactly across all listings.
- Categories: Choose primary + secondary categories precisely.
- Photos: Upload high-quality images of products, storefront, team, and events.
- Posts: Publish weekly updates/offers (Google favors active profiles).
- Reviews: Request reviews from customers; **respond to every review** (positive and negative).

### 9.2 Local Citations & Directories
Submit to Bangladeshi directories with **identical NAP**:
- BD Yellow Pages
- Bikroy.com
- AjkerDeal.com
- Local Facebook business groups/pages
- Bangladesh trade directories

### 9.3 Local Keywords & Content
- Target "near me" + service + location (e.g., "AI tools shop in Dhaka", "ChatGPT course in Bangladesh").
- Create location-specific pages or blog posts:
  - "Best AI Tools for Freelancers in Dhaka"
  - "How to Use ChatGPT for E-commerce in Bangladesh"
- Use Bangla + English mixed keywords (common search behavior in BD).

### 9.4 Mobile Optimization
- ~80%+ of Bangladeshi users browse on mobile.
- Ensure responsive design, fast loading, and easy tap targets.
- Support bKash, Nagad, and Rocket payment mentions (local trust signals).

### 9.5 Social Media & Reviews
- Facebook is the dominant discovery platform in Bangladesh.
- Maintain an active Facebook Business Page linked to your website.
- Encourage check-ins and tags.

---

## 10. Bangla SEO & Hreflang Best Practices

### 10.1 Character Encoding
- **Always use UTF-8** for Bangla content.
- Set in HTML: `<meta charset="UTF-8">`.
- Verify server sends `Content-Type: text/html; charset=UTF-8`.

### 10.2 URL Structure
- **Option A (Romanized):** `/blog/ai-shiksha-bangladesh` — SEO-friendly, easy to share.
- **Option B (Unicode Bangla):** `/blog/বাংলাদেশে-এআই-শিক্ষা` — culturally authentic, but may cause encoding issues in some tools.
- **Recommendation:** Use romanized URLs for broad compatibility; ensure content is fully in Bangla.

### 10.3 Hreflang Implementation

```html
<!-- In <head> of English page -->
<link rel="alternate" hreflang="en"
      href="https://example.com/en/products/ai-toolkit" />
<link rel="alternate" hreflang="bn-BD"
      href="https://example.com/bn/products/ai-toolkit" />
<link rel="alternate" hreflang="x-default"
      href="https://example.com/en/products/ai-toolkit" />
```

```html
<!-- In <head> of Bangla page -->
<link rel="alternate" hreflang="bn-BD"
      href="https://example.com/bn/products/ai-toolkit" />
<link rel="alternate" hreflang="en"
      href="https://example.com/en/products/ai-toolkit" />
<link rel="alternate" hreflang="x-default"
      href="https://example.com/en/products/ai-toolkit" />
```

**Bangla Hreflang Codes:**
| Code | Meaning |
|------|---------|
| `bn` | Bangla (generic) |
| `bn-BD` | Bangla — Bangladesh |
| `bn-IN` | Bangla — India (West Bengal) |

**Best Practices:**
- Always include **self-referencing** hreflang.
- Add **x-default** for unmatched users.
- Use **absolute URLs** with correct protocol.
- Ensure bidirectional linking: every language variant links to every other variant.
- Validate with Google Search Console → International Targeting.

### 10.4 Bangla Structured Data
- Use Bangla text inside schema properties (name, description, reviewBody) for Bangla pages.
- Keep `@context` and `@type` values in English (they are vocabulary terms).

### 10.5 Bangla Content Strategy
- Translate headlines, body text, meta tags, URLs, and **image alt tags**.
- Adapt content to local culture, not just literal translation.
- Build backlinks from Bangla-language websites and influencers.
- Leverage Bangla social media: Facebook, YouTube (huge in BD), LinkedIn.

---

## 11. E-E-A-T Signals for AI-Generated Search Results

### 11.1 The Four Pillars

| Pillar | What It Means | On-Page Signals | Off-Page Signals |
|--------|---------------|-----------------|------------------|
| **Experience** | First-hand knowledge | Case studies, before/after metrics, screenshots, "In my testing..." language | Guest posts sharing real experiences, podcast interviews |
| **Expertise** | Subject knowledge | Degrees, certifications, detailed author bios, deep content | Citations in academic papers, speaking engagements |
| **Authoritativeness** | Recognized go-to source | Comprehensive topical coverage, original research | Quality backlinks, brand mentions, media references |
| **Trustworthiness** | Accuracy, transparency, safety | HTTPS, clear contact info, privacy policy, review responses, accurate data | Positive reviews, BBB/directory ratings, consistent NAP |

### 11.2 Critical E-E-A-T Actions for 2026

1. **Author Pages:** Every byline links to a dedicated author page with photo, bio, credentials, social links, and article portfolio.
2. **Schema Connections:** Use `sameAs` in Person/Organization schema to link to LinkedIn, Twitter/X, Wikipedia, Wikidata.
3. **"Who, How, Why" Framework:** Explain who wrote it, how they are qualified, and why the content exists (user-help vs. search manipulation).
4. **Original Research:** Publish surveys, data studies, benchmarks—AI engines cite these heavily because they are unique.
5. **Review Responses:** Respond to ALL reviews on Google, Facebook, and industry platforms. Activity signals legitimacy.
6. **Entity SEO:** Connect your brand to known entities in Google's Knowledge Graph via `sameAs`, consistent naming, and authoritative references.
7. **Content Updates:** Regularly refresh articles with new data, dates, and insights. Stale content loses AI citation trust.

> **Key Insight:** Google's September 2025 Search Quality Rater Guidelines (181 pages) state that Trust is the most important member of the E-E-A-T family. YMYL pages with absolutely no creator information should receive the "Lowest" rating. [Source: Whitehat-SEO, Keywords Everywhere]

---

## 12. Source Links

### Google AI Overviews & AIO
- [Evergreen Media — Google AI Overviews Guide 2025](https://www.evergreen.media/en/guide/google-ai-overviews/)
- [Whitehat SEO — SEO Predictions 2025-2026](https://whitehat-seo.co.uk/blog/seo-predictions)
- [Wellows — 12 Key Strategies for AI Overviews 2026](https://wellows.com/blog/ai-overviews-optimization/)
- [Webscraft — Google December 2025 Core Update](https://webscraft.org/blog/google-december-2025-core-update-haos-trivaye-scho-chekaye-seo-u-2026?lang=en)

### GEO / ChatGPT / Perplexity / Claude / Gemini Citations
- [Launchmind — How to Get Cited in ChatGPT, Claude, Perplexity 2025](https://launchmind.io/blog/how-to-get-cited-in-chatgpt-claude-and-perplexity-your-complete-2025-guide-mnv014yc/)
- [Wellows — Perplexity Search Visibility Tips 2025](https://wellows.com/blog/perplexity-search-visibility-tips/)
- [Pixelmojo — GEO Playbook 2026](https://www.pixelmojo.io/blogs/geo-playbook-get-cited-chatgpt-perplexity-claude)
- [SEO for Service — Rank in ChatGPT, Perplexity, Gemini, Claude 2025](https://seoforservice.com/rank-chatgpt-perplexity-gemini-claude-guide/)
- [AllAboutAI — How to Rank High in LLMs 2025](https://www.allaboutai.com/ai-how-to/rank-high-in-llms/)
- [Superprompt — AI Traffic Surges 527% in 2025](https://superprompt.com/blog/ai-traffic-up-527-percent-how-to-get-cited-by-chatgpt-claude-perplexity-2025)
- [DigiPixel — From SEO to GEO in 2025](https://digipixel.sg/from-seo-to-geo-in-2025-how-to-get-your-website-cited-by-chatgpt-perplexity-and-claude/)

### LLM Crawler Best Practices
- [Whoerip — Stop LLM Crawlers in 2025](https://dev.to/whoerip/stop-llm-crawlers-in-2025-how-to-block-ai-bots-on-your-website-2h2d)
- [Soar.sh — AI Crawlability Audit](https://soar.sh/blog/audit-site-ai-crawlability)
- [Cookie Script — Beyond Robots.txt: AI.txt and LLMs.txt](https://cookie-script.com/guides/beyond-robots-txt-implementing-ai-txt-and-llms-txt-for-purpose-based-scraping-control)
- [WorkOS — How to Make Your Site LLM-Friendly](https://workos.com/blog/llm-friendly-seo-guide)
- [Digital Strategy Force — Does Your Site Need LLMs.txt in 2026?](https://digitalstrategyforce.com/journal/does-your-site-need-llms-txt-to-get-cited-by-ai-search-in-2026/index.html)
- [Metricus — AI Platform Intelligence Guide](https://metricusapp.com/ai-platform-comparison-brands/)
- [Qwairy — Complete Guide to Robots.txt and LLMs.txt](https://www.qwairy.co/guides/complete-guide-to-robots-txt-and-llms-txt-for-ai-crawlers)
- [GenEngine Insights — Robots.txt for AI Crawlers 2025](https://www.genengineinsights.com/blog/robots-txt-ai-crawlers)

### Schema.org / Structured Data
- [SEO-Day.de — Schema.org Fundamentals 2025](https://www.seo-day.de/wiki/on-page-seo/html-optimierung/strukturierte-daten/schema-org.php?lang=en)
- [Atomic Social — Schema Markup 2025](https://atomicsocial.com/schema-markup-2025-how-to-leverage-structured-data-to-outrank-competitors/)
- [Geneo — Schema Markup Best Practices for GEO 2025](https://geneo.app/blog/schema-markup-structured-data-best-practices-geo-ai-search-2025/)
- [Geneo — Schema Markup Best Practices for AI Citations 2025](https://geneo.app/blog/schema-markup-best-practices-ai-citations-2025/)
- [Dev.to — Boost E-commerce Rankings with Structured Data](https://dev.to/ramer2b58cbe46bc8/boost-your-e-commerce-rankings-with-structured-data-best-practices-4nom)
- [Warpdriven — Schema Best Practices for Product Analytics Pages 2025](https://warpdriven.ai/blog/industry-1/schema-best-practices-product-analytics-pages-ai-snippets-2025-128)
- [SEO Design Lab — Schema Markup with JSON-LD Guide 2025](https://seodesignlab.com/schema-markup-with-json-ld-guide-2025/)
- [QuickCreator — Schema Markup Best Practices for SERP Features 2025](https://quickcreator.io/seo/schema-markup-best-practices-serp-features/)
- [StoreRank.ai — AI Search Ranking Factors for Ecommerce 2026](https://www.storerank.ai/the-complete-guide-to-ai-search-ranking-factors-for-ecommerce-in-2025/)

### Core Web Vitals
- [ClickRank.ai — SEO for Startup Guide 2026](https://www.clickrank.ai/seo-for-startup/)
- [Blackbelt Commerce — Shopify SEO in 2026](https://www.blackbeltcommerce.com/shopify-seo-2026/)
- [HippoTool — Web Development in 2026](https://hippotool.com/web-development-in-2026/)
- [iMark Infotech — Google Core Updates 2025-2026](https://www.imarkinfotech.com/google-core-updates-2025-2026-everything-you-need-to-know-to-stay-ranked/)
- [Growth Spree — Page Speed Penalty on B2B SaaS Quality Score 2026](https://www.growthspreeofficial.com/blogs/page-speed-penalty-quality-score-b2b-saas-2026/)
- [Apogee Watcher — How Google's Latest Algorithm Update Affects Core Web Vitals](https://apogeewatcher.com/blog/how-google-latest-algorithm-update-affects-core-web-vitals)
- [Prestige Technologies — WordPress Hosting Speed Optimization 2026](https://www.prestigetechnologies.com/wordpress-hosting-speed-optimization/)
- [Rankeo.io — Core Web Vitals in 2026](https://rankeo.io/blog/core-web-vitals-2026)
- [Codersera — Top Web Development Trends in 2026](https://codersera.com/blog/top-web-development-trends)

### IndexNow
- [TrySight.ai — How To Implement IndexNow 2026](https://www.trysight.ai/blog/how-to-implement-indexnow)
- [TrySight.ai — Best IndexNow Implementation Guide 2026](https://www.trysight.ai/blog/indexnow-implementation-guide)
- [RightBlogger — IndexNow Setup 2026](https://rightblogger.com/blog/indexnow-bing-indexing)

### llms.txt & llms-full.txt
- [Webscraft — LLMS.txt 2026 Guide](https://webscraft.org/blog/llmstxt-povniy-gayd-dlya-vebrozrobnikiv-2026?lang=en)
- [Relixir.ai — Implementing LLMs.txt on Hospital Websites 2025](https://relixir.ai/blog/implementing-llms-txt-hospital-websites-2025-guide-chatgpt-citations)
- [ThinkDMG — LLMs.txt Specification PDF](https://thinkdmg.com/wp-content/uploads/2025/09/LLMstxt-Specification.pdf)
- [Heeya.fr — llms.txt Complete Guide 2026](https://heeya.fr/en/blog/llms-txt-complete-guide-2026)
- [HITL SEO — llms.txt vs llms-full.txt 2025](https://hitlseo.ai/blog/llms.txt-vs-llms-full.txt-the-complete-2025-guide-to-ai-friendly-documentation/)
- [TryProfound — The Role and Functionality of llms.txt](https://www.tryprofound.com/resources/articles/what-is-llms-txt-guide)
- [LinkBuildingHQ — Should Websites Implement llms.txt in 2026?](https://www.linkbuildinghq.com/blog/should-websites-implement-llms-txt-in-2026/)
- [365i — How to Create AI Files: llms.txt & ai.txt Guide](https://www.365i.co.uk/blog/2025/12/15/create-ai-files-llms-txt-guide/)

### Local SEO Bangladesh
- [American Best IT — Local SEO Strategies in Bangladesh](https://www.americanbestit.com/about-us/blog/local-seo-strategies)
- [Sprout Media Lab — Google Search Changes for Local Businesses 2026](https://www.sproutmedialab.com/google-search-is-changing-fast-what-local-businesses-need-to-know-going-into-2026/)
- [LutforPro — Best SEO Expert in Bangladesh](https://lutforpro.com/)

### Bangla SEO & Hreflang
- [Faisal Mustafa — How to Perform SEO for Bangla Language in 2025](https://faisalmustafa.me/seo-for-bangla-language/)
- [BoostedHost — Best AI Website Builders for Multilingual Sites 2025](https://boostedhost.com/blog/en/best-ai-website-builders-for-multilingual-sites-2025-translation-hreflang-and-seo/)
- [American Eagle — Multilingual SEO Best Practices 2025](https://www.americaneagle.com/insights/blog/post/seo-best-practices-for-multi-language-websites)
- [SearchX Pro — Language-Specific SEO Best Practices 2025](https://searchxpro.com/language-specific-seo-best-practices-2025/)
- [Outreach Monks — Hreflang SEO Best Practices 2025](https://outreachmonks.com/hreflang-seo/)

### E-E-A-T & AI Search
- [Whitehat SEO — Authorship, E-E-A-T, and Author Signals 2025-2026](https://whitehat-seo.co.uk/blog/evaluating-author-performance-for-seo)
- [ClickRank.ai — E-E-A-T and AI: The Human Edge 2026](https://www.clickrank.ai/e-e-a-t-and-ai/)
- [ClickPoint Software — E-E-A-T as a Ranking Signal in AI-Powered Search](https://blog.clickpointsoftware.com/google-e-e-a-t)
- [Marqii — 2025 Search Recap for Restaurants](https://blog.marqii.com/the-2025-search-recap-for-restaurants/)
- [ThinkDMG — GEO Guide PDF](https://thinkdmg.com/wp-content/uploads/2025/12/The-New-Rules-of-Online-Visibility-A-Guide-to-Generative-Engine-Optimization-for-Modern-Businesses.pdf)
- [Keywords Everywhere — Google E-E-A-T Guidelines 2026 Playbook](https://keywordseverywhere.com/blog/google-e-e-a-t-guidelines-an-overview/)
- [CloudSEO.in — How to Dominate Google Search Using EEAT 2025-2026](https://cloudseo.in/how-to-dominate-google-search-using-eeat/)
- [Agent6 — E-E-A-T in the AI Era](https://agent6.com.au/e-e-a-t-in-the-ai-era-how-to-prove-trust-when-google-writes-the-answers/)

---

## Quick Reference Card

```
┌─────────────────────────────────────────────────────────────┐
│           SEO / AIO / GEO MASTERY — QUICK REF               │
├─────────────────────────────────────────────────────────────┤
│ CWV TARGETS          │ LCP ≤2.5s │ INP ≤200ms │ CLS ≤0.1   │
│ AI CRAWLERS          │ Allow GPTBot, ClaudeBot, PerplexityBot│
│ DIRECT ANSWER LENGTH │ 40–70 words at top of page            │
│ SCHEMA PRIORITY      │ Product → Org → FAQ → HowTo → Article │
│ HREFLANG BANGLA      │ bn-BD (Bangladesh) │ bn-IN (India)   │
│ LLMS.TXT             │ /llms.txt + /llms-full.txt at root    │
│ INDEXNOW             │ Bing/Yandex only; Google not supported│
│ E-E-A-T FAST WIN     │ Author bios + sameAs schema + reviews │
│ BANGLADESH LOCAL     │ GBP + BD directories + bKash mentions │
│ JSON-LD FORMAT       │ Google's preferred structured data    │
└─────────────────────────────────────────────────────────────┘
```

---

*This cheatsheet is a living document. Revisit quarterly to update thresholds, schema types, and AI crawler policies as the search landscape evolves.*
