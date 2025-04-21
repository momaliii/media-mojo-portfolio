import React, { useState } from "react";
import { clientsData } from "@/data/clients";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";
import ClientCard from "./client-logos/ClientCard";
import ClientLogoSection from "./client-logos/ClientLogoSection";
import FilterSection from "./client-logos/FilterSection";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from "./ui/carousel";

const ClientLogos = () => {
  // State for filters and display options
  const [selectedIndustry, setSelectedIndustry] = useState<string>("all");
  const [expanded, setExpanded] = useState(false);
  const [viewMode, setViewMode<'grid' | 'compact'>('grid');
  const [searchQuery, setSearchQuery] = useState("");
  
  // Get unique industries (sorted alphabetically)
  const uniqueIndustries = Array.from(
    new Set(clientsData.map((client) => client.industry))
  ).sort();
  
  // Filter clients based on selected industry and search query
  const filteredClients = clientsData
    .filter(client => 
      (selectedIndustry === "all" || client.industry === selectedIndustry) &&
      (searchQuery === "" || client.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  // Initial display count and total for "see more" functionality
  const initialDisplayCount = 8;
  const displayedClients = expanded 
    ? filteredClients 
    : filteredClients.slice(0, initialDisplayCount);

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50/50 to-white" id="clients">
      <div className="container mx-auto px-4 max-w-6xl">
        <ClientLogoSection 
          title={
            <>
              Trusted by <span className="gradient-text bg-gradient-to-r from-media-purple to-media-oceanblue">Industry Leaders</span>
            </>
          }
          description="Partnering with businesses across various sectors to drive meaningful results through data-driven strategies"
        />
        
        <FilterSection 
          industries={uniqueIndustries}
          selectedIndustry={selectedIndustry}
          onIndustryChange={setSelectedIndustry}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />
        
        <Separator className="my-6 max-w-full mx-auto opacity-30" />
        
        {/* Smart Carousel View */}
        <div className="max-w-full mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="py-4">
              {displayedClients.map((client, index) => (
                <CarouselItem key={index} className="md:basis-1/4 lg:basis-1/5">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(index * 0.1, 0.5) }}
                  >
                    <ClientCard client={client} />
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-4 mt-8">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        </div>
        
        {/* Show More Button */}
        {filteredClients.length > initialDisplayCount && (
          <motion.div 
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={() => setExpanded(!expanded)}
              className={cn(
                "rounded-full border transition-all duration-300",
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
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ClientLogos;
