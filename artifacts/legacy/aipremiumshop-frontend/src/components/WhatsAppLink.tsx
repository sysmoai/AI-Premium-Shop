import { ReactNode, MouseEvent } from "react";

interface WhatsAppLinkProps {
  href: string;
  productName?: string;
  buttonLocation: string;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  "data-testid"?: string;
}

export function WhatsAppLink({
  href,
  productName,
  buttonLocation,
  children,
  className,
  style,
  "data-testid": testId,
}: WhatsAppLinkProps) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
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
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={style}
      data-testid={testId}
    >
      {children}
    </a>
  );
}
