import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAdminMe } from "@workspace/api-client-react";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const [, setLocation] = useLocation();
  const { data, isLoading, isError } = useAdminMe({ query: { retry: false } });
  useEffect(() => {
    if (!isLoading && (isError || !data)) setLocation("/admin/login");
  }, [isLoading, isError, data, setLocation]);
  if (isLoading) return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#0a0e27", color: "#fff" }}>Loading…</div>;
  if (!data) return null;
  return <>{children}</>;
}
