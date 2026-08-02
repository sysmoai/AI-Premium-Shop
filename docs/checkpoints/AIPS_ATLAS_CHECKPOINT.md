# AIPS ATLAS Checkpoint

**Session:** claude-code 2e1dc0f6 (Opus 5)
**Updated:** 2026-08-02 09:28 Asia/Dhaka
**Branch:** main
**Lane:** repository-side ATLAS normalization + reporting

## Ownership / collision status

Session `7e2ba24f` owns the **Notion ATLAS import**. Evidence: `.atlas_ids.json`
(repo root, untracked, 08:30) holds the live Notion page + DB IDs, and its
scratchpad `atlas/run_output.log` records 16 successful row creations at 09:08.
Last write from that session: **09:09:59**.

**This session did NOT run any Notion write.** Two concurrent writers against the
same ATLAS database is how duplicate rows happen. That lane stays with 7e2ba24f.
`.atlas_ids.json` was left untouched and uncommitted.

## Completed here (repository lane, zero collision)

1. **Dataset preserved.** 343-entry consolidated JSON copied out of volatile
   `/private/tmp` into `data/catalog/atlas/atlas-consolidated-tools.raw.json`,
   SHA-256 `496b1082…a6fc`, with full source lineage in
   `atlas-consolidated-tools.import-metadata.json`. Committed `88405d9`.
   All five reported metrics independently verified (343 / 93 BDT / 102 USD /
   27 conflicts / 0 dup names).

2. **Entity classification.** `scripts/catalog/classify-atlas-entities.mjs`
   — deterministic, idempotent (re-run is byte-identical), rule-based with
   recorded evidence per row. 343 in → 343 out, 343 unique canonical_ids,
   zero unaccounted.

3. **Repo reconciliation.** `scripts/catalog/reconcile-atlas-repository.mjs`
   — 77 commercial candidates, 44 already on the site, 33 absent.

## The material finding

**343 raw rows are not 343 sellable products.** 205 (60%) are directory or
research-only mentions whose own `aips_status_raw` says "Named in provider/lab
directory only — no plan". Breakdown:

| entity_type | count |
|---|---|
| research_only | 205 |
| marketplace_offer | 58 |
| variant | 32 |
| unknown_needs_review | 28 |
| product_family | 19 |
| api_platform | 1 |

**Zero entities are `approved`.** No ATLAS price is publishable until CEO
approval promotes it. 27 rows carry unreconciled BDT conflicts —
`docs/coordination/CEO_DECISION_QUEUE_ATLAS.md`.

## Blocked on CEO

- 27 BDT price conflicts (incl. ChatGPT Plus spanning ৳350/৳399/৳499/৳599 —
  note ৳350 is the phantom price already purged from the live site).
- Access-model approval for the 33 candidates absent from the repo.

Safe default while unresolved: records stay `pending_ceo`, nothing publishes.

## Exact next action

Await session 7e2ba24f's Notion import to finish, then run
`node scripts/catalog/reconcile-atlas-repository.mjs` and add a Notion-side
reconciliation pass keyed on `canonical_id` so repo and Notion cannot drift.
Do not start a competing Notion writer.
