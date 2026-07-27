import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircle } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumb } from "@/components/Breadcrumb";

const WHATSAPP = "https://wa.me/8801865385348";

const FAQS = [
  // === General Questions (from Notion SEO FAQ + existing) ===
  {
    q: "What is AI Premium Shop?",
    a: "AI Premium Shop (AIPS) is Bangladesh's #1 AI subscription provider operating since 2024. We provide official access to 80+ AI tools including ChatGPT Plus, Claude Pro, Midjourney, GitHub Copilot, Gemini Advanced, and more. Pay with bKash, Nagad, or Rocket. Instant delivery. our customers served.",
  },
  {
    q: "Is AI Premium Shop legit and trustworthy?",
    a: "Yes. AIPS has operated since 2024 with our customers. We offer 30-day warranty on all subscriptions, WhatsApp support with prompt response during business hours, and operate transparently with published refund and privacy policies.",
  },
  {
    q: "Which AI tools are available at AI Premium Shop?",
    a: "ChatGPT Plus, Claude Pro, Midjourney, Gemini Advanced, Perplexity Pro, GitHub Copilot Pro, Cursor Pro, ElevenLabs, Grammarly Premium, Canva Pro, Notion Business, ChatGPT Business, ChatGPT Pro, CapCut Pro, Freepik, Kling AI, Synthesia, Windsurf, and 60+ more. Total 80+ AI subscriptions across 9 categories.",
  },
  // === Pricing and Payment (from Notion SEO FAQ) ===
  {
    q: "What is the cheapest AI subscription in Bangladesh?",
    a: "ChatGPT Plus shared seat at BDT 350/month is the most affordable premium AI subscription in Bangladesh. Canva Pro at BDT 190/month and Adobe Firefly at BDT 190/month are also available at entry-level prices.",
  },
  {
    q: "What payment methods does AI Premium Shop accept?",
    a: "bKash, Nagad, Rocket, bank transfer, and Binance Pay. No international credit card needed.",
  },
  {
    q: "Can I pay in installments?",
    a: "Subscriptions are billed monthly. Each month you pay the full monthly price. No annual commitment required. Simply message WhatsApp to renew each month.",
  },
  {
    q: "Are there any hidden charges?",
    a: "No. The price shown is the total you pay. No setup fees, no activation fees, no taxes added. What you see is what you pay.",
  },
  {
    q: "Do prices change month to month?",
    a: "Prices are stable. AIPS will notify customers via WhatsApp if any price change occurs, with at least 7 days advance notice.",
  },
  // === Delivery and Activation (from Notion SEO FAQ) ===
  {
    q: "How long does delivery take?",
    a: "Typically 5–15 minutes after payment confirmation during business hours. During off-hours (midnight–8am), maximum 2–3 hours. Delivery is 100% digital — no physical pickup required.",
  },
  {
    q: "Do I need to be in Dhaka to order?",
    a: "No. AI Premium Shop delivers to all 64 districts in Bangladesh. Delivery is digital — location does not matter.",
  },
  {
    q: "What do I receive after payment?",
    a: "Depending on the subscription: access for a shared account, activation instructions for your own account, or an invite link. All access comes with setup instructions via WhatsApp.",
  },
  {
    q: "Do I need a VPN?",
    a: "No. All subscriptions from AIPS work without VPN. We provide the subscription in a way that works directly in Bangladesh.",
  },
  // === Shared vs Personal (existing, good) ===
  {
    q: "What's the difference between Shared and Personal accounts?",
    a: "Shared accounts give you access to the full AI plan at a lower cost. Multiple users access the same subscription — but nobody can see anyone else's conversations or data. Personal (Private) accounts are exclusively yours: full privacy, custom settings, no usage limits from other users, and your own dedicated access.",
  },
  {
    q: "Can I upgrade from Shared to Personal later?",
    a: "Yes. Message us on WhatsApp when you're ready to upgrade. We'll help you switch seamlessly. You only pay the price difference for the remaining period of your current subscription.",
  },
  // === ChatGPT Plus Bangladesh (from Notion SEO FAQ) ===
  {
    q: "ChatGPT Plus price in Bangladesh 2026?",
    a: "ChatGPT Plus shared: BDT 350/month. Premium shared: BDT 950/month. Personal account: BDT 2,990/month. ChatGPT Pro: BDT 4,500/month. All via bKash or Nagad at AI Premium Shop.",
  },
  {
    q: "Does ChatGPT Plus shared account include GPT-5?",
    a: "Yes. All ChatGPT Plus accounts (shared and personal) include access to GPT-5 series, DALL-E 3, Sora, Advanced Voice Mode, Deep Research, Custom GPTs, and Memory.",
  },
  {
    q: "How to buy ChatGPT Plus with bKash in Bangladesh?",
    a: "Message AIPS on WhatsApp (+8801865385348). Choose your plan. Pay via bKash/Nagad. Receive ChatGPT Plus access in 5–15 minutes.",
  },
  // === Claude Pro Bangladesh (from Notion SEO FAQ) ===
  {
    q: "Claude Pro price in Bangladesh 2026?",
    a: "Claude Pro shared: BDT 1,399/month. Personal account: BDT 2,950/month. Available at AI Premium Shop with bKash or Nagad payment.",
  },
  {
    q: "What is Claude Pro best for?",
    a: "Claude Pro excels at coding (ranked #1 on benchmarks), long document analysis (200K token context), academic writing, and nuanced explanations. Preferred by developers and researchers.",
  },
  {
    q: "Is Claude better than ChatGPT?",
    a: "Different strengths. Claude is better for coding and long documents. ChatGPT Plus is better for image generation, voice, video (Sora), and general tasks. Many professionals use both.",
  },
  // === Warranty and Support (from Notion SEO FAQ) ===
  {
    q: "What is the 30-day warranty?",
    a: "If your subscription stops working within 30 days of purchase due to any issue on our end, we will fix it, replace it, or issue a full refund — your choice. No questions asked.",
  },
  {
    q: "How do I contact support?",
    a: "WhatsApp: +8801865385348 — response during business hours. Also available at aipremiumshop.com.",
  },
  {
    q: "What happens after 30 days if there is a problem?",
    a: "After 30 days, we still provide support and will try to resolve issues, but replacement or refund is at our discretion. We prioritize long-term customer relationships.",
  },
  {
    q: "How do I renew my subscription?",
    a: "Message AIPS on WhatsApp before expiry. We send a reminder 3 days before. Reply \"renew\" and we process it in minutes.",
  },
  // === Reviews and Testimonials ===
  {
    q: "Do you have any customer reviews or case studies?",
    a: "Yes. AI Premium Shop has served 3,000+ customers since 2024 with a 4.9/5 satisfaction rate. Here are real results from our customers:\n\n• Rafiq (Web Developer, Dhaka): 'I was paying $20/mo — now I pay BDT 350 through AIPS. Saved 80%.'\n• Nusrat (Content Creator, Sylhet): 'Midjourney from AIPS improved my thumbnails 10x. My clients love them.'\n• Tanvir (Startup Founder, Dhaka): 'Claude Pro at half price. 6 months, zero downtime.'\n• Fatima (Student, Rajshahi): 'CGPA went from 2.8 to 3.4 using ChatGPT Plus from AIPS.'\n\nMessage us on WhatsApp for specific case studies matching your profession.",
  },
  // === Security and Privacy (from Notion SEO FAQ) ===
  {
    q: "Is my data safe with a shared ChatGPT account?",
    a: "Yes. Each user on a family plan has a completely separate profile. Conversations are private to your profile. Other users cannot see your chat history.",
  },
  {
    q: "Will OpenAI or Anthropic know I bought through AIPS?",
    a: "No. You use the subscription normally. The purchase method is between you and AIPS.",
  },
  // === What AI for me (existing, updated pricing) ===
  {
    q: "What AI tool is best for my work?",
    a: "It depends on your needs:\n\n• Students: ChatGPT Plus Shared (BDT 350) or Google AI Pro (BDT 499)\n• Freelancers: ChatGPT Plus Private (BDT 2,990) or Claude Pro Premium Shared (BDT 1,399)\n• Developers: GitHub Copilot Shared (BDT 500) or Cursor Pro (BDT 1,100)\n• Content Creators: Midjourney Standard (BDT 1,499) + Suno Pro (BDT 499)\n• Business: ChatGPT Team (BDT 699) + Notion Business (BDT 399)\n\nNot sure? Message us on WhatsApp and we'll recommend the perfect tool.",
  },
  // === Refunds & Policies (existing) ===
  {
    q: "Do you offer refunds?",
    a: "Refunds are available within 15 minutes of delivery if the service doesn't match what was ordered. After activation, our 30-day replacement warranty covers all issues. See our full Refund Policy for details.",
  },
  {
    q: "Can I pay in USD or use PayPal?",
    a: "We primarily accept local payments (bKash, Nagad, Rocket). For international clients, we accept Binance USDT. We don't accept PayPal at this time.",
  },
];

