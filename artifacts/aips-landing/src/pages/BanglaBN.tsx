// /bn — the Bangla homepage.
//
// CONTENT: every word comes from data/bn-homepage.json, which
// scripts/prerender-products.mjs also renders into the static HTML. seo-check
// fails the build if this file stops importing it. Catalog figures arrive as
// {{TOKEN}} placeholders and are substituted here from catalogStats — never
// typed. The native-speaker review (BLOCKERS B7) is a review of that JSON.
//
// DESIGN: editorial, not storefront. What this business actually sells is
// judgement — "which tool should you buy, and what are you really getting" — so
// the page is built like an advisory report: Bengali-numeral section indices,
// hairline rules, a strong type hierarchy, and gold as an accent rather than a
// fill. Bangla is set in Anek Bangla (typography block in index.css); Latin
// product names stay in Inter, because a Bengali face renders them wrong.

import { Link } from "wouter";
import {
  MessageCircle, ArrowRight, ArrowUpRight, Check, X, AlertTriangle,
  ShieldCheck, Wallet, Users, Sparkles,
} from "lucide-react";
import { MIN_PRICE, TOTAL_PRODUCTS } from "@/lib/catalogStats";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { PaymentBadges } from "@/components/PaymentBadges";
import { ORG_SCHEMA, WEBSITE_SCHEMA, breadcrumbSchema } from "@/utils/schemas";
import bn from "../../data/bn-homepage.json";

const BN_DIGITS = "০১২৩৪৫৬৭৮৯";
const bnNum = (n: number | string) => String(n).replace(/[0-9]/g, (d) => BN_DIGITS[Number(d)]);
const idx = (n: number) => bnNum(String(n).padStart(2, "0"));

const sub = (t: string) =>
  t.replace(/\{\{TOTAL_PRODUCTS\}\}/g, bnNum(TOTAL_PRODUCTS))
   .replace(/\{\{MIN_PRICE\}\}/g, bnNum(MIN_PRICE));

const MUTED = { color: "#c9ceda" };
const DIM = { color: "#8b93a8" };

