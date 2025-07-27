import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { caseStudies } from "@/data/caseStudies";
import PortfolioHeader from "@/components/portfolio/PortfolioHeader";
import EnhancedFilterTabs from "@/components/portfolio/EnhancedFilterTabs";
import AdScreenshotsGallery from "@/components/portfolio/AdScreenshotsGallery";
import { usePerformanceMonitor } from "@/hooks/use-performance-monitor";

const Portfolio = () => {
  const [filter, setFilter] = useState("all");
  const { logMetric } = usePerformanceMonitor('Portfolio');
  
  // Monitor filter changes performance
  useEffect(() => {
    const startTime = performance.now();
    const endTime = performance.now();
    logMetric('portfolio-filter-time', endTime - startTime);
  }, [filter, logMetric]);

  return (
    <section 
      id="portfolio" 
      className="section-padding relative overflow-hidden"
      aria-labelledby="portfolio-heading"
    >
      {/* Enhanced background with subtle patterns and gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-950" />
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      
      <div className="container mx-auto px-4 md:px-6 relative">
        <PortfolioHeader />
        
        <EnhancedFilterTabs
          filter={filter}
          setFilter={setFilter}
          caseStudies={caseStudies}
        />
        
        <div className="text-center mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/case-studies">
            <Button 
              variant="outline" 
              size="lg" 
              className="inline-flex items-center bg-white/80 dark:bg-gray-800/80 hover:bg-media-purple/10 dark:hover:bg-media-blue/10 transition-all duration-300 rounded-xl py-6 px-8 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md"
              aria-label="View more case studies"
            >
              <span className="text-base">View More Case Studies</span>
              <ArrowUpRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </Button>
          </Link>
          
          <a 
            href="/Mohamed_Ali_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button 
              variant="outline" 
              size="lg" 
              className="inline-flex items-center bg-white/80 dark:bg-gray-800/80 hover:bg-media-purple/10 dark:hover:bg-media-blue/10 transition-all duration-300 rounded-xl py-6 px-8 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md"
              aria-label="Download PDF portfolio"
            >
              <span className="text-base">Download PDF Portfolio</span>
              <Download className="ml-2 h-5 w-5" aria-hidden="true" />
            </Button>
          </a>
        </div>
      </div>
      
      <div 
        id="ad-campaign-showcase" 
        className="scroll-mt-24 mt-24"
        aria-labelledby="ad-gallery-heading"
      >
        <AdScreenshotsGallery />
      </div>
    </section>
  );
};

export default Portfolio;
