
import React, { useState } from "react";
import { clientsData } from "@/data/clients";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";

const ClientLogos = () => {
  // State for filters and search
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  
  // Get unique industries (sorted alphabetically)
  const uniqueIndustries = Array.from(
    new Set(clientsData.map((client) => client.industry))
  ).sort();
  
  // Filter clients based on selected industry
  const filteredClients = selectedIndustry 
    ? clientsData.filter(client => client.industry === selectedIndustry)
    : clientsData;

  // Initial display count and total for "see more" functionality
  const initialDisplayCount = 10;
  const displayedClients = expanded 
    ? filteredClients 
    : filteredClients.slice(0, initialDisplayCount);

  return (
    <section className="py-16 bg-white" id="clients">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Modern Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Trusted by <span className="text-media-purple">Industry Leaders</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Partnering with businesses across different sectors to drive results
          </p>
        </div>
        
        {/* Modern Industry Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <Button
            variant={selectedIndustry === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedIndustry(null)}
            className="rounded-full"
          >
            All
          </Button>
          
          {uniqueIndustries.map((industry) => (
            <Button
              key={industry}
              variant={selectedIndustry === industry ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedIndustry(industry)}
              className="rounded-full text-sm"
            >
              {industry}
            </Button>
          ))}
        </div>
        
        <Separator className="my-8 max-w-4xl mx-auto opacity-30" />
        
        {/* Modern Client Logo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 max-w-4xl mx-auto">
          <AnimatePresence>
            {displayedClients.map((client, index) => (
              <motion.div
                key={client.name + index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: Math.min(index * 0.05, 0.5) }}
                className="flex flex-col items-center justify-center h-24"
              >
                <div className="h-16 flex items-center justify-center mb-2 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110">
                  {client.logo ? (
                    <img 
                      src={client.logo} 
                      alt={client.alt} 
                      className="max-h-full max-w-full object-contain" 
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                      <span className="text-lg font-medium text-gray-400">
                        {client.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-xs text-center font-medium text-gray-500 truncate w-full">
                  {client.name}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {/* Show More Button */}
        {filteredClients.length > initialDisplayCount && (
          <div className="mt-12 text-center">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setExpanded(!expanded)}
              className={cn(
                "rounded-full border-2 transition-all duration-300",
                expanded ? "border-gray-300" : "border-media-purple"
              )}
            >
              {expanded ? (
                <>
                  <span>Show Less</span>
                  <ChevronUp className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  <span>See More</span> 
                  <ChevronDown className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ClientLogos;
