import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingTier {
  name: string;
  price: number;
  currency?: string;
  period?: string;
  description?: string;
  features: string[];
  highlighted?: boolean;
  cta?: string;
  ctaHref?: string;
}

interface PricingTableProps {
  tiers: PricingTier[];
  className?: string;
}

export function PricingTable({ tiers, className }: PricingTableProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
      {tiers.map((tier, i) => (
        <motion.div
          key={tier.name}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          viewport={{ once: true }}
          className={cn(
            "rounded-xl p-6 border relative",
            tier.highlighted
              ? "border-primary/50 bg-primary/5 glow-teal"
              : "card-glass border-white/10"
          )}
        >
          {tier.highlighted && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold px-3 py-1 rounded-full bg-primary text-primary-foreground">
              Most Popular
            </span>
          )}
          <div className="mb-6">
            <h3 className="font-semibold text-foreground text-xl mb-1">{tier.name}</h3>
            {tier.description && (
              <p className="text-muted-foreground text-sm">{tier.description}</p>
            )}
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-bold text-foreground">
                {tier.currency ?? "৳"}{tier.price}
              </span>
              {tier.period && (
                <span className="text-muted-foreground text-sm">/{tier.period}</span>
              )}
            </div>
          </div>
          <ul className="space-y-3 mb-8">
            {tier.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm">
                <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
          <a
            href={tier.ctaHref ?? "https://wa.me/8801865385348"}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "block text-center py-2.5 rounded-lg font-semibold transition-colors text-sm",
              tier.highlighted
                ? "bg-primary text-primary-foreground hover:opacity-90"
                : "border border-white/20 text-foreground hover:border-white/40 hover:bg-white/5"
            )}
          >
            {tier.cta ?? "Get Started"}
          </a>
        </motion.div>
      ))}
    </div>
  );
}
