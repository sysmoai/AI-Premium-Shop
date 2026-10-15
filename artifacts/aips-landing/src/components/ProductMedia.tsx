import { useEffect, useState } from "react";

// Runtime-rendered approved media slot for product pages.
// Reads /generated/media-catalog.json (built by scripts/generate-media-catalog.mjs
// from data/media/manifest.json). When no APPROVED asset is linked to this
// product slug, the component renders nothing — no placeholder, no layout
// shift, no fabricated imagery. Approved assets carry explicit dimensions,
// truthful alt text and the canonical media.aipremiumshop.com origin.

type MediaAsset = {
  id: string;
  mediaKey: string;
  kind: string;
  publicUri: string;
  mimeType: string;
  width: number | null;
  height: number | null;
  altEn: string;
  altBn: string;
  captionEn: string;
  captionBn: string;
};

type MediaLink = {
  mediaId: string;
  entityType: string;
  entityKey: string;
  placement: string;
  isPrimary: boolean;
  locale: string;
};

type MediaCatalog = {
  schema_version: number;
  assets: Record<string, MediaAsset>;
  links: MediaLink[];
};

export default function ProductMedia({ slug }: { slug: string }) {
  const [asset, setAsset] = useState<MediaAsset | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/generated/media-catalog.json", { headers: { Accept: "application/json" } })
      .then((response) => (response.ok ? response.json() : null))
      .then((catalog: MediaCatalog | null) => {
        if (!catalog || cancelled) return;
        const link = catalog.links.find(
          (entry) => entry.entityType === "product" && entry.entityKey === slug && entry.isPrimary,
        );
        if (link) setAsset(catalog.assets[link.mediaId] ?? null);
      })
      .catch(() => {
        // Media is an enhancement: a failed catalog fetch must never break
        // the product page itself.
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (!asset || !/^image\//.test(asset.mimeType)) return null;

  return (
    <figure className="mb-6">
      <img
        src={asset.publicUri}
        alt={asset.altEn || ""}
        width={asset.width ?? undefined}
        height={asset.height ?? undefined}
        loading="lazy"
        decoding="async"
        className="w-full max-w-2xl rounded-xl border border-white/10 object-cover"
      />
      {asset.captionEn ? <figcaption className="mt-2 text-xs text-slate-400">{asset.captionEn}</figcaption> : null}
    </figure>
  );
}
