import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronRight,
  Clock,
  Info,
  MessageCircle,
  ShieldCheck,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { PaymentBadges } from "@/components/PaymentBadges";
import { SEOHead } from "@/components/SEOHead";
import { formatBDT } from "@/lib/format";
import { productPath } from "@/lib/productRoutes";
import { breadcrumbSchema, faqSchema, schemaJson } from "@/utils/schemas";
import productsData from "../../data/products.json";

const WHATSAPP = "https://wa.me/8801865385348";
const SITE = "https://aipremiumshop.com";

interface Plan {
  planName: string;
  tierLevel?: number;
  priceBDT: number;
  officialUSD?: number | null;
  billingCycle?: string;
  deliveryType: "shared" | "personal" | "team";
  whatsIncluded: string[];
  features: string[];
  limitations: string[];
  bestFor?: string;
  seats?: number;
  durationOptions?: { months: number; priceBDT: number; label: string }[];
  badge?: string;
  inStock?: boolean;
  deliverySLA?: string;
}

interface ProductDetail {
  id: string;
  name: string;
  slug: string;
  requestPrice?: boolean;
  brand: string;
  brandSlug?: string;
  brandColor?: string;
  category: string;
  logo?: string;
  tagline?: string;
  description?: string;
  descriptionBN?: string;
  plans?: Plan[];
  uniqueSellingPoints?: string[];
  useCasesBD?: string[];
  faq?: { q: string; a: string; qBN?: string; aBN?: string }[];
  accessType?: string;
  relatedProducts?: { slug: string; name: string; priceBDT?: number; category?: string }[];
  lastVerifiedDate?: string;
  verificationDate?: string;
  priceUpdatedDate?: string;
  howItWorksSteps?: { title: string; desc: string }[];
}

type RawRecord = ProductDetail & {
  tier?: string;
  price?: number | null;
  capabilities?: string[];
  deliverySLA?: string;
};

const rawProducts: RawRecord[] = Array.isArray(productsData)
  ? (productsData as RawRecord[])
  : (((productsData as { products?: RawRecord[] }).products ?? []) as RawRecord[]);

const HARD_UNVERIFIED = [
  /\bwarranty\b/i,
  /\b(?:full\s+)?replacement\s+guarantee\b/i,
  /\binstant\s+(?:delivery|access|activation)\b/i,
  /\b5\s*[–-]\s*(?:15|30)\s*(?:min|minutes)\b/i,
  /\btrusted\s+by\b/i,
  /\bbest[ -]?seller\b/i,
  /\blimited\s+(?:time|offer)\b/i,
  /\bmoney[ -]?back\b/i,
  /\bguaranteed\s+(?:income|permanent)\b/i,
  /\b\d{1,3}%\s*off\b/i,
];
const NEGATION = /\b(no|not|never|without|cannot)\b/i;
const UNLIMITED_SCOPE = /\b(fair[ -]?use|provider\s+limit|subject\s+to|credit|relaxed|slow|scope|usage\s+limit|rate\s+limit|limit applies|limits apply)\b/i;

function isUnsafeClaim(value: string): boolean {
  const text = value.trim();
  if (!text) return false;
  if (!NEGATION.test(text) && HARD_UNVERIFIED.some((pattern) => pattern.test(text))) return true;
  if (/\bunlimited\b/i.test(text) && !NEGATION.test(text) && !UNLIMITED_SCOPE.test(text)) return true;
  return false;
}

function sanitizeProse(value: string | undefined, fallback = "Check the current product and plan details before purchase."): string {
  if (!value?.trim()) return fallback;
  const sentences = value
    .split(/(?<=[.!?।])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean)
    .filter((sentence) => !isUnsafeClaim(sentence));
  return sentences.length ? sentences.join(" ") : fallback;
}

function safeList(values: string[] | undefined): string[] {
  return (values ?? []).map((value) => value.trim()).filter((value) => value && !isUnsafeClaim(value));
}

function fitTitle(value: string): string {
  if (value.length <= 68) return value;
  const suffix = " | AI Premium Shop";
  const room = Math.max(24, 68 - suffix.length);
  return `${value.slice(0, room - 1).trimEnd()}…${suffix}`;
}

