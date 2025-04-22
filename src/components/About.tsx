
import React from "react";
import AboutHeader from "./about/AboutHeader";
import AboutStats from "./about/AboutStats";
import AboutProfile from "./about/AboutProfile";
import AboutApproach from "./about/AboutApproach";
import AboutVisual from "./about/AboutVisual";

const About = () => {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white" />
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      
      <div className="container mx-auto px-4 md:px-6 relative">
        <AboutHeader />
        <AboutStats />
        
        {/* About Content with improved layout and animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <AboutProfile />
            <AboutApproach />
          </div>
          <AboutVisual />
        </div>
      </div>
    </section>
  );
};

export default About;
