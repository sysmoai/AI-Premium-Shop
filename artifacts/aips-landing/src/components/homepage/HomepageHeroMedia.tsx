import type { HomepageMediaAsset } from "@/lib/homepageV2";

interface HomepageHeroMediaProps {
  asset: HomepageMediaAsset | null;
}

export function HomepageHeroMedia({ asset }: HomepageHeroMediaProps) {
  if (!asset) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0d1930] p-6 sm:p-8" data-testid="homepage-hero-media-placeholder">
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#f4b942]/10 blur-3xl" aria-hidden="true" />
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#f4b942]">HP-HERO-01</p>
        <h2 className="mt-3 text-2xl font-semibold">Hero media slot is ready</h2>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          The final asset will enter through the approved media registry. Until then, this preview keeps the exact production layout without inventing a visual.
        </p>
        <div className="mt-7 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
          {["Research", "Coding", "Images", "Video", "Automation", "Local buying"].map((label) => (
            <div key={label} className="rounded-xl border border-white/10 bg-white/[0.035] px-3 py-4 text-center text-slate-200">
              {label}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (asset.mimeType.startsWith("video/")) {
    return (
      <figure data-testid="homepage-hero-media" className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d1930]">
        <video
          src={asset.publicUri}
          poster={asset.posterUri ?? undefined}
          controls
          playsInline
          preload="metadata"
          aria-label={asset.alt || asset.caption || "AI Premium Shop homepage demonstration"}
          className="aspect-[5/4] w-full object-cover"
        />
        {asset.caption && <figcaption className="border-t border-white/10 px-4 py-3 text-xs leading-5 text-slate-400">{asset.caption}</figcaption>}
      </figure>
    );
  }

  return (
    <figure data-testid="homepage-hero-media" className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d1930]">
      <img
        src={asset.publicUri}
        alt={asset.alt}
        width={asset.width ?? undefined}
        height={asset.height ?? undefined}
        loading="eager"
        fetchPriority="high"
        className="aspect-[5/4] h-auto w-full object-cover"
      />
      {asset.caption && <figcaption className="border-t border-white/10 px-4 py-3 text-xs leading-5 text-slate-400">{asset.caption}</figcaption>}
    </figure>
  );
}
