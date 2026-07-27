import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import {
  useGetCart,
  useCreateOrder,
  getGetCartQueryKey,
} from "@workspace/api-client-react";
import { Navbar } from "@/components/Navbar";
import { PageFooter } from "@/components/PageFooter";
import { formatBDT } from "@/lib/format";

const PAYMENT_METHODS = [
  { id: "bkash", label: "bKash" },
  { id: "nagad", label: "Nagad" },
  { id: "rocket", label: "Rocket" },
  { id: "bank", label: "Bank Transfer" },
  { id: "binance", label: "Binance / Crypto" },
  { id: "whatsapp", label: "Confirm via WhatsApp" },
];

export default function CheckoutPage() {
  useEffect(() => {
    document.title = "Checkout — AIPS";
  }, []);
  const [, setLocation] = useLocation();
  const qc = useQueryClient();
  const { data: cart, isLoading } = useGetCart();
  const [form, setForm] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    paymentMethod: "bkash",
    paymentReference: "",
    notes: "",
  });
  const [error, setError] = useState<string | null>(null);

  const createOrder = useCreateOrder({
    mutation: {
      onSuccess: (order) => {
        qc.invalidateQueries({ queryKey: getGetCartQueryKey() });
        try {
          sessionStorage.setItem(
            `order:${order.orderNumber}`,
            JSON.stringify(order),
          );
        } catch {}
        setLocation(`/order/${order.orderNumber}`);
      },
      onError: (err: unknown) => {
        const msg = err instanceof Error ? err.message : "Failed to place order";
        setError(msg);
      },
    },
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.customerName.trim() || !form.customerEmail.trim() || !form.customerPhone.trim()) {
      setError("Please fill in name, email, and phone.");
      return;
    }
    createOrder.mutate({
      data: {
        customerName: form.customerName.trim(),
        customerEmail: form.customerEmail.trim(),
        customerPhone: form.customerPhone.trim(),
        paymentMethod: form.paymentMethod,
        paymentReference: form.paymentReference.trim() || null,
        notes: form.notes.trim() || null,
      },
    });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0a0e27", color: "#fff" }}>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-10 md:py-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Checkout</h1>

        {isLoading ? (
          <p className="text-white/70">Loading…</p>
        ) : !cart || cart.items.length === 0 ? (
          <p className="text-white/70">Your cart is empty.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            <form onSubmit={submit} className="md:col-span-2 space-y-4 rounded-xl border border-white/10 p-6" style={{ backgroundColor: "rgba(255,255,255,0.03)" }} data-testid="checkout-form">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Full Name" required>
                  <input type="text" required value={form.customerName} onChange={(e) => setForm({ ...form, customerName: e.target.value })} className={inputCls} data-testid="input-name" />
                </Field>
                <Field label="Phone (used for order lookup)" required>
                  <input type="tel" required value={form.customerPhone} onChange={(e) => setForm({ ...form, customerPhone: e.target.value })} className={inputCls} placeholder="01XXXXXXXXX" data-testid="input-phone" />
                </Field>
              </div>
              <Field label="Email" required>
                <input type="email" required value={form.customerEmail} onChange={(e) => setForm({ ...form, customerEmail: e.target.value })} className={inputCls} data-testid="input-email" />
              </Field>

              <Field label="Payment Method" required>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {PAYMENT_METHODS.map((m) => (
                    <label key={m.id} className={`cursor-pointer rounded-lg border p-3 text-sm font-medium text-center transition-colors ${form.paymentMethod === m.id ? "border-amber-400 bg-amber-400/10" : "border-white/15 hover:border-white/30"}`}>
                      <input type="radio" name="payment" value={m.id} checked={form.paymentMethod === m.id} onChange={() => setForm({ ...form, paymentMethod: m.id })} className="sr-only" />
                      {m.label}
                    </label>
                  ))}
                </div>
              </Field>

              <Field label="Payment Reference / Transaction ID (optional)">
                <input type="text" value={form.paymentReference} onChange={(e) => setForm({ ...form, paymentReference: e.target.value })} className={inputCls} placeholder="e.g. bKash TrxID" data-testid="input-ref" />
              </Field>

              <Field label="Notes (optional)">
                <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={3} className={inputCls} />
              </Field>

              {error && <p className="text-sm text-red-400" data-testid="error-msg">{error}</p>}

              <button type="submit" disabled={createOrder.isPending} className="w-full py-3 rounded-lg font-bold disabled:opacity-60" style={{ backgroundColor: "#f4b942", color: "#0a0e27" }} data-testid="place-order">
                {createOrder.isPending ? "Placing order…" : `Place Order — ${formatBDT(cart.total)}`}
              </button>
              <p className="text-xs text-white/50">After placing, you'll be guided to confirm via WhatsApp. Save your order number to track later.</p>
            </form>

            <aside className="rounded-xl border border-white/10 p-6 h-fit" style={{ backgroundColor: "rgba(255,255,255,0.04)" }}>
              <h2 className="font-bold mb-4">Order Summary</h2>
              <div className="space-y-2 text-sm mb-4">
                {cart.items.map((i) => (
                  <div key={i.id} className="flex justify-between gap-3">
                    <span className="text-white/80 truncate">{i.product.name} × {i.quantity}</span>
                    <span className="flex-shrink-0">{formatBDT(i.lineTotal)}</span>
                  </div>
                ))}
                <div className="border-t border-white/10 pt-2 flex justify-between font-bold text-lg"><span>Total</span><span style={{ color: "#f4b942" }}>{formatBDT(cart.total)}</span></div>
              </div>
            </aside>
          </div>
        )}
      </main>
      <PageFooter />
    </div>
  );
}

const inputCls = "w-full px-3 py-2 rounded-lg bg-white/5 border border-white/15 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400";

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm mb-1.5 text-white/80">{label}{required && <span className="text-amber-400"> *</span>}</span>
      {children}
    </label>
  );
}
