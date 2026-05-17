
import React, { useEffect, lazy, Suspense } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Services from "@/components/Services";
import GlobalPresence from "@/components/countries/GlobalPresence";
import ErrorBoundary from "@/components/ErrorBoundary";
import NewsletterSubscription from "@/components/newsletter/NewsletterSubscription";
import { useScrollObserver } from "@/hooks/use-scroll-observer";
import { trackPageView } from "@/utils/analytics";
import StructuredData from "@/components/StructuredData";
import MetaTags from "@/components/MetaTags";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";

const ElevenLabsWidget = lazy(() => import("@/components/voice-agent/ElevenLabsWidget"));

// Component to handle animations when elements enter viewport
const AnimatedSection = ({ children, id, className = "" }: { 
  children: React.ReactNode; 
  id?: string; 
  className?: string;
}) => {
  return (
    <div id={id} className={`opacity-0 animate-on-scroll ${className}`}>
      {children}
    </div>
  );
};

const Index = () => {
  const { activeSection } = useScrollObserver();

  useEffect(() => {
    // Track initial page view (title managed by MetaTags component)
    trackPageView('/', document.title);
    
    // Add animation to elements when they enter viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
            entry.target.classList.remove("opacity-0");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "50px",
        threshold: 0.1,
      }
    );

    // Observe only elements with animate-on-scroll class (scoped to avoid performance issues)
    const animatedElements = document.querySelectorAll(".animate-on-scroll");
    animatedElements.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      // Clean up
      animatedElements.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <MetaTags />
      <StructuredData />
      <Navigation activeSection={activeSection} />
      <main id="main-content" className="overflow-hidden" tabIndex={-1} aria-label="Main content">
        <ErrorBoundary>
          <Hero />
        </ErrorBoundary>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/50 to-white dark:from-gray-950 dark:via-gray-900/50 dark:to-gray-950 pointer-events-none" />
          <ErrorBoundary>
            <AnimatedSection id="about-section">
              <About />
            </AnimatedSection>
          </ErrorBoundary>
        </div>
        {/* New Countries Section */}
        <ErrorBoundary>
          <AnimatedSection id="countries-section">
            <GlobalPresence />
          </AnimatedSection>
        </ErrorBoundary>
        <ErrorBoundary>
          <AnimatedSection id="services-section">
            <Services />
          </AnimatedSection>
        </ErrorBoundary>
        <ErrorBoundary>
          <AnimatedSection id="portfolio-section">
            <Portfolio />
          </AnimatedSection>
        </ErrorBoundary>
        <ErrorBoundary>
          <AnimatedSection id="contact-section">
            <Contact />
          </AnimatedSection>
        </ErrorBoundary>
        <ErrorBoundary>
          <AnimatedSection id="newsletter-section">
            <NewsletterSubscription />
          </AnimatedSection>
        </ErrorBoundary>
      </main>
      <Footer />
      
      {/* Add the ElevenLabs Conversational AI Widget - Lazy loaded for performance */}
      <ErrorBoundary>
        <Suspense fallback={null}>
          <ElevenLabsWidget />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default Index;