function fitDescription(value: string): string {
  if (value.length <= 158) return value;
  return `${value.slice(0, 157).trimEnd()}…`;
}

function getProductBySlug(slug: string): ProductDetail | undefined {
  const all = rawProducts.filter((product) => product.slug === slug);
  if (!all.length) return undefined;

  const main = all[0];
  const merged: ProductDetail = {
    ...main,
    plans: Array.isArray(main.plans) ? [...main.plans] : [],
  };

  if (!merged.requestPrice && !merged.plans?.length) {
    merged.plans = all
      .filter((record) => typeof record.price === "number" && Number.isFinite(record.price) && (record.price ?? 0) > 0)
      .map((record) => ({
        planName: record.tier ?? record.name ?? "Plan",
        priceBDT: Number(record.price),
        billingCycle: "monthly",
        deliveryType: record.accessType === "shared" ? "shared" : record.accessType === "team" ? "team" : "personal",
        whatsIncluded: safeList(record.capabilities),
        features: safeList(record.capabilities),
        limitations: [],
        bestFor: record.accessType === "shared" ? "Users who understand the shared-access model" : "Users who prefer personal access",
        deliverySLA: record.deliverySLA,
      }));
  }

  merged.name = merged.name.split(/—\s*/)[0].split(/\s+-\s+/)[0].trim();
  return merged;
}

const SAFE_USPS = [
  "Pay in BDT with local payment options",
  "Access model shown before purchase",
  "Current availability confirmed before payment",
  "Bangla support available via WhatsApp",
  "10,000+ customers served since 2022",
];

const SAFE_HOW_IT_WORKS = [
  { title: "Choose the plan", desc: "Review the access model, included features and published price." },
  { title: "Confirm current details", desc: "Confirm availability, provider limits, delivery ETA and applicable terms before payment." },
  { title: "Pay and receive access", desc: "Complete payment only after the order details are confirmed, then receive access according to that confirmation." },
];

function accessLabel(plan: Plan | null): string {
  if (!plan) return "Confirm access model";
  if (plan.deliveryType === "shared") return "Shared access";
  if (plan.deliveryType === "team") return "Team access";
  return "Personal access";
}

