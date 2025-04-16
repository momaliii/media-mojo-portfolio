
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
      whileHover={{ y: -5, scale: 1.03 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="p-5 h-full flex flex-col items-center justify-center border border-gray-100 hover:border-media-purple/40 transition-all hover:shadow-lg group bg-white rounded-xl">
        <div className="w-20 h-20 flex items-center justify-center mb-4 overflow-hidden">
          {client.logo ? (
            <img 
              src={client.logo} 
              alt={client.alt} 
              className="max-w-full max-h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0" 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-md">
              <Image className="w-6 h-6 text-gray-300" />
            </div>
          )}
        </div>
        <div className="text-center mt-auto">
          <p className="font-medium text-sm text-gray-700 mb-1.5 line-clamp-1">{client.name}</p>
          <span className="inline-block px-2.5 py-0.5 bg-gray-50 rounded-full text-[10px] text-gray-500 font-medium">
            {client.industry}
          </span>
        </div>
      </Card>
    </motion.div>
  );
};

export default ClientCard;
