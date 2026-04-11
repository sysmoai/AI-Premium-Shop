import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumb } from "@/components/Breadcrumb";

const WHATSAPP = "https://wa.me/8801865385348";

export default function PrivacyPolicyPage() {
  return (
    <PageLayout>
      <SEOHead
        title="Privacy Policy — AI Premium Shop"
        description="Privacy policy for AI Premium Shop. How we handle your data, payments, and WhatsApp communication."
        canonical="https://aipremiumshop.com/privacy-policy"
      />

      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Privacy Policy" }]} />

      <section className="max-w-3xl mx-auto px-4 md:px-8 py-14">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Privacy Policy</h1>
        <p className="text-sm mb-10" style={{ color: "#c9ceda" }}>Last updated: April 2026</p>

        <div className="space-y-10 text-sm leading-relaxed" style={{ color: "#c9ceda" }}>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">1. What We Collect</h2>
            <p className="mb-2">When you interact with AI Premium Shop, we may collect:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Your name and WhatsApp number (required to process your order)</li>
              <li>Email address (optional, if you choose to provide it)</li>
              <li>Payment confirmation reference (bKash/Nagad transaction ID)</li>
              <li>The AI tools you ordered and account preferences</li>
              <li>Basic website analytics (pages visited, browser type — anonymized)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">2. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Order processing and account delivery</li>
              <li>Customer support and warranty requests</li>
              <li>Sending updates about your active subscriptions</li>
              <li>Marketing communications (only with your consent; opt out anytime via WhatsApp)</li>
              <li>Improving our website and services using anonymized analytics data</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">3. Payment Partners</h2>
            <p>
              We process payments through bKash, Nagad, and Rocket. These are third-party payment
              platforms governed by their own privacy policies. We only receive the transaction
              confirmation reference — we never have access to your banking credentials or card details.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">4. Communication via WhatsApp</h2>
            <p>
              All orders, delivery, and support are handled via WhatsApp (+880 1865-385348). By
              messaging us, you consent to receiving order-related messages. We do not share your
              WhatsApp number with third parties. You can stop marketing messages at any time by
              replying "STOP" on WhatsApp.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">5. Analytics & Cookies</h2>
            <p>
              We use Google Analytics (GA4) to understand how visitors use our website. This data is
              anonymized and helps us improve the site experience. We also use a cookie consent banner
              — Google Analytics and Facebook Pixel only load after you accept cookies. You can
              withdraw consent at any time by clearing your browser's local storage.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">6. Data Storage & Retention</h2>
            <p>
              Order records (name, contact, tool purchased) are stored securely and retained for the
              duration of your subscription plus 30 days (the warranty period). After that, data is
              deleted unless you are an ongoing customer. We do not sell your data to any third party.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">7. Your Rights</h2>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Request a copy of the data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data (we will comply within 7 days)</li>
              <li>Withdraw consent for marketing at any time</li>
            </ul>
            <p className="mt-2">
              To exercise any of these rights, message us on WhatsApp at +880 1865-385348.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">8. Security</h2>
            <p>
              We take reasonable steps to protect your information. All WhatsApp communications are
              end-to-end encrypted by default. Payment references are stored securely and not shared.
              However, no internet transmission is 100% secure, and we cannot guarantee absolute security.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">9. Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. The "Last updated" date at the top
              of this page reflects the most recent revision. Continued use of our service after changes
              constitutes acceptance of the updated policy.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">10. Contact Us</h2>
            <p>
              For any privacy-related questions or requests, contact us on WhatsApp:
            </p>
            <div className="mt-3">
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold"
                style={{ backgroundColor: "#25d366", color: "#fff" }}
              >
                WhatsApp: +880 1865-385348
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
