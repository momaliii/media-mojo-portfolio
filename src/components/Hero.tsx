
import React from "react";
import HeroContent from "./hero/HeroContent";
import HeroVisualization from "./hero/HeroVisualization";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-media-blue/20 to-white overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 z-0"></div>
      
      <div className="container mx-auto px-4 md:px-6 py-10 pt-24 md:pt-32 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <HeroContent />
          <HeroVisualization />
        </div>
      </div>
      
      {/* Animated blob shapes */}
      <div className="hidden md:block absolute -top-24 -right-24 w-64 h-64 bg-media-purple/10 rounded-full filter blur-3xl animate-float"></div>
      <div className="hidden md:block absolute top-1/2 -left-32 w-80 h-80 bg-media-oceanblue/10 rounded-full filter blur-3xl animate-float animate-delay-500"></div>
      
      {/* Additional visual elements */}
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-media-pink/10 rounded-full filter blur-2xl animate-float animate-delay-300"></div>
      <div className="absolute bottom-20 left-10 w-20 h-20 bg-media-peach/30 rounded-full filter blur-xl animate-float animate-delay-200"></div>
      
      {/* Wave shape divider */}
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
