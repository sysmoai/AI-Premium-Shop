import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Clock,
  Info,
  MessageCircle,
  ShieldCheck,
  Users,
} from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { formatBDT } from "@/lib/format";
import { productPath } from "@/lib/productRoutes";
import { breadcrumbSchema, schemaJson } from "@/utils/schemas";
import productsData from "../../data/products.json";

const WHATSAPP = "https://wa.me/8801865385348";
const SITE = "https://aipremiumshop.com";
const RETIRED_PRODUCT_SLUGS = new Set(["replit-bangladesh"]);

interface Plan {
  planName: string;
  priceBDT: number;
  billingCycle?: string;
  deliveryType: "shared" | "personal" | "team";
  whatsIncluded: string[];
  features: string[];
  limitations: string[];
  durationOptions?: { months: number; priceBDT: number; label: string }[];
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
  relatedProducts?: { slug: string; name: string; priceBDT?: number; category?: string }[];
  howItWorksSteps?: { title: string; desc: string }[];
}

type RawRecord = ProductDetail & {
  tier?: string;
  price?: number | null;
  accessType?: string | null;
  capabilities?: string[];
};

const rawProducts: RawRecord[] = (Array.isArray(productsData)
  ? productsData
  : ((productsData as { products?: RawRecord[] }).products ?? [])) as RawRecord[];

const BLOCKED_CLAIMS = [
  /\bwarranty\b/i,
  /\breplacement\s+guarantee\b/i,
  /\bmoney[ -]?back\b/i,
  /\binstant\s+(?:delivery|access|activation)\b/i,
  /\bfast\s+delivery\b/i,
  /\b\d+\s*(?:min|mins|minutes|hrs?|hours?)\s+(?:delivery|activation)\b/i,
  /\b5\s*[–-]\s*(?:15|30)\s*(?:min|minutes)\b/i,
  /\btrusted\s+by\b/i,
  /\b\d[\d,]*\+?\s+customers\b/i,
  /\bbest[ -]?seller\b/i,
  /\bbest\s+value\b/i,
  /\blimited\s+(?:time|offer)\b/i,
  /\b\d{1,3}%\s*off\b/i,
  /\bauthorized\b/i,
  /\bofficial\s+reseller\b/i,
  /\bauthentic\s+subscriptions?\b/i,
  /\bno\s+international\s+card\b/i,
  /\bnobody\s+can\s+see\b/i,
  /\bprivacy[- ]safe\b/i,
  /\bbest\s+for\b/i,
];
const UNLIMITED_SCOPE = /\b(fair[ -]?use|provider\s+limit|subject\s+to|credit|usage\s+limit|rate\s+limit|limits?\s+apply)\b/i;

function isUnsafeClaim(value: string): boolean {
  const text = value.trim();
  if (!text) return false;
  if (BLOCKED_CLAIMS.some((pattern) => pattern.test(text))) return true;
  return /\bunlimited\b/i.test(text) && !UNLIMITED_SCOPE.test(text);
}

function safeList(values: string[] | undefined): string[] {
  return (values ?? [])
    .map((value) => String(value).trim())
    .filter((value) => value && !isUnsafeClaim(value));
}

function sanitizeProse(value: string | undefined, fallback: string): string {
  if (!value?.trim()) return fallback;
  const safe = value
    .split(/(?<=[.!?।])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean)
    .filter((sentence) => !isUnsafeClaim(sentence));
  return safe.length ? safe.join(" ") : fallback;
}

function cleanName(value: string): string {
  return value.split(/—\s*/)[0].split(/\s+-\s+/)[0].trim();
}

function accessType(value: string | null | undefined): Plan["deliveryType"] {
  if (value === "shared") return "shared";
  if (value === "team") return "team";
  return "personal";
}

function accessLabel(value: Plan["deliveryType"]): string {
  if (value === "shared") return "Shared access";
  if (value === "team") return "Team access";
  return "Personal access";
}

function fitTitle(value: string): string {
  if (value.length <= 68) return value;
  const suffix = " | AI Premium Shop";
  return `${value.slice(0, Math.max(24, 67 - suffix.length)).trimEnd()}…${suffix}`;
}

function fitDescription(value: string): string {
  return value.length <= 158 ? value : `${value.slice(0, 157).trimEnd()}…`;
}

