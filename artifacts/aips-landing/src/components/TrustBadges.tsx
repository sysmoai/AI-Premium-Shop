import { motion } from "framer-motion";
import { Shield, Clock, Users, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrustBadge {
  icon: React.ReactNode;
  label: string;
  value?: string;
}

const defaultBadges: TrustBadge[] = [
  { icon: <Users className="w-5 h-5" />, label: "Customers Served", value: "1,200+" },
  { icon: <Calendar className="w-5 h-5" />, label: "Established", value: "Since 2022" },
  { icon: <Shield className="w-5 h-5" />, label: "Warranty", value: "30 Days" },
  { icon: <Clock className="w-5 h-5" />, label: "Response Time", value: "< 5 Min" },
];

interface TrustBadgesProps {
  badges?: TrustBadge[];
  className?: string;
}

export function TrustBadges({ badges = defaultBadges, className }: TrustBadgesProps) {
  return (
    <div className={cn("flex flex-wrap justify-center gap-4", className)}>
      {badges.map((badge, i) => (
        <motion.div
          key={badge.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10"
          style={{ backgroundColor: "rgba(255,255,255,0.04)", color: "#c9ceda" }}
        >
          <span style={{ color: "#f4b942" }}>{badge.icon}</span>
          {badge.value && (
            <span className="font-bold text-white text-sm">{badge.value}</span>
          )}
          <span className="text-sm">{badge.label}</span>
        </motion.div>
      ))}
    </div>
  );
}
