
import React from "react";
import { motion } from "framer-motion";

const PortfolioHeader = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto text-center mb-16"
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="inline-flex items-center justify-center mb-6"
      >
        <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full border border-media-purple/20 bg-gradient-to-r from-media-purple/10 to-media-oceanblue/10 text-media-purple font-semibold text-[11px] uppercase tracking-[0.22em] shadow-sm backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-media-purple animate-pulse" />
          Recent Work
        </span>
      </motion.div>
      <h2 className="text-4xl md:text-6xl font-bold mb-7 tracking-[-0.03em] leading-[1.02]">
        Featured <span className="gradient-text">Case Studies</span>
      </h2>
      <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg leading-[1.75]">
        Delivering exceptional results across multiple industries, managing campaigns 
        in Saudi Arabia, Egypt, Kuwait, Qatar, Turkey, China, UK, and the U.S.
      </p>
      <motion.div 
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="flex items-center justify-center mt-8 space-x-2"
      >
        <span className="h-1.5 w-4 bg-media-purple/30 rounded-full"></span>
        <span className="h-2 w-20 bg-gradient-to-r from-media-purple to-media-oceanblue rounded-full"></span>
        <span className="h-1.5 w-4 bg-media-oceanblue/30 rounded-full"></span>
      </motion.div>
    </motion.div>
  );
};

export default PortfolioHeader;
