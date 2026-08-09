import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { Link } from "wouter";
import { ShieldAlert, MessageCircle } from "lucide-react";

const WHATSAPP = "https://wa.me/8801865385348?text=Hi%2C%20I%20have%20a%20question%20about%20AI%20Premium%20Shop%20availability.";

export default function CommerceVerificationPage() {
  return (
    <PageLayout>
      <SEOHead
        title="Availability Under Verification | AI Premium Shop"
        description="AI Premium Shop is reviewing current product availability and commercial information. Contact support for current guidance."
        canonical="https://aipremiumshop.com/"
        noindex
      />
      <section className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="mx-auto mb-6 w-14 h-14 rounded-2xl flex items-center justify-center border border-amber-400/30 bg-amber-400/10">
          <ShieldAlert className="w-7 h-7 text-amber-300" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Product availability is under verification</h1>
        <p className="text-base md:text-lg leading-relaxed mb-8" style={{ color: "#c9ceda" }}>
          We are reviewing current product availability, access methods, pricing and related commercial information before publishing or accepting new orders from this website.
        </p>
        <p className="leading-relaxed mb-10" style={{ color: "#c9ceda" }}>
          No product, price, access method or delivery promise shown on an older page should be treated as a current offer until this review is complete. For a current question, contact AI Premium Shop support.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold"
            style={{ backgroundColor: "#008236", color: "#fff" }}
          >
            <MessageCircle className="w-5 h-5" /> Contact support
          </a>
          <Link
            href="/about"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold border border-white/15 text-white"
          >
            About AI Premium Shop
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
