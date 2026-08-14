import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, Info, MessageCircle, ShieldCheck, WalletCards } from "lucide-react";
import { Link } from "wouter";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BrandIcon } from "@/components/BrandIcon";
import { formatBDT } from "@/lib/format";
import { productPath } from "@/lib/productRoutes";
import productsData from "../../data/catalog-pages.json";

const WHATSAPP = "https://wa.me/8801865385348";
const RETIRED_PRODUCT_SLUGS = new Set(["replit-bangladesh"]);

type ProductRecord = (typeof productsData.products)[number];

interface CompRow {
  feature: string;
  a: string | boolean;
  b: string | boolean;
}

interface WhoRow {
  persona: string;
  pick: string;
  reason: string;
}

interface CompConfig {
  title: string;
  h1: string;
  aioSnippet: string;
  metaDescription: string;
  canonical: string;
  productA: { name: string; color: string; orderText: string; slug: string };
  productB: { name: string; color: string; orderText: string; slug: string };
  rows: CompRow[];
  verdict: string;
  verdictA: string;
  verdictB: string;
  buyBothText?: string;
  whoTable: WhoRow[];
  relatedGuides: { label: string; href: string }[];
}

// Keep this literal data-only object: prerender-products.mjs parses it without
// executing application code. The strings are intentionally nonvolatile so a
// crawler never receives hand-entered model versions, quotas, delivery SLAs,
// discounts or provider capability claims. Runtime price/access evidence below
// comes from the generated public catalog instead.
const COMPARISONS: Record<string, CompConfig> = {
  "chatgpt-vs-claude": {
    title: "ChatGPT Plus vs Claude in Bangladesh | AI Premium Shop",
    h1: "ChatGPT Plus vs Claude — Compare Current AIPS Options",
    aioSnippet: "Compare current AI Premium Shop catalog records for ChatGPT Plus and Claude. Use published BDT price and access model as AIPS evidence, then verify current provider features, limits and plan terms before purchase.",
    metaDescription: "Compare current AIPS ChatGPT Plus and Claude options by published BDT price and access model. Verify provider features, limits and terms before purchase.",
    canonical: "https://aipremiumshop.com/chatgpt-vs-claude",
    productA: { name: "ChatGPT Plus", color: "#10a37f", orderText: "View ChatGPT", slug: "chatgpt-plus-bangladesh" },
    productB: { name: "Claude", color: "#d97706", orderText: "View Claude", slug: "claude-pro-bangladesh" },
    rows: [
      { feature: "AIPS public pricing", a: "See current product page", b: "See current product page" },
      { feature: "Access model", a: "Compare current published plans", b: "Compare current published plans" },
      { feature: "Provider features and limits", a: "Verify current provider terms", b: "Verify current provider terms" },
      { feature: "Availability and delivery", a: "Confirm before payment", b: "Confirm before payment" }
    ],
    verdict: "Choose from current catalog evidence first: price, access model and the exact plan. Provider-controlled features and limits can change and should be checked against current provider terms.",
    verdictA: "Choose a ChatGPT plan only when its current access model, price and provider terms fit your workflow.",
    verdictB: "Choose a Claude plan only when its current access model, price and provider terms fit your workflow.",
    whoTable: [
      { persona: "You need personal access", pick: "Compare personal plans", reason: "Use the current product pages to see which personal access options are actually published." },
      { persona: "You can use shared access", pick: "Compare shared plans", reason: "Confirm the exact shared-access arrangement and current provider rules before payment." },
      { persona: "A provider feature is essential", pick: "Check provider terms", reason: "Do not rely on a static comparison for model names, quotas, credits or changing feature limits." }
    ],
    relatedGuides: [
      { label: "Best AI for freelancers", href: "/best-ai-for-freelancers" },
      { label: "Best AI for students", href: "/best-ai-for-students" }
    ]
  },
  "chatgpt-vs-gemini": {
    title: "ChatGPT Plus vs Google AI Pro | AI Premium Shop",
    h1: "ChatGPT Plus vs Google AI Pro — Compare Current AIPS Options",
    aioSnippet: "Compare current AI Premium Shop catalog records for ChatGPT Plus and Google AI Pro. Use published BDT price and access model as AIPS evidence, then verify current provider features, limits and plan terms before purchase.",
    metaDescription: "Compare current AIPS ChatGPT Plus and Google AI Pro options by published BDT price and access model. Verify provider terms before purchase.",
    canonical: "https://aipremiumshop.com/chatgpt-vs-gemini",
    productA: { name: "ChatGPT Plus", color: "#10a37f", orderText: "View ChatGPT", slug: "chatgpt-plus-bangladesh" },
    productB: { name: "Google AI Pro", color: "#4285f4", orderText: "View Google AI Pro", slug: "gemini-advanced-bangladesh" },
    rows: [
      { feature: "AIPS public pricing", a: "See current product page", b: "See current product page" },
      { feature: "Access model", a: "Compare current published plans", b: "Compare current published plans" },
      { feature: "Provider features and limits", a: "Verify current provider terms", b: "Verify current provider terms" },
      { feature: "Availability and delivery", a: "Confirm before payment", b: "Confirm before payment" }
    ],
    verdict: "Use the current catalog to compare AIPS price and access. Verify provider-controlled features, storage, model availability and usage limits directly against current provider terms.",
    verdictA: "Choose a ChatGPT plan only when the current plan details fit your workflow.",
    verdictB: "Choose a Google AI Pro plan only when the current plan details fit your workflow.",
    whoTable: [
      { persona: "You need personal access", pick: "Compare personal plans", reason: "Use the current product pages rather than an old feature matrix." },
      { persona: "You can use shared access", pick: "Compare shared plans", reason: "Confirm the exact access arrangement before payment." },
      { persona: "Storage or ecosystem features matter", pick: "Check provider terms", reason: "Provider-controlled entitlements can change independently of AIPS pricing." }
    ],
    relatedGuides: [
      { label: "Best AI for business", href: "/best-ai-for-business" },
      { label: "Best AI for students", href: "/best-ai-for-students" }
    ]
  },
  "chatgpt-vs-perplexity": {
    title: "ChatGPT Plus vs Perplexity Pro | AI Premium Shop",
    h1: "ChatGPT Plus vs Perplexity Pro — Compare Current AIPS Options",
    aioSnippet: "Compare current AI Premium Shop catalog records for ChatGPT Plus and Perplexity Pro by published BDT price and access model. Verify current provider capabilities and limits before purchase.",
    metaDescription: "Compare current AIPS ChatGPT Plus and Perplexity Pro options by published BDT price and access model. Confirm provider terms before purchase.",
    canonical: "https://aipremiumshop.com/chatgpt-vs-perplexity",
    productA: { name: "ChatGPT Plus", color: "#10a37f", orderText: "View ChatGPT", slug: "chatgpt-plus-bangladesh" },
    productB: { name: "Perplexity Pro", color: "#20808d", orderText: "View Perplexity", slug: "perplexity-pro-bangladesh" },
    rows: [
      { feature: "AIPS public pricing", a: "See current product page", b: "See current product page" },
      { feature: "Access model", a: "Compare current published plans", b: "Compare current published plans" },
      { feature: "Provider features and limits", a: "Verify current provider terms", b: "Verify current provider terms" },
      { feature: "Availability and delivery", a: "Confirm before payment", b: "Confirm before payment" }
    ],
    verdict: "Compare the exact AIPS plans first, then verify any provider capability that your workflow depends on.",
    verdictA: "Choose ChatGPT only after checking the current plan and provider terms.",
    verdictB: "Choose Perplexity only after checking the current plan and provider terms.",
    whoTable: [
      { persona: "Price is your main constraint", pick: "Compare current BDT plans", reason: "Use live catalog pricing rather than an old comparison snapshot." },
      { persona: "Access privacy matters", pick: "Compare access modes", reason: "Check whether the current plan is shared or personal before payment." },
      { persona: "A research feature is essential", pick: "Check provider terms", reason: "Verify the exact current provider capability and limits." }
    ],
    relatedGuides: [
      { label: "Best AI for students", href: "/best-ai-for-students" },
      { label: "AI Assistant category", href: "/ai-assistant" }
    ]
  },
  "claude-vs-gemini": {
    title: "Claude vs Google AI Pro in Bangladesh | AI Premium Shop",
    h1: "Claude vs Google AI Pro — Compare Current AIPS Options",
    aioSnippet: "Compare current AI Premium Shop catalog records for Claude and Google AI Pro by published BDT price and access model. Verify current provider features, limits and terms before purchase.",
    metaDescription: "Compare current AIPS Claude and Google AI Pro options by published BDT price and access model. Verify provider features and terms before purchase.",
    canonical: "https://aipremiumshop.com/claude-vs-gemini",
    productA: { name: "Claude", color: "#d97706", orderText: "View Claude", slug: "claude-pro-bangladesh" },
    productB: { name: "Google AI Pro", color: "#4285f4", orderText: "View Google AI Pro", slug: "gemini-advanced-bangladesh" },
    rows: [
      { feature: "AIPS public pricing", a: "See current product page", b: "See current product page" },
      { feature: "Access model", a: "Compare current published plans", b: "Compare current published plans" },
      { feature: "Provider features and limits", a: "Verify current provider terms", b: "Verify current provider terms" },
      { feature: "Availability and delivery", a: "Confirm before payment", b: "Confirm before payment" }
    ],
    verdict: "Use the current AIPS catalog for price/access evidence and current provider documentation for changing feature entitlements.",
    verdictA: "Choose Claude only after checking the current plan and provider terms.",
    verdictB: "Choose Google AI Pro only after checking the current plan and provider terms.",
    whoTable: [
      { persona: "You need personal access", pick: "Compare personal plans", reason: "Use the current product pages for the real access options." },
      { persona: "You can use shared access", pick: "Compare shared plans", reason: "Confirm the current arrangement and provider rules." },
      { persona: "An ecosystem feature matters", pick: "Check provider terms", reason: "Do not rely on static feature entitlements." }
    ],
    relatedGuides: [
      { label: "Best AI for developers", href: "/best-ai-for-developers" },
      { label: "AI Assistant category", href: "/ai-assistant" }
    ]
  },
  "midjourney-vs-ideogram": {
    title: "Midjourney vs Ideogram in Bangladesh | AI Premium Shop",
    h1: "Midjourney vs Ideogram — Compare Current AIPS Options",
    aioSnippet: "Compare current AI Premium Shop catalog records for Midjourney and Ideogram by published BDT price and access model. Verify current provider features, credits, usage limits and commercial terms before purchase.",
    metaDescription: "Compare current AIPS Midjourney and Ideogram options by published BDT price and access model. Verify provider limits and terms before purchase.",
    canonical: "https://aipremiumshop.com/midjourney-vs-ideogram",
    productA: { name: "Midjourney", color: "#8b5cf6", orderText: "View Midjourney", slug: "midjourney-bangladesh" },
    productB: { name: "Ideogram", color: "#ec4899", orderText: "View Ideogram", slug: "ideogram-bangladesh" },
    rows: [
      { feature: "AIPS public pricing", a: "See current product page", b: "See current product page" },
      { feature: "Access model", a: "Compare current published plans", b: "Compare current published plans" },
      { feature: "Provider credits and limits", a: "Verify current provider terms", b: "Verify current provider terms" },
      { feature: "Availability and delivery", a: "Confirm before payment", b: "Confirm before payment" }
    ],
    verdict: "Compare current AIPS price/access first. Image-model capabilities, credits and commercial-use terms are provider-controlled and should be verified for the exact plan.",
    verdictA: "Choose Midjourney only after checking current AIPS and provider plan details.",
    verdictB: "Choose Ideogram only after checking current AIPS and provider plan details.",
    whoTable: [
      { persona: "Budget is your main constraint", pick: "Compare current BDT plans", reason: "Use live catalog pricing rather than old typed amounts." },
      { persona: "Credits or usage limits matter", pick: "Check provider terms", reason: "These limits can change by provider plan." },
      { persona: "Commercial use matters", pick: "Verify exact plan terms", reason: "Confirm current provider licensing for your intended use." }
    ],
    relatedGuides: [
      { label: "Best AI for designers", href: "/best-ai-for-designers" },
      { label: "AI Image category", href: "/ai-image" }
    ]
  },
  "canva-vs-adobe-express": {
    title: "Canva Pro vs Adobe Express | AI Premium Shop",
    h1: "Canva Pro vs Adobe Express — Compare Current AIPS Options",
    aioSnippet: "Compare current AI Premium Shop catalog records for Canva Pro and Adobe Express Premium by published BDT price and access model. Verify current provider features, asset entitlements and limits before purchase.",
    metaDescription: "Compare current AIPS Canva Pro and Adobe Express options by published BDT price and access model. Verify provider terms before purchase.",
    canonical: "https://aipremiumshop.com/canva-vs-adobe-express",
    productA: { name: "Canva Pro", color: "#00c4cc", orderText: "View Canva", slug: "canva-pro-bangladesh" },
    productB: { name: "Adobe Express Premium", color: "#ff0000", orderText: "View Adobe Express", slug: "adobe-express-premium-bangladesh" },
    rows: [
      { feature: "AIPS public pricing", a: "See current product page", b: "See current product page" },
      { feature: "Access model", a: "Compare current published plans", b: "Compare current published plans" },
      { feature: "Provider features and assets", a: "Verify current provider terms", b: "Verify current provider terms" },
      { feature: "Availability and delivery", a: "Confirm before payment", b: "Confirm before payment" }
    ],
    verdict: "Use the current catalog for AIPS price/access evidence and verify changing provider feature/asset entitlements for the exact plan.",
    verdictA: "Choose Canva only after checking the current plan and provider terms.",
    verdictB: "Choose Adobe Express only after checking the current plan and provider terms.",
    whoTable: [
      { persona: "You need a fixed published price", pick: "Compare current product pages", reason: "Request-price offers should not be treated as fixed-price offers." },
      { persona: "Access type matters", pick: "Compare current access modes", reason: "Check the exact arrangement before payment." },
      { persona: "Assets or AI credits matter", pick: "Check provider terms", reason: "Verify current provider entitlements rather than an old static matrix." }
    ],
    relatedGuides: [
      { label: "Best AI for designers", href: "/best-ai-for-designers" },
      { label: "AI Design category", href: "/ai-design" }
    ]
  },
  "copilot-vs-cursor": {
    title: "GitHub Copilot vs Cursor in Bangladesh | AI Premium Shop",
    h1: "GitHub Copilot vs Cursor — Compare Current AIPS Options",
    aioSnippet: "Compare current AI Premium Shop catalog records for GitHub Copilot and Cursor by published BDT price and access model. Verify current provider models, quotas and feature limits before purchase.",
    metaDescription: "Compare current AIPS GitHub Copilot and Cursor options by published BDT price and access model. Verify provider limits and terms before purchase.",
    canonical: "https://aipremiumshop.com/copilot-vs-cursor",
    productA: { name: "GitHub Copilot", color: "#6e40c9", orderText: "View GitHub Copilot", slug: "github-copilot-bangladesh" },
    productB: { name: "Cursor", color: "#60a5fa", orderText: "View Cursor", slug: "cursor-bangladesh" },
    rows: [
      { feature: "AIPS public pricing", a: "See current product page", b: "See current product page" },
      { feature: "Access model", a: "Compare current published plans", b: "Compare current published plans" },
      { feature: "Provider models and quotas", a: "Verify current provider terms", b: "Verify current provider terms" },
      { feature: "Availability and delivery", a: "Confirm before payment", b: "Confirm before payment" }
    ],
    verdict: "Developer-tool capabilities and quotas move quickly. Use AIPS for current published price/access, then verify provider-controlled features for the exact plan.",
    verdictA: "Choose GitHub Copilot only after checking the current plan and provider terms.",
    verdictB: "Choose Cursor only after checking the current plan and provider terms.",
    whoTable: [
      { persona: "Price is your main constraint", pick: "Compare current BDT plans", reason: "Use live AIPS catalog values." },
      { persona: "Model quotas matter", pick: "Check provider terms", reason: "Quota and model availability can change quickly." },
      { persona: "Access privacy matters", pick: "Compare access modes", reason: "Confirm the exact AIPS access arrangement before payment." }
    ],
    relatedGuides: [
      { label: "Best AI for developers", href: "/best-ai-for-developers" },
      { label: "AI Code category", href: "/ai-code" }
    ]
  }
};

