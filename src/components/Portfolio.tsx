
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { caseStudies } from "@/data/caseStudies";
import PortfolioHeader from "@/components/portfolio/PortfolioHeader";
import FilterTabs from "@/components/portfolio/FilterTabs";
import AdScreenshotsGallery from "@/components/portfolio/AdScreenshotsGallery";

const Portfolio = () => {
  const [filter, setFilter] = useState("all");
  
  const filteredCaseStudies = filter === "all" 
    ? caseStudies 
    : caseStudies.filter(study => study.category === filter);

  return (
    <section id="portfolio" className="section-padding bg-gray-50">
      <div className="container mx-auto px-4 md:px-8">
        <PortfolioHeader />
        
        <FilterTabs 
          filter={filter} 
          setFilter={setFilter} 
          filteredCaseStudies={filteredCaseStudies} 
        />
        
        <div className="text-center mt-16">
          <Button variant="outline" size="lg" className="inline-flex items-center hover:bg-media-purple/10 transition-colors rounded-xl py-6 px-8">
            <span className="text-base">View More Case Studies</span>
            <ArrowUpRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Ad Screenshots Gallery section with an id for scrolling */}
      <div id="ad-campaign-showcase" className="scroll-mt-24 mt-24">
        <AdScreenshotsGallery />
      </div>
    </section>
  );
};

export default Portfolio;
