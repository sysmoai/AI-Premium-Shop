import { buildMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { CheckCircle2, AlertTriangle, Shield, Lock, Users, Clock } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Why Official Subscriptions Matter — AI Premium Shop",
  description:
    "Discover why official AI subscriptions are worth it. Full support, account security, legal protection, and 30-day money-back guarantee. Compare official vs shared vs pirated.",
  canonical: "https://aipremiumshop.com/about/why-official",
});

export default function WhyOfficialPage() {
  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Why Official", path: "/about/why-official" },
  ];

  const comparisonData = [
    {
      feature: "Account Security",
      official: "✓ Full protection, 2FA enabled",
      shared: "× Limited control, shared password",
      pirated: "✗ No security, legal risk",
    },
    {
      feature: "Customer Support",
      official: "✓ 24/7 Bangladeshi WhatsApp support",
      shared: "△ Limited support availability",
      pirated: "✗ No support, banned accounts",
    },
    {
      feature: "Money-Back Guarantee",
      official: "✓ 30-day full refund guarantee",
      shared: "✗ No refunds, no guarantee",
      pirated: "✗ No refunds, illegal",
    },
    {
      feature: "Account Stability",
      official: "✓ Dedicated personal account",
      shared: "× Shared with 5-10 users, risk of ban",
      pirated: "✗ Stolen account, immediate ban",
    },
    {
      feature: "Legal Protection",
      official: "✓ Licensed, legal in Bangladesh",
      shared: "× Violates terms of service",
      pirated: "✗ Illegal, criminal liability",
    },
    {
      feature: "Payment Security",
      official: "✓ bKash/Nagad verified, encrypted",
      shared: "△ Unverified payment trails",
      pirated: "✗ Untraced payments, fraud risk",
    },
    {
      feature: "Provider Authorization",
      official: "✓ Authorized reseller verified",
      shared: "× No authorization, gray market",
      pirated: "✗ Completely unauthorized",
    },
    {
      feature: "Software Updates",
      official: "✓ Auto-updates, bug fixes, new features",
      shared: "△ Updates may break shared access",
      pirated: "✗ Updates trigger immediate ban",
    },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />

      <main className="min-h-screen">
        <section className="mx-auto max-w-3xl px-5 sm:px-8 py-12">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-[#f4b942]">
            Why Official
          </p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">
            Why Official Subscriptions Matter
          </h1>
          <p className="mt-4 text-[0.875rem] text-[#5b6280]">
            The difference between premium access and account suspension
          </p>

          <div className="mt-10 space-y-8">
            {/* Hero Section */}
            <div className="glass-card rounded-2xl p-8 border border-[#f4b942] border-opacity-20">
              <h2 className="text-xl font-bold text-[#f4b942]">The Real Cost of Not Going Official</h2>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-[#8a91a8]">
                In Bangladesh, many customers skip official subscriptions to save money. But the hidden
                costs—account bans, lost money, legal risk, and lack of support—make unofficial access
                far more expensive. With AI Premium Shop, official access costs only 50-84% less than international pricing, and you keep your account forever.
              </p>
            </div>

            {/* Key Benefits Section */}
            <div>
              <h2 className="text-xl font-bold text-white mb-5">Benefits of Official Subscriptions</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    icon: Shield,
                    title: "Account Security",
                    desc: "Your account is yours alone. No shared passwords, no surprise bans.",
                  },
                  {
                    icon: Clock,
                    title: "Lifetime Access",
                    desc: "Use your account until you choose to cancel. Never lose access.",
                  },
                  {
                    icon: Users,
                    title: "Dedicated Support",
                    desc: "Real human support staff available 24/7 via WhatsApp in Bengali.",
                  },
                  {
                    icon: Lock,
                    title: "Legal Protection",
                    desc: "Official licensing means zero legal risk. Operate with confidence.",
                  },
                  {
                    icon: CheckCircle2,
                    title: "Money-Back Guarantee",
                    desc: "30-day refund if you're not satisfied. No questions asked.",
                  },
                  {
                    icon: AlertTriangle,
                    title: "No Hidden Fees",
                    desc: "Transparent pricing. Price confirmed before payment. No surprises.",
                  },
                ].map((benefit, i) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={i} className="rounded-lg bg-white bg-opacity-5 p-5 border border-white border-opacity-10">
                      <Icon className="h-6 w-6 text-[#f4b942]" />
                      <h3 className="mt-2 font-semibold text-white">{benefit.title}</h3>
                      <p className="mt-1 text-[0.875rem] text-[#8a91a8]">{benefit.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Compliance Requirements Section */}
            <div className="glass-card rounded-2xl p-8">
              <h2 className="text-xl font-bold text-white">Compliance Requirements We Meet</h2>
              <ul className="mt-5 space-y-3">
                {[
                  "SSL/TLS encryption for all customer data",
                  "PCI compliance standards for payment handling",
                  "GDPR-compliant data privacy practices",
                  "Licensed reseller status with official providers",
                  "Regular security audits and penetration testing",
                  "Zero-knowledge payment verification (no card storage)",
                  "DMCA compliance and terms of service adherence",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[0.875rem] text-[#8a91a8]">
                    <CheckCircle2 className="size-4 text-[#f4b942] mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Comparison Table */}
            <div>
              <h2 className="text-xl font-bold text-white mb-5">Official vs Shared vs Pirated: Full Comparison</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-[0.875rem]">
                  <thead>
                    <tr className="border-b border-white border-opacity-10">
                      <th className="text-left py-3 px-4 text-white font-semibold bg-white bg-opacity-5">Feature</th>
                      <th className="text-left py-3 px-4 text-[#f4b942] font-semibold bg-[#f4b942] bg-opacity-10">Official (AIPS)</th>
                      <th className="text-left py-3 px-4 text-orange-400 font-semibold bg-orange-400 bg-opacity-10">Shared Account</th>
                      <th className="text-left py-3 px-4 text-red-400 font-semibold bg-red-400 bg-opacity-10">Pirated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, i) => (
                      <tr key={i} className="border-b border-white border-opacity-5">
                        <td className="py-4 px-4 font-semibold text-white">{row.feature}</td>
                        <td className="py-4 px-4 text-[#f4b942]">{row.official}</td>
                        <td className="py-4 px-4 text-orange-400">{row.shared}</td>
                        <td className="py-4 px-4 text-red-400">{row.pirated}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Why AIPS is Different */}
            <div className="glass-card rounded-2xl p-8 bg-gradient-to-br from-[#f4b942] from-opacity-10 to-[#f4b942] to-opacity-5">
              <h2 className="text-xl font-bold text-[#f4b942]">Why AI Premium Shop is Official</h2>
              <ul className="mt-5 space-y-3">
                {[
                  "We are authorized resellers of ChatGPT Plus, Claude Pro, Midjourney, and 85+ other tools",
                  "Every account is registered under our business license with proper authorization",
                  "We comply with all provider terms of service—no workarounds, no gray markets",
                  "Our payment processing is verified and encrypted. No hidden fees, no surprises",
                  "We maintain a 30-day money-back guarantee to prove we stand behind every sale",
                  "Our WhatsApp support team operates 24/7 in Bengali, not a chatbot",
                  "All customer data is encrypted and never shared with third parties",
                  "We invest in compliance so you can invest in your tools with confidence",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[0.9375rem] text-[#8a91a8]">
                    <CheckCircle2 className="size-5 text-[#f4b942] mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Section */}
            <div className="rounded-2xl border border-[#f4b942] border-opacity-30 bg-white bg-opacity-5 p-8 text-center">
              <h2 className="text-2xl font-bold text-white">Ready to Go Official?</h2>
              <p className="mt-3 text-[#8a91a8]">
                Get premium access in 5-15 minutes with our official subscriptions. Local payments, 24/7 support, and a 30-day guarantee.
              </p>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_PRIMARY ?? "8801865385348"}?text=Hi,%20I'm%20interested%20in%20official%20subscriptions%20and%20need%20more%20information.`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block rounded-lg bg-[#f4b942] px-6 py-3 font-semibold text-[#0a0e27] hover:bg-opacity-90 transition"
              >
                Order Now via WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
