
import React, { useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, Linkedin, HandHeart, LineChart, Facebook, BarChart } from "lucide-react";
import { AdScreenshot } from "@/data/adScreenshots";
import { trackEvent } from "@/utils/analytics";

interface AdScreenshotCardProps {
  screenshot: AdScreenshot;
  handleContextMenu: (e: React.MouseEvent) => void;
  index: number;
  isCurrent: boolean;
}

const AdScreenshotCard: React.FC<AdScreenshotCardProps> = ({ 
  screenshot, 
  handleContextMenu,
  index,
  isCurrent
}) => {
  // Track card interactions
  const trackCardView = useCallback(() => {
    trackEvent('ad_screenshot_view', {
      client: screenshot.client,
      platform: screenshot.platform,
      industry: screenshot.industry,
      index: index
    });
  }, [screenshot, index]);

  // Load proper platform icon based on platform type
  const renderPlatformBadge = () => {
    switch (screenshot.platform) {
      case 'LinkedIn':
        return (
          <div className="absolute top-2 left-2 bg-[#0A66C2] text-white rounded-md px-2 py-1 text-xs flex items-center shadow-md animate-fade-in">
            <Linkedin size={14} className="mr-1" aria-hidden="true" />
            <span>LinkedIn</span>
          </div>
        );
      case 'META':
        return (
          <div className="absolute top-2 left-2 bg-[#1877F2] text-white rounded-md px-2 py-1 text-xs flex items-center shadow-md animate-fade-in">
            <Facebook size={14} className="mr-1" aria-hidden="true" />
            <span>META ADS</span>
          </div>
        );
      case 'Analytics':
        return (
          <div className="absolute top-2 left-2 bg-[#34A853] text-white rounded-md px-2 py-1 text-xs flex items-center shadow-md animate-fade-in">
            <LineChart size={14} className="mr-1" aria-hidden="true" />
            <span>Analytics</span>
          </div>
        );
      case 'Lightfunnel':
        return (
          <div className="absolute top-2 left-2 bg-[#6366f1] text-white rounded-md px-2 py-1 text-xs flex items-center shadow-md animate-fade-in">
            <BarChart size={14} className="mr-1" aria-hidden="true" />
            <span>Lightfunnel</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card 
      className={`border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 ${
        isCurrent ? 'ring-2 ring-media-purple ring-offset-2' : ''
      }`}
      id={`carousel-item-${index}`}
      onMouseEnter={trackCardView}
      onClick={trackCardView}
    >
      <CardContent className="p-0 relative">
        <div 
          className="relative w-full h-64 md:h-72 lg:h-80 bg-gray-100 overflow-hidden"
          onContextMenu={handleContextMenu}
          style={{ userSelect: 'none' }}
          role="img"
          aria-label={`${screenshot.client} ad campaign for ${screenshot.industry} industry on ${screenshot.platform} platform${screenshot.details ? `: ${screenshot.details}` : ''}`}
        >
          <img 
            src={screenshot.url} 
            alt={`${screenshot.industry} ${screenshot.platform} Ad Campaign by ${screenshot.client}`}
            className="w-full h-full object-cover object-top opacity-95 transition-transform duration-700 ease-in-out hover:scale-110"
            draggable="false"
            loading="lazy"
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
              aria-hidden="true"
            >
              MOHAMED ALI • MEDIA BUYER
            </div>
          </div>
          
          <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1" aria-hidden="true">
            <Lock size={16} />
          </div>

          {renderPlatformBadge()}

          <div className="absolute bottom-4 left-4 transform transition-transform duration-300 hover:translate-x-1">
            <Badge className="bg-white/90 text-gray-800 hover:bg-white/80 flex items-center gap-1 shadow-sm">
              {screenshot.industry === "Non-Profit" && <HandHeart className="w-3 h-3" aria-hidden="true" />}
              {screenshot.industry}
            </Badge>
          </div>
          
          <div className="absolute bottom-4 right-4 transform transition-transform duration-300 hover:-translate-x-1">
            <Badge variant="outline" className="bg-black/50 text-white border-none shadow-sm">
              {screenshot.client}
            </Badge>
          </div>
          
          {screenshot.details && (
            <div className="absolute bottom-12 right-4">
              <Badge variant="outline" className="bg-blue-500/70 text-white border-none shadow-sm animate-fade-in">
                {screenshot.details}
              </Badge>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdScreenshotCard;
