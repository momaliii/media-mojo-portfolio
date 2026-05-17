
import React from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const AboutProfile = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-6 mb-8 p-6 bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-media-purple/20 to-media-oceanblue/20 rounded-full blur-xl transform-gpu" />
        <Avatar className="h-20 w-20 border-2 border-white shadow-xl relative">
          <AvatarImage src="/lovable-uploads/900c6176-4030-4244-a97a-62a4c235d53f.png" alt="Mohamed Ali" />
          <AvatarFallback className="text-2xl font-bold text-media-purple bg-media-purple/10">
            MA
          </AvatarFallback>
        </Avatar>
      </div>
      <div>
        <motion.h3 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl md:text-3xl font-bold mb-1"
        >
          Mohamed Ali
        </motion.h3>
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-media-purple font-medium"
        >
          Senior Media Buyer
        </motion.p>
      </div>
    </motion.div>
  );
};

export default AboutProfile;
