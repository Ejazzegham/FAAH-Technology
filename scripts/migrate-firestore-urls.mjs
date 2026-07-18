#!/usr/bin/env node
// scripts/migrate-firestore-urls.mjs
//
// After your files are copied to R2 (e.g. via Cloudflare's Super Slurper
// tool, or any other bucket-to-bucket copy that preserves object keys), the
// Firestore documents that reference them still point at the old
// firebasestorage.googleapis.com URLs. This script finds every one of those
// URLs and rewrites it to the matching R2 public URL, assuming the object's
// path/key is unchanged. This is a one-time tool — safe to ignore unless
// you're migrating an existing Firebase Storage bucket's contents to R2.
//
// Touches exactly 3 places, matching what the app actually stores:
//   - projects/{id}.images        (string[])
//   - blogPosts/{id}.coverImageUrl (string)
//   - settings/site.appearance.logoUrl (string)
//
// USAGE
//   node scripts/migrate-firestore-urls.mjs            # dry run — just prints what would change
//   node scripts/migrate-firestore-urls.mjs --apply     # actually writes the changes
//
// REQUIRED ENV VARS (export in your shell, or run with
// `node --env-file=.env scripts/migrate-firestore-urls.mjs`):
//   FIREBASE_ADMIN_PROJECT_ID, FIREBASE_ADMIN_CLIENT_EMAIL, FIREBASE_ADMIN_PRIVATE_KEY
//   R2_PUBLIC_URL   e.g. https://files.hztechnology.com  (no trailing slash)

import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const APPLY = process.argv.includes("--apply");

function requireEnv(name) {
  const v = process.env[name];
  if (!v) {
    console.error(`Missing required env var: ${name}`);
    process.exit(1);
  }
  return v;
}

const app = initializeApp({
  credential: cert({
    projectId: requireEnv("FIREBASE_ADMIN_PROJECT_ID"),
    clientEmail: requireEnv("FIREBASE_ADMIN_CLIENT_EMAIL"),
    privateKey: requireEnv("FIREBASE_ADMIN_PRIVATE_KEY").replace(/\\n/g, "\n"),
  }),
});
const db = getFirestore(app);
const R2_PUBLIC_URL = requireEnv("R2_PUBLIC_URL").replace(/\/+$/, "");

/** Old Firebase Storage download URL -> new R2 public URL, or null if not a Firebase Storage URL. */
function rewriteUrl(url) {
  if (typeof url !== "string") return null;
  const match = url.match(/firebasestorage\.googleapis\.com\/v0\/b\/[^/]+\/o\/([^?]+)/);
  if (!match) return null;
  const path = decodeURIComponent(match[1]);
  return `${R2_PUBLIC_URL}/${path}`;
}

async function migrateProjects() {
  const snap = await db.collection("projects").get();
  let changed = 0;
  let batch = db.batch();
  let opsInBatch = 0;

  for (const docSnap of snap.docs) {
    const images = docSnap.data().images;
    if (!Array.isArray(images) || images.length === 0) continue;

    let touched = false;
    const newImages = images.map((url) => {
      const rewritten = rewriteUrl(url);
      if (rewritten) touched = true;
      return rewritten ?? url;
    });

    if (!touched) continue;
    changed++;
    console.log(`[projects/${docSnap.id}] ${images.length} image URL(s) -> rewritten`);
    if (APPLY) {
      batch.update(docSnap.ref, { images: newImages });
      opsInBatch++;
      if (opsInBatch >= 400) {
        await batch.commit();
        batch = db.batch();
        opsInBatch = 0;
      }
    }
  }
  if (APPLY && opsInBatch > 0) await batch.commit();
  console.log(`projects: ${changed} document(s) ${APPLY ? "updated" : "would be updated"}.\n`);
}

async function migrateBlogPosts() {
  const snap = await db.collection("blogPosts").get();
  let changed = 0;
  let batch = db.batch();
  let opsInBatch = 0;

  for (const docSnap of snap.docs) {
    const url = docSnap.data().coverImageUrl;
    const rewritten = rewriteUrl(url);
    if (!rewritten) continue;

    changed++;
    console.log(`[blogPosts/${docSnap.id}] coverImageUrl -> rewritten`);
    if (APPLY) {
      batch.update(docSnap.ref, { coverImageUrl: rewritten });
      opsInBatch++;
      if (opsInBatch >= 400) {
        await batch.commit();
        batch = db.batch();
        opsInBatch = 0;
      }
    }
  }
  if (APPLY && opsInBatch > 0) await batch.commit();
  console.log(`blogPosts: ${changed} document(s) ${APPLY ? "updated" : "would be updated"}.\n`);
}

async function migrateSiteLogo() {
  const ref = db.doc("settings/site");
  const snap = await ref.get();
  if (!snap.exists) return;

  const logoUrl = snap.data()?.appearance?.logoUrl;
  const rewritten = rewriteUrl(logoUrl);
  if (!rewritten) {
    console.log("settings/site: no change needed.\n");
    return;
  }

  console.log(`[settings/site] appearance.logoUrl -> rewritten`);
  if (APPLY) {
    await ref.update({ "appearance.logoUrl": rewritten });
  }
  console.log(`settings/site: 1 document ${APPLY ? "updated" : "would be updated"}.\n`);
}

async function run() {
  console.log(APPLY ? "Running in APPLY mode — Firestore will be written.\n" : "Running in DRY RUN mode — nothing will be written. Pass --apply to write.\n");
  await migrateProjects();
  await migrateBlogPosts();
  await migrateSiteLogo();
  console.log("Done.");
}

run().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
