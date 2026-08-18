import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LegalContent, { type LegalSection } from "@/components/LegalContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — FAAH Technology",
  description:
    "Learn how FAAH Technology collects, uses, protects, and discloses your information when you visit our website or use our services.",
  alternates: { canonical: "/privacy" },
};

const SECTIONS: LegalSection[] = [
  {
    heading: "Information We Collect",
    blocks: [
      { type: "p", text: "We may collect the following information when you interact with our website:" },
      { type: "sub", text: "Personal Information" },
      {
        type: "ul",
        items: [
          "Full Name",
          "Email Address",
          "Phone Number",
          "Company Name",
          "Country",
          "Project Requirements",
          "Any information you voluntarily provide through our contact forms.",
        ],
      },
      { type: "sub", text: "Technical Information" },
      {
        type: "ul",
        items: [
          "IP Address",
          "Browser Type",
          "Device Information",
          "Operating System",
          "Website Usage Data",
          "Cookies and Analytics Data",
        ],
      },
    ],
  },
  {
    heading: "How We Use Your Information",
    blocks: [
      { type: "p", text: "Your information is used to:" },
      {
        type: "ul",
        items: [
          "Respond to inquiries",
          "Provide project quotations",
          "Deliver our services",
          "Improve our website",
          "Process payments",
          "Provide customer support",
          "Send project updates",
          "Improve user experience",
          "Prevent fraud and unauthorized access",
          "Comply with legal obligations",
        ],
      },
      { type: "p", text: "We never sell your personal information to third parties." },
    ],
  },
  {
    heading: "Cookies",
    blocks: [
      { type: "p", text: "Our website uses cookies to:" },
      {
        type: "ul",
        items: ["Improve website performance", "Remember user preferences", "Analyze website traffic", "Enhance user experience"],
      },
      { type: "p", text: "You may disable cookies through your browser settings at any time." },
    ],
  },
  {
    heading: "Third-Party Services",
    blocks: [
      { type: "p", text: "We may use trusted third-party services including:" },
      {
        type: "ul",
        items: [
          "Google Analytics",
          "Google Fonts",
          "Payment Processors",
          "Cloud Hosting Providers",
          "Email Services",
          "Firebase Services",
          "Social Media Platforms",
        ],
      },
      { type: "p", text: "These providers have their own privacy policies." },
    ],
  },
  {
    heading: "Data Security",
    blocks: [
      { type: "p", text: "We implement industry-standard security measures to protect your information, including:" },
      {
        type: "ul",
        items: ["SSL Encryption", "Secure Servers", "Firewall Protection", "Password Protection", "Regular Security Updates", "Access Control"],
      },
      { type: "p", text: "Although we strive to protect your data, no internet transmission is 100% secure." },
    ],
  },
  {
    heading: "Client Files & Confidentiality",
    blocks: [
      {
        type: "p",
        text: "All project files, designs, source code, business information, and confidential documents shared with FAAH Technology remain strictly confidential.",
      },
      { type: "p", text: "We never share client information without written permission unless required by law." },
    ],
  },
  {
    heading: "Payments",
    blocks: [
      { type: "p", text: "Payments are processed through secure payment providers." },
      { type: "p", text: "FAAH Technology does not store your credit card or banking information on our servers." },
    ],
  },
  {
    heading: "Intellectual Property",
    blocks: [
      { type: "p", text: "Unless otherwise agreed in writing:" },
      {
        type: "ul",
        items: [
          "Clients own the final approved project after full payment.",
          "FAAH Technology retains the right to display completed work in our portfolio unless requested otherwise by the client.",
        ],
      },
    ],
  },
  {
    heading: "Data Retention",
    blocks: [
      { type: "p", text: "We retain personal information only as long as necessary to:" },
      {
        type: "ul",
        items: ["Complete projects", "Provide support", "Meet legal requirements", "Resolve disputes", "Improve our services"],
      },
    ],
  },
  {
    heading: "Your Rights",
    blocks: [
      { type: "p", text: "You have the right to:" },
      {
        type: "ul",
        items: [
          "Access your personal information",
          "Request corrections",
          "Request deletion of your data",
          "Withdraw consent where applicable",
          "Request a copy of your information",
          "Contact us regarding privacy concerns",
        ],
      },
    ],
  },
  {
    heading: "Third-Party Links",
    blocks: [
      { type: "p", text: "Our website may contain links to external websites." },
      { type: "p", text: "We are not responsible for the privacy practices or content of those websites." },
    ],
  },
  {
    heading: "Changes to This Privacy Policy",
    blocks: [
      { type: "p", text: "FAAH Technology may update this Privacy Policy at any time." },
      { type: "p", text: "Changes will be posted on this page with the updated revision date." },
    ],
  },
  {
    heading: "Contact Us",
    blocks: [
      { type: "p", text: "If you have any questions regarding this Privacy Policy, please contact us." },
      {
        type: "ul",
        items: [
          "FAAH Technology",
          "Email: hztechnology999@gmail.com",
          "Phone / WhatsApp: +92 345 5163 857",
          <>
            Website:{" "}
            <a href="https://faahtechnology.com" className="text-gold hover:underline">
              faahtechnology.com
            </a>
          </>,
        ],
      },
    ],
  },
  {
    heading: "Consent",
    blocks: [
      {
        type: "p",
        text: "By using our website, you acknowledge that you have read, understood, and agree to this Privacy Policy.",
      },
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="section">
          <p className="flex items-center justify-center gap-3 text-xs font-semibold tracking-[0.25em] text-gold">
            <span aria-hidden className="h-px w-5 bg-gradient-to-r from-transparent to-gold" />
            LEGAL
            <span aria-hidden className="h-px w-5 bg-gradient-to-l from-transparent to-gold" />
          </p>
          <h1 className="mt-3 text-center font-display text-3xl font-semibold text-ink sm:text-4xl">
            Privacy <span className="text-gold">Policy</span>
          </h1>

          <div className="mt-12">
            <LegalContent
              lastUpdated="July 2026"
              intro={
                <>
                  Welcome to FAAH Technology. Your privacy is important to us. This Privacy Policy explains how we
                  collect, use, protect, and disclose your information when you visit our website or use our
                  services.
                  <br />
                  <br />
                  By accessing our website, you agree to the practices described in this Privacy Policy.
                </>
              }
              sections={SECTIONS}
              closing={{
                heading: "Our Commitment",
                text: "At FAAH Technology, we value your trust and are committed to protecting your privacy. Whether you need Graphic Design, Website Development, Mobile App Development, or Custom Desktop Software, your information is handled with professionalism, confidentiality, and the highest standards of security.",
              }}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
