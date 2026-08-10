import { ArrowRight, CalendarDays, Megaphone } from "lucide-react";
import type { HomepageCampaign, HomepageEditorialSpotlight } from "@/lib/homepageV2";
import { trackHomepageEvent } from "@/lib/homepageAnalytics";

function formatDate(value: string) {
  const parsed = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return value;
  return new Intl.DateTimeFormat("en-BD", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(parsed);
}

interface HomepageEditorialProps {
  spotlight: HomepageEditorialSpotlight | null;
  campaigns: HomepageCampaign[];
}

export function HomepageEditorial({ spotlight, campaigns }: HomepageEditorialProps) {
  if (!spotlight && campaigns.length === 0) return null;

  return (
    <section className="border-y border-white/10 bg-[#081426]" data-testid="homepage-v2-editorial">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        {campaigns.length > 0 && (
          <div className="mb-10 grid gap-4 lg:grid-cols-2" data-testid="homepage-v2-campaigns">
            {campaigns.map((campaign) => (
              <article key={`${campaign.id}-${campaign.revision}`} className="rounded-3xl border border-[#f4b942]/25 bg-[#f4b942]/[0.07] p-6 sm:p-7">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#f4b942]">
                  <Megaphone className="h-4 w-4" />
                  {campaign.eyebrow}
                </div>
                <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white">{campaign.headline}</h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">{campaign.body}</p>
                <p className="mt-4 text-xs text-slate-400">
                  Campaign window: {new Date(campaign.startsAt).toLocaleDateString("en-BD")} – {new Date(campaign.endsAt).toLocaleDateString("en-BD")}
                </p>
                <a href={campaign.href} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#f4b942]">
                  {campaign.ctaLabel} <ArrowRight className="h-4 w-4" />
                </a>
              </article>
            ))}
          </div>
        )}

        {spotlight && (
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start" data-testid="homepage-v2-editorial-spotlight">
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.05] text-[#f4b942]">
                <CalendarDays className="h-5 w-5" />
              </div>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-[#f4b942]">{spotlight.eyebrow}</p>
              <p className="mt-2 text-xs leading-5 text-slate-400">Reviewed for this homepage through {formatDate(spotlight.reviewAfter)}</p>
            </div>

            <article>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{spotlight.title}</h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300">{spotlight.summary}</p>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-400">
                <span>As of {formatDate(spotlight.asOf)}</span>
                <span>Revision {spotlight.revision}</span>
                <span>{spotlight.sourceKind.replaceAll("_", " ").toLowerCase()}</span>
              </div>
              <a
                href={spotlight.href}
                onClick={() => trackHomepageEvent({ name: "homepage_guide_click", placement: "editorial", guide_id: spotlight.id })}
                className="mt-7 inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-[#f4b942]/40 hover:text-[#f4b942]"
              >
                {spotlight.ctaLabel} <ArrowRight className="h-4 w-4" />
              </a>
            </article>
          </div>
        )}
      </div>
    </section>
  );
}
