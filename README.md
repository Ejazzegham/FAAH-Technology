# FAAH Technology — Website

Next.js 14 (App Router) + TypeScript + Tailwind CSS site for FAAH Technology,
with a fully functional Firebase-backed admin dashboard.

## Pages

- `/` — Home
- `/portfolio` — Portfolio grid (reads real projects from Firestore)
- `/pricing` — Pricing packages by category
- `/about` — About
- `/blog` — Blog list (real posts, from `/admin`)
- `/blog/[slug]` — Blog post + comments
- `/pages/[slug]` — Custom pages you create from `/admin` → Pages
- `/contact` — Contact form (writes to Firestore) + office info + WhatsApp button
- `/account` — Customer sign in/up + order history (separate from admin login)
- `/admin` — Admin dashboard (Firebase Auth-protected, admin-email allowlist only)

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Connect your Firebase project

Copy the example env file and fill in your own keys (Firebase console →
Project settings → General → Your apps):

```bash
cp .env.local.example .env.local
```

If you skip this, the site falls back to the `hz-portfolio-6ff9d` project
config already baked into `src/lib/firebase.ts` — fine to get started, but
switch to your own project before going live.

### 1. Enable Email/Password sign-in

Firebase console → Authentication → Sign-in method → enable **Email/Password**.

### 2. ⚠️ CRITICAL — check the admin email allowlist before deploying rules

This site now has two kinds of accounts sharing the same Firebase Auth pool:

- **Admins** (you) — full access to everything in `/admin`.
- **Customers** — regular visitors who create a free account only to place
  an order from the Pricing page. They get almost no access (just their own
  orders).

To tell these apart, admin access is now restricted to a specific list of
email addresses — **not** "anyone who's signed in" like before. That list
lives in three places and **must match exactly**:

- `firestore.rules` (the `ADMIN_EMAILS` list inside `isAdmin()`)
- `storage.rules` (same list, inside `isAdmin()`)
- `src/lib/admin-emails.ts` (`ADMIN_EMAILS` — controls the admin UI only)

Right now all three list `ejazzegham@gmail.com` and
`hztechnology999@gmail.com` as placeholders. **Before you deploy these
rules, open all three files and make sure the email you actually use to
sign in at `/admin` is in that list** — add it if it isn't, in all three
places. If you skip this and your real login email isn't listed, you will
be locked out of your own admin dashboard the moment these rules go live
(there's no "create account" fallback anymore — see step 4 below).

To add a second admin later: create their account in Firebase console →
Authentication → Users → Add user, then add their email to all three
places above.

### 3. Deploy the security rules — and the required indexes

This repo includes `firestore.rules`, `storage.rules`, and
`firestore.indexes.json` (a `firebase.json` ties them together). Deploy all
of it with the Firebase CLI:

```bash
npm install -g firebase-tools
firebase login
firebase init   # select Firestore + Storage, point at this project
firebase deploy --only firestore:rules,firestore:indexes,storage
```

Or paste `firestore.rules`/`storage.rules` into the Firebase console
directly (Firestore Database → Rules, Storage → Rules) if you'd rather not
install the CLI — but the **composite indexes in `firestore.indexes.json`
can only be created through the CLI or the console's Indexes tab**, not by
pasting text anywhere, so don't skip `firestore:indexes`.

`firestore.rules` is the real one — it's the actual security boundary for
every collection the app uses (public site content is world-readable,
everything else is admin-only or scoped to the signed-in customer who owns
it). `storage.rules` just locks Firebase Storage down completely: the app
doesn't use Firebase Storage at all anymore (uploads go to Cloudflare R2 —
see `src/lib/r2.ts`), so this is only a safety net in case your Firebase
project still has a Storage bucket sitting open in "test mode."

