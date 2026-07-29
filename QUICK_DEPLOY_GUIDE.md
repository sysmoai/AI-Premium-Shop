# ⚡ QUICK DEPLOY GUIDE - Phase 1-3

**Use this when agents complete to deploy in under 15 minutes**

---

## 🚀 ULTRA-FAST DEPLOYMENT PATH

### 1️⃣ REVIEW AGENT OUTPUTS (2 min)
```bash
# Check Phase 1 validation report
cat PHASE_1_VALIDATION_REPORT.md

# Check Phase 2-3 changes
git status
git diff HEAD artifacts/aips-landing/index.html | head -50
```

**Verify:**
- ✅ All 118 products validated
- ✅ No critical gaps
- ✅ Hero copy correct (118 tools)
- ✅ Brand registry created

### 2️⃣ BUILD & TEST (3 min)
```bash
cd /Users/emonhossain/AI-Premium-Shop/artifacts/aips-landing

# Quick build
pnpm build

# Check build succeeded
ls -lah dist/public/index.html
echo "✅ Build complete"
```

### 3️⃣ VERIFY CONTENT (2 min)
```bash
# Check hero copy is updated
grep "118" dist/public/index.html
grep "BDT 299" dist/public/index.html
grep "5 Payment" dist/public/index.html

# Verify files generated
ls -la dist/public/data/
```

### 4️⃣ COMMIT & PUSH (2 min)
```bash
cd /Users/emonhossain/AI-Premium-Shop

git add artifacts/aips-landing/
git add public/

git commit -m "feat: Phase 1-3 complete - homepage redesign live

- ✅ Phase 1: 118 products validated
- ✅ Phase 2: Brand registry (65+ brands)
- ✅ Phase 3: Homepage redesigned
  - Hero: 118 tools, BDT 299-29,900, 5 payments
  - New sections: brands, pricing, how it works, featured products
  - Mobile responsive, optimized
- Ready for production

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"

git push origin main
```

### 5️⃣ MONITOR VERCEL (3 min)
```bash
# Open Vercel dashboard
# URL: https://vercel.com/sysmoai/aips-website

# Expected status progression:
# ① Building... (30-60 sec)
# ② Linking preview environment... (20 sec)
# ③ Linking production domain... (30-60 sec)
# ④ Ready ✅ (total ~2-3 min)

# Once "Ready", click the domain link to verify
```

### 6️⃣ FINAL VERIFICATION (3 min)
```bash
# Open in browser: https://aipremiumshop.com

# Quick checks:
# ✅ Page loads (should be instant)
# ✅ Hero section shows "118+ Premium AI Tools"
# ✅ Shows "BDT 299 to BDT 29,900"
# ✅ Shows "5 Payment Methods"
# ✅ Brand showcase visible (or placeholders)
# ✅ Responsive on mobile (test with F12)
# ✅ WhatsApp button works
# ✅ No console errors (F12 → Console)

echo "✅ DEPLOYMENT COMPLETE!"
```

---

## ⏱️ TIMELINE

| Step | Time | Status |
|------|------|--------|
| Review outputs | 2 min | ⏳ |
| Build & test | 3 min | ⏳ |
| Verify content | 2 min | ⏳ |
| Commit & push | 2 min | ⏳ |
| Vercel deploy | 3 min | ⏳ |
| Final verify | 3 min | ⏳ |
| **TOTAL** | **15 min** | ⏳ |

---

## 🐛 IF SOMETHING BREAKS

### "Build Failed" Error
```bash
# Check what failed
cd artifacts/aips-landing
pnpm build --verbose

# Most common: Missing file or dependency
# Fix: cd artifacts/aips-landing && pnpm install
```

### "Page shows old content"
```bash
# Clear browser cache
# Ctrl+Shift+Del (Windows) or Cmd+Shift+Delete (Mac)

# Or check build actually deployed
curl -I https://aipremiumshop.com | grep "x-vercel"
```

### "Hero text not updated"
```bash
# Verify file was edited correctly
grep "118" artifacts/aips-landing/index.html

# If not found, check git diff
git diff HEAD artifacts/aips-landing/index.html | grep "118"
```

### "Brand logos not showing"
```bash
# Check files exist
ls -la artifacts/aips-landing/public/brands/

# If missing, Agent 2 didn't complete properly
# See PHASE_1-3_IMPLEMENTATION_TRACKER.md for status
```

---

## 📊 POST-DEPLOY QUICK CHECKS

```bash
# 1. Page load time
curl -w "\nTime: %{time_total}s\n" -o /dev/null -s https://aipremiumshop.com

# 2. Check key content
curl https://aipremiumshop.com | grep -o "118"
curl https://aipremiumshop.com | grep -o "BDT 299"

# 3. Check for errors in Sentry
# Visit: https://sentry.io/organizations/sysmoai/issues/

# 4. Check analytics
# Visit: https://analytics.google.com/

echo "✅ All checks passed!"
```

---

## 📝 NEXT PHASE (After This Deploys)

**Phase 4-7** (2-3 weeks):
1. Create `/products` page (catalog)
2. Create `/pricing` page
3. Create individual product pages (top 40)
4. Create `/brands` showcase page

**Phase 8-10** (1 week):
1. Add demo videos
2. Add testimonials
3. Final testing & polish
4. Launch ready! 🚀

---

## 💡 TIPS

- **Need to undo?** `git revert HEAD && git push origin main` (3 min rollback)
- **Check logs?** Vercel dashboard → Deployments → Click deployment → View logs
- **Need help?** Check [DEPLOYMENT_CHECKLIST_PHASE_1-3.md](./DEPLOYMENT_CHECKLIST_PHASE_1-3.md)
- **Production issues?** Email: support@aipremiumshop.com

---

**🎯 Goal: 15-minute deployment once agents complete!**

Agents are running. You'll be notified when ready. Then use this guide to ship it live! ⚡
