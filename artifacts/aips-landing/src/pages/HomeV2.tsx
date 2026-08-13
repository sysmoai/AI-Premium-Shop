import { useEffect, useState } from "react";
import { ArrowRight, MessageCircle, Search, Sparkles } from "lucide-react";
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
  { href: "/products", label: "Products" },
  { href: "/guides", label: "Guides" },
  { href: "/pricing", label: "Pricing" },
  { href: "/support", label: "Support" },
  { href: "/bn", label: "বাংলা" },
] as const;

function formatBDT(value: number | null) {
  if (value == null) return null;
  return `BDT ${value.toLocaleString("en-BD")}`;
}

export default function HomeV2() {
  const data = HOMEPAGE_V2;
  const commerceEnabled = data.publication.publicationAllowed && !data.publication.quarantine;
  const minPrice = commerceEnabled ? formatBDT(data.catalog.minPrice) : null;
  const [cookieConsent, setCookieConsent] = useState(false);
  const pathname = typeof window === "undefined" ? "/" : window.location.pathname;
  const isPreview = pathname === HOMEPAGE_V2_PREVIEW_PATH || pathname === `${HOMEPAGE_V2_PREVIEW_PATH}/`;

  useEffect(() => {
    trackHomepageEvent({
      name: "homepage_view",
      publication_mode: data.publication.mode,
      commerce_enabled: commerceEnabled,
    });
  }, [commerceEnabled, data.publication.mode]);

  return (
    <div className="min-h-screen bg-[#07101f] text-white" data-testid="homepage-v2">
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
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-[#f4b942] focus:px-4 focus:py-3 focus:font-bold focus:text-[#07101f]"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#07101f]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
          <a href="/" aria-label="AI Premium Shop home" className="shrink-0">
            <PrimaryBrandLogo size="small" layout="horizontal" decorative />
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((item) => (
              <a key={item.href} href={item.href} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/[0.05] hover:text-white">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="/products"
              className="hidden rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/30 sm:inline-flex lg:hidden"
            >
              Browse tools
            </a>
            {commerceEnabled ? (
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackHomepageEvent({ name: "homepage_whatsapp_click", placement: "header" })}
                className="inline-flex items-center gap-2 rounded-lg bg-[#19a55a] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#148c4c]"
              >
                <MessageCircle className="h-4 w-4" />
                Ask AIPS
              </a>
            ) : (
              <a href="/support" className="inline-flex rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-white">
                Support
              </a>
            )}
          </div>
        </div>
      </header>

      <main id="main-content" tabIndex={-1}>
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(244,185,66,0.12),transparent_32%),radial-gradient(circle_at_25%_80%,rgba(99,102,241,0.11),transparent_34%)]" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#f4b942]/30 bg-[#f4b942]/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#f4b942]">
                <Sparkles className="h-3.5 w-3.5" />
                Built for AI buyers in {data.identity.market}
              </div>

              <h1 className="max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl lg:text-6xl">
                Find the right AI tool. Pay locally. Know exactly what access you get.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                Compare AI tools by the work you need to do, understand the access arrangement before paying, and move from research to the right product without sorting through the whole catalog yourself.
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

              <div className="mt-8 flex flex-wrap gap-2 text-xs text-slate-300" aria-label="Current public catalog facts">
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
                {data.catalog.publicPlans > 0 && (
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">
                    {data.catalog.publicPlans} public plan records
                  </span>
                )}
                {minPrice && (
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">
                    Public prices from {minPrice}
                  </span>
                )}
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">
                  Access model is part of the comparison
                </span>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/20 sm:p-7">
              <HomepageHeroMedia asset={data.media.hero} />
            </div>
          </div>
        </section>

        <HomepageDiscovery data={data} commerceEnabled={commerceEnabled} />
        <HomepageAccessAndEvidence data={data} />
        <HomepageEditorial spotlight={data.editorialSpotlight} campaigns={data.campaigns} />
        <HomepageDecisionSupport data={data} commerceEnabled={commerceEnabled} whatsappHref={WHATSAPP_LINK} />
      </main>

      <footer className="border-t border-white/10 bg-[#040912]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 text-sm text-slate-400 md:flex-row md:items-center md:justify-between md:px-8">
          <p>{data.identity.name} · {data.identity.market}</p>
          <nav aria-label="Policy links" className="flex flex-wrap gap-x-5 gap-y-2">
            <a href="/privacy-policy" className="hover:text-white">Privacy</a>
            <a href="/terms" className="hover:text-white">Terms</a>
            <a href="/refund-policy" className="hover:text-white">Refund policy</a>
            <a href="/contact" className="hover:text-white">Contact</a>
          </nav>
        </div>
      </footer>

      <CookieBanner onConsent={() => setCookieConsent(true)} />
      <GoogleAnalytics enabled={cookieConsent} />
      <FacebookPixel enabled={cookieConsent} />
      <HomepageAnalyticsBridge enabled={cookieConsent} />
    </div>
  );
}