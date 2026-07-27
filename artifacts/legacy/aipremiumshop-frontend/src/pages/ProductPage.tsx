import { useState, useMemo, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle, Star, ChevronRight, Check, X, Clock, Shield, Zap,
  Wallet, Smartphone, CreditCard, Gift, HelpCircle, ArrowRight, Truck,
  Share2, Heart, ChevronDown, BadgeCheck, Users, Package, RefreshCw,
} from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { PaymentBadges } from "@/components/PaymentBadges";
import { FAQSection } from "@/components/FAQSection";
import { formatBDT } from "@/lib/format";
import { formulaPrice } from "@/lib/pricing";
import { schemaJson, breadcrumbSchema, faqSchema } from "@/utils/schemas";
import productsData from "../../data/products.json";

const WHATSAPP = "https://wa.me/8801865385348";
const SITE = "https://aipremium.tools";

interface Plan {
  planName: string;
  tierLevel: number;
  priceBDT: number;
  officialUSD: number | null;
  billingCycle: string;
  deliveryType: "shared" | "personal" | "team";
  whatsIncluded: string[];
  features: string[];
  limitations: string[];
  bestFor: string;
  seats?: number;
  durationOptions?: { months: number; priceBDT: number; label: string }[];
  badge?: string;
  inStock: boolean;
}

interface ProductDetail {
  id: string;
  name: string;
  slug: string;
  brand: string;
  brandSlug: string;
  brandColor: string;
  category: string;
  logo?: string;
  tagline?: string;
  description: string;
  descriptionBN?: string;
  plans: Plan[];
  gallery?: string[];
  higherPlanUpsell?: { targetPlan: string; whatYouUnlock: string[] };
  uniqueSellingPoints?: string[];
  useCasesBD?: string[];
  whyBuyFromAIPS?: string;
  faq?: { q: string; a: string; qBN?: string; aBN?: string }[];
  activationType?: string;
  estimatedDeliveryTime?: string;
  trust?: { warrantyDays: number; refundPolicy: string; reviewCount: number; rating: number };
  relatedProducts?: { slug: string; name: string; priceBDT: number; category: string }[];
  bundleSuggestions?: { slug: string; name: string; savingBDT: number }[];
  seo?: { title: string; metaDescription: string; canonical: string; ogImage: string; keywords: string[] };
  specs?: { platforms: string[]; devices: string; regions: string; languages: string; deviceLimit: string };
  stock?: { status: string; unitsNote?: string };
  badges?: string[];
  deliveryMethod?: string;
  lastVerifiedDate?: string;
  priceUpdatedDate?: string;
  competitorCompare?: { seller: string; price: string; risk: string }[];
  videoDemoUrl?: string;
  howItWorksSteps?: { title: string; desc: string }[];
}

function getProductBySlug(slug: string): ProductDetail | undefined {
  const arr = Array.isArray(productsData) ? productsData : (productsData as any).products || [];
  const all = (arr as ProductDetail[]).filter((p) => p.slug === slug);
  if (!all.length) return undefined;
  const main = all[0];
  // Merge plans from all variants into the main entry
  const merged: ProductDetail = { ...main };
  if (!merged.plans || merged.plans.length === 0) {
    merged.plans = all.map((p) => {
      const raw = p as any;
      return {
        planName: raw.tier ?? raw.name ?? "Plan",
        tierLevel: raw.tier?.toLowerCase().includes("starter") ? 1 : raw.tier?.toLowerCase().includes("premium") ? 2 : raw.tier?.toLowerCase().includes("personal") ? 3 : 1,
        priceBDT: Number(raw.price) || 0,
        officialUSD: raw.officialUSD ?? null,
        billingCycle: "monthly",
        deliveryType: raw.accessType === "shared" ? "shared" : raw.accessType === "bundle" ? "shared" : "personal",
        whatsIncluded: Array.isArray(raw.capabilities) ? raw.capabilities : [],
        features: Array.isArray(raw.capabilities) ? raw.capabilities : [],
        limitations: [],
        bestFor: raw.accessType === "shared" ? "Budget users" : "Privacy-focused users",
        seats: raw.accessType === "shared" ? 8 : 1,
        badge: raw.badge ?? undefined,
        inStock: true,
      };
    });
  }
  // Derive clean product display name: strip tier suffix after "—" or "-"
  merged.name = merged.name.split(/—\s*/)[0].split(/\s*-\s*/)[0].trim();
  return merged;
}

