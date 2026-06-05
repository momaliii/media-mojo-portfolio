
import React from "react";
import { motion } from "framer-motion";

const AboutHeader = () => {
  return (
    <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center justify-center mb-5"
      >
        <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full border border-media-purple/20 bg-gradient-to-r from-media-purple/10 to-media-oceanblue/10 text-media-purple font-semibold text-[11px] uppercase tracking-[0.22em] shadow-sm backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-media-purple" />
          About Me
        </span>
      </motion.div>
      
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-4xl md:text-6xl font-bold mb-6 tracking-[-0.03em] leading-[1.02]"
      >
        Delivering <span className="gradient-text">Data-Driven</span> Excellence
      </motion.h2>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg leading-[1.7]"
      >
        Senior Media Buyer specializing in optimizing paid media campaigns across platforms, driving growth and engagement across diverse industries internationally.
      </motion.p>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex items-center justify-center mt-6 space-x-1"
      >
        <span className="h-1 w-3 bg-media-purple/30 rounded-full"></span>
        <span className="h-1.5 w-16 bg-gradient-to-r from-media-purple to-media-oceanblue rounded-full"></span>
        <span className="h-1 w-3 bg-media-oceanblue/30 rounded-full"></span>
      </motion.div>
    </div>
  );
};

export default AboutHeader;
