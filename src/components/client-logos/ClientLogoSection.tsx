
import React from "react";
import { motion } from "framer-motion";

type ClientLogoSectionProps = {
  title: React.ReactNode;
  description: string;
};

const ClientLogoSection: React.FC<ClientLogoSectionProps> = ({ title, description }) => {
  return (
    <motion.div 
      className="text-center mb-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <span className="inline-block py-1 px-3 rounded-full bg-media-purple/10 text-media-purple font-medium text-sm mb-4">
        Our Clients
      </span>
      <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">
        {title}
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
        {description}
      </p>
      
      <div className="h-1 w-20 bg-gradient-to-r from-media-purple to-media-oceanblue mx-auto mt-6 rounded-full"></div>
    </motion.div>
  );
};

export default ClientLogoSection;
