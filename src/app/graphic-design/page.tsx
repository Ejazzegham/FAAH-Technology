import Navbar from "@/components/Navbar";
import GraphicDesignHero from "@/components/GraphicDesignHero";
import GraphicDesignTrustBar from "@/components/GraphicDesignTrustBar";
import GraphicDesignServices from "@/components/GraphicDesignServices";
import HowWeWork from "@/components/HowWeWork";
import GraphicDesignFaq from "@/components/GraphicDesignFaq";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Graphic Design Services — HZ Technology",
  description:
    "Explore HZ Technology's full graphic design service menu — logo & branding, print design, packaging, marketing graphics, UI/UX, and more — plus answers to common questions.",
  alternates: { canonical: "/graphic-design" },
};

export default function GraphicDesignPage() {
  return (
    <>
      <Navbar active="Services" />
      <main>
        <GraphicDesignHero />
        <GraphicDesignTrustBar />
        <GraphicDesignServices />
        <HowWeWork />
        <GraphicDesignFaq />
        <CtaBanner
          title={
            <>
              Ready to start your <span className="text-gold">design</span>{" "}
              project?
            </>
          }
          subtitle="Tell us what you need — we'll bring your brand to life."
          buttonText="GET A FREE QUOTE"
          icon="logo"
        />
      </main>
      <Footer />
    </>
  );
}
