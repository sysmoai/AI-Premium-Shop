import { motion } from "framer-motion";
import { MIN_PRICE } from "@/lib/catalogStats";
import { MessageCircle, Facebook, Instagram, Linkedin } from "lucide-react";
import { useLocation } from "wouter";
import { PrimaryBrandLogo } from "@/components/PrimaryBrandLogo";
import { PaymentBadges } from "@/components/PaymentBadges";

const WHATSAPP_LINK = "https://wa.me/8801865385348";

const FOOTER_COLS = [
  {
    title: "Products",
    links: [
      { label: "AI Assistant & Chat", href: "/ai-assistant" },
      { label: "AI Image & Design", href: "/ai-image" },
      { label: "AI Video", href: "/ai-video" },
      { label: "AI Voice & Music", href: "/ai-voice-music" },
      { label: "AI Code & Dev Tools", href: "/ai-code" },
      { label: "AI Workspace", href: "/ai-workspace" },
      { label: "Bundles", href: "/bundles" },
      { label: "All Products", href: "/products" },
    ],
  },
  {
    // These eight all pointed at /#pain-points — one homepage anchor — while
    // the real guide pages sat unlinked. Eight links to the same anchor is
    // eight wasted internal links and eight pages search engines never reach.
    title: "Best AI For",
    links: [
      { label: "Students", href: "/best-ai-for-students" },
      { label: "Freelancers", href: "/best-ai-for-freelancers" },
      { label: "Content Creators", href: "/best-ai-for-creators" },
      { label: "Business Owners", href: "/best-ai-for-business" },
      { label: "Job Seekers", href: "/best-ai-for-job-seekers" },
      { label: "Developers", href: "/best-ai-for-developers" },
      { label: "Designers", href: "/best-ai-for-designers" },
      { label: "Marketers", href: "/best-ai-for-marketers" },
    ],
  },
  {
    // The Bangla pages were reachable only by typing the URL: nothing on the
    // site linked to them and they were absent from the sitemap, so the whole
    // Bangla-first content effort was invisible to both visitors and crawlers.
    title: "বাংলায় দেখুন",
    links: [
      { label: "বাংলা হোম", href: "/bn" },
      { label: "ছাত্রছাত্রীদের জন্য", href: "/students-bn" },
      { label: "ফ্রিল্যান্সারদের জন্য", href: "/freelancers-bn" },
      { label: "কন্টেন্ট ক্রিয়েটরদের জন্য", href: "/creators-bn" },
      { label: "ডেভেলপারদের জন্য", href: "/developers-bn" },
      { label: "ছোট ব্যবসার জন্য", href: "/smb-bn" },
      { label: "শিক্ষকদের জন্য", href: "/educators-bn" },
      { label: "সব গাইড", href: "/guides" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "All Guides", href: "/guides" },
      { label: "FAQ", href: "/faq" },
      { label: "How to Order", href: "/#how-it-works" },
      { label: "Refund Policy", href: "/refund-policy" },
      { label: "Terms", href: "/terms" },
      { label: "WhatsApp", href: WHATSAPP_LINK, external: true },
    ],
  },
];

export function FinalCTASection() {
  const [, navigate] = useLocation();

  return (
    <>
      <section className="py-20 px-4" style={{ backgroundColor: "#0a0e27" }}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl py-14 px-8 md:p-12 border border-[#f4b942]/20"
            style={{
              background: "linear-gradient(135deg, rgba(244,185,66,0.08) 0%, transparent 50%, rgba(244,185,66,0.08) 100%)",
            }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-4">
              Start Today — From Just BDT {MIN_PRICE}
            </h2>
            <p className="text-base mb-8 max-w-md mx-auto text-center text-gray-400">
              Join a growing community of customers who trust AI Premium Shop.
            </p>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="final-cta"
              className="bg-green-600 hover:bg-green-500 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-lg mx-auto block mt-6 max-w-xs text-center flex items-center justify-center gap-2 transition-colors duration-200"
              style={{ boxShadow: "0 8px 30px rgba(37,211,102,0.25)" }}
            >
              <MessageCircle className="w-5 h-5" />
              Order on WhatsApp
            </a>
            <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
              <span className="text-sm text-gray-500">Pay with</span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#E2136E] text-white">bKash</span>
              {/* white text on #F6921E fails WCAG AA (2.32:1, need 4.5:1); dark passes at 7.50:1 */}
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#F6921E] text-[#1a1a1a]">Nagad</span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#6e40c9] text-white">Rocket</span>
            </div>
          </motion.div>
        </div>
      </section>

      <footer
        className="pt-16 pb-8 px-4 border-t border-white/10"
        style={{ backgroundColor: "#080c1f" }}
        data-testid="footer"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="mb-3">
                <PrimaryBrandLogo size="small" layout="horizontal" />
              </div>
              <p className="text-xs leading-relaxed max-w-xs" style={{ color: "#c9ceda" }}>
                Premium AI subscriptions in Bangladesh. Fast delivery. Local payment. Real support.
              </p>
              <div className="flex items-center gap-3 mt-5">
                <a href="https://www.facebook.com/aipremiumshopfb" target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/10 hover:border-white/30 transition-colors"
                  aria-label="Facebook">
                  <Facebook className="w-4 h-4" style={{ color: "#c9ceda" }} />
                </a>
                <a href="https://instagram.com/aipremiumshop" target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/10 hover:border-white/30 transition-colors"
                  aria-label="Instagram">
                  <Instagram className="w-4 h-4" style={{ color: "#c9ceda" }} />
                </a>
                <a href="https://linkedin.com/company/aipremiumshop" target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/10 hover:border-white/30 transition-colors"
                  aria-label="LinkedIn">
                  <Linkedin className="w-4 h-4" style={{ color: "#c9ceda" }} />
                </a>
              </div>
            </div>

            {FOOTER_COLS.map((col) => (
              <div key={col.title}>
                <div className="font-semibold text-white text-sm mb-4">{col.title}</div>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      {"external" in link && link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs transition-colors hover:text-white"
                          style={{ color: "#c9ceda" }}
                        >
                          {link.label}
                        </a>
                      ) : link.href.includes("#") ? (
                        <a
                          href={link.href}
                          className="text-xs transition-colors hover:text-white"
                          style={{ color: "#c9ceda" }}
                        >
                          {link.label}
                        </a>
                      ) : (
                        <a
                          href={link.href}
                          onClick={(e) => { e.preventDefault(); navigate(link.href); }}
                          className="text-xs transition-colors hover:text-white"
                          style={{ color: "#c9ceda" }}
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-white/10 space-y-4">
            <PaymentBadges label="We accept" className="flex-wrap" />
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs" style={{ color: "#c9ceda" }}>
              <span>© 2022–{new Date().getFullYear()} AI Premium Shop, Dhaka, Bangladesh. All rights reserved.</span>
              <span>aipremiumshop.com</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
