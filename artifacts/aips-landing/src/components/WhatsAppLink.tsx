import { ReactNode, MouseEvent } from "react";

interface WhatsAppLinkProps {
  href: string;
  productName?: string;
  buttonLocation: string;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  "aria-label"?: string;
  "data-testid"?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  onMouseEnter?: (event: MouseEvent<HTMLAnchorElement>) => void;
  onMouseLeave?: (event: MouseEvent<HTMLAnchorElement>) => void;
}

export function WhatsAppLink({
  href,
  productName,
  buttonLocation,
  children,
  className,
  style,
  "aria-label": ariaLabel,
  "data-testid": testId,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: WhatsAppLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (typeof window.gtag === "function") {
      window.gtag("event", "whatsapp_click", {
        product_name: productName ?? "unknown",
        page_path: window.location.pathname,
        button_location: buttonLocation,
      });
    }
    if (typeof window.fbq === "function") {
      window.fbq("track", "Lead", {
        content_name: productName ?? buttonLocation,
      });
    }
    onClick?.(event);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={style}
      aria-label={ariaLabel}
      data-testid={testId}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </a>
  );
}