function normalizeExplicitPlans(plans: Plan[] | undefined): Plan[] {
  return (plans ?? [])
    .filter((plan) => typeof plan.priceBDT === "number" && Number.isFinite(plan.priceBDT) && plan.priceBDT > 0)
    .map((plan) => ({
      planName: plan.planName || "Plan",
      priceBDT: plan.priceBDT,
      billingCycle: plan.billingCycle,
      deliveryType: accessType(plan.deliveryType),
      whatsIncluded: safeList(plan.whatsIncluded),
      features: safeList(plan.features),
      limitations: safeList(plan.limitations),
      durationOptions: (plan.durationOptions ?? []).filter((option) => option.priceBDT > 0),
    }));
}

function getProductBySlug(slug: string): ProductDetail | undefined {
  if (RETIRED_PRODUCT_SLUGS.has(slug)) return undefined;
  const all = rawProducts.filter((record) => record.slug === slug && !RETIRED_PRODUCT_SLUGS.has(record.slug));
  if (!all.length) return undefined;

  const main = all[0];
  const explicit = normalizeExplicitPlans(main.plans);
  const synthesized = main.requestPrice
    ? []
    : all
        .filter((record) => typeof record.price === "number" && Number.isFinite(record.price) && Number(record.price) > 0)
        .map((record) => {
          const tags = safeList(record.capabilities);
          return {
            planName: record.tier ?? record.name ?? "Plan",
            priceBDT: Number(record.price),
            billingCycle: "monthly",
            deliveryType: accessType(record.accessType),
            whatsIncluded: tags,
            features: tags,
            limitations: [],
          } satisfies Plan;
        });

  return {
    ...main,
    name: cleanName(main.name),
    plans: explicit.length ? explicit : synthesized,
  };
}

function relatedProductsFor(product: ProductDetail) {
  const families = new Map<string, RawRecord>();
  for (const record of rawProducts) {
    if (record.slug === product.slug || RETIRED_PRODUCT_SLUGS.has(record.slug) || record.category !== product.category) continue;
    const current = families.get(record.slug);
    const currentPrice = current?.price ?? Number.POSITIVE_INFINITY;
    const nextPrice = record.price ?? Number.POSITIVE_INFINITY;
    if (!current || nextPrice < currentPrice) families.set(record.slug, record);
  }
  return [...families.values()]
    .sort((a, b) => (a.price ?? Number.POSITIVE_INFINITY) - (b.price ?? Number.POSITIVE_INFINITY) || a.name.localeCompare(b.name))
    .slice(0, 4);
}

const SAFE_DECISION_POINTS = [
  "Published BDT price shown where available",
  "Access model shown before payment",
  "Availability and delivery ETA confirmed before payment",
  "Provider-controlled limits should be checked for the exact plan",
];

const SAFE_STEPS = [
  { title: "Choose the plan", desc: "Review the published BDT price and access model." },
  { title: "Confirm current details", desc: "Confirm availability, provider limits, delivery ETA and applicable terms before payment." },
  { title: "Complete the order", desc: "Pay only after the exact order details are confirmed, then receive access according to that confirmation." },
];

