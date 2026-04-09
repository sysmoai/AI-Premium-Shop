const logoImage = "/images/brand/aips-logo.png";

type LogoVariant = "full-color" | "white" | "black";
type LogoLayout = "vertical" | "horizontal";

interface PrimaryBrandLogoProps {
  variant?: LogoVariant;
  size?: "small" | "medium" | "large" | "xlarge";
  layout?: LogoLayout;
  iconOnly?: boolean;
  className?: string;
}

const GOLD_500 = "#f4b942";
const WHITE_100 = "#FFFFFF";
const BLACK = "#000000";

const glassStyle: React.CSSProperties = {
  textShadow: `
    0 1px 0 rgba(255, 255, 255, 0.6),
    0 2px 4px rgba(0, 0, 0, 0.5),
    0 4px 16px rgba(0, 0, 0, 0.3),
    0 -1px 0 rgba(0, 0, 0, 0.2)
  `,
  WebkitTextStroke: "0.3px rgba(0, 0, 0, 0.15)",
  filter: "drop-shadow(0 2px 8px rgba(0, 0, 0, 0.2))",
};

const horizontalConfig = {
  small:  { icon: 32,  text: "14px", lineHeight: "18px", spacing: 10, wordGap: "0.3em" },
  medium: { icon: 40,  text: "18px", lineHeight: "24px", spacing: 12, wordGap: "0.35em" },
  large:  { icon: 56,  text: "22px", lineHeight: "30px", spacing: 14, wordGap: "0.4em" },
  xlarge: { icon: 72,  text: "28px", lineHeight: "36px", spacing: 16, wordGap: "0.45em" },
};

const verticalConfig = {
  small:  { icon: 64,  text: "12px", lineHeight: "16px", spacing: 10, wordGap: "0.3em" },
  medium: { icon: 96,  text: "16px", lineHeight: "22px", spacing: 12, wordGap: "0.35em" },
  large:  { icon: 128, text: "20px", lineHeight: "28px", spacing: 14, wordGap: "0.4em" },
  xlarge: { icon: 180, text: "26px", lineHeight: "34px", spacing: 18, wordGap: "0.45em" },
};

export function PrimaryBrandLogo({
  variant = "full-color",
  size = "medium",
  layout = "horizontal",
  iconOnly = false,
  className = "",
}: PrimaryBrandLogoProps) {
  const config = layout === "horizontal" ? horizontalConfig[size] : verticalConfig[size];

  const baseTextStyle: React.CSSProperties = {
    fontSize: config.text,
    lineHeight: config.lineHeight,
    fontWeight: 800,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
  };

  const logoImg = (
    <img
      src={logoImage}
      alt="AI Premium Shop"
      style={{ width: config.icon, height: config.icon }}
      className="object-contain flex-shrink-0"
    />
  );

  const textNode = variant === "full-color" ? (
    <div style={{ ...baseTextStyle, display: "flex", gap: config.wordGap, alignItems: "center" }}>
      <span style={{ color: GOLD_500, ...glassStyle }}>AI</span>
      <span style={{ color: WHITE_100, ...glassStyle }}>PREMIUM</span>
      <span style={{ color: GOLD_500, ...glassStyle }}>SHOP</span>
    </div>
  ) : (
    <div style={{
      ...baseTextStyle,
      color: variant === "white" ? WHITE_100 : BLACK,
      whiteSpace: "nowrap",
    }}>
      AI PREMIUM SHOP
    </div>
  );

  if (iconOnly) {
    return (
      <img
        src={logoImage}
        alt="AI Premium Shop"
        style={{ width: config.icon, height: config.icon }}
        className={`object-contain ${className}`}
      />
    );
  }

  if (layout === "horizontal") {
    return (
      <div className={`flex items-center ${className}`} style={{ gap: config.spacing }}>
        {logoImg}
        {textNode}
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {logoImg}
      <div style={{ marginTop: config.spacing }}>{textNode}</div>
    </div>
  );
}
