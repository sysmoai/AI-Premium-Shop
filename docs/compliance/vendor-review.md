# Vendor compliance review — status

**Date:** 2026-08-07. **Status:** skeleton + flagging only. No vendor terms
have been read yet, no copy has been rewritten. See `BLOCKERS.md` B5 — this
is explicitly an owner decision per vendor, not something to resolve
unilaterally from the repository alone.

## What this covers

`vendor-matrix.csv` lists all 37 distinct vendors/brands behind the 44
catalog records marked `accessType: "shared"`, mechanically extracted from
`data/products.json` — no research performed, every compliance-classification
field is `Unverified` by construction. This is the skeleton the matrix needs;
filling it in requires reading each vendor's actual current terms of service
for account/credential sharing, which is real external research (like the
Higgsfield verification in `RESEARCH-CACHE.md`), not something to rush
through as a side effect of building the CSV shape.

**By volume, worth prioritizing first:** ChatGPT/OpenAI (5 shared records),
Midjourney (3), Claude/Anthropic (2). OpenAI's terms are already referenced
in the master prompt's own starting sources
(`openai.com/policies/row-terms-of-use/`) — a reasonable first vendor to
actually verify in a follow-up session.

## Generic shared-account language found (flagged, not changed)

Two places state or imply a blanket policy across all 44 products, which is
exactly what B5 says not to do — compliance is vendor-specific, and no
vendor-specific verification has happened yet to support a blanket claim:

- `src/pages/Home.tsx:57` — homepage FAQ: "Shared plans let 2–7 users split
  a legitimate subscription (**similar to family sharing**)."
- `src/pages/FAQPage.tsx:119` — "Is my data safe with a shared ChatGPT
  account?" → "Yes. Each user on a **family plan** has a completely separate
  profile... Other users cannot see your chat history." (This one at least
  names a specific vendor/product, but "family plan" is doing real
  compliance work here — it needs to be true of OpenAI's *actual* current
  terms for whatever specific sharing arrangement AIPS uses, not just an
  analogy.)

**Not changed:** rewriting either requires knowing what's actually true for
each vendor, which this pass didn't do. Flagged here so it's not
rediscovered from scratch next time.

## The other recurring pattern: safety claims that lean on B1, not vendor terms

Five `BrandPage.tsx` FAQ entries ask "Is X safe to buy through AIPS?" and
each answers "Yes... We have served 10,000+ customers since 2022" —
Freepik, Kling AI, Synthesia, Windsurf, CapCut Pro. This isn't a *new*
compliance question so much as another surface where **B1** (the unverified
10,000+ customers claim) does load-bearing trust work. Once B1 resolves
(owner decision, `BLOCKERS.md`), these five answers need the same treatment
as every other surface carrying that number — not tracked as a separate
item, just noted here so the B1 fix's scope search includes `BrandPage.tsx`.

## Recommended next step (not done this session)

Pick 1-3 highest-volume vendors (OpenAI first), actually fetch and read
their current terms pages, record findings in `RESEARCH-CACHE.md` per its
existing table format, then fill in those vendors' rows in
`vendor-matrix.csv` with a real classification instead of "Unverified."
Repeat incrementally — 37 vendors is not a one-session task, and the master
prompt's own credit-efficient rules say not to batch-research things that
can be verified once and cached.
