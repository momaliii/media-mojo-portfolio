
import React, { useState } from "react";
import { clientsData } from "@/data/clients";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import ClientCard from "./client-logos/ClientCard";
import FilterSection from "./client-logos/FilterSection";
import ClientLogoSection from "./client-logos/ClientLogoSection";

const ClientLogos = () => {
  // State for filters and search
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "compact">("grid");
  
  // Get unique industries (sorted alphabetically)
  const uniqueIndustries = Array.from(
    new Set(clientsData.map((client) => client.industry))
  ).sort();
  
  // Filter clients based on selected industry and search query
  const filteredClients = clientsData.filter(client => {
    const industryMatch = selectedIndustry === "all" || client.industry === selectedIndustry;
    const searchMatch = client.name.toLowerCase().includes(searchQuery.toLowerCase());
    return industryMatch && searchMatch;
  });

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50" id="clients">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <ClientLogoSection 
          title={
            <>
              Our <span className="text-media-purple">Success</span> Stories
            </>
          }
          description="Trusted by companies across industries"
        />
        
        {/* Filters */}
        <FilterSection 
          industries={uniqueIndustries}
          selectedIndustry={selectedIndustry}
          onIndustryChange={setSelectedIndustry}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />
        
        {/* Client Grid */}
        <div className={`
          ${viewMode === "grid" 
            ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4" 
            : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3"}
        `}>
          {filteredClients.length > 0 ? (
            filteredClients.map((client, index) => (
              <motion.div
                key={client.name + index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
              >
                {viewMode === "grid" ? (
                  <ClientCard client={client} />
                ) : (
                  <div className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="w-16 h-16 flex items-center justify-center mb-2">
                      {client.logo ? (
                        <img 
                          src={client.logo} 
                          alt={client.alt} 
                          className="max-w-full max-h-full object-contain" 
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <span className="text-xs font-medium text-gray-500">
                            {client.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-center font-medium truncate w-full">
                      {client.name}
                    </p>
                  </div>
                )}
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center">
              <p className="text-gray-500 mb-4">No clients match your search criteria</p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSelectedIndustry("all");
                  setSearchQuery("");
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
