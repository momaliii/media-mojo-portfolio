
import React, { useEffect, useState } from "react";
import HeroContent from "./hero/HeroContent";
import HeroVisualization from "./hero/HeroVisualization";
import { motion } from "framer-motion";
import { getHeroContent, HeroContent as HeroContentType } from "../utils/contentManager";

const Hero = () => {
  const [content, setContent] = useState<HeroContentType>(getHeroContent());

  // Re-fetch content when component mounts or when localStorage might have changed
  useEffect(() => {
    const handleStorageChange = () => {
      setContent(getHeroContent());
    };

    // Listen for storage events (when content is updated in another tab/window)
    window.addEventListener('storage', handleStorageChange);
    
    // Check for updates every 2 seconds (in case changes are made in the same tab)
    const intervalId = setInterval(() => {
      setContent(getHeroContent());
    }, 2000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center bg-gradient-to-br from-media-blue/20 to-white overflow-hidden">
      {/* Enhanced grid pattern background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 z-0"></div>
      
      {/* Hero content container */}
      <div className="container mx-auto px-4 md:px-6 py-10 pt-24 md:pt-32 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <HeroContent content={content} />
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <HeroVisualization stats={content.stats} />
          </motion.div>
        </div>
      </div>
      
      {/* Enhanced animated blob shapes */}
      <div className="hidden md:block absolute -top-24 -right-24 w-72 h-72 bg-media-purple/10 rounded-full filter blur-3xl animate-float"></div>
      <div className="hidden md:block absolute top-1/2 -left-32 w-96 h-96 bg-media-oceanblue/10 rounded-full filter blur-3xl animate-float animate-delay-500"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-media-pink/10 rounded-full filter blur-2xl animate-float animate-delay-300"></div>
      <div className="absolute bottom-20 left-10 w-24 h-24 bg-media-peach/30 rounded-full filter blur-xl animate-float animate-delay-200"></div>
      
      {/* Enhanced decorative elements */}
      <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-media-purple/30 rounded-full"></div>
      <div className="absolute bottom-1/3 left-1/4 w-4 h-4 bg-media-oceanblue/30 rounded-full"></div>
      
      {/* Enhanced wave shape divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg 
          className="relative block w-full h-12 md:h-24" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
          fill="white"
        >
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
