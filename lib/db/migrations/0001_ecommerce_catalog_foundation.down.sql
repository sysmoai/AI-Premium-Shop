-- Rollback for 0001_ecommerce_catalog_foundation.sql
-- Run only if the new catalog domain has not become the authoritative source.
-- Existing legacy tables are intentionally untouched.

BEGIN;
DROP TABLE IF EXISTS publication_revisions;
DROP TABLE IF EXISTS verification_events;
DROP TABLE IF EXISTS redirect_registry;
DROP TABLE IF EXISTS route_registry;
DROP TABLE IF EXISTS entity_media;
DROP TABLE IF EXISTS media_assets;
DROP TABLE IF EXISTS commercial_offers;
DROP TABLE IF EXISTS provider_fact_snapshots;
DROP TABLE IF EXISTS product_plans;
DROP TABLE IF EXISTS product_families;
COMMIT;
