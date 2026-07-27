import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency?: string;
  logo?: string;
  badge?: string;
  popular?: boolean;
}

interface ProductCardProps {
  product: Product;
  className?: string;
  onClick?: () => void;
}

export function ProductCard({ product, className, onClick }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onClick}
      className={cn(
        "card-glass rounded-xl p-6 cursor-pointer relative overflow-hidden",
        "border border-white/10 hover:border-white/20 transition-colors",
        className
      )}
    >
      {product.popular && (
        <span className="absolute top-3 right-3 text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30">
          Popular
        </span>
      )}
      {product.badge && (
        <span className="absolute top-3 left-3 text-xs font-semibold px-2 py-0.5 rounded-full bg-accent/20 text-accent border border-accent/30">
          {product.badge}
        </span>
      )}
      {product.logo && (
        <img
          src={product.logo}
          alt={`${product.name} logo`}
          width={40}
          height={40}
          loading="lazy"
          decoding="async"
          className="w-10 h-10 rounded-lg mb-4 object-contain"
        />
      )}
      <h3 className="font-semibold text-foreground text-lg mb-1">{product.name}</h3>
      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{product.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-primary">
          {product.currency ?? "৳"}{product.price}
        </span>
        <button className="px-4 py-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors text-sm font-medium">
          Buy Now
        </button>
      </div>
    </motion.div>
  );
}
