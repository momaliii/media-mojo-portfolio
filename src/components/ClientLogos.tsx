
import React, { useState, useEffect } from "react";
import { clientsData } from "@/data/clientsData";
import ClientCard from "./client-logos/ClientCard";
import ClientLogoSection from "./client-logos/ClientLogoSection";
import FilterSection from "./client-logos/FilterSection";
import { 
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ClientLogos = () => {
  // State for filtering and pagination
  const [selectedIndustry, setSelectedIndustry] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filteredClients, setFilteredClients] = useState(clientsData);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "compact">("grid");
  const clientsPerPage = 12;
  
  // Get unique industries for filter
  const uniqueIndustries = Array.from(
    new Set(clientsData.map((client) => client.industry))
  ).sort();

  // Filter clients based on selected industry and search query
  useEffect(() => {
    let filtered = clientsData;
    
    // Filter by industry
    if (selectedIndustry !== "all") {
      filtered = filtered.filter((client) => client.industry === selectedIndustry);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((client) => 
        client.name.toLowerCase().includes(query) || 
        client.industry.toLowerCase().includes(query)
      );
    }
    
    setFilteredClients(filtered);
    setCurrentPage(1); // Reset to first page when filter changes
  }, [selectedIndustry, searchQuery]);

  // Calculate pagination
  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = filteredClients.slice(indexOfFirstClient, indexOfLastClient);
  const totalPages = Math.ceil(filteredClients.length / clientsPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  // Generate pagination items
  const renderPaginationItems = () => {
    const items = [];
    
    // Always show first page
    items.push(
      <PaginationItem key="first">
        <PaginationLink 
          isActive={currentPage === 1} 
          onClick={() => paginate(1)}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );
    
    // Add ellipsis if needed
    if (currentPage > 3) {
      items.push(
        <PaginationItem key="ellipsis-1">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    // Add pages around current page
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);
    
    for (let i = startPage; i <= endPage; i++) {
      if (i > 1 && i < totalPages) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink 
              isActive={currentPage === i} 
              onClick={() => paginate(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }
    
    // Add ellipsis if needed
    if (currentPage < totalPages - 2) {
      items.push(
        <PaginationItem key="ellipsis-2">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    // Always show last page if there is more than one page
    if (totalPages > 1) {
      items.push(
        <PaginationItem key="last">
          <PaginationLink 
            isActive={currentPage === totalPages} 
            onClick={() => paginate(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return items;
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <ClientLogoSection 
          title={<>Clients I've <span className="gradient-text">Worked With</span></>}
          description="Partnering with businesses across multiple industries to deliver exceptional media buying results and drive growth."
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

        <div className={`${
          viewMode === "grid" 
            ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6" 
            : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        } gap-4 md:gap-6`}>
          {currentClients.map((client, index) => (
            <ClientCard key={index} client={client} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                
                {renderPaginationItems()}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </section>
  );
};

export default ClientLogos;
