import { Link } from "wouter";
import { breadcrumbSchema, schemaJson } from "@/utils/schemas";

export interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const schema = breadcrumbSchema(items);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pt-5 pb-1">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaJson(schema) }} />
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-sm">
        {items.map((item, index) => (
          <span key={index} className="flex items-center gap-1">
            {index > 0 && (
              <span style={{ color: "#6b7280" }}>›</span>
            )}
            {item.href && index < items.length - 1 ? (
              <Link href={item.href} className="hover:text-white transition-colors" style={{ color: "#c9ceda" }}>{item.name}</Link>
            ) : (
              <span style={{ color: index === items.length - 1 ? "#e2e8f0" : "#c9ceda" }}>{item.name}</span>
            )}
          </span>
        ))}
      </nav>
    </div>
  );
}
