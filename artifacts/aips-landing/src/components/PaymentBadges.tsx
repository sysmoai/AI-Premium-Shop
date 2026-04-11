import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const paymentMethods = [
  { name: "bKash", bg: "#e2136e", text: "#fff" },
  { name: "Nagad", bg: "#f6921e", text: "#fff" },
  { name: "Rocket", bg: "#8b2f97", text: "#fff" },
  { name: "Bank Transfer", bg: "#1a5276", text: "#fff" },
  { name: "Binance", bg: "#f0b90b", text: "#1a1a1a" },
];

interface PaymentBadgesProps {
  className?: string;
  label?: string;
}

export function PaymentBadges({ className, label = "We Accept" }: PaymentBadgesProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2.5", className)}>
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
