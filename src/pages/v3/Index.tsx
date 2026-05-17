import React, { useEffect } from "react";
import Navigation from "@/components/v3/Navigation";
import Hero from "@/components/v3/Hero";
import LogoStrip from "@/components/v3/LogoStrip";
import ClientLogos from "@/components/v3/ClientLogos";
import Portfolio from "@/components/v3/Portfolio";
import Services from "@/components/v3/Services";
import Testimonials from "@/components/v3/Testimonials";
import About from "@/components/v3/About";
import Contact from "@/components/v3/Contact";
import Footer from "@/components/v3/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ScrollProgress } from "@/components/v3/_primitives";
import { useScrollObserver } from "@/hooks/use-scroll-observer";
import { trackPageView } from "@/utils/analytics";

const IndexV3 = () => {
  const { activeSection } = useScrollObserver();

  useEffect(() => {
    trackPageView("/v3", "Mohamed Ali — Y2K");
    document.title = "Mohamed Ali // Senior Media Buyer";
  }, []);

  return (
    <div className="v3-theme min-h-screen" style={{ backgroundColor: "var(--v3-bg)" }}>
      <ScrollProgress />
      <Navigation activeSection={activeSection} />
      <main id="main-content" tabIndex={-1} aria-label="Main content">
        <ErrorBoundary><Hero /></ErrorBoundary>
        <ErrorBoundary><LogoStrip /></ErrorBoundary>
        <ErrorBoundary><ClientLogos /></ErrorBoundary>
        <ErrorBoundary><Portfolio /></ErrorBoundary>
        <ErrorBoundary><Services /></ErrorBoundary>
        <ErrorBoundary><Testimonials /></ErrorBoundary>
        <ErrorBoundary><About /></ErrorBoundary>
        <ErrorBoundary><Contact /></ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
};

export default IndexV3;
