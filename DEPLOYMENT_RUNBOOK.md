# AI Premium Shop - Deployment & Operations Runbook

**Version:** 1.0  
**Last Updated:** 2026-07-29  
**Status:** ✅ LIVE IN PRODUCTION

---

## 📋 Quick Reference

| Item | Value |
|------|-------|
| **Live Domain** | https://aipremiumshop.com |
| **Vercel Project** | ai-premium-shop-aips-landing |
| **GitHub Repo** | github.com/aipremiumshopbd/aips-landing |
| **Deployment** | Automatic (GitHub webhook) |
| **Build Time** | ~2-3 minutes |
| **Cache** | Vercel CDN (global) |

---

## 🚀 DEPLOYMENT PROCESS

### Automatic Deployment (Recommended)
1. Make changes locally and commit to git
2. Push to GitHub (`git push origin [branch]`)
3. Create Pull Request to `main`
4. After review and merge to `main`
5. **Vercel auto-deploys** (webhook triggered)
6. Deployment complete in 2-3 minutes

### Manual Deployment (if needed)
```bash
# Deploy current main branch
vercel --prod

# Deploy with environment from file
vercel --prod --env-file .env.production
```

---

## 🔧 ENVIRONMENT SETUP

### Required Environment Variables
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
RESEND_API_KEY
VERCEL_ENV=production
```

All env vars are configured in Vercel project settings.

---

## 🐛 DEBUGGING PRODUCTION

### Check Build Logs
1. Go to Vercel dashboard
2. Select "ai-premium-shop-aips-landing" project
3. Click "Deployments" tab
4. Click latest deployment
5. View build logs

### Check Runtime Errors
1. Open Sentry dashboard (sentry.io)
2. Project: aipremiumshop
3. View error trends and details

### Check Performance
1. Vercel Analytics: Project > Analytics tab
2. Core Web Vitals: Check LCP, FID, CLS
3. Google Analytics: analytics.google.com

---

## 📊 MONITORING CHECKLIST

### Daily (Automated)
- [ ] Uptime monitoring via Vercel
- [ ] Error tracking via Sentry
- [ ] Analytics collection via GA4 + Meta Pixel

### Weekly
- [ ] Review deployment logs
- [ ] Check error trends
- [ ] Review user analytics
- [ ] Test WhatsApp order flow

### Monthly
- [ ] Security audit
- [ ] Performance optimization
- [ ] Dependency updates
- [ ] Backup verification

---

## 🆘 COMMON ISSUES & FIXES

### Issue: "Failed To Load Cert"
**Cause:** SSL certificate provisioning in progress  
**Fix:** Wait 5-15 minutes, then refresh Vercel dashboard  
**Status:** Expected during initial setup

### Issue: Domain shows "Verification Required"
**Cause:** DNS TXT record not yet propagated  
**Fix:** Wait 5-30 minutes for DNS propagation  
**Escalation:** Check DNS with `dig _vercel.aipremiumshop.com`

### Issue: WhatsApp link not working
**Cause:** Link format incorrect  
**Fix:** Verify format is `https://wa.me/8801865385348?text=`  
**Test:** Click order button and verify redirect

### Issue: Slow page load
**Cause:** CDN cache stale or build issue  
**Fix:** 
1. Clear Vercel cache: Vercel > Settings > Caching > Clear Cache
2. Trigger rebuild: Push empty commit `git commit --allow-empty -m "Rebuild"`

---

## 📝 DEPLOYMENT CHECKLIST (Before Production Push)

- [ ] All tests passing locally
- [ ] No console errors in browser
- [ ] No TypeScript errors
- [ ] Lint checks passing
- [ ] Environment variables set in Vercel
- [ ] Meta tags verified
- [ ] Favicon loading
- [ ] WhatsApp links tested
- [ ] Analytics code present

---

## 🔐 SECURITY PROCEDURES

### Credentials Rotation
1. **Rotate Resend API keys:** resend.com > API Keys
2. **Rotate Supabase keys:** supabase.com > Settings > API
3. Update Vercel environment variables immediately
4. Document rotation in team notes

### Access Control
- Only 2FA-enabled accounts can access Vercel
- GitHub branch protection on main
- All deployments require PR review
- Credentials stored in Vercel secrets, never in code

---

## 📈 PERFORMANCE OPTIMIZATION

### Image Optimization
- All images served via Vercel CDN
- Use next/image component
- Lazy load images by default

### Code Splitting
- Vite automatically splits code
- Monitor bundle size in build logs
- Test with `npm run build`

### Caching Strategy
- Static assets: 1 year TTL
- HTML pages: No cache (Vercel revalidates)
- API responses: Cache per endpoint config

---

## 🆗 GO-LIVE SIGN-OFF CHECKLIST

- [x] Domain resolves correctly
- [x] SSL certificate provisioning initiated
- [x] Homepage loads without errors
- [x] WhatsApp integration works
- [x] Analytics tracking active
- [x] Error monitoring active (Sentry)
- [x] Database connections verified
- [x] Email service active (Zoho + Resend)
- [x] All links functional
- [x] Mobile responsive design confirmed

---

## 📞 ESCALATION CONTACTS

| Issue | Contact | Response Time |
|-------|---------|---|
| **Deployment** | Emon Hossain | 30 min |
| **Domain/DNS** | Squarespace Support | 24 hours |
| **Email** | Zoho Support | 4 hours |
| **Hosting** | Vercel Support | 1 hour |

---

## 📚 ADDITIONAL RESOURCES

- Vercel Docs: https://vercel.com/docs
- Vite Guide: https://vitejs.dev
- GitHub Docs: https://docs.github.com
- Squarespace DNS: https://support.squarespace.com/hc/articles/205812348

