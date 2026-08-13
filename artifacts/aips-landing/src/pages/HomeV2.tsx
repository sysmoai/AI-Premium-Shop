import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  Check,
  ChevronRight,
  Code2,
  GraduationCap,
  Menu,
  MessageCircle,
  Search,
  ShieldCheck,
  Sparkles,
  Store,
  Users,
  WandSparkles,
  X,
  Zap,
} from "lucide-react";
import { CookieBanner } from "@/components/CookieBanner";
import { FacebookPixel } from "@/components/FacebookPixel";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { PrimaryBrandLogo } from "@/components/PrimaryBrandLogo";
import { SEOHead } from "@/components/SEOHead";
import { HomepageAccessAndEvidence } from "@/components/homepage/HomepageAccessAndEvidence";
import { HomepageAnalyticsBridge } from "@/components/homepage/HomepageAnalyticsBridge";
import { HomepageDecisionSupport } from "@/components/homepage/HomepageDecisionSupport";
import { HomepageDiscovery } from "@/components/homepage/HomepageDiscovery";
import { HomepageEditorial } from "@/components/homepage/HomepageEditorial";
import { HomepageHeroMedia } from "@/components/homepage/HomepageHeroMedia";
import { HOMEPAGE_V2 } from "@/generated/homepageV2";
import { trackHomepageEvent } from "@/lib/homepageAnalytics";

const WHATSAPP_LINK = "https://wa.me/8801865385348";
const HOMEPAGE_V2_PREVIEW_PATH = "/__preview/homepage-v2";

const NAV_LINKS = [
  { href: "/products", label: "All tools" },
  { href: "/pricing", label: "Pricing" },
  { href: "/guides", label: "Guides" },
  { href: "/support", label: "Support" },
  { href: "/bn", label: "বাংলা" },
] as const;

const USE_CASES = [
  { href: "/best-ai-for-students", label: "Study & research", icon: GraduationCap, note: "Learn, summarize, cite, prepare" },
  { href: "/best-ai-for-freelancers", label: "Freelancing", icon: Users, note: "Proposals, delivery, client work" },
  { href: "/best-ai-for-creators", label: "Content & video", icon: WandSparkles, note: "Create, edit, publish faster" },
  { href: "/best-ai-for-developers", label: "Coding & apps", icon: Code2, note: "Build, debug, automate" },
  { href: "/best-ai-for-business", label: "Business & agents", icon: Bot, note: "Operations, workflows, growth" },
  { href: "/products", label: "Explore everything", icon: Store, note: "Compare the complete catalog" },
] as const;

