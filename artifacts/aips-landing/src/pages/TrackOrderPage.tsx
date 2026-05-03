import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Navbar } from "@/components/Navbar";
import { PageFooter } from "@/components/PageFooter";

export default function TrackOrderPage() {
  useEffect(() => {
    document.title = "Track Order — AIPS";
  }, []);
  const [, setLocation] = useLocation();
  const [orderNumber, setOrderNumber] = useState("");
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0a0e27", color: "#fff" }}>
      <Navbar />
      <main className="max-w-xl mx-auto px-4 py-12 md:py-20">
        <h1 className="text-3xl font-bold mb-2">Track your order</h1>
        <p className="text-white/70 mb-8">Enter your order number to view its current status.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (orderNumber.trim()) setLocation(`/order/${orderNumber.trim()}`);
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            placeholder="AIPS-XXXX-XXX"
            required
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value.toUpperCase())}
            className="flex-1 px-3 py-3 rounded-lg bg-white/5 border border-white/15 font-mono"
            data-testid="track-input"
          />
          <button type="submit" className="px-5 py-3 rounded-lg font-bold" style={{ backgroundColor: "#f4b942", color: "#0a0e27" }} data-testid="track-submit">
            Track
          </button>
        </form>
      </main>
      <PageFooter />
    </div>
  );
}
