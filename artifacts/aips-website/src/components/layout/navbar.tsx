"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, MessageCircle } from "lucide-react";

const whatsappNumber = process.env.NEXT_PUBLIC_WA_PRIMARY ?? "8801865385348";
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  "Hi AI Premium Shop, I want to order a premium subscription."
)}`;

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function NavbarLogo() {
  const size = 36;
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
            "0 1px 0 rgba(255,255,255,.06) inset, 0 2.88px 7.92px -2.88px rgba(0,0,0,.55), 0 0.72px 2.16px -0.72px rgba(0,0,0,.4), inset 0 0 0 0.75px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.14)",
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

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* Close mobile menu on Escape key */
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0a0e27]/80 backdrop-blur-xl border-b border-white/[0.06]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="group" aria-label="AI Premium Shop Home">
            <NavbarLogo />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
                  pathname === link.href
                    ? "text-[#f4b942]"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#f4b942] rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold"
            >
              <MessageCircle className="w-4 h-4" />
              Order Now
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="md:hidden p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/5"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-40 bg-[#0a0e27]/95 backdrop-blur-xl md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col items-center justify-center h-full gap-6 px-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-2xl font-semibold transition-colors ${
                  pathname === link.href
                    ? "text-[#f4b942]"
                    : "text-slate-300 hover:text-white"
                }`}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-lg text-lg font-semibold"
            >
              <MessageCircle className="w-5 h-5" />
              Order on WhatsApp
            </a>
          </div>
        </div>
      )}
    </>
  );
}
