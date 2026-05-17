import React from "react";
import { motion } from "framer-motion";

const PortfolioHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-20 md:mb-28"
    >
      <div className="md:col-span-3">
        <p className="eyebrow text-gold mb-4">— 01</p>
        <p className="font-mono uppercase text-[0.6875rem] tracking-[0.22em] text-white/40">
          Selected Work / 2018—{new Date().getFullYear()}
        </p>
      </div>
      <h2
        id="portfolio-heading"
        className="md:col-span-9 font-serif text-display-lg text-white leading-[1.02]"
      >
        Campaigns I&apos;ve scaled —{" "}
        <span className="serif-italic text-gold">profitably</span> — across
        beauty, food, fashion, and finance.
      </h2>
    </motion.div>
  );
};

export default PortfolioHeader;
