
import React, { useState } from "react";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext 
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Lock, ShieldCheck } from "lucide-react";
import { caseStudies } from "@/data/caseStudies";

const AdScreenshotsGallery: React.FC = () => {
  // Prepare all screenshots with their industry info (without actual URLs)
  const allScreenshots = caseStudies.map(study => ({
    industry: study.industry || study.category,
    client: study.client
  }));

  // Prevent right-clicking for download
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    return false;
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ad Campaign Showcase</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Browse our portfolio of successful ad campaigns across various industries.
            Each screenshot demonstrates our approach to creating engaging, high-converting ads.
          </p>
        </div>

        <div className="relative">
          <Carousel 
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {allScreenshots.map((screenshot, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="border border-gray-200 overflow-hidden">
                      <CardContent className="p-0 relative">
                        <div 
                          className="relative w-full h-64 md:h-72 lg:h-80 bg-gray-100"
                          onContextMenu={handleContextMenu}
                          style={{ userSelect: 'none' }}
                        >
                          {/* Placeholder area for new images */}
                          <div className="w-full h-full flex items-center justify-center bg-gray-200">
                            <p className="text-gray-500 font-medium">Image placeholder</p>
                          </div>
                          
                          {/* Diagonal watermark */}
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div 
                              className="bg-black bg-opacity-20 px-4 py-2 transform rotate-[-25deg] text-white text-sm md:text-md font-bold tracking-wider w-full text-center"
                              style={{fontSize: '20px'}}
                            >
                              MOHAMED ALI • MEDIA BUYER
                            </div>
                          </div>
                          
                          {/* Protection indicators */}
                          <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1">
                            <Lock size={16} />
                          </div>

                          {/* Industry badge */}
                          <div className="absolute bottom-4 left-4">
                            <Badge className="bg-white/90 text-gray-800 hover:bg-white/80">
                              {screenshot.industry}
                            </Badge>
                          </div>
                          
                          {/* Client info */}
                          <div className="absolute bottom-4 right-4">
                            <Badge variant="outline" className="bg-black/50 text-white border-none">
                              {screenshot.client}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
          </Carousel>
          
          {/* Protection message */}
          <div className="flex items-center justify-center text-sm text-gray-500 mt-4">
            <ShieldCheck className="w-4 h-4 mr-2" />
            <span>Images are protected and cannot be downloaded</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdScreenshotsGallery;
