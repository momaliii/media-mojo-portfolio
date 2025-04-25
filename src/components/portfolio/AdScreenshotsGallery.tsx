
import React, { useState, useCallback, useRef, useEffect } from "react";
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
import CarouselIndicators from "./CarouselIndicators";
import { adCampaignScreenshots } from "@/data/adScreenshots";
import { trackEvent } from "@/utils/analytics";
import Autoplay from "embla-carousel-autoplay";
import { throttle } from "@/utils/performance";

const AdScreenshotsGallery: React.FC = () => {
  // Set up state for carousel control
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const [api, setApi] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const autoplayRef = useRef<any>(null);

  // Create the autoplay plugin with specific options
  const autoplayPlugin = Autoplay({
    delay: 3000,
    stopOnInteraction: false,
    stopOnMouseEnter: true,
    rootNode: (emblaRoot) => emblaRoot.parentElement as HTMLElement,
  });

  // Prevent right-clicking for download
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    return false;
  };

  // Update current index when the carousel scrolls
  useEffect(() => {
    if (!api) return;
    
    const onSelect = () => {
      setCurrentIndex(api.selectedScrollSnap());
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
      
      // Track carousel navigation
      trackEvent('carousel_navigation', {
        component: 'AdScreenshotsGallery',
        slide_index: api.selectedScrollSnap(),
        slide_client: adCampaignScreenshots[api.selectedScrollSnap()]?.client || 'unknown'
      });
    };
    
    api.on('select', onSelect);
    api.on('reInit', onSelect);
    
    // Set initial states
    onSelect();
    
    return () => {
      api.off('select', onSelect);
      api.off('reInit', onSelect);
    };
  }, [api]);

  // Store a reference to the autoplay instance
  useEffect(() => {
    if (api) {
      const plugins = api.plugins();
      if (plugins.autoplay) {
        autoplayRef.current = plugins.autoplay;
      }
    }
  }, [api]);

  // Toggle autoplay functionality
  const toggleAutoplay = useCallback(() => {
    setAutoplayEnabled(prev => {
      const newState = !prev;
      if (autoplayRef.current) {
        if (newState) {
          autoplayRef.current.reset();
          autoplayRef.current.play();
        } else {
          autoplayRef.current.stop();
        }
      }
      
      // Track autoplay toggle
      trackEvent('toggle_autoplay', {
        component: 'AdScreenshotsGallery',
        enabled: newState
      });
      
      return newState;
    });
  }, []);

  // Handle mouse interactions to pause/resume autoplay using throttle
  const handleMouseEnter = throttle(() => {
    if (api && autoplayEnabled && api.plugins()) {
      const autoplayInstance = api.plugins().autoplay;
      if (autoplayInstance) {
        autoplayInstance.stop();
      }
    }
  }, 100);

  const handleMouseLeave = throttle(() => {
    if (api && autoplayEnabled && api.plugins()) {
      const autoplayInstance = api.plugins().autoplay;
      if (autoplayInstance) {
        autoplayInstance.reset();
        autoplayInstance.play();
      }
    }
  }, 100);

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <AdGalleryHeader toggleAutoplay={toggleAutoplay} autoplayEnabled={autoplayEnabled} />

        <div 
          className="relative" 
          aria-roledescription="carousel"
          aria-label="Ad campaign screenshots carousel"
        >
          <Carousel 
            opts={{
              align: "start",
              loop: true,
              skipSnaps: false,
              dragFree: false,
            }}
            plugins={[
              autoplayPlugin,
            ]}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            setApi={setApi}
            className="w-full"
          >
            <CarouselContent>
              {adCampaignScreenshots.map((screenshot, index) => (
                <CarouselItem 
                  key={index} 
                  className="md:basis-1/2 lg:basis-1/3 transition-transform duration-500 ease-in-out hover:scale-105"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Slide ${index + 1} of ${adCampaignScreenshots.length}: ${screenshot.client} ${screenshot.platform} ad for ${screenshot.industry} industry`}
                  aria-current={currentIndex === index ? "true" : "false"}
                >
                  <div className="p-1">
                    <AdScreenshotCard 
                      screenshot={screenshot} 
                      handleContextMenu={handleContextMenu}
                      index={index}
                      isCurrent={currentIndex === index}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <CarouselPrevious 
              className="absolute left-4 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100 transition-opacity bg-white/80 backdrop-blur-sm" 
              aria-label="Previous slide"
              disabled={!canScrollPrev}
            />
            <CarouselNext 
              className="absolute right-4 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100 transition-opacity bg-white/80 backdrop-blur-sm" 
              aria-label="Next slide"
              disabled={!canScrollNext}
            />
            
            <CarouselIndicators 
              api={api} 
              count={adCampaignScreenshots.length} 
              currentIndex={currentIndex} 
            />
          </Carousel>
          
          <AdGalleryFooter />
        </div>
      </div>
    </div>
  );
};

export default AdScreenshotsGallery;