export default function ProductPage({ productSlug }: { productSlug: string }) {
  const product = getProductBySlug(productSlug);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [selectedDuration, setSelectedDuration] = useState(1);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const plans = useMemo(() => product?.plans ?? [], [product]);
  const cheapestPlan = plans.length ? plans.reduce((a, b) => (a.priceBDT < b.priceBDT ? a : b)) : null;
  const fromPrice = cheapestPlan?.priceBDT ?? 0;

  useEffect(() => {
    if (plans.length && !selectedPlan) setSelectedPlan(plans[0]);
  }, [plans, selectedPlan]);

  useEffect(() => {
    setSelectedPlan(plans[0] ?? null);
    setSelectedDuration(plans[0]?.durationOptions?.[0]?.months ?? 1);
    setFaqOpen(null);
  }, [productSlug]);

  if (!product) {
    return (
      <PageLayout>
        <SEOHead
          title="Product Not Found | AI Premium Shop"
          description="This product page is not available. Browse the current AI Premium Shop catalog."
          noindex
        />
        <div className="max-w-5xl mx-auto px-4 pt-10 pb-20 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Product Not Found</h1>
          <p className="mb-8" style={{ color: "#c9ceda" }}>
            This product is not in the current public catalog. Browse the catalog to find an active alternative.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#ec4899", color: "#fff" }}
          >
            Browse Current Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </PageLayout>
    );
  }

  const selectedPrice =
    selectedPlan?.durationOptions?.find((duration) => duration.months === selectedDuration)?.priceBDT ??
    selectedPlan?.priceBDT ??
    fromPrice;

  const whatsappText = product.requestPrice
    ? `Hi, I want ${product.name} from AI Premium Shop. Please confirm the current price, access model, availability, provider limits, delivery ETA and applicable terms before payment.`
    : `Hi, I want ${product.name}${selectedPlan ? ` (${selectedPlan.planName})` : ""} from AI Premium Shop. Published price: ${formatBDT(selectedPrice)}. Please confirm the current access model, availability, provider limits, delivery ETA and applicable terms before payment.`;
  const whatsappLink = `${WHATSAPP}?text=${encodeURIComponent(whatsappText)}`;

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: product.category, href: `/${product.category}` },
    { name: product.name },
  ];

  const priceText = product.requestPrice || fromPrice <= 0 ? "Current price on request" : `From ${formatBDT(fromPrice)}/month`;
  const seoTitle = fitTitle(`${product.name} Price in Bangladesh | AI Premium Shop`);
  const seoDescription = fitDescription(
    `${priceText}. Compare ${product.name} access options in Bangladesh and confirm current availability, provider limits, delivery ETA and terms before paying in BDT.`,
  );
  const canonical = `${SITE}${productPath(product.slug)}`;

  const description = sanitizeProse(product.description, `${product.name} is listed in the current AI Premium Shop catalog. Review the access model and current plan details before purchase.`);
  const productUsps = safeList(product.uniqueSellingPoints);
  const usps = productUsps.length ? productUsps : SAFE_USPS;
  const useCases = safeList(product.useCasesBD);
  const howItWorks = (product.howItWorksSteps ?? [])
    .filter((step) => step?.title && step?.desc)
    .filter((step) => !isUnsafeClaim(`${step.title}. ${step.desc}`));
  const safeHowItWorks = howItWorks.length ? howItWorks : SAFE_HOW_IT_WORKS;
  const faqs = (product.faq ?? []).filter((faq) => !isUnsafeClaim(`${faq.q}. ${faq.a}`));
  const safeBadges = safeList((product as ProductDetail & { badges?: string[] }).badges);
  const verificationDate = product.verificationDate ?? product.lastVerifiedDate ?? product.priceUpdatedDate ?? null;

  return (
    <PageLayout>
      <SEOHead title={seoTitle} description={seoDescription} canonical={canonical} ogImage={product.logo} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaJson(breadcrumbSchema(breadcrumbs)) }} />
      {faqs.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaJson(faqSchema(faqs)) }} />
      )}

      <div className="max-w-6xl mx-auto px-4 pt-6 pb-24">
        <nav aria-label="breadcrumb" className="flex flex-wrap items-center gap-2 text-sm mb-6" style={{ color: "#c9ceda" }}>
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          {breadcrumbs.slice(1).map((breadcrumb, index) => (
            <span key={`${breadcrumb.name}-${index}`} className="flex items-center gap-2">
              <ChevronRight className="w-3.5 h-3.5" />
              {breadcrumb.href ? (
                <Link href={breadcrumb.href} className="hover:text-white transition-colors capitalize">{breadcrumb.name}</Link>
              ) : (
                <span className="text-white">{breadcrumb.name}</span>
              )}
            </span>
          ))}
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 mb-12 items-start">
          <div>
            <div className="flex items-center gap-3 mb-4">
              {product.logo && (
                <img src={product.logo} alt={`${product.name} logo`} width={56} height={56} className="rounded-xl object-contain" />
              )}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">{product.name}</h1>
                {product.tagline && !isUnsafeClaim(product.tagline) && (
                  <p className="text-sm mt-1" style={{ color: "#f4b942" }}>{product.tagline}</p>
                )}
              </div>
            </div>

            {safeBadges.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {safeBadges.map((badge) => (
                  <span
                    key={badge}
                    className="px-2 py-0.5 rounded-full text-xs font-semibold"
                    style={{ backgroundColor: "rgba(244,185,66,0.15)", color: "#f4b942", border: "1px solid rgba(244,185,66,0.25)" }}
                  >
                    {badge}
                  </span>
                ))}
              </div>
            )}

            <p className="mb-4 leading-relaxed" style={{ color: "#c9ceda" }}>{description}</p>
            {product.descriptionBN && (
              <p className="mb-5 leading-relaxed font-medium text-white/90">{product.descriptionBN}</p>
            )}
            <div className="flex flex-wrap gap-2 mb-6">
              {usps.slice(0, 5).map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                  style={{ backgroundColor: "rgba(16,185,129,0.12)", color: "#10b981", border: "1px solid rgba(16,185,129,0.25)" }}
                >
                  <Check className="w-3 h-3" /> {item}
                </span>
              ))}
            </div>
            <PaymentBadges />
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl border border-white/10 p-6" style={{ backgroundColor: "#151b3d" }}>
              <div className="mb-4">
                <div className="text-sm mb-1" style={{ color: "#c9ceda" }}>{product.requestPrice ? "Current price" : "Starting from"}</div>
                <div className="text-3xl font-bold text-white">
                  {product.requestPrice || fromPrice <= 0 ? "Ask on WhatsApp" : formatBDT(fromPrice)}
                  {!product.requestPrice && fromPrice > 0 && <span className="text-sm font-normal ml-1" style={{ color: "#c9ceda" }}>/mo</span>}
                </div>
              </div>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-base transition-opacity hover:opacity-90 mb-3"
                style={{ backgroundColor: "#008236", color: "#fff" }}
              >
                <MessageCircle className="w-5 h-5" /> Confirm & Order on WhatsApp
              </a>
              <div className="text-xs text-center" style={{ color: "#c9ceda" }}>
                <Clock className="w-3 h-3 inline mr-1" /> Confirm current delivery ETA before payment
              </div>
            </div>
          </div>
        </div>

        <section className="rounded-2xl border border-white/10 p-6 mb-12" style={{ backgroundColor: "#151b3d" }}>
          <h2 className="text-lg font-bold text-white mb-2">
            {product.requestPrice || fromPrice <= 0
              ? `${product.name}: current Bangladesh price and access details on request`
              : `${product.name} starts from ${formatBDT(fromPrice)}/month in the current AIPS catalog`}
          </h2>
          <p className="leading-relaxed" style={{ color: "#c9ceda" }}>
            AI Premium Shop accepts local BDT payment methods. Before paying, confirm the exact access model, current availability, provider limits, delivery ETA and applicable refund or replacement terms for the selected plan. Product names and trademarks belong to their respective owners; this page does not claim provider authorization unless explicitly documented.
          </p>
        </section>

        {plans.length > 0 ? (
          <section className="mb-14">
            <h2 className="text-2xl font-bold text-white mb-6">Choose Your Plan</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {plans.map((plan) => {
                const active = selectedPlan?.planName === plan.planName;
                const included = safeList(plan.whatsIncluded);
                const safeBadge = plan.badge && !isUnsafeClaim(plan.badge) ? plan.badge : null;
                return (
                  <motion.button
                    type="button"
                    key={plan.planName}
                    onClick={() => {
                      setSelectedPlan(plan);
                      setSelectedDuration(plan.durationOptions?.[0]?.months ?? 1);
                    }}
                    whileHover={{ y: -4 }}
                    className={`rounded-2xl border p-5 cursor-pointer transition-all duration-200 text-left ${active ? "border-[#f4b942] ring-1 ring-[#f4b942]/30" : "border-white/10 hover:border-white/20"}`}
                    style={{ backgroundColor: "#151b3d" }}
                    aria-pressed={active}
                  >
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="font-semibold text-white">{plan.planName}</span>
                      {safeBadge && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ backgroundColor: "rgba(244,185,66,0.15)", color: "#f4b942" }}>
                          {safeBadge}
                        </span>
                      )}
                    </div>
                    <div className="text-2xl font-bold text-white mb-3">
                      {formatBDT(plan.priceBDT)}<span className="text-sm font-normal ml-1" style={{ color: "#c9ceda" }}>/mo</span>
                    </div>
                    {included.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {included.slice(0, 4).map((feature) => (
                          <span key={feature} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs" style={{ backgroundColor: "rgba(16,185,129,0.12)", color: "#10b981" }}>
                            <Check className="w-3 h-3" /> {feature}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="text-xs mb-2" style={{ color: "#c9ceda" }}>
                      <Users className="w-3 h-3 inline mr-1" /> {accessLabel(plan)}{typeof plan.seats === "number" && plan.seats > 0 ? ` · ${plan.seats} seat${plan.seats === 1 ? "" : "s"}` : ""}
                    </div>
                    <div className="text-xs" style={{ color: "#c9ceda" }}>
                      <Clock className="w-3 h-3 inline mr-1" /> Delivery ETA: confirm before payment
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </section>
        ) : (
          <section className="mb-14 rounded-2xl border border-white/10 p-6" style={{ backgroundColor: "#151b3d" }}>
            <h2 className="text-xl font-bold text-white mb-2">Current plan details are confirmed on request</h2>
            <p className="text-sm" style={{ color: "#c9ceda" }}>
              This listing does not publish a fixed plan price. Ask for the current price, access model, availability, provider limits and delivery ETA before payment.
            </p>
          </section>
        )}

        {selectedPlan?.durationOptions && selectedPlan.durationOptions.length > 1 && (
          <section className="mb-14">
            <h2 className="text-lg font-bold text-white mb-3">Select Duration</h2>
            <div className="flex flex-wrap gap-2">
              {selectedPlan.durationOptions.map((duration) => (
                <button
                  type="button"
                  key={duration.months}
                  onClick={() => setSelectedDuration(duration.months)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${selectedDuration === duration.months ? "border-[#f4b942] text-[#f4b942]" : "border-white/10 text-white/80 hover:border-white/20"}`}
                  style={selectedDuration === duration.months ? { backgroundColor: "rgba(244,185,66,0.12)" } : { backgroundColor: "#151b3d" }}
                >
                  {duration.label} — {formatBDT(duration.priceBDT)}
                </button>
              ))}
            </div>
          </section>
        )}

        <AnimatePresence mode="wait">
          {selectedPlan && (
            <motion.section
              key={selectedPlan.planName}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-14 grid md:grid-cols-2 gap-6"
              aria-label={`${selectedPlan.planName} details`}
            >
              <div className="rounded-2xl border border-white/10 p-6" style={{ backgroundColor: "#151b3d" }}>
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Check className="w-5 h-5" style={{ color: "#10b981" }} /> What’s Included</h2>
                {safeList(selectedPlan.whatsIncluded).length ? (
                  <ul className="space-y-2">
                    {safeList(selectedPlan.whatsIncluded).map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm" style={{ color: "#c9ceda" }}>
                        <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#10b981" }} /> {feature}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm" style={{ color: "#c9ceda" }}>Confirm the current included features and provider limits before purchase.</p>
                )}
              </div>
              <div className="rounded-2xl border border-white/10 p-6" style={{ backgroundColor: "#151b3d" }}>
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><X className="w-5 h-5" style={{ color: "#ef4444" }} /> Limits & Conditions</h2>
                {safeList(selectedPlan.limitations).length ? (
                  <ul className="space-y-2">
                    {safeList(selectedPlan.limitations).map((limitation) => (
                      <li key={limitation} className="flex items-start gap-2 text-sm" style={{ color: "#c9ceda" }}>
                        <Info className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#f4b942" }} /> {limitation}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm" style={{ color: "#c9ceda" }}>Provider limits can change. Confirm the limits that apply to this plan before payment.</p>
                )}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {useCases.length > 0 && (
          <section className="mb-14">
            <h2 className="text-2xl font-bold text-white mb-6">Useful For Bangladesh Customers</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {useCases.map((useCase) => (
                <div key={useCase} className="rounded-xl border border-white/10 p-5" style={{ backgroundColor: "#151b3d" }}>
                  <Users className="w-5 h-5 mb-3" style={{ color: "#f4b942" }} />
                  <p className="text-sm font-medium text-white">{useCase}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mb-14">
          <h2 className="text-2xl font-bold text-white mb-6">Why Use AI Premium Shop?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {usps.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-xl border border-white/10 p-4" style={{ backgroundColor: "#151b3d" }}>
                <ShieldCheck className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "#10b981" }} />
                <p className="text-sm text-white">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-bold text-white mb-6">How It Works</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {safeHowItWorks.map((step, index) => (
              <div key={`${step.title}-${index}`} className="text-center rounded-xl border border-white/10 p-6" style={{ backgroundColor: "#151b3d" }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold" style={{ backgroundColor: "rgba(244,185,66,0.15)", color: "#f4b942" }}>{index + 1}</div>
                <h3 className="font-semibold text-white mb-1">{step.title}</h3>
                <p className="text-xs" style={{ color: "#c9ceda" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14 rounded-2xl border border-white/10 p-6" style={{ backgroundColor: "#151b3d" }}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div>
              <ShieldCheck className="w-6 h-6 mx-auto mb-2" style={{ color: "#10b981" }} />
              <div className="font-bold text-white">{accessLabel(selectedPlan)}</div>
              <div className="text-xs" style={{ color: "#c9ceda" }}>Exact access method confirmed before payment</div>
            </div>
            <div>
              <Clock className="w-6 h-6 mx-auto mb-2" style={{ color: "#10b981" }} />
              <div className="font-bold text-white">Current ETA confirmed</div>
              <div className="text-xs" style={{ color: "#c9ceda" }}>No default delivery-time promise</div>
            </div>
            <div>
              <Wallet className="w-6 h-6 mx-auto mb-2" style={{ color: "#10b981" }} />
              <div className="font-bold text-white">bKash / Nagad</div>
              <div className="text-xs" style={{ color: "#c9ceda" }}>Local BDT payment options</div>
            </div>
            <div>
              <Users className="w-6 h-6 mx-auto mb-2" style={{ color: "#10b981" }} />
              <div className="font-bold text-white">10,000+ customers</div>
              <div className="text-xs" style={{ color: "#c9ceda" }}>Serving customers since 2022</div>
            </div>
          </div>
          <div className="mt-5 text-center text-xs" style={{ color: "#c9ceda" }}>
            Refund or replacement eligibility depends on the confirmed order terms. Review the <Link href="/refund-policy" className="underline hover:text-white">refund policy</Link> before payment.
          </div>
        </section>

        {faqs.length > 0 && (
          <section className="mb-14">
            <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div key={`${faq.q}-${index}`} className="rounded-xl border border-white/10 overflow-hidden" style={{ backgroundColor: "#151b3d" }}>
                  <button
                    type="button"
                    onClick={() => setFaqOpen(faqOpen === index ? null : index)}
                    className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left"
                    aria-expanded={faqOpen === index}
                  >
                    <span className="font-medium text-white text-sm">{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform ${faqOpen === index ? "rotate-180" : ""}`} style={{ color: "#c9ceda" }} />
                  </button>
                  <AnimatePresence>
                    {faqOpen === index && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="px-5 pb-4 text-sm leading-relaxed" style={{ color: "#c9ceda" }}>{sanitizeProse(faq.a)}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </section>
        )}

        {product.relatedProducts && product.relatedProducts.length > 0 && (
          <section className="mb-14">
            <h2 className="text-2xl font-bold text-white mb-6">Related Products</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {product.relatedProducts.map((related) => {
                const records = rawProducts.filter((record) => record.slug === related.slug);
                if (!records.length) return null;
                const main = records[0];
                const prices = records
                  .filter((record) => !record.requestPrice && typeof record.price === "number" && (record.price ?? 0) > 0)
                  .map((record) => Number(record.price));
                const currentPrice = prices.length ? Math.min(...prices) : null;
                return (
                  <Link key={related.slug} href={productPath(related.slug)} className="rounded-xl border border-white/10 p-4 block hover:border-white/20 transition-colors" style={{ backgroundColor: "#151b3d" }}>
                    <div className="text-sm font-semibold text-white mb-1">{main.name.split(/—\s*/)[0].trim()}</div>
                    <div className="text-sm font-bold" style={{ color: "#f4b942" }}>{currentPrice ? `From ${formatBDT(currentPrice)}` : "Current price on request"}</div>
                    <div className="text-xs mt-1 capitalize" style={{ color: "#c9ceda" }}>{main.category}</div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        <div className="text-center text-xs mb-16" style={{ color: "#64748b" }}>
          {verificationDate ? `Catalog verification date: ${verificationDate}. ` : "Verification date is not yet published for this listing. "}
          Product names and trademarks belong to their respective owners.
        </div>
      </div>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-white/10" style={{ backgroundColor: "#0a0e27" }}>
        <div className="flex items-center justify-between px-4 h-16 gap-3">
          <div>
            <div className="text-xs" style={{ color: "#c9ceda" }}>{selectedPlan?.planName ?? product.name}</div>
            <div className="text-base font-bold" style={{ color: "#f4b942" }}>
              {product.requestPrice || selectedPrice <= 0 ? "Price: ask on WhatsApp" : formatBDT(selectedPrice)}
            </div>
          </div>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity flex-shrink-0"
            style={{ backgroundColor: "#008236", color: "#fff", minHeight: "44px" }}
          >
            <MessageCircle className="w-4 h-4" /> Confirm
          </a>
        </div>
      </div>
    </PageLayout>
  );
}
