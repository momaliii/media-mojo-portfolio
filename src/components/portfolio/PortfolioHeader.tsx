
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
        initial={{ scale: 0.95 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="inline-flex items-center justify-center mb-6"
      >
        <span className="inline-block py-2 px-5 rounded-full bg-gradient-to-r from-media-purple/20 to-media-oceanblue/20 text-media-purple font-medium text-sm shadow-md backdrop-blur-sm">
          Recent Work
        </span>
      </motion.div>
      <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">
        Featured <span className="gradient-text">Case Studies</span>
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
        Delivering exceptional results across multiple industries, managing campaigns in Saudi Arabia, Egypt, Kuwait, Qatar, Turkey, China, UK, and the U.S.
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
