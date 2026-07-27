import { notFound } from "next/navigation";
import {
  getProductBySlug,
  getWhatsappUrl,
  getRelatedProducts,
  getCategoryLabel,
} from "@/lib/data/products";
import { buildProductMetadata } from "@/lib/seo/metadata";
import {
  ProductJsonLd,
  BreadcrumbJsonLd,
  FAQPageJsonLd,
  HowToJsonLd,
} from "@/components/seo/json-ld";
import type { Metadata } from "next";
import Link from "next/link";
import { getProductGroups } from "@/lib/data/products";
import type { LiveProduct, ProductGroup } from "@/lib/data/products";
import {
  ChevronRight,
  MessageCircle,
  ShieldCheck,
  Clock,
  CreditCard,
  CheckCircle2,
  Zap,
  Users,
  Briefcase,
  GraduationCap,
  TrendingDown,
  Smartphone,
  Banknote,
  Lock,
  RefreshCw,
  HelpCircle,
  Star,
} from "lucide-react";

export function generateStaticParams() {
  return getProductGroups().map((g) => ({ slug: g.slug }));
}

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const group = getProductBySlug(slug);
  if (!group) {
    return {
      title: "Product Not Found | AI Premium Shop",
      robots: { index: false, follow: false },
    };
  }
  const savings = computeSavings(group);
  const metaDesc = savings > 0
    ? `Buy ${group.name} in Bangladesh from ৳${group.minPrice.toLocaleString("en-BD")}/mo. Save up to ${Math.round(savings)}% vs international price. bKash/Nagad payment. 5-15 min delivery via WhatsApp. Personal & shared plans available.`
    : `Buy ${group.name} in Bangladesh from ৳${group.minPrice.toLocaleString("en-BD")}/mo. bKash/Nagad payment. 5-15 min delivery via WhatsApp. Personal & shared plans available.`;

  return buildProductMetadata({
    name: group.name,
    shortDescription: metaDesc,
    slug: group.slug,
    basePriceBdt: group.minPrice,
  });
}

/* ─── Helpers ─── */

function computeSavings(group: ProductGroup): number {
  const personal = group.variants.find((v) => v.accessType === "personal");
  const shared = group.variants.find((v) => v.accessType === "shared");
  const anchor = personal ?? shared ?? group.variants[0];
  if (!anchor?.officialUSD || anchor.officialUSD <= 0) return 0;
  const officialBdt = Math.round(anchor.officialUSD * 130 * 1.15); // pricing formula: usd * 130 * 1.15
  const savings = ((officialBdt - anchor.price) / officialBdt) * 100;
  return Math.max(0, savings);
}

const CAPABILITY_LABELS: Record<string, { label: string; icon: React.ReactNode }> = {
  text: { label: "AI Text Generation", icon: <Zap className="size-4" /> },
  code: { label: "Code Assistant", icon: <Zap className="size-4" /> },
  vision: { label: "Computer Vision", icon: <Zap className="size-4" /> },
  document: { label: "Document Analysis", icon: <Zap className="size-4" /> },
  search: { label: "Web Search", icon: <Zap className="size-4" /> },
  "image-gen": { label: "AI Image Generation", icon: <Zap className="size-4" /> },
  "image-edit": { label: "AI Image Editing", icon: <Zap className="size-4" /> },
  "video-gen": { label: "AI Video Generation", icon: <Zap className="size-4" /> },
  "video-edit": { label: "AI Video Editing", icon: <Zap className="size-4" /> },
  voice: { label: "AI Voice & TTS", icon: <Zap className="size-4" /> },
  music: { label: "AI Music Creation", icon: <Zap className="size-4" /> },
  agents: { label: "AI Agents", icon: <Zap className="size-4" /> },
  workspace: { label: "Team Workspace", icon: <Zap className="size-4" /> },
};

function getCapabilityLabel(cap: string): string {
  return CAPABILITY_LABELS[cap]?.label ?? cap;
}

