
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { caseStudies } from "@/data/caseStudies";
import PortfolioHeader from "@/components/portfolio/PortfolioHeader";
import FilterTabs from "@/components/portfolio/FilterTabs";

const Portfolio = () => {
  const [filter, setFilter] = useState("all");
  
  const filteredCaseStudies = filter === "all" 
    ? caseStudies 
    : caseStudies.filter(study => study.category === filter);

  return (
    <section id="portfolio" className="section-padding bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <PortfolioHeader />
        
        <FilterTabs 
          filter={filter} 
          setFilter={setFilter} 
          filteredCaseStudies={filteredCaseStudies} 
        />
        
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="inline-flex items-center">
            View More Case Studies
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
