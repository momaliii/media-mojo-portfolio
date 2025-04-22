
import React from "react";
import { motion } from "framer-motion";

const AboutVisual = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative h-[300px] md:h-[400px]"
    >
      <div className="absolute inset-0 grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="h-32 bg-gradient-to-br from-media-purple/80 to-media-pink/80 rounded-lg shadow-lg animate-float"></div>
          <div className="h-40 bg-white rounded-lg shadow-sm p-4">
            <div className="h-4 w-3/4 bg-media-purple/20 rounded mb-2"></div>
            <div className="h-2 w-full bg-gray-100 rounded mb-2"></div>
            <div className="h-2 w-5/6 bg-gray-100 rounded mb-2"></div>
            <div className="h-2 w-4/6 bg-gray-100 rounded mb-2"></div>
            <div className="h-12 w-full bg-gray-100 rounded mt-4"></div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="h-40 bg-white rounded-lg shadow-lg p-4">
            <div className="h-4 bg-media-oceanblue/20 rounded mb-4"></div>
            <div className="space-y-2">
              <div className="h-2 w-full bg-gray-100 rounded"></div>
              <div className="h-2 w-full bg-gray-100 rounded"></div>
              <div className="h-2 w-3/4 bg-gray-100 rounded"></div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="h-8 bg-gray-100 rounded"></div>
              <div className="h-8 bg-gray-100 rounded"></div>
              <div className="h-8 bg-gray-100 rounded"></div>
              <div className="h-8 bg-gray-100 rounded"></div>
            </div>
          </div>
          <div className="h-32 bg-gradient-to-br from-media-blue/80 to-media-oceanblue/80 rounded-lg shadow-lg animate-float animate-delay-200"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutVisual;
