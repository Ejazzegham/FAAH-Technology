import dns from "node:dns";
import { S3Client } from "@aws-sdk/client-s3";

// On some networks (common on Windows + home routers), Node tries IPv6 first
// for new hosts and has to time out (~20s+) before falling back to IPv4,
// and the AWS SDK's retries compound that into 100+ second requests that
// eventually succeed. Forcing IPv4 first avoids that timeout entirely.
dns.setDefaultResultOrder("ipv4first");

// Cloudflare R2 speaks the S3 API, so we talk to it with the standard AWS S3
// SDK pointed at R2's endpoint. This file is server-only — it holds secret
// credentials that must never end up in the browser bundle. Don't import it
// from a "use client" file.
//
// Required env vars (set in .env.local for dev, and in your hosting
// provider's dashboard for production):
//   R2_ACCOUNT_ID          Cloudflare account ID (dashboard URL or R2 > Overview)
//   R2_ACCESS_KEY_ID       from an R2 API token (R2 > Manage API Tokens)
//   R2_SECRET_ACCESS_KEY   from the same R2 API token
//   R2_BUCKET_NAME         the bucket you created, e.g. "hz-technology-uploads"
//   R2_PUBLIC_URL          public base URL for the bucket — either the custom
//                          domain you attach to it (recommended) or the
//                          default r2.dev URL, no trailing slash, e.g.
//                          "https://files.hztechnology.com"

let _client: S3Client | null = null;

export function getR2Client(): S3Client {
  if (_client) return _client;

  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

  if (!accountId || !accessKeyId || !secretAccessKey) {
    throw new Error(
      "R2 is not configured — set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID and R2_SECRET_ACCESS_KEY."
    );
  }

  _client = new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey },
  });
  return _client;
}

export const R2_BUCKET = process.env.R2_BUCKET_NAME ?? "";

// Trim any trailing slash so publicUrlFor() never produces a double slash.
export const R2_PUBLIC_URL = (process.env.R2_PUBLIC_URL ?? "").replace(/\/+$/, "");

export function publicUrlFor(key: string): string {
  return `${R2_PUBLIC_URL}/${key}`;
}

/** Reverses publicUrlFor() — returns null if the URL isn't one of ours. */
export function keyFromPublicUrl(url: string): string | null {
  if (!R2_PUBLIC_URL || !url.startsWith(`${R2_PUBLIC_URL}/`)) return null;
  return decodeURIComponent(url.slice(R2_PUBLIC_URL.length + 1));
}
