import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getProductGroups,
  getCategoryLabel,
  getCategories,
  getWhatsappUrl,
} from "@/lib/data/products";
import { buildMetadata } from "@/lib/seo/metadata";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import type { Metadata } from "next";
import {
  ChevronRight,
  MessageCircle,
  CheckCircle2,
  Star,
  Users,
  Lock,
  TrendingDown,
} from "lucide-react";

const CATEGORY_META: Record<string, { title: string; description: string; useCases: string[] }> = {
  "ai-assistant": {
    title: "AI Assistants in Bangladesh — ChatGPT, Claude, Gemini & More",
    description: "Buy premium AI assistants in Bangladesh. ChatGPT Plus, Claude Pro, Google Gemini Advanced, Grok, Perplexity. bKash/Nagad payment. 5-15 min delivery.",
    useCases: [
      "Get instant answers for homework, research, and exam prep",
      "Write emails, reports, and proposals in Bengali or English",
      "Automate customer support with AI chatbots",
      "Generate code, debug errors, and learn programming faster",
    ],
  },
  "ai-image": {
    title: "AI Image Generators in Bangladesh — Midjourney, Canva, Adobe Firefly",
    description: "Buy AI image generation tools in Bangladesh. Midjourney, Canva Pro, Adobe Firefly, Ideogram, Leonardo AI. Create stunning visuals with bKash/Nagad. 5-15 min delivery.",
    useCases: [
      "Create social media posts, ads, and banners without a designer",
      "Generate product mockups for your e-commerce store",
      "Produce concept art and illustrations for games and media",
      "Edit photos with AI — remove backgrounds, upscale, recolor",
    ],
  },
  "ai-video": {
    title: "AI Video Tools in Bangladesh — Runway, HeyGen, Pika Labs",
    description: "Buy AI video generation tools in Bangladesh. Runway, HeyGen, Pika Labs, Luma Dream Machine. Create professional videos with bKash/Nagad payment. 5-15 min delivery.",
    useCases: [
      "Make YouTube shorts and TikToks without a camera crew",
      "Create AI avatar videos for marketing and training",
      "Generate B-roll and transitions for video editing",
      "Produce localized video ads for the Bangladesh market",
    ],
  },
  "ai-voice-music": {
    title: "AI Voice & Music Tools in Bangladesh — ElevenLabs, Suno, Murf.ai",
    description: "Buy AI voice and music tools in Bangladesh. ElevenLabs, Suno AI, Udio, Murf.ai, Play.ht. Text-to-speech and AI music with bKash/Nagad. 5-15 min delivery.",
    useCases: [
      "Clone your voice for consistent YouTube narration",
      "Create royalty-free background music for videos",
      "Generate podcast intros, ads, and voiceovers in Bengali",
      "Build voice-enabled apps and chatbots",
    ],
  },
  "ai-code": {
    title: "AI Coding Tools in Bangladesh — GitHub Copilot, Cursor, Codeium",
    description: "Buy AI coding assistants in Bangladesh. GitHub Copilot, Cursor, Codeium, v0.dev, Replit. Code faster with AI. bKash/Nagad payment. 5-15 min delivery.",
    useCases: [
      "Write and debug code 3x faster with AI autocomplete",
      "Build full-stack apps with AI-generated components",
      "Learn new programming languages with AI tutoring",
      "Automate testing, documentation, and code reviews",
    ],
  },
  "ai-workspace": {
    title: "AI Workspace Tools in Bangladesh — Notion, Coda, Gamma",
    description: "Buy AI workspace and productivity tools in Bangladesh. Notion Business, Coda AI, Gamma, Otter.ai, Manus AI. bKash/Nagad payment. 5-15 min delivery.",
    useCases: [
      "Organize team docs, wikis, and projects with AI search",
      "Transcribe meetings and generate action items automatically",
      "Create AI-powered presentations and reports in minutes",
      "Build internal tools and dashboards without coding",
    ],
  },
  "ai-writing": {
    title: "AI Writing Tools in Bangladesh — Jasper, Copy.ai, Writesonic",
    description: "Buy AI writing assistants in Bangladesh. Jasper, Copy.ai, Writesonic. SEO content, ad copy, and blog posts. bKash/Nagad payment. 5-15 min delivery.",
    useCases: [
      "Publish SEO-optimized blog posts weekly on autopilot",
      "Write high-converting Facebook and Google ad copy",
      "Generate product descriptions for Daraz and Shopify stores",
      "Create email sequences and WhatsApp marketing messages",
    ],
  },
  bundles: {
    title: "AI Bundles & Packages in Bangladesh — Student, Freelancer, Business",
    description: "Save money with AI tool bundles in Bangladesh. Student packages, freelancer bundles, business packages. bKash/Nagad payment. 5-15 min delivery.",
    useCases: [
      "Students: Get ChatGPT + AI tools for less than the price of one",
      "Freelancers: Full toolkit to deliver premium client work",
      "Businesses: Complete AI stack with setup and training support",
      "Agencies: Bulk subscriptions with team management",
    ],
  },
};

