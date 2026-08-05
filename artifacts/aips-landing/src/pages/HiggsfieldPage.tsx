// Dedicated page for /product/higgsfield-ai-bangladesh.
//
// This does NOT use the generic ProductPage template, for two reasons that are
// both compliance rather than styling:
//
//   1. ProductPage hardcodes "10,000+ customers since 2022", "30-day warranty"
//      and "Instant delivery" into its trust bar and AIO paragraph. Those are
//      unverified claims (see docs/compliance/higgsfield-offer-review.md) and
//      must not appear on a page whose whole position is that we only publish
//      what we can evidence.
//   2. The offer needs sections the generic template has no slot for — credit
//      economics, what is still unverified, who owns the account.
//
// Every fact below is read from data/higgsfield-offer.json and gated by
// scripts/validate-higgsfield-offer.mjs at build time. Do not type a price, a
// credit count, or a model name into this file — the validator fails the build
// if you do.

import { useState } from "react";
import { Link } from "wouter";
import {
  MessageCircle, ChevronRight, Check, X, ChevronDown, ShieldQuestion,
  UserCheck, Wallet, Video, HelpCircle, AlertTriangle, ArrowRight, Info,
} from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { PaymentBadges } from "@/components/PaymentBadges";
import { productPath } from "@/lib/productRoutes";
import { formatBDT } from "@/lib/format";
import offer from "../../data/higgsfield-offer.json";
import productsData from "../../data/products.json";

const WHATSAPP = "https://wa.me/8801865385348";
const CARD = { backgroundColor: "#151b3d" };
const MUTED = { color: "#c9ceda" };

const { compliance, platform, credits, payment, process: steps, faq, related, seo } = offer;
const o = offer.offer;
const pending = offer.pendingVerification.items;

/** Section heading + optional lede, so every block has one consistent shape. */
function Section({ id, title, lede, children }: {
  id: string; title: string; lede?: string; children: React.ReactNode;
}) {
  return (
    <section id={id} className="mb-14 scroll-mt-24">
      <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
      {lede && <p className="mb-6 leading-relaxed max-w-3xl" style={MUTED}>{lede}</p>}
      {children}
    </section>
  );
}

