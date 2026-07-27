"use client";

import { MessageCircle } from "lucide-react";

const whatsappNumber = process.env.NEXT_PUBLIC_WA_PRIMARY ?? "8801865385348";
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  "Hi AI Premium Shop, I want to order a premium subscription."
)}`;

export function StickyWhatsApp() {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 items-center gap-2.5 rounded-full bg-gradient-to-r from-[#25d366] to-[#128c7e] pl-4 pr-5 text-[0.8125rem] font-bold text-white shadow-2xl shadow-[#25d366]/25 transition-all duration-300 hover:scale-105 hover:shadow-[#25d366]/40"
      aria-label="Chat on WhatsApp"
    >
      <span className="relative flex size-5 items-center justify-center">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#25d366] opacity-40" />
        <MessageCircle className="relative size-4 fill-white" />
      </span>
      <span className="hidden sm:inline">Order Now</span>
    </a>
  );
}
