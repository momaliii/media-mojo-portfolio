import React, { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Services from "@/components/Services";
import ErrorBoundary from "@/components/ErrorBoundary";
import NewsletterSubscription from "@/components/newsletter/NewsletterSubscription";
import { useScrollObserver } from "@/hooks/use-scroll-observer";
import { trackPageView } from "@/utils/analytics";
import StructuredData from "@/components/StructuredData";

const Index = () => {
  const { activeSection } = useScrollObserver();

  useEffect(() => {
    // Update document title
    document.title = "Mohamed Ali | Senior Media Buyer";
    
    // Track initial page view
    trackPageView('/', document.title);
    
    // Add animation to elements when they enter viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    // Observe all elements with animate-on-scroll class
    document.querySelectorAll(".opacity-0").forEach((el) => {
      observer.observe(el);
    });

    return () => {
      // Clean up
      document.querySelectorAll(".opacity-0").forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <StructuredData />
      <Navigation activeSection={activeSection} />
      <main className="overflow-hidden">
        <ErrorBoundary>
          <Hero />
        </ErrorBoundary>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/50 to-white dark:from-gray-950 dark:via-gray-900/50 dark:to-gray-950 pointer-events-none" />
          <ErrorBoundary>
            <About />
          </ErrorBoundary>
        </div>
        <ErrorBoundary>
          <Services />
        </ErrorBoundary>
        <ErrorBoundary>
          <Portfolio />
        </ErrorBoundary>
        <ErrorBoundary>
          <Contact />
        </ErrorBoundary>
        <ErrorBoundary>
          <NewsletterSubscription />
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
