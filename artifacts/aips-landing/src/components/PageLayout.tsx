import { Navbar } from "@/components/Navbar";
import { PageFooter } from "@/components/PageFooter";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

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
    </div>
  );
}
