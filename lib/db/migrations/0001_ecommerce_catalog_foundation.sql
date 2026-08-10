-- AI Premium Shop ecommerce/media catalog foundation
-- ADDITIVE ONLY. Does not alter or drop existing products, carts, orders or admins.
-- Apply only after a verified production database backup.

BEGIN;

CREATE TABLE IF NOT EXISTS product_families (
  id serial PRIMARY KEY,
  external_id text NOT NULL UNIQUE,
  canonical_name text NOT NULL,
  slug text NOT NULL UNIQUE,
  brand text NOT NULL,
  brand_slug text NOT NULL,
  provider text,
  category text NOT NULL,
  entity_type text NOT NULL DEFAULT 'software',
  canonical_path text NOT NULL,
  status text NOT NULL DEFAULT 'DRAFT',
  primary_official_url text,
  terms_url text,
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS product_families_canonical_path_idx ON product_families(canonical_path);
CREATE INDEX IF NOT EXISTS product_families_category_idx ON product_families(category);
CREATE INDEX IF NOT EXISTS product_families_provider_idx ON product_families(provider);

CREATE TABLE IF NOT EXISTS product_plans (
  id serial PRIMARY KEY,
  product_id integer NOT NULL,
  plan_key text NOT NULL,
  plan_name text NOT NULL,
  billing_cycle text,
  seat_model text,
  feature_profile jsonb NOT NULL DEFAULT '{}'::jsonb,
  position integer NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'DRAFT',
  canonical_path text NOT NULL,
  index_policy text NOT NULL DEFAULT 'CANONICAL_PARENT',
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS product_plans_product_key_idx ON product_plans(product_id, plan_key);
CREATE UNIQUE INDEX IF NOT EXISTS product_plans_canonical_path_idx ON product_plans(canonical_path);
CREATE INDEX IF NOT EXISTS product_plans_product_idx ON product_plans(product_id);

CREATE TABLE IF NOT EXISTS provider_fact_snapshots (
  id serial PRIMARY KEY,
  product_id integer NOT NULL,
  plan_id integer,
  fact_type text NOT NULL,
  value jsonb NOT NULL,
  source_url text NOT NULL,
  source_title text,
  content_hash text,
  status text NOT NULL DEFAULT 'VERIFIED',
  verified_at timestamptz NOT NULL,
  verified_by text NOT NULL,
  valid_from timestamptz,
  valid_until timestamptz,
  notes text,
  created_at timestamp NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS provider_facts_product_idx ON provider_fact_snapshots(product_id);
CREATE INDEX IF NOT EXISTS provider_facts_plan_idx ON provider_fact_snapshots(plan_id);
CREATE INDEX IF NOT EXISTS provider_facts_type_idx ON provider_fact_snapshots(fact_type);

CREATE TABLE IF NOT EXISTS commercial_offers (
  id serial PRIMARY KEY,
  product_id integer NOT NULL,
  plan_id integer,
  sku text NOT NULL UNIQUE,
  commercial_status text NOT NULL DEFAULT 'DRAFT',
  access_model text,
  price_bdt integer,
  billing_cycle text,
  availability text,
  stock_policy text,
  activation_method text,
  delivery_window text,
  payment_methods jsonb NOT NULL DEFAULT '[]'::jsonb,
  approved boolean NOT NULL DEFAULT false,
  approved_at timestamptz,
  approved_by text,
  approval_reference text,
  review_due_at timestamptz,
  suspended_at timestamptz,
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now(),
  CONSTRAINT commercial_offers_price_nonnegative CHECK (price_bdt IS NULL OR price_bdt >= 0)
);
CREATE INDEX IF NOT EXISTS commercial_offers_product_idx ON commercial_offers(product_id);
CREATE INDEX IF NOT EXISTS commercial_offers_plan_idx ON commercial_offers(plan_id);
CREATE INDEX IF NOT EXISTS commercial_offers_status_idx ON commercial_offers(commercial_status);

CREATE TABLE IF NOT EXISTS media_assets (
  id serial PRIMARY KEY,
  media_key text NOT NULL UNIQUE,
  kind text NOT NULL,
  mime_type text NOT NULL,
  source_kind text NOT NULL DEFAULT 'upload',
  original_uri text,
  public_uri text NOT NULL,
  width integer,
  height integer,
  file_size_bytes integer,
  duration_ms integer,
  poster_media_id integer,
  alt_en text,
  alt_bn text,
  caption_en text,
  caption_bn text,
  copyright_owner text,
  license_source_url text,
  checksum text,
  processing_status text NOT NULL DEFAULT 'READY',
  publication_status text NOT NULL DEFAULT 'DRAFT',
  offer_id integer,
  approved_at timestamptz,
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now(),
  CONSTRAINT media_dimensions_positive CHECK ((width IS NULL OR width > 0) AND (height IS NULL OR height > 0)),
  CONSTRAINT media_duration_nonnegative CHECK (duration_ms IS NULL OR duration_ms >= 0)
);
CREATE INDEX IF NOT EXISTS media_assets_kind_idx ON media_assets(kind);
CREATE INDEX IF NOT EXISTS media_assets_publication_idx ON media_assets(publication_status);
CREATE INDEX IF NOT EXISTS media_assets_offer_idx ON media_assets(offer_id);

CREATE TABLE IF NOT EXISTS entity_media (
  id serial PRIMARY KEY,
  media_id integer NOT NULL,
  entity_type text NOT NULL,
  entity_id integer NOT NULL,
  placement text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  is_primary boolean NOT NULL DEFAULT false,
  locale text NOT NULL DEFAULT 'en-BD',
  visibility text NOT NULL DEFAULT 'PUBLIC',
  created_at timestamp NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS entity_media_placement_idx ON entity_media(media_id, entity_type, entity_id, placement);
CREATE INDEX IF NOT EXISTS entity_media_entity_idx ON entity_media(entity_type, entity_id);

CREATE TABLE IF NOT EXISTS route_registry (
  id serial PRIMARY KEY,
  entity_type text NOT NULL,
  entity_id integer NOT NULL,
  canonical_path text NOT NULL UNIQUE,
  route_type text NOT NULL,
  index_policy text NOT NULL DEFAULT 'NOINDEX_REVIEW',
  locale text NOT NULL DEFAULT 'en-BD',
  active boolean NOT NULL DEFAULT true,
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS route_registry_entity_idx ON route_registry(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS route_registry_index_policy_idx ON route_registry(index_policy);

CREATE TABLE IF NOT EXISTS redirect_registry (
  id serial PRIMARY KEY,
  source_path text NOT NULL UNIQUE,
  destination_path text NOT NULL,
  status_code integer NOT NULL DEFAULT 308,
  active boolean NOT NULL DEFAULT true,
  reason text,
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now(),
  CONSTRAINT redirect_status_valid CHECK (status_code IN (301, 302, 307, 308)),
  CONSTRAINT redirect_not_self CHECK (source_path <> destination_path)
);
CREATE INDEX IF NOT EXISTS redirect_registry_destination_idx ON redirect_registry(destination_path);

CREATE TABLE IF NOT EXISTS verification_events (
  id serial PRIMARY KEY,
  entity_type text NOT NULL,
  entity_id integer NOT NULL,
  verification_type text NOT NULL,
  source_url text,
  result text NOT NULL,
  changes_detected jsonb NOT NULL DEFAULT '{}'::jsonb,
  verified_by text NOT NULL,
  verified_at timestamptz NOT NULL DEFAULT now(),
  next_review_at timestamptz
);
CREATE INDEX IF NOT EXISTS verification_events_entity_idx ON verification_events(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS verification_events_next_review_idx ON verification_events(next_review_at);

CREATE TABLE IF NOT EXISTS publication_revisions (
  id serial PRIMARY KEY,
  entity_type text NOT NULL,
  entity_id integer NOT NULL,
  revision integer NOT NULL,
  public_payload jsonb NOT NULL,
  source_hashes jsonb NOT NULL DEFAULT '{}'::jsonb,
  published_by text NOT NULL,
  published_at timestamptz NOT NULL DEFAULT now(),
  superseded_at timestamptz
);
CREATE UNIQUE INDEX IF NOT EXISTS publication_revisions_entity_revision_idx ON publication_revisions(entity_type, entity_id, revision);
CREATE INDEX IF NOT EXISTS publication_revisions_entity_idx ON publication_revisions(entity_type, entity_id);

COMMIT;
