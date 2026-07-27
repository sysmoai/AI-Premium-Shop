import { useEffect, useState } from "react";
import { Link } from "wouter";
import { CheckCircle2, MessageCircle, Copy } from "lucide-react";
import { useLookupOrder, type Order } from "@workspace/api-client-react";
import { Navbar } from "@/components/Navbar";
import { PageFooter } from "@/components/PageFooter";
import { formatBDT } from "@/lib/format";

export default function OrderSuccessPage({ orderNumber }: { orderNumber: string }) {
  const [order, setOrder] = useState<Order | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = `Order ${orderNumber} — AIPS`;
    try {
      const cached = sessionStorage.getItem(`order:${orderNumber}`);
      if (cached) setOrder(JSON.parse(cached));
    } catch {}
  }, [orderNumber]);

  const lookup = useLookupOrder();
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onLookup = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    lookup.mutate(
      { data: { orderNumber, phone } },
      {
        onSuccess: (o) => setOrder(o),
        onError: () => setError("We couldn't find that order. Double-check your phone number."),
      },
    );
  };

  const copyOrderNumber = async () => {
    try {
      await navigator.clipboard.writeText(orderNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0a0e27", color: "#fff" }}>
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-10 md:py-16">
        {!order ? (
          <div className="rounded-2xl border border-white/10 p-8" style={{ backgroundColor: "rgba(255,255,255,0.03)" }}>
            <h1 className="text-2xl font-bold mb-2">Look up order {orderNumber}</h1>
            <p className="text-white/70 text-sm mb-5">For privacy, please confirm with the phone number used at checkout.</p>
            <form onSubmit={onLookup} className="flex gap-2">
              <input type="tel" required placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/15" data-testid="lookup-phone" />
              <button type="submit" disabled={lookup.isPending} className="px-5 py-2 rounded-lg font-bold" style={{ backgroundColor: "#f4b942", color: "#0a0e27" }} data-testid="lookup-submit">
                {lookup.isPending ? "Checking…" : "Look up"}
              </button>
            </form>
            {error && <p className="text-sm text-red-400 mt-3">{error}</p>}
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <CheckCircle2 className="w-14 h-14 mx-auto mb-3" style={{ color: "#22c55e" }} />
              <h1 className="text-3xl font-bold mb-2">Order placed</h1>
              <button onClick={copyOrderNumber} className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white" data-testid="copy-order">
                <span className="font-mono">{order.orderNumber}</span>
                <Copy className="w-3.5 h-3.5" /> {copied && <span className="text-green-400">copied</span>}
              </button>
            </div>

            <div className="rounded-xl border border-white/10 p-6 space-y-4" style={{ backgroundColor: "rgba(255,255,255,0.03)" }}>
              <Row label="Status">
                <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold" style={{ backgroundColor: statusColor(order.status).bg, color: statusColor(order.status).fg }}>
                  {order.status}
                </span>
              </Row>
              <Row label="Customer">{order.customerName} · {order.customerPhone}</Row>
              <Row label="Email">{order.customerEmail}</Row>
              <Row label="Payment">{order.paymentMethod}{order.paymentReference ? ` · ${order.paymentReference}` : ""}</Row>

              <div className="border-t border-white/10 pt-4">
                <h3 className="font-semibold mb-2 text-sm text-white/80">Items</h3>
                <ul className="space-y-1.5 text-sm">
                  {order.items.map((it) => (
                    <li key={it.id} className="flex justify-between">
                      <span>{it.productName} × {it.quantity}</span>
                      <span className="text-white/80">{formatBDT(it.lineTotal)}</span>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-white/10 mt-3 pt-2 flex justify-between font-bold">
                  <span>Total</span>
                  <span style={{ color: "#f4b942" }}>{formatBDT(order.total)}</span>
                </div>
              </div>

              {order.whatsappUrl && (
                <a href={order.whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-lg font-bold" style={{ backgroundColor: "#25d366", color: "#fff" }} data-testid="confirm-whatsapp">
                  <MessageCircle className="w-4 h-4" /> Confirm on WhatsApp
                </a>
              )}
            </div>

            <div className="text-center mt-6 text-sm">
              <Link href="/track-order" className="text-white/60 hover:text-white">Track this order later</Link>
              <span className="mx-2 text-white/30">·</span>
              <Link href="/products" className="text-white/60 hover:text-white">Continue shopping</Link>
            </div>
          </>
        )}
      </main>
      <PageFooter />
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-white/60">{label}</span>
      <span>{children}</span>
    </div>
  );
}

function statusColor(s: string) {
  switch (s) {
    case "pending": return { bg: "rgba(244,185,66,0.2)", fg: "#f4b942" };
    case "paid": return { bg: "rgba(59,130,246,0.2)", fg: "#60a5fa" };
    case "completed": return { bg: "rgba(34,197,94,0.2)", fg: "#4ade80" };
    case "cancelled": return { bg: "rgba(239,68,68,0.2)", fg: "#f87171" };
    default: return { bg: "rgba(255,255,255,0.1)", fg: "#fff" };
  }
}
