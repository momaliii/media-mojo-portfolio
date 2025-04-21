
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
      <Card className="group p-6 h-full flex flex-col items-center justify-center border border-gray-100/80 hover:border-media-purple/40 transition-all hover:shadow-lg bg-white/80 backdrop-blur-sm rounded-xl relative overflow-hidden">
        {/* Soft gradient accent */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="w-24 h-24 flex items-center justify-center mb-4 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50/80 to-white/40 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300" />
          
          {client.logo ? (
            <img 
              src={client.logo} 
              alt={client.alt} 
              className="max-w-full max-h-full object-contain opacity-80 group-hover:opacity-100 transition-all duration-300 grayscale group-hover:grayscale-0 relative z-10" 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-50/80 rounded-xl">
              <Image className="w-8 h-8 text-gray-300" />
            </div>
          )}
        </div>
        
        <div className="text-center mt-auto relative z-10">
          <p className="font-medium text-sm text-gray-700 mb-2 line-clamp-1 group-hover:text-media-purple transition-colors">
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
