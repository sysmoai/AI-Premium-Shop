import { useState } from "react";
import { useLocation } from "wouter";
import { PrimaryBrandLogo } from "@/components/PrimaryBrandLogo";
import { PaymentBadges } from "@/components/PaymentBadges";
import { Facebook, Instagram, Linkedin } from "lucide-react";

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
    title: "Best AI For",
    links: [
      { label: "Students", href: "/best-ai-for-students" },
      { label: "Freelancers", href: "/best-ai-for-freelancers" },
      { label: "Content Creators", href: "/best-ai-for-creators" },
      { label: "Business Owners", href: "/best-ai-for-business" },
      { label: "Job Seekers", href: "/best-ai-for-job-seekers" },
      { label: "Developers", href: "/best-ai-for-developers" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Pricing", href: "/pricing" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "How to Order", href: "/#how-it-works" },
      { label: "Refund Policy", href: "/refund-policy" },
      { label: "Terms", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "WhatsApp", href: WHATSAPP_LINK, external: true },
    ],
  },
];

export function PageFooter() {
  const [, navigate] = useLocation();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    const msg = encodeURIComponent(`Hi, I want to subscribe to updates. My email: ${email.trim()}`);
    window.open(`${WHATSAPP_LINK}?text=${msg}`, "_blank", "noopener,noreferrer");
    setEmail("");
  };

  return (
    <footer
      className="pt-16 pb-8 px-4 border-t border-white/10"
      style={{ backgroundColor: "#080c1f" }}
      data-testid="footer"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-3">
              <a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }}>
                <PrimaryBrandLogo size="small" layout="horizontal" />
              </a>
            </div>
            <p className="text-xs leading-relaxed max-w-xs" style={{ color: "#c9ceda" }}>
              Premium AI subscriptions in Bangladesh. Fast delivery. Local payment. Real support.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a href="https://www.facebook.com/aipremiumshopbd" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/10 hover:border-white/30 transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" style={{ color: "#c9ceda" }} />
              </a>
              <a href="https://www.instagram.com/aipremiumshop/" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/10 hover:border-white/30 transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" style={{ color: "#c9ceda" }} />
              </a>
              <a href="https://www.linkedin.com/showcase/aipremiumshop/" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/10 hover:border-white/30 transition-colors" aria-label="LinkedIn">
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
                    ) : (
                      <a
                        href={link.href}
                        onClick={(e) => {
                          if (!link.href.startsWith("http") && !link.href.includes("#")) {
                            e.preventDefault();
                            navigate(link.href);
                          }
                        }}
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

        <div className="pt-8 border-t border-white/10 space-y-5">
          <PaymentBadges label="We accept" className="flex-wrap" />

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <span className="text-xs flex-shrink-0" style={{ color: "#c9ceda" }}>Get AI tool updates and deals</span>
            <div className="flex items-center gap-2 flex-1 max-w-sm">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-3 py-1.5 rounded-lg text-xs outline-none border border-white/10 focus:border-white/30 transition-colors"
                style={{ backgroundColor: "#151b3d", color: "#fff" }}
              />
              <button
                type="submit"
                className="px-3 py-1.5 rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity flex-shrink-0"
                style={{ backgroundColor: "#f4b942", color: "#0a0e27" }}
              >
                Subscribe
              </button>
            </div>
          </form>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs" style={{ color: "#c9ceda" }}>
            <span>© 2022–{new Date().getFullYear()} AI Premium Shop, Dhaka, Bangladesh. All rights reserved.</span>
            <span>aipremiumshop.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
