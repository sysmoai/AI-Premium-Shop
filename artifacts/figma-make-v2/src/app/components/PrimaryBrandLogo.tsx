import iconImage from 'figma:asset/b8641b56d622f5c3b1323cb0c2946972ad0e7283.png';

type LogoVariant = 'full-color' | 'white' | 'black';
type LogoLayout = 'vertical' | 'horizontal';

interface PrimaryBrandLogoProps {
  variant?: LogoVariant;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  layout?: LogoLayout;
  iconOnly?: boolean;
}

export function PrimaryBrandLogo({ 
  variant = 'full-color', 
  size = 'medium',
  layout = 'vertical',
  iconOnly = false 
}: PrimaryBrandLogoProps) {
  // BRAND COLORS
  const GOLD_500 = '#f4b942';
  const WHITE_100 = '#FFFFFF';
  const BLACK = '#000000';

  // Size configurations - Larger icon, text in one line
  const verticalConfig = {
    small: {
      icon: 96,
      text: '14px',
      lineHeight: '18px',
      spacing: 16,
      wordGap: '0.35em',
    },
    medium: {
      icon: 160,
      text: '22px',
      lineHeight: '28px',
      spacing: 20,
      wordGap: '0.4em',
    },
    large: {
      icon: 220,
      text: '30px',
      lineHeight: '38px',
      spacing: 24,
      wordGap: '0.45em',
    },
    xlarge: {
      icon: 280,
      text: '38px',
      lineHeight: '48px',
      spacing: 28,
      wordGap: '0.5em',
    },
  };

  const horizontalConfig = {
    small: {
      icon: 60,
      text: '14px',
      lineHeight: '18px',
      spacing: 16,
      wordGap: '0.35em',
    },
    medium: {
      icon: 80,
      text: '20px',
      lineHeight: '26px',
      spacing: 20,
      wordGap: '0.4em',
    },
    large: {
      icon: 100,
      text: '26px',
      lineHeight: '34px',
      spacing: 24,
      wordGap: '0.45em',
    },
    xlarge: {
      icon: 140,
      text: '34px',
      lineHeight: '44px',
      spacing: 28,
      wordGap: '0.5em',
    },
  };

  const config = layout === 'vertical' ? verticalConfig[size] : horizontalConfig[size];

  // Premium Liquid Glass Effect
  const glassStyle = {
    textShadow: `
      0 1px 0 rgba(255, 255, 255, 0.6),
      0 2px 4px rgba(0, 0, 0, 0.5),
      0 4px 16px rgba(0, 0, 0, 0.3),
      0 -1px 0 rgba(0, 0, 0, 0.2)
    `,
    WebkitTextStroke: '0.3px rgba(0, 0, 0, 0.15)',
    filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.2))',
  };

  if (iconOnly) {
    return (
      <img
        src={iconImage}
        alt="AI Premium Shop"
        style={{
          width: `${config.icon}px`,
          height: `${config.icon}px`,
        }}
        className="object-contain"
      />
    );
  }

  const baseTextStyle = {
    fontSize: config.text,
    lineHeight: config.lineHeight,
    fontWeight: 800,
    letterSpacing: '0.06em',
    textTransform: 'uppercase' as const,
  };

  if (layout === 'horizontal') {
    return (
      <div className="flex items-center justify-center" style={{ gap: `${config.spacing}px` }}>
        <img
          src={iconImage}
          alt="AI Premium Shop Logo"
          style={{
            width: `${config.icon}px`,
            height: `${config.icon}px`,
          }}
          className="object-contain flex-shrink-0"
        />

        {variant === 'full-color' ? (
          <div style={{ ...baseTextStyle, display: 'flex', gap: config.wordGap, alignItems: 'center' }}>
            <span style={{ color: GOLD_500, ...glassStyle }}>AI</span>
            <span style={{ color: WHITE_100, ...glassStyle }}>PREMIUM</span>
            <span style={{ color: GOLD_500, ...glassStyle }}>SHOP</span>
          </div>
        ) : (
          <div style={{ 
            ...baseTextStyle, 
            color: variant === 'white' ? WHITE_100 : BLACK,
            textShadow: variant === 'white' ? '0 2px 20px rgba(255, 255, 255, 0.3)' : '0 1px 2px rgba(0, 0, 0, 0.2)'
          }}>
            AI PREMIUM SHOP
          </div>
        )}
      </div>
    );
  }

  // Vertical layout - Text in ONE LINE below icon
  return (
    <div className="flex flex-col items-center justify-center">
      <img
        src={iconImage}
        alt="AI Premium Shop Logo"
        style={{
          width: `${config.icon}px`,
          height: `${config.icon}px`,
        }}
        className="object-contain"
      />

      <div style={{ marginTop: `${config.spacing}px` }}>
        {variant === 'full-color' ? (
          <div style={{ 
            ...baseTextStyle, 
            display: 'flex', 
            gap: config.wordGap, 
            alignItems: 'center',
            justifyContent: 'center',
            whiteSpace: 'nowrap'
          }}>
            <span style={{ color: GOLD_500, ...glassStyle }}>AI</span>
            <span style={{ color: WHITE_100, ...glassStyle }}>PREMIUM</span>
            <span style={{ color: GOLD_500, ...glassStyle }}>SHOP</span>
          </div>
        ) : (
          <div
            style={{
              ...baseTextStyle,
              textAlign: 'center',
              color: variant === 'white' ? WHITE_100 : BLACK,
              textShadow: variant === 'white' ? '0 2px 20px rgba(255, 255, 255, 0.3)' : '0 1px 2px rgba(0, 0, 0, 0.2)',
              whiteSpace: 'nowrap'
            }}
          >
            AI PREMIUM SHOP
          </div>
        )}
      </div>
    </div>
  );
}