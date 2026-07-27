import { ShoppingCart } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useGetCart, getGetCartQueryKey } from "@workspace/api-client-react";

export function CartButton() {
  const { data } = useGetCart({ query: { staleTime: 5_000, queryKey: getGetCartQueryKey() } });
  const count = data?.itemCount ?? 0;
  const [location] = useLocation();
  if (location.startsWith("/admin")) return null;
  return (
    <Link
      href="/cart"
      className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 rounded-xl shadow-lg backdrop-blur"
      style={{ backgroundColor: "rgba(244,185,66,0.95)", color: "#0a0e27" }}
      aria-label="Open cart"
      data-testid="cart-button"
    >
      <ShoppingCart className="w-4 h-4" />
      <span className="font-bold text-sm">{count}</span>
    </Link>
  );
}
