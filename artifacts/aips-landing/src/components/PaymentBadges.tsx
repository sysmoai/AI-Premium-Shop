import { motion } from "framer-motion";
import { useT } from "@/lib/locale";
import { cn } from "@/lib/utils";

// text picked per-bg so it clears WCAG AA (4.5:1) — white fails on #f6921e
// (2.32:1); #1a1a1a passes at 7.50:1.
// Binance (crypto) removed pending written Bangladesh legal/compliance review
// of the exact transaction flow — see docs/homepage/executive-audit.md F2.
const paymentMethods = [
  { name: "bKash", bg: "#e2136e", text: "#fff" },
  { name: "Nagad", bg: "#f6921e", text: "#1a1a1a" },
  { name: "Rocket", bg: "#8b2f97", text: "#fff" },
  { name: "Bank Transfer", bg: "#1a5276", text: "#fff" },
];

interface PaymentBadgesProps {
  className?: string;
  label?: string;
}

export function PaymentBadges({ className, label }: PaymentBadgesProps) {
  const t = useT();
  // Default follows the route locale; an explicit prop still wins.
  const resolved = label ?? t("We Accept", "পেমেন্ট নেওয়া হয়");
  return (
    <div className={cn("flex flex-wrap items-center gap-2.5", className)}>
      {resolved && (
        <span className="text-sm" style={{ color: "#c9ceda" }}>{resolved}:</span>
      )}
      {paymentMethods.map((method, i) => (
        <motion.div
          key={method.name}
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.05 }}
          viewport={{ once: true }}
          whileHover={{ y: -2, scale: 1.04 }}
          className="px-2.5 py-1 rounded-full text-xs font-semibold"
          style={{
            backgroundColor: method.bg,
            color: method.text,
          }}
          title={method.name}
        >
          {method.name}
        </motion.div>
      ))}
    </div>
  );
}
