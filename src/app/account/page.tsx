"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signOut } from "firebase/auth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getFirebaseAuth } from "@/lib/firebase";
import { useCustomerAuth } from "@/lib/use-customer-auth";
import { subscribeMyOrders, type Order } from "@/lib/firestore/orders";

function statusColor(status: Order["status"]) {
  switch (status) {
    case "Completed":
      return "text-emerald-400 bg-emerald-500/10";
    case "In Progress":
      return "text-sky-400 bg-sky-500/10";
    case "Cancelled":
      return "text-rose-400 bg-rose-500/10";
    default:
      return "text-amber-400 bg-amber-500/10";
  }
}

function OrdersView() {
  const { user } = useCustomerAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!user) return;
    const unsub = subscribeMyOrders(user.uid, setOrders);
    return () => unsub?.();
  }, [user]);

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rgb-box flex items-center justify-between rounded-xl p-6">
        <div>
          <p className="text-sm font-semibold text-ink">{user?.displayName || user?.email}</p>
          <p className="text-xs text-muted">{user?.email}</p>
        </div>
        <button onClick={() => signOut(getFirebaseAuth())} className="btn-outline text-xs">
          Sign Out
        </button>
      </div>

      <h2 className="mt-8 font-display text-lg font-semibold text-ink">Your Orders</h2>
      {orders.length === 0 ? (
        <p className="mt-3 text-sm text-muted">
          No orders yet.{" "}
          <Link href="/pricing" className="text-gold hover:underline">
            Browse packages
          </Link>{" "}
          to place your first one.
        </p>
      ) : (
        <ul className="mt-4 space-y-3">
          {orders.map((o) => (
            <li
              key={o.id}
              className="rgb-box rounded-lg p-4"
              style={{ ["--box-fill" as string]: "#ffffff" }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-ink">
                    {o.tierName} <span className="font-normal text-muted">· {o.categoryLabel}</span>
                  </p>
                  <p className="mt-0.5 text-xs text-gold">{o.price}</p>
                  {o.projectDetails && <p className="mt-2 text-xs text-muted">{o.projectDetails}</p>}
                  <p className="mt-2 text-[11px] text-muted">
                    {new Date(o.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusColor(o.status)}`}>
                  {o.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function AccountPage() {
  const { user, ready } = useCustomerAuth();
  const router = useRouter();

  useEffect(() => {
    if (ready && !user) {
      router.replace("/login?redirect=/account");
    }
  }, [ready, user, router]);

  return (
    <>
      <Navbar active="Account" />
      <main>
        <section className="section">
          {!ready || !user ? (
            <p className="text-center text-sm text-muted">Loading…</p>
          ) : (
            <OrdersView />
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