**Why the indexes matter — this is why the blog page was showing "No blog
posts yet" even with a published post:** a few queries in this app filter
by one field (e.g. `published == true`) and sort by another (e.g. newest
first) in the same request. Firestore requires a matching composite index
for that specific combination of fields before it will run the query at
all — without it, the query fails outright and the page just shows an
empty state, with no visible error unless you check the server terminal or
browser console. This affects the blog list, blog comments, per-category
pricing tier overrides, and a customer's order history on `/account`. All
four required indexes are already defined in `firestore.indexes.json` —
deploying it is what actually fixes them.

**This is also almost certainly why you saw "insufficient permission" when
saving Settings** — that error means the rules (or some version of them)
were never deployed to your live Firebase project. Once deployed, saving
should work immediately.

### 4. Sign in with your existing admin account

There is intentionally **no "create account" option on `/admin` anymore** —
just email + password sign-in. Use the account you already created earlier.
If you ever need to create a brand new admin account from scratch (e.g. you
never had one, or lost access), go to Firebase console → Authentication →
Users → Add user, create it there, then make sure that email is in
`ADMIN_EMAILS` in all three places from step 2.

### 5. ⚠️ Rotate every credential that was found in plaintext

A live Gmail App Password was found sitting in plaintext in `.env.local` in
the project files, and has been removed from this delivered copy — but it
may still be active. **Revoke it now** at
https://myaccount.google.com/apppasswords and generate a new one.

The same `.env.local` also still contains a **real, working Firebase Admin
service account private key and real Cloudflare R2 access keys** — these
were left in place (removing them would break local dev entirely) but they
are live secrets that were sitting in a project zip file, which is not a
secure place for them to live. Treat them as compromised:

- **Firebase Admin key**: Firebase console → Project settings → Service
  accounts → Generate new private key. Update `FIREBASE_ADMIN_PRIVATE_KEY`
  (and the other two `FIREBASE_ADMIN_*` vars if they changed) everywhere you
  deploy, then delete the old key from that same page.
- **R2 keys**: Cloudflare dashboard → R2 → Manage API Tokens → create a new
  token, update `R2_ACCESS_KEY_ID` / `R2_SECRET_ACCESS_KEY`, then revoke the
  old token.

Paste the new values into your own `.env.local` (never commit that file —
see `.gitignore`, which now excludes it) and into your hosting provider's
environment variable settings.


## Customer accounts & orders

Customers can now create a free account (at `/account`, or automatically
when placing an order from `/pricing`) and must sign in before an order
goes through. Orders land in Admin → Orders, where you can change their
status (New / In Progress / Completed / Cancelled) or delete them. A
customer can only ever see their own orders — never anyone else's, and
never any admin data — enforced server-side by `firestore.rules`, not just
hidden in the UI.

## SEO

Every page now has a unique title, description, and canonical URL; there's
a dynamic `/sitemap.xml` and `/robots.txt`; and structured data (JSON-LD)
is included site-wide (`ProfessionalService`) and on every blog post
(`Article`). Realistically, no configuration can guarantee a #1 Google
ranking — that also depends on content quality, backlinks, and time — but
the technical SEO foundation is now as solid as code alone can make it.
To help further: publish blog posts regularly, get other real sites to
link to yours, and set `NEXT_PUBLIC_SITE_URL` in `.env.local` to your real
domain once you have one (used for canonical URLs and the sitemap).

## What's real data vs. sample data

Every section below is live Firestore data, editable from `/admin` — there
is no hardcoded/sample data left anywhere on the site or in the admin panel.
Every list starts empty until you add real content; sections hide
gracefully (instead of showing fake placeholders) until you do.

- **Projects / Portfolio** — full CRUD with image upload to Firebase
  Storage — and the uploaded image now actually displays on `/portfolio`
  and the homepage (previously it was uploaded but never shown). Shows up
  immediately on `/portfolio` and the homepage's featured projects. The
  "Technologies Used" field is now backed by the real Technologies tag list
  (Manage Portfolio → Technologies) as quick-pick chips. Edit/Delete
  buttons are clearly labeled in the "All Portfolio" table.
