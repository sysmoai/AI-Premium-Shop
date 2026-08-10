import type { HomepageMediaAsset } from "@/lib/homepageV2";

const PLANNED_SLOTS = [
  { id: "HP-DEMO-01", label: "Research assistant" },
  { id: "HP-DEMO-02", label: "Image creation" },
  { id: "HP-DEMO-03", label: "AI video" },
  { id: "HP-DEMO-04", label: "Coding workflow" },
  { id: "HP-DEMO-05", label: "Automation" },
];

interface HomepageMediaRailProps {
  assets: HomepageMediaAsset[];
}

export function HomepageMediaRail({ assets }: HomepageMediaRailProps) {
  const visibleAssets = assets.slice(0, 5);

  return (
    <section className="border-y border-white/10 bg-[#0a1427]" data-testid="homepage-media-rail">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#f4b942]">See the workflows</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">See what these AI tools actually do</h2>
          <p className="mt-4 leading-7 text-slate-300">
            Short demonstrations make the capability tangible before you compare plans. Media loads only from approved registry records and remains optional to understanding the page.
          </p>
        </div>

        {visibleAssets.length > 0 ? (
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
                  {asset.caption || asset.alt || "Approved AI workflow media"}
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="mt-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-5" data-testid="homepage-demo-placeholders">
            {PLANNED_SLOTS.map((slot) => (
              <div key={slot.id} className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#f4b942]">{slot.id}</p>
                <p className="mt-3 font-semibold text-white">{slot.label}</p>
                <p className="mt-2 text-xs leading-5 text-slate-400">Awaiting an approved poster/video asset. No placeholder claim or fake UI is published.</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
