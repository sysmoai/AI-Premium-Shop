import { useAdminStats } from "@workspace/api-client-react";
import { AdminLayout } from "./AdminLayout";
import { AdminGuard } from "./AdminGuard";
import { formatBDT } from "@/lib/format";
import { Link } from "wouter";

export default function AdminDashboard() {
  return (
    <AdminGuard>
      <AdminLayout title="Dashboard">
        <DashboardInner />
      </AdminLayout>
    </AdminGuard>
  );
}

function DashboardInner() {
  const { data, isLoading } = useAdminStats();
  if (isLoading || !data) return <p className="text-white/70">Loading…</p>;
  const cards = [
    { label: "Total Orders", value: data.totalOrders.toString(), color: "#60a5fa" },
    { label: "Pending", value: data.pendingOrders.toString(), color: "#f4b942" },
    { label: "Completed", value: data.completedOrders.toString(), color: "#4ade80" },
    { label: "Revenue (completed)", value: formatBDT(data.totalRevenue), color: "#f4b942" },
    { label: "Products", value: data.totalProducts.toString(), color: "#a78bfa" },
  ];
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {cards.map((c) => (
          <div key={c.label} className="rounded-xl border border-white/10 p-4" style={{ backgroundColor: "rgba(255,255,255,0.03)" }}>
            <div className="text-xs text-white/60">{c.label}</div>
            <div className="text-2xl font-bold mt-1" style={{ color: c.color }}>{c.value}</div>
          </div>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold">Recent Orders</h2>
          <Link href="/admin/orders" className="text-sm text-amber-400 hover:underline">View all →</Link>
        </div>
        <div className="rounded-xl border border-white/10 overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.03)" }}>
          <table className="w-full text-sm">
            <thead className="text-left text-white/60">
              <tr>
                <th className="px-3 py-2">Order #</th>
                <th className="px-3 py-2">Customer</th>
                <th className="px-3 py-2">Total</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Placed</th>
              </tr>
            </thead>
            <tbody>
              {data.recentOrders.length === 0 && (
                <tr><td colSpan={5} className="px-3 py-6 text-center text-white/50">No orders yet</td></tr>
              )}
              {data.recentOrders.map((o) => (
                <tr key={o.id} className="border-t border-white/5">
                  <td className="px-3 py-2 font-mono text-xs">{o.orderNumber}</td>
                  <td className="px-3 py-2">{o.customerName}</td>
                  <td className="px-3 py-2">{formatBDT(o.total)}</td>
                  <td className="px-3 py-2">{o.status}</td>
                  <td className="px-3 py-2 text-white/60 text-xs">{new Date(o.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
