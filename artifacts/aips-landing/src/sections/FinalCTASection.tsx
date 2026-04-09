import { motion } from "framer-motion";
import { MessageCircle, Facebook, Instagram, Linkedin } from "lucide-react";
import { PrimaryBrandLogo } from "@/components/PrimaryBrandLogo";
import { PaymentBadges } from "@/components/PaymentBadges";

const WHATSAPP_LINK = "https://wa.me/8801865385348";

const FOOTER_COLS = [
  {
    title: "Products",
    links: [
      "AI Assistant & Chat",
      "AI Image & Design",
      "AI Video",
      "AI Voice & Music",
      "AI Code & Dev",
      "AI Workspace",
      "Bundles",
      "All Products",
    ],
  },
  {
    title: "Best AI For",
    links: [
      "Students",
      "Freelancers",
      "Content Creators",
      "Business Owners",
      "Job Seekers",
      "Developers",
      "Designers",
      "Marketers",
    ],
  },
  {
    title: "Company",
    links: ["About", "Contact", "Pricing", "Compare Tools"],
  },
  {
    title: "Support",
    links: ["FAQ", "How to Order", "Refund Policy", "Terms", "WhatsApp", "Community"],
  },
];

export function FinalCTASection() {
  return (
    <>
      {/* Final CTA */}
      <section className="py-20 px-4" style={{ backgroundColor: "#0a0e27" }}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl py-14 px-8 border"
            style={{ backgroundColor: "#151b3d", borderColor: "rgba(244,185,66,0.25)" }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
              Start Today — From Just BDT 350
            </h2>
            <p className="text-base mb-8 max-w-md mx-auto" style={{ color: "#c9ceda" }}>
              Join 1,200+ customers who trust AI Premium Shop.
            </p>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="final-cta"
              className="btn-cta glow-cta px-10 py-4 rounded-xl text-base inline-flex items-center gap-2 font-semibold"
            >
              <MessageCircle className="w-5 h-5" />
              Order on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="pt-16 pb-8 px-4 border-t border-white/10"
        style={{ backgroundColor: "#080c1f" }}
        data-testid="footer"
      >
        <div className="max-w-7xl mx-auto">
          {/* Top: logo + cols */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
            {/* Brand col */}
            <div className="col-span-2 md:col-span-1">
              <div className="mb-3">
                <PrimaryBrandLogo size="small" layout="horizontal" />
              </div>
              <p className="text-xs leading-relaxed max-w-xs" style={{ color: "#c9ceda" }}>
                Premium AI subscriptions in Bangladesh. Fast delivery. Local payment. Real support.
              </p>
              {/* Socials */}
              <div className="flex items-center gap-3 mt-5">
                <a href="https://www.facebook.com/aipremiumshopbd" target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/10 hover:border-white/30 transition-colors"
                  aria-label="Facebook">
                  <Facebook className="w-4 h-4" style={{ color: "#c9ceda" }} />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/10 hover:border-white/30 transition-colors"
                  aria-label="Instagram">
                  <Instagram className="w-4 h-4" style={{ color: "#c9ceda" }} />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/10 hover:border-white/30 transition-colors"
                  aria-label="LinkedIn">
                  <Linkedin className="w-4 h-4" style={{ color: "#c9ceda" }} />
                </a>
              </div>
            </div>

            {/* Link cols */}
            {FOOTER_COLS.map((col) => (
              <div key={col.title}>
                <div className="font-semibold text-white text-sm mb-4">{col.title}</div>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href={link === "WhatsApp" ? WHATSAPP_LINK : "#"}
                        target={link === "WhatsApp" ? "_blank" : undefined}
                        rel={link === "WhatsApp" ? "noopener noreferrer" : undefined}
                        className="text-xs transition-colors hover:text-white"
                        style={{ color: "#c9ceda" }}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Payment + copyright */}
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
