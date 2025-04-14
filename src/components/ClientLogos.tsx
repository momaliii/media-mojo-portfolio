
import React, { useState } from "react";
import { clientsData } from "@/data/clients";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";
import ClientCard from "./client-logos/ClientCard";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "./ui/dropdown-menu";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from "./ui/carousel";
import { 
  ToggleGroup, 
  ToggleGroupItem 
} from "./ui/toggle-group";

const ClientLogos = () => {
  // State for filters and display options
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'carousel'>('grid');
  
  // Get unique industries (sorted alphabetically)
  const uniqueIndustries = Array.from(
    new Set(clientsData.map((client) => client.industry))
  ).sort();
  
  // Filter clients based on selected industry
  const filteredClients = selectedIndustry 
    ? clientsData.filter(client => client.industry === selectedIndustry)
    : clientsData;

  // Initial display count and total for "see more" functionality
  const initialDisplayCount = 8;
  const displayedClients = expanded 
    ? filteredClients 
    : filteredClients.slice(0, initialDisplayCount);

  return (
    <section className="py-12 bg-gradient-to-b from-white to-gray-50" id="clients">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8 text-center">
          <span className="bg-media-purple/10 text-media-purple px-4 py-1 rounded-full text-sm font-medium">
            Our Clients
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-2 tracking-tight">
            Trusted by <span className="text-media-purple">Industry Leaders</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Partnering with businesses across various sectors to drive meaningful results
          </p>
        </div>
        
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          {/* Compact Industry Filter Dropdown */}
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span>{selectedIndustry || 'All Industries'}</span>
                  <ChevronDown className="h-3 w-3 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 max-h-80 overflow-y-auto">
                <DropdownMenuItem 
                  onClick={() => setSelectedIndustry(null)}
                  className={cn(selectedIndustry === null ? "bg-muted" : "")}
                >
                  All Industries
                </DropdownMenuItem>
                {uniqueIndustries.map((industry) => (
                  <DropdownMenuItem
                    key={industry}
                    onClick={() => setSelectedIndustry(industry)}
                    className={cn(selectedIndustry === industry ? "bg-muted" : "")}
                  >
                    {industry}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* View Mode Toggle */}
          <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as 'grid' | 'carousel')}>
            <ToggleGroupItem value="grid" aria-label="Grid view">
              Grid
            </ToggleGroupItem>
            <ToggleGroupItem value="carousel" aria-label="Carousel view">
              Carousel
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        
        <Separator className="my-6 max-w-4xl mx-auto opacity-30" />
        
        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <AnimatePresence>
              {displayedClients.map((client, index) => (
                <motion.div
                  key={client.name + index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: Math.min(index * 0.05, 0.5) }}
                >
                  <ClientCard client={client} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
        
        {/* Carousel View */}
        {viewMode === 'carousel' && (
          <div className="max-w-5xl mx-auto">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {displayedClients.map((client, index) => (
                  <CarouselItem key={index} className="basis-1/2 md:basis-1/3 lg:basis-1/4 pl-4">
                    <ClientCard client={client} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-6">
                <CarouselPrevious className="relative static transform-none mx-2" />
                <CarouselNext className="relative static transform-none mx-2" />
              </div>
            </Carousel>
          </div>
        )}
        
        {/* Show More Button */}
        {filteredClients.length > initialDisplayCount && (
          <div className="mt-10 text-center">
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
          </div>
        )}
      </div>
    </section>
  );
};

export default ClientLogos;
