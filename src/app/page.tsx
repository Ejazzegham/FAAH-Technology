import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar active="Home" />
      <main>
        <Hero />
        <Categories />
        <About />
        <Projects />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
