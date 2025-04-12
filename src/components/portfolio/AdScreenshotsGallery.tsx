
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
  // Prepare all screenshots with their industry info
  const adCampaignScreenshots = [
    {
      url: "/lovable-uploads/156fb6fb-7127-4fc4-958a-cc7f67e44deb.png",
      industry: "Fashion",
      client: "eCommerce Store"
    },
    {
      url: "/lovable-uploads/8a21f5c2-80de-458b-b6de-a6a618ee43b7.png",
      industry: "Fashion",
      client: "Clothing Brand"
    },
    {
      url: "/lovable-uploads/26e6f270-fff7-432d-9153-8a8fd986c69c.png",
      industry: "Cosmetics",
      client: "Beauty Products"
    },
    {
      url: "/lovable-uploads/92ae0ae7-b223-4d17-aceb-c8c87dbbe638.png",
      industry: "Cosmetics",
      client: "Makeup Brand"
    },
    {
      url: "/lovable-uploads/2b19e181-a080-4cc8-9219-3086a5edd17c.png",
      industry: "Cosmetics",
      client: "Lip Products"
    },
    {
      url: "/lovable-uploads/c8259e43-59cb-4ab5-a015-c4bd4f607f1f.png",
      industry: "Cosmetics",
      client: "Sunblock Products"
    },
    {
      url: "/lovable-uploads/b9ffe7b8-a319-4b45-aece-468ae716143f.png",
      industry: "Cosmetics",
      client: "EGP7.76M Revenue Campaign"
    },
    {
      url: "/lovable-uploads/e4ec0de3-17ba-4f2f-924d-68ea4a22a583.png",
      industry: "Travel",
      client: "Qatar Airways - $54.4K Campaign"
    },
    {
      url: "/lovable-uploads/5f84f179-a69a-4009-93ba-78dd559a2d50.png",
      industry: "Travel",
      client: "Dinner Cruise Promotions"
    },
    {
      url: "/lovable-uploads/dd8439eb-83f8-4dc7-b4a8-40039aa7ba3c.png",
      industry: "Travel",
      client: "Doha Experience Tours"
    },
    {
      url: "/lovable-uploads/c231d3ec-eed2-424d-bd7c-95aa7879f8e7.png",
      industry: "Travel",
      client: "Seasonal Travel Campaigns"
    }
  ];

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
              {adCampaignScreenshots.map((screenshot, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="border border-gray-200 overflow-hidden">
                      <CardContent className="p-0 relative">
                        <div 
                          className="relative w-full h-64 md:h-72 lg:h-80 bg-gray-100"
                          onContextMenu={handleContextMenu}
                          style={{ userSelect: 'none' }}
                        >
                          {/* Facebook Ads Manager screenshot */}
                          <img 
                            src={screenshot.url} 
                            alt={`${screenshot.industry} Ad Campaign`}
                            className="w-full h-full object-cover object-top opacity-95"
                            draggable="false"
                            style={{ 
                              pointerEvents: 'none',
                              userSelect: 'none',
                              MozUserSelect: 'none',
                              WebkitUserSelect: 'none',
                              msUserSelect: 'none'
                            }}
                          />
                          
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
