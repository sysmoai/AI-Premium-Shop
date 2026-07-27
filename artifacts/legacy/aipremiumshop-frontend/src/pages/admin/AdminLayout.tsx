import { Link, useLocation } from "wouter";
import { LayoutDashboard, Package, ShoppingBag, LogOut } from "lucide-react";
import { useAdminLogout } from "@workspace/api-client-react";

export function AdminLayout({ children, title }: { children: React.ReactNode; title: string }) {
  const [location, setLocation] = useLocation();
  const logout = useAdminLogout({
    mutation: {
      onSuccess: () => setLocation("/admin/login"),
    },
  });
  const nav = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
    { href: "/admin/products", label: "Products", icon: Package },
  ];
  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#0a0e27", color: "#fff" }}>
      <aside className="w-56 border-r border-white/10 p-4 hidden md:flex flex-col">
        <div className="text-xl font-bold mb-8" style={{ color: "#f4b942" }}>AIPS Admin</div>
        <nav className="space-y-1 flex-1">
          {nav.map((n) => {
            const active = location === n.href;
            const Icon = n.icon;
            return (
              <Link key={n.href} href={n.href} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${active ? "bg-amber-400/15 text-amber-400" : "text-white/70 hover:text-white hover:bg-white/5"}`} data-testid={`admin-nav-${n.label.toLowerCase()}`}>
                <Icon className="w-4 h-4" />
                {n.label}
              </Link>
            );
          })}
        </nav>
        <button onClick={() => logout.mutate()} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5" data-testid="admin-logout">
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </aside>
      <main className="flex-1 min-w-0">
        <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">{title}</h1>
          <Link href="/" className="text-sm text-white/60 hover:text-white">View site</Link>
        </header>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
