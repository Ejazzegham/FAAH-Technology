import Navbar from "@/components/Navbar";
import DesktopSoftwareHero from "@/components/DesktopSoftwareHero";
import DesktopSoftwareTrustBar from "@/components/DesktopSoftwareTrustBar";
import DesktopSoftwareServices from "@/components/DesktopSoftwareServices";
import HowWeWork from "@/components/HowWeWork";
import DesktopSoftwareFaq from "@/components/DesktopSoftwareFaq";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Desktop App Designing & Developing — HZ Technology",
  description:
    "Explore HZ Technology's full desktop software service menu — ERP, CRM, POS, business automation, industry-specific systems, and more — plus answers to common questions.",
  alternates: { canonical: "/desktop-software" },
};

export default function DesktopSoftwarePage() {
  return (
    <>
      <Navbar active="Services" />
      <main>
        <DesktopSoftwareHero />
        <DesktopSoftwareTrustBar />
        <DesktopSoftwareServices />
        <HowWeWork />
        <DesktopSoftwareFaq />
        <CtaBanner
          title={
            <>
              Ready to build your <span className="text-gold">software</span>?
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
