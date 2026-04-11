const BRAND_MAP: Record<string, { bg: string; initial: string }> = {
  chatgpt:    { bg: "#10a37f", initial: "C" },
  claude:     { bg: "#d97706", initial: "C" },
  google:     { bg: "#4285f4", initial: "G" },
  gemini:     { bg: "#4285f4", initial: "G" },
  midjourney: { bg: "#000000", initial: "M" },
  grok:       { bg: "#000000", initial: "X" },
  perplexity: { bg: "#20b2aa", initial: "P" },
  github:     { bg: "#6e40c9", initial: "G" },
  cursor:     { bg: "#111827", initial: "C" },
  elevenlabs: { bg: "#111827", initial: "E" },
  suno:       { bg: "#7c3aed", initial: "S" },
  runway:     { bg: "#111827", initial: "R" },
  notion:     { bg: "#111827", initial: "N" },
  ideogram:   { bg: "#6366f1", initial: "I" },
  heygen:     { bg: "#ec4899", initial: "H" },
  leonardo:   { bg: "#f97316", initial: "L" },
  udio:       { bg: "#7c3aed", initial: "U" },
  replit:     { bg: "#f97316", initial: "R" },
  gamma:      { bg: "#8b5cf6", initial: "G" },
  writesonic: { bg: "#3b82f6", initial: "W" },
  manus:      { bg: "#10a37f", initial: "M" },
  "otter.ai": { bg: "#3b82f6", initial: "O" },
  otter:      { bg: "#3b82f6", initial: "O" },
};

interface BrandIconProps {
  brand: string;
  color?: string;
  size?: number;
  className?: string;
}

export function BrandIcon({ brand, color, size = 32, className = "" }: BrandIconProps) {
  const key = brand.toLowerCase().split(" ")[0];
  const entry = BRAND_MAP[key];
  const bg = entry?.bg ?? color ?? "#151b3d";
  const initial = entry?.initial ?? brand.charAt(0).toUpperCase();

  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontWeight: 700,
        fontSize: Math.round(size * 0.44),
        flexShrink: 0,
        border: "1.5px solid rgba(255,255,255,0.12)",
      }}
      aria-hidden="true"
    >
      {initial}
    </div>
  );
}
