import React, { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Services from "@/components/Services";
import GlobalPresence from "@/components/countries/GlobalPresence";
import ErrorBoundary from "@/components/ErrorBoundary";
import LogoStrip from "@/components/social-proof/LogoStrip";
import Testimonials from "@/components/social-proof/Testimonials";
import { useScrollObserver } from "@/hooks/use-scroll-observer";
import { trackPageView } from "@/utils/analytics";
import StructuredData from "@/components/StructuredData";
import MetaTags from "@/components/MetaTags";

const Index = () => {
  const { activeSection } = useScrollObserver();

  useEffect(() => {
    trackPageView("/", document.title);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <MetaTags />
      <StructuredData />
      <Navigation activeSection={activeSection} />
      <main
        id="main-content"
        className="overflow-hidden"
        tabIndex={-1}
        aria-label="Main content"
      >
        <ErrorBoundary>
          <Hero />
        </ErrorBoundary>

        <ErrorBoundary>
          <LogoStrip />
        </ErrorBoundary>

        <ErrorBoundary>
          <div id="portfolio-section">
            <Portfolio />
          </div>
        </ErrorBoundary>

        <ErrorBoundary>
          <div id="services-section">
            <Services />
          </div>
        </ErrorBoundary>

        <ErrorBoundary>
          <div id="testimonials-section">
            <Testimonials />
          </div>
        </ErrorBoundary>

        <ErrorBoundary>
          <div id="about-section">
            <About />
          </div>
        </ErrorBoundary>

        <ErrorBoundary>
          <div id="countries-section">
            <GlobalPresence />
          </div>
        </ErrorBoundary>

        <ErrorBoundary>
          <div id="contact-section">
            <Contact />
          </div>
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
