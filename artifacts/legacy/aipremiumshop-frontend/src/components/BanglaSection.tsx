import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BanglaSectionProps {
  title?: string;
  body?: string;
  className?: string;
  children?: React.ReactNode;
}

export function BanglaSection({
  title,
  body,
  className,
  children,
}: BanglaSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn("font-bangla text-right", className)}
    >
      {title && (
        <h2 className="text-2xl font-bold text-foreground mb-3">{title}</h2>
      )}
      {body && (
        <p className="text-muted-foreground leading-relaxed">{body}</p>
      )}
      {children}
    </motion.div>
  );
}
