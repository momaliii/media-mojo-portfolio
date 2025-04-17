
import React from "react";
import AdScreenshotCard from "./AdScreenshotCard";
import AdGalleryHeader from "./AdGalleryHeader";
import AdGalleryFooter from "./AdGalleryFooter";
import { adCampaignScreenshots } from "@/data/adScreenshots";
import { Filter, Grid3X3 } from "lucide-react";

interface AdScreenshotsGalleryProps {
  heading: string;
  description: string;
}

const AdScreenshotsGallery: React.FC<AdScreenshotsGalleryProps> = ({ heading, description }) => {
  // Function to prevent right-click (context menu) on images
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    return false;
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <AdGalleryHeader heading={heading} description={description} />
        
        <div className="flex items-center justify-between mt-10 mb-8">
          <div className="flex items-center gap-2">
            <Grid3X3 size={18} className="text-media-purple" />
            <span className="text-sm font-medium">
              Showing {adCampaignScreenshots.length} ad campaigns
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-500" />
            <span className="text-sm text-gray-500">All Platforms</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-7">
          {adCampaignScreenshots.map((screenshot, index) => (
            <div 
              key={index} 
              className="animate-fade-in" 
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <AdScreenshotCard
                screenshot={screenshot}
                handleContextMenu={handleContextMenu}
              />
            </div>
          ))}
        </div>
        
        <AdGalleryFooter />
      </div>
    </div>
  );
};

export default AdScreenshotsGallery;
