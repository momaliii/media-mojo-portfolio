
import React from "react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Client } from "@/data/clientsData";

type ClientCardProps = {
  client: Client;
};

const ClientCard: React.FC<ClientCardProps> = ({ client }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="p-5 flex flex-col items-center justify-center border border-gray-200 hover:border-media-purple/50 transition-all hover:shadow-lg h-full">
        <div className="w-24 h-24 flex items-center justify-center mb-4 overflow-hidden">
          <img 
            src={client.logo} 
            alt={client.alt} 
            className="max-w-full max-h-full object-contain" 
          />
        </div>
        <div className="text-center">
          <p className="font-medium text-sm mb-1">{client.name}</p>
          <span className="inline-block px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
            {client.industry}
          </span>
        </div>
      </Card>
    </motion.div>
  );
};

export default ClientCard;
