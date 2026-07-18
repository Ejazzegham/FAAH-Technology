"use client";

import { useEffect, useState } from "react";
import {
  deleteOrder,
  setOrderStatus,
  subscribeAllOrders,
  type Order,
  type OrderStatus,
} from "@/lib/firestore/orders";

const STATUSES: OrderStatus[] = ["New", "In Progress", "Completed", "Cancelled"];

function statusColor(status: OrderStatus) {
  switch (status) {
    case "Completed":
      return "text-emerald-400 bg-emerald-500/10 border-emerald-500/30";
    case "In Progress":
      return "text-sky-400 bg-sky-500/10 border-sky-500/30";
    case "Cancelled":
      return "text-rose-400 bg-rose-500/10 border-rose-500/30";
    default:
      return "text-amber-400 bg-amber-500/10 border-amber-500/30";
  }
}

export default function AdminOrdersCard() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const unsub = subscribeAllOrders(setOrders);
    return () => unsub?.();
  }, []);

  async function handleDelete(order: Order) {
    if (!confirm(`Delete this order from ${order.customerName}?`)) return;
    try {
      await deleteOrder(order.id);
    } catch {
      alert("Couldn't delete this order. Please try again.");
    }
  }

  return (
    <div className="card !p-6 sm:!p-8" id="manage-orders">
      <h2 className="text-center font-display text-xl font-semibold text-white sm:text-2xl">
        Customer <span className="text-gold">Orders</span>
      </h2>
      <p className="mt-1 text-center text-xs text-muted">
        Orders placed from the Pricing page — customers must sign in before they can order.
      </p>

      {orders.length === 0 ? (
        <p className="py-10 text-center text-sm text-muted">No orders yet.</p>
      ) : (
        <ul className="mt-6 space-y-3">
          {orders.map((o) => (
            <li key={o.id} className="rounded-lg border border-line p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-white">
                    {o.tierName} <span className="font-normal text-muted">· {o.categoryLabel}</span>
                  </p>
                  <p className="mt-0.5 text-xs text-gold">{o.price}</p>
                  <p className="mt-2 text-xs text-muted">
                    {o.customerName} · {o.customerEmail}
                  </p>
                  {o.projectDetails && (
                    <p className="mt-2 max-w-lg text-xs text-muted">{o.projectDetails}</p>
                  )}
                  <p className="mt-2 text-[11px] text-muted">
                    {new Date(o.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-2">
                  <select
                    value={o.status}
                    onChange={(e) => setOrderStatus(o.id, e.target.value as OrderStatus)}
                    className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${statusColor(o.status)}`}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s} className="bg-bg text-white">
                        {s}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleDelete(o)}
                    className="text-[11px] font-semibold text-rose-400 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
