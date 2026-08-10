import { CheckCircle2, ShieldCheck } from "lucide-react";
import { HomepageMediaRail } from "@/components/homepage/HomepageMediaRail";
import type { PublicHomepageView } from "@/lib/homepageV2";

interface HomepageAccessAndEvidenceProps {
  data: PublicHomepageView;
}

export function HomepageAccessAndEvidence({ data }: HomepageAccessAndEvidenceProps) {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8" data-testid="homepage-v2-access-models">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f4b942]/10 text-[#f4b942]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight">Understand the access model before you pay</h2>
            <p className="mt-4 leading-7 text-slate-300">Price is not enough. Homepage V2 makes the account/access arrangement a first-class buying fact.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {data.accessModels.map((model) => (
              <div key={model.id} className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                <h3 className="font-semibold text-white">{model.label}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{model.description}</p>
                {model.caution && (
                  <p className="mt-4 border-l-2 border-[#f4b942]/50 pl-3 text-xs leading-5 text-slate-400">{model.caution}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <HomepageMediaRail assets={data.media.demos} />

      {data.trustFacts.length > 0 && (
        <section className="border-y border-white/10 bg-[#0a1427]" data-testid="homepage-v2-evidence-strip">
          <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
            <div className="grid gap-4 md:grid-cols-3">
              {data.trustFacts.map((fact) => (
                <div key={fact.id} className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                  <CheckCircle2 className="h-5 w-5 text-[#f4b942]" />
                  <p className="mt-4 text-xs uppercase tracking-wide text-slate-400">{fact.label}</p>
                  <p className="mt-1 text-xl font-semibold text-white">{fact.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
