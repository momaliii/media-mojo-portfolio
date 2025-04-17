
import React from "react";
import AdScreenshotCard from "./AdScreenshotCard";
import AdGalleryHeader from "./AdGalleryHeader";
import AdGalleryFooter from "./AdGalleryFooter";
import { adScreenshots } from "@/data/adScreenshots";

interface AdScreenshotsGalleryProps {
  heading: string;
  description: string;
}

const AdScreenshotsGallery: React.FC<AdScreenshotsGalleryProps> = ({ heading, description }) => {
  return (
    <div className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <AdGalleryHeader heading={heading} description={description} />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12">
          {adScreenshots.map((screenshot, index) => (
            <AdScreenshotCard
              key={index}
              screenshot={screenshot}
              delay={index * 100}
            />
          ))}
        </div>
        
        <AdGalleryFooter />
      </div>
    </div>
  );
};

export default AdScreenshotsGallery;
