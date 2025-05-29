import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import Testimonials from "./components/Testimonials";
import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import TechSpecs from "./components/TechSpecs";
import Contribute from "./components/contribute";
export default function Home() {
  return (
    <div className="min-h-screen bg-background dark:bg-[#050505] ">

      <NavBar />
      <Hero />
      <Testimonials />
      <TechSpecs />
      <Pricing />
      <Contribute />
      {/* <Download /> */}

      <FAQ />
      <Footer />
    </div>
  );
}
