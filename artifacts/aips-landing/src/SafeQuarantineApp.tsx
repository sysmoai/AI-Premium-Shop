import { MessageCircle, Search, ShieldCheck } from "lucide-react";

const WHATSAPP = "https://wa.me/8801865385348";

export default function SafeQuarantineApp() {
  return (
    <div className="min-h-screen bg-[#070b1d] text-white">
      <header className="border-b border-white/10 bg-[#0a0e27]">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between gap-4">
          <a href="/" className="font-extrabold tracking-tight">AI Premium Shop</a>
          <a href="/support" className="text-sm text-white/70 hover:text-white">Support</a>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-5 py-16 md:py-24">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-sm text-white/70">
            <ShieldCheck className="w-4 h-4 text-[#f4b942]" /> Verification mode
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mt-5 leading-tight">
            Product information is being verified.
          </h1>
          <p className="text-lg md:text-xl text-white/65 mt-5 leading-8">
            Commercial offers are temporarily hidden while current pricing, access and delivery details are reviewed. You can still browse support information or ask for the latest verified availability.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-10 max-w-3xl">
          <a href="/products" className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 hover:bg-white/[0.055] transition-colors">
            <Search className="w-6 h-6 text-[#f4b942]" />
            <h2 className="font-bold text-xl mt-4">Browse product information</h2>
            <p className="text-white/60 mt-2 leading-6">See the current informational catalog without relying on an unverified public offer.</p>
          </a>
          <a href={`${WHATSAPP}?text=${encodeURIComponent("Hi, I would like the latest verified availability from AI Premium Shop.")}`} target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 hover:bg-white/[0.055] transition-colors">
            <MessageCircle className="w-6 h-6 text-[#f4b942]" />
            <h2 className="font-bold text-xl mt-4">Ask for current availability</h2>
            <p className="text-white/60 mt-2 leading-6">Contact support for a current answer. No price or purchase promise is made on this fallback page.</p>
          </a>
        </div>
      </main>
    </div>
  );
}
