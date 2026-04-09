import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";

const WHATSAPP = "https://wa.me/8801865385348";

const TERMS = [
  {
    title: "1. Service Description",
    content:
      "AI Premium Shop provides access to third-party AI subscription services including, but not limited to, ChatGPT, Claude, Midjourney, GitHub Copilot, Runway, ElevenLabs, and others. We are an independent reseller and are not affiliated with, endorsed by, or officially partnered with OpenAI, Anthropic, Google, Microsoft, Adobe, or any other AI provider. All trademarks and product names belong to their respective owners.",
  },
  {
    title: "2. Eligibility",
    content:
      "Our services are available to individuals and organizations in Bangladesh and internationally. By placing an order, you confirm that you are at least 18 years of age, or have parental/guardian consent to use these services.",
  },
  {
    title: "3. Payment Terms",
    content:
      "All payments are due before service delivery. We accept bKash, Nagad, Rocket, bank transfer, and Binance USDT. Prices are listed in Bangladeshi Taka (BDT) and are subject to change without prior notice. Current prices are always confirmed during the ordering process on WhatsApp.",
  },
  {
    title: "4. Delivery",
    content:
      "Accounts are delivered via WhatsApp after payment confirmation. AI assistant accounts typically deliver within 5–30 minutes. Creative and developer tools within 30–60 minutes. Delivery times may vary during high-demand periods. We operate 10 AM – Midnight BST, 7 days a week.",
  },
  {
    title: "5. Account Usage Rules",
    content:
      "Customers must not share, resell, or redistribute account credentials provided by AI Premium Shop. Accounts are for personal or business use only. Any misuse that violates the underlying platform's Terms of Service — including automated abuse, scraping, or unauthorized API access — may result in immediate account termination without refund.",
  },
  {
    title: "6. Warranty & Replacements",
    content:
      "All accounts come with a 30-day replacement warranty. If an account fails to work as described during this period, we will replace it at no additional cost. The warranty does not cover issues caused by customer misuse, violation of platform terms, or issues outside our control.",
  },
  {
    title: "7. Refund Policy",
    content:
      "Refunds are available within 15 minutes of delivery if the service does not match what was ordered. After this window, all issues are handled under the 30-day replacement warranty. See our full Refund Policy for details.",
  },
  {
    title: "8. Limitation of Liability",
    content:
      "AI Premium Shop's liability is limited to the value of the subscription purchased. We are not liable for any indirect, incidental, or consequential damages arising from the use or inability to use AI tools, including business losses, data loss, or missed opportunities. We do not guarantee specific outputs, quality, or availability of any AI platform.",
  },
  {
    title: "9. Third-Party Platform Changes",
    content:
      "AI platforms regularly update their features, pricing, and terms. AI Premium Shop is not responsible for changes made by third-party platforms that affect the service after delivery. In cases where a platform materially changes a product we've sold (e.g., removes a key feature), we will work in good faith to provide a fair resolution.",
  },
  {
    title: "10. Dispute Resolution",
    content:
      "Any disputes should first be raised with our support team on WhatsApp at +880 1865-385348. We are committed to resolving all issues fairly and promptly. If a resolution cannot be reached through WhatsApp, disputes will be governed by the laws of Bangladesh.",
  },
  {
    title: "11. Privacy",
    content:
      "We collect your name, WhatsApp number, and order details to process and deliver your subscription. We do not sell or share this data with third parties. Order information may be retained for up to 2 years for support and warranty purposes.",
  },
  {
    title: "12. Changes to Terms",
    content:
      "AI Premium Shop reserves the right to update these Terms of Service at any time. The current version is always available at aipremiumshop.com/terms. Continued use of our services after changes constitutes acceptance of the updated terms.",
  },
];

export default function TermsPage() {
  return (
    <PageLayout>
      <SEOHead
        title="Terms of Service | AI Premium Shop"
        description="Terms of Service for AI Premium Shop Bangladesh. Service description, payment terms, delivery, account usage, warranty, and dispute resolution."
        canonical="https://aipremiumshop.com/terms"
      />

      <section className="max-w-3xl mx-auto px-4 md:px-8 py-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Terms of Service</h1>
          <p style={{ color: "#c9ceda" }}>Effective date: January 1, 2024 &nbsp;|&nbsp; Last updated: April 2026</p>
          <p className="mt-4 text-sm max-w-xl" style={{ color: "#c9ceda" }}>
            By using AI Premium Shop&apos;s services, you agree to the following terms. Please read them carefully.
          </p>
        </motion.div>

        <div className="space-y-4 mb-12">
          {TERMS.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.35, delay: i * 0.03 }}
              className="p-6 rounded-2xl border border-white/10"
              style={{ backgroundColor: "#151b3d" }}
            >
              <h2 className="font-bold text-white mb-2 text-sm">{section.title}</h2>
              <p className="text-sm leading-relaxed" style={{ color: "#c9ceda" }}>{section.content}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-8 rounded-2xl border border-white/10"
          style={{ backgroundColor: "#151b3d" }}
        >
          <p className="font-semibold text-white mb-2">Questions about these terms?</p>
          <p className="text-sm mb-5" style={{ color: "#c9ceda" }}>
            Contact us on WhatsApp or email support@aipremiumshop.com and we&apos;ll explain anything clearly.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#25d366", color: "#fff" }}>
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
            <a href="mailto:support@aipremiumshop.com"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border border-white/10 hover:border-white/30 transition-colors"
              style={{ color: "#c9ceda" }}>
              Email Support
            </a>
          </div>
        </motion.div>
      </section>
    </PageLayout>
  );
}
