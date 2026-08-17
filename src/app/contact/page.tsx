import Navbar from "@/components/Navbar";
import ContactHero from "@/components/ContactHero";
import ContactHeroForm from "@/components/ContactHeroForm";
import ContactMap from "@/components/ContactMap";
import ContactWhyReach from "@/components/ContactWhyReach";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — FAAH Technology",
  description:
    "Get in touch with FAAH Technology. Send us a message, find our office, or reach out by phone or email.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Navbar active="Contact" />
      <main>
        <ContactHero />
        <ContactHeroForm />
        <ContactMap />
        <ContactWhyReach />
        <CtaBanner
          title={
            <>
              Have a Project in Mind? <span className="text-gold">Let&apos;s Talk.</span>
            </>
          }
          subtitle="Share your vision with us, and we'll help you bring it to life with creative technology solutions."
          buttonText="LET'S TALK"
          icon="headset"
        />
      </main>
      <Footer />
    </>
  );
}
