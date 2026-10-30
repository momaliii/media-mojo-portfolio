import React, { useEffect } from "react";
import Navigation from "@/components/v2/Navigation";
import Hero from "@/components/v2/Hero";
import About from "@/components/v2/About";
import Portfolio from "@/components/v2/Portfolio";
import Contact from "@/components/v2/Contact";
import Footer from "@/components/v2/Footer";
import Services from "@/components/v2/Services";
import ErrorBoundary from "@/components/ErrorBoundary";
import LogoStrip from "@/components/v2/social-proof/LogoStrip";
import Testimonials from "@/components/v2/social-proof/Testimonials";
import { useScrollObserver } from "@/hooks/use-scroll-observer";
import { trackPageView } from "@/utils/analytics";
import MetaTags from "@/components/MetaTags";
import StructuredData from "@/components/StructuredData";

const IndexV2 = () => {
  const { activeSection } = useScrollObserver();

  useEffect(() => {
    trackPageView("/v2", "Mohamed Ali — Senior Media Buyer (v2)");
  }, []);

  return (
    <div className="v2-theme dark min-h-screen bg-obsidian text-white selection:bg-gold/30">
      <MetaTags title="Mohamed Ali — Senior Media Buyer | Luxury Portfolio" url="/v2" />
      <StructuredData />
      <Navigation activeSection={activeSection} />
      <main id="main-content" tabIndex={-1} aria-label="Main content">
        <ErrorBoundary>
          <Hero />
        </ErrorBoundary>

        <ErrorBoundary>
          <LogoStrip />
        </ErrorBoundary>

        <ErrorBoundary>
          <Portfolio />
        </ErrorBoundary>

        <ErrorBoundary>
          <Services />
        </ErrorBoundary>

        <ErrorBoundary>
          <Testimonials />
        </ErrorBoundary>

        <ErrorBoundary>
          <About />
        </ErrorBoundary>

        <ErrorBoundary>
          <Contact />
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
};

export default IndexV2;
