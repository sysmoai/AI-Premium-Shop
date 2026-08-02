# ATLAS Raw Dataset Audit

**Generated:** 2026-08-02T03:27:19.495Z
**Source:** `data/catalog/atlas/atlas-consolidated-tools.raw.json`
**SHA-256:** `496b10826e5514ea1d92973b69b25a02b04425f8fdd4ccec2b1b1869e90ca6fc`

## Integrity — reported vs measured

| Metric | Reported | Measured | Match |
|---|---|---|---|
| Records | 343 | 343 | YES |
| With BDT price | 93 | 93 | YES |
| With USD price | 102 | 102 | YES |
| Cross-source conflicts | 27 | 27 | YES |
| Exact duplicate names | 0 | 0 | YES |

All five reported metrics verified independently. JSON valid. 16 distinct Notion source documents.

## Accounting — every raw row lands somewhere

| Check | Value |
|---|---|
| Raw records in | 343 |
| Canonical entities out | 343 |
| Unaccounted | 0 |
| Unique canonical_ids | 343 |

## By entity type

| entity_type | count |
|---|---|
| research_only | 205 |
| marketplace_offer | 58 |
| variant | 32 |
| unknown_needs_review | 28 |
| product_family | 19 |
| api_platform | 1 |

## By commercial state

| commercial_state | count |
|---|---|
| research_only | 205 |
| pending_ceo | 77 |
| not_for_resale | 32 |
| watchlist | 28 |
| api_credit | 1 |

## The headline finding

**343 raw entries are NOT 343 sellable products.** 205 rows
(60%) are directory or research-only mentions carrying no plan and no
price — their own `aips_status_raw` says so. Only 58 rows look like live
marketplace offers, and even those are `pending_ceo` until price approval.

**Zero entities are `approved`.** Nothing in this dataset may be published with a
fixed price or Buy CTA until a CEO decision promotes it.

## Needs human classification

28 rows matched no rule with sufficient evidence and are parked as
`unknown_needs_review` in `atlas-unresolved.json`. They are NOT guessed at.

## Price conflicts

27 rows carry unreconciled cross-source BDT/USD conflicts, preserved
verbatim in `atlas-conflicts.json`. See the CEO decision queue.
