# CEO Deployment Guide — 2 Minutes to Live

**Your new Phoenix website is READY. Only you can push it live.**

Cloudflare API token is invalid (403 error) and browser OAuth conflicts with Kimi's session. The only path is a 2-minute manual upload via Cloudflare dashboard.

---

## Step 1: Open Cloudflare Dashboard

**URL:** https://dash.cloudflare.com/4ca6269edabb6ad2906d70ec6845de22/pages/view/aips-landing

You should already be logged in (account: sysmoai.com@gmail.com).

---

## Step 2: Create Deployment

1. Click **"Create deployment"** (or **"Direct Upload"** button)
2. Select **"Upload assets"**
3. Drag-and-drop the entire `dist/` folder:
   ```
   C:\Users\emonh\AI Premium Shop\01-phoenix-website\dist\
   ```
   Or zip the `dist/` folder and upload the zip.

---

## Step 3: Deploy

1. Set **Production branch** = `main`
2. Click **"Deploy"**
3. Wait 30 seconds

---

## Step 4: Verify

Open https://aipremiumshop.com in an incognito window.

**What you should see:**
- Title: "Premium AI Subscriptions in Bangladesh | AI Premium Shop"
- Working product pages with correct names ("Claude Pro", "ChatGPT Plus", etc.)
- Privacy Policy and Terms of Service links in footer

---

## What's Already Done (You Don't Need to Do This)

✅ 49 pages built and tested (0 errors)
✅ robots.txt allows all AI crawlers (GPTBot, ClaudeBot, PerplexityBot)
✅ sitemap.xml with 40+ URLs
✅ JSON-LD schema on every page (Product, FAQ, HowTo, Organization, Article)
✅ OG image generated (1200×630)
✅ logo.png generated (512×512)
✅ Privacy & Terms pages created
✅ Blog index shows 3 static posts
✅ Comparison pages have FAQ schema + visible FAQ sections
✅ Hardcoded fake reviews REMOVED (Google penalty risk eliminated)
✅ IndexNow key ready for Bing submission

---

## After You Deploy

**Tell me immediately** and I will:
1. Submit all 49 URLs to Google Search Console
2. Submit all 49 URLs to Bing via IndexNow
3. Run schema validation
4. Verify the live site brutally

**Then I will start:**
- Bangla landing page (`/bn`)
- Content expansion (30 product pages rewritten with unique BD use cases)
- 10+ blog posts for long-tail SEO
- Competitor gap exploitation

---

## Emergency Rollback

If anything breaks:
1. Go back to Cloudflare Pages dashboard
2. Find the previous deployment
3. Click **"Rollback"**

The old Vite SPA will be restored instantly.
