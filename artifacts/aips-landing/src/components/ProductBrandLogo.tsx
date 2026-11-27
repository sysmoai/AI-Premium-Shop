import { useEffect, useState, type ReactNode } from "react";

// Provider logo for a product page header, taken only from the approved media
// registry (/generated/media-catalog.json, built from data/media/manifest.json).
// A link with entityType "product" and placement "logo" opts a product in.
// Until an approved logo is found and has loaded, the fallback is shown, and a
// failed image load falls back too: the page never shows a broken image.

type MediaAsset = { publicUri: string; mimeType: string; width: number | null; height: number | null; altEn: string };
type MediaLink = { mediaId: string; entityType: string; entityKey: string; placement: string };
type MediaCatalog = { assets: Record<string, MediaAsset>; links: MediaLink[] };

const DISPLAY_HEIGHT = 28;

export default function ProductBrandLogo({ slug, fallback }: { slug: string; fallback: ReactNode }) {
  const [asset, setAsset] = useState<MediaAsset | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setAsset(null);
    setFailed(false);
    fetch("/generated/media-catalog.json", { headers: { Accept: "application/json" } })
      .then((response) => (response.ok ? response.json() : null))
      .then((catalog: MediaCatalog | null) => {
        if (!catalog || cancelled) return;
        const link = catalog.links.find((entry) => entry.entityType === "product" && entry.entityKey === slug && entry.placement === "logo");
        const found = link ? catalog.assets[link.mediaId] : null;
        if (found && /^image\//.test(found.mimeType) && found.width && found.height) setAsset(found);
      })
      .catch(() => {
        // The logo is an enhancement; the fallback stays in place.
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (!asset || failed) return <>{fallback}</>;

  // The file is shown unaltered: natural proportions, no filters, on the plain page background.
  const width = Math.round((DISPLAY_HEIGHT * (asset.width ?? 1)) / (asset.height ?? 1));
  return (
    <img
      src={asset.publicUri}
      alt={asset.altEn}
      width={width}
      height={DISPLAY_HEIGHT}
      decoding="async"
      onError={() => setFailed(true)}
      data-testid="product-brand-logo"
      className="block shrink-0"
      style={{ height: DISPLAY_HEIGHT, width }}
    />
  );
}
