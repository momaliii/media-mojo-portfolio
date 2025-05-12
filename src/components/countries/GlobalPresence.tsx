
import React, { useEffect, useState } from "react";
import { countriesData } from "./CountriesData";
import { motion } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import useEmblaCarousel from "embla-carousel-react";
import AutoPlay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";

const GlobalPresence = () => {
  const [api, setApi] = useState<ReturnType<typeof useEmblaCarousel>[1]>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Configure autoplay plugin
  const autoplayPlugin = AutoPlay({
    delay: 3000,
    stopOnInteraction: true,
    rootNode: (emblaRoot) => emblaRoot.parentElement,
  });
  
  // Update active index when carousel slides
  useEffect(() => {
    if (!api) return;
    
    const onSelect = () => {
      setActiveIndex(api.selectedScrollSnap());
    };
    
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);
  
  return (
    <section id="countries" className="relative py-16 md:py-24 bg-gradient-to-br from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-50 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-media-purple/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-media-oceanblue/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-1/3 w-40 h-40 bg-media-pink/5 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Countries</span> I Work With
            </h2>
            <p className="text-gray-600 dark:text-gray-300 md:text-lg mb-6">
              I've managed successful campaigns across these countries,
              optimizing ad spend and maximizing ROI for diverse markets.
            </p>
          </motion.div>
          
          {/* Carousel replacing the grid */}
          <div className="mx-auto max-w-3xl">
            <Carousel
              setApi={setApi}
              className="w-full"
              plugins={[autoplayPlugin]}
              opts={{
                align: "start",
                loop: true,
              }}
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {countriesData.map((country, index) => (
                  <CarouselItem key={country.name} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ y: -5, scale: 1.03, transition: { duration: 0.2 } }}
                      className="h-full bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="mb-3 flex justify-center">
                        <img 
                          src={`https://flagcdn.com/w80/${country.code}.png`}
                          srcSet={`https://flagcdn.com/w160/${country.code}.png 2x`}
                          width="80" 
                          alt={`Flag of ${country.name}`}
                          className="rounded shadow-sm"
                        />
                      </div>
                      <h3 className="font-medium text-sm md:text-base">{country.name}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{country.region}</p>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex items-center justify-center w-full gap-2 mt-6">
                <CarouselPrevious className="static transform-none mx-1 w-9 h-9 dark:border-gray-700" />
                <div className="flex space-x-1">
                  {countriesData.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => api?.scrollTo(index)}
                      aria-label={`Go to slide ${index + 1}`}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all",
                        activeIndex === index 
                          ? "bg-media-purple scale-125" 
                          : "bg-gray-300 dark:bg-gray-600"
                      )}
                    />
                  ))}
                </div>
                <CarouselNext className="static transform-none mx-1 w-9 h-9 dark:border-gray-700" />
              </div>
            </Carousel>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default GlobalPresence;