const records = (productsData.products as ProductRecord[]).filter((product) => !RETIRED_PRODUCT_SLUGS.has(product.slug));

function displayAccessMode(mode: string | null | undefined) {
  if (mode === "shared") return "Shared";
  if (mode === "personal") return "Personal";
  if (mode === "team") return "Team";
  if (mode === "bundle") return "Bundle";
  if (mode === "setup-service" || mode === "setup" || mode === "service") return "Setup / service";
  return "Confirm";
}

function minimumPrice(items: ProductRecord[], mode?: string) {
  const values = items
    .filter((item) => !item.requestPrice && (!mode || item.accessType === mode))
    .map((item) => item.price)
    .filter((value): value is number => typeof value === "number" && value > 0);
  return values.length ? Math.min(...values) : null;
}

function ProductColumn({ config, items }: { config: CompConfig["productA"]; items: ProductRecord[] }) {
  const first = items[0];
  const lowest = minimumPrice(items);
  const shared = minimumPrice(items, "shared");
  const personal = minimumPrice(items, "personal");
  const modes = [...new Set(items.map((item) => item.accessType).filter(Boolean))].map(displayAccessMode);
  const tags = [...new Set(items.flatMap((item) => item.capabilities ?? []))].slice(0, 6);

  return (
    <article className="rounded-2xl border border-white/10 p-5 md:p-6" style={{ backgroundColor: "#151b3d" }}>
      <div className="flex items-center gap-3 mb-5">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10" style={{ backgroundColor: `${config.color}16` }}>
          <BrandIcon brand={first?.brand ?? config.name} color={config.color} size={30} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">{config.name}</h2>
          <p className="mt-1 text-xs text-slate-400">{items.length} current public plan record{items.length === 1 ? "" : "s"}</p>
        </div>
      </div>

      <dl className="space-y-4 text-sm">
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-3"><dt className="text-slate-400">Lowest published price</dt><dd className="font-semibold text-right text-[#f4b942]">{lowest ? `${formatBDT(lowest)}/mo` : "On request"}</dd></div>
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-3"><dt className="text-slate-400">Shared access</dt><dd className="font-medium text-right text-white">{shared ? `From ${formatBDT(shared)}/mo` : "Not currently published"}</dd></div>
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-3"><dt className="text-slate-400">Personal access</dt><dd className="font-medium text-right text-white">{personal ? `From ${formatBDT(personal)}/mo` : "Not currently published"}</dd></div>
        <div className="flex items-start justify-between gap-4"><dt className="text-slate-400">Published access modes</dt><dd className="font-medium text-right text-white">{modes.length ? modes.join(", ") : "Confirm before payment"}</dd></div>
      </dl>

      {tags.length > 0 && (
        <div className="mt-5 border-t border-white/10 pt-5">
          <p className="mb-2 text-xs font-semibold text-white">Catalog discovery tags</p>
          <div className="flex flex-wrap gap-1.5">{tags.map((tag) => <span key={tag} className="rounded-full border border-white/10 px-2 py-1 text-xs capitalize text-slate-300">{String(tag).replaceAll("-", " ")}</span>)}</div>
          <p className="mt-3 text-[11px] leading-5 text-slate-500">Discovery tags help narrow the catalog; they are not a promise that every plan includes every provider feature.</p>
        </div>
      )}

      <Link href={productPath(config.slug)} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: config.color }}>
        View current product details <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}

