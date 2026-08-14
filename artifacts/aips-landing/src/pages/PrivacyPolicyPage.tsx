import { MessageCircle, ShieldCheck } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumb } from "@/components/Breadcrumb";

const WHATSAPP = "https://wa.me/8801865385348?text=Hi%2C%20I%20have%20a%20privacy%20question%20about%20AI%20Premium%20Shop.";

const SECTIONS = [
  ["1. Information you choose to send", "AIPS may receive the information you voluntarily send through WhatsApp or other contact channels, such as your name, contact details, product/plan question, order context and a payment reference when relevant. Do not send passwords, banking PINs, OTPs, full card details or unrelated sensitive information."],
  ["2. On-site contact form", "The current contact form prepares a WhatsApp message in your browser. It does not silently submit the typed message to AIPS before you choose to open and send it in WhatsApp."],
  ["3. AI concierge", "If you use the on-site AI concierge, the text you submit is processed to generate a response and may be logged for service quality and debugging according to the current application configuration. Do not submit secrets, credentials or information you would not want included in a support log."],
  ["4. Analytics and advertising tags", "The site includes Google Analytics and Facebook Pixel integrations that are configured to activate only after cookie consent. Those third-party services process data under their own policies. You can decline consent or clear the site's stored consent state in your browser."],
  ["5. WhatsApp and external services", "When you choose a WhatsApp, social-media or provider link, the destination service receives information according to its own privacy policy and technical operation. AIPS cannot control the data practices of those third-party services."],
  ["6. Order records and retention", "AIPS may retain order and support records for operational, accounting, security, dispute-resolution and legal needs. Retention can vary by record type and business requirement; this page does not promise a universal deletion date."],
  ["7. Access-model privacy", "A catalog label such as Shared, Personal, Team or Service is not itself a privacy guarantee. Before using sensitive, client, student, financial, health or confidential information, confirm the exact access arrangement and review the provider's current data controls."],
  ["8. Security", "Use reasonable care when sharing order evidence. Mask credentials in screenshots and never send PINs, OTPs or passwords. No internet or third-party messaging system can be guaranteed to be completely secure."],
  ["9. Questions and correction requests", "If you have a privacy question or believe information supplied to AIPS is inaccurate or should be reviewed, contact AIPS with enough context to identify the relevant conversation or order. The request will be handled according to the available records and applicable requirements."],
  ["10. Policy changes", "AIPS may update this notice as the site, integrations and operating practices change. The date on this page identifies the current published version."],
];

export default function PrivacyPolicyPage() {
  return (
    <PageLayout>
      <SEOHead
        title="Privacy Policy | AI Premium Shop"
        description="How AI Premium Shop handles contact, order, AI concierge, analytics and third-party service data, plus practical guidance for protecting sensitive information."
        canonical="https://aipremiumshop.com/privacy-policy"
      />
      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Privacy Policy" }]} />

      <div id="main-content" className="mx-auto max-w-4xl px-4 py-12 md:px-8 md:py-16">
        <header className="max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#f4b942]/[0.08] px-3 py-1.5 text-xs font-semibold text-[#f4b942]"><ShieldCheck className="h-3.5 w-3.5" /> Data-minimization guidance</div>
          <h1 className="text-3xl font-bold text-white md:text-5xl">Privacy Policy</h1>
          <p className="mt-3 text-sm text-slate-500">Last updated: 14 August 2026</p>
          <p className="mt-4 text-base leading-7 text-slate-300">This notice describes the current site and contact flows at a practical level. It avoids promising a retention, deletion or security outcome that is not mechanically guaranteed by the application.</p>
        </header>

        <section className="mt-10 space-y-4">
          {SECTIONS.map(([title, body]) => <article key={title} className="rounded-2xl border border-white/10 bg-[#151b3d] p-6"><h2 className="font-bold text-white">{title}</h2><p className="mt-2 text-sm leading-6 text-slate-300">{body}</p></article>)}
        </section>

        <aside className="mt-10 rounded-2xl border border-white/10 bg-[#151b3d] p-6"><h2 className="text-lg font-bold text-white">Privacy question?</h2><p className="mt-2 text-sm leading-6 text-slate-300">Use the minimum information needed to identify the relevant order or conversation, and do not include credentials or unrelated sensitive data.</p><a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#008236] px-5 py-3 text-sm font-bold text-white"><MessageCircle className="h-4 w-4" /> Contact AIPS</a></aside>
      </div>
    </PageLayout>
  );
}
