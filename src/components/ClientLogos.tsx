
import React, { useState } from "react";
import { clientsData } from "@/data/clients";
import { motion } from "framer-motion";

const ClientLogos = () => {
  const [selectedIndustry, setSelectedIndustry] = useState("all");

  // Get unique industries
  const uniqueIndustries = ["all", ...Array.from(
    new Set(clientsData.map((client) => client.industry))
  ).sort()].slice(0, 6); // Limit to 6 industries for simplicity
  
  // Filter clients based on selected industry
  const filteredClients = clientsData.filter(client => {
    return selectedIndustry === "all" || client.industry === selectedIndustry;
  });

  return (
    <section className="py-12 bg-white" id="clients">
      <div className="container mx-auto px-4">
        {/* Simple Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Clients</h2>
          <p className="text-gray-600">Trusted by these amazing companies</p>
        </div>
        
        {/* Simple Industry Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {uniqueIndustries.map((industry) => (
            <button
              key={industry}
              onClick={() => setSelectedIndustry(industry)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                selectedIndustry === industry
                  ? "bg-media-purple text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {industry === "all" ? "All" : industry}
            </button>
          ))}
        </div>

        {/* Simple Logo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredClients.slice(0, 12).map((client, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className="flex flex-col items-center justify-center p-2 hover:scale-105 transition-transform duration-200"
            >
              <div className="bg-white rounded-lg p-3 h-20 w-full flex items-center justify-center">
                {client.logo ? (
                  <img 
                    src={client.logo} 
                    alt={client.alt} 
                    className="max-h-16 max-w-full object-contain" 
                  />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="font-semibold text-gray-500">{client.name.charAt(0)}</span>
                  </div>
                )}
              </div>
              <p className="mt-2 text-xs text-gray-600 text-center">{client.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
