
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";

const ProfileLogo = () => {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.6
      }}
      whileHover={{ scale: 1.05 }}
      className="relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-media-purple/30 to-media-oceanblue/30 rounded-full blur-xl" />
      <Avatar className="h-32 w-32 border-4 border-white/80 shadow-xl relative bg-gradient-to-br from-media-purple/10 to-media-oceanblue/10">
        <AvatarImage 
          src="/lovable-uploads/900c6176-4030-4244-a97a-62a4c235d53f.png" 
          alt="Mohamed Ali" 
          className="object-cover"
        />
        <AvatarFallback className="text-3xl font-bold text-media-purple bg-media-purple/10">
          MA
        </AvatarFallback>
      </Avatar>
    </motion.div>
  );
};

export default ProfileLogo;
