import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircle } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumb } from "@/components/Breadcrumb";

const WHATSAPP = "https://wa.me/8801865385348";

const FAQS = [
  {
    q: "What is AI Premium Shop?",
    a: "AI Premium Shop is Bangladesh's most trusted source for premium AI subscriptions. We provide access to ChatGPT Plus, Claude Pro, Midjourney, GitHub Copilot, and 30+ more tools — with local payment via bKash, Nagad, Rocket, or bank transfer. Founded in 2022, we've served over 1,200 customers across Bangladesh.",
  },
  {
    q: "What's the difference between Shared and Personal accounts?",
    a: "Shared accounts give you access to the full AI plan at a lower cost. Multiple users access the same subscription — but nobody can see anyone else's conversations or data. Personal (Private) accounts are exclusively yours: full privacy, custom settings, no usage limits from other users, and your own login credentials.",
  },
  {
    q: "How is payment made?",
    a: "We accept bKash, Nagad, Rocket, bank transfer, and Binance (USDT). After confirming your order on WhatsApp, we'll send you the payment number and amount. Once payment is received, your account is delivered — usually within 5–30 minutes.",
  },
  {
    q: "How fast is delivery?",
    a: "AI assistant accounts (ChatGPT, Claude, Gemini) are typically delivered within 5–30 minutes. Developer tools and creative tools (Midjourney, Runway, ElevenLabs) take 30–60 minutes. We operate 10 AM to Midnight BST, 7 days a week.",
  },
  {
    q: "Is it safe to buy AI subscriptions this way?",
    a: "Yes. Shared accounts work through legitimate plan-sharing — the same way families share Netflix. Personal accounts use official platform billing. We've maintained 1,200+ satisfied customers since 2022 with zero security incidents. All accounts come with a 30-day replacement warranty.",
  },
  {
    q: "What if my account stops working?",
    a: "All accounts come with a 30-day replacement warranty. If your account experiences any issue during the subscription period — access lost, service interrupted, or plan changed — we replace it at no extra cost. Just message us on WhatsApp with your order details.",
  },
  {
    q: "Do you offer refunds?",
    a: "Refunds are available within 15 minutes of delivery if the service doesn't match what was ordered. After activation, our 30-day replacement warranty covers all issues. See our full Refund Policy for details.",
  },
  {
    q: "Can I pay in USD or use PayPal?",
    a: "We primarily accept local payments (bKash, Nagad, Rocket). For international clients, we accept Binance USDT. We don't accept PayPal at this time.",
  },
  {
    q: "How do I place an order?",
    a: "Message us on WhatsApp at +880 1865-385348. Tell us which tool you want and whether you prefer Shared or Personal access. We'll confirm availability, send payment details, and deliver your account after payment — all within WhatsApp.",
  },
  {
    q: "Can I upgrade from Shared to Personal later?",
    a: "Yes. Message us on WhatsApp when you're ready to upgrade. We'll help you switch seamlessly. You only pay the price difference for the remaining period of your current subscription.",
  },
  {
    q: "Do you offer monthly subscriptions only?",
    a: "Most plans are monthly. Notion AI Plus is also available as a 6-month plan at a discounted rate. We're adding more long-term plans regularly. Message us to ask about current long-term pricing.",
  },
  {
    q: "What AI tool is best for my work?",
    a: "It depends on your needs:\n\n• Students: ChatGPT Plus Shared (BDT 350) or Google AI Pro (BDT 400)\n• Freelancers: ChatGPT Plus Private (BDT 700) or Claude Pro Premium Shared (BDT 1,495)\n• Developers: GitHub Copilot Individual (BDT 600) or Cursor Pro (BDT 1,100)\n• Content Creators: Midjourney Standard (BDT 900) + Suno Pro (BDT 500)\n• Business: ChatGPT Team (BDT 1,200) + Notion AI (BDT 550)\n\nNot sure? Message us on WhatsApp and we'll recommend the perfect tool.",
  },
];

function FAQItem({ faq, index }: { faq: { q: string; a: string }; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.03 }}
      className="rounded-2xl border border-white/10 overflow-hidden"
      style={{ backgroundColor: "#151b3d" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full p-5 text-left"
        aria-expanded={open}
      >
        <span className="font-semibold text-white text-sm pr-4">{faq.q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="flex-shrink-0">
          <ChevronDown className="w-4 h-4" style={{ color: "#f4b942" }} />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 text-sm leading-relaxed whitespace-pre-line" style={{ color: "#c9ceda" }}>
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQPage() {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": FAQS.map((faq) => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a,
        },
      })),
    };
    let script = document.getElementById("faq-jsonld") as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = "faq-jsonld";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);
    return () => {
      const el = document.getElementById("faq-jsonld");
      if (el) el.remove();
    };
  }, []);

  return (
    <PageLayout>
      <SEOHead
        title="FAQ — AI Subscriptions Bangladesh | AI Premium Shop"
        description="Questions about buying AI tools in Bangladesh. Shared vs Personal, payment, delivery, refunds. AI Premium Shop answers."
        canonical="https://aipremiumshop.com/faq"
      />
      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "FAQ" }]} />

      <section className="max-w-3xl mx-auto px-4 md:px-8 py-14">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Frequently Asked Questions</h1>
          <p style={{ color: "#c9ceda" }}>Everything you need to know about ordering AI subscriptions in Bangladesh.</p>
        </div>

        <div className="space-y-3 mb-12">
          {FAQS.map((faq, i) => <FAQItem key={i} faq={faq} index={i} />)}
        </div>

        <div className="p-8 rounded-2xl text-center border border-white/10" style={{ backgroundColor: "#151b3d" }}>
          <p className="font-semibold text-white text-lg mb-2">Still have questions?</p>
          <p className="text-sm mb-6" style={{ color: "#c9ceda" }}>
            We're available 10 AM – Midnight BST, 7 days a week. WhatsApp response in under 5 minutes.
          </p>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#25d366", color: "#fff" }}
          >
            <MessageCircle className="w-5 h-5" />
            Ask us on WhatsApp
          </a>
        </div>
      </section>
    </PageLayout>
  );
}
