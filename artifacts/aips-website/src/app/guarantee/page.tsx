import { buildMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { CheckCircle2, Clock, Zap, DollarSign, Shield, AlertCircle } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "30-Day Money-Back Guarantee — AI Premium Shop",
  description:
    "We stand behind every sale with a 30-day money-back guarantee. No hidden fees, no questions asked. Transparent pricing and customer success commitment.",
  canonical: "https://aipremiumshop.com/guarantee",
});

export default function GuaranteePage() {
  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Guarantee", path: "/guarantee" },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />

      <main className="min-h-screen">
        <section className="mx-auto max-w-3xl px-5 sm:px-8 py-12">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-[#f4b942]">
            Our Commitment
          </p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">
            30-Day Money-Back Guarantee
          </h1>
          <p className="mt-4 text-[0.875rem] text-[#5b6280]">
            We stand behind every subscription. No questions asked. No hidden fees.
          </p>

          <div className="mt-10 space-y-8">
            {/* Hero Section */}
            <div className="glass-card rounded-2xl p-8 border border-[#f4b942] border-opacity-20">
              <h2 className="text-xl font-bold text-[#f4b942]">Your Risk Is Zero</h2>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-[#8a91a8]">
                Try any subscription from AI Premium Shop risk-free. If you&apos;re not completely satisfied
                within 30 days, we&apos;ll refund your money in full. No questions asked. No hidden fees.
                No excuses. This is our customer success commitment.
              </p>
            </div>

            {/* Quick Facts */}
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: Clock, label: "30 Days", desc: "Full refund window" },
                { icon: DollarSign, label: "100% Refund", desc: "Every taka back" },
                { icon: CheckCircle2, label: "No Questions", desc: "We don't ask why" },
                { icon: Zap, label: "Fast Refund", desc: "Within 24 hours" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="rounded-lg bg-white bg-opacity-5 p-5 border border-white border-opacity-10 text-center">
                    <Icon className="h-8 w-8 text-[#f4b942] mx-auto" />
                    <div className="mt-3 font-semibold text-white text-lg">{item.label}</div>
                    <p className="mt-1 text-[0.875rem] text-[#8a91a8]">{item.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* How the Guarantee Works */}
            <div className="glass-card rounded-2xl p-8">
              <h2 className="text-xl font-bold text-white mb-5">How the Guarantee Works</h2>
              <div className="space-y-5">
                {[
                  {
                    step: "1",
                    title: "You Order",
                    desc: "Order your subscription via WhatsApp. Pay using bKash, Nagad, Rocket, or bank transfer.",
                  },
                  {
                    step: "2",
                    title: "You Receive Access",
                    desc: "Get your account credentials within 5-15 minutes. Test it out immediately.",
                  },
                  {
                    step: "3",
                    title: "You Try It Out",
                    desc: "Use the subscription for up to 30 days. Make sure it meets your needs.",
                  },
                  {
                    step: "4",
                    title: "Unsatisfied?",
                    desc: "If you're not happy for any reason, contact us on WhatsApp within 30 days.",
                  },
                  {
                    step: "5",
                    title: "Full Refund",
                    desc: "We refund 100% of your payment within 24 hours. No questions, no hassle.",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f4b942] text-[#0a0e27] font-semibold">
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">{item.title}</h3>
                      <p className="mt-1 text-[0.875rem] text-[#8a91a8]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Transparent Pricing */}
            <div className="glass-card rounded-2xl p-8">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-5">
                <DollarSign className="h-5 w-5 text-[#f4b942]" />
                Transparent Pricing — No Hidden Fees
              </h2>
              <div className="space-y-4 text-[0.9375rem] leading-relaxed text-[#8a91a8]">
                <p>
                  <strong className="text-white">What you see is what you pay.</strong> Here&apos;s exactly what happens:
                </p>
                <div className="space-y-3">
                  {[
                    { label: "Price shown on site", value: "This is the ONLY price you'll pay" },
                    { label: "Price before payment", value: "Confirmed via WhatsApp before you send money" },
                    { label: "Price on receipt", value: "Matches the amount you sent" },
                    { label: "Price after purchase", value: "No surprise charges, no admin fees" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-3 rounded-lg bg-white bg-opacity-5 p-3">
                      <CheckCircle2 className="h-5 w-5 text-[#f4b942] mt-0.5 shrink-0" />
                      <div>
                        <p className="text-white font-semibold text-[0.875rem]">{item.label}</p>
                        <p className="text-[0.8125rem] text-[#8a91a8]">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Easy Refund Process */}
            <div className="glass-card rounded-2xl p-8">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-5">
                <Zap className="h-5 w-5 text-[#f4b942]" />
                Easy Refund Process — Just 3 Steps
              </h2>
              <div className="space-y-4">
                <div className="rounded-lg bg-white bg-opacity-5 p-5 border-l-4 border-[#f4b942]">
                  <div className="font-semibold text-white text-[0.9375rem]">Step 1: Contact Us</div>
                  <p className="mt-2 text-[0.875rem] text-[#8a91a8]">
                    Message us on WhatsApp at <strong>+880 1865-385348</strong> with your order number.
                    Or email <strong>hello@aipremiumshop.com</strong>
                  </p>
                </div>

                <div className="rounded-lg bg-white bg-opacity-5 p-5 border-l-4 border-[#f4b942]">
                  <div className="font-semibold text-white text-[0.9375rem]">Step 2: We Process</div>
                  <p className="mt-2 text-[0.875rem] text-[#8a91a8]">
                    We deactivate your account (within 1 hour) and process your refund to your original
                    payment method (bKash, Nagad, Rocket, or bank account).
                  </p>
                </div>

                <div className="rounded-lg bg-white bg-opacity-5 p-5 border-l-4 border-[#f4b942]">
                  <div className="font-semibold text-white text-[0.9375rem]">Step 3: Refund Received</div>
                  <p className="mt-2 text-[0.875rem] text-[#8a91a8]">
                    Your money is back in your bKash/Nagad wallet or bank account within 24 hours.
                    No questions. No delays.
                  </p>
                </div>
              </div>
            </div>

            {/* Customer Success Commitment */}
            <div className="glass-card rounded-2xl p-8 bg-gradient-to-br from-[#f4b942] from-opacity-10 to-[#f4b942] to-opacity-5">
              <h2 className="text-xl font-bold text-[#f4b942] flex items-center gap-2 mb-5">
                <Shield className="h-5 w-5" />
                Our Customer Success Commitment
              </h2>
              <p className="text-[0.9375rem] leading-relaxed text-[#8a91a8] mb-5">
                We don&apos;t just offer refunds — we&apos;re committed to your success. Here&apos;s what we do:
              </p>
              <ul className="space-y-3">
                {[
                  "Day 1: Send you a detailed setup guide for your subscription (video + text)",
                  "Day 7: Check in via WhatsApp to make sure you're getting value",
                  "Day 20: Offer upsell to related products that save you more money",
                  "Day 25: Renewal reminder so you never lose access",
                  "Day 30+: Monthly satisfaction survey to hear your feedback",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[0.875rem] text-[#8a91a8]">
                    <CheckCircle2 className="h-4 w-4 text-[#f4b942] mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* FAQ */}
            <div className="glass-card rounded-2xl p-8">
              <h2 className="text-xl font-bold text-white mb-5">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {[
                  {
                    q: "What if I use the account for 25 days and then ask for a refund?",
                    a: "We'll refund you 100%. The 30-day window is your chance to try it risk-free.",
                  },
                  {
                    q: "Do I need to give a reason for my refund?",
                    a: "No. No questions asked. If you want a refund, we process it immediately.",
                  },
                  {
                    q: "How long does the refund take?",
                    a: "We process refunds within 24 hours of your request. bKash/Nagad payments return within 24 hours; bank transfers may take 1-3 business days.",
                  },
                  {
                    q: "What if I share my account with others during the 30 days?",
                    a: "That's fine. We won't penalize you. Just know that shared accounts may be revoked by the provider after the 30-day period.",
                  },
                  {
                    q: "Can I get a partial refund if I used it for 15 days?",
                    a: "We offer full refunds for any reason within 30 days. No prorating, no partial refunds—it's all or nothing in your favor.",
                  },
                  {
                    q: "What if the subscription gets banned or deactivated?",
                    a: "If the account is deactivated through no fault of yours (provider error, system issue), we offer a free replacement within the 30-day guarantee period.",
                  },
                ].map((faq, i) => (
                  <div key={i} className="rounded-lg bg-white bg-opacity-5 p-4">
                    <h3 className="font-semibold text-white text-[0.9375rem]">{faq.q}</h3>
                    <p className="mt-2 text-[0.875rem] text-[#8a91a8]">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Important Clarifications */}
            <div className="rounded-lg bg-orange-500 bg-opacity-10 border border-orange-500 border-opacity-30 p-6">
              <h3 className="font-semibold text-orange-400 flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Important Clarifications
              </h3>
              <ul className="mt-3 space-y-2 text-[0.875rem] text-[#8a91a8]">
                <li className="flex items-start gap-2">
                  <span className="text-orange-400">•</span>
                  <span><strong>Shared accounts:</strong> Have a 7-day replacement guarantee instead of 30-day refund (account may be revoked after the trial period).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400">•</span>
                  <span><strong>Personal accounts:</strong> Have the full 30-day money-back guarantee.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400">•</span>
                  <span><strong>Refunds are issued to the original payment method:</strong> bKash/Nagad to your wallet, bank transfers to your account.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400">•</span>
                  <span><strong>The 30 days starts from the date you receive account access,</strong> not from the date you make payment.</span>
                </li>
              </ul>
            </div>

            {/* CTA */}
            <div className="rounded-2xl border border-[#f4b942] border-opacity-30 bg-white bg-opacity-5 p-8 text-center">
              <h2 className="text-2xl font-bold text-white">Ready to Try Risk-Free?</h2>
              <p className="mt-3 text-[#8a91a8]">
                Order your subscription now with zero risk. If it&apos;s not right for you, get your money back.
              </p>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_PRIMARY ?? "8801865385348"}?text=Hi,%20I'm%20interested%20in%20ordering%20with%20the%2030-day%20money-back%20guarantee.`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block rounded-lg bg-[#f4b942] px-6 py-3 font-semibold text-[#0a0e27] hover:bg-opacity-90 transition"
              >
                Start Your 30-Day Trial
              </a>
              <p className="mt-4 text-[0.8125rem] text-[#5b6280]">
                Questions? Ask us anytime via{" "}
                <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_PRIMARY ?? "8801865385348"}`} className="text-[#f4b942] hover:underline">WhatsApp</a> or
                <a href="mailto:hello@aipremiumshop.com" className="text-[#f4b942] hover:underline ml-1">email</a>.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
