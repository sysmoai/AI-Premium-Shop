// Homepage AI Video module (spec section 10).
//
// Purpose: give the site's strongest commercial intent — "which AI video tool,
// and can I even pay for it from here" — a real entry point on the homepage,
// and state the account-ownership and verification position up front rather
// than burying it on a policy page.
//
// All prices come from data/products.json via cheapestFor(); the Higgsfield
// card reads data/higgsfield-offer.json, the same source the product page and
// the build-time compliance gate use. Nothing here is typed by hand.

import { Link } from "wouter";
import { ArrowRight, Video, ShieldCheck } from "lucide-react";
import { formatBDT } from "@/lib/format";
import { productPath } from "@/lib/productRoutes";
import productsData from "../../data/products.json";
import hfOffer from "../../data/higgsfield-offer.json";

const CARD = { backgroundColor: "#151b3d" };
const MUTED = { color: "#c9ceda" };

const all = (productsData as any).products as any[];

function cheapestFor(slug: string): number | null {
  const prices = all.filter((p) => p.slug === slug).map((p) => p.price).filter((n) => typeof n === "number");
  return prices.length ? Math.min(...prices) : null;
}
function nameFor(slug: string): string {
  const rec = all.find((p) => p.slug === slug);
  return rec ? rec.name.split(/—\s*/)[0].trim() : slug;
}

const SUPPORTING = ["kling-ai-bangladesh", "heygen-bangladesh", "runway-bangladesh", "capcut-pro-bangladesh"];

export function AIVideoFeatureSection() {
  const videoCount = new Set(all.filter((p) => p.category === "ai-video").map((p) => p.slug)).size;
  const o = hfOffer.offer;

  return (
    <section className="py-16 px-4" aria-labelledby="ai-video-heading">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-3">
          <Video className="w-4 h-4" style={{ color: "#ec4899" }} />
          <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#ec4899" }}>AI Video</span>
        </div>
        <h2 id="ai-video-heading" className="text-2xl md:text-3xl font-bold text-white mb-3">
          Make video ads, reels and avatars — paid for in taka
        </h2>
        <p className="max-w-3xl leading-relaxed mb-8" style={MUTED}>
          {videoCount} AI video tools, covering five different jobs: generating footage from a prompt,
          animating a product photo, talking avatars, UGC-style ads, and editing what you already shot.
          They are not interchangeable — the category page walks you through which one fits your work.
        </p>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-4 mb-6">
          {/* Featured: Higgsfield, in its real compliance state */}
          <div className="rounded-2xl border p-6" style={{ ...CARD, borderColor: "rgba(244,185,66,0.3)" }}>
            <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
              <h3 className="text-xl font-bold text-white">{hfOffer.platform.vendor} AI</h3>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap"
                style={{ backgroundColor: "rgba(244,185,66,0.15)", color: "#f4b942" }}>
                Enquiry only
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={MUTED}>{hfOffer.platform.summary}</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4 text-sm">
              <div>
                <span style={MUTED}>Indicative </span>
                <span className="font-bold text-white">{formatBDT(o.priceBDT)}</span>
                <span style={MUTED}> / {o.durationMonths} month</span>
              </div>
              <div style={MUTED}>Account stays in your name</div>
            </div>
            <p className="text-xs leading-relaxed mb-4" style={{ color: "#8b93a8" }}>
              {hfOffer.pendingVerification.items.length} supplied claims about this plan are still unverified —
              they are listed openly on the product page rather than sold as features.
            </p>
            <Link href={productPath(hfOffer.productSlug)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#ec4899", color: "#fff" }}>
              See what is and isn't confirmed <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Trust position */}
          <div className="rounded-2xl border border-white/10 p-6" style={CARD}>
            <ShieldCheck className="w-5 h-5 mb-3" style={{ color: "#10b981" }} />
            <h3 className="font-bold text-white mb-3 text-sm">How we handle claims</h3>
            <ul className="space-y-2.5 text-sm" style={MUTED}>
              <li>Product pages carry the date we last checked their facts.</li>
              <li>Each links to the provider's own pricing page, so you can check us.</li>
              <li>Where a claim isn't verified, we publish that instead of repeating it.</li>
              <li>Account type is stated per product — ask before you pay if it matters.</li>
            </ul>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {SUPPORTING.map((slug) => {
            const price = cheapestFor(slug);
            return (
              <Link key={slug} href={productPath(slug)}
                className="rounded-xl border border-white/10 p-4 hover:border-white/25 transition-colors" style={CARD}>
                <div className="font-semibold text-white text-sm mb-1">{nameFor(slug)}</div>
                {price != null && <div className="text-sm font-bold" style={{ color: "#f4b942" }}>from {formatBDT(price)}/mo</div>}
              </Link>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/ai-video"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border border-white/15 hover:border-white/30 transition-colors text-white">
            Which AI video tool do I need? <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/best-ai-for-creators"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border border-white/15 hover:border-white/30 transition-colors text-white">
            Best AI for creators <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/creators-bn"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border border-white/15 hover:border-white/30 transition-colors text-white">
            বাংলায় দেখুন <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