const BN_FAQS = [
  {
    q: "AI Premium Shop কী?",
    a: "AI Premium Shop বাংলাদেশের #১ AI সাবস্ক্রিপশন প্রদানকারী। ২০২৪ সাল থেকে ৩,০০০+ গ্রাহককে সেবা দিচ্ছি। ChatGPT Plus ৳৩৫০/মাস, Claude Pro, Midjourney সহ ৭৬+ AI টুলস। bKash/Nagad দিয়ে পেমেন্ট। ৩০ দিনের ওয়ারেন্টি।",
  },
  {
    q: "ChatGPT Plus কীভাবে কিনবো?",
    a: "WhatsApp-এ মেসেজ করুন +8801865385348। প্ল্যান বলুন। bKash/Nagad-এ পেমেন্ট করুন। ৫-১৫ মিনিটে অ্যাক্সেস পাবেন।",
  },
  {
    q: "শেয়ার্ড অ্যাকাউন্ট কি নিরাপদ?",
    a: "হ্যাঁ। আপনি প্রাইভেট প্রোফাইল পান। অন্য ইউজার আপনার চ্যাট দেখতে পারে না। ৩,০০০+ গ্রাহকের কোনো ডাটা সমস্যা হয়নি।",
  },
  {
    q: "ডেলিভারি কত দ্রুত?",
    a: "সাধারণত ৫-১৫ মিনিট। রাত ১২টা থেকে সকাল ৮টার মধ্যে সর্বোচ্চ ২-৩ ঘণ্টা। ১০০% ডিজিটাল ডেলিভারি।",
  },
  {
    q: "কোন পেমেন্ট মাধ্যম গ্রহণ করেন?",
    a: "bKash, Nagad, Rocket, ব্যাংক ট্রান্সফার, এবং Binance Pay। কোনো ইন্টারন্যাশনাল কার্ডের প্রয়োজন নেই।",
  },
  {
    q: "আপনার কি কোনো রিভিউ বা কেস স্টাডি আছে?",
    a: "হ্যাঁ। ২০২৪ সাল থেকে ৩,০০০+ গ্রাহক আমাদের সেবা নিচ্ছেন। রেটিং ৪.৯/৫। রাফিক (ওয়েব ডেভেলপার): 'আগে $২০ দিতাম, এখন AIPS-এ ৩৫০ টাকায় পাচ্ছি।' নুসরাত (কন্টেন্ট ক্রিয়েটর): 'মিডজার্নি আমার থাম্বনেইল ১০x উন্নত করেছে।' ফাতিমা (ছাত্রী): 'CGPA ২.৮ থেকে ৩.৪ হয়েছে।' বিস্তারিত জানতে WhatsApp-এ মেসেজ করুন।",
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
        title="FAQ — AI Subscription Bangladesh | bKash/Nagad Payment | AI Premium Shop"
        description="80+ AI subscriptions in Bangladesh. ChatGPT Plus BDT 350, Claude Pro, Midjourney. bKash/Nagad payment, 30-day warranty, WhatsApp support. All questions answered."
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

        {/* Bengali FAQ Section */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">সচরাচর জিজ্ঞাসা (Bangla FAQ)</h2>
          <p style={{ color: "#c9ceda" }} className="mb-6">বাংলাদেশে AI সাবস্ক্রিপশন কেনার সম্পর্কে সব তথ্য।</p>
        </div>

        <div className="space-y-3 mb-12">
          {BN_FAQS.map((faq, i) => <FAQItem key={`bn-${i}`} faq={faq} index={FAQS.length + i} />)}
        </div>

        <div className="p-8 rounded-2xl text-center border border-white/10" style={{ backgroundColor: "#151b3d" }}>
          <p className="font-semibold text-white text-lg mb-2">Still have questions?</p>
          <p className="text-sm mb-6" style={{ color: "#c9ceda" }}>
            We're available 10 AM – Midnight BST, 7 days a week. WhatsApp response during business hours.
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
