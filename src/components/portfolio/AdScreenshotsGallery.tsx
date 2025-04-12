import React, { useState, useEffect, useCallback } from "react";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext 
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Lock, ShieldCheck, Linkedin, Globe, HandHeart } from "lucide-react";
import { caseStudies } from "@/data/caseStudies";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

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
    },
    {
      url: "/lovable-uploads/46ec591e-912f-44bb-8a0b-ead1a8921beb.png",
      industry: "F&B",
      client: "Saudi Restaurant - $10.7K Campaign"
    },
    {
      url: "/lovable-uploads/b44109e4-19fc-4d1a-89e0-9374e494ab0d.png",
      industry: "F&B",
      client: "Saudi F&B - 36K Impressions"
    },
    {
      url: "/lovable-uploads/5804f258-db97-4d23-b780-67b64f60d4cd.png",
      industry: "F&B",
      client: "Saudi Restaurant Chain - $1.4K Campaign"
    },
    {
      url: "/lovable-uploads/19e88bed-b62d-4d8a-9686-d0f95c5873c7.png",
      industry: "F&B",
      client: "Saudi F&B - ROI Optimization"
    },
    {
      url: "/lovable-uploads/a11917a6-704a-4ada-ba26-40899ba98b37.png",
      industry: "Non-Profit",
      client: "Saudi NGO Campaign",
      platform: "LinkedIn",
      details: "$36.7K Total Spend"
    },
    {
      url: "/lovable-uploads/d07ff1b1-0451-4b63-9122-a1547f3ab4eb.png",
      industry: "Non-Profit",
      client: "Global Outreach - Turkey",
      platform: "LinkedIn",
      details: "$1.6K Spent | 0.49% CTR"
    },
    {
      url: "/lovable-uploads/ea7c2b4d-8851-4c25-b5e6-7f33a0471af4.png",
      industry: "Non-Profit",
      client: "Middle East Engagement",
      platform: "LinkedIn",
      details: "3.54% CTR | $0.32 CPC"
    }
  ];

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
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ad Campaign Showcase</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Browse our portfolio of successful ad campaigns across various industries and platforms.
            Each screenshot demonstrates our approach to creating engaging, high-converting ads.
          </p>
          
          <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg inline-flex items-center gap-2 border border-blue-100">
            <Linkedin className="text-[#0A66C2]" size={20} />
            <span className="font-medium text-gray-700">
              Now featuring LinkedIn campaigns for non-profit organizations in Saudi Arabia and across the Middle East
            </span>
          </div>
        </div>

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
                    <Card className="border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-0 relative">
                        <div 
                          className="relative w-full h-64 md:h-72 lg:h-80 bg-gray-100 overflow-hidden"
                          onContextMenu={handleContextMenu}
                          style={{ userSelect: 'none' }}
                        >
                          <img 
                            src={screenshot.url} 
                            alt={`${screenshot.industry} Ad Campaign`}
                            className="w-full h-full object-cover object-top opacity-95 transition-transform duration-700 ease-in-out hover:scale-110"
                            draggable="false"
                            style={{ 
                              pointerEvents: 'none',
                              userSelect: 'none',
                              MozUserSelect: 'none',
                              WebkitUserSelect: 'none',
                              msUserSelect: 'none'
                            }}
                          />
                          
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div 
                              className="bg-black bg-opacity-20 px-4 py-2 transform rotate-[-25deg] text-white text-sm md:text-md font-bold tracking-wider w-full text-center"
                              style={{fontSize: '20px'}}
                            >
                              MOHAMED ALI • MEDIA BUYER
                            </div>
                          </div>
                          
                          <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1">
                            <Lock size={16} />
                          </div>

                          <div className="absolute bottom-4 left-4 transform transition-transform duration-300 hover:translate-x-1">
                            <Badge className="bg-white/90 text-gray-800 hover:bg-white/80 flex items-center gap-1">
                              {screenshot.industry === "Non-Profit" && <HandHeart className="w-3 h-3" />}
                              {screenshot.industry}
                            </Badge>
                          </div>
                          
                          {screenshot.platform === "LinkedIn" && (
                            <div className="absolute top-2 left-2 bg-[#0A66C2] text-white rounded-md px-2 py-1 text-xs flex items-center">
                              <Linkedin size={14} className="mr-1" />
                              LinkedIn
                            </div>
                          )}
                          
                          <div className="absolute bottom-4 right-4 transform transition-transform duration-300 hover:-translate-x-1">
                            <Badge variant="outline" className="bg-black/50 text-white border-none">
                              {screenshot.client}
                            </Badge>
                          </div>
                          
                          {screenshot.details && (
                            <div className="absolute bottom-12 right-4">
                              <Badge variant="outline" className="bg-blue-500/70 text-white border-none">
                                {screenshot.details}
                              </Badge>
                            </div>
                          )}
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
          
          <div className="flex items-center justify-center text-sm text-gray-500 mt-4">
            <ShieldCheck className="w-4 h-4 mr-2" />
            <span>Images are protected and cannot be downloaded</span>
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-2">
            <Globe className="w-5 h-5 text-media-oceanblue" />
            <span className="text-sm text-gray-600">Campaigns spanning Saudi Arabia, Turkey, Pakistan, Tunisia, and Oman</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdScreenshotsGallery;
