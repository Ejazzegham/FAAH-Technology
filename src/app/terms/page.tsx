import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LegalContent, { type LegalSection } from "@/components/LegalContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — HZ Technology",
  description:
    "Read the Terms of Service governing your use of the HZ Technology website and our graphic design, web, mobile, and custom software services.",
  alternates: { canonical: "/terms" },
};

const SECTIONS: LegalSection[] = [
  {
    heading: "About HZ Technology",
    blocks: [
      { type: "p", text: "HZ Technology provides professional digital services, including but not limited to:" },
      {
        type: "ul",
        items: [
          "Graphic Design",
          "Website Design & Development",
          "Mobile App Design & Development",
          "Custom Desktop Software Development",
          "UI/UX Design",
          "Branding & Identity Design",
          "Business Automation Solutions",
          "Technical Support & Maintenance",
        ],
      },
    ],
  },
  {
    heading: "Acceptance of Terms",
    blocks: [
      { type: "p", text: "By using our website or requesting our services, you confirm that:" },
      {
        type: "ul",
        items: [
          "You are at least 18 years old or have permission from a parent or legal guardian.",
          "The information you provide is accurate and complete.",
          "You will use our website only for lawful purposes.",
        ],
      },
    ],
  },
  {
    heading: "Our Services",
    blocks: [
      {
        type: "ul",
        items: [
          "Every project is customized according to the client's requirements.",
          "Project timelines, pricing, features, and deliverables will be confirmed before development begins.",
          "Any additional features requested after project approval may require additional time and cost.",
        ],
      },
    ],
  },
  {
    heading: "Project Requirements",
    blocks: [
      { type: "p", text: "Clients are responsible for providing:" },
      {
        type: "ul",
        items: [
          "Business information",
          "Content",
          "Images",
          "Logos",
          "Brand guidelines",
          "Required documents",
          "Feedback within a reasonable timeframe",
        ],
      },
      { type: "p", text: "Project delays caused by missing client information may affect delivery schedules." },
    ],
  },
  {
    heading: "Payments",
    blocks: [
      { type: "p", text: "Unless otherwise agreed:" },
      {
        type: "ul",
        items: [
          "A deposit may be required before work begins.",
          "Remaining payments are due according to the agreed payment schedule.",
          "Final project files may be delivered after full payment has been received.",
          "Late payments may delay project completion or delivery.",
        ],
      },
    ],
  },
  {
    heading: "Revisions",
    blocks: [
      {
        type: "ul",
        items: [
          "We include revisions according to the agreed project scope.",
          "Requests that significantly change the original project requirements may be treated as additional work and quoted separately.",
        ],
      },
    ],
  },
  {
    heading: "Project Delivery",
    blocks: [
      { type: "p", text: "Project delivery dates are estimates and may vary depending on:" },
      {
        type: "ul",
        items: [
          "Project complexity",
          "Client feedback",
          "Scope changes",
          "Third-party service delays",
          "Technical issues beyond our control",
        ],
      },
      { type: "p", text: "We strive to deliver all projects on time while maintaining quality." },
    ],
  },
  {
    heading: "Intellectual Property",
    blocks: [
      { type: "p", text: "Unless otherwise agreed in writing:" },
      {
        type: "ul",
        items: [
          "Clients receive ownership of the final approved deliverables after full payment.",
          "HZ Technology retains ownership of any pre-existing tools, frameworks, templates, libraries, or reusable code used during development.",
          "We may showcase completed work in our portfolio unless the client requests confidentiality in writing.",
        ],
      },
    ],
  },
  {
    heading: "Client Responsibilities",
    blocks: [
      { type: "p", text: "Clients agree to:" },
      {
        type: "ul",
        items: [
          "Provide accurate information.",
          "Respond to feedback requests promptly.",
          "Ensure they have the necessary rights to any content, images, logos, or materials they provide.",
          "Use our services lawfully.",
        ],
      },
    ],
  },
  {
    heading: "Prohibited Use",
    blocks: [
      { type: "p", text: "You agree not to use our services to create or promote:" },
      {
        type: "ul",
        items: [
          "Illegal activities",
          "Fraudulent schemes",
          "Malware or malicious software",
          "Copyright infringement",
          "Hate speech or discrimination",
          "Spam or phishing campaigns",
          "Content that violates applicable laws",
        ],
      },
      {
        type: "p",
        text: "HZ Technology reserves the right to refuse projects that conflict with our policies or applicable law.",
      },
    ],
  },
  {
    heading: "Third-Party Services",
    blocks: [
      { type: "p", text: "Projects may include integrations with third-party services such as:" },
      {
        type: "ul",
        items: ["Payment gateways", "Cloud hosting", "APIs", "Email services", "Analytics tools", "Social media platforms"],
      },
      {
        type: "p",
        text: "We are not responsible for outages, policy changes, pricing changes, or service interruptions caused by third-party providers.",
      },
    ],
  },
  {
    heading: "Support & Maintenance",
    blocks: [
      {
        type: "ul",
        items: [
          "Support services are provided according to the agreed package or maintenance plan.",
          "Future updates, feature requests, and enhancements may require a separate agreement.",
        ],
      },
    ],
  },
  {
    heading: "Warranty",
    blocks: [
      { type: "p", text: "We aim to deliver high-quality work that meets the agreed specifications." },
      {
        type: "p",
        text: 'Except where required by law, our services are provided "as is," and we do not guarantee uninterrupted operation or that every service will meet every expectation without limitations.',
      },
    ],
  },
  {
    heading: "Limitation of Liability",
    blocks: [
      {
        type: "p",
        text: "To the fullest extent permitted by law, HZ Technology is not liable for indirect, incidental, special, or consequential damages, including loss of profits, data, or business opportunities arising from the use of our services.",
      },
      {
        type: "p",
        text: "Our total liability relating to a project will not exceed the amount paid by the client for that project, except where applicable law provides otherwise.",
      },
    ],
  },
  {
    heading: "Confidentiality",
    blocks: [
      {
        type: "p",
        text: "We treat all client information, project files, business documents, and source materials as confidential.",
      },
      { type: "p", text: "We will not disclose confidential information without the client's permission unless required by law." },
    ],
  },
  {
    heading: "Cancellation",
    blocks: [
      { type: "p", text: "Clients may cancel a project by providing written notice." },
      {
        type: "p",
        text: "Any work completed before cancellation may be billed, and deposits may be non-refundable unless otherwise agreed.",
      },
    ],
  },
  {
    heading: "Refund Policy",
    blocks: [
      { type: "p", text: "Refunds are evaluated on a case-by-case basis." },
      { type: "p", text: "Refunds generally are not available for completed work or services already delivered." },
    ],
  },
  {
    heading: "Privacy",
    blocks: [
      {
        type: "p",
        text: (
          <>
            Your use of our website is also governed by our{" "}
            <Link href="/privacy" className="text-gold hover:underline">
              Privacy Policy
            </Link>
            , which explains how we collect, use, and protect your information.
          </>
        ),
      },
    ],
  },
  {
    heading: "Changes to These Terms",
    blocks: [
      { type: "p", text: "HZ Technology may update these Terms of Service from time to time." },
      { type: "p", text: "The latest version will always be available on this page, with the updated revision date." },
    ],
  },
  {
    heading: "Governing Law",
    blocks: [
      {
        type: "p",
        text: "These Terms are governed by the laws applicable in the jurisdiction where HZ Technology operates, unless another governing law is agreed in writing or required by applicable law.",
      },
    ],
  },
  {
    heading: "Contact Information",
    blocks: [
      { type: "p", text: "If you have questions regarding these Terms of Service, please contact us." },
      {
        type: "ul",
        items: [
          "HZ Technology",
          "Email: hztechnology999@gmail.com",
          "Phone / WhatsApp: +92 345 5163 857",
          <>
            Website:{" "}
            <a href="https://hztechnology.com" className="text-gold hover:underline">
              hztechnology.com
            </a>
          </>,
        ],
      },
    ],
  },
];

export default function TermsPage() {
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
          <h1 className="mt-3 text-center font-display text-3xl font-semibold text-white sm:text-4xl">
            Terms of <span className="text-gold">Service</span>
          </h1>

          <div className="mt-12">
            <LegalContent
              lastUpdated="July 2026"
              intro={
                <>
                  Welcome to HZ Technology. These Terms of Service (&ldquo;Terms&rdquo;) govern your use of our
                  website and the services we provide. By accessing our website or engaging our services, you
                  agree to these Terms. If you do not agree, please do not use our website or services.
                </>
              }
              sections={SECTIONS}
              closing={{
                heading: "Agreement",
                text: (
                  <>
                    By using the HZ Technology website or purchasing our services, you acknowledge that you have
                    read, understood, and agree to these Terms of Service.
                    <br />
                    <br />
                    <strong className="text-white">Our Commitment</strong> — At HZ Technology, we are committed to
                    delivering high-quality Graphic Design, Website Development, Mobile App Development, and
                    Custom Desktop Software Development services with professionalism, transparency, and
                    long-term client support. We value clear communication, fair business practices, and building
                    lasting relationships with our clients.
                  </>
                ),
              }}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