export default function ProductPage({ productSlug }: { productSlug: string }) {
  const reducedMotion = useReducedMotion();
  const product = getProductBySlug(productSlug);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [selectedDuration, setSelectedDuration] = useState(1);

  const plans = useMemo(() => product?.plans ?? [], [product]);
  const cheapestPlan = plans.length ? plans.reduce((a, b) => (a.priceBDT < b.priceBDT ? a : b)) : null;
  const fromPrice = cheapestPlan?.priceBDT ?? 0;

  useEffect(() => {
    setSelectedPlan(plans[0] ?? null);
    setSelectedDuration(plans[0]?.durationOptions?.[0]?.months ?? 1);
  }, [productSlug, plans]);

  if (!product) {
    return (
      <PageLayout>
        <SEOHead title="Product Not Found | AI Premium Shop" description="This product is not in the current public AI Premium Shop catalog." noindex />
        <div id="main-content" className="mx-auto max-w-5xl px-4 pb-20 pt-12 text-center">
          <h1 className="mb-4 text-3xl font-bold text-white">Product Not Found</h1>
          <p className="mb-8 text-slate-300">This product is not in the current public catalog. Browse active alternatives instead.</p>
          <Link href="/products" className="inline-flex items-center gap-2 rounded-xl bg-[#f4b942] px-6 py-3 font-semibold text-[#0a0e27]">Browse Current Products <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </PageLayout>
    );
  }

  const selectedPrice = selectedPlan?.durationOptions?.find((duration) => duration.months === selectedDuration)?.priceBDT ?? selectedPlan?.priceBDT ?? fromPrice;
  const priceText = product.requestPrice || fromPrice <= 0 ? "Current price on request" : `From ${formatBDT(fromPrice)}/month`;
  const seoTitle = fitTitle(`${product.name} Price in Bangladesh | AI Premium Shop`);
  const seoDescription = fitDescription(`${priceText}. Compare current AIPS access options for ${product.name} and confirm availability, provider limits, delivery ETA and terms before payment.`);
  const canonical = `${SITE}${productPath(product.slug)}`;
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: product.category, href: `/${product.category}` },
    { name: product.name },
  ];

  const description = sanitizeProse(product.description, `${product.name} is listed in the current AI Premium Shop catalog. Review the current plan, access model and provider terms before purchase.`);
  const descriptionBN = sanitizeProse(product.descriptionBN, "");
  const sourceDecisionPoints = safeList(product.uniqueSellingPoints);
  const decisionPoints = sourceDecisionPoints.length ? sourceDecisionPoints.slice(0, 5) : SAFE_DECISION_POINTS;
  const useCases = safeList(product.useCasesBD).slice(0, 9);
  const sourceSteps = (product.howItWorksSteps ?? []).filter((step) => step?.title && step?.desc && !isUnsafeClaim(`${step.title}. ${step.desc}`));
  const steps = sourceSteps.length ? sourceSteps.slice(0, 4) : SAFE_STEPS;
  const related = relatedProductsFor(product);

  const whatsappText = product.requestPrice
    ? `Hi, I want ${product.name}. Please confirm the current AIPS price, access model, availability, provider limits, delivery ETA and applicable terms before payment.`
    : `Hi, I want ${product.name}${selectedPlan ? ` (${selectedPlan.planName})` : ""}. Published AIPS price: ${formatBDT(selectedPrice)}. Please confirm the current access model, availability, provider limits, delivery ETA and applicable terms before payment.`;
  const whatsappLink = `${WHATSAPP}?text=${encodeURIComponent(whatsappText)}`;

  return (
    <PageLayout>
      <SEOHead title={seoTitle} description={seoDescription} canonical={canonical} ogImage={product.logo} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaJson(breadcrumbSchema(breadcrumbs)) }} />

      <div id="main-content" className="mx-auto max-w-6xl px-4 pb-24 pt-6 md:px-8">
        <nav aria-label="breadcrumb" className="mb-7 flex flex-wrap items-center gap-2 text-sm text-slate-400">
          <Link href="/" className="transition-colors hover:text-white">Home</Link>
          {breadcrumbs.slice(1).map((item, index) => (
            <span key={`${item.name}-${index}`} className="flex items-center gap-2">
              <ChevronRight className="h-3.5 w-3.5" />
              {item.href ? <Link href={item.href} className="capitalize transition-colors hover:text-white">{item.name}</Link> : <span className="text-white">{item.name}</span>}
            </span>
          ))}
        </nav>

        <section className="mb-12 grid items-start gap-8 lg:grid-cols-[1fr_390px]">
          <motion.div initial={reducedMotion ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="mb-4 flex items-center gap-3">
              {product.logo && <img src={product.logo} alt={`${product.name} logo`} width={56} height={56} className="rounded-xl object-contain" />}
              <div>
                <h1 className="text-3xl font-bold leading-tight text-white md:text-4xl">{product.name}</h1>
                {product.tagline && !isUnsafeClaim(product.tagline) && <p className="mt-1 text-sm text-[#f4b942]">{product.tagline}</p>}
              </div>
            </div>
            <p className="max-w-3xl leading-7 text-slate-300">{description}</p>
            {descriptionBN && <p className="mt-4 max-w-3xl leading-7 text-white/85">{descriptionBN}</p>}

            <div className="mt-6 flex flex-wrap gap-2">
              {decisionPoints.map((point) => (
                <span key={point} className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/[0.08] px-3 py-1.5 text-xs font-medium text-emerald-300"><Check className="h-3.5 w-3.5" />{point}</span>
              ))}
            </div>
          </motion.div>

          <aside className="rounded-2xl border border-white/10 bg-[#151b3d] p-6 lg:sticky lg:top-24">
            <div className="text-sm text-slate-400">{product.requestPrice || fromPrice <= 0 ? "Current price" : "Published price from"}</div>
            <div className="mt-1 text-3xl font-bold text-white">{product.requestPrice || fromPrice <= 0 ? "Confirm on WhatsApp" : <>{formatBDT(fromPrice)}<span className="ml-1 text-sm font-normal text-slate-400">/mo</span></>}</div>
            <div className="mt-4 rounded-xl border border-white/10 bg-[#0a0e27] p-4 text-sm leading-6 text-slate-300">
              <ShieldCheck className="mr-2 inline h-4 w-4 text-[#f4b942]" />
              Confirm the exact access model, availability, provider limits, delivery ETA and applicable terms before payment.
            </div>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#008236] px-5 py-3 font-bold text-white transition-opacity hover:opacity-90">
              <MessageCircle className="h-5 w-5" /> Confirm current plan
            </a>
          </aside>
        </section>

        <section className="mb-12 rounded-2xl border border-white/10 bg-[#151b3d] p-6">
          <h2 className="mb-2 text-lg font-bold text-white">Current AIPS listing</h2>
          <p className="leading-7 text-slate-300">{priceText}. This page publishes AIPS catalog price and access information only. Provider-controlled features, quotas, credits, storage and usage limits can change independently and should be checked for the exact plan.</p>
        </section>

        {plans.length > 0 ? (
          <section className="mb-14" aria-labelledby="product-plans-title">
            <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div><p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#f4b942]">Current catalog</p><h2 id="product-plans-title" className="text-2xl font-bold text-white">Choose an access plan</h2></div>
              <p className="max-w-md text-sm text-slate-400">Plan-specific provider entitlements should be confirmed before payment.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {plans.map((plan) => {
                const active = selectedPlan?.planName === plan.planName;
                const tags = safeList(plan.whatsIncluded).slice(0, 4);
                return (
                  <motion.button
                    type="button"
                    key={`${plan.planName}-${plan.priceBDT}`}
                    aria-pressed={active}
                    onClick={() => { setSelectedPlan(plan); setSelectedDuration(plan.durationOptions?.[0]?.months ?? 1); }}
                    whileHover={reducedMotion ? undefined : { y: -3 }}
                    className={`rounded-2xl border p-5 text-left transition ${active ? "border-[#f4b942] ring-1 ring-[#f4b942]/25" : "border-white/10 hover:border-white/20"}`}
                    style={{ backgroundColor: "#151b3d" }}
                  >
                    <div className="font-semibold text-white">{plan.planName}</div>
                    <div className="mt-3 text-2xl font-bold text-white">{formatBDT(plan.priceBDT)}<span className="ml-1 text-sm font-normal text-slate-400">/mo</span></div>
                    <div className="mt-3 text-xs text-slate-300"><Users className="mr-1 inline h-3.5 w-3.5" />{accessLabel(plan.deliveryType)}</div>
                    <div className="mt-2 text-xs text-slate-400"><Clock className="mr-1 inline h-3.5 w-3.5" />Delivery ETA: confirm before payment</div>
                    {tags.length > 0 && <div className="mt-4 flex flex-wrap gap-1.5">{tags.map((tag) => <span key={tag} className="rounded-full border border-white/10 px-2 py-1 text-[11px] text-slate-400">{tag}</span>)}</div>}
                  </motion.button>
                );
              })}
            </div>
          </section>
        ) : (
          <section className="mb-14 rounded-2xl border border-white/10 bg-[#151b3d] p-6">
            <h2 className="text-xl font-bold text-white">Current plan details are confirmed on request</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">This listing does not publish a fixed plan price. Ask for the current price, access model, availability, provider limits, delivery ETA and applicable terms before payment.</p>
          </section>
        )}

        {selectedPlan?.durationOptions && selectedPlan.durationOptions.length > 1 && (
          <section className="mb-14">
            <h2 className="mb-3 text-lg font-bold text-white">Select duration</h2>
            <div className="flex flex-wrap gap-2">
              {selectedPlan.durationOptions.map((duration) => (
                <button key={duration.months} type="button" onClick={() => setSelectedDuration(duration.months)} className={`rounded-xl border px-4 py-2 text-sm font-medium transition ${selectedDuration === duration.months ? "border-[#f4b942] bg-[#f4b942]/10 text-[#f4b942]" : "border-white/10 text-slate-300 hover:border-white/20"}`}>{duration.label} — {formatBDT(duration.priceBDT)}</button>
              ))}
            </div>
          </section>
        )}

        <AnimatePresence mode="wait">
          {selectedPlan && (
            <motion.section key={`${selectedPlan.planName}-${selectedPrice}`} initial={reducedMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? undefined : { opacity: 0 }} className="mb-14 grid gap-5 md:grid-cols-2" aria-label={`${selectedPlan.planName} catalog notes`}>
              <div className="rounded-2xl border border-white/10 bg-[#151b3d] p-6">
                <h2 className="mb-4 text-lg font-bold text-white">Catalog discovery tags</h2>
                {safeList(selectedPlan.whatsIncluded).length ? <div className="flex flex-wrap gap-2">{safeList(selectedPlan.whatsIncluded).map((tag) => <span key={tag} className="rounded-full border border-white/10 px-2.5 py-1.5 text-xs text-slate-300">{tag}</span>)}</div> : <p className="text-sm text-slate-300">No plan-specific feature list is published here. Confirm provider entitlements before payment.</p>}
                <p className="mt-4 text-xs leading-5 text-slate-500">These catalog tags aid discovery and are not a promise that every provider feature is included in every plan.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-[#151b3d] p-6">
                <h2 className="mb-4 text-lg font-bold text-white">Limits and conditions</h2>
                {safeList(selectedPlan.limitations).length ? <ul className="space-y-2">{safeList(selectedPlan.limitations).map((note) => <li key={note} className="flex gap-2 text-sm text-slate-300"><Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#f4b942]" />{note}</li>)}</ul> : <p className="text-sm leading-6 text-slate-300">Provider limits can change. Confirm the limits that apply to this exact plan before payment.</p>}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {useCases.length > 0 && (
          <section className="mb-14">
            <h2 className="mb-6 text-2xl font-bold text-white">Workflow discovery tags</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{useCases.map((item) => <div key={item} className="rounded-xl border border-white/10 bg-[#151b3d] p-4 text-sm text-slate-200">{item}</div>)}</div>
          </section>
        )}

        <section className="mb-14">
          <h2 className="mb-6 text-2xl font-bold text-white">How the current buying flow works</h2>
          <div className="grid gap-4 sm:grid-cols-3">{steps.map((step, index) => <div key={`${step.title}-${index}`} className="rounded-xl border border-white/10 bg-[#151b3d] p-5"><div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#f4b942]/10 text-sm font-bold text-[#f4b942]">{index + 1}</div><h3 className="font-semibold text-white">{step.title}</h3><p className="mt-2 text-sm leading-6 text-slate-300">{step.desc}</p></div>)}</div>
        </section>

        {related.length > 0 && (
          <section className="mb-14">
            <h2 className="mb-6 text-2xl font-bold text-white">Related tools in this category</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{related.map((item) => <Link key={item.slug} href={productPath(item.slug)} className="rounded-xl border border-white/10 bg-[#151b3d] p-4 transition hover:border-white/20"><div className="font-semibold text-white">{cleanName(item.name)}</div><div className="mt-2 text-xs text-slate-400">{item.requestPrice || typeof item.price !== "number" ? "Check current price" : `From ${formatBDT(item.price)}`}</div></Link>)}</div>
          </section>
        )}

        <section className="mb-8 rounded-2xl border border-white/10 bg-[#151b3d] p-6 text-center">
          <h2 className="text-xl font-bold text-white">Confirm the exact plan before payment</h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-slate-300">AIPS catalog details help you compare options, but provider limits and order conditions can change. Confirm current price, access, availability, delivery ETA and applicable terms for the exact plan.</p>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#008236] px-6 py-3 font-bold text-white"><MessageCircle className="h-5 w-5" /> Ask AIPS to confirm</a>
        </section>

        <p className="mb-4 text-center text-xs text-slate-600">Product names and trademarks belong to their respective owners. AIPS does not imply provider authorization unless a current source explicitly documents it.</p>
      </div>
    </PageLayout>
  );
}
