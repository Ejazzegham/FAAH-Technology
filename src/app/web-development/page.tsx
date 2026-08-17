import Navbar from "@/components/Navbar";
import WebDesignHero from "@/components/WebDesignHero";
import WebDesignTrustBar from "@/components/WebDesignTrustBar";
import WebDesignServices from "@/components/WebDesignServices";
import HowWeWork from "@/components/HowWeWork";
import WebDesignFaq from "@/components/WebDesignFaq";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Design & Development Services — FAAH Technology",
  description:
    "Explore FAAH Technology's full web design & development service menu — business websites, eCommerce, custom web applications, landing pages, and more — plus answers to common questions.",
  alternates: { canonical: "/web-development" },
};

export default function WebDesignPage() {
  return (
    <>
      <Navbar active="Services" />
      <main>
        <WebDesignHero />
        <WebDesignTrustBar />
        <WebDesignServices />
        <HowWeWork />
        <WebDesignFaq />
        <CtaBanner
          title={
            <>
              Ready to build your <span className="text-gold">website</span>?
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