- **Services, Reviews, Team, Clients, Messages, Subscribers** — unchanged
  CRUD, all live.
- **Pricing Packages** — manages tiers against the *real* pricing
  categories used on `/pricing` (previously this let you create categories
  that never appeared anywhere on the live site). Every tier now has an
  Edit button, not just Delete.
- **Orders** *(new)* — customers must sign in/create a free account at
  `/account` (or right when ordering from `/pricing`) before an order goes
  through. Manage status and details from Admin → Orders.
- **Pages** *(new, was non-functional)* — create custom pages, published at
  `/pages/<slug>`.
- **Blog** *(new, was non-functional)* — posts with cover images and tags,
  published at `/blog`, plus a comment moderation queue.
- **SEO Settings** *(new, was non-functional)* — site title/description/
  keywords/social image, wired into the real page `<head>` metadata.
- **Appearance** *(new, was non-functional)* — accent color, logo, tagline.
- **Settings** *(new, was non-functional)* — contact email/phone/address/
  hours, WhatsApp number, and social links — used by the footer, contact
  page, and the WhatsApp button.
- **Users / Roles & Permissions** *(new, was non-functional)* — merged into
  one honest "Account & Access" panel: change your own email/password, plus
  a plain-language explanation of the current single-admin access model
  (true multi-role permissions need a server-side component this project
  doesn't include).
- **Backup & Restore** *(new, was non-functional)* — one-click export of
  every collection to a JSON file, and restore from that file.
- **Dashboard stats & charts** — computed live from the collections above.

There's no real analytics/traffic tracking wired up (that would need Google
Analytics or similar), so there's no "page views" panel.

## Pre-deploy audit (2026-07-17)

A full pass before launch found and fixed the following:

- **`firestore.rules` and `storage.rules` didn't actually exist** despite
  being described above as included — the site's entire data model had no
  deployed security boundary. Both are now written and present; see step 3
  above. **You still need to deploy them** (they don't apply until you do).
- **`.gitignore` didn't exist either**, despite an earlier note claiming it
  did — added now, so `.env.local` and build output won't get committed.
- **Public blog posts, blog post pages, and custom pages could break under
  real security rules**: the code fetched *all* documents and filtered for
  `published` in JavaScript afterward, instead of filtering in the Firestore
  query itself. Once real rules are enforced, a query like that gets
  rejected outright for signed-out visitors. Fixed in `src/lib/firestore/blog.ts`
  and `src/lib/firestore/pages.ts` — the `published == true` filter is now
  part of the query, matching what the rules require.
- **`next.config.js` hardcoded one specific `*.r2.dev` hostname** for
  `next/image`. It now reads the hostname from `R2_PUBLIC_URL` automatically,
  so switching to a custom domain for file storage won't silently break
  every image on the site.
- **The sitemap only listed blog posts** alongside the static pages —
  portfolio project pages and published custom pages are now included too.
- Removed dead/unused code and assets that had no effect on the site but
  added confusion and weight: `AboutServices.tsx`, `ContactIntro.tsx`,
  `ServiceCategoryMenuInline.tsx`, `AdminTopPages.tsx` (a fake "Top Pages by
  Views" widget with hardcoded numbers — contradicted the "no sample data"
  promise above), `admin-data.ts` (the sample data it read from),
  `admin-lock.ts` (leftover from a signup flow that no longer exists), an
  unused function in `r2.ts`, and three unused images (~1MB) including a
  duplicate team photo.
- Swapped several internal `<a href="...">` links (Footer, homepage About
  section, homepage Projects section, admin footer, account page) for
  Next.js `<Link>`, so those clicks navigate instantly instead of doing a
  full page reload.
- **Still needs your action**: rotate the Firebase Admin key, R2 keys, and
  Gmail App Password as described in step 5 above — those were found live
  in the project files and should be treated as compromised regardless of
  anything above.

`npx tsc --noEmit` and `next lint` both pass clean, and a full production
build (`next build`) completes successfully with all 42 routes.
"# faah-technology" 
