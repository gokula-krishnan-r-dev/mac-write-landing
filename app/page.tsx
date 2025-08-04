"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import NavBar from "./components/header";
import Hero from "./components/Hero";

// Component loading fallbacks
const ComponentLoader = () => (
  <div className="flex items-center justify-center py-16">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

// Optimized dynamic imports with better loading strategies
const Features = dynamic(() => import("./components/Features"), {
  ssr: false,
  loading: ComponentLoader,
});

const DemoVideos = dynamic(() => import("./components/DemoVideos"), {
  ssr: false,
  loading: ComponentLoader,
});

const Testimonials = dynamic(() => import("./components/Testimonials"), {
  ssr: false,
  loading: ComponentLoader,
});

const TechSpecs = dynamic(() => import("./components/TechSpecs"), {
  ssr: false,
  loading: ComponentLoader,
});

const Contribute = dynamic(() => import("./components/contribute"), {
  ssr: false,
  loading: ComponentLoader,
});

const Pricing = dynamic(() => import("./components/Pricing"), {
  ssr: false,
  loading: ComponentLoader,
});

const FAQ = dynamic(() => import("./components/FAQ"), {
  ssr: false,
  loading: ComponentLoader,
});

const Footer = dynamic(() => import("./components/Footer"), {
  ssr: false,
  loading: ComponentLoader,
});

export default function Home() {
  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Macwrite Beta",
            "description": "AI Writing Assistant for Mac - Write faster emails, Slack replies, Jira tickets, proofread and more.",
            "operatingSystem": "macOS",
            "applicationCategory": "ProductivityApplication",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock"
            },
            "author": {
              "@type": "Organization",
              "name": "Macwrite Team"
            },
            "url": "https://www.macwrite.ai",
            "downloadUrl": "https://www.macwrite.ai/app/Macwrite.dmg",
            "screenshot": "https://www.macwrite.ai/og-image.jpg"
          })
        }}
      />
      
      <div className="min-h-screen bg-background dark:bg-[#050505] overflow-x-hidden">
        {/* Critical above-the-fold content */}
        <NavBar />
        <main role="main">
          <Hero />
          
          {/* Lazy-loaded sections with Suspense boundaries */}
          <Suspense fallback={<ComponentLoader />}>
            <Features />
          </Suspense>
          
          <Suspense fallback={<ComponentLoader />}>
            <DemoVideos />
          </Suspense>
          
          {/* <Suspense fallback={<ComponentLoader />}>
            <Testimonials />
          </Suspense> */}
          
          <Suspense fallback={<ComponentLoader />}>
            <TechSpecs />
          </Suspense>
          
          <Suspense fallback={<ComponentLoader />}>
            <Pricing />
          </Suspense>
          
          <Suspense fallback={<ComponentLoader />}>
            <Contribute />
          </Suspense>
          
          <Suspense fallback={<ComponentLoader />}>
            <FAQ />
          </Suspense>
        </main>
        
        <Suspense fallback={<ComponentLoader />}>
          <Footer />
        </Suspense>
      </div>
    </>
  );
}
