
import React, { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import ClientLogos from "@/components/ClientLogos";
import Platforms from "@/components/Platforms";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Services from "@/components/Services";

const Index = () => {
  useEffect(() => {
    // Update document title
    document.title = "Mohamed Ali | Senior Media Buyer";
    
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
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <ClientLogos />
        <Platforms />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
