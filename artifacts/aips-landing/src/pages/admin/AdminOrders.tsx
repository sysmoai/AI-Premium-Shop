import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useAdminListOrders,
  useAdminUpdateOrder,
  getAdminListOrdersQueryKey,
  getAdminStatsQueryKey,
  type Order,
} from "@workspace/api-client-react";
import { AdminLayout } from "./AdminLayout";
import { AdminGuard } from "./AdminGuard";
import { formatBDT } from "@/lib/format";

const STATUSES = ["pending", "paid", "completed", "cancelled"];

export default function AdminOrders() {
  return (
    <AdminGuard>
      <AdminLayout title="Orders">
        <Inner />
      </AdminLayout>
    </AdminGuard>
  );
}

function Inner() {
  const [statusFilter, setStatusFilter] = useState<string>("");
  const { data, isLoading } = useAdminListOrders(
    statusFilter ? { status: statusFilter } : {},
  );
  const qc = useQueryClient();
  const update = useAdminUpdateOrder({
    mutation: {
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: getAdminListOrdersQueryKey() });
        qc.invalidateQueries({ queryKey: getAdminStatsQueryKey() });
      },
    },
  });
  const [open, setOpen] = useState<Order | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-white/60">Filter:</span>
        <button onClick={() => setStatusFilter("")} className={`px-3 py-1 rounded-full text-xs ${!statusFilter ? "bg-amber-400 text-[#0a0e27] font-bold" : "bg-white/5 border border-white/15"}`} data-testid="filter-all">All</button>
        {STATUSES.map((s) => (
          <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-1 rounded-full text-xs ${statusFilter === s ? "bg-amber-400 text-[#0a0e27] font-bold" : "bg-white/5 border border-white/15"}`} data-testid={`filter-${s}`}>
            {s}
          </button>
        ))}
      </div>

      {isLoading ? (
        <p className="text-white/70">Loading…</p>
      ) : (
        <div className="rounded-xl border border-white/10 overflow-x-auto" style={{ backgroundColor: "rgba(255,255,255,0.03)" }}>
          <table className="w-full text-sm">
            <thead className="text-left text-white/60">
              <tr>
                <th className="px-3 py-2">Order #</th>
                <th className="px-3 py-2">Customer</th>
                <th className="px-3 py-2">Phone</th>
                <th className="px-3 py-2">Total</th>
                <th className="px-3 py-2">Payment</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Placed</th>
                <th className="px-3 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {data?.items.length === 0 && (
                <tr><td colSpan={8} className="px-3 py-6 text-center text-white/50">No orders</td></tr>
              )}
              {data?.items.map((o) => (
                <tr key={o.id} className="border-t border-white/5" data-testid={`order-row-${o.id}`}>
                  <td className="px-3 py-2 font-mono text-xs">{o.orderNumber}</td>
                  <td className="px-3 py-2">{o.customerName}</td>
                  <td className="px-3 py-2">{o.customerPhone}</td>
                  <td className="px-3 py-2">{formatBDT(o.total)}</td>
                  <td className="px-3 py-2">{o.paymentMethod}</td>
                  <td className="px-3 py-2">
                    <select
                      value={o.status}
                      onChange={(e) => update.mutate({ id: o.id, data: { status: e.target.value } })}
                      className="bg-white/5 border border-white/15 rounded px-2 py-1 text-xs"
                      data-testid={`status-${o.id}`}
                    >
                      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="px-3 py-2 text-white/60 text-xs">{new Date(o.createdAt).toLocaleString()}</td>
                  <td className="px-3 py-2"><button onClick={() => setOpen(o)} className="text-amber-400 text-xs hover:underline">View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={() => setOpen(null)}>
          <div className="bg-[#0a0e27] border border-white/15 rounded-2xl max-w-lg w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-lg">{open.orderNumber}</h3>
                <p className="text-xs text-white/60">{new Date(open.createdAt).toLocaleString()}</p>
              </div>
              <button onClick={() => setOpen(null)} className="text-white/50 hover:text-white">✕</button>
            </div>
            <div className="space-y-1 text-sm mb-4">
              <p><span className="text-white/60">Customer:</span> {open.customerName}</p>
              <p><span className="text-white/60">Phone:</span> {open.customerPhone}</p>
              <p><span className="text-white/60">Email:</span> {open.customerEmail}</p>
              <p><span className="text-white/60">Payment:</span> {open.paymentMethod}{open.paymentReference ? ` · ${open.paymentReference}` : ""}</p>
              {open.notes && <p><span className="text-white/60">Notes:</span> {open.notes}</p>}
            </div>
            <ul className="space-y-1 text-sm border-t border-white/10 pt-3">
              {open.items.map((i) => (
                <li key={i.id} className="flex justify-between"><span>{i.productName} × {i.quantity}</span><span>{formatBDT(i.lineTotal)}</span></li>
              ))}
              <li className="flex justify-between font-bold border-t border-white/10 pt-2"><span>Total</span><span style={{ color: "#f4b942" }}>{formatBDT(open.total)}</span></li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
