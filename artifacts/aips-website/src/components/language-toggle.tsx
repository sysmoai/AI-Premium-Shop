"use client";

import { useRouter, usePathname } from "next/navigation";
import { Globe } from "lucide-react";

export function LanguageToggle() {
  const router = useRouter();
  const pathname = usePathname();

  const isEnglish = !pathname.includes("/bn/");

  const handleToggle = () => {
    const newPathname = isEnglish
      ? pathname.replace(/^\//, "/bn/")
      : pathname.replace(/^\/bn\//, "/");

    router.push(newPathname);
  };

  return (
    <button
      onClick={handleToggle}
      className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-[#8a91a8] hover:bg-white/[0.08] transition"
      aria-label={`Switch to ${isEnglish ? "Bengali" : "English"}`}
      title={`Switch to ${isEnglish ? "Bengali" : "English"}`}
    >
      <Globe className="size-3.5" />
      {isEnglish ? "EN" : "বাংলা"}
    </button>
  );
}
