# CEO Decision Queue — ATLAS Price Conflicts

**Generated:** 2026-08-02T03:27:30.329Z
**Owner:** Emon Hossain

These are cross-source BDT price conflicts found in the consolidated ATLAS
dataset. Each needs one decision: which figure is the real AI Premium Shop
selling price. Nothing here is published anywhere — every affected record sits
at commercial_state=pending_ceo and shows no price on the site until you decide.

**Safe default if you do not decide:** the record stays pending_ceo, the page
shows "price on WhatsApp" instead of a number. Nothing breaks; we just do not
quote a figure we cannot stand behind.

**Note:** several conflicts reference a ৳350 ChatGPT figure. Earlier sessions
identified ৳350 as a phantom price already removed from the live site — treat
any source still carrying it as stale.

---

## 1. ChatGPT Plus

- Shared-seat BDT price differs across sources: DB6 live catalog ৳350 vs AI Offers Master ৳350/৳399 vs Top100 page ৳499 vs Product Index page ৳599 — not resolved, flagging for CEO pricing review (matches known pricing-drift issue noted elsewhere in workspace).

**Decision needed:** confirm the correct BDT price (or mark request-price-only).

---

## 2. ChatGPT Business

- 'ChatGPT Business/Team — Personal-like (1 user)' priced ৳3,899 in AI Offers Master vs ৳3,990 'ChatGPT Business Personal' in live Products Catalog — likely same SKU, price mismatch not resolved.

**Decision needed:** confirm the correct BDT price (or mark request-price-only).

---

## 3. Claude Pro

- Personal-seat price: DB6/Product Index ৳2,990 vs AI Offers Master ৳2,950. Shared-seat price: DB6 Premium Shared ৳1,495 vs Top100/Product Index Shared ৳599 vs Tool-stack starter table ৳699 — multiple unreconciled BDT figures.

**Decision needed:** confirm the correct BDT price (or mark request-price-only).

---

## 4. Claude Team

- ৳4,390 (live catalog) vs ৳3,950 (AI Offers Master) for what appears to be the same Team/Premium personal seat product.

**Decision needed:** confirm the correct BDT price (or mark request-price-only).

---

## 5. Google AI Pro (Gemini Advanced)

- Price varies ৳499-৳599 depending on source, and Product Index cites $20 official USD while Market Intel report cites $19.99 for 'AI Pro' — minor rounding, plus Personal-seat price differs (৳2,990 Product Index vs ৳500 live catalog, likely different SKU/tier).

**Decision needed:** confirm the correct BDT price (or mark request-price-only).

---

## 6. Perplexity Pro

- Personal-seat price differs sharply: ৳3,290 (live catalog) vs ৳2,742 (AI Offers Master, formula-derived) vs ৳2,950 (Product Index). Shared-seat: ৳350 (live catalog/Offers Master) vs ৳599 (Top100/Product Index).

**Decision needed:** confirm the correct BDT price (or mark request-price-only).

---

## 7. Perplexity Max

- ৳29,900 (live catalog) vs ৳10,990 (Product Index, described at $70 official vs actual $200 US price) — Product Index figure looks stale/miscalculated.

**Decision needed:** confirm the correct BDT price (or mark request-price-only).

---

## 8. SuperGrok / Grok (xAI)

- Personal-seat price ৳4,990 (Top100/Product Index) not present as a live catalog SKU (live catalog only has ৳3,990 Standard / ৳1,495 Lite) — mapping unclear.

**Decision needed:** confirm the correct BDT price (or mark request-price-only).

---

## 9. Manus AI

- At least 4 different BDT figures across sources: ৳2,490 (live catalog personal), ৳1,495 (Top100/Product Index service), ৳699 (Tool-stack table starter) — this is the exact ৳1,495 pricing-drift pattern flagged elsewhere in the workspace memory.

**Decision needed:** confirm the correct BDT price (or mark request-price-only).

---

## 10. Midjourney

- Personal-seat Standard price ৳4,390 (live catalog) vs ৳4,990 (Product Index). Pro Personal ৳8,970 (live catalog) vs ৳9,490 (Product Index).