function getDirectAbroadPrice(officialUSD: number | null): number | null {
  if (!officialUSD || officialUSD <= 0) return null;
  return formulaPrice(officialUSD);
}

const TRUST_DEFAULT = {
  warrantyDays: 30,
  refundPolicy: "Full refund within 24h if not delivered; replacement within 30 days for account issues.",
  reviewCount: 1200,
  rating: 4.9,
};

const USP_DEFAULT = [
  "Instant delivery (5-15 min for most products)",
  "30-day warranty & replacement guarantee",
  "Your own account (not shared) on Personal plans",
  "Pay with bKash / Nagad / Rocket / Bank — no international card needed",
  "Bangla human support via WhatsApp",
  "Serving customers since 2024",
];

const HOW_IT_WORKS_DEFAULT = [
  { title: "Choose plan", desc: "Pick the tier and duration that fits your needs." },
  { title: "Pay bKash/Nagad", desc: "Send payment securely via local channels." },
  { title: "Get instant access", desc: "Receive account details or activation in minutes." },
];

export default function ProductPage({ productSlug }: { productSlug: string }) {
  const [, navigate] = useLocation();
  const product = getProductBySlug(productSlug);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [selectedDuration, setSelectedDuration] = useState(1);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const plans = product?.plans ?? [];
  const cheapestPlan = plans.length ? plans.reduce((a, b) => (a.priceBDT < b.priceBDT ? a : b)) : null;
  const fromPrice = cheapestPlan?.priceBDT ?? product?.plans?.[0]?.priceBDT ?? 0;

  useEffect(() => {
    if (plans.length && !selectedPlan) setSelectedPlan(plans[0]);
  }, [plans.length, selectedPlan]);

  if (!product) {
    return (
      <PageLayout>
        <SEOHead title="Product Not Found | AI Premium Shop" description="This product page is not available. Browse our full catalog of AI subscriptions." />
        <div className="max-w-5xl mx-auto px-4 pt-10 pb-20 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Product Not Found</h1>
          <p className="mb-8" style={{ color: "#c9ceda" }}>
            The product you’re looking for doesn’t exist or has moved. Try searching our catalog.
          </p>
          <Link href="/products" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#ec4899", color: "#fff" }}>
            Browse All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </PageLayout>
    );
  }

  const selectedPrice = selectedPlan?.durationOptions?.find((d) => d.months === selectedDuration)?.priceBDT ?? selectedPlan?.priceBDT ?? fromPrice;
  const whatsappText = `Hi, I want to order ${product.name} (${selectedPlan?.planName ?? product.name}) from AI Premium Shop. Price: ${formatBDT(selectedPrice)}. Please help me with the next step.`;
  const whatsappLink = `${WHATSAPP}?text=${encodeURIComponent(whatsappText)}`;

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: product.category, href: `/${product.category}` },
    { name: product.name },
  ];

  const seo = product.seo ?? {
    title: `${product.name} price in Bangladesh — ${formatBDT(fromPrice)}/mo | AI Premium Shop`,
    metaDescription: `${product.name} price in Bangladesh is ${formatBDT(fromPrice)}/month at AI Premium Shop. Pay with bKash or Nagad. Instant delivery 5-15 min. 30-day warranty. Trusted by our customers since 2024.`,
    canonical: `${SITE}/product/${product.slug}`,
    ogImage: product.logo ?? "https://aipremiumshop.com/images/og/default-og.png",
    keywords: [product.name, `${product.name} price in Bangladesh`, `${product.name} bKash`, `${product.name} koto taka`, "AI Premium Shop", "Bangladesh AI subscription"],
  };

  const trust = product.trust ?? TRUST_DEFAULT;
  const usps = product.uniqueSellingPoints ?? USP_DEFAULT;
  const howItWorks = product.howItWorksSteps ?? HOW_IT_WORKS_DEFAULT;
  const useCases = product.useCasesBD ?? [];
  const faqs = product.faq ?? [];

  return (
    <PageLayout>
      <SEOHead title={seo.title} description={seo.metaDescription} canonical={seo.canonical} ogImage={seo.ogImage} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaJson(breadcrumbSchema(breadcrumbs)) }} />
      {faqs.length > 0 && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaJson(faqSchema(faqs)) }} />}

      <div className="max-w-6xl mx-auto px-4 pt-6 pb-20">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="flex items-center gap-2 text-sm mb-6" style={{ color: "#c9ceda" }}>
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          {breadcrumbs.slice(1).map((b, i) => (
            <span key={i} className="flex items-center gap-2">
              <ChevronRight className="w-3.5 h-3.5" />
              {b.href ? <Link href={b.href} className="hover:text-white transition-colors capitalize">{b.name}</Link> : <span className="text-white">{b.name}</span>}
            </span>
          ))}
        </nav>

        {/* Hero */}
        <div className="grid lg:grid-cols-2 gap-8 mb-14 items-start">
          <div>
            <div className="flex items-center gap-3 mb-4">
              {product.logo && <img src={product.logo} alt={`${product.name} logo`} width={56} height={56} className="rounded-xl object-contain" />}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">{product.name}</h1>
                {product.tagline && <p className="text-sm mt-1" style={{ color: "#f4b942" }}>{product.tagline}</p>}
              </div>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4" fill={i < Math.floor(trust.rating) ? "#f4b942" : "none"} stroke="#f4b942" />
                ))}
              </div>
              <span className="text-sm" style={{ color: "#c9ceda" }}>{trust.rating.toFixed(1)} ({trust.reviewCount.toLocaleString()} reviews)</span>
              {product.badges?.map((b) => (
                <span key={b} className="px-2 py-0.5 rounded-full text-xs font-semibold capitalize" style={{ backgroundColor: "rgba(244,185,66,0.15)", color: "#f4b942", border: "1px solid rgba(244,185,66,0.25)" }}>{b}</span>
              ))}
            </div>
            <p className="mb-4 leading-relaxed" style={{ color: "#c9ceda" }}>{product.description}</p>
            {product.descriptionBN && <p className="mb-4 leading-relaxed font-medium text-white/90">{product.descriptionBN}</p>}
            <div className="flex flex-wrap gap-2 mb-6">
              {usps.slice(0, 4).map((u, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: "rgba(16,185,129,0.12)", color: "#10b981", border: "1px solid rgba(16,185,129,0.25)" }}>
                  <Check className="w-3 h-3" /> {u}
                </span>
              ))}
            </div>
            <PaymentBadges />
          </div>

          {/* Sticky buy box (desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl border border-white/10 p-6" style={{ backgroundColor: "#151b3d" }}>
              <div className="mb-4">
                <div className="text-sm mb-1" style={{ color: "#c9ceda" }}>Starting from</div>
                <div className="text-3xl font-bold text-white">{formatBDT(fromPrice)}<span className="text-sm font-normal ml-1" style={{ color: "#c9ceda" }}>/mo</span></div>
                {selectedPlan?.officialUSD != null && (
                  <div className="text-xs mt-1" style={{ color: "#c9ceda" }}>
                    Direct abroad: <span className="line-through">{formatBDT(formulaPrice(selectedPlan.officialUSD))}</span> + intl card needed
                  </div>
                )}
              </div>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-base transition-all duration-200 mb-3"
                style={{ backgroundColor: "#25d366", color: "#fff" }}>
                <MessageCircle className="w-5 h-5" /> Order on WhatsApp
              </a>
              <div className="text-xs text-center" style={{ color: "#c9ceda" }}>
                <Clock className="w-3 h-3 inline mr-1" /> Delivery: {product.estimatedDeliveryTime ?? "5–15 min"}
              </div>
            </div>
          </div>
        </div>

        {/* AIO Quick Answer */}
        <div className="rounded-2xl border border-white/10 p-6 mb-14" style={{ backgroundColor: "#151b3d" }}>
          <h2 className="text-lg font-bold text-white mb-2">
            {product.name} price in Bangladesh is {formatBDT(fromPrice)}/month at AI Premium Shop (aipremiumshop.com)
          </h2>
          <p className="leading-relaxed" style={{ color: "#c9ceda" }}>
            Pay with bKash or Nagad — no international card needed. Instant delivery in {product.estimatedDeliveryTime ?? "5–15 minutes"}. 30-day warranty on every order. Trusted by our customers since 2024. AIPS provides access to authentic {product.brand} subscriptions; all product names and logos are trademarks of their respective owners.
          </p>
        </div>

        {/* Plan Selector */}
        <div className="mb-14">
          <h2 className="text-2xl font-bold text-white mb-6">Choose Your Plan</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {plans.map((plan) => {
              const active = selectedPlan?.planName === plan.planName;
              const directPrice = getDirectAbroadPrice(plan.officialUSD);
              return (
                <motion.div
                  key={plan.planName}
                  onClick={() => { setSelectedPlan(plan); setSelectedDuration(plan.durationOptions?.[0]?.months ?? 1); }}
                  whileHover={{ y: -4 }}
                  className={`rounded-2xl border p-5 cursor-pointer transition-all duration-200 ${active ? "border-[#f4b942] ring-1 ring-[#f4b942]/30" : "border-white/10 hover:border-white/20"}`}
                  style={{ backgroundColor: "#151b3d" }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-white">{plan.planName}</span>
                    {plan.badge && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ backgroundColor: "rgba(244,185,66,0.15)", color: "#f4b942" }}>{plan.badge}</span>
                    )}
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{formatBDT(plan.priceBDT)}<span className="text-sm font-normal ml-1" style={{ color: "#c9ceda" }}>/mo</span></div>
                  {directPrice != null && (
                    <div className="text-xs mb-3" style={{ color: "#c9ceda" }}>
                      Direct abroad: <span className="line-through">{formatBDT(directPrice)}</span>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {plan.whatsIncluded.slice(0, 4).map((f) => (
                      <span key={f} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs" style={{ backgroundColor: "rgba(16,185,129,0.12)", color: "#10b981" }}>
                        <Check className="w-3 h-3" /> {f}
                      </span>
                    ))}
                  </div>
                  <div className="text-xs mb-2" style={{ color: "#c9ceda" }}>
                    <Users className="w-3 h-3 inline mr-1" /> {plan.seats ?? 1} seat{plan.seats !== 1 ? "s" : ""} · {plan.deliveryType === "shared" ? "Shared" : plan.deliveryType === "team" ? "Team" : "Personal"}
                  </div>
                  <div className="text-xs" style={{ color: "#c9ceda" }}>
                    <Clock className="w-3 h-3 inline mr-1" /> Delivery: {plan.deliveryType === "shared" ? "5–30 min" : "2–4 hrs"}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Duration selector if available */}
        {selectedPlan?.durationOptions && selectedPlan.durationOptions.length > 1 && (
          <div className="mb-14">
            <h3 className="text-lg font-bold text-white mb-3">Select Duration</h3>
            <div className="flex flex-wrap gap-2">
              {selectedPlan.durationOptions.map((d) => (
                <button
                  key={d.months}
                  onClick={() => setSelectedDuration(d.months)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${selectedDuration === d.months ? "border-[#f4b942] text-[#f4b942]" : "border-white/10 text-white/80 hover:border-white/20"} border`}
                  style={selectedDuration === d.months ? { backgroundColor: "rgba(244,185,66,0.12)" } : { backgroundColor: "#151b3d" }}
                >
                  {d.label} — {formatBDT(d.priceBDT)}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Selected Plan Details */}
        <AnimatePresence mode="wait">
          {selectedPlan && (
            <motion.div key={selectedPlan.planName} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mb-14 grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-white/10 p-6" style={{ backgroundColor: "#151b3d" }}>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Check className="w-5 h-5" style={{ color: "#10b981" }} /> What’s Included</h3>
                <ul className="space-y-2">
                  {selectedPlan.whatsIncluded.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm" style={{ color: "#c9ceda" }}><Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#10b981" }} /> {f}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-white/10 p-6" style={{ backgroundColor: "#151b3d" }}>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><X className="w-5 h-5" style={{ color: "#ef4444" }} /> Limitations</h3>
                <ul className="space-y-2">
                  {selectedPlan.limitations.map((l) => (
                    <li key={l} className="flex items-start gap-2 text-sm" style={{ color: "#c9ceda" }}><X className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#ef4444" }} /> {l}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Higher plan upsell */}
        {product.higherPlanUpsell && selectedPlan && (
          <div className="mb-14 rounded-2xl border border-white/10 p-6" style={{ backgroundColor: "#151b3d" }}>
            <h3 className="text-lg font-bold text-white mb-2">
              Need more? Upgrade to <span style={{ color: "#f4b942" }}>{product.higherPlanUpsell.targetPlan}</span>
            </h3>
            <p className="text-sm mb-3" style={{ color: "#c9ceda" }}>Unlock extra features, higher limits, and more seats:</p>
            <div className="flex flex-wrap gap-2">
              {product.higherPlanUpsell.whatYouUnlock.map((u) => (
                <span key={u} className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: "rgba(139,92,246,0.12)", color: "#8b5cf6" }}>
                  <Zap className="w-3 h-3" /> {u}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Comparison matrix */}
        {plans.length > 1 && (
          <div className="mb-14 overflow-x-auto">
            <h2 className="text-2xl font-bold text-white mb-6">Plan Comparison</h2>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                  <th className="text-left py-3 px-4 font-semibold text-white">Feature</th>
                  {plans.map((p) => (
                    <th key={p.planName} className="text-left py-3 px-4 font-semibold text-white min-w-[180px]">
                      {p.planName}
                      {p.badge && <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] font-bold" style={{ backgroundColor: "#f4b942", color: "#0a0e27" }}>{p.badge}</span>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <td className="py-3 px-4" style={{ color: "#c9ceda" }}>Price / month</td>
                  {plans.map((p) => <td key={p.planName} className="py-3 px-4 font-bold text-white">{formatBDT(p.priceBDT)}</td>)}
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <td className="py-3 px-4" style={{ color: "#c9ceda" }}>Seats</td>
                  {plans.map((p) => <td key={p.planName} className="py-3 px-4 text-white">{p.seats ?? 1}</td>)}
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <td className="py-3 px-4" style={{ color: "#c9ceda" }}>Delivery type</td>
                  {plans.map((p) => <td key={p.planName} className="py-3 px-4 text-white capitalize">{p.deliveryType}</td>)}
                </tr>
                {selectedPlan?.features.map((feature) => (
                  <tr key={feature} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <td className="py-3 px-4" style={{ color: "#c9ceda" }}>{feature}</td>
                    {plans.map((p) => (
                      <td key={p.planName} className="py-3 px-4">
                        {p.features.includes(feature) ? <Check className="w-4 h-4" style={{ color: "#10b981" }} /> : <X className="w-4 h-4" style={{ color: "#ef4444" }} />}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Use Cases BD */}
        {useCases.length > 0 && (
          <div className="mb-14">
            <h2 className="text-2xl font-bold text-white mb-6">Perfect For Bangladesh Users</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {useCases.map((u, i) => (
                <div key={i} className="rounded-xl border border-white/10 p-5" style={{ backgroundColor: "#151b3d" }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: "rgba(244,185,66,0.15)" }}>
                    <Users className="w-4 h-4" style={{ color: "#f4b942" }} />
                  </div>
                  <p className="text-sm font-medium text-white">{u}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Why AIPS */}
        <div className="mb-14">
          <h2 className="text-2xl font-bold text-white mb-6">Why Buy From AI Premium Shop?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {usps.map((u, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl border border-white/10 p-4" style={{ backgroundColor: "#151b3d" }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(16,185,129,0.12)" }}>
                  <BadgeCheck className="w-4 h-4" style={{ color: "#10b981" }} />
                </div>
                <p className="text-sm text-white">{u}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Competitor compare */}
        {product.competitorCompare && product.competitorCompare.length > 0 && (
          <div className="mb-14 overflow-x-auto">
            <h2 className="text-2xl font-bold text-white mb-6">AIPS vs Buying Direct vs Reseller</h2>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                  <th className="text-left py-3 px-4 font-semibold text-white">Seller</th>
                  <th className="text-left py-3 px-4 font-semibold text-white">Price</th>
                  <th className="text-left py-3 px-4 font-semibold text-white">Risk</th>
                </tr>
              </thead>
              <tbody>
                {product.competitorCompare.map((c, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <td className="py-3 px-4 text-white font-medium">{c.seller}</td>
                    <td className="py-3 px-4 text-white">{c.price}</td>
                    <td className="py-3 px-4" style={{ color: "#c9ceda" }}>{c.risk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* How It Works */}
        <div className="mb-14">
          <h2 className="text-2xl font-bold text-white mb-6">How It Works</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {howItWorks.map((step, i) => (
              <div key={i} className="text-center rounded-xl border border-white/10 p-6" style={{ backgroundColor: "#151b3d" }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold" style={{ backgroundColor: "rgba(244,185,66,0.15)", color: "#f4b942" }}>{i + 1}</div>
                <h3 className="font-semibold text-white mb-1">{step.title}</h3>
                <p className="text-xs" style={{ color: "#c9ceda" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust bar */}
        <div className="mb-14 rounded-2xl border border-white/10 p-6" style={{ backgroundColor: "#151b3d" }}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div>
              <Shield className="w-6 h-6 mx-auto mb-2" style={{ color: "#10b981" }} />
              <div className="font-bold text-white">{trust.warrantyDays}-day warranty</div>
              <div className="text-xs" style={{ color: "#c9ceda" }}>Full replacement guarantee</div>
            </div>
            <div>
              <Clock className="w-6 h-6 mx-auto mb-2" style={{ color: "#10b981" }} />
              <div className="font-bold text-white">{product.estimatedDeliveryTime ?? "5–15 min"} delivery</div>
              <div className="text-xs" style={{ color: "#c9ceda" }}>Instant activation</div>
            </div>
            <div>
              <Wallet className="w-6 h-6 mx-auto mb-2" style={{ color: "#10b981" }} />
              <div className="font-bold text-white">bKash / Nagad</div>
              <div className="text-xs" style={{ color: "#c9ceda" }}>No international card</div>
            </div>
            <div>
              <Users className="w-6 h-6 mx-auto mb-2" style={{ color: "#10b981" }} />
              <div className="font-bold text-white">our customers</div>
              <div className="text-xs" style={{ color: "#c9ceda" }}>Trusted since 2024</div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        {faqs.length > 0 && (
          <div className="mb-14">
            <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="rounded-xl border border-white/10 overflow-hidden" style={{ backgroundColor: "#151b3d" }}>
                  <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} className="w-full flex items-center justify-between px-5 py-4 text-left">
                    <span className="font-medium text-white text-sm">{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${faqOpen === i ? "rotate-180" : ""}`} style={{ color: "#c9ceda" }} />
                  </button>
                  <AnimatePresence>
                    {faqOpen === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="px-5 pb-4 text-sm leading-relaxed" style={{ color: "#c9ceda" }}>{faq.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related products */}
        {product.relatedProducts && product.relatedProducts.length > 0 && (
          <div className="mb-14">
            <h2 className="text-2xl font-bold text-white mb-6">Related Products</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {product.relatedProducts.map((rp) => {
                const arr = Array.isArray(productsData) ? productsData : (productsData as any).products || [];
                const all = arr as ProductDetail[];
                const rpProduct = all.find((p: ProductDetail) => p.slug === rp.slug);
                const price = rp.priceBDT ?? rpProduct?.plans?.[0]?.priceBDT ?? 0;
                const cat = rp.category ?? rpProduct?.category ?? "";
                return (
                  <Link key={rp.slug} href={`/${rp.slug}`} className="rounded-xl border border-white/10 p-4 block hover:border-white/20 transition-colors" style={{ backgroundColor: "#151b3d" }}>
                    <div className="text-sm font-semibold text-white mb-1">{rp.name}</div>
                    {price > 0 && <div className="text-sm font-bold" style={{ color: "#f4b942" }}>{formatBDT(price)}</div>}
                    {cat && <div className="text-xs mt-1 capitalize" style={{ color: "#c9ceda" }}>{cat}</div>}
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Content freshness */}
        <div className="text-center text-xs mb-20" style={{ color: "#64748b" }}>
          Price last verified: {product.lastVerifiedDate ?? "July 2026"} ·
          All product names and logos are trademarks of their respective owners. AI Premium Shop provides access to authentic subscriptions.
        </div>
      </div>

      {/* Sticky mobile buy bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-white/10" style={{ backgroundColor: "#0a0e27" }}>
        <div className="flex items-center justify-between px-4 h-16 gap-3">
          <div>
            <div className="text-xs" style={{ color: "#c9ceda" }}>{selectedPlan?.planName ?? product.name}</div>
            <div className="text-base font-bold" style={{ color: "#f4b942" }}>{formatBDT(selectedPrice)}</div>
          </div>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity flex-shrink-0"
            style={{ backgroundColor: "#25d366", color: "#fff", minHeight: "44px" }}>
            <MessageCircle className="w-4 h-4" /> Order
          </a>
        </div>
      </div>
    </PageLayout>
  );
}
