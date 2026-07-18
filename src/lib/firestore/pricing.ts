import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
  type Unsubscribe,
} from "firebase/firestore";
import { getDb, isFirebaseConfigured } from "@/lib/firebase";
import { getPricingTiers, type PricingTier } from "@/lib/pricing";

export type FirestorePricingTier = PricingTier & {
  id: string;
  categorySlug: string;
  /** True when this tier is the auto-generated default (no real Firestore
   * doc exists yet for this category) — editing one of these creates a new
   * real tier rather than updating a non-existent document. */
  isDefault?: boolean;
};

export function subscribePricingTiers(
  categorySlug: string,
  cb: (tiers: FirestorePricingTier[]) => void
): Unsubscribe | null {
  if (!isFirebaseConfigured) {
    cb(getPricingTiers(categorySlug).map((t, i) => ({ ...t, id: String(i), categorySlug, isDefault: true })));
    return null;
  }
  const q = query(
    collection(getDb(), "pricingTiers"),
    where("categorySlug", "==", categorySlug),
    orderBy("createdAt", "asc")
  );
  return onSnapshot(
    q,
    (snap) => {
      if (snap.empty) {
        cb(
          getPricingTiers(categorySlug).map((t, i) => ({ ...t, id: String(i), categorySlug, isDefault: true }))
        );
        return;
      }
      cb(
        snap.docs.map((d) => {
          const data = d.data();
          return {
            id: d.id,
            categorySlug: (data.categorySlug as string) ?? categorySlug,
            name: (data.name as string) ?? "",
            price: (data.price as string) ?? "",
            priceNote: (data.priceNote as string) ?? "",
            badge: (data.badge as string) || undefined,
            stars: (data.stars as number) ?? 5,
            features: (data.features as string[]) ?? [],
            cta: (data.cta as string) ?? "ORDER NOW",
            highlighted: Boolean(data.highlighted),
            isDefault: false,
          };
        })
      );
    },
    (err) => {
      console.error("subscribePricingTiers failed — check that the pricingTiers composite index (categorySlug, createdAt) is deployed:", err);
      cb(getPricingTiers(categorySlug).map((t, i) => ({ ...t, id: String(i), categorySlug, isDefault: true })));
    }
  );
}

export async function addPricingTier(input: {
  categorySlug: string;
  name: string;
  price: string;
  priceNote: string;
  badge?: string;
  stars: number;
  features: string[];
  cta: string;
  highlighted: boolean;
}): Promise<void> {
  if (!isFirebaseConfigured) throw new Error("Firebase is not configured.");
  await addDoc(collection(getDb(), "pricingTiers"), { ...input, createdAt: serverTimestamp() });
}

export async function updatePricingTier(
  id: string,
  input: {
    categorySlug: string;
    name: string;
    price: string;
    priceNote: string;
    badge?: string;
    stars: number;
    features: string[];
    cta: string;
    highlighted: boolean;
  }
): Promise<void> {
  if (!isFirebaseConfigured) throw new Error("Firebase is not configured.");
  const { setDoc } = await import("firebase/firestore");
  await setDoc(doc(getDb(), "pricingTiers", id), { ...input, updatedAt: serverTimestamp() }, { merge: true });
}

export async function deletePricingTier(id: string): Promise<void> {
  if (!isFirebaseConfigured) throw new Error("Firebase is not configured.");
  await deleteDoc(doc(getDb(), "pricingTiers", id));
}
