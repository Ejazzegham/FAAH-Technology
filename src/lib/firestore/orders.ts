import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
  type Unsubscribe,
} from "firebase/firestore";
import { getDb, isFirebaseConfigured } from "@/lib/firebase";

export type OrderStatus = "New" | "In Progress" | "Completed" | "Cancelled";

export type Order = {
  id: string;
  uid: string;
  customerName: string;
  customerEmail: string;
  categoryLabel: string;
  tierName: string;
  price: string;
  projectDetails: string;
  status: OrderStatus;
  createdAt: number;
};

function docToOrder(id: string, data: Record<string, unknown>): Order {
  return {
    id,
    uid: (data.uid as string) ?? "",
    customerName: (data.customerName as string) ?? "",
    customerEmail: (data.customerEmail as string) ?? "",
    categoryLabel: (data.categoryLabel as string) ?? "",
    tierName: (data.tierName as string) ?? "",
    price: (data.price as string) ?? "",
    projectDetails: (data.projectDetails as string) ?? "",
    status: (data.status as OrderStatus) ?? "New",
    createdAt: (data.createdAt as { toMillis?: () => number } | undefined)?.toMillis?.() ?? Date.now(),
  };
}

export async function submitOrder(input: {
  uid: string;
  customerName: string;
  customerEmail: string;
  categoryLabel: string;
  tierName: string;
  price: string;
  projectDetails: string;
}): Promise<void> {
  if (!isFirebaseConfigured) throw new Error("Firebase is not configured.");
  await addDoc(collection(getDb(), "orders"), {
    ...input,
    status: "New",
    createdAt: serverTimestamp(),
  });
}

/** Live-subscribes to all orders, for the admin dashboard. */
export function subscribeAllOrders(cb: (orders: Order[]) => void): Unsubscribe | null {
  if (!isFirebaseConfigured) {
    cb([]);
    return null;
  }
  const q = query(collection(getDb(), "orders"), orderBy("createdAt", "desc"));
  return onSnapshot(
    q,
    (snap) => cb(snap.docs.map((d) => docToOrder(d.id, d.data()))),
    () => cb([])
  );
}

/** Live-subscribes to a single customer's own orders — for their account page. */
export function subscribeMyOrders(uid: string, cb: (orders: Order[]) => void): Unsubscribe | null {
  if (!isFirebaseConfigured) {
    cb([]);
    return null;
  }
  const q = query(collection(getDb(), "orders"), where("uid", "==", uid), orderBy("createdAt", "desc"));
  return onSnapshot(
    q,
    (snap) => cb(snap.docs.map((d) => docToOrder(d.id, d.data()))),
    (err) => {
      console.error("subscribeMyOrders failed — check that the orders composite index (uid, createdAt) is deployed:", err);
      cb([]);
    }
  );
}

export async function setOrderStatus(id: string, status: OrderStatus): Promise<void> {
  if (!isFirebaseConfigured) throw new Error("Firebase is not configured.");
  await setDoc(doc(getDb(), "orders", id), { status }, { merge: true });
}

export async function deleteOrder(id: string): Promise<void> {
  if (!isFirebaseConfigured) throw new Error("Firebase is not configured.");
  await deleteDoc(doc(getDb(), "orders", id));
}
