import Navbar from "@/components/Navbar";
import AboutHero from "@/components/AboutHero";
import AboutStory from "@/components/AboutStory";
import AboutWhyJourney from "@/components/AboutWhyJourney";
import AboutTeam from "@/components/AboutTeam";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — FAAH Technology",
  description:
    "Learn about FAAH Technology — a creative digital agency and software development studio helping businesses grow with innovative design and robust technology.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <Navbar active="About" />
      <main>
        <AboutHero />
        <AboutStory />
        <AboutWhyJourney />
        <AboutTeam />
        <CtaBanner
          title={
            <>
              Have a Project in Mind? <span className="text-gold">Let&apos;s Talk.</span>
            </>
          }
          subtitle="Share your vision with us, and we'll help you bring it to life with creative technology solutions."
          buttonText="LET'S TALK"
          icon="plane"
        />
      </main>
      <Footer />
    </>
  );
}
