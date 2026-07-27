import { useEffect } from "react";
import { Link } from "wouter";
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useGetCart,
  useUpdateCartItem,
  useRemoveCartItem,
  useClearCart,
  getGetCartQueryKey,
  type Cart,
} from "@workspace/api-client-react";
import { Navbar } from "@/components/Navbar";
import { PageFooter } from "@/components/PageFooter";
import { formatBDT } from "@/lib/format";

export default function CartPage() {
  useEffect(() => {
    document.title = "Your Cart — AIPS";
  }, []);
  const qc = useQueryClient();
  const setCart = (c: Cart) => qc.setQueryData(getGetCartQueryKey(), c);
  const { data: cart, isLoading } = useGetCart();
  const updateItem = useUpdateCartItem({ mutation: { onSuccess: setCart } });
  const removeItem = useRemoveCartItem({ mutation: { onSuccess: setCart } });
  const clearCart = useClearCart({ mutation: { onSuccess: setCart } });

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0a0e27", color: "#fff" }}>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-10 md:py-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Your Cart</h1>

        {isLoading ? (
          <p className="text-white/70">Loading…</p>
        ) : !cart || cart.items.length === 0 ? (
          <div className="rounded-2xl border border-white/10 p-10 text-center" style={{ backgroundColor: "rgba(255,255,255,0.03)" }}>
            <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-white/40" />
            <p className="text-lg mb-2">Your cart is empty</p>
            <p className="text-white/60 mb-6">Browse our AI subscriptions and add what you need.</p>
            <Link href="/products" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold" style={{ backgroundColor: "#f4b942", color: "#0a0e27" }} data-testid="browse-products">
              Browse Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-3">
              {cart.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 rounded-xl border border-white/10" style={{ backgroundColor: "rgba(255,255,255,0.03)" }} data-testid={`cart-row-${item.id}`}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm" style={{ backgroundColor: item.product.brandColor || "#1f2937" }}>
                    {item.product.brand[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link href={`/products`} className="font-semibold hover:underline truncate block">{item.product.name}</Link>
                    <p className="text-xs text-white/60 truncate">{item.product.brand} · {item.product.tier ?? item.product.accessType}</p>
                  </div>
                  <div className="flex items-center gap-1 rounded-lg border border-white/15 px-2 py-1">
                    <button aria-label="Decrease" disabled={item.quantity <= 1 || updateItem.isPending} onClick={() => updateItem.mutate({ itemId: item.id, data: { quantity: item.quantity - 1 } })} className="p-1 hover:opacity-70 disabled:opacity-40">
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center text-sm font-semibold" data-testid={`qty-${item.id}`}>{item.quantity}</span>
                    <button aria-label="Increase" disabled={updateItem.isPending} onClick={() => updateItem.mutate({ itemId: item.id, data: { quantity: item.quantity + 1 } })} className="p-1 hover:opacity-70">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="w-24 text-right font-bold" style={{ color: "#f4b942" }}>{formatBDT(item.lineTotal)}</div>
                  <button aria-label="Remove" onClick={() => removeItem.mutate({ itemId: item.id })} className="p-2 text-white/50 hover:text-red-400" data-testid={`remove-${item.id}`}>
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button onClick={() => clearCart.mutate()} className="text-sm text-white/50 hover:text-white/80 mt-2">Clear cart</button>
            </div>

            <aside className="rounded-xl border border-white/10 p-6 h-fit" style={{ backgroundColor: "rgba(255,255,255,0.04)" }}>
              <h2 className="font-bold mb-4">Order Summary</h2>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between"><span className="text-white/70">Items</span><span>{cart.itemCount}</span></div>
                <div className="flex justify-between"><span className="text-white/70">Subtotal</span><span>{formatBDT(cart.subtotal)}</span></div>
                <div className="border-t border-white/10 pt-2 flex justify-between font-bold text-lg"><span>Total</span><span style={{ color: "#f4b942" }}>{formatBDT(cart.total)}</span></div>
              </div>
              <Link href="/checkout" className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-lg font-bold" style={{ backgroundColor: "#f4b942", color: "#0a0e27" }} data-testid="proceed-checkout">
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-xs text-white/50 mt-3 text-center">Pay via bKash, Nagad, Rocket, Bank, or Binance.</p>
            </aside>
          </div>
        )}
      </main>
      <PageFooter />
    </div>
  );
}
