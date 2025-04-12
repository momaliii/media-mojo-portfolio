
import React, { useState, useCallback } from "react";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext 
} from "@/components/ui/carousel";
import AdScreenshotCard from "./AdScreenshotCard";
import AdGalleryHeader from "./AdGalleryHeader";
import AdGalleryFooter from "./AdGalleryFooter";
import { adCampaignScreenshots } from "@/data/adScreenshots";
import Autoplay from "embla-carousel-autoplay";

const AdScreenshotsGallery: React.FC = () => {
  // Set up state for autoplay control
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const [api, setApi] = useState<any>(null);

  // Prevent right-clicking for download
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    return false;
  };

  // Handle mouse interactions to pause/resume autoplay
  const handleMouseEnter = useCallback(() => {
    if (api && autoplayEnabled) {
      api.plugins().autoplay.stop();
    }
  }, [api, autoplayEnabled]);

  const handleMouseLeave = useCallback(() => {
    if (api && autoplayEnabled) {
      api.plugins().autoplay.reset();
      api.plugins().autoplay.play();
    }
  }, [api, autoplayEnabled]);

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <AdGalleryHeader />

        <div className="relative">
          <Carousel 
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 3000,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              }),
            ]}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            setApi={setApi}
            className="w-full"
          >
            <CarouselContent>
              {adCampaignScreenshots.map((screenshot, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 transition-transform duration-500 ease-in-out hover:scale-105">
                  <div className="p-1">
                    <AdScreenshotCard 
                      screenshot={screenshot} 
                      handleContextMenu={handleContextMenu}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
          </Carousel>
          
          <AdGalleryFooter />
        </div>
      </div>
    </div>
  );
};

export default AdScreenshotsGallery;
