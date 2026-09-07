import type { HomepageMediaAsset } from "@/lib/homepageV2";

interface HomepageHeroMediaProps {
  asset: HomepageMediaAsset | null;
}

export function HomepageHeroMedia({ asset }: HomepageHeroMediaProps) {
  if (!asset) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0d1930] p-6 sm:p-8" data-testid="homepage-hero-media-placeholder">
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#f4b942]/10 blur-3xl" aria-hidden="true" />
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#f4b942]">A simpler way to choose</p>
        <h2 className="mt-3 text-2xl font-semibold">Start with the job, not the brand name.</h2>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          Narrow the catalog by what you need to do, the access model you prefer and your budget. Then open the relevant product page to review the current options before you pay.
        </p>
        <div className="mt-7 grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
          {[
            { title: "1. Pick the task", note: "Study, code, create, research or automate." },
            { title: "2. Compare access", note: "Check Personal, Shared, Bundle or Setup options." },
            { title: "3. Confirm the plan", note: "Review the current product details before payment." },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-white/10 bg-white/[0.035] px-4 py-4">
              <p className="font-semibold text-white">{item.title}</p>
              <p className="mt-1 text-xs leading-5 text-slate-400">{item.note}</p>
            </div>
          ))}
        </div>
        <a
          href="#finder"
          className="mt-6 inline-flex min-h-11 items-center rounded-xl border border-[#f4b942]/30 bg-[#f4b942]/10 px-4 py-2.5 text-sm font-bold text-[#ffd26f] transition hover:border-[#f4b942]/55 hover:bg-[#f4b942]/15"
        >
          Use the AI tool finder
        </a>
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