export default function HiggsfieldPage() {
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  // The WhatsApp prefill carries product, plan intent, the indicative price and
  // the page URL — no personal data, per spec section 18.
  const waText =
    `Hi, I'm asking about ${platform.vendor} AI via AI Premium Shop.\n` +
    `Plan: 1 month · Indicative: ${formatBDT(o.priceBDT)}\n` +
    `Page: ${offer.canonical}\n` +
    `What I want to make: `;
  const waLink = `${WHATSAPP}?text=${encodeURIComponent(waText)}`;

  // Alternatives are resolved against the live catalog so a renamed or removed
  // product cannot leave a dead link here.
  const allProducts = (productsData as any).products as any[];
  const alternatives = related.alternatives
    .map((a) => {
      const recs = allProducts.filter((p) => p.slug === a.slug);
      if (!recs.length) return null;
      const prices = recs.map((r) => r.price).filter((n) => typeof n === "number");
      return {
        slug: a.slug,
        why: a.why,
        name: recs[0].name.split(/—\s*/)[0].trim(),
        from: prices.length ? Math.min(...prices) : null,
      };
    })
    .filter(Boolean) as { slug: string; why: string; name: string; from: number | null }[];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://aipremiumshop.com/" },
        { "@type": "ListItem", position: 2, name: "AI Video", item: `https://aipremiumshop.com${related.categoryPath}` },
        { "@type": "ListItem", position: 3, name: `${platform.vendor} AI` },
      ],
    },
    {
      // No Offer node. The compliance state is inquiry-only, so emitting a
      // priced Offer would be structured data that contradicts the visible
      // page — exactly what spec section 16 forbids.
      "@context": "https://schema.org",
      "@type": ["Product", "SoftwareApplication"],
      name: `${platform.vendor} AI`,
      description: platform.summary,
      applicationCategory: "AI video generation",
      operatingSystem: "Web",
      brand: { "@type": "Brand", name: platform.vendor },
      dateModified: o.priceVerifiedOn,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <PageLayout>
      <SEOHead
        title={seo.title}
        description={seo.metaDescription}
        canonical={offer.canonical}
        ogImage={seo.ogImage}
        jsonLd={jsonLd as any}
      />

      <div className="max-w-6xl mx-auto px-4 pt-6 pb-24">
        <nav aria-label="breadcrumb" className="flex items-center gap-2 text-sm mb-6 flex-wrap" style={MUTED}>
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href={related.categoryPath} className="hover:text-white transition-colors">AI Video</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-white">{platform.vendor} AI</span>
        </nav>

        {/* ---- Hero: what it is, what it costs, who owns it, and the caveat --- */}
        <div className="grid lg:grid-cols-[1fr_360px] gap-8 mb-14 items-start">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-3">{seo.h1}</h1>
            <p className="text-lg leading-relaxed mb-5" style={MUTED}>{platform.summary}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {[
                { icon: UserCheck, text: "Account stays in your name" },
                { icon: Wallet, text: "bKash / Nagad — no international card" },
                { icon: Video, text: "Free Google Meet setup walkthrough" },
              ].map(({ icon: Icon, text }) => (
                <span key={text} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                  style={{ backgroundColor: "rgba(16,185,129,0.12)", color: "#10b981", border: "1px solid rgba(16,185,129,0.25)" }}>
                  <Icon className="w-3.5 h-3.5" /> {text}
                </span>
              ))}
            </div>
            <PaymentBadges />
          </div>

          {/* Inquiry box. Deliberately not a checkout — compliance category F. */}
          <div className="lg:sticky lg:top-24 rounded-2xl border p-6"
            style={{ ...CARD, borderColor: "rgba(244,185,66,0.3)" }}>
            <div className="text-sm mb-1" style={MUTED}>Indicative price · 1 month</div>
            <div className="text-3xl font-bold text-white mb-1">{formatBDT(o.priceBDT)}</div>
            <div className="text-xs mb-4 leading-relaxed" style={MUTED}>{o.priceNote}</div>

            <a href={waLink} target="_blank" rel="noopener noreferrer"
              data-analytics="higgsfield-whatsapp-cta"
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-base transition-opacity hover:opacity-90 mb-3"
              style={{ backgroundColor: "#008236", color: "#fff", minHeight: "48px" }}>
              <MessageCircle className="w-5 h-5" /> Check current price
            </a>
            <div className="text-[11px] leading-relaxed text-center" style={{ color: "#8b93a8" }}>
              Enquiry only — no payment is taken on this site.
            </div>
          </div>
        </div>

        {/* ---- Disclaimer, high on the page rather than buried in a footer ---- */}
        <div className="rounded-2xl border p-5 mb-14 flex items-start gap-3"
          style={{ backgroundColor: "rgba(244,185,66,0.06)", borderColor: "rgba(244,185,66,0.25)" }}>
          <Info className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#f4b942" }} />
          <div>
            <div className="font-semibold text-white mb-1 text-sm">Independent service</div>
            <p className="text-sm leading-relaxed" style={MUTED}>{compliance.disclaimer}</p>
          </div>
        </div>

        <Section id="account" title="Who owns the account"
          lede={o.accountOwnershipNote}>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: "Account owner", value: "You" },
              { label: "Renewal controlled by", value: "You, directly with the vendor" },
              { label: "Cancellation controlled by", value: "You, directly with the vendor" },
            ].map((r) => (
              <div key={r.label} className="rounded-xl border border-white/10 p-4" style={CARD}>
                <div className="text-xs mb-1" style={MUTED}>{r.label}</div>
                <div className="font-semibold text-white text-sm">{r.value}</div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="capabilities" title="What the platform does"
          lede={`Verified against ${platform.vendor}'s own published material on ${platform.verifiedOn}.`}>
          <ul className="grid sm:grid-cols-2 gap-3">
            {platform.capabilities.map((cap) => (
              <li key={cap} className="flex items-start gap-2.5 rounded-xl border border-white/10 p-4 text-sm text-white" style={CARD}>
                <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#10b981" }} /> {cap}
              </li>
            ))}
          </ul>
          <p className="text-xs mt-4" style={{ color: "#8b93a8" }}>
            Source: <a href={platform.sourceUrl} target="_blank" rel="noopener noreferrer nofollow"
              className="underline hover:text-white">{platform.sourceUrl}</a> · verified {platform.verifiedOn}
          </p>
        </Section>

        <Section id="credits" title="How the credit system works"
          lede={credits.explainer}>
          <div className="rounded-2xl border border-white/10 p-6" style={CARD}>
            <h3 className="font-bold text-white mb-3 text-sm">Ask us these before you pay</h3>
            <ul className="space-y-2">
              {credits.questionsToAsk.map((q) => (
                <li key={q} className="flex items-start gap-2.5 text-sm" style={MUTED}>
                  <HelpCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#f4b942" }} /> {q}
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* ---- The section most competitors will not publish ---------------- */}
        <Section id="unverified" title="What we have not verified"
          lede="These were supplied to us as selling points. We have not confirmed them against current vendor documentation or the account interface, so they are listed as open questions rather than features. If any of them is the reason you are buying, ask us to confirm it in writing first.">
          <div className="space-y-3">
            {pending.map((p) => (
              <div key={p.claim} className="rounded-xl border p-4 flex items-start gap-3"
                style={{ backgroundColor: "rgba(239,68,68,0.05)", borderColor: "rgba(239,68,68,0.2)" }}>
                <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#ef4444" }} />
                <div>
                  <div className="font-semibold text-white text-sm mb-1">{p.claim}</div>
                  <p className="text-sm" style={MUTED}>{p.why}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="use-cases" title="What people use it for">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {platform.useCases.map((u) => (
              <div key={u.title} className="rounded-xl border border-white/10 p-5" style={CARD}>
                <h3 className="font-semibold text-white text-sm mb-2">{u.title}</h3>
                <p className="text-sm leading-relaxed" style={MUTED}>{u.body}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="not-for" title="Who should not buy this">
          <ul className="space-y-2.5 max-w-3xl">
            {platform.notSuitableFor.map((n) => (
              <li key={n} className="flex items-start gap-2.5 text-sm" style={MUTED}>
                <X className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#ef4444" }} /> {n}
              </li>
            ))}
          </ul>
        </Section>

        <Section id="process" title="How it works"
          lede={`Payment methods: ${payment.methods.join(", ")}. ${payment.note}`}>
          <ol className="space-y-3">
            {steps.map((s, i) => (
              <li key={s.step} className="flex items-start gap-4 rounded-xl border border-white/10 p-5" style={CARD}>
                <span className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
                  style={{ backgroundColor: "rgba(244,185,66,0.15)", color: "#f4b942" }}>{i + 1}</span>
                <div>
                  <h3 className="font-semibold text-white text-sm mb-1">{s.step}</h3>
                  <p className="text-sm leading-relaxed" style={MUTED}>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="alternatives" title="Alternatives in AI Video"
          lede="If the unverified items above matter to your use case, these have published tier pricing today.">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {alternatives.map((a) => (
              <Link key={a.slug} href={productPath(a.slug)}
                className="rounded-xl border border-white/10 p-5 block hover:border-white/25 transition-colors" style={CARD}>
                <div className="font-semibold text-white text-sm mb-1">{a.name}</div>
                {a.from != null && (
                  <div className="text-sm font-bold mb-2" style={{ color: "#f4b942" }}>from {formatBDT(a.from)}/mo</div>
                )}
                <p className="text-xs leading-relaxed" style={MUTED}>{a.why}</p>
              </Link>
            ))}
          </div>
          <Link href={related.categoryPath}
            className="inline-flex items-center gap-2 mt-6 text-sm font-semibold hover:opacity-80 transition-opacity"
            style={{ color: "#f4b942" }}>
            Compare every AI video tool <ArrowRight className="w-4 h-4" />
          </Link>
        </Section>

        <Section id="faq" title="Frequently asked questions">
          <div className="space-y-3">
            {faq.map((f, i) => (
              <div key={f.q} className="rounded-xl border border-white/10 overflow-hidden" style={CARD}>
                <button onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  aria-expanded={faqOpen === i}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left">
                  <span className="font-medium text-white text-sm">{f.q}</span>
                  <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform ${faqOpen === i ? "rotate-180" : ""}`} style={MUTED} />
                </button>
                {faqOpen === i && (
                  <div className="px-5 pb-4 text-sm leading-relaxed" style={MUTED}>{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </Section>

        {/* ---- Provenance footer: how to check us ------------------------- */}
        <div className="rounded-2xl border border-white/10 p-6 text-sm" style={CARD}>
          <div className="flex items-start gap-3 mb-3">
            <ShieldQuestion className="w-5 h-5 flex-shrink-0" style={{ color: "#f4b942" }} />
            <h2 className="font-bold text-white">How this page is verified</h2>
          </div>
          <ul className="space-y-1.5" style={MUTED}>
            <li>Platform capabilities verified {platform.verifiedOn} against <a href={platform.sourceUrl} target="_blank" rel="noopener noreferrer nofollow" className="underline hover:text-white">{platform.sourceUrl}</a>.</li>
            <li>Service price attested by AI Premium Shop on {o.priceVerifiedOn}. It is our fee, not the vendor's list price.</li>
            <li>{pending.length} supplied claims remain unverified and are listed above rather than presented as features.</li>
            <li>Offer status: <span className="text-white font-medium">{compliance.status}</span> — no checkout is enabled on this page.</li>
          </ul>
          <p className="mt-4 text-xs" style={{ color: "#8b93a8" }}>{compliance.disclaimer}</p>
        </div>
      </div>
    </PageLayout>
  );
}
