"use client";

import dynamic from "next/dynamic";
import NavBar from "./components/header";
import Hero from "./components/Hero";

const Features = dynamic(() => import("./components/Features"), {
  ssr: false,
});

const DemoVideos = dynamic(() => import("./components/DemoVideos"), {
  ssr: false,
});

const Testimonials = dynamic(() => import("./components/Testimonials"), {
  ssr: false,
});

const TechSpecs = dynamic(() => import("./components/TechSpecs"), {
  ssr: false,
});
const Contribute = dynamic(() => import("./components/contribute"), {
  ssr: false,
});
const Pricing = dynamic(() => import("./components/Pricing"), {
  ssr: false,
});

const FAQ = dynamic(() => import("./components/FAQ"), {
  ssr: false,
});

const Footer = dynamic(() => import("./components/Footer"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="min-h-screen bg-background dark:bg-[#050505] ">
      <NavBar />
      <Hero />
      <Features />
      <DemoVideos />
      {/* <Testimonials /> */}
      <TechSpecs />
      <Pricing />
      <Contribute />
      {/* <Download /> */}
      <FAQ />
      <Footer />
    </div>
  );
}
