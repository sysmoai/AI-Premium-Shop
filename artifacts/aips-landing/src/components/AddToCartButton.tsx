import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import {
  useAddToCart,
  getGetCartQueryKey,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";

export function AddToCartButton({
  productId,
  className,
  label = "Add to Cart",
}: {
  productId: number;
  className?: string;
  label?: string;
}) {
  const qc = useQueryClient();
  const [done, setDone] = useState(false);
  const { mutate, isPending } = useAddToCart({
    mutation: {
      onSuccess: (cart) => {
        qc.setQueryData(getGetCartQueryKey(), cart);
        setDone(true);
        setTimeout(() => setDone(false), 1500);
      },
    },
  });

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => mutate({ data: { productId, quantity: 1 } })}
      className={
        className ??
        "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-opacity disabled:opacity-60"
      }
      style={{ backgroundColor: "#f4b942", color: "#0a0e27" }}
      data-testid={`add-to-cart-${productId}`}
    >
      {done ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
      {done ? "Added" : isPending ? "Adding…" : label}
    </button>
  );
}
