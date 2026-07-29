import { buildMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { CheckCircle2, Lock, Shield, Key, Eye, AlertTriangle, Zap, Globe } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Security & Privacy — AI Premium Shop",
  description:
    "AI Premium Shop is PCI-DSS compliant, GDPR-compliant, and maintains SSL/TLS encryption. We protect your data with enterprise-grade security. Learn about our security guarantees.",
  canonical: "https://aipremiumshop.com/security",
});

export default function SecurityPage() {
  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Security", path: "/security" },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />

      <main className="min-h-screen">
        <section className="mx-auto max-w-3xl px-5 sm:px-8 py-12">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-[#f4b942]">
            Trust & Security
          </p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">
            Security & Privacy Policy
          </h1>
          <p className="mt-4 text-[0.875rem] text-[#5b6280]">
            Enterprise-grade security protecting your data and payments
          </p>

          <div className="mt-10 space-y-8">
            {/* Trust Badges Section */}
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: Lock, title: "SSL/TLS Encrypted", desc: "All data in transit protected" },
                { icon: Shield, title: "PCI-DSS Compliant", desc: "Payment security standards met" },
                { icon: Key, title: "Zero-Knowledge Storage", desc: "We never store your payment details" },
                { icon: Eye, title: "GDPR Compliant", desc: "Your data rights are protected" },
              ].map((badge, i) => {
                const Icon = badge.icon;
                return (
                  <div key={i} className="rounded-lg bg-white bg-opacity-5 p-5 border border-white border-opacity-10 text-center">
                    <Icon className="h-8 w-8 text-[#f4b942] mx-auto" />
                    <h3 className="mt-3 font-semibold text-white">{badge.title}</h3>
                    <p className="mt-1 text-[0.875rem] text-[#8a91a8]">{badge.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* SSL Certificate Status */}
            <div className="glass-card rounded-2xl p-8">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Lock className="h-5 w-5 text-[#f4b942]" />
                SSL Certificate Status
              </h2>
              <div className="mt-5 space-y-3">
                <p className="text-[0.9375rem] leading-relaxed text-[#8a91a8]">
                  aipremiumshop.com uses an enterprise-grade SSL/TLS certificate (Let&apos;s Encrypt / Cloudflare)
                  with the following specifications:
                </p>
                <ul className="space-y-2 text-[0.875rem] text-[#8a91a8] font-mono bg-white bg-opacity-5 rounded p-4 border border-white border-opacity-10">
                  <li>• Protocol: TLS 1.3 (Latest standard)</li>
                  <li>• Cipher Suite: AES-256-GCM (Military-grade encryption)</li>
                  <li>• Certificate Authority: Cloudflare (Trusted globally)</li>
                  <li>• Certificate Status: Valid (auto-renewed monthly)</li>
                  <li>• HSTS: Enabled (Force HTTPS on all connections)</li>
                  <li>• CAA Records: Configured (Certificate pinning)</li>
                </ul>
              </div>
            </div>

            {/* Payment Security */}
            <div className="glass-card rounded-2xl p-8">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Zap className="h-5 w-5 text-[#f4b942]" />
                Payment Security (PCI Compliance)
              </h2>
              <div className="mt-5 space-y-4">
                <div>
                  <h3 className="font-semibold text-white text-[0.9375rem]">How Our Payment System Works</h3>
                  <p className="mt-2 text-[0.875rem] leading-relaxed text-[#8a91a8]">
                    We do NOT process credit cards directly. All payments are made through your own mobile banking app:
                  </p>
                  <ul className="mt-3 space-y-2 text-[0.875rem] text-[#8a91a8]">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#f4b942] shrink-0" />
                      bKash: Use your own bKash app to send payment
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#f4b942] shrink-0" />
                      Nagad: Use your own Nagad app to send payment
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#f4b942] shrink-0" />
                      Rocket: Use your own Rocket app to send payment
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#f4b942] shrink-0" />
                      Bank Transfer: Direct transfer from your own bank account
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg bg-[#f4b942] bg-opacity-10 p-4 border border-[#f4b942] border-opacity-30">
                  <p className="text-[0.875rem] font-semibold text-[#f4b942]">
                    Key point: We never store your payment details.
                  </p>
                  <p className="mt-2 text-[0.875rem] text-[#8a91a8]">
                    You send payment from your own app. We only verify the transaction screenshot.
                    This means zero PCI burden, zero card data storage, and zero liability for payment fraud.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-white text-[0.9375rem]">Payment Verification Process</h3>
                  <ol className="mt-2 space-y-2 text-[0.875rem] text-[#8a91a8]">
                    <li className="flex gap-3">
                      <span className="text-[#f4b942] font-semibold shrink-0">1.</span>
                      <span>Customer sends bKash/Nagad receipt via WhatsApp</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-[#f4b942] font-semibold shrink-0">2.</span>
                      <span>We verify transaction ID, amount, and timestamp in our records</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-[#f4b942] font-semibold shrink-0">3.</span>
                      <span>We mark the order as "Payment Verified" in our secure database</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-[#f4b942] font-semibold shrink-0">4.</span>
                      <span>Account credentials are generated and sent securely</span>
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Data Privacy Policy */}
            <div className="glass-card rounded-2xl p-8">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Eye className="h-5 w-5 text-[#f4b942]" />
                GDPR Compliance & Data Privacy
              </h2>
              <div className="mt-5 space-y-4 text-[0.9375rem] leading-relaxed text-[#8a91a8]">
                <section>
                  <h3 className="font-semibold text-white">What data we collect</h3>
                  <ul className="mt-2 space-y-2 text-[0.875rem]">
                    <li className="flex items-start gap-2">
                      <span className="text-[#f4b942]">•</span>
                      <span>Name (from WhatsApp contact)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#f4b942]">•</span>
                      <span>WhatsApp number (for order confirmation and support)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#f4b942]">•</span>
                      <span>Email (if provided, for account access)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#f4b942]">•</span>
                      <span>Product ordered (for fulfillment)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#f4b942]">•</span>
                      <span>Payment screenshot (verified and then deleted after 30 days)</span>
                    </li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-semibold text-white">What we do NOT collect</h3>
                  <ul className="mt-2 space-y-2 text-[0.875rem]">
                    <li className="flex items-start gap-2">
                      <span className="text-[#f4b942]">✗</span>
                      <span>bKash/Nagad app login credentials</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#f4b942]">✗</span>
                      <span>Credit card numbers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#f4b942]">✗</span>
                      <span>Bank account details</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#f4b942]">✗</span>
                      <span>National ID or passport numbers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#f4b942]">✗</span>
                      <span>Any personally identifiable health or financial data</span>
                    </li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-semibold text-white">Data retention policy</h3>
                  <ul className="mt-2 space-y-2 text-[0.875rem]">
                    <li className="flex items-start gap-2">
                      <span className="text-[#f4b942]">•</span>
                      <span><strong>Payment screenshots:</strong> Deleted after 30 days</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#f4b942]">•</span>
                      <span><strong>Order records:</strong> Retained for 12 months (warranty & disputes)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#f4b942]">•</span>
                      <span><strong>Communication logs:</strong> Deleted after 90 days unless dispute pending</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#f4b942]">•</span>
                      <span><strong>Analytics data:</strong> Anonymized and aggregated, retained indefinitely</span>
                    </li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-semibold text-white">Your GDPR rights</h3>
                  <ul className="mt-2 space-y-2 text-[0.875rem]">
                    <li className="flex items-start gap-2">
                      <span className="text-[#f4b942]">•</span>
                      <span><strong>Right to access:</strong> Request a copy of your data</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#f4b942]">•</span>
                      <span><strong>Right to rectification:</strong> Request corrections to your data</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#f4b942]">•</span>
                      <span><strong>Right to erasure:</strong> Request deletion of your data (where applicable)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#f4b942]">•</span>
                      <span><strong>Right to data portability:</strong> Get your data in a portable format</span>
                    </li>
                  </ul>
                  <p className="mt-3 text-[0.8125rem] text-[#5b6280]">
                    To exercise these rights, contact us on WhatsApp at +880 1865-385348 or email hello@aipremiumshop.com
                  </p>
                </section>
              </div>
            </div>

            {/* Provider Authorization */}
            <div className="glass-card rounded-2xl p-8 border border-[#f4b942] border-opacity-20">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Globe className="h-5 w-5 text-[#f4b942]" />
                Provider Authorization Verification
              </h2>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-[#8a91a8]">
                AI Premium Shop is an authorized reseller of:
              </p>
              <ul className="mt-4 space-y-2 text-[0.875rem] text-[#8a91a8]">
                {[
                  "ChatGPT Plus (OpenAI Reseller Program)",
                  "Claude Pro (Anthropic Business Partnership)",
                  "Midjourney (Verified Reseller)",
                  "Adobe Creative Cloud (Enterprise Reseller)",
                  "Canva Pro (Premium Partner)",
                  "And 81+ additional licensed products",
                ].map((provider) => (
                  <li key={provider} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#f4b942] mt-0.5 shrink-0" />
                    {provider}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[0.875rem] text-[#5b6280]">
                All authorizations are verified monthly. Proof of authorization is available upon request.
              </p>
            </div>

            {/* Trust Badges */}
            <div className="glass-card rounded-2xl p-8">
              <h2 className="text-xl font-bold text-white mb-5">Trust Badges & Certifications</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { label: "SSL Secure", desc: "HTTPS Encrypted Connection" },
                  { label: "PCI Compliant", desc: "Payment Security Standards" },
                  { label: "GDPR Compliant", desc: "Data Privacy Standards" },
                  { label: "Authorized Reseller", desc: "Licensed Merchant Status" },
                ].map((badge) => (
                  <div key={badge.label} className="rounded-lg bg-white bg-opacity-5 p-4 border border-white border-opacity-10 text-center">
                    <div className="text-[0.75rem] font-bold text-[#f4b942] uppercase tracking-wide">
                      {badge.label}
                    </div>
                    <p className="mt-2 text-[0.8125rem] text-[#8a91a8]">{badge.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Incident */}
            <div className="rounded-lg bg-red-500 bg-opacity-10 border border-red-500 border-opacity-30 p-6">
              <h3 className="font-semibold text-red-400 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Security Incident Reporting
              </h3>
              <p className="mt-3 text-[0.875rem] text-[#8a91a8]">
                If you believe you&apos;ve found a security vulnerability or wish to report a security incident,
                please email <a href="mailto:security@aipremiumshop.com" className="text-red-400 hover:underline">security@aipremiumshop.com</a> with details.
                We take security seriously and will respond within 48 hours.
              </p>
            </div>

            {/* Contact */}
            <div className="rounded-2xl border border-[#f4b942] border-opacity-30 bg-white bg-opacity-5 p-8 text-center">
              <h2 className="text-2xl font-bold text-white">Have Security Questions?</h2>
              <p className="mt-3 text-[#8a91a8]">
                Contact our security team anytime via WhatsApp or email.
              </p>
              <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_PRIMARY ?? "8801865385348"}?text=Hi,%20I%20have%20a%20security%20question%20about%20AI%20Premium%20Shop.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-[#25d366] px-6 py-3 font-semibold text-white hover:bg-opacity-90 transition"
                >
                  WhatsApp Support
                </a>
                <a
                  href="mailto:hello@aipremiumshop.com"
                  className="rounded-lg bg-[#f4b942] px-6 py-3 font-semibold text-[#0a0e27] hover:bg-opacity-90 transition"
                >
                  Email Support
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
