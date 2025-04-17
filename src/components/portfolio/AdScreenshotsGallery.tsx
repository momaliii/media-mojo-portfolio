
import React from "react";
import AdScreenshotCard from "./AdScreenshotCard";
import AdGalleryHeader from "./AdGalleryHeader";
import AdGalleryFooter from "./AdGalleryFooter";
import { adCampaignScreenshots } from "@/data/adScreenshots";

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
    <div className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <AdGalleryHeader heading={heading} description={description} />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mt-12">
          {adCampaignScreenshots.map((screenshot, index) => (
            <AdScreenshotCard
              key={index}
              screenshot={screenshot}
              handleContextMenu={handleContextMenu}
            />
          ))}
        </div>
        
        <AdGalleryFooter />
      </div>
    </div>
  );
};

export default AdScreenshotsGallery;
