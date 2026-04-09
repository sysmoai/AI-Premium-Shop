import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const paymentMethods = [
  { name: "bKash", color: "#e2136e" },
  { name: "Nagad", color: "#f6921e" },
  { name: "Rocket", color: "#8b2f97" },
  { name: "Bank Transfer", color: "#1a5276" },
  { name: "Binance", color: "#f0b90b" },
];

interface PaymentBadgesProps {
  className?: string;
  label?: string;
}

export function PaymentBadges({ className, label = "We Accept" }: PaymentBadgesProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {label && (
        <span className="text-sm" style={{ color: "#c9ceda" }}>{label}:</span>
      )}
      {paymentMethods.map((method, i) => (
        <motion.div
          key={method.name}
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.05 }}
          viewport={{ once: true }}
          whileHover={{ y: -2 }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold"
          style={{
            borderColor: method.color + "40",
            backgroundColor: method.color + "18",
            color: method.color,
          }}
          title={method.name}
        >
          {method.name}
        </motion.div>
      ))}
    </div>
  );
}
