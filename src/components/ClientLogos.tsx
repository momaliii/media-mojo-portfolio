
import React, { useState } from "react";
import { clientsData } from "@/data/clients";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Separator } from "./ui/separator";
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

const ClientLogos: React.FC = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>("all");
  const [expanded, setExpanded] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');
  const [searchQuery, setSearchQuery] = useState("");
  
  const uniqueIndustries = Array.from(
    new Set(clientsData.map((client) => client.industry))
  ).sort();
  
  const filteredClients = clientsData
    .filter(client => 
      (selectedIndustry === "all" || client.industry === selectedIndustry) &&
      (searchQuery === "" || client.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  const initialDisplayCount = 8;
  const displayedClients = expanded 
    ? filteredClients 
    : filteredClients.slice(0, initialDisplayCount);

  return (
    <section className="relative py-20 overflow-hidden" id="clients">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/50 to-white"></div>
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-40"></div>
      
      <div className="container mx-auto px-4 max-w-6xl relative">
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
        
        <div className="max-w-full mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {displayedClients.map((client, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/3 lg:basis-1/4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: Math.min(index * 0.1, 0.5),
                      duration: 0.4,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                  >
                    <ClientCard client={client} />
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-4 mt-8">
              <CarouselPrevious className="relative inset-0 translate-y-0 bg-white/80 hover:bg-white hover:text-media-purple transition-all duration-300" />
              <CarouselNext className="relative inset-0 translate-y-0 bg-white/80 hover:bg-white hover:text-media-purple transition-all duration-300" />
            </div>
          </Carousel>
        </div>
        
        {filteredClients.length > initialDisplayCount && (
          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              variant="outline"
              size="lg"
              onClick={() => setExpanded(!expanded)}
              className="rounded-xl border transition-all duration-300 hover:shadow-md bg-white/80 backdrop-blur-sm hover:bg-media-purple/10 hover:border-media-purple/30"
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
