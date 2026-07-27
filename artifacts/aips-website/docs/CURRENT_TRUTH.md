# PROJECT PHOENIX — CURRENT TRUTH v5.0
# Reconciled: 19 July 2026 | Agent: Command Code
# Verification: [HIGH] via full build + lint + typecheck

## Repository
- Repo: sysmoai/aips-website (private)
- Branch: main
- HEAD: `0acc798` (docs: release-20260719)
- Prior: `6b26ea9` (lint fixes)
- Release: `4a7d9d6` (phase8: all new pages in sitemap + build verified)
- Framework: Next.js 16.2.4 (App Router, Static Export)
- Package: pnpm 9.15.9
- Node target: >=20 <21 (local: v26 — incompatible but works)

## Product Catalog (from src/data/products.json)
- Total products (SKUs): 103
- Unique product groups (slugs): 52

## Static Pages: 103
- Core: Home, Products, Pricing, Blog, FAQ, About, Contact, Privacy, Terms, How-to-order, Refund, Support
- Categories: 8 (AI Assistant, Image, Video, Voice/Music, Code, Workspace, Writing, Design) + Bundles
- Product detail: 52 slugs (162 HTML files for variants)
- Blog: 12 posts
- Segment pages: 11 (students, freelancers, business, developers, creators, marketers, designers, researchers, job-seekers, teachers, ecommerce)
- City pages: 5 (Dhaka, Chittagong, Khulna, Rajshahi, Sylhet)
- Budget pages: 4 (under-500, under-1000, under-3000, best-ai-budget)
- Comparisons: 7 (chatgpt-vs-claude, chatgpt-vs-gemini, copilot-vs-cursor, midjourney-vs-ideogram, midjourney-vs-leonardo, chatgpt-plans-comparison, google-ai-pro)
- Brand landing: 34 pages
- SEO: sitemap.xml, robots.txt, llms.txt, llms-full.txt

## Key Verifications
- WhatsApp: +8801865385348 ✅
- Customer claim: "3,000+" ✅ (not 10,000+)
- Trademark disclaimer: Present in footer ✅
- Pricing formula: 130×1.15 ✅
- No merge markers: ✅
- No tracked secrets: ✅
- Duplicate product IDs: None ✅
- Bangla content: Valid UTF-8 ✅

## Deployment Status
- GitHub: Pushed to origin/main ✅
- Live site (aipremiumshop.com): Serving baseline `95808b9` — NEEDS REPUBLISH
- Replit: Pull + build + republish required
