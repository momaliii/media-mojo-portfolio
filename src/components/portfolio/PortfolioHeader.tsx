
import React from "react";
import { motion } from "framer-motion";

const PortfolioHeader = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto text-center mb-12 md:mb-16"
    >
      <div className="inline-flex items-center justify-center mb-5">
        <span className="inline-block py-1.5 px-4 rounded-full bg-gradient-to-r from-media-purple/20 to-media-oceanblue/20 text-media-purple font-medium text-sm shadow-sm">
          Recent Work
        </span>
      </div>
      <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
        Featured <span className="gradient-text">Case Studies</span>
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto text-lg">
        Delivering exceptional results across multiple industries, managing campaigns in Saudi Arabia, Egypt, Kuwait, Qatar, Turkey, China, UK, and the U.S.
      </p>
      <div className="flex items-center justify-center mt-6 space-x-1">
        <span className="h-1 w-3 bg-media-purple/30 rounded-full"></span>
        <span className="h-1.5 w-16 bg-gradient-to-r from-media-purple to-media-oceanblue rounded-full"></span>
        <span className="h-1 w-3 bg-media-oceanblue/30 rounded-full"></span>
      </div>
    </motion.div>
  );
};

export default PortfolioHeader;
