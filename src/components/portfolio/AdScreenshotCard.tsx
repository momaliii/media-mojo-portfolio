
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, Linkedin, HandHeart, LineChart } from "lucide-react";
import { AdScreenshot } from "@/data/adScreenshots";

interface AdScreenshotCardProps {
  screenshot: AdScreenshot;
  handleContextMenu: (e: React.MouseEvent) => void;
}

const AdScreenshotCard: React.FC<AdScreenshotCardProps> = ({ 
  screenshot, 
  handleContextMenu 
}) => {
  return (
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
          
          {screenshot.platform === "Analytics" && (
            <div className="absolute top-2 left-2 bg-[#34A853] text-white rounded-md px-2 py-1 text-xs flex items-center">
              <LineChart size={14} className="mr-1" />
              Analytics
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
  );
};

export default AdScreenshotCard;
