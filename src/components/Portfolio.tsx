
import React, { useState, useEffect } from "react";
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

  // Highlight cosmetics case study initially
  useEffect(() => {
    // Scroll to the gallery section with a small delay to ensure it's rendered
    const timer = setTimeout(() => {
      const element = document.getElementById('ad-campaign-showcase');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

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
          <Button variant="outline" size="lg" className="inline-flex items-center hover:bg-media-purple/10 transition-colors">
            View More Case Studies
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Add the Ad Screenshots Gallery section with an id for scrolling */}
      <div id="ad-campaign-showcase" className="scroll-mt-24">
        <AdScreenshotsGallery />
      </div>
    </section>
  );
};

export default Portfolio;
