// /bn — the Bangla homepage.
//
// Every word on this page comes from data/bn-homepage.json, which
// scripts/prerender-products.mjs ALSO renders into the static HTML. That is the
// point: before this, the static body and the React render were different
// content, which is precisely the drift this codebase keeps getting bitten by
// (CLAUDE.md records the same wrong-price bug recurring six times from typed
// literals). Catalog figures arrive as {{TOKEN}} placeholders and are
// substituted here from catalogStats — never typed.
//
// The outstanding native-speaker review (docs/agent/BLOCKERS.md B7) is a review
// of that one JSON file, not of this component.

import { Link } from "wouter";
import { MessageCircle, ArrowRight, Check, X, AlertTriangle, Info } from "lucide-react";
import { MIN_PRICE, TOTAL_PRODUCTS } from "@/lib/catalogStats";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { PaymentBadges } from "@/components/PaymentBadges";
import { ORG_SCHEMA, WEBSITE_SCHEMA, breadcrumbSchema } from "@/utils/schemas";
import bn from "../../data/bn-homepage.json";

const BN_DIGITS = "০১২৩৪৫৬৭৮৯";
const bnNum = (n: number | string) => String(n).replace(/[0-9]/g, (d) => BN_DIGITS[Number(d)]);

/** Substitutes the catalog tokens the JSON leaves for build/render time. */
const sub = (t: string) =>
  t.replace(/\{\{TOTAL_PRODUCTS\}\}/g, bnNum(TOTAL_PRODUCTS))
   .replace(/\{\{MIN_PRICE\}\}/g, bnNum(MIN_PRICE));

const CARD = { backgroundColor: "#151b3d" };
const MUTED = { color: "#c9ceda" };

function Section({ id, title, lede, children }: {
  id: string; title: string; lede?: string; children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-reveal mb-16 scroll-mt-24">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{title}</h2>
      {lede && <p className="mb-8 leading-relaxed max-w-3xl text-base" style={MUTED}>{lede}</p>}
      {children}
    </section>
  );
}

