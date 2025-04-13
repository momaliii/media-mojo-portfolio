
import React from "react";
import { Target } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const PlatformsCard = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="hero-grid-item col-span-1 row-span-1 bg-media-blue/20 shadow-lg rounded-xl p-4 min-h-[120px] flex flex-col justify-between">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-500">Platforms</span>
        <Target size={18} className="text-media-oceanblue" />
      </div>
      <div className={`${isMobile ? 'mt-2' : 'mt-4'} space-y-1 md:space-y-2 text-xs md:text-sm`}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-media-oceanblue"></div>
          <p className="text-xs">Meta Ads</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-media-purple"></div>
          <p className="text-xs">Google Ads</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-media-pink"></div>
          <p className="text-xs">TikTok & Snapchat</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-media-blue"></div>
          <p className="text-xs">Twitter "X"</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-media-vibrantpurple"></div>
          <p className="text-xs">LinkedIn</p>
        </div>
      </div>
    </div>
  );
};

export default PlatformsCard;