**Decision needed:** confirm the correct BDT price (or mark request-price-only).

---

## 11. Canva Pro

- Shared price ৳199 (live catalog) vs ৳399 (Top100/Product Index) — 2x difference.

**Decision needed:** confirm the correct BDT price (or mark request-price-only).

---

## 12. Ideogram

- Live catalog Ideogram Pro Personal ৳8,970 vs Product Index ৳3,990 — large mismatch, may be different tier.

**Decision needed:** confirm the correct BDT price (or mark request-price-only).

---

## 13. Leonardo AI

- Shared price ৳599 (live catalog) vs ৳499 (Product Index).

**Decision needed:** confirm the correct BDT price (or mark request-price-only).

---

## 14. Runway

- Runway 'Standard' Personal price ৳1,794 (live catalog) vs ৳1,299 (Top100) — labeled the same tier, different price.

**Decision needed:** confirm the correct BDT price (or mark request-price-only).

---

## 15. HeyGen

- ৳1,499 (live catalog, labeled Shared) vs ৳1,399 (Top100, labeled Personal) — same tool, different seat-type label and price.

**Decision needed:** confirm the correct BDT price (or mark request-price-only).

---

## 16. Synthesia

- Live catalog ৳2,499 vs Top100 ৳1,499 for 'Starter' tier.

**Decision needed:** confirm the correct BDT price (or mark request-price-only).

---

## 17. Descript

- Three different BDT prices: ৳1,299 (live catalog), ৳1,099 (Top100), ৳599 (Offers Master/tool-stack table).

**Decision needed:** confirm the correct BDT price (or mark request-price-only).

---

## 18. ElevenLabs

- Creator-tier price: ৳3,289 (live catalog) vs ৳950 (Top100/Product Index, likely different seat class) vs ৳599 (Offers Master starter) — very wide spread, needs SKU reconciliation.

**Decision needed:** confirm the correct BDT price (or mark request-price-only).

---

## 19. Suno

- Personal 'Premier' price ৳3,990 (live catalog) vs Product Index Personal ৳4,990 for what's badged as the top Suno tier.

**Decision needed:** confirm the correct BDT price (or mark request-price-only).

---

## 20. GitHub Copilot

- Personal price ৳1,495 (live catalog / Product Index) vs ৳399 (Top100, though Top100 labels it 'Personal-seat' at what looks like a shared price point) — labeling inconsistent.

**Decision needed:** confirm the correct BDT price (or mark request-price-only).

---

## 21. v0.dev (Vercel)

- ৳1,090 (live catalog) vs ৳999 (Top100).

**Decision needed:** confirm the correct BDT price (or mark request-price-only).

---

## 22. Lovable.dev

- ৳999 (live catalog) vs ৳799 (Offers Master/tool-stack table).

**Decision needed:** confirm the correct BDT price (or mark request-price-only).

---

## 23. Grammarly

- ৳299 (live catalog) vs ৳399 (Top100/Product Index).

**Decision needed:** confirm the correct BDT price (or mark request-price-only).

---

## 24. Notion AI / Notion Business

- Notion AI Add-on ৳390 (live catalog) vs Notion Plus ৳499 (Product Index) — may be different products (add-on vs plan) but names overlap.

**Decision needed:** confirm the correct BDT price (or mark request-price-only).

---

## 25. Writesonic

- ৳890 (live catalog) vs ৳499 (Top100) for Writesonic Pro/Individual.

**Decision needed:** confirm the correct BDT price (or mark request-price-only).

---

## 26. Make (Make.com)

- ৳1,390 (live catalog) vs ৳599 (Offers Master).

**Decision needed:** confirm the correct BDT price (or mark request-price-only).

---

## 27. n8n

- Live catalog itself has two 'n8n Cloud Starter' rows at different prices (৳899 vs ৳3,249 orig ৳1,490 vs ৳3,080) — internal duplicate/inconsistency, not just cross-source. Also Top100 cites ৳999 Personal, a third figure.

**Decision needed:** confirm the correct BDT price (or mark request-price-only).

---

