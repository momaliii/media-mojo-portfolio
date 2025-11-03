
import React from "react";
import HeroContent from "./hero/HeroContent";
import HeroVisualization from "./hero/HeroVisualization";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-[100vh] min-h-[100dvh] flex items-center overflow-hidden">
      {/* Full background layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-media-purple/10 via-media-blue/5 to-media-peach/5 z-0"></div>
      {/* Enhanced grid pattern background with animation */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 z-0"></div>
      
      {/* Hero content container */}
      <div className="container mx-auto px-4 md:px-6 py-10 pt-24 md:pt-32 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <HeroContent />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
            className="backdrop-blur-[2px] bg-white/30 p-4 sm:p-6 rounded-2xl shadow-2xl"
          >
            <HeroVisualization />
          </motion.div>
        </div>
      </div>
      
      {/* Enhanced animated blob shapes */}
      <motion.div 
        className="hidden md:block absolute -top-24 -right-24 w-72 h-72 bg-media-purple/10 rounded-full filter blur-3xl"
        animate={{ 
          y: [0, 20, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      ></motion.div>
      <motion.div 
        className="hidden md:block absolute top-1/2 -left-32 w-96 h-96 bg-media-oceanblue/10 rounded-full filter blur-3xl"
        animate={{ 
          y: [0, -30, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 18,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 2
        }}
      ></motion.div>
      <motion.div 
        className="absolute bottom-10 right-10 w-40 h-40 bg-media-pink/10 rounded-full filter blur-2xl"
        animate={{ 
          x: [0, 15, 0],
          y: [0, -15, 0]
        }}
        transition={{ 
          duration: 9,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      ></motion.div>
      <motion.div 
        className="absolute bottom-20 left-10 w-24 h-24 bg-media-peach/30 rounded-full filter blur-xl"
        animate={{ 
          x: [0, -10, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 7,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      ></motion.div>
      
      {/* Enhanced decorative elements */}
      <motion.div 
        className="absolute top-1/3 right-1/4 w-6 h-6 bg-media-purple/30 rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      ></motion.div>
      <motion.div 
        className="absolute bottom-1/3 left-1/4 w-4 h-4 bg-media-oceanblue/30 rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1
        }}
      ></motion.div>
      
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
