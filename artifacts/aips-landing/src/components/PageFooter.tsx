import { useLocation } from "wouter";
import { Facebook, Instagram, Linkedin } from "lucide-react";

const PAYMENT_BADGES = [
  { label: "bKash",   bg: "#E2136E" },
  { label: "Nagad",   bg: "#F6921E" },
  { label: "Rocket",  bg: "#8B2F8B" },
  { label: "Bank",    bg: "#4285f4" },
  { label: "Binance", bg: "#F0B90B" },
];

const PRODUCT_LINKS = [
  { label: "ChatGPT Plans",  href: "/chatgpt-plans-bangladesh" },
  { label: "Claude",         href: "/claude-pro-bangladesh" },
  { label: "Midjourney",     href: "/midjourney-bangladesh" },
  { label: "Google AI Pro",  href: "/gemini-advanced-bangladesh" },
  { label: "Copilot",        href: "/github-copilot-bangladesh" },
  { label: "Bundles",        href: "/bundles" },
  { label: "All Products",   href: "/pricing" },
];

const SOLUTION_LINKS = [
  { label: "Students",    href: "/best-ai-for-students" },
  { label: "Freelancers", href: "/best-ai-for-freelancers" },
  { label: "Creators",    href: "/best-ai-for-creators" },
  { label: "Business",    href: "/best-ai-for-business" },
  { label: "Developers",  href: "/best-ai-for-developers" },
  { label: "Job Seekers", href: "/best-ai-for-job-seekers" },
];

const COMPANY_LINKS = [
  { label: "About",   href: "/about" },
  { label: "Blog",    href: "/blog" },
  { label: "Support", href: "/support" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

const LEGAL_LINKS = [
  { label: "FAQ",            href: "/faq" },
  { label: "How to Order",   href: "/how-to-order" },
  { label: "Refund Policy",  href: "/refund-policy" },
  { label: "Terms",          href: "/terms" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

function FooterLink({ label, href }: { label: string; href: string }) {
  const [, navigate] = useLocation();
  return (
    <a href={href}
      onClick={(e) => { e.preventDefault(); navigate(href); }}
      className="text-sm text-gray-400 hover:text-white transition-colors block py-1">
      {label}
    </a>
  );
}

export function PageFooter() {
  const [, navigate] = useLocation();

  return (
    <footer data-testid="footer" className="border-t border-gray-800" style={{ backgroundColor: "#060914" }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">

          {/* Col 1 — Brand (spans 2 cols on lg) */}
          <div className="lg:col-span-2">
            <a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }} className="inline-block mb-2">
              <span className="text-lg font-bold text-white">AI PREMIUM SHOP</span>
            </a>
            <p className="text-sm text-gray-400 mt-2 max-w-xs leading-relaxed">
              Premium AI subscriptions in Bangladesh. 56 tools. Local payment. Instant delivery.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a href="https://www.facebook.com/aipremiumshopbd" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com/aipremiumshop/" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://www.linkedin.com/showcase/aipremiumshop/" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2 — Products */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-3">Products</h4>
            {PRODUCT_LINKS.map((l) => <FooterLink key={l.label} {...l} />)}
          </div>

          {/* Col 3 — Best AI For */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-3">Best AI For</h4>
            {SOLUTION_LINKS.map((l) => <FooterLink key={l.label} {...l} />)}
          </div>

          {/* Col 4 — Company + Legal */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-3">Company</h4>
            {COMPANY_LINKS.map((l) => <FooterLink key={l.label} {...l} />)}
            <h4 className="text-white text-sm font-semibold mb-3 mt-5">Legal</h4>
            {LEGAL_LINKS.map((l) => <FooterLink key={l.label} {...l} />)}
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-gray-500 text-xs">We accept:</span>
            {PAYMENT_BADGES.map((b) => (
              <span key={b.label}
                className="text-xs font-semibold px-3 py-1 rounded-full text-white"
                style={{ backgroundColor: b.bg }}>
                {b.label}
              </span>
            ))}
          </div>
          <span className="text-gray-500 text-xs">© 2026 AI Premium Shop. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
