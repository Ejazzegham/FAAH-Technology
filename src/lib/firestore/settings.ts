import { doc, getDoc, onSnapshot, setDoc, type Unsubscribe } from "firebase/firestore";
import { getDb, isFirebaseConfigured } from "@/lib/firebase";

// All site-wide, editable-from-admin settings live in a single Firestore
// document: settings/site. The values below are the defaults shown until
// an admin saves changes from Admin → Settings / SEO / Appearance — they
// match the business's real current contact details, so nothing changes
// visually on first load, but everything here is now editable without
// touching code.

export type SiteSettings = {
  contactEmail: string;
  contactPhone: string;
  whatsappNumber: string; // international format, digits only, no "+" (e.g. "923455163857")
  whatsappMessage: string;
  address: string;
  workingHours: string;
  social: {
    linkedin: string;
    facebook: string;
    instagram: string;
    twitter: string;
    github: string;
    behance: string;
    dribbble: string;
    youtube: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string;
    ogImage: string;
  };
  appearance: {
    accentColor: string;
    logoUrl: string;
    tagline: string;
  };
};

export const DEFAULT_SETTINGS: SiteSettings = {
  contactEmail: "hztechnology999@gmail.com",
  contactPhone: "+92 345 5163 857",
  whatsappNumber: "923455163857",
  whatsappMessage: "Hi FAAH Technology! I'd like to talk about a project.",
  address: "Shahkot, Punjab, Pakistan",
  workingHours: "Mon - Fri : 9:00 AM - 6:00 PM\nSaturday : 10:00 AM - 2:00 PM\nSunday : Closed",
  social: {
    linkedin: "",
    facebook: "",
    instagram: "",
    twitter: "",
    github: "",
    behance: "",
    dribbble: "",
    youtube: "",
  },
  seo: {
    title: "FAAH Technology — Creative Design. Clean Code. Real Results.",
    description:
      "FAAH Technology helps businesses and brands grow with high-quality graphic design, web, mobile, and custom software solutions.",
    keywords: "web design, web development, mobile app development, graphic design, desktop software, Pakistan",
    ogImage: "/logo/faah_logo_1024x1024.png",
  },
  appearance: {
    accentColor: "#1477f5",
    logoUrl: "/logo/faah_logo_512x512.png",
    tagline: "Designing beautiful experiences. Building powerful solutions.",
  },
};

const SETTINGS_DOC = "settings/site";

function mergeWithDefaults(data: Record<string, unknown> | undefined): SiteSettings {
  const d = (data ?? {}) as Partial<SiteSettings>;
  return {
    ...DEFAULT_SETTINGS,
    ...d,
    social: { ...DEFAULT_SETTINGS.social, ...(d.social ?? {}) },
    seo: { ...DEFAULT_SETTINGS.seo, ...(d.seo ?? {}) },
    appearance: { ...DEFAULT_SETTINGS.appearance, ...(d.appearance ?? {}) },
  };
}

/** Live-subscribes to site settings. Always calls back with a complete
 * SiteSettings object (falling back to real defaults for anything unset). */
export function subscribeSettings(cb: (settings: SiteSettings) => void): Unsubscribe | null {
  if (!isFirebaseConfigured) {
    cb(DEFAULT_SETTINGS);
    return null;
  }
  return onSnapshot(
    doc(getDb(), SETTINGS_DOC),
    (snap) => cb(mergeWithDefaults(snap.exists() ? (snap.data() as Record<string, unknown>) : undefined)),
    () => cb(DEFAULT_SETTINGS)
  );
}

/** One-time fetch (no live subscription) — for use in server components,
 * e.g. generateMetadata, where a stream isn't appropriate. */
export async function getSettingsOnce(): Promise<SiteSettings> {
  if (!isFirebaseConfigured) return DEFAULT_SETTINGS;
  try {
    const snap = await getDoc(doc(getDb(), SETTINGS_DOC));
    return mergeWithDefaults(snap.exists() ? (snap.data() as Record<string, unknown>) : undefined);
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export async function updateSettings(partial: Partial<SiteSettings>): Promise<void> {
  if (!isFirebaseConfigured) throw new Error("Firebase is not configured.");
  await setDoc(doc(getDb(), SETTINGS_DOC), partial, { merge: true });
}
