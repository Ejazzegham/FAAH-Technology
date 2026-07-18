import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  type Unsubscribe,
} from "firebase/firestore";
import { getDb, isFirebaseConfigured } from "@/lib/firebase";
import { deleteFile, uploadFiles, type UploadItem } from "@/lib/storage";

export type ProjectCategory = "graphic" | "web" | "mobile" | "desktop";

export type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  color: string;
  client?: string;
  technologies?: string;
  link?: string;
  description?: string;
  images?: string[];
  status?: "Completed" | "In Progress";
  featured?: boolean;
  createdAt?: number;
  /** Shared, site-wide counts — anyone can like/favorite, no sign-in required. */
  likeCount?: number;
  favoriteCount?: number;
};

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  graphic: "Graphic Design",
  web: "Web Design & Development",
  mobile: "Mobile App Design & Development",
  desktop: "Desktop Software Design & Development",
};

const COLORS = [
  "from-slate-800 to-slate-950",
  "from-indigo-900 to-slate-950",
  "from-zinc-800 to-black",
  "from-stone-700 to-stone-950",
  "from-sky-900 to-slate-950",
  "from-rose-900 to-slate-950",
];

function randomColor(): string {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

function docToProject(id: string, data: Record<string, unknown>): Project {
  return {
    id,
    title: (data.title as string) ?? "Untitled project",
    category: (data.category as ProjectCategory) ?? "web",
    color: (data.color as string) ?? "from-slate-800 to-slate-950",
    client: data.client as string | undefined,
    technologies: data.technologies as string | undefined,
    link: data.link as string | undefined,
    description: data.description as string | undefined,
    images: (data.images as string[] | undefined) ?? [],
    status: (data.status as "Completed" | "In Progress" | undefined) ?? "Completed",
    featured: Boolean(data.featured),
    createdAt: (data.createdAt as { toMillis?: () => number } | undefined)?.toMillis?.() ?? Date.now(),
    likeCount: (data.likeCount as number | undefined) ?? 0,
    favoriteCount: (data.favoriteCount as number | undefined) ?? 0,
  };
}

async function fetchProjects(): Promise<Project[]> {
  if (!isFirebaseConfigured) return [];
  try {
    const q = query(collection(getDb(), "projects"), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => docToProject(d.id, d.data()));
  } catch {
    // Firestore not reachable (e.g. no network at build time) — show nothing
    // rather than fake sample projects.
    return [];
  }
}

export async function getFeaturedProjects(count = 4): Promise<Project[]> {
  const all = await fetchProjects();
  return all.slice(0, count);
}

export async function getAllProjects(): Promise<Project[]> {
  return fetchProjects();
}

export async function getProjectById(id: string): Promise<Project | null> {
  if (!isFirebaseConfigured) return null;
  try {
    const snap = await getDoc(doc(getDb(), "projects", id));
    if (!snap.exists()) return null;
    return docToProject(snap.id, snap.data());
  } catch {
    return null;
  }
}

/** Live-subscribes to the projects collection for the admin dashboard. */
export function subscribeProjects(cb: (projects: Project[]) => void): Unsubscribe | null {
  if (!isFirebaseConfigured) {
    cb([]);
    return null;
  }
  const q = query(collection(getDb(), "projects"), orderBy("createdAt", "desc"));
  return onSnapshot(
    q,
    (snap) => cb(snap.docs.map((d) => docToProject(d.id, d.data()))),
    () => cb([])
  );
}

export type NewProjectInput = {
  title: string;
  category: ProjectCategory;
  client?: string;
  technologies?: string;
  link?: string;
  description?: string;
  status?: "Completed" | "In Progress";
  featured?: boolean;
  /** Each image tagged with a stable key so the caller can match failures back to its own state. */
  images: UploadItem[];
};

async function uploadImagesKeyed(
  projectId: string,
  items: UploadItem[],
  onProgress?: (done: number, total: number) => void
): Promise<{ urlByKey: Map<string, string>; failedKeys: string[] }> {
  const results = await uploadFiles(`projects/${projectId}`, items, onProgress);
  const urlByKey = new Map<string, string>();
  const failedKeys: string[] = [];
  for (const r of results) {
    if ("url" in r) urlByKey.set(r.key, r.url);
    else failedKeys.push(r.key);
  }
  return { urlByKey, failedKeys };
}

export type SaveOutcome = {
  urlByKey: Map<string, string>;
  /** Keys of images that failed to upload even after the automatic retry — safe to re-select and try again. */
  failedKeys: string[];
};

export async function createProject(
  input: NewProjectInput,
  onProgress?: (done: number, total: number) => void
): Promise<{ id: string } & SaveOutcome> {
  if (!isFirebaseConfigured) throw new Error("Firebase is not configured.");
  const db = getDb();
  const docRef = await addDoc(collection(db, "projects"), {
    title: input.title,
    category: input.category,
    client: input.client ?? "",
    technologies: input.technologies ?? "",
    link: input.link ?? "",
    description: input.description ?? "",
    status: input.status ?? "Completed",
    featured: Boolean(input.featured),
    color: randomColor(),
    images: [],
    createdAt: serverTimestamp(),
  });

  let urlByKey = new Map<string, string>();
  let failedKeys: string[] = [];

  if (input.images.length > 0) {
    const res = await uploadImagesKeyed(docRef.id, input.images, onProgress);
    urlByKey = res.urlByKey;
    failedKeys = res.failedKeys;
    // Save whatever succeeded, in the original order — a handful of failures
    // never means losing the rest of a 200-image batch.
    const orderedUrls = input.images.map((i) => urlByKey.get(i.key)).filter((u): u is string => Boolean(u));
    await updateDoc(doc(db, "projects", docRef.id), { images: orderedUrls });
  }

  return { id: docRef.id, urlByKey, failedKeys };
}

export type OrderedImage =
  | { type: "existing"; url: string; key: string }
  | { type: "new"; file: File; key: string };

export type UpdateProjectInput = Partial<
  Omit<NewProjectInput, "images">
> & {
  /** Final image order, mixing kept URLs and new files — index 0 becomes the thumbnail. */
  orderedImages?: OrderedImage[];
  /** URLs of previously-uploaded images the admin removed — deleted from R2. */
  removedImages?: string[];
};

export async function updateProject(
  id: string,
  changes: UpdateProjectInput,
  onProgress?: (done: number, total: number) => void
): Promise<SaveOutcome> {
  if (!isFirebaseConfigured) throw new Error("Firebase is not configured.");
  const db = getDb();
  const { orderedImages, removedImages, ...rest } = changes;
  const payload: Record<string, unknown> = { ...rest };

  if (removedImages && removedImages.length > 0) {
    await Promise.all(removedImages.map((url) => deleteFile(url)));
  }

  let urlByKey = new Map<string, string>();
  let failedKeys: string[] = [];

  if (orderedImages) {
    const newItems = orderedImages
      .filter((i): i is Extract<OrderedImage, { type: "new" }> => i.type === "new")
      .map((i) => ({ key: i.key, file: i.file }));

    if (newItems.length > 0) {
      const res = await uploadImagesKeyed(id, newItems, onProgress);
      urlByKey = res.urlByKey;
      failedKeys = res.failedKeys;
    }

    // Keep every existing image, plus every new one that made it through.
    // Failed ones are simply left out of this save — the caller keeps them
    // queued (as "new") so re-clicking Update retries only those.
    payload.images = orderedImages
      .map((item) => (item.type === "existing" ? item.url : urlByKey.get(item.key)))
      .filter((u): u is string => Boolean(u));
  }

  await updateDoc(doc(db, "projects", id), payload);
  return { urlByKey, failedKeys };
}

export async function deleteProject(project: Project): Promise<void> {
  if (!isFirebaseConfigured) throw new Error("Firebase is not configured.");
  const db = getDb();
  await Promise.all((project.images ?? []).map((url) => deleteFile(url)));
  await deleteDoc(doc(db, "projects", project.id));
}