function formatBDT(value: number | null) {
  if (value == null) return null;
  return `BDT ${value.toLocaleString("en-BD")}`;
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function CatalogPulse({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] p-4 backdrop-blur-xl">
      <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-[#f4b942]/10 blur-2xl" aria-hidden="true" />
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className="mt-1 text-xl font-bold tracking-tight text-white">{value}</p>
      <p className="mt-1 text-xs leading-5 text-slate-400">{note}</p>
    </div>
  );
}

export default function HomeV2() {
  const data = HOMEPAGE_V2;
  const reducedMotion = useReducedMotion();
  const commerceEnabled = data.publication.publicationAllowed && !data.publication.quarantine;
  const minPrice = commerceEnabled ? formatBDT(data.catalog.minPrice) : null;
  const [cookieConsent, setCookieConsent] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = typeof window === "undefined" ? "/" : window.location.pathname;
  const isPreview = pathname === HOMEPAGE_V2_PREVIEW_PATH || pathname === `${HOMEPAGE_V2_PREVIEW_PATH}/`;

  const tickerItems = useMemo(() => [
    `${data.catalog.productFamilies} AI tool families`,
    `${data.catalog.publicPlans} public plan records`,
    ...data.payments.map((payment) => `${payment.label} payment`),
    "Personal · Shared · Bundle · Setup access models",
    "Bangladesh-first buying guidance",
  ], [data.catalog.productFamilies, data.catalog.publicPlans, data.payments]);

  useEffect(() => {
    trackHomepageEvent({
      name: "homepage_view",
      publication_mode: data.publication.mode,
      commerce_enabled: commerceEnabled,
    });
  }, [commerceEnabled, data.publication.mode]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#050912] text-white" data-testid="homepage-v2">
      <SEOHead
        title={isPreview ? "Homepage V2 Preview — AI Premium Shop" : "AI Premium Shop — Find the Right AI Tool in Bangladesh"}
        description={isPreview
          ? "Private noindex preview of the next AI Premium Shop homepage experience."
          : "Find and compare AI tools for study, freelancing, coding, content and business. Understand access models, pay locally in Bangladesh and choose from the current public AIPS catalog."}
        canonical="https://aipremiumshop.com/"
        noindex={isPreview}
      />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-[#f4b942] focus:px-4 focus:py-3 focus:font-bold focus:text-[#07101f]"
      >
        Skip to main content
      </a>

      <div className="border-b border-white/10 bg-[#080d18]">
        <div className="relative mx-auto flex max-w-7xl items-center justify-center overflow-hidden px-4 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-300 md:text-xs">
          <span className="mr-2 inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,.9)]" />
          Live catalog · compare access before you pay · local payment in Bangladesh
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050912]/80 backdrop-blur-2xl supports-[backdrop-filter]:bg-[#050912]/70">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
          <a href="/" aria-label="AI Premium Shop home" className="shrink-0">
            <PrimaryBrandLogo size="small" layout="horizontal" decorative />
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((item) => (
              <a key={item.href} href={item.href} className="rounded-xl px-3.5 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/[0.06] hover:text-white">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href="/products" className="hidden rounded-xl border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-[#f4b942]/50 hover:bg-[#f4b942]/5 sm:inline-flex">
              Browse tools
            </a>
            {commerceEnabled ? (
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackHomepageEvent({ name: "homepage_whatsapp_click", placement: "header" })}
                className="inline-flex items-center gap-2 rounded-xl bg-[#19a55a] px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-950/30 transition hover:-translate-y-0.5 hover:bg-[#20b965]"
              >
                <MessageCircle className="h-4 w-4" />
                Ask AIPS
              </a>
            ) : (
              <a href="/support" className="inline-flex rounded-xl border border-white/15 px-4 py-2 text-sm font-semibold text-white">Support</a>
            )}
            <button
              type="button"
              aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((open) => !open)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white lg:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav aria-label="Mobile" className="border-t border-white/10 bg-[#070c16] px-4 py-4 lg:hidden">
            <div className="mx-auto grid max-w-7xl gap-1">
              {NAV_LINKS.map((item) => (
                <a key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-white/[0.05]">
                  {item.label}<ChevronRight className="h-4 w-4 text-slate-500" />
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main id="main-content" tabIndex={-1}>
        <section className="relative isolate overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,#050912_0%,#07111f_55%,#08101b_100%)]" />
          <div className="absolute inset-0 -z-10 opacity-70 [background-image:linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:linear-gradient(to_bottom,black,transparent_92%)]" aria-hidden="true" />
          <motion.div
            aria-hidden="true"
            className="absolute -left-20 top-24 -z-10 h-72 w-72 rounded-full bg-indigo-500/20 blur-[110px]"
            animate={reducedMotion ? undefined : { x: [0, 45, 0], y: [0, -25, 0], scale: [1, 1.14, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden="true"
            className="absolute right-[-8rem] top-[-3rem] -z-10 h-[28rem] w-[28rem] rounded-full bg-[#f4b942]/15 blur-[120px]"
            animate={reducedMotion ? undefined : { x: [0, -40, 0], y: [0, 35, 0], scale: [1, 1.12, 1] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-16 md:px-8 lg:grid-cols-[1.03fr_0.97fr] lg:pb-24 lg:pt-24">
            <div className="relative z-10">
              <Reveal>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#f4b942]/25 bg-[#f4b942]/10 px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#ffd26f] shadow-[0_0_28px_rgba(244,185,66,.08)]">
                  <Sparkles className="h-3.5 w-3.5" />
                  Bangladesh&apos;s AI buying command center
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <h1 className="max-w-4xl text-[2.75rem] font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-[4.5rem]">
                  Find the right AI tool. Pay locally. Know exactly what access you get.
                </h1>
              </Reveal>

              <Reveal delay={0.14}>
                <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
                  Stop guessing between hundreds of AI subscriptions. Start with the work you want to do, compare the access model, see the current public options, and move to the right product with less friction.
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#finder"
                    onClick={() => trackHomepageEvent({ name: "homepage_finder_click", placement: "hero" })}
                    className="group inline-flex min-h-13 items-center justify-center gap-2 rounded-2xl bg-[#f4b942] px-6 py-3.5 font-extrabold text-[#07101f] shadow-[0_16px_55px_rgba(244,185,66,.2)] transition hover:-translate-y-0.5 hover:bg-[#ffd167]"
                  >
                    Find my AI tool
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                  <a
                    href="/products"
                    className="group inline-flex min-h-13 items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/[0.035] px-6 py-3.5 font-semibold text-white backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.065]"
                  >
                    <Search className="h-4 w-4" />
                    Browse all tools
                  </a>
                </div>
              </Reveal>

              <Reveal delay={0.26}>
                <div className="mt-7 grid max-w-2xl grid-cols-1 gap-2 text-sm text-slate-300 sm:grid-cols-3">
                  {[
                    [ShieldCheck, "Access model shown"],
                    [BadgeCheck, "Catalog-backed details"],
                    [Zap, "Local buying path"],
                  ].map(([Icon, label]) => {
                    const IconComponent = Icon as typeof ShieldCheck;
                    return (
                      <div key={String(label)} className="flex items-center gap-2 rounded-xl border border-white/8 bg-white/[0.025] px-3 py-2.5">
                        <IconComponent className="h-4 w-4 text-emerald-400" />
                        <span>{String(label)}</span>
                      </div>
                    );
                  })}
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.12} className="relative">
              <div className="absolute inset-x-8 -top-8 h-24 rounded-full bg-[#f4b942]/10 blur-3xl" aria-hidden="true" />
              <motion.div
                className="relative rounded-[30px] border border-white/12 bg-white/[0.055] p-3 shadow-[0_35px_120px_rgba(0,0,0,.45)] backdrop-blur-2xl sm:p-4"
                animate={reducedMotion ? undefined : { y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="mb-3 flex items-center justify-between px-2 pt-1 text-xs text-slate-400">
                  <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-400" />AIPS discovery view</span>
                  <span>Live catalog</span>
                </div>
                <div className="overflow-hidden rounded-[24px] border border-white/8 bg-[#07101f]">
                  <HomepageHeroMedia asset={data.media.hero} />
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <CatalogPulse label="Catalog" value={`${data.catalog.productFamilies} tools`} note="Organized by real use case" />
                  <CatalogPulse label="Plans" value={`${data.catalog.publicPlans} records`} note="Compare access before buying" />
                </div>
              </motion.div>

              {!reducedMotion && (
                <motion.div
                  aria-hidden="true"
                  className="absolute -right-3 top-16 hidden rounded-2xl border border-white/10 bg-[#0c1524]/90 p-3 shadow-xl backdrop-blur-xl sm:block"
                  animate={{ y: [0, 10, 0], rotate: [0, 1.5, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="flex items-center gap-2 text-xs font-semibold text-white"><Check className="h-4 w-4 text-emerald-400" />Access clarity</div>
                  <p className="mt-1 text-[11px] text-slate-400">Personal · Shared · Bundle · Setup</p>
                </motion.div>
              )}
            </Reveal>
          </div>

          <div className="border-t border-white/8 bg-black/10 py-3">
            <div className="relative overflow-hidden">
              <motion.div
                className="flex w-max items-center gap-8 whitespace-nowrap pl-8 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400"
                animate={reducedMotion ? undefined : { x: [0, -520] }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              >
                {[...tickerItems, ...tickerItems].map((item, index) => (
                  <span key={`${item}-${index}`} className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#f4b942]" />{item}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        <section className="relative border-b border-white/10 bg-[#07101a] px-4 py-16 md:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#f4b942]">Start with the outcome</p>
                  <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">What do you want AI to help you do?</h2>
                </div>
                <p className="max-w-md text-sm leading-6 text-slate-400">Choose your work first. We route you into a narrower comparison instead of forcing you to understand every AI brand.</p>
              </div>
            </Reveal>

            <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {USE_CASES.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Reveal key={item.href + item.label} delay={Math.min(index * 0.05, 0.2)}>
                    <a href={item.href} className="group relative flex min-h-36 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#f4b942]/35 hover:bg-white/[0.065] hover:shadow-[0_22px_70px_rgba(0,0,0,.25)]">
                      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#f4b942]/0 blur-2xl transition group-hover:bg-[#f4b942]/10" aria-hidden="true" />
                      <div className="flex w-full items-start justify-between gap-4">
                        <div>
                          <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#0d1726] text-[#f4b942]">
                            <Icon className="h-5 w-5" />
                          </div>
                          <h3 className="text-lg font-bold text-white">{item.label}</h3>
                          <p className="mt-1.5 text-sm text-slate-400">{item.note}</p>
                        </div>
                        <ArrowRight className="mt-1 h-4 w-4 text-slate-600 transition group-hover:translate-x-1 group-hover:text-[#f4b942]" />
                      </div>
                    </a>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <div id="finder" className="scroll-mt-24">
          <HomepageDiscovery data={data} commerceEnabled={commerceEnabled} />
        </div>

        <Reveal><HomepageAccessAndEvidence data={data} /></Reveal>

        <section className="border-y border-white/10 bg-[radial-gradient(circle_at_50%_0%,rgba(244,185,66,.08),transparent_36%),#050912] px-4 py-16 md:px-8 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <Reveal>
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-slate-300">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  Buy with context
                </div>
                <h2 className="mt-5 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">A cheaper price is not useful if you misunderstand the access.</h2>
                <p className="mt-4 max-w-xl text-base leading-7 text-slate-400">The homepage is designed to surface the buying model early—so Personal, Shared, Bundle and Setup or Service options are decisions, not surprises after payment.</p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ["Personal", "Dedicated access where the product record says so."],
                  ["Shared", "Shared access is labeled before you choose a plan."],
                  ["Bundle", "Multiple tools grouped into one commercial offer."],
                  ["Setup / Service", "AIPS performs a setup or implementation service."],
                ].map(([title, copy]) => (
                  <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                    <div className="flex items-center gap-2 text-sm font-bold text-white"><Check className="h-4 w-4 text-[#f4b942]" />{title}</div>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{copy}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <Reveal><HomepageEditorial spotlight={data.editorialSpotlight} campaigns={data.campaigns} /></Reveal>
        <Reveal><HomepageDecisionSupport data={data} commerceEnabled={commerceEnabled} whatsappHref={WHATSAPP_LINK} /></Reveal>

        <section className="relative overflow-hidden border-t border-white/10 bg-[#07101a] px-4 py-16 md:px-8 lg:py-20">
          <div className="absolute left-1/2 top-0 h-64 w-[44rem] -translate-x-1/2 rounded-full bg-[#f4b942]/8 blur-[100px]" aria-hidden="true" />
          <Reveal className="relative mx-auto max-w-5xl rounded-[30px] border border-white/10 bg-white/[0.045] p-6 text-center shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-10 lg:p-12">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#f4b942]/25 bg-[#f4b942]/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-[#ffd26f]">
              <Sparkles className="h-3.5 w-3.5" /> Need help choosing?
            </div>
            <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">Tell us the work. We&apos;ll help narrow the tool.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-400">Use the catalog yourself, or ask AIPS on WhatsApp with your use case, budget and preferred access model.</p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              {commerceEnabled && (
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" onClick={() => trackHomepageEvent({ name: "homepage_whatsapp_click", placement: "final_cta" })} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#19a55a] px-6 py-3 font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#20b965]">
                  <MessageCircle className="h-5 w-5" /> Ask AIPS on WhatsApp
                </a>
              )}
              <a href="/products" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-white/15 px-6 py-3 font-semibold text-white transition hover:border-white/30 hover:bg-white/[0.05]">
                Explore the catalog <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#03060c]">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
          <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
            <div>
              <PrimaryBrandLogo size="small" layout="horizontal" decorative />
              <p className="mt-4 max-w-md text-sm leading-6 text-slate-500">AI tool discovery, comparison and local buying guidance for Bangladesh.</p>
            </div>
            <nav aria-label="Policy links" className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-400">
              <a href="/privacy-policy" className="hover:text-white">Privacy</a>
              <a href="/terms" className="hover:text-white">Terms</a>
              <a href="/refund-policy" className="hover:text-white">Refund policy</a>
              <a href="/contact" className="hover:text-white">Contact</a>
              <a href="/bn" className="hover:text-white">বাংলা</a>
            </nav>
          </div>
          <div className="mt-8 flex flex-col gap-2 border-t border-white/8 pt-5 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between">
            <p>{data.identity.name} · {data.identity.market}</p>
            <p>Catalog facts and access details should be checked on the relevant product page before purchase.</p>
          </div>
        </div>
      </footer>

      <CookieBanner onConsent={() => setCookieConsent(true)} />
      <GoogleAnalytics enabled={cookieConsent} />
      <FacebookPixel enabled={cookieConsent} />
      <HomepageAnalyticsBridge enabled={cookieConsent} />
    </div>
  );
}