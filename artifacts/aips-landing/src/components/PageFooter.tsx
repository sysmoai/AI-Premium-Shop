import { useState } from "react";
import { useLocation } from "wouter";
import { Facebook, Instagram, Linkedin, Phone } from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/8801865385348";

const PRODUCT_LINKS_LEFT = [
  { label: "AI Chat & Assistant", href: "/ai-assistant" },
  { label: "AI Image & Design",   href: "/ai-image" },
  { label: "AI Video",            href: "/ai-video" },
  { label: "AI Voice & Music",    href: "/ai-voice-music" },
];
const PRODUCT_LINKS_RIGHT = [
  { label: "AI Code & Dev",  href: "/ai-code" },
  { label: "AI Workspace",   href: "/ai-workspace" },
  { label: "Bundles",        href: "/bundles" },
  { label: "All Products",   href: "/pricing" },
];

const SOLUTION_LINKS = [
  { label: "Students",          href: "/best-ai-for-students" },
  { label: "Freelancers",       href: "/best-ai-for-freelancers" },
  { label: "Creators",          href: "/best-ai-for-creators" },
  { label: "Business",          href: "/best-ai-for-business" },
  { label: "Developers",        href: "/best-ai-for-developers" },
  { label: "Job Seekers",       href: "/best-ai-for-job-seekers" },
  { label: "Designers",         href: "/best-ai-for-designers" },
  { label: "Marketers",         href: "/best-ai-for-marketers" },
];

const COMPANY_LINKS = [
  { label: "About",   href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Blog",    href: "/blog" },
  { label: "Pricing", href: "/pricing" },
];

const SUPPORT_LINKS = [
  { label: "FAQ",            href: "/faq" },
  { label: "How to Order",   href: "/how-to-order" },
  { label: "Refund Policy",  href: "/refund-policy" },
  { label: "Terms",          href: "/terms" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

const PAYMENT_BADGES = [
  { label: "bKash",   bg: "#E2136E" },
  { label: "Nagad",   bg: "#F6921E" },
  { label: "Rocket",  bg: "#8B2F8B" },
  { label: "Bank",    bg: "#4285f4" },
  { label: "Binance", bg: "#F0B90B" },
];

function FooterLink({ label, href, external }: { label: string; href: string; external?: boolean }) {
  const [, navigate] = useLocation();
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer"
        className="text-sm text-gray-400 hover:text-white transition-colors block">
        {label}
      </a>
    );
  }
  return (
    <a href={href}
      onClick={(e) => { e.preventDefault(); navigate(href); }}
      className="text-sm text-gray-400 hover:text-white transition-colors block">
      {label}
    </a>
  );
}

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
    <footer data-testid="footer" style={{ backgroundColor: "#060914" }}>
      {/* Gradient top border */}
      <div style={{ height: "1px", background: "linear-gradient(to right, transparent, rgba(244,185,66,0.3), transparent)" }} />

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-14 pb-8">

        {/* ── 4-column grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Col 1 — Brand */}
          <div>
            <a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }} className="inline-block mb-3">
              <span className="text-xl font-bold text-white tracking-wide">AI PREMIUM SHOP</span>
            </a>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs mb-5">
              Bangladesh's #1 AI subscription shop. 56 premium tools. Local payment. Real support.
            </p>
            <div className="flex items-center gap-3 mb-5">
              <a href="https://www.facebook.com/aipremiumshopbd" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4 text-gray-400" />
              </a>
              <a href="https://www.instagram.com/aipremiumshop/" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4 text-gray-400" />
              </a>
              <a href="https://www.linkedin.com/showcase/aipremiumshop/" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4 text-gray-400" />
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Phone className="w-4 h-4 flex-shrink-0" />
              <span>+880 1865-385348</span>
            </div>
          </div>

          {/* Col 2 — Products (2 sub-columns) */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Products</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              <div className="space-y-2.5">
                {PRODUCT_LINKS_LEFT.map((l) => <FooterLink key={l.label} {...l} />)}
              </div>
              <div className="space-y-2.5">
                {PRODUCT_LINKS_RIGHT.map((l) => <FooterLink key={l.label} {...l} />)}
              </div>
            </div>
          </div>

          {/* Col 3 — Solutions */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Solutions</h4>
            <div className="space-y-2.5">
              {SOLUTION_LINKS.map((l) => <FooterLink key={l.label} {...l} />)}
            </div>
          </div>

          {/* Col 4 — Company + Support */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Company</h4>
            <div className="space-y-2.5 mb-6">
              {COMPANY_LINKS.map((l) => <FooterLink key={l.label} {...l} />)}
            </div>
            <h4 className="text-white text-sm font-semibold mb-4">Support</h4>
            <div className="space-y-2.5">
              {SUPPORT_LINKS.map((l) => <FooterLink key={l.label} {...l} />)}
            </div>
          </div>
        </div>

        {/* ── Payment badges ── */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-gray-500 text-xs mr-1">We accept:</span>
          {PAYMENT_BADGES.map((b) => (
            <span key={b.label}
              className="text-xs font-semibold px-3 py-1 rounded-full text-white"
              style={{ backgroundColor: b.bg }}>
              {b.label}
            </span>
          ))}
        </div>

        {/* ── Newsletter ── */}
        <form onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-3 max-w-md mb-8">
          <span className="text-sm text-gray-400 flex-shrink-0">Get AI tool updates and deals</span>
          <div className="flex items-center gap-2 w-full sm:flex-1">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-gray-500 transition-colors min-w-0"
            />
            <button type="submit"
              className="px-4 py-2 rounded-lg text-sm font-semibold hover:bg-amber-400 transition-colors flex-shrink-0"
              style={{ backgroundColor: "#f4b942", color: "#0a0e27" }}>
              Subscribe
            </button>
          </div>
        </form>

        {/* ── Bottom bar ── */}
        <div className="border-t border-gray-800 pt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <span className="text-gray-500 text-xs">© 2026 AI Premium Shop. All rights reserved.</span>
          <span className="text-gray-500 text-xs">Email: support@aipremiumshop.com</span>
        </div>
      </div>
    </footer>
  );
}
