import { MessageCircle, Users, Bell, Facebook, Instagram, Linkedin } from "lucide-react";

interface CommunitySocialCardsProps {
  cols?: "2" | "3";
}

const SOCIAL_CARDS = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    desc: "Order in 2 minutes. Get support in under 5 min. The fastest way to buy AI tools.",
    badge: "PRIMARY",
    badgeClass: "bg-[#25D366] text-white",
    cta: "Message Us →",
    ctaColor: "text-[#25D366]",
    href: "https://wa.me/8801865385348",
    bg: "bg-[#25D366]/10 border border-[#25D366]/30 hover:border-[#25D366]/60",
    iconColor: "text-[#25D366]",
  },
  {
    icon: Users,
    label: "WhatsApp Community",
    desc: "Join 1,200+ members. Get exclusive deals, renewal reminders, and AI tips from other users.",
    badge: "FREE TO JOIN",
    badgeClass: "bg-gray-800 text-gray-300",
    cta: "Join Community →",
    ctaColor: "text-[#25D366]",
    href: "https://chat.whatsapp.com/LKHNCYz05MrA0j6uX272Zc",
    bg: "bg-[#25D366]/5 border border-[#25D366]/20 hover:border-[#25D366]/40",
    iconColor: "text-[#25D366]",
  },
  {
    icon: Bell,
    label: "WhatsApp Channel",
    desc: "Follow for instant updates on new tools, price drops, and limited offers. No spam — updates only.",
    badge: "UPDATES",
    badgeClass: "bg-gray-800 text-gray-300",
    cta: "Follow Channel →",
    ctaColor: "text-[#25D366]",
    href: "https://whatsapp.com/channel/0029VatCUtC72WTpSObAQF3O",
    bg: "bg-[#25D366]/5 border border-[#25D366]/20 hover:border-[#25D366]/40",
    iconColor: "text-[#25D366]",
  },
  {
    icon: Facebook,
    label: "Facebook",
    desc: "Daily AI tips, offer announcements, tutorials, and customer success stories. Like our page!",
    badge: "DAILY TIPS",
    badgeClass: "bg-[#1877F2]/20 text-[#1877F2]",
    cta: "Follow on Facebook →",
    ctaColor: "text-[#1877F2]",
    href: "https://www.facebook.com/aipremiumshopbd",
    bg: "bg-[#1877F2]/10 border border-[#1877F2]/30 hover:border-[#1877F2]/60",
    iconColor: "text-[#1877F2]",
  },
  {
    icon: Instagram,
    label: "Instagram",
    desc: "Reels, stories, and visual guides on AI tools. Plan comparisons, pricing cards, and behind-the-scenes.",
    badge: "REELS & STORIES",
    badgeClass: "bg-[#E4405F]/20 text-[#E4405F]",
    cta: "Follow on Instagram →",
    ctaColor: "text-[#E4405F]",
    href: "https://www.instagram.com/aipremiumshop/",
    bg: "bg-[#E4405F]/10 border border-[#E4405F]/30 hover:border-[#E4405F]/60",
    iconColor: "text-[#E4405F]",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    desc: "Professional AI insights for agencies, teams, and businesses. B2B offers and enterprise solutions.",
    badge: "B2B & TEAMS",
    badgeClass: "bg-[#0A66C2]/20 text-[#0A66C2]",
    cta: "Follow on LinkedIn →",
    ctaColor: "text-[#0A66C2]",
    href: "https://www.linkedin.com/showcase/aipremiumshop/",
    bg: "bg-[#0A66C2]/10 border border-[#0A66C2]/30 hover:border-[#0A66C2]/60",
    iconColor: "text-[#0A66C2]",
  },
];

export function CommunitySocialCards({ cols = "3" }: CommunitySocialCardsProps) {
  const gridClass =
    cols === "2" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-2 md:grid-cols-3";

  return (
    <div className={`grid ${gridClass} gap-4`}>
      {SOCIAL_CARDS.map((card) => {
        const Icon = card.icon;
        return (
          <a
            key={card.label}
            href={card.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`group rounded-xl p-5 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${card.bg}`}
          >
            <Icon className={`w-8 h-8 ${card.iconColor}`} />
            <h3 className="text-white font-bold text-lg mt-3">{card.label}</h3>
            <p className="text-gray-400 text-sm mt-1">{card.desc}</p>
            <span
              className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mt-3 ${card.badgeClass}`}
            >
              {card.badge}
            </span>
            <div className={`font-semibold text-sm mt-2 group-hover:underline ${card.ctaColor}`}>
              {card.cta}
            </div>
          </a>
        );
      })}
    </div>
  );
}
