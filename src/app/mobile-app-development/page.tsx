import Navbar from "@/components/Navbar";
import MobileAppHero from "@/components/MobileAppHero";
import MobileAppTrustBar from "@/components/MobileAppTrustBar";
import MobileAppServices from "@/components/MobileAppServices";
import HowWeWork from "@/components/HowWeWork";
import MobileAppFaq from "@/components/MobileAppFaq";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mobile App Design & Development — HZ Technology",
  description:
    "Explore HZ Technology's full mobile app service menu — business, eCommerce, finance, healthcare, on-demand, AI-powered apps and more — plus answers to common questions.",
  alternates: { canonical: "/mobile-app-development" },
};

export default function MobileAppPage() {
  return (
    <>
      <Navbar active="Services" />
      <main>
        <MobileAppHero />
        <MobileAppTrustBar />
        <MobileAppServices />
        <HowWeWork />
        <MobileAppFaq />
        <CtaBanner
          title={
            <>
              Ready to build your <span className="text-gold">app</span>?
            </>
          }
          subtitle="Tell us what you need — we'll design and develop it for you."
          buttonText="GET A FREE QUOTE"
          icon="logo"
        />
      </main>
      <Footer />
    </>
  );
}
