
import React from "react";
import { PieChart } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const ChannelsCard = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="hero-grid-item col-span-1 row-span-1 bg-gradient-to-br from-media-purple/90 to-media-oceanblue/90 text-white shadow-lg rounded-xl p-4 min-h-[120px] flex flex-col justify-between">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">Channels</span>
        <PieChart size={18} />
      </div>
      <div className={`flex-1 flex flex-col justify-center gap-1 md:gap-2 ${isMobile ? 'mt-1' : 'mt-2'}`}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-white"></div>
            <span className="text-xs">Paid Social</span>
          </div>
          <span className="text-xs">45%</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-media-blue"></div>
            <span className="text-xs">Search</span>
          </div>
          <span className="text-xs">30%</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-media-pink"></div>
            <span className="text-xs">Display</span>
          </div>
          <span className="text-xs">15%</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-media-peach"></div>
            <span className="text-xs">Video</span>
          </div>
          <span className="text-xs">10%</span>
        </div>
      </div>
    </div>
  );
};

export default ChannelsCard;
