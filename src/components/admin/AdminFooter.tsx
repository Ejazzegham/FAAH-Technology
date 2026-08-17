import Link from "next/link";

export default function AdminFooter() {
  return (
    <footer className="mt-10 border-t border-line px-6 py-5">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 text-[11px] text-muted sm:flex-row">
        <p>© {new Date().getFullYear()} FAAH Technology. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a
            href="https://console.firebase.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold"
          >
            Firebase Console
          </a>
          <Link href="/" className="hover:text-gold">
            View Live Site
          </Link>
        </div>
      </div>
    </footer>
  );
}