export default function BanglaBN() {
  useScrollReveal();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: bn.faq.items.map((f) => ({
      "@type": "Question",
      name: sub(f.q),
      acceptedAnswer: { "@type": "Answer", text: sub(f.a) },
    })),
  };

  return (
    <PageLayout>
      <SEOHead
        title={sub(bn.seo.title)}
        description={sub(bn.seo.description)}
        canonical={bn.canonical}
        lang={bn.lang}
        hreflang={{ "bn-BD": "/bn", "en-BD": "/", "x-default": "/" }}
        jsonLd={[ORG_SCHEMA, WEBSITE_SCHEMA, breadcrumbSchema([{ name: "বাংলা" }, { name: "হোম" }]), faqJsonLd] as any}
      />

      <div className="max-w-6xl mx-auto px-4 pt-8 pb-24">
        {/* ---- Hero ---- */}
        <header className="mb-14">
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-5">{sub(bn.seo.h1)}</h1>
          <p className="text-lg leading-relaxed max-w-3xl mb-7" style={MUTED}>{sub(bn.hero.sub)}</p>

          <ul className="flex flex-wrap gap-2 mb-7 list-none p-0">
            {bn.hero.trustItems.map((t) => (
              <li key={t} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                style={{ backgroundColor: "rgba(16,185,129,0.12)", color: "#10b981", border: "1px solid rgba(16,185,129,0.25)" }}>
                <Check className="w-3.5 h-3.5 flex-shrink-0" /> {sub(t)}
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-3 mb-7">
            <a href={bn.hero.primaryCta.href} target="_blank" rel="noopener noreferrer"
              data-analytics="bn-hero-primary"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#008236", color: "#fff", minHeight: "48px" }}>
              <MessageCircle className="w-5 h-5" /> {bn.hero.primaryCta.label}
            </a>
            <Link href={bn.hero.secondaryCta.href}
              data-analytics="bn-hero-secondary"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold border border-white/15 hover:border-white/30 transition-colors text-white"
              style={{ minHeight: "48px" }}>
              {bn.hero.secondaryCta.label} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <PaymentBadges />
        </header>

        {/* ---- Independent-provider disclaimer, above the fold-ish ---- */}
        <div className="rounded-2xl border p-5 mb-16 flex items-start gap-3"
          style={{ backgroundColor: "rgba(244,185,66,0.06)", borderColor: "rgba(244,185,66,0.25)" }}>
          <Info className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#f4b942" }} />
          <p className="text-sm leading-relaxed" style={MUTED}>{sub(bn.disclaimer)}</p>
        </div>

        {/* ---- Which tool for which job ---- */}
        <Section id="chooser" title={sub(bn.chooser.h2)} lede={sub(bn.chooser.intro)}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {bn.chooser.jobs.map((j) => (
              <Link key={j.title} href={j.category}
                className="rounded-2xl border border-white/10 p-5 block hover:border-white/25 transition-colors" style={CARD}>
                <h3 className="font-bold text-white mb-2">{sub(j.title)}</h3>
                <p className="text-sm leading-relaxed mb-3" style={MUTED}>{sub(j.body)}</p>
                <span className="text-xs font-semibold inline-flex items-center gap-1" style={{ color: "#f4b942" }}>
                  সব টুল দেখুন <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
          <p className="text-sm leading-relaxed rounded-xl border border-white/10 p-5" style={{ ...CARD, ...MUTED }}>
            {sub(bn.chooser.creditNote)}
          </p>
        </Section>

        {/* ---- Audiences ---- */}
        <Section id="audiences" title={sub(bn.audiences.h2)}>
          <div className="grid md:grid-cols-2 gap-4">
            {bn.audiences.cards.map((c) => (
              <div key={c.title} className="rounded-2xl border border-white/10 p-6" style={CARD}>
                <h3 className="font-bold text-white text-lg mb-4">{sub(c.title)}</h3>
                <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "#ef4444" }}>যেসব সমস্যায় পড়েন</p>
                <ul className="space-y-1.5 mb-4">
                  {c.problems.map((x) => (
                    <li key={x} className="flex items-start gap-2 text-sm" style={MUTED}>
                      <X className="w-3.5 h-3.5 mt-1 flex-shrink-0" style={{ color: "#ef4444" }} /> {sub(x)}
                    </li>
                  ))}
                </ul>
                <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "#10b981" }}>যা করতে পারবেন</p>
                <ul className="space-y-1.5 mb-4">
                  {c.outcomes.map((x) => (
                    <li key={x} className="flex items-start gap-2 text-sm" style={MUTED}>
                      <Check className="w-3.5 h-3.5 mt-1 flex-shrink-0" style={{ color: "#10b981" }} /> {sub(x)}
                    </li>
                  ))}
                </ul>
                <p className="text-xs leading-relaxed mb-4 rounded-lg p-3" style={{ backgroundColor: "rgba(239,68,68,0.06)", color: "#c9ceda" }}>
                  {sub(c.caution)}
                </p>
                <Link href={c.href} className="text-sm font-semibold inline-flex items-center gap-1.5 hover:opacity-80" style={{ color: "#f4b942" }}>
                  {sub(c.title)}দের জন্য বিস্তারিত <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </Section>

        {/* ---- Plan-type transparency ---- */}
        <Section id="plan-types" title={sub(bn.planTypes.h2)} lede={sub(bn.planTypes.intro)}>
          <div className="overflow-x-auto rounded-2xl border border-white/10" style={CARD}>
            <table className="w-full text-sm border-collapse min-w-[520px]">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
                  <th className="text-left py-3.5 px-4 font-semibold text-white">বিষয়</th>
                  <th className="text-left py-3.5 px-4 font-semibold" style={{ color: "#10b981" }}>নিজের নামের অ্যাকাউন্ট</th>
                  <th className="text-left py-3.5 px-4 font-semibold" style={{ color: "#f4b942" }}>শেয়ার্ড অ্যাকাউন্ট</th>
                </tr>
              </thead>
              <tbody>
                {bn.planTypes.rows.map((r) => (
                  <tr key={r.feature} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <td className="py-3 px-4 text-white font-medium">{sub(r.feature)}</td>
                    <td className="py-3 px-4" style={MUTED}>{sub(r.personal)}</td>
                    <td className="py-3 px-4" style={MUTED}>{sub(r.shared)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 rounded-xl border p-5 flex items-start gap-3"
            style={{ backgroundColor: "rgba(239,68,68,0.06)", borderColor: "rgba(239,68,68,0.25)" }}>
            <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#ef4444" }} />
            <p className="text-sm leading-relaxed" style={MUTED}>{sub(bn.planTypes.warning)}</p>
          </div>
        </Section>

        {/* ---- How it works ---- */}
        <Section id="how" title={sub(bn.howItWorks.h2)}>
          <ol className="space-y-3 list-none p-0">
            {bn.howItWorks.steps.map((s, i) => (
              <li key={s.title} className="flex items-start gap-4 rounded-xl border border-white/10 p-5" style={CARD}>
                <span className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
                  style={{ backgroundColor: "rgba(244,185,66,0.15)", color: "#f4b942" }}>{bnNum(i + 1)}</span>
                <div>
                  <h3 className="font-semibold text-white mb-1">{sub(s.title)}</h3>
                  <p className="text-sm leading-relaxed" style={MUTED}>{sub(s.body)}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        {/* ---- FAQ. Rendered open: these are the objections that block a sale,
                and hiding them behind an accordion hides them from readers who
                never click. ---- */}
        <Section id="faq" title={sub(bn.faq.h2)}>
          <div className="space-y-3">
            {bn.faq.items.map((f) => (
              <details key={f.q} className="rounded-xl border border-white/10 overflow-hidden group" style={CARD} open>
                <summary className="px-5 py-4 font-medium text-white text-sm cursor-pointer list-none marker:hidden">
                  {sub(f.q)}
                </summary>
                <p className="px-5 pb-4 text-sm leading-relaxed" style={MUTED}>{sub(f.a)}</p>
              </details>
            ))}
          </div>
        </Section>

        {/* ---- Final CTA ---- */}
        <section className="scroll-reveal rounded-2xl border p-8 text-center"
          style={{ ...CARD, borderColor: "rgba(244,185,66,0.3)" }}>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{sub(bn.finalCta.h2)}</h2>
          <p className="leading-relaxed max-w-2xl mx-auto mb-6" style={MUTED}>{sub(bn.finalCta.body)}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={bn.finalCta.primary.href} target="_blank" rel="noopener noreferrer"
              data-analytics="bn-final-cta"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#008236", color: "#fff", minHeight: "48px" }}>
              <MessageCircle className="w-5 h-5" /> {bn.finalCta.primary.label}
            </a>
            <Link href={bn.finalCta.secondary.href}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold border border-white/15 hover:border-white/30 transition-colors text-white"
              style={{ minHeight: "48px" }}>
              {bn.finalCta.secondary.label} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <nav className="mt-8 flex flex-wrap gap-x-4 gap-y-2 justify-center text-sm">
            {bn.footerLinks.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-white transition-colors" style={MUTED}>
                {sub(l.label)}
              </Link>
            ))}
          </nav>
        </section>
      </div>
    </PageLayout>
  );
}
