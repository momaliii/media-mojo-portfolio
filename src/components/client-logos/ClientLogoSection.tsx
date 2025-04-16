
import React from "react";
import { motion } from "framer-motion";

type ClientLogoSectionProps = {
  title: React.ReactNode;
  description: string;
};

const ClientLogoSection: React.FC<ClientLogoSectionProps> = ({ title, description }) => {
  return (
    <div className="relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-1/4 w-32 h-32 bg-media-purple/5 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-media-oceanblue/5 rounded-full filter blur-xl"></div>
      
      <motion.div 
        className="text-center mb-10 max-w-3xl mx-auto relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex items-center justify-center mb-4">
          <span className="inline-block py-1.5 px-4 rounded-full bg-gradient-to-r from-media-purple/20 to-media-oceanblue/20 text-media-purple font-medium text-sm shadow-sm">
            Our Clients
          </span>
        </div>
        
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
          {title}
        </h2>
        
        <p className="text-gray-600 mx-auto text-lg max-w-2xl">
          {description}
        </p>
        
        <div className="flex items-center justify-center mt-6 space-x-1">
          <span className="h-1 w-3 bg-media-purple/40 rounded-full"></span>
          <span className="h-1.5 w-16 bg-gradient-to-r from-media-purple to-media-oceanblue rounded-full"></span>
          <span className="h-1 w-3 bg-media-oceanblue/40 rounded-full"></span>
        </div>
      </motion.div>
    </div>
  );
};

export default ClientLogoSection;
