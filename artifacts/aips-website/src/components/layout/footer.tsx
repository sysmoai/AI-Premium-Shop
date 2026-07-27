import Link from "next/link";
import { MessageCircle } from "lucide-react";

const whatsappNumber = process.env.NEXT_PUBLIC_WA_PRIMARY ?? "8801865385348";
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  "Hi AI Premium Shop, I have a question."
)}`;

const footerLinks = {
  Products: [
    { href: "/products/chatgpt-plus-bangladesh", label: "ChatGPT Plus" },
    { href: "/products/claude-pro-bangladesh", label: "Claude Pro" },
    { href: "/products/midjourney-bangladesh", label: "Midjourney" },
    { href: "/products/gemini-advanced-bangladesh", label: "Gemini Advanced" },
    { href: "/products/canva-pro-bangladesh", label: "Canva Pro" },
    { href: "/products/codeium-bangladesh", label: "Codeium" },
    { href: "/products", label: "View all →" },
  ],
  Company: [
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
  ],
  Compare: [
    { href: "/chatgpt-vs-claude", label: "ChatGPT vs Claude" },
    { href: "/chatgpt-vs-gemini", label: "ChatGPT vs Gemini" },
    { href: "/copilot-vs-cursor", label: "Copilot vs Cursor" },
    { href: "/midjourney-vs-ideogram", label: "Midjourney vs Ideogram" },
  ],
  Legal: [
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
  ],
};

function FooterLogo() {
  const size = 32;
  const scale = 0.62;
  const borderRadius = +(size * 0.225).toFixed(2);

  return (
    <div className="flex items-center gap-3">
      <div
        className="relative shrink-0"
        style={{
          width: size,
          height: size,
          borderRadius,
          background:
            "radial-gradient(120% 120% at 30% 0%, #1c2350 0%, #151b3d 55%, #0a0e27 100%)",
          boxShadow:
            "0 1px 0 rgba(255,255,255,.06) inset, 0 2.56px 7.04px -2.56px rgba(0,0,0,.55), 0 0.64px 1.92px -0.64px rgba(0,0,0,.4), inset 0 0 0 0.75px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.14)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            borderRadius,
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.02) 40%, rgba(255,255,255,0) 65%)",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <img
            src="/icon.png"
            alt="AI Premium Shop logo"
            draggable={false}
            decoding="async"
            className="block select-none"
            style={{
              width: `${scale * 100}%`,
              height: `${scale * 100}%`,
              objectFit: "contain",
              filter: "drop-shadow(0 2px 8px rgba(0,0,0,.35))",
            }}
          />
        </div>
      </div>
      <div className="flex flex-col">
        <div
          className="flex items-center whitespace-nowrap"
          style={{
            fontSize: "0.8125rem",
            lineHeight: 1.2,
            fontWeight: 800,
            letterSpacing: "0.12em",
            gap: "0.35em",
          }}
        >
          <span style={{ color: "#f4b942" }}>AI</span>
          <span style={{ color: "#FFFFFF" }}>PREMIUM</span>
          <span style={{ color: "#f4b942" }}>SHOP</span>
        </div>
        <span
          className="text-[0.625rem] font-medium tracking-[0.15em] uppercase leading-tight mt-0.5"
          style={{ color: "#5b6280" }}
        >
          Digital subscriptions in BD
        </span>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-[#0a0e27]">
      {/* Subtle top glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#f4b942]/20 to-transparent" />

      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block group">
              <FooterLogo />
            </Link>
            <p className="mt-5 max-w-xs text-[0.8125rem] leading-relaxed text-[#5b6280]">
              Bangladesh&apos;s trusted destination for premium AI subscriptions and digital tools. Local payment, instant delivery.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <span className="rounded-md bg-[#E2136E]/10 px-2 py-1 text-[0.6875rem] font-semibold text-[#E2136E]">bKash</span>
              <span className="rounded-md bg-[#EE7E2C]/10 px-2 py-1 text-[0.6875rem] font-semibold text-[#EE7E2C]">Nagad</span>
              <span className="rounded-md bg-white/[0.06] px-2 py-1 text-[0.6875rem] font-semibold text-[#8a91a8]">Rocket</span>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="lg:col-span-2">
              <h3 className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-[#5b6280]">
                {category}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`text-[0.8125rem] transition-colors duration-200 ${
                        link.label.includes("→")
                          ? "text-[#f4b942] hover:text-[#f0d77a]"
                          : "text-[#8a91a8] hover:text-white"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row">
          <p className="text-[0.75rem] text-[#5b6280]">
            © {new Date().getFullYear()} AI Premium Shop. All rights reserved.
          </p>
          <p className="text-[0.625rem] text-[#5b6280] max-w-md text-center">
            All product names and logos are trademarks of their respective owners. Service provided by SYSmoAI Private Limited (Bangladesh).
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[0.75rem] text-[#5b6280] transition hover:text-[#25d366]"
          >
            <MessageCircle className="size-3.5" />
            +880 1865-385348
          </a>
        </div>
      </div>
    </footer>
  );
}
