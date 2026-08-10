import { ArrowRight, CheckCircle2, MessageCircle, Search, ShieldCheck, Sparkles } from "lucide-react";
import { PrimaryBrandLogo } from "@/components/PrimaryBrandLogo";
import { SEOHead } from "@/components/SEOHead";
import { HOMEPAGE_V2 } from "@/generated/homepageV2";

const WHATSAPP_LINK = "https://wa.me/8801865385348";

function formatBDT(value: number | null) {
  if (value == null) return null;
  return `BDT ${value.toLocaleString("en-BD")}`;
}

function accessLabel(value: string | null) {
  if (!value) return "Access details on product page";
  const normalized = value.toLowerCase();
  if (normalized.includes("personal")) return "Personal";
  if (normalized.includes("shared")) return "Shared";
  return value;
}

export default function HomeV2() {
  const data = HOMEPAGE_V2;
  const commerceEnabled = data.publication.publicationAllowed && !data.publication.quarantine;

  return (
    <div className="min-h-screen bg-[#07101f] text-white" data-testid="homepage-v2-canary">
      <SEOHead
        title="Homepage V2 Preview — AI Premium Shop"
        description="Private noindex preview of the next AI Premium Shop homepage experience."
        canonical="https://aipremiumshop.com/"
        noindex
      />

      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#07101f]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
          <a href="/" aria-label="AI Premium Shop home">
            <PrimaryBrandLogo size="small" layout="horizontal" decorative />
          </a>
          <div className="flex items-center gap-2">
            <a
              href="/products"
              className="hidden rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/30 sm:inline-flex"
            >
              Browse tools
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[#19a55a] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#148c4c]"
            >
              <MessageCircle className="h-4 w-4" />
              Ask AIPS
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(244,185,66,0.12),transparent_32%),radial-gradient(circle_at_25%_80%,rgba(99,102,241,0.11),transparent_34%)]" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#f4b942]/30 bg-[#f4b942]/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#f4b942]">
                <Sparkles className="h-3.5 w-3.5" />
                Built for AI buyers in Bangladesh
              </div>
              <h1 className="max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl lg:text-6xl">
                Find the right AI tool. Pay locally. Know exactly what access you get.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                Compare AI tools by the work you need to do, understand Personal vs Shared access before paying, and move from research to the right product without sorting through the whole catalog yourself.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#finder"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#f4b942] px-6 py-3 font-bold text-[#07101f] transition hover:bg-[#ffc95f]"
                >
                  Find my AI tool
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="/products"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/15 px-6 py-3 font-semibold text-white transition hover:border-white/30"
                >
                  <Search className="h-4 w-4" />
                  Browse all tools
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-2 text-xs text-slate-300">
                {data.payments.map((payment) => (
                  <span key={payment.id} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">
                    {payment.label} payment
                  </span>
                ))}
                {data.catalog.productFamilies > 0 && (
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">
                    {data.catalog.productFamilies} public AI tool families
                  </span>
                )}
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">
                  Access type shown before purchase
                </span>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/20 sm:p-7">
              {data.media.hero ? (
                <img
                  src={data.media.hero.publicUri}
                  alt={data.media.hero.alt}
                  width={data.media.hero.width ?? undefined}
                  height={data.media.hero.height ?? undefined}
                  className="h-auto w-full rounded-2xl object-cover"
                />
              ) : (
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0d1930] p-6 sm:p-8">
                  <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#f4b942]/10 blur-3xl" aria-hidden="true" />
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#f4b942]">HP-HERO-01</p>
                  <h2 className="mt-3 text-2xl font-semibold">Hero media slot is ready</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    This canary is already wired for the governed hero asset. The final visual will be registered, approved and optimized before it can appear here.
                  </p>
                  <div className="mt-7 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
                    {["Research", "Coding", "Images", "Video", "Automation", "Local buying"].map((label) => (
                      <div key={label} className="rounded-xl border border-white/10 bg-white/[0.035] px-3 py-4 text-center text-slate-200">
                        {label}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section id="finder" className="mx-auto max-w-7xl px-4 py-20 md:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#f4b942]">Start with your job</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">What do you want AI to help you do?</h2>
            <p className="mt-4 text-slate-300">Choose a real job-to-be-done first. We narrow the catalog before asking you to compare products or prices.</p>
          </div>

          <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {data.finder.map((intent) => (
              <a
                key={intent.id}
                href={intent.href}
                className="group rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition hover:-translate-y-0.5 hover:border-[#f4b942]/35 hover:bg-white/[0.04]"
              >
                <h3 className="text-lg font-semibold text-white">{intent.label}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{intent.description}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#f4b942]">
                  See recommendations <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </a>
            ))}
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#0a1427]">
          <div className="mx-auto max-w-7xl px-4 py-20 md:px-8">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#f4b942]">Fast path</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Popular starting points</h2>
                <p className="mt-4 text-slate-300">Only data from the governed public projection enters these cards.</p>
              </div>
              <a href="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-[#f4b942]">
                View full catalog <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.recommendations.slice(0, 6).map((product) => (
                <article key={`${product.slug}-${product.tier ?? "default"}`} className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-400">{product.brand}</p>
                      <h3 className="mt-1 font-semibold text-white">{product.name}</h3>
                    </div>
                    <span className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-slate-300">
                      {accessLabel(product.accessType)}
                    </span>
                  </div>
                  <div className="mt-5 flex items-end justify-between gap-3 border-t border-white/10 pt-4">
                    <div>
                      <p className="text-xs text-slate-400">Current public state</p>
                      <p className="mt-1 text-lg font-bold text-[#f4b942]">
                        {product.requestPrice ? "Check current price" : formatBDT(product.price)}
                      </p>
                    </div>
                    <a href={product.href} className="inline-flex items-center gap-1 text-sm font-semibold text-white hover:text-[#f4b942]">
                      Details <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
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

        <section className="border-y border-white/10 bg-[#0a1427]">
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

        <section className="mx-auto max-w-4xl px-4 py-20 text-center md:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#f4b942]">Canary status</p>
          <h2 className="mt-3 text-3xl font-semibold">The structure is live in preview; the visual system comes next.</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-300">
            This route is deliberately noindex and isolated from the production homepage. The next milestone is the final hero art direction plus the interactive guided finder.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="#finder" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#f4b942] px-6 py-3 font-bold text-[#07101f]">
              Try the finder structure <ArrowRight className="h-4 w-4" />
            </a>
            {commerceEnabled && (
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/15 px-6 py-3 font-semibold text-white">
                <MessageCircle className="h-4 w-4" /> Ask on WhatsApp
              </a>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
