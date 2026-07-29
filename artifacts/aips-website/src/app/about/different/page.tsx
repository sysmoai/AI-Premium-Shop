import { buildMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { CheckCircle2, Clock, MessageCircle, Zap, DollarSign, Shield, Globe, Users } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "How We're Different — AI Premium Shop vs International",
  description:
    "Compare AIPS vs buying directly from international providers. Local payments, 5-30 minute delivery, Bengali support, 50-84% cheaper pricing. Why AIPS wins.",
  canonical: "https://aipremiumshop.com/about/different",
});

export default function DifferentPage() {
  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "How We're Different", path: "/about/different" },
  ];

  const comparisonData = [
    {
      feature: "Payment Methods",
      international: "Credit/Debit card only (Visa, Mastercard required)",
      aips: "✓ bKash, Nagad, Rocket, Bank Transfer (No foreign card required)",
      winner: "aips",
    },
    {
      feature: "Delivery Speed",
      international: "Immediate (but setup complex)",
      aips: "✓ 5-30 minutes via WhatsApp (complete setup included)",
      winner: "aips",
    },
    {
      feature: "Customer Support",
      international: "Email/chat (English, slow, generic responses)",
      aips: "✓ 24/7 WhatsApp (Bengali/English, real person, <2 hour SLA)",
      winner: "aips",
    },
    {
      feature: "Pricing",
      international: "International rates ($20-200+ USD equivalent)",
      aips: "✓ 50-84% cheaper (6,000-15,000 BDT equivalent)",
      winner: "aips",
    },
    {
      feature: "Currency Stability",
      international: "USD prices fluctuate with exchange rates",
      aips: "✓ Fixed BDT pricing for predictability",
      winner: "aips",
    },
    {
      feature: "Language Support",
      international: "English only (or limited non-English support)",
      aips: "✓ Native Bengali support available",
      winner: "aips",
    },
    {
      feature: "Account Security",
      international: "Your responsibility (no account recovery help)",
      aips: "✓ We verify your account, assist with security issues",
      winner: "aips",
    },
    {
      feature: "Refund Policy",
      international: "Often no refunds for digital products",
      aips: "✓ 30-day money-back guarantee",
      winner: "aips",
    },
    {
      feature: "Setup Assistance",
      international: "Minimal (DIY setup required)",
      aips: "✓ We send step-by-step guides + video tutorials",
      winner: "aips",
    },
    {
      feature: "Trust & Accountability",
      international: "Anonymous company (harder to get help)",
      aips: "✓ Founded by Bangladeshi entrepreneur (personally accountable)",
      winner: "aips",
    },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />

      <main className="min-h-screen">
        <section className="mx-auto max-w-3xl px-5 sm:px-8 py-12">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-[#f4b942]">
            Comparison
          </p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">
            How We&apos;re Different
          </h1>
          <p className="mt-4 text-[0.875rem] text-[#5b6280]">
            AIPS vs buying directly from international providers
          </p>

          <div className="mt-10 space-y-8">
            {/* Hero */}
            <div className="glass-card rounded-2xl p-8 border border-[#f4b942] border-opacity-20">
              <h2 className="text-xl font-bold text-[#f4b942]">Built for Bangladeshi Customers</h2>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-[#8a91a8]">
                International providers don&apos;t understand Bangladeshi payment systems, customer support needs,
                or pricing expectations. We do. AI Premium Shop is built specifically for you&mdash;with local
                payments, Bengali support, affordable pricing, and 30-minute delivery guarantee.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: DollarSign, label: "50-84%", desc: "Cheaper than international" },
                { icon: Clock, label: "5-30 min", desc: "Average delivery" },
                { icon: MessageCircle, label: "24/7", desc: "Bengali WhatsApp support" },
                { icon: CheckCircle2, label: "30 days", desc: "Money-back guarantee" },
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="rounded-lg bg-white bg-opacity-5 p-4 border border-white border-opacity-10 text-center">
                    <Icon className="h-8 w-8 text-[#f4b942] mx-auto" />
                    <div className="mt-3 font-bold text-[#f4b942] text-lg">{stat.label}</div>
                    <p className="mt-1 text-[0.8125rem] text-[#8a91a8]">{stat.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Our Unique Value Props */}
            <div className="glass-card rounded-2xl p-8">
              <h2 className="text-xl font-bold text-white mb-5">Our Unique Value Propositions</h2>
              <div className="space-y-4">
                {[
                  {
                    icon: Users,
                    title: "Local Payment Methods",
                    desc: "Don't have a foreign credit card? No problem. Pay with bKash, Nagad, Rocket, or your bank. Easy, fast, secure.",
                  },
                  {
                    icon: Zap,
                    title: "Lightning-Fast Delivery",
                    desc: "Order on WhatsApp and receive your account within 5-30 minutes. No waiting. No email confirmations. Real-time delivery.",
                  },
                  {
                    icon: MessageCircle,
                    title: "24/7 Bengali Support",
                    desc: "Real human support available 24/7 on WhatsApp. Speak in Bengali, ask questions, get help immediately. Not a chatbot.",
                  },
                  {
                    icon: DollarSign,
                    title: "Affordable Pricing",
                    desc: "Pay 6,000-15,000 BDT for annual subscriptions that cost $200+ USD internationally. That's 50-84% cheaper.",
                  },
                  {
                    icon: Shield,
                    title: "Official Subscriptions Only",
                    desc: "No shared accounts, no pirated access, no risky shortcuts. Every subscription is official and authorized.",
                  },
                  {
                    icon: Globe,
                    title: "Bangladesh-Focused",
                    desc: "We understand local challenges: payment barriers, customer expectations, support in Bengali. Built for you.",
                  },
                ].map((prop, i) => {
                  const Icon = prop.icon;
                  return (
                    <div key={i} className="flex gap-4">
                      <Icon className="h-6 w-6 text-[#f4b942] shrink-0" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">{prop.title}</h3>
                        <p className="mt-1 text-[0.875rem] text-[#8a91a8]">{prop.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Detailed Comparison Table */}
            <div>
              <h2 className="text-xl font-bold text-white mb-5">Complete Comparison Table</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-[0.8125rem] sm:text-[0.875rem]">
                  <thead>
                    <tr className="border-b border-white border-opacity-10">
                      <th className="text-left py-3 px-3 sm:px-4 text-white font-semibold bg-white bg-opacity-5">Feature</th>
                      <th className="text-left py-3 px-3 sm:px-4 text-orange-400 font-semibold bg-orange-400 bg-opacity-10">Direct International</th>
                      <th className="text-left py-3 px-3 sm:px-4 text-[#f4b942] font-semibold bg-[#f4b942] bg-opacity-10">AI Premium Shop</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, i) => (
                      <tr key={i} className="border-b border-white border-opacity-5">
                        <td className="py-4 px-3 sm:px-4 font-semibold text-white">{row.feature}</td>
                        <td className="py-4 px-3 sm:px-4 text-orange-400">{row.international}</td>
                        <td className="py-4 px-3 sm:px-4 text-[#f4b942]">{row.aips}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Real Scenarios */}
            <div className="glass-card rounded-2xl p-8">
              <h2 className="text-xl font-bold text-white mb-5">Real Customer Scenarios</h2>
              <div className="space-y-4">
                {[
                  {
                    scenario: "You want ChatGPT Plus but don't have a foreign card",
                    international: "✗ Blocked from buying directly. Have to use VPN + crypto workarounds.",
                    aips: "✓ Pay with bKash/Nagad. Get account in 10 minutes.",
                  },
                  {
                    scenario: "Your ChatGPT account gets locked. You need urgent support.",
                    international: "✗ Generic AI support responses. May take days.",
                    aips: "✓ Call us on WhatsApp. Humans answer within 2 hours.",
                  },
                  {
                    scenario: "You're on a tight budget and prices keep changing with USD exchange",
                    international: "✗ $20 USD → 2,650 BDT today, 2,700 BDT next week (volatility)",
                    aips: "✓ Fixed 5,000 BDT pricing. No surprises.",
                  },
                  {
                    scenario: "You want to upgrade from a shared to a personal account",
                    international: "✗ Have to buy a whole new subscription",
                    aips: "✓ Easy upgrade on WhatsApp. Pro-rata pricing applied.",
                  },
                  {
                    scenario: "You want a refund if the tool doesn't work for you",
                    international: "✗ Digital products often no refund policy",
                    aips: "✓ 30-day money-back guarantee. No questions.",
                  },
                ].map((scenario, i) => (
                  <div key={i} className="rounded-lg bg-white bg-opacity-5 p-4 border-l-4 border-[#f4b942]">
                    <p className="font-semibold text-white text-[0.9375rem]">{scenario.scenario}</p>
                    <div className="mt-3 grid gap-2 text-[0.875rem]">
                      <p className="text-orange-400">{scenario.international}</p>
                      <p className="text-[#f4b942]">{scenario.aips}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Trust AIPS */}
            <div className="glass-card rounded-2xl p-8 bg-gradient-to-br from-[#f4b942] from-opacity-10 to-[#f4b942] to-opacity-5">
              <h2 className="text-xl font-bold text-[#f4b942] mb-5">Why Thousands of Bangladeshi Customers Trust AIPS</h2>
              <ul className="space-y-3">
                {[
                  "We're local. Founded in Dhaka by Emon Hossain, a Bangladeshi entrepreneur who understands the challenges you face.",
                  "We're transparent. Everything is in Bengali, no hidden fees, pricing confirmed before payment.",
                  "We're accountable. No corporate anonymity—you know who you're buying from and can reach us 24/7.",
                  "We're growing. Started with ChatGPT Plus, now we offer 86+ products across 8 categories.",
                  "We listen. Customer feedback directly shapes our service improvements and new offerings.",
                  "We invest in compliance. SSL/TLS encryption, PCI-DSS standards, GDPR compliance—enterprise-grade security.",
                  "We offer guarantees. 30-day money-back guarantee shows we stand behind every sale.",
                ].map((reason) => (
                  <li key={reason} className="flex items-start gap-3 text-[0.9375rem] text-[#8a91a8]">
                    <CheckCircle2 className="h-5 w-5 text-[#f4b942] mt-0.5 shrink-0" />
                    {reason}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pricing Comparison */}
            <div className="glass-card rounded-2xl p-8">
              <h2 className="text-xl font-bold text-white mb-5">Real Pricing Examples</h2>
              <p className="text-[0.875rem] text-[#5b6280] mb-5">
                Here&apos;s how much you save with AIPS (converted at 100 BDT = 1 USD):
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    product: "ChatGPT Plus",
                    international: "$20/mo = 2,000 BDT",
                    aips: "6,000 BDT/year = 500 BDT/mo",
                    savings: "75% cheaper",
                  },
                  {
                    product: "Claude Pro",
                    international: "$20/mo = 2,000 BDT",
                    aips: "6,500 BDT/year = 541 BDT/mo",
                    savings: "73% cheaper",
                  },
                  {
                    product: "Midjourney",
                    international: "$30/mo = 3,000 BDT",
                    aips: "8,000 BDT/year = 667 BDT/mo",
                    savings: "78% cheaper",
                  },
                  {
                    product: "Adobe Creative Cloud",
                    international: "$82.49/mo = 8,249 BDT",
                    aips: "9,000 BDT/year = 750 BDT/mo",
                    savings: "91% cheaper",
                  },
                ].map((pricing) => (
                  <div key={pricing.product} className="rounded-lg bg-white bg-opacity-5 p-4 border border-white border-opacity-10">
                    <h3 className="font-semibold text-white text-[0.9375rem]">{pricing.product}</h3>
                    <div className="mt-3 space-y-2 text-[0.8125rem]">
                      <div>
                        <span className="text-orange-400">International:</span>
                        <span className="ml-2 text-[#8a91a8]">{pricing.international}</span>
                      </div>
                      <div>
                        <span className="text-[#f4b942]">AIPS:</span>
                        <span className="ml-2 text-[#8a91a8]">{pricing.aips}</span>
                      </div>
                      <div className="pt-2 border-t border-white border-opacity-10">
                        <span className="font-semibold text-[#f4b942]">You save: {pricing.savings}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="rounded-2xl border border-[#f4b942] border-opacity-30 bg-white bg-opacity-5 p-8 text-center">
              <h2 className="text-2xl font-bold text-white">Ready to See the Difference?</h2>
              <p className="mt-3 text-[#8a91a8]">
                Join thousands of Bangladeshi customers saving 50-84% on premium AI tools. Local payments, 24/7 Bengali support, 30-day guarantee.
              </p>
              <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_PRIMARY ?? "8801865385348"}?text=Hi,%20I'm%20interested%20in%20learning%20more%20about%20AI%20Premium%20Shop.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-[#f4b942] px-6 py-3 font-semibold text-[#0a0e27] hover:bg-opacity-90 transition"
                >
                  Order Now
                </a>
                <Link
                  href="/products"
                  className="rounded-lg border border-[#f4b942] border-opacity-30 px-6 py-3 font-semibold text-[#f4b942] hover:bg-[#f4b942] hover:bg-opacity-10 transition"
                >
                  Browse Products
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
