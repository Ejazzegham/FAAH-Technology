/** @type {import('next').NextConfig} */

// Derived from R2_PUBLIC_URL so next/image keeps working automatically if
// you switch from the default *.r2.dev URL to a custom domain (e.g.
// files.hztechnology.com) — no code change needed, just update the env var.
function r2Hostname() {
  try {
    return new URL(process.env.R2_PUBLIC_URL ?? "").hostname || null;
  } catch {
    return null;
  }
}

const remotePatterns = [
  // Legacy Firebase Storage URLs — file uploads now go to Cloudflare R2
  // (see src/lib/r2.ts), but this stays in case any old, un-migrated image
  // URLs are still referenced in Firestore.
  {
    protocol: "https",
    hostname: "firebasestorage.googleapis.com",
  },
];

const r2Host = r2Hostname();
if (r2Host) {
  remotePatterns.push({ protocol: "https", hostname: r2Host });
}

const nextConfig = {
  images: {
    remotePatterns,
  },
};

module.exports = nextConfig;
