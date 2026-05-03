import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useListProducts,
  useAdminCreateProduct,
  useAdminUpdateProduct,
  useAdminDeleteProduct,
  getListProductsQueryKey,
  type Product,
} from "@workspace/api-client-react";
import { AdminLayout } from "./AdminLayout";
import { AdminGuard } from "./AdminGuard";
import { formatBDT } from "@/lib/format";
import { Pencil, Trash2, Plus } from "lucide-react";

export default function AdminProducts() {
  return (
    <AdminGuard>
      <AdminLayout title="Products">
        <Inner />
      </AdminLayout>
    </AdminGuard>
  );
}

function emptyProduct(): Partial<Product> {
  return {
    externalId: "",
    slug: "",
    name: "",
    brand: "",
    brandSlug: "",
    category: "ai-assistant",
    price: 0,
    description: "",
    capabilities: [],
    accessType: "shared",
    featured: false,
    status: "Active",
    stock: 999,
  };
}

function Inner() {
  const qc = useQueryClient();
  const { data, isLoading } = useListProducts({ limit: 200 });
  const [editing, setEditing] = useState<Partial<Product> | null>(null);

  const invalidate = () => qc.invalidateQueries({ queryKey: getListProductsQueryKey() });

  const create = useAdminCreateProduct({ mutation: { onSuccess: () => { invalidate(); setEditing(null); } } });
  const update = useAdminUpdateProduct({ mutation: { onSuccess: () => { invalidate(); setEditing(null); } } });
  const remove = useAdminDeleteProduct({ mutation: { onSuccess: () => invalidate() } });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-white/60">{data?.total ?? 0} products</p>
        <button onClick={() => setEditing(emptyProduct())} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg font-bold text-sm" style={{ backgroundColor: "#f4b942", color: "#0a0e27" }} data-testid="new-product">
          <Plus className="w-4 h-4" /> New Product
        </button>
      </div>

      {isLoading ? (
        <p className="text-white/70">Loading…</p>
      ) : (
        <div className="rounded-xl border border-white/10 overflow-x-auto" style={{ backgroundColor: "rgba(255,255,255,0.03)" }}>
          <table className="w-full text-sm">
            <thead className="text-left text-white/60">
              <tr>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Brand</th>
                <th className="px-3 py-2">Category</th>
                <th className="px-3 py-2">Price</th>
                <th className="px-3 py-2">Featured</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {data?.items.map((p) => (
                <tr key={p.id} className="border-t border-white/5">
                  <td className="px-3 py-2 max-w-xs truncate">{p.name}</td>
                  <td className="px-3 py-2">{p.brand}</td>
                  <td className="px-3 py-2">{p.category}</td>
                  <td className="px-3 py-2">{formatBDT(p.price)}</td>
                  <td className="px-3 py-2">{p.featured ? "✓" : ""}</td>
                  <td className="px-3 py-2">{p.status}</td>
                  <td className="px-3 py-2 flex gap-2">
                    <button onClick={() => setEditing(p)} className="text-blue-400 hover:underline"><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => { if (confirm(`Delete ${p.name}?`)) remove.mutate({ id: p.id }); }} className="text-red-400 hover:underline"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <ProductEditor
          initial={editing}
          onCancel={() => setEditing(null)}
          onSave={(form) => {
            const payload = {
              externalId: form.externalId!,
              slug: form.slug!,
              name: form.name!,
              brand: form.brand!,
              brandSlug: form.brandSlug!,
              category: form.category!,
              price: Number(form.price),
              description: form.description!,
              capabilities: form.capabilities ?? [],
              accessType: form.accessType ?? "shared",
              featured: Boolean(form.featured),
              status: form.status ?? "Active",
              stock: Number(form.stock ?? 999),
              tier: form.tier ?? null,
              brandColor: form.brandColor ?? null,
              provider: form.provider ?? null,
              badge: form.badge ?? null,
              deliverySla: form.deliverySla ?? null,
              whatsappMsg: form.whatsappMsg ?? null,
              officialUsd: form.officialUsd ?? null,
            };
            if (form.id) update.mutate({ id: form.id, data: payload });
            else create.mutate({ data: payload });
          }}
          saving={create.isPending || update.isPending}
        />
      )}
    </div>
  );
}

function ProductEditor({ initial, onCancel, onSave, saving }: { initial: Partial<Product>; onCancel: () => void; onSave: (p: Partial<Product>) => void; saving: boolean }) {
  const [form, setForm] = useState<Partial<Product>>(initial);
  const set = <K extends keyof Product>(k: K, v: Product[K] | null) => setForm((f) => ({ ...f, [k]: v as Product[K] }));
  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={onCancel}>
      <div className="bg-[#0a0e27] border border-white/15 rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <h3 className="font-bold text-lg mb-4">{form.id ? "Edit Product" : "New Product"}</h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <Inp label="External ID" value={form.externalId ?? ""} onChange={(v) => set("externalId", v)} />
          <Inp label="Slug" value={form.slug ?? ""} onChange={(v) => set("slug", v)} />
          <Inp label="Name" value={form.name ?? ""} onChange={(v) => set("name", v)} className="col-span-2" />
          <Inp label="Brand" value={form.brand ?? ""} onChange={(v) => set("brand", v)} />
          <Inp label="Brand Slug" value={form.brandSlug ?? ""} onChange={(v) => set("brandSlug", v)} />
          <Inp label="Category" value={form.category ?? ""} onChange={(v) => set("category", v)} />
          <Inp label="Price (BDT)" type="number" value={String(form.price ?? 0)} onChange={(v) => set("price", Number(v))} />
          <Inp label="Tier" value={form.tier ?? ""} onChange={(v) => set("tier", v || null)} />
          <Inp label="Access Type" value={form.accessType ?? "shared"} onChange={(v) => set("accessType", v)} />
          <Inp label="Brand Color" value={form.brandColor ?? ""} onChange={(v) => set("brandColor", v || null)} />
          <Inp label="Badge" value={form.badge ?? ""} onChange={(v) => set("badge", v || null)} />
          <Inp label="Stock" type="number" value={String(form.stock ?? 999)} onChange={(v) => set("stock", Number(v))} />
          <label className="col-span-2"><span className="block text-xs text-white/70 mb-1">Description</span>
            <textarea rows={3} value={form.description ?? ""} onChange={(e) => set("description", e.target.value)} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/15" />
          </label>
          <label className="flex items-center gap-2 col-span-2">
            <input type="checkbox" checked={Boolean(form.featured)} onChange={(e) => set("featured", e.target.checked)} />
            <span className="text-sm">Featured on homepage</span>
          </label>
        </div>
        <div className="flex gap-2 mt-6 justify-end">
          <button onClick={onCancel} className="px-4 py-2 rounded-lg bg-white/5 border border-white/15">Cancel</button>
          <button disabled={saving} onClick={() => onSave(form)} className="px-4 py-2 rounded-lg font-bold disabled:opacity-60" style={{ backgroundColor: "#f4b942", color: "#0a0e27" }} data-testid="save-product">
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Inp({ label, value, onChange, type = "text", className = "" }: { label: string; value: string; onChange: (v: string) => void; type?: string; className?: string }) {
  return (
    <label className={className}>
      <span className="block text-xs text-white/70 mb-1">{label}</span>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/15" />
    </label>
  );
}
