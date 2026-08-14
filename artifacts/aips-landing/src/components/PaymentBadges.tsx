import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaymentBadgesProps {
  className?: string;
  label?: string;
}

export function PaymentBadges({ className, label }: PaymentBadgesProps) {
  return (
    <div className={cn("inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5", className)}>
      <ShieldCheck className="h-3.5 w-3.5 text-[#f4b942]" />
      <span className="text-xs font-medium text-slate-300">{label || "Payment instructions confirmed per order"}</span>
    </div>
  );
}