export default function ComparisonPage({ compKey }: { compKey: string }) {
  const reducedMotion = useReducedMotion();
  const comp = COMPARISONS[compKey];
  const aItems = useMemo(() => records.filter((item) => item.slug === comp?.productA.slug), [comp?.productA.slug]);
  const bItems = useMemo(() => records.filter((item) => item.slug === comp?.productB.slug), [comp?.productB.slug]);

  if (!comp || !aItems.length || !bItems.length) {
    return (
      <PageLayout>
        <SEOHead title="Comparison Not Available | AI Premium Shop" description="This comparison is not available in the current public catalog." noindex />
        <div id="main-content" className="mx-auto max-w-4xl px-4 py-24 text-center">
          <h1 className="mb-4 text-3xl font-bold text-white">Comparison not available</h1>
          <Link href="/products" className="inline-flex items-center gap-2 rounded-xl bg-[#f4b942] px-5 py-3 font-semibold text-[#0a0e27]">Browse current tools <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </PageLayout>
    );
  }

  const schema = { "@context": "https://schema.org", "@type": "WebPage", name: comp.title, url: comp.canonical, description: comp.metaDescription, about: [comp.productA.name, comp.productB.name] };
  const askUrl = `${WHATSAPP}?text=${encodeURIComponent(`Hi, please compare ${comp.productA.name} vs ${comp.productB.name} for my use case. Please confirm current AIPS price, access model, availability, delivery ETA and applicable provider limits before payment.`)}`;

  return (
    <PageLayout>
      <SEOHead title={comp.title} description={comp.metaDescription} canonical={comp.canonical} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Products", href: "/products" }, { name: `${comp.productA.name} vs ${comp.productB.name}` }]} />

      <div id="main-content" className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-14">
        <motion.header initial={reducedMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="mx-auto mb-10 max-w-4xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#f4b942]/[0.08] px-3 py-1.5 text-xs font-semibold text-[#f4b942]"><ShieldCheck className="h-3.5 w-3.5" /> Current public-catalog comparison</div>
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-5xl">{comp.productA.name} vs {comp.productB.name}</h1>
          <p className="text-base leading-7 text-slate-300 md:text-lg">Compare what AIPS can currently publish from its catalog: BDT price and access model. Provider models, quotas, credits, storage and feature limits can change independently, so verify those against current provider terms before purchase.</p>
        </motion.header>

        <div className="mb-8 grid gap-5 lg:grid-cols-2">
          <ProductColumn config={comp.productA} items={aItems} />
          <ProductColumn config={comp.productB} items={bItems} />
        </div>

        <section className="mb-10 grid gap-5 lg:grid-cols-[1fr_340px]">
          <div className="rounded-2xl border border-white/10 bg-[#151b3d] p-6">
            <h2 className="mb-4 text-xl font-bold text-white">How to make the comparison safely</h2>
            <div className="space-y-4">
              {[
                ["Start with access", "Decide whether your work requires personal access, can tolerate shared access, or needs a team/service arrangement."],
                ["Verify the provider today", "Check the exact current model lineup, credits, usage limits, storage and other provider-controlled entitlements."],
                ["Confirm the exact order", "Ask AIPS for current availability, delivery ETA and applicable terms for the exact plan before paying."]
              ].map(([heading, body]) => (
                <div key={heading} className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" /><div><h3 className="text-sm font-semibold text-white">{heading}</h3><p className="mt-1 text-sm leading-6 text-slate-300">{body}</p></div></div>
              ))}
            </div>
          </div>
          <aside className="rounded-2xl border border-white/10 bg-[#151b3d] p-6"><WalletCards className="mb-3 h-6 w-6 text-[#f4b942]" /><h2 className="mb-2 text-lg font-bold text-white">Need a current recommendation?</h2><p className="mb-4 text-sm leading-6 text-slate-300">Tell us your workflow, privacy requirement and budget. We can confirm the currently published AIPS options before payment.</p><a href={askUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-xl bg-[#008236] px-4 py-3 text-sm font-semibold text-white"><MessageCircle className="h-4 w-4" /> Ask for current comparison</a></aside>
        </section>

        <section className="rounded-2xl border border-white/10 bg-[#151b3d]/70 p-6">
          <div className="mb-5 flex items-start gap-3"><Info className="mt-0.5 h-5 w-5 text-[#f4b942]" /><div><h2 className="font-bold text-white">Related decision guides</h2><p className="mt-1 text-sm text-slate-300">Use-case guides can narrow the category before you compare exact plans.</p></div></div>
          <div className="flex flex-wrap gap-2">{comp.relatedGuides.map((item) => <Link key={item.href} href={item.href} className="rounded-xl border border-white/10 px-3 py-2 text-sm font-medium text-slate-200 hover:border-white/20">{item.label}</Link>)}<Link href="/pricing" className="rounded-xl border border-white/10 px-3 py-2 text-sm font-medium text-slate-200 hover:border-white/20">Compare current pricing</Link></div>
        </section>
      </div>
    </PageLayout>
  );
}
