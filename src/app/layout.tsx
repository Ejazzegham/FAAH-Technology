import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import { getSettingsOnce } from "@/lib/firestore/settings";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSettingsOnce();
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://hztechnology.com"),
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: { canonical: "/" },
    icons: {
      icon: "/favicon.ico",
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: "website",
      siteName: "HZ Technology",
      images: seo.ogImage ? [{ url: seo.ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: seo.ogImage ? [seo.ogImage] : undefined,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettingsOnce();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hztechnology.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "HZ Technology",
    description: settings.seo.description,
    url: siteUrl,
    telephone: settings.contactPhone,
    email: settings.contactEmail,
    address: {
      "@type": "PostalAddress",
      addressLocality: settings.address,
    },
    sameAs: Object.values(settings.social).filter(Boolean),
    image: settings.appearance.logoUrl,
  };

  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body antialiased">
        {children}
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
