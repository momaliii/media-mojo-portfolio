
import React from "react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Client } from "@/data/clients/types";
import { Image } from "lucide-react";

type ClientCardProps = {
  client: Client;
};

const ClientCard: React.FC<ClientCardProps> = ({ client }) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="group relative overflow-hidden p-6 h-full flex flex-col items-center justify-center border-0 hover:border hover:border-media-purple/20 transition-all duration-300 hover:shadow-xl bg-white/60 backdrop-blur-sm rounded-2xl">
        {/* Glass effect background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Accent border gradient */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-media-purple/40 to-media-oceanblue/40 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
        
        <div className="w-28 h-28 flex items-center justify-center mb-4 relative">
          {client.logo ? (
            <img 
              src={client.logo} 
              alt={client.alt} 
              className="max-w-full max-h-full object-contain opacity-75 group-hover:opacity-100 transition-all duration-300 grayscale group-hover:grayscale-0 relative z-10" 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-50/80 rounded-xl">
              <Image className="w-8 h-8 text-gray-300" />
            </div>
          )}
        </div>
        
        <div className="text-center mt-auto relative z-10">
          <p className="font-semibold text-sm text-gray-700 mb-2 line-clamp-1 group-hover:text-media-purple transition-colors">
            {client.name}
          </p>
          <span className="inline-block px-3 py-1 bg-gray-50/80 group-hover:bg-media-purple/5 rounded-full text-xs text-gray-500 font-medium transition-colors">
            {client.industry}
          </span>
        </div>
      </Card>
    </motion.div>
  );
};

export default ClientCard;
