
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
    </section>
  );
};

export default Hero;
