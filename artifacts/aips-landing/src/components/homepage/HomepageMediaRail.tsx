import type { HomepageMediaAsset } from "@/lib/homepageV2";
import { trackHomepageEvent } from "@/lib/homepageAnalytics";

interface HomepageMediaRailProps {
  assets: HomepageMediaAsset[];
}

export function HomepageMediaRail({ assets }: HomepageMediaRailProps) {
  const visibleAssets = assets.slice(0, 5);

  // An empty media rail adds no customer value and previously exposed internal
  // production placeholders. Keep the section absent until genuine approved
  // media exists; the rest of the homepage remains fully understandable.
  if (visibleAssets.length === 0) return null;

  return (
    <section className="border-y border-white/10 bg-[#0a1427]" data-testid="homepage-media-rail">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#f4b942]">See the workflows</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">See what these AI tools actually do</h2>
          <p className="mt-4 leading-7 text-slate-300">
            Short approved demonstrations can make the capability easier to understand before you compare plans. The page remains useful even when no demonstration is available.
          </p>
        </div>

        <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleAssets.map((asset) => (
            <figure key={asset.id} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025]" data-testid={`homepage-demo-${asset.id}`}>
              {asset.mimeType.startsWith("video/") ? (
                <video
                  src={asset.publicUri}
                  poster={asset.posterUri ?? undefined}
                  controls
                  playsInline
                  preload="none"
                  onPlay={() => trackHomepageEvent({ name: "homepage_demo_play", media_id: asset.id })}
                  aria-label={asset.alt || asset.caption || "AI workflow demonstration"}
                  className="aspect-video w-full bg-black object-cover"
                />
              ) : (
                <img
                  src={asset.publicUri}
                  alt={asset.alt}
                  width={asset.width ?? undefined}
                  height={asset.height ?? undefined}
                  loading="lazy"
                  className="aspect-video h-auto w-full object-cover"
                />
              )}
              <figcaption className="border-t border-white/10 px-4 py-3 text-sm leading-6 text-slate-300">
                {asset.caption || asset.alt || "AI workflow demonstration"}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
