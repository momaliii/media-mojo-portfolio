
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, Linkedin, HandHeart, LineChart, Facebook, BarChart, ExternalLink } from "lucide-react";
import { AdScreenshot } from "@/data/adScreenshots";

export interface AdScreenshotCardProps {
  screenshot: AdScreenshot;
  handleContextMenu: (e: React.MouseEvent) => void;
}

const AdScreenshotCard: React.FC<AdScreenshotCardProps> = ({ 
  screenshot, 
  handleContextMenu 
}) => {
  return (
    <Card className="group border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 h-full rounded-xl bg-white">
      <CardContent className="p-0 relative h-full">
        <div 
          className="relative w-full aspect-[3/4] bg-gray-100 overflow-hidden"
          onContextMenu={handleContextMenu}
          style={{ userSelect: 'none' }}
        >
          <img 
            src={screenshot.url} 
            alt={`${screenshot.industry} Ad Campaign`}
            className="w-full h-full object-cover object-top transition-all duration-700 ease-in-out group-hover:scale-105"
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
          
          <div className="absolute inset-0 bg-black bg-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div 
              className="bg-black bg-opacity-30 px-4 py-2 transform rotate-[-25deg] text-white text-sm md:text-md font-bold tracking-wider w-full text-center"
              style={{fontSize: '18px'}}
            >
              MOHAMED ALI • MEDIA BUYER
            </div>
          </div>
          
          <div className="absolute top-3 right-3 bg-black bg-opacity-60 text-white rounded-full p-1.5 shadow-lg">
            <Lock size={14} />
          </div>

          <div className="absolute bottom-3 left-3 transform transition-transform duration-300 group-hover:translate-x-1">
            <Badge className="bg-white/90 text-gray-800 hover:bg-white/80 flex items-center gap-1 shadow-lg font-medium">
              {screenshot.industry === "Non-Profit" && <HandHeart className="w-3 h-3" />}
              {screenshot.industry}
            </Badge>
          </div>
          
          {screenshot.platform === "LinkedIn" && (
            <div className="absolute top-3 left-3 bg-[#0A66C2] text-white rounded-md px-2 py-1 text-xs flex items-center shadow-lg">
              <Linkedin size={12} className="mr-1" />
              LinkedIn
            </div>
          )}
          
          {screenshot.platform === "META" && (
            <div className="absolute top-3 left-3 bg-[#1877F2] text-white rounded-md px-2 py-1 text-xs flex items-center shadow-lg">
              <Facebook size={12} className="mr-1" />
              META ADS
            </div>
          )}
          
          {screenshot.platform === "Analytics" && (
            <div className="absolute top-3 left-3 bg-[#34A853] text-white rounded-md px-2 py-1 text-xs flex items-center shadow-lg">
              <LineChart size={12} className="mr-1" />
              Analytics
            </div>
          )}
          
          {screenshot.platform === "Lightfunnel" && (
            <div className="absolute top-3 left-3 bg-[#6366f1] text-white rounded-md px-2 py-1 text-xs flex items-center shadow-lg">
              <BarChart size={12} className="mr-1" />
              Lightfunnel
            </div>
          )}
          
          <div className="absolute bottom-3 right-3 transform transition-transform duration-300 group-hover:-translate-x-1">
            <Badge variant="outline" className="bg-black/60 text-white border-none shadow-lg">
              {screenshot.client}
            </Badge>
          </div>
          
          {screenshot.details && (
            <div className="absolute bottom-10 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
              <Badge variant="outline" className="bg-media-purple text-white border-none shadow-lg flex items-center gap-1">
                <ExternalLink size={10} />
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
