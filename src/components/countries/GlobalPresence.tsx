
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
    <section
      id="countries"
      aria-labelledby="countries-heading"
      className="relative py-20 md:py-28 bg-gradient-to-br from-background via-muted/30 to-background overflow-hidden"
    >
      {/* Background decorative elements */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute top-10 left-10 w-72 h-72 bg-media-purple/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-media-oceanblue/5 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-1/3 w-40 h-40 bg-media-pink/5 rounded-full blur-2xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full border border-media-purple/20 bg-media-purple/10 backdrop-blur-sm text-media-purple text-xs font-semibold uppercase tracking-[0.18em] mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-media-purple animate-pulse" aria-hidden="true" />
              Global reach
            </span>
            <h2 id="countries-heading" className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              <span className="gradient-text">Countries</span> I work with
            </h2>
            <p className="text-muted-foreground md:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
              Managed successful campaigns across these markets, optimizing ad spend and maximizing
              ROI for diverse audiences.
            </p>
          </motion.div>

          <div className="mx-auto max-w-3xl">
            <Carousel
              setApi={setApi}
              className="w-full"
              plugins={[autoplayPlugin]}
              opts={{ align: "start", loop: true }}
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {countriesData.map((country, index) => (
                  <CarouselItem key={country.name} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      whileHover={{ y: -4 }}
                      className="group h-full bg-card border border-border hover:border-media-purple/40 p-5 rounded-2xl shadow-sm hover:shadow-[0_10px_30px_-12px_rgba(124,58,237,0.25)] transition-all"
                    >
                      <div className="mb-3 flex justify-center">
                        <img
                          src={`https://flagcdn.com/w80/${country.code}.png`}
                          srcSet={`https://flagcdn.com/w160/${country.code}.png 2x`}
                          width="80"
                          alt={`Flag of ${country.name}`}
                          className="rounded shadow-sm group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <h3 className="font-semibold text-sm md:text-base">{country.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{country.region}</p>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex items-center justify-center w-full gap-2 mt-6">
                <CarouselPrevious className="static transform-none mx-1 w-9 h-9" />
                <div className="flex space-x-1">
                  {countriesData.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => api?.scrollTo(index)}
                      aria-label={`Go to slide ${index + 1}`}
                      className={cn(
                        "h-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-media-purple",
                        activeIndex === index
                          ? "w-6 bg-media-purple"
                          : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                      )}
                    />
                  ))}
                </div>
                <CarouselNext className="static transform-none mx-1 w-9 h-9" />
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalPresence;