/** Numbered editorial section head: index numeral, rule, title, optional lede. */
function SectionHead({ n, title, lede }: { n: number; title: string; lede?: string }) {
  return (
    <div className="mb-10">
      <div className="flex items-baseline gap-5 mb-3">
        <span className="bn-index" aria-hidden="true">{idx(n)}</span>
        <h2 className="text-2xl md:text-[2.1rem] font-bold text-white flex-1 leading-tight">{title}</h2>
      </div>
      <hr className="bn-rule mb-5" />
      {lede && <p className="max-w-3xl text-base md:text-lg" style={MUTED}>{lede}</p>}
    </div>
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

      <div className="bn-atmosphere">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 pt-10 pb-24">

          {/* ══ HERO ══════════════════════════════════════════════════════ */}
          <header className="bn-rise mb-20 md:mb-28">
            <p className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-7"
              style={{ backgroundColor: "rgba(244,185,66,0.1)", color: "#f4b942", border: "1px solid rgba(244,185,66,0.22)" }}>
              <Sparkles className="w-3.5 h-3.5" />
              AI সাবস্ক্রিপশন পরামর্শ ও সেটআপ — বাংলাদেশ
            </p>

            <h1 className="text-[2.1rem] sm:text-5xl md:text-[3.9rem] font-bold text-white mb-7"
              style={{ lineHeight: 1.18, letterSpacing: "-0.02em", maxWidth: "17ch" }}>
              {sub(bn.seo.h1)}
            </h1>

            <p className="text-lg md:text-xl max-w-2xl mb-9" style={MUTED}>{sub(bn.hero.sub)}</p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <a href={bn.hero.primaryCta.href} target="_blank" rel="noopener noreferrer"
                data-analytics="bn-hero-primary"
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl font-bold text-base transition-all hover:-translate-y-0.5"
                style={{ backgroundColor: "#008236", color: "#fff", minHeight: "52px", boxShadow: "0 12px 30px -14px rgba(0,130,54,0.9)" }}>
                <MessageCircle className="w-5 h-5" />
                {bn.hero.primaryCta.label}
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <Link href={bn.hero.secondaryCta.href}
                data-analytics="bn-hero-secondary"
                className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold border transition-colors text-white"
                style={{ minHeight: "52px", borderColor: "rgba(255,255,255,0.16)" }}>
                {bn.hero.secondaryCta.label}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Trust items as an editorial checklist rather than pill badges —
                five short claims read faster in two columns than wrapped chips. */}
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5 mb-10 list-none p-0 max-w-3xl">
              {bn.hero.trustItems.map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-sm" style={MUTED}>
                  <Check className="w-4 h-4 mt-1 flex-shrink-0" style={{ color: "#10b981" }} />
                  {sub(t)}
                </li>
              ))}
            </ul>

            <PaymentBadges />
          </header>

          {/* ══ DISCLAIMER — a signed editorial note, not a warning banner ══ */}
          <aside className="mb-20 md:mb-24 pl-5 md:pl-7 border-l-2" style={{ borderColor: "rgba(244,185,66,0.5)" }}>
            <p className="text-xs font-bold uppercase tracking-[0.16em] mb-2.5" style={{ color: "#f4b942" }}>
              স্বচ্ছতার নোট
            </p>
            {/* pr-* keeps the last line clear of the fixed WhatsApp/chat buttons. */}
            <p className="text-sm md:text-[0.95rem] max-w-3xl pr-16 sm:pr-20" style={MUTED}>
              {sub(bn.disclaimer)}
            </p>
          </aside>

          {/* ══ ০১ — WHICH TOOL ═══════════════════════════════════════════ */}
          <section className="scroll-reveal mb-20 md:mb-24">
            <SectionHead n={1} title={sub(bn.chooser.h2)} lede={sub(bn.chooser.intro)} />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-7">
              {bn.chooser.jobs.map((j, i) => (
                <Link key={j.title} href={j.category} className="bn-card p-6 block group">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-bold text-white text-lg leading-snug">{sub(j.title)}</h3>
                    <span className="text-xs font-semibold pt-1" style={DIM}>{idx(i + 1)}</span>
                  </div>
                  <p className="text-sm mb-5" style={MUTED}>{sub(j.body)}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: "#f4b942" }}>
                    টুলগুলো দেখুন
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>

            <div className="bn-card p-6 md:p-7 flex items-start gap-4">
              <Wallet className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: "#f4b942" }} />
              <div>
                <h3 className="font-bold text-white mb-1.5">ক্রেডিট আসলে কী</h3>
                <p className="text-sm" style={MUTED}>{sub(bn.chooser.creditNote)}</p>
              </div>
            </div>
          </section>

          {/* ══ ০২ — AUDIENCES ════════════════════════════════════════════ */}
          <section className="scroll-reveal mb-20 md:mb-24">
            <SectionHead n={2} title={sub(bn.audiences.h2)} />
            <div className="grid md:grid-cols-2 gap-4">
              {bn.audiences.cards.map((c) => (
                <article key={c.title} className="bn-card p-6 md:p-7">
                  <div className="flex items-center gap-2.5 mb-5">
                    <Users className="w-4 h-4 flex-shrink-0" style={{ color: "#f4b942" }} />
                    <h3 className="font-bold text-white text-lg">{sub(c.title)}</h3>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4 mb-5">
                    <div>
                      <p className="text-[0.7rem] font-bold uppercase tracking-[0.12em] mb-2.5" style={{ color: "#ef4444" }}>
                        যে সমস্যায় পড়েন
                      </p>
                      <ul className="space-y-2 list-none p-0">
                        {c.problems.map((x) => (
                          <li key={x} className="flex items-start gap-2 text-[0.86rem]" style={MUTED}>
                            <X className="w-3.5 h-3.5 mt-1 flex-shrink-0" style={{ color: "#ef4444", opacity: 0.75 }} />
                            {sub(x)}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-[0.7rem] font-bold uppercase tracking-[0.12em] mb-2.5" style={{ color: "#10b981" }}>
                        যা করতে পারবেন
                      </p>
                      <ul className="space-y-2 list-none p-0">
                        {c.outcomes.map((x) => (
                          <li key={x} className="flex items-start gap-2 text-[0.86rem]" style={MUTED}>
                            <Check className="w-3.5 h-3.5 mt-1 flex-shrink-0" style={{ color: "#10b981" }} />
                            {sub(x)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <p className="text-xs border-t pt-4 mb-4" style={{ ...DIM, borderColor: "rgba(255,255,255,0.08)" }}>
                    {sub(c.caution)}
                  </p>
                  <Link href={c.href} className="text-sm font-semibold inline-flex items-center gap-1.5 group" style={{ color: "#f4b942" }}>
                    বিস্তারিত <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </article>
              ))}
            </div>
          </section>

          {/* ══ ০৩ — PLAN TYPES ═══════════════════════════════════════════ */}
          <section className="scroll-reveal mb-20 md:mb-24">
            <SectionHead n={3} title={sub(bn.planTypes.h2)} lede={sub(bn.planTypes.intro)} />

            <div className="bn-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse min-w-[560px]">
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
                      <th className="text-left py-4 px-5 font-semibold text-xs uppercase tracking-[0.1em]" style={DIM}>বিষয়</th>
                      <th className="text-left py-4 px-5 font-bold" style={{ color: "#10b981" }}>নিজের নামের অ্যাকাউন্ট</th>
                      <th className="text-left py-4 px-5 font-bold" style={{ color: "#f4b942" }}>শেয়ার্ড অ্যাকাউন্ট</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bn.planTypes.rows.map((r, i) => (
                      <tr key={r.feature}
                        style={{
                          borderBottom: i === bn.planTypes.rows.length - 1 ? "none" : "1px solid rgba(255,255,255,0.055)",
                          backgroundColor: i % 2 ? "rgba(255,255,255,0.014)" : "transparent",
                        }}>
                        <td className="py-3.5 px-5 text-white font-medium">{sub(r.feature)}</td>
                        <td className="py-3.5 px-5" style={MUTED}>{sub(r.personal)}</td>
                        <td className="py-3.5 px-5" style={MUTED}>{sub(r.shared)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-4 rounded-2xl p-6 flex items-start gap-4"
              style={{ backgroundColor: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.26)" }}>
              <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#ef4444" }} />
              <p className="text-sm" style={{ color: "#e8c9c9" }}>{sub(bn.planTypes.warning)}</p>
            </div>
          </section>

          {/* ══ ০৪ — HOW IT WORKS ═════════════════════════════════════════ */}
          <section className="scroll-reveal mb-20 md:mb-24">
            <SectionHead n={4} title={sub(bn.howItWorks.h2)} />
            <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 list-none p-0">
              {bn.howItWorks.steps.map((s, i) => (
                <li key={s.title} className="bn-card p-6">
                  <span className="block text-3xl font-bold mb-4" style={{ color: "#f4b942", opacity: 0.3 }}>
                    {idx(i + 1)}
                  </span>
                  <h3 className="font-bold text-white mb-2 leading-snug">{sub(s.title)}</h3>
                  <p className="text-sm" style={MUTED}>{sub(s.body)}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* ══ ০৫ — FAQ ══════════════════════════════════════════════════ */}
          <section className="scroll-reveal mb-20 md:mb-24">
            <SectionHead n={5} title={sub(bn.faq.h2)} />
            {/* Rendered open, not in an accordion: these are the objections that
                decide a purchase — including the one stating that no written
                vendor authorization exists — and an accordion hides them from
                every reader who does not click. */}
            <div className="grid md:grid-cols-2 gap-4">
              {bn.faq.items.map((f) => (
                <div key={f.q} className="bn-card p-6">
                  <h3 className="font-bold text-white mb-2.5 leading-snug">{sub(f.q)}</h3>
                  <p className="text-sm" style={MUTED}>{sub(f.a)}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ══ FINAL CTA ═════════════════════════════════════════════════ */}
          <section className="scroll-reveal relative overflow-hidden rounded-3xl p-8 md:p-14 text-center"
            style={{
              background: "linear-gradient(155deg, rgba(244,185,66,0.13) 0%, rgba(21,27,61,0.6) 42%, rgba(16,185,129,0.1) 100%), #12183a",
              border: "1px solid rgba(244,185,66,0.28)",
            }}>
            <ShieldCheck className="w-9 h-9 mx-auto mb-5" style={{ color: "#f4b942" }} />
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4" style={{ lineHeight: 1.25 }}>
              {sub(bn.finalCta.h2)}
            </h2>
            <p className="max-w-2xl mx-auto mb-9 text-base md:text-lg" style={MUTED}>{sub(bn.finalCta.body)}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
              <a href={bn.finalCta.primary.href} target="_blank" rel="noopener noreferrer"
                data-analytics="bn-final-cta"
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl font-bold transition-all hover:-translate-y-0.5"
                style={{ backgroundColor: "#008236", color: "#fff", minHeight: "52px", boxShadow: "0 12px 30px -14px rgba(0,130,54,0.9)" }}>
                <MessageCircle className="w-5 h-5" /> {bn.finalCta.primary.label}
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <Link href={bn.finalCta.secondary.href}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold border transition-colors text-white"
                style={{ minHeight: "52px", borderColor: "rgba(255,255,255,0.2)" }}>
                {bn.finalCta.secondary.label} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <hr className="bn-rule mb-6 opacity-60" />
            <nav className="flex flex-wrap gap-x-5 gap-y-2 justify-center text-sm">
              {bn.footerLinks.map((l) => (
                <Link key={l.href} href={l.href} className="hover:text-white transition-colors" style={DIM}>
                  {sub(l.label)}
                </Link>
              ))}
            </nav>
          </section>

        </div>
      </div>
    </PageLayout>
  );
}
