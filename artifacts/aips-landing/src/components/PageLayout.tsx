import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { MessageCircle } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { PageFooter } from "@/components/PageFooter";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

const WHATSAPP = "https://wa.me/8801865385348?text=Hi%2C%20I%20want%20to%20order%20an%20AI%20subscription";

function MobileOrderBar() {
  const [visible, setVisible] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (location === "/contact") return null;

  return (
    <div
      className={`lg:hidden fixed bottom-0 inset-x-0 z-40 transition-transform duration-300 ${visible ? "translate-y-0" : "translate-y-full"}`}
      style={{ backgroundColor: "rgba(10,14,39,0.97)", backdropFilter: "blur(12px)", borderTop: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="flex items-center justify-between px-4 h-16 gap-3">
        <div>
          <div className="text-xs font-medium" style={{ color: "#c9ceda" }}>Starting from</div>
          <div className="text-base font-bold" style={{ color: "#f4b942" }}>BDT 350/mo</div>
        </div>
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity flex-shrink-0"
          style={{ backgroundColor: "#25d366", color: "#fff", minHeight: "44px" }}
        >
          <MessageCircle className="w-4 h-4" />
          Order Now
        </a>
      </div>
    </div>
  );
}

interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0a0e27", color: "#fff" }}>
      <Navbar alwaysSolid />
      <main className="pt-20 pb-16 lg:pb-0">
        {children}
      </main>
      <PageFooter />
      <FloatingWhatsApp />
      <MobileOrderBar />
    </div>
  );
}