export function generateStaticParams() {
  return getCategories().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = CATEGORY_META[slug];
  if (!meta) {
    return {
      title: "Category Not Found | AI Premium Shop",
      robots: { index: false, follow: false },
    };
  }
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    canonical: `https://aipremiumshop.com/category/${slug}`,
    keywords: [
      `${getCategoryLabel(slug)} Bangladesh`,
      `buy ${getCategoryLabel(slug).toLowerCase()} BD`,
      `${getCategoryLabel(slug)} bKash`,
      `${getCategoryLabel(slug)} Nagad`,
      "AI subscription Bangladesh",
    ],
  });
}

function computeSavings(variants: { officialUSD?: number | null; price: number }[]): number {
  const anchor = variants.find((v) => v.officialUSD && v.officialUSD > 0);
  if (!anchor?.officialUSD) return 0;
  const officialBdt = anchor.officialUSD * 110;
  return Math.max(0, ((officialBdt - anchor.price) / officialBdt) * 100);
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = CATEGORY_META[slug];
  if (!meta) notFound();

  const allGroups = getProductGroups();
  const groups = allGroups.filter((g) => g.category === slug);
  const whatsappNumber = process.env.NEXT_PUBLIC_WA_PRIMARY ?? "8801865385348";

  if (groups.length === 0) notFound();

  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: getCategoryLabel(slug), path: `/category/${slug}` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <main className="min-h-screen">
        {/* Breadcrumb */}
        <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-8 pb-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[0.8125rem] text-[#5b6280]">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <ChevronRight className="size-3" />
            <Link href="/products" className="hover:text-white transition">Products</Link>
            <ChevronRight className="size-3" />
            <span className="text-white">{getCategoryLabel(slug)}</span>
          </nav>
        </div>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 pb-16">
        <div className="max-w-3xl">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-[#f4b942]">
            {getCategoryLabel(slug)}
          </p>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {meta.title.split(" — ")[0]}
          </h1>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-[#8a91a8]">
            {meta.description}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                `Hi AI Premium Shop, I'm interested in ${getCategoryLabel(slug)} products.`
              )}`}
              className="btn-whatsapp h-11 text-[0.875rem]"
            >
              <MessageCircle className="size-4" />
              Get recommendations on WhatsApp
            </a>
            <span className="text-[0.75rem] text-[#5b6280]">
              {groups.length} products · {groups.reduce((acc, g) => acc + g.variants.length, 0)} plans
            </span>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="border-t border-white/[0.04] py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Popular use cases in Bangladesh</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {meta.useCases.map((useCase, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                <CheckCircle2 className="size-5 text-[#f4b942] shrink-0 mt-0.5" />
                <p className="text-[0.875rem] text-[#c9ceda]">{useCase}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="border-t border-white/[0.04] py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            All {getCategoryLabel(slug)} products
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {groups.map((group) => {
              const savings = computeSavings(group.variants);
              return (
                <article
                  key={group.slug}
                  className="glass-card rounded-2xl overflow-hidden group"
                >
                  <div className="h-1 bg-gradient-to-r from-[#f4b942]/40 to-[#f4b942]/10" />
                  <div className="p-6">
                    <Link href={`/products/${group.slug}`} className="block">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-[#5b6280]">
                            {group.provider}
                          </p>
                          <h3 className="mt-1 text-[1.125rem] font-semibold text-white group-hover:text-[#f4b942] transition">
                            {group.brand}
                          </h3>
                        </div>
                        <div className="text-right">
                          <p className="text-[1.125rem] font-bold text-white">
                            ৳{group.minPrice.toLocaleString("en-BD")}
                          </p>
                          {group.maxPrice > group.minPrice && (
                            <p className="text-[0.625rem] text-[#5b6280]">
                              up to ৳{group.maxPrice.toLocaleString("en-BD")}
                            </p>
                          )}
                          {savings > 10 && (
                            <p className="mt-1 inline-flex items-center gap-1 text-[0.625rem] font-semibold text-green-400 bg-green-400/10 rounded-full px-2 py-0.5">
                              <TrendingDown className="size-3" />
                              {Math.round(savings)}% off
                            </p>
                          )}
                        </div>
                      </div>
                      <p className="mt-3 text-[0.8125rem] text-[#5b6280] line-clamp-2">
                        {group.description}
                      </p>
                      <div className="mt-2 flex items-center gap-2 flex-wrap">
                        {group.variants.length > 1 && (
                          <span className="text-[0.6875rem] text-[#5b6280]">
                            {group.variants.length} plans
                          </span>
                        )}
                        {group.variants.some((v) => v.accessType === "personal") && (
                          <span className="inline-flex items-center gap-1 text-[0.625rem] font-medium text-emerald-400 bg-emerald-400/10 rounded-full px-2 py-0.5">
                            <Lock className="size-3" />
                            Personal
                          </span>
                        )}
                        {group.variants.some((v) => v.accessType === "shared") && (
                          <span className="inline-flex items-center gap-1 text-[0.625rem] font-medium text-[#8a91a8] bg-white/[0.05] rounded-full px-2 py-0.5">
                            <Users className="size-3" />
                            Shared
                          </span>
                        )}
                        {group.featured && (
                          <span className="inline-flex items-center gap-1 text-[0.625rem] font-bold text-[#0a0e27] bg-gradient-to-r from-[#f4b942] to-[#e8a838] rounded-full px-2 py-0.5">
                            <Star className="size-3" />
                            Popular
                          </span>
                        )}
                      </div>
                    </Link>
                    <a
                      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                        `Hi AI Premium Shop, I want ${group.brand}.`
                      )}`}
                      className="btn-whatsapp w-full mt-5 h-10 text-[0.8125rem]"
                    >
                      Order via WhatsApp
                      <ChevronRight className="size-4" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-white/[0.04] py-16">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-center">Frequently asked questions</h2>
          <div className="mt-8 space-y-3">
            {[
              {
                q: `Which ${getCategoryLabel(slug)} product is best for beginners?`,
                a: `For beginners, we recommend starting with a shared plan to test the tool at low cost. Our support team can help you choose based on your specific needs — just message us on WhatsApp.`,
              },
              {
                q: "Can I pay with bKash or Nagad?",
                a: "Yes. We accept bKash Send Money, Nagad Send Money, Rocket, and local bank cards. No international credit card or PayPal is required. Share your payment screenshot on WhatsApp for instant verification.",
              },
              {
                q: "How fast is delivery?",
                a: "Shared plans are delivered within 5-15 minutes after payment confirmation. Personal accounts take 2-4 hours due to individual setup. During peak hours (7-11 PM BST), delivery may take slightly longer.",
              },
              {
                q: "What is your Resolution Policy?",
                a: "Full refund if service is not delivered within 2 hours. Partial refund (50%) if you change your mind within 6 hours and credentials are unused. Shared plans include a 7-day replacement warranty.",
              },
            ].map((item, i) => (
              <details
                key={i}
                className="group rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden transition-colors open:border-[#f4b942]/15"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4">
                  <span className="text-[0.9375rem] font-medium text-white">{item.q}</span>
                  <ChevronRight className="size-4 text-[#5b6280] transition-transform duration-300 group-open:rotate-90" />
                </summary>
                <div className="border-t border-white/[0.04] px-5 pb-4 pt-3">
                  <p className="text-[0.875rem] leading-relaxed text-[#8a91a8]">{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
