
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
        <span className="inline-block py-1.5 px-4 rounded-full bg-gradient-to-r from-media-purple/20 to-media-oceanblue/20 text-media-purple font-medium text-sm shadow-sm">
          About Me
        </span>
      </motion.div>
      
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-4xl md:text-5xl font-bold mb-6 tracking-tight"
      >
        Delivering <span className="gradient-text">Data-Driven</span> Excellence
      </motion.h2>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-gray-600 max-w-2xl mx-auto text-lg"
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
