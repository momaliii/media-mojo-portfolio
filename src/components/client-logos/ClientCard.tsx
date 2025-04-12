
import React from "react";
import { Card } from "@/components/ui/card";
import { Client } from "@/data/clientsData";

type ClientCardProps = {
  client: Client;
};

const ClientCard: React.FC<ClientCardProps> = ({ client }) => {
  return (
    <Card className="p-4 flex flex-col items-center justify-center border border-gray-200 hover:border-media-purple/50 transition-all hover:shadow-md">
      <div className="w-20 h-20 flex items-center justify-center mb-3">
        <img 
          src={client.logo} 
          alt={client.alt} 
          className="max-w-full max-h-full object-contain" 
        />
      </div>
      <div className="text-center">
        <p className="font-medium text-sm">{client.name}</p>
        <p className="text-xs text-gray-500">{client.industry}</p>
      </div>
    </Card>
  );
};

export default ClientCard;
