
import React from "react";
import { motion } from "framer-motion";

type ClientLogoSectionProps = {
  title: React.ReactNode;
  description: string;
};

const ClientLogoSection: React.FC<ClientLogoSectionProps> = ({ title, description }) => {
  return (
    <div className="relative py-8">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-1/4 w-32 h-32 bg-blue-100/30 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-10 right-1/4 w-24 h-24 bg-indigo-100/30 rounded-full filter blur-xl"></div>
      
      <motion.div 
        className="text-center mb-10 max-w-3xl mx-auto relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex items-center justify-center mb-5">
          <span className="inline-block py-1.5 px-4 rounded-full bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-600 font-medium text-sm shadow-sm">
            Our Clients
          </span>
        </div>
        
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 tracking-tight text-gray-800">
          {title}
        </h2>
        
        <p className="text-gray-600 mx-auto text-lg max-w-2xl">
          {description}
        </p>
        
        <div className="flex items-center justify-center mt-6 space-x-1">
          <span className="h-1 w-3 bg-indigo-300 rounded-full"></span>
          <span className="h-1.5 w-16 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full"></span>
          <span className="h-1 w-3 bg-blue-300 rounded-full"></span>
        </div>
      </motion.div>
    </div>
  );
};

export default ClientLogoSection;
