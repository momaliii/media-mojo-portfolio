
import React from "react";
import HeroContent from "./hero/HeroContent";
import HeroVisualization from "./hero/HeroVisualization";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative min-h-[100vh] min-h-[100dvh] flex items-center overflow-hidden bg-media-ink text-white"
      aria-labelledby="hero-heading"
    >
      {/* Subtle radial highlight + grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(99,102,241,0.18),transparent_55%),radial-gradient(circle_at_85%_85%,rgba(34,211,238,0.12),transparent_55%)]" />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, #000 50%, transparent 100%)",
        }}
      />

      {/* Single subtle accent blob — replaces 4 animated blobs */}
      <motion.div
        className="hidden md:block absolute top-1/3 -right-32 w-[28rem] h-[28rem] bg-media-vibrantpurple/20 rounded-full filter blur-3xl"
        animate={{ y: [0, 24, 0], scale: [1, 1.04, 1] }}
        transition={{ duration: 16, repeat: Infinity, repeatType: "reverse" }}
      />

      <div className="container mx-auto px-4 md:px-6 py-10 pt-24 md:pt-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <HeroContent />
          </motion.div>
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 sm:p-6 shadow-2xl">
              <HeroVisualization />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
