import {
  ChevronRight,
  MessageCircle,
  Search,
  ShieldCheck,
  Clock,
  Users,
  CreditCard,
  Star,
  Zap,
  ArrowRight,
} from "lucide-react";
import {
  FAQPageJsonLd,
  HowToJsonLd,
  BreadcrumbJsonLd,
  LocalBusinessJsonLd,
  OrganizationJsonLd,
  WebsiteJsonLd,
} from "@/components/seo/json-ld";
import Link from "next/link";
import { getFeaturedItems, getWhatsappUrl } from "@/lib/data/products";
import { buildMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Buy ChatGPT Plus, Claude Pro, Midjourney & 103 Premium AI Subscriptions in Bangladesh",
  description:
    "Bangladesh's largest AI subscription store. 103 premium AI tools — ChatGPT Plus from ৳499, Claude Pro, Midjourney, Canva Pro, GitHub Copilot & more. bKash/Nagad payment. 5-15 min WhatsApp delivery.",
  canonical: "https://aipremiumshop.com",
});

const whatsappNumber = process.env.NEXT_PUBLIC_WA_PRIMARY ?? "8801865385348";
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  "Hi AI Premium Shop, I want to order a premium subscription."
)}`;

const featuredProducts = getFeaturedItems().slice(0, 6);

function getCategoryGradient(category: string): string {
  const map: Record<string, string> = {
    "ai-assistant": "from-emerald-400/20 to-cyan-400/20",
    "ai-code": "from-violet-400/20 to-fuchsia-400/20",
    "ai-image": "from-pink-400/20 to-rose-400/20",
    "ai-video": "from-orange-400/20 to-red-400/20",
    "ai-voice-music": "from-amber-400/20 to-yellow-400/20",
    "ai-workspace": "from-sky-400/20 to-blue-400/20",
    "ai-writing": "from-teal-400/20 to-emerald-400/20",
    bundles: "from-indigo-400/20 to-purple-400/20",
  };
  return map[category] ?? "from-gray-400/20 to-slate-400/20";
}

const stats = [
  { value: "thousands", label: "Orders delivered" },
  { value: "5–15 min", label: "Avg. delivery" },
  { value: "24/7", label: "Support" },
  { value: "103", label: "Products" },
];

const steps = [
  {
    icon: Search,
    title: "Choose",
    desc: "Browse 103 premium AI subscriptions and pick the plan that fits your needs.",
  },
  {
    icon: MessageCircle,
    title: "Confirm",
    desc: "Message us on WhatsApp. We confirm availability, price, and slot type.",
  },
  {
    icon: CreditCard,
    title: "Pay",
    desc: "Send payment via bKash, Nagad, or Rocket. Share the screenshot.",
  },
  {
    icon: Zap,
    title: "Receive",
    desc: "Get your credentials or setup guide delivered within 5–15 minutes.",
  },
];

const faqItems = [
  {
    q: "How long does delivery take?",
    a: "Most orders are delivered within 15 minutes after payment confirmation. During peak hours (7 PM – 11 PM BST), delivery may take up to 45 minutes.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept bKash, Nagad, Rocket, and local Visa/Mastercard debit or credit cards. All payments are confirmed via WhatsApp for security.",
  },
  {
    q: "Do you offer a warranty?",
    a: "Yes. Shared slots include a 7-day replacement warranty if the account stops working. Personal Account setups include 30 days of free activation support.",
  },
  {
    q: "Is it safe to buy from AI Premium Shop?",
    a: "We have served thousands since 2024. We offer a 7-day replacement Resolution Policy and verify every transaction on WhatsApp before delivery.",
  },
];

const testimonials = [
  {
    name: "Rafi K.",
    role: "Freelancer",
    text: "Got my ChatGPT Plus in 8 minutes. The bKash payment was smooth and the support team guided me through everything.",
  },
  {
    name: "Tasnim A.",
    role: "Student",
    text: "I was skeptical at first but the 7-day warranty gave me confidence. My Claude Pro account works perfectly.",
  },
  {
    name: "Imran H.",
    role: "Agency Owner",
    text: "We buy 12+ subscriptions every month for our team. AI Premium Shop handles bulk orders with consistent reliability.",
  },
];

const howToSteps = [
  { name: "Browse subscriptions", text: "Visit aipremiumshop.com and choose from AI assistants, design tools, streaming services, and productivity apps." },
  { name: "Order via WhatsApp", text: "Click the 'Order via WhatsApp' button and send the pre-filled message to our support team." },
  { name: "Confirm and pay", text: "Our team confirms availability, plan type, and final price. Pay via bKash, Nagad, Rocket, or card." },
  { name: "Receive instantly", text: "Get your login credentials or setup guide delivered on WhatsApp within 5–15 minutes." },
];

export default function Home() {
  return (
    <>
      <OrganizationJsonLd />
      <WebsiteJsonLd />
      <LocalBusinessJsonLd />
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }]} />
      <HowToJsonLd name="How to buy premium subscriptions in Bangladesh" description="A simple 4-step guide to ordering AI tools, design software, and streaming services from AI Premium Shop with local payment." totalTime="PT15M" steps={howToSteps} />
      <FAQPageJsonLd items={faqItems.map((i) => ({ question: i.q, answer: i.a }))} />

      <main className="relative overflow-hidden">
        {/* ================================================================
            HERO SECTION
            ================================================================ */}
        <section className="relative min-h-[90vh] flex items-center">
          {/* Background orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="gradient-orb gradient-orb-gold w-[600px] h-[600px] -top-40 -left-40 animate-pulse-glow" />
            <div className="gradient-orb gradient-orb-purple w-[500px] h-[500px] top-1/3 right-0 animate-pulse-glow" style={{ animationDelay: "-2s" }} />
            <div className="gradient-orb gradient-orb-blue w-[400px] h-[400px] bottom-0 left-1/3 animate-pulse-glow" style={{ animationDelay: "-4s" }} />
          </div>

          <div className="relative mx-auto max-w-7xl px-5 sm:px-8 py-20">
            <div className="grid gap-16 lg:grid-cols-2 lg:gap-12 items-center">
              {/* Left: Copy */}
              <div className="max-w-xl">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-[#f4b942]/20 bg-[#f4b942]/5 px-4 py-1.5 text-[0.8125rem] text-[#f4b942] mb-8">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#f4b942] opacity-60" />
                    <span className="relative inline-flex size-2 rounded-full bg-[#f4b942]" />
                  </span>
                  Premium access, local payment, human support
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.1]">
                  Buy Premium AI{" "}
                  <span className="text-gradient">Subscriptions</span>{" "}
                  in Bangladesh
                </h1>

                <p className="mt-6 text-[1rem] leading-relaxed text-[#8a91a8] max-w-md">
                  ChatGPT Plus, Claude Pro, Midjourney, Canva Pro, GitHub Copilot, and 98+ more.
                  Pay with bKash or Nagad. Delivered in minutes on WhatsApp.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Link href="/products" className="btn-primary">
                    Browse Products
                    <ChevronRight className="size-4" />
                  </Link>
                  <a href={whatsappUrl} className="btn-secondary">
                    <MessageCircle className="size-4 text-[#25d366]" />
                    Chat on WhatsApp
                  </a>
                </div>

                {/* Stats */}
                <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-4 max-w-md">
                  {stats.map((s) => (
                    <div key={s.label}>
                      <p className="text-lg sm:text-2xl font-bold text-white">{s.value}</p>
                      <p className="text-xs sm:text-[0.6875rem] text-[#5b6280] mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Visual */}
              <div className="relative hidden lg:block">
                <div className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm">
                  {/* Glow border */}
                  <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />

                  <div className="relative space-y-3">
                    {/* Search bar mock */}
                    <div className="flex items-center gap-3 rounded-xl bg-white/[0.04] border border-white/[0.06] px-4 py-3">
                      <Search className="size-4 text-[#5b6280]" />
                      <span className="text-[0.8125rem] text-[#5b6280]">What AI tool do you need?</span>
                    </div>

                    {/* Product cards */}
                    {featuredProducts.slice(0, 3).map((p, i) => (
                      <Link
                        key={p.id}
                        href={`/products/${p.slug}`}
                        className="flex items-center justify-between rounded-xl bg-white/[0.03] border border-white/[0.06] px-4 py-3 transition-all duration-300 hover:bg-white/[0.06] hover:border-white/[0.1]"
                        style={{ animationDelay: `${i * 100}ms` }}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`size-10 rounded-lg bg-gradient-to-br ${getCategoryGradient(p.category)} flex items-center justify-center`}>
                            <span className="text-[0.625rem] font-bold text-white/80">{p.brand.slice(0, 2).toUpperCase()}</span>
                          </div>
                          <div>
                            <p className="text-[0.8125rem] font-semibold text-white">{p.name}</p>
                            <p className="text-[0.6875rem] text-[#5b6280]">{p.tier}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-[0.8125rem] font-semibold text-white">৳{p.price.toLocaleString("en-BD")}</p>
                          <p className="text-[0.625rem] text-[#5b6280]">{p.accessType}</p>
                        </div>
                      </Link>
                    ))}

                    {/* Trust badges */}
                    <div className="grid grid-cols-3 gap-2 pt-2">
                      {([
                        [ShieldCheck, "Verified"],
                        [Clock, "Fast"],
                        [Users, "Trusted"],
                      ] as const).map(([Icon, label]) => (
                        <div key={label} className="flex flex-col items-center gap-1.5 rounded-lg bg-white/[0.02] border border-white/[0.05] py-3">
                          <Icon className="size-4 text-[#f4b942]" />
                          <span className="text-[0.625rem] text-[#5b6280]">{label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================
            HOW IT WORKS
            ================================================================ */}
        <section className="relative py-24 border-t border-white/[0.04]">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="text-center max-w-xl mx-auto">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-[#f4b942]">How it works</p>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">Four steps to your subscription</h2>
              <p className="mt-4 text-[0.9375rem] text-[#5b6280]">No foreign credit card needed. No complex setup. Just message, pay, and receive.</p>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, i) => (
                <div key={step.title} className="glass-card rounded-2xl p-6 relative group">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#f4b942]/20 to-[#f4b942]/5 border border-[#f4b942]/10 mb-5">
                    <step.icon className="size-5 text-[#f4b942]" />
                  </div>
                  <div className="absolute top-6 right-6 text-[1.5rem] font-bold text-white/[0.04]">
                    0{i + 1}
                  </div>
                  <h3 className="text-[1rem] font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-[0.8125rem] leading-relaxed text-[#5b6280]">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================
            FEATURED PRODUCTS
            ================================================================ */}
        <section className="relative py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-[#f4b942]">Popular</p>
                <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">Ready-to-order plans</h2>
              </div>
              <Link href="/products" className="inline-flex items-center gap-1 text-[0.8125rem] font-medium text-[#8a91a8] hover:text-white transition">
                View all products
                <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProducts.map((product) => (
                <article key={product.id} className="glass-card rounded-2xl overflow-hidden group">
                  {/* Top gradient bar */}
                  <div className={`h-1.5 bg-gradient-to-r ${getCategoryGradient(product.category).replace('/20', '')}`} />

                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-[#5b6280]">{product.provider}</p>
                        <h3 className="mt-1 text-[1.125rem] font-semibold text-white">
                          <Link href={`/products/${product.slug}`} className="hover:text-[#f4b942] transition">
                            {product.name}
                          </Link>
                        </h3>
                      </div>
                      <div className="text-right">
                        <p className="text-[1.125rem] font-bold text-white">৳{product.price.toLocaleString("en-BD")}</p>
                        <p className="text-[0.625rem] text-[#5b6280]">{product.tier}</p>
                      </div>
                    </div>

                    <ul className="mt-5 space-y-2">
                      {product.capabilities.slice(0, 3).map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-[0.8125rem] text-[#8a91a8]">
                          <ShieldCheck className="size-3.5 text-[#f4b942]/60" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <a href={getWhatsappUrl(product)} className="btn-whatsapp w-full mt-6 h-10 text-[0.8125rem]">
                      Order via WhatsApp
                      <ChevronRight className="size-4" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================
            TESTIMONIALS
            ================================================================ */}
        <section className="relative py-24 border-t border-white/[0.04]">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="text-center max-w-xl mx-auto">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-[#f4b942]">Testimonials</p>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">Bangladeshi freelancers choose us</h2>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {testimonials.map((t) => (
                <div key={t.name} className="glass-card rounded-2xl p-6">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="size-3.5 fill-[#f4b942] text-[#f4b942]" />
                    ))}
                  </div>
                  <p className="mt-4 text-[0.875rem] leading-relaxed text-[#8a91a8]">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="mt-5 flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-[#f4b942]/30 to-[#f4b942]/10 text-[0.75rem] font-bold text-[#f4b942]">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-[0.8125rem] font-semibold text-white">{t.name}</p>
                      <p className="text-[0.6875rem] text-[#5b6280]">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================
            FAQ
            ================================================================ */}
        <section className="relative py-24">
          <div className="mx-auto max-w-3xl px-5 sm:px-8">
            <div className="text-center">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-[#f4b942]">FAQ</p>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">Common questions</h2>
            </div>

            <div className="mt-10 space-y-3">
              {faqItems.map((item, i) => (
                <details
                  key={i}
                  className="group rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden transition-colors open:border-[#f4b942]/15 open:bg-white/[0.03]"
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

            <div className="mt-8 text-center">
              <Link href="/faq" className="inline-flex items-center gap-1 text-[0.8125rem] font-medium text-[#8a91a8] hover:text-white transition">
                View all FAQs
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ================================================================
            FINAL CTA
            ================================================================ */}
        <section className="relative py-24 border-t border-white/[0.04]">
          <div className="mx-auto max-w-3xl px-5 sm:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Ready to get started?
            </h2>
            <p className="mt-4 text-[0.9375rem] text-[#5b6280] max-w-md mx-auto">
              Join thousands in Bangladesh who trust AI Premium Shop for their premium subscriptions.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/products" className="btn-primary">
                Browse Products
                <ChevronRight className="size-4" />
              </Link>
              <a href={whatsappUrl} className="btn-secondary">
                <MessageCircle className="size-4 text-[#25d366]" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
