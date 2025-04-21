
import React from "react";
import { motion } from "framer-motion";

type ClientLogoSectionProps = {
  title: React.ReactNode;
  description: string;
};

const ClientLogoSection: React.FC<ClientLogoSectionProps> = ({ title, description }) => {
  return (
    <div className="relative py-12">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/80 via-white to-gray-50/80"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-1/4 w-40 h-40 bg-media-purple/5 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-10 right-1/4 w-32 h-32 bg-media-oceanblue/5 rounded-full filter blur-2xl"></div>
      
      <motion.div 
        className="text-center max-w-4xl mx-auto px-4 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="inline-block mb-6"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <span className="inline-flex items-center px-5 py-2 rounded-full bg-gradient-to-r from-media-purple/10 to-media-oceanblue/10 text-media-purple font-medium text-sm shadow-sm border border-media-purple/10">
            Our Valued Partners
          </span>
        </motion.div>
        
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
          {title}
        </h2>
        
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>
        
        <div className="flex items-center justify-center mt-8 space-x-2">
          <span className="h-1 w-4 bg-media-purple/20 rounded-full"></span>
          <span className="h-1.5 w-20 bg-gradient-to-r from-media-purple to-media-oceanblue rounded-full"></span>
          <span className="h-1 w-4 bg-media-oceanblue/20 rounded-full"></span>
        </div>
      </motion.div>
    </div>
  );
};

export default ClientLogoSection;
