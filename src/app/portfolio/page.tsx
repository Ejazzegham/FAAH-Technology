import Navbar from "@/components/Navbar";
import PortfolioHero from "@/components/PortfolioHero";
import PortfolioGrid from "@/components/PortfolioGrid";
import PortfolioStatsCta from "@/components/PortfolioStatsCta";
import Footer from "@/components/Footer";
import { getAllProjects } from "@/lib/projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio — HZ Technology",
  description:
    "Explore HZ Technology's recent projects across graphic design, web, mobile, and desktop software development.",
  alternates: { canonical: "/portfolio" },
};

export default async function PortfolioPage() {
  const projects = await getAllProjects();

  return (
    <>
      <Navbar active="Portfolio" />
      <main>
        <PortfolioHero />
        <PortfolioGrid projects={projects} />
        <PortfolioStatsCta />
      </main>
      <Footer />
    </>
  );
}
