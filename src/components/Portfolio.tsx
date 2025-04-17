
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { caseStudies } from "@/data/caseStudies";
import PortfolioHeader from "@/components/portfolio/PortfolioHeader";
import FilterTabs from "@/components/portfolio/FilterTabs";
import AdScreenshotsGallery from "@/components/portfolio/AdScreenshotsGallery";
import { getPortfolioContent, PortfolioContent as PortfolioContentType } from "@/utils/contentManager";

const Portfolio = () => {
  const [filter, setFilter] = useState("all");
  const [content, setContent] = useState<PortfolioContentType>(getPortfolioContent());
  
  // Re-fetch content when component mounts or when localStorage might have changed
  useEffect(() => {
    const handleStorageChange = () => {
      setContent(getPortfolioContent());
    };

    // Listen for storage events (when content is updated in another tab/window)
    window.addEventListener('storage', handleStorageChange);
    
    // Check for updates every 2 seconds (in case changes are made in the same tab)
    const intervalId = setInterval(() => {
      setContent(getPortfolioContent());
    }, 2000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(intervalId);
    };
  }, []);
  
  const filteredCaseStudies = filter === "all" 
    ? caseStudies 
    : caseStudies.filter(study => study.category === filter);

  return (
    <section id="portfolio" className="section-padding bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <PortfolioHeader heading={content.heading} description={content.description} />
        
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
      
      {/* Ad Screenshots Gallery section with an id for scrolling */}
      <div id="ad-campaign-showcase" className="scroll-mt-24">
        <AdScreenshotsGallery heading={content.galleryHeading} description={content.galleryDescription} />
      </div>
    </section>
  );
};

export default Portfolio;