function getUseCases(category: string, brand: string): Array<{ icon: React.ReactNode; title: string; desc: string }> {
  const defaults = [
    { icon: <GraduationCap className="size-5" />, title: "Students", desc: `Use ${brand} for assignments, research papers, coding projects, and exam prep at a fraction of international cost.` },
    { icon: <Briefcase className="size-5" />, title: "Freelancers", desc: `Deliver high-quality client work faster. From content writing to design to code — ${brand} is your competitive edge.` },
    { icon: <Users className="size-5" />, title: "Small Businesses", desc: `Automate content, customer support, and creative tasks without hiring a full team. Pay in BDT.` },
    { icon: <Star className="size-5" />, title: "Agencies", desc: `Scale output across multiple clients. Shared plans keep costs low while maintaining premium quality.` },
  ];

  if (category === "ai-code") {
    return [
      { icon: <GraduationCap className="size-5" />, title: "CS Students", desc: `Learn faster with AI pair programming. Debug code, understand algorithms, and build projects.` },
      { icon: <Briefcase className="size-5" />, title: "Freelance Developers", desc: `Ship features 3x faster. AI autocomplete, code review, and architecture suggestions on demand.` },
      { icon: <Users className="size-5" />, title: "Tech Startups", desc: `Reduce engineering overhead. Let AI handle boilerplate so your team focuses on product.` },
      { icon: <Star className="size-5" />, title: "Software Agencies", desc: `Maintain consistency across large codebases. AI agents automate refactors and documentation.` },
    ];
  }
  if (category === "ai-image") {
    return [
      { icon: <GraduationCap className="size-5" />, title: "Design Students", desc: `Create portfolio pieces, mood boards, and concept art without expensive software licenses.` },
      { icon: <Briefcase className="size-5" />, title: "Social Media Managers", desc: `Generate on-brand visuals daily. No design skills needed — just describe what you want.` },
      { icon: <Users className="size-5" />, title: "E-commerce Owners", desc: `Create product mockups, banners, and ads in minutes. No photographer or designer required.` },
      { icon: <Star className="size-5" />, title: "Creative Agencies", desc: `Produce campaign visuals at scale. Shared plans let your entire team access premium AI.` },
    ];
  }
  if (category === "ai-video") {
    return [
      { icon: <GraduationCap className="size-5" />, title: "Content Creators", desc: `Make YouTube shorts, TikToks, and Reels with AI avatars and text-to-video. No camera needed.` },
      { icon: <Briefcase className="size-5" />, title: "Video Editors", desc: `Speed up workflows with AI-generated B-roll, transitions, and effects. Deliver faster.` },
      { icon: <Users className="size-5" />, title: "Marketing Teams", desc: `Produce localized video ads for the Bangladesh market without a production crew.` },
      { icon: <Star className="size-5" />, title: "EdTech Platforms", desc: `Generate training videos, explainer content, and course material at scale.` },
    ];
  }
  if (category === "ai-voice-music") {
    return [
      { icon: <GraduationCap className="size-5" />, title: "YouTubers & Podcasters", desc: `Clone your voice for consistent narration. Create intros, outros, and ad reads in Bengali or English.` },
      { icon: <Briefcase className="size-5" />, title: "Voice-over Artists", desc: `Expand your range with AI voices. Deliver more projects in less time.` },
      { icon: <Users className="size-5" />, title: "App Developers", desc: `Add natural-sounding voice interfaces to your apps. Multi-language TTS support included.` },
      { icon: <Star className="size-5" />, title: "Musicians & Producers", desc: `Generate royalty-free music, experiment with genres, and speed up your production workflow.` },
    ];
  }
  if (category === "ai-writing") {
    return [
      { icon: <GraduationCap className="size-5" />, title: "Bloggers", desc: `Publish SEO-optimized articles weekly. AI handles research, outlines, and first drafts.` },
      { icon: <Briefcase className="size-5" />, title: "Copywriters", desc: `Generate ad copy, landing pages, and email sequences in minutes. A/B test faster.` },
      { icon: <Users className="size-5" />, title: "BD E-commerce", desc: `Write product descriptions, Facebook ads, and WhatsApp marketing copy that converts.` },
      { icon: <Star className="size-5" />, title: "Marketing Agencies", desc: `Scale content production across 10+ clients without expanding your writing team.` },
    ];
  }
  if (category === "ai-workspace") {
    return [
      { icon: <GraduationCap className="size-5" />, title: "Students & Researchers", desc: `Organize notes, transcribe lectures, and generate summaries automatically.` },
      { icon: <Briefcase className="size-5" />, title: "Remote Teams", desc: `Centralize docs, wikis, and project management with AI-powered search and automation.` },
      { icon: <Users className="size-5" />, title: "BD SMEs", desc: `Replace scattered Google Docs and Excel sheets with a unified AI workspace.` },
      { icon: <Star className="size-5" />, title: "Consultants", desc: `Generate client proposals, meeting notes, and deliverables from a single platform.` },
    ];
  }
  if (category === "bundles") {
    return [
      { icon: <GraduationCap className="size-5" />, title: "Students", desc: `Get everything you need for academic success in one affordable package.` },
      { icon: <Briefcase className="size-5" />, title: "Freelancers", desc: `A complete AI toolkit that pays for itself with your first client project.` },
      { icon: <Users className="size-5" />, title: "Businesses", desc: `Full AI stack with setup support. Start using AI across your company immediately.` },
      { icon: <Star className="size-5" />, title: "Enterprise", desc: `Custom implementation with training, automation, and 30-day dedicated support.` },
    ];
  }
  return defaults;
}

