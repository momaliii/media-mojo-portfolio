
import React from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const AboutProfile = () => {
  return (
    <div className="flex items-center gap-4 mb-6">
      <Avatar className="h-16 w-16 border-2 border-media-purple/20">
        <AvatarImage src="/lovable-uploads/900c6176-4030-4244-a97a-62a4c235d53f.png" alt="Mohamed Ali" />
        <AvatarFallback className="text-xl font-bold text-media-purple bg-media-purple/10">
          MA
        </AvatarFallback>
      </Avatar>
      <div>
        <h3 className="text-2xl font-semibold">Mohamed Ali</h3>
        <p className="text-media-purple">Senior Media Buyer</p>
      </div>
    </div>
  );
};

export default AboutProfile;