/* ─── Page ─── */

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const group = getProductBySlug(slug);
  if (!group) notFound();

  const whatsappNumber = process.env.NEXT_PUBLIC_WA_PRIMARY ?? "8801865385348";
  const mainVariant = group.variants[0];
  const related = getRelatedProducts(group.slug, group.category, 3);
  const savings = computeSavings(group);
  const useCases = getUseCases(group.category, group.brand);
  
  // Product-specific FAQs + enrich data
  const firstVariant = group.variants[0] as typeof group.variants[0] & { 
    useCases?: string[]; whyBuyFromAIPS?: string; faq?: { q: string; a: string }[];
    competitorCompare?: { name: string; price: string; advantage: string }[];
    uniqueSellingPoints?: string[];
  };
  const productFAQs = firstVariant.faq ?? [];
  const banglaUseCases: string[] = firstVariant.useCases ?? [];
  const whyBuyFromAIPS = firstVariant.whyBuyFromAIPS ?? '';
  const usps: string[] = firstVariant.uniqueSellingPoints ?? [];
  const competitors = firstVariant.competitorCompare ?? [];

  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: group.brand, path: `/products/${group.slug}` },
  ];

  const faqItems = [
    ...productFAQs.map((f) => ({ question: f.q, answer: f.a })),
    {
      question: `How long does ${group.name} delivery take?`,
      answer: `Most orders are delivered within ${mainVariant.deliverySLA} after payment confirmation via WhatsApp. During peak hours (7 PM – 11 PM BST), delivery may take slightly longer. Personal accounts typically take 2-4 hours due to individual setup.`,
    },
    {
      question: `Is the ${group.name} account a Personal Account or shared?`,
      answer: "We offer both Personal Account setups and shared slot options depending on the product and plan tier. Shared plans are budget-friendly with multiple users. Personal plans give you full control with your own credentials. The exact account type is confirmed with you on WhatsApp before payment.",
    },
    {
      question: "What payment methods do you accept in Bangladesh?",
      answer: "We accept bKash (send money), Nagad (send money), Rocket, and local bank cards (Visa/Mastercard via SSLCommerz). All payments are confirmed via WhatsApp screenshot for your security. No international card or PayPal needed.",
    },
    {
      question: "What is your Resolution Policy?",
      answer: "Full refund if service is not delivered within 2 hours. Partial refund (50%) if you change your mind within 6 hours and credentials are unused. Shared plans include a 7-day replacement warranty. No refund after 24 hours or once credentials are actively used.",
    },
    {
      question: `Can I use ${group.brand} for commercial work?`,
      answer: `Yes. Personal plans include full commercial rights. Shared plans are suitable for personal and light commercial use. If you need enterprise licensing or team-wide commercial rights, contact us on WhatsApp for custom pricing.`,
    },
    {
      question: "Do you offer monthly or yearly plans?",
      answer: "Most products are billed monthly for flexibility. Some products like Notion Business offer 6-month plans at a discount. Contact us on WhatsApp if you want a custom quarterly or annual plan for any product.",
    },
  ];

  const howToSteps = [
    { name: "Choose your plan", text: `Select the ${group.name} plan that fits your needs on the product page.` },
    { name: "Confirm on WhatsApp", text: `Click "Order via WhatsApp" and send the pre-filled message. Our support team will confirm availability and final price.` },
    { name: "Pay with bKash or Nagad", text: "Send payment via bKash, Nagad, Rocket, or bank card. Share the transaction screenshot on WhatsApp for instant verification." },
    { name: "Receive in minutes", text: "Get your login credentials or setup guide delivered on WhatsApp within 5-15 minutes for shared plans, or 2-4 hours for Personal Accounts." },
  ];

  return (
    <>
      <ProductJsonLd name={group.name} description={group.description} slug={group.slug} priceBdt={group.minPrice} categoryName={group.category} />
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <FAQPageJsonLd items={faqItems} />
      <HowToJsonLd name={`How to activate ${group.name} in Bangladesh`} description={`Step-by-step guide to buying and activating ${group.name} in Bangladesh through AI Premium Shop.`} totalTime="PT15M" estimatedCost={{ currency: "BDT", value: String(group.minPrice) }} steps={howToSteps} />

      <main className="min-h-screen">
        {/* Breadcrumb */}
        <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-8 pb-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[0.8125rem] text-[#5b6280]">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <ChevronRight className="size-3" />
            <Link href="/products" className="hover:text-white transition">Products</Link>
            <ChevronRight className="size-3" />
            <span className="text-white">{group.brand}</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="mx-auto max-w-7xl px-5 sm:px-8 pb-16">
          <div className="grid gap-12 lg:grid-cols-2 items-start">
            {/* Left: Visual */}
            <div className="relative">
              <div
                className="relative aspect-[4/3] rounded-2xl overflow-hidden flex items-center justify-center"
                style={{ backgroundColor: mainVariant.brandColor }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="relative text-center">
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-white/60">{group.provider}</p>
                  <div className="mt-2 text-4xl sm:text-5xl font-bold text-white" role="presentation">{group.brand}</div>
                  {savings > 10 && (
                    <div className="mt-3 inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1">
                      <TrendingDown className="size-3.5 text-green-400" />
                      <span className="text-[0.75rem] font-semibold text-white">Save up to {Math.round(savings)}% vs international price</span>
                    </div>
                  )}
                </div>
              </div>
              {/* Trust badges */}
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { icon: Clock, label: mainVariant.deliverySLA, sub: "Delivery" },
                  { icon: CreditCard, label: "bKash / Nagad", sub: "Payment" },
                  { icon: ShieldCheck, label: "7-Day", sub: "Warranty" },
                  { icon: RefreshCw, label: "Resolution", sub: "Policy" },
                ].map((b) => (
                  <div key={b.label} className="glass-card rounded-xl p-3 text-center">
                    <b.icon className="size-4 text-[#f4b942] mx-auto" />
                    <p className="mt-1.5 text-[0.75rem] font-semibold text-white">{b.label}</p>
                    <p className="text-[0.625rem] text-[#5b6280]">{b.sub}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Info */}
            <div>
              <div className="flex items-center gap-3">
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-[#f4b942]">
                  {getCategoryLabel(group.category)}
                </p>
                {group.variants.some((v) => v.featured) && (
                  <span className="inline-flex items-center gap-1 text-[0.625rem] font-bold uppercase tracking-wider text-[#0a0e27] bg-gradient-to-r from-[#f4b942] to-[#e8a838] rounded-full px-2.5 py-0.5">
                    <Star className="size-3" />
                    Popular
                  </span>
                )}
              </div>
              <h1 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">
                {group.brand} in Bangladesh
              </h1>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-[#8a91a8]">
                {group.description}
              </p>

              {/* Capabilities */}
              {group.capabilities.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.capabilities.map((cap) => (
                    <span key={cap} className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[0.75rem] text-[#c9ceda]">
                      <CheckCircle2 className="size-3 text-[#f4b942]/70" />
                      {getCapabilityLabel(cap)}
                    </span>
                  ))}
                </div>
              )}

              {/* Bangla Answer Block — AIO-aware */}
              {whyBuyFromAIPS && (
                <div className="mt-6 p-4 rounded-xl border border-[#f4b942]/10 bg-[#f4b942]/[0.03]">
                  <p className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-[#f4b942] mb-2">বাংলাদেশ থেকে কিনুন</p>
                  <p className="text-[0.875rem] leading-relaxed text-[#8a91a8]">{whyBuyFromAIPS}</p>
                  {banglaUseCases.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {banglaUseCases.slice(0, 4).map((uc, i) => (
                        <span key={i} className="text-[0.75rem] text-[#5b6280] border border-white/[0.04] rounded-full px-3 py-1">
                          ✅ {uc}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Competitor Compare Mini */}
              {competitors.length > 0 && (
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {competitors.slice(0, 2).map((comp, i) => (
                    <div key={i} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                      <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-[#5b6280]">vs {comp.name}</p>
                      <p className="mt-1 text-[0.8125rem] text-white">{comp.advantage}</p>
                      <p className="mt-1 text-[0.75rem] text-[#f4b942]">{comp.price}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Price */}
              <div className="mt-6 flex items-baseline gap-3 flex-wrap">
                <span className="text-3xl font-bold text-white">
                  ৳{group.minPrice.toLocaleString("en-BD")}
                </span>
                {group.maxPrice > group.minPrice && (
                  <span className="text-[0.9375rem] text-[#5b6280]">
                    – ৳{group.maxPrice.toLocaleString("en-BD")}
                  </span>
                )}
                <span className="text-[0.8125rem] text-[#5b6280]">/ month</span>
                {savings > 10 && (
                  <span className="inline-flex items-center gap-1 text-[0.75rem] font-semibold text-green-400 bg-green-400/10 rounded-full px-2.5 py-0.5">
                    <TrendingDown className="size-3" />
                    {Math.round(savings)}% off international price
                  </span>
                )}
              </div>

              {/* CTA */}
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi AI Premium Shop, I want ${group.name}.`)}`}
                className="btn-whatsapp w-full mt-8 h-12 text-[0.9375rem]"
              >
                <MessageCircle className="size-5" />
                Order via WhatsApp
              </a>
              <p className="mt-3 text-[0.75rem] text-[#5b6280] text-center">
                Support: +880 {whatsappNumber.replace(/^880/, "")} · Available 24/7 · Reply in 5 min
              </p>
            </div>
          </div>
        </section>

        {/* Plans */}
        {group.variants.length > 0 && (
          <section className="border-t border-white/[0.04] py-16">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
              <div className="flex items-end justify-between gap-4 flex-wrap">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Available plans</h2>
                  <p className="mt-2 text-[0.875rem] text-[#5b6280]">Choose the plan that fits your budget and usage needs.</p>
                </div>
                <div className="flex items-center gap-2 text-[0.75rem] text-[#5b6280]">
                  <span className="inline-block size-2 rounded-full bg-[#f4b942]" />
                  Best value
                  <span className="inline-block size-2 rounded-full bg-emerald-400 ml-2" />
                  Personal Account
                </div>
              </div>
              <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {group.variants.map((v) => (
                  <PlanCard key={v.id} variant={v} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Use Cases */}
        <section className="border-t border-white/[0.04] py-16">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Who is {group.brand} for?</h2>
            <p className="mt-2 text-[0.875rem] text-[#5b6280]">Trusted by Bangladeshi students, freelancers, and businesses.</p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {useCases.map((uc) => (
                <div key={uc.title} className="glass-card rounded-2xl p-5">
                  <div className="inline-flex items-center justify-center size-10 rounded-xl bg-[#f4b942]/10 text-[#f4b942]">
                    {uc.icon}
                  </div>
                  <h3 className="mt-4 text-[1rem] font-semibold text-white">{uc.title}</h3>
                  <p className="mt-2 text-[0.8125rem] leading-relaxed text-[#8a91a8]">{uc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Payment Guide */}
        <section className="border-t border-white/[0.04] py-16">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-center">How to pay from Bangladesh</h2>
            <p className="mt-2 text-[0.875rem] text-[#5b6280] text-center">No international card needed. Pay locally in BDT.</p>
            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {[
                { icon: <Smartphone className="size-6" />, title: "bKash", desc: "Send money to our merchant number. Share the transaction ID and screenshot on WhatsApp. Most popular in Bangladesh.", color: "#E2136E" },
                { icon: <Banknote className="size-6" />, title: "Nagad", desc: "Send money via Nagad app. Same process — screenshot + transaction ID on WhatsApp. Fast and reliable.", color: "#EE7E2C" },
                { icon: <CreditCard className="size-6" />, title: "Rocket & Cards", desc: "Rocket send money or pay with Visa/Mastercard via SSLCommerz. We accept all major Bangladeshi banks.", color: "#8934AD" },
              ].map((m) => (
                <div key={m.title} className="glass-card rounded-2xl p-6 text-center">
                  <div className="inline-flex items-center justify-center size-12 rounded-xl" style={{ backgroundColor: `${m.color}15`, color: m.color }}>
                    {m.icon}
                  </div>
                  <h3 className="mt-4 text-[1rem] font-semibold text-white">{m.title}</h3>
                  <p className="mt-2 text-[0.8125rem] leading-relaxed text-[#8a91a8]">{m.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-2 text-[0.75rem] text-[#8a91a8]">
                <Lock className="size-3.5 text-[#f4b942]" />
                We never store your payment details. All transactions are verified manually via WhatsApp.
              </p>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="border-t border-white/[0.04] py-16">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
              <h2 className="text-2xl font-bold tracking-tight">You might also like</h2>
              <div className="mt-8 grid gap-5 md:grid-cols-3">
                {related.map((g) => (
                  <article key={g.slug} className="glass-card rounded-2xl overflow-hidden group">
                    <div className={`h-1 bg-gradient-to-r from-[#f4b942]/40 to-[#f4b942]/10`} />
                    <div className="p-6">
                      <Link href={`/products/${g.slug}`} className="block">
                        <p className="text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-[#5b6280]">{getCategoryLabel(g.category)}</p>
                        <h3 className="mt-1 text-[1.125rem] font-semibold text-white group-hover:text-[#f4b942] transition">{g.brand}</h3>
                        <p className="mt-2 text-[0.8125rem] text-[#5b6280] line-clamp-2">{g.description}</p>
                        <p className="mt-3 text-lg font-bold text-white">৳{g.minPrice.toLocaleString("en-BD")}<span className="text-[0.8125rem] font-normal text-[#5b6280]"> / month</span></p>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="border-t border-white/[0.04] py-16">
          <div className="mx-auto max-w-3xl px-5 sm:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-center">Frequently asked questions</h2>
            <div className="mt-8 space-y-3">
              {faqItems.map((item, i) => (
                <details
                  key={i}
                  className="group rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden transition-colors open:border-[#f4b942]/15"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4">
                    <span className="text-[0.9375rem] font-medium text-white">{item.question}</span>
                    <ChevronRight className="size-4 text-[#5b6280] transition-transform duration-300 group-open:rotate-90" />
                  </summary>
                  <div className="border-t border-white/[0.04] px-5 pb-4 pt-3">
                    <p className="text-[0.875rem] leading-relaxed text-[#8a91a8]">{item.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Sticky bottom CTA */}
        <div className="sticky bottom-0 z-40 border-t border-white/[0.06] bg-[#0a0e27]/90 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 py-3 flex items-center justify-between gap-4">
            <div className="hidden sm:block">
              <p className="text-[0.8125rem] font-semibold text-white">{group.brand}</p>
              <p className="text-[0.75rem] text-[#5b6280]">From ৳{group.minPrice.toLocaleString("en-BD")}/mo · {mainVariant.deliverySLA} delivery</p>
            </div>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi AI Premium Shop, I want ${group.name}.`)}`}
              className="btn-whatsapp w-full sm:w-auto h-11 text-[0.875rem]"
            >
              <MessageCircle className="size-4" />
              Order via WhatsApp
            </a>
          </div>
        </div>
      </main>
    </>
  );
}

/* ─── Sub-components ─── */

function PlanCard({ variant }: { variant: LiveProduct }) {
  const savings = variant.officialUSD && variant.officialUSD > 0
    ? Math.max(0, ((variant.officialUSD * 110 - variant.price) / (variant.officialUSD * 110)) * 100)
    : 0;

  return (
    <div
      className={`glass-card rounded-2xl p-6 relative overflow-hidden transition hover:-translate-y-1 hover:border-[#f4b942]/20 ${
        variant.accessType === "personal" ? "border-emerald-500/15" : ""
      }`}
    >
      {variant.badge && (
        <span className="absolute top-0 right-0 bg-gradient-to-l from-[#f4b942] to-[#e8a838] text-[#0a0e27] text-[0.625rem] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-lg">
          {variant.badge}
        </span>
      )}
      <div className="flex items-center gap-2">
        <h3 className="text-[1.125rem] font-semibold text-white">{variant.tier}</h3>
        {variant.accessType === "personal" && (
          <span className="inline-flex items-center gap-1 text-[0.625rem] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-400/10 rounded-full px-2 py-0.5">
            <Lock className="size-3" />
            Personal
          </span>
        )}
        {variant.accessType === "shared" && (
          <span className="inline-flex items-center gap-1 text-[0.625rem] font-bold uppercase tracking-wider text-[#8a91a8] bg-white/[0.05] rounded-full px-2 py-0.5">
            <Users className="size-3" />
            Shared
          </span>
        )}
      </div>
      <p className="mt-1 text-[0.8125rem] text-[#5b6280]">{variant.description}</p>

      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-2xl font-bold text-white">
          ৳{variant.price.toLocaleString("en-BD")}
        </span>
        <span className="text-[0.8125rem] text-[#5b6280]">/ month</span>
      </div>

      {savings > 5 && (
        <p className="mt-1 text-[0.75rem] text-green-400">
          Save {Math.round(savings)}% vs ${variant.officialUSD}/mo international price
        </p>
      )}

      {variant.capabilities && variant.capabilities.length > 0 && (
        <ul className="mt-5 space-y-2">
          {variant.capabilities.map((cap) => (
            <li key={cap} className="flex items-center gap-2 text-[0.8125rem] text-[#8a91a8]">
              <CheckCircle2 className="size-4 text-[#f4b942]/60 shrink-0" />
              {getCapabilityLabel(cap)}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-5 flex items-center gap-2 text-[0.75rem] text-[#5b6280]">
        <Clock className="size-3.5" />
        Delivery: {variant.deliverySLA}
      </div>

      <a
        href={getWhatsappUrl(variant)}
        className="btn-primary w-full mt-5 h-10 text-[0.8125rem]"
      >
        Order this plan
      </a>
    </div>
  );
}
