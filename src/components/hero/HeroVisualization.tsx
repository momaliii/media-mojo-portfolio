
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import PerformanceCard from "./cards/PerformanceCard";
import CPCCard from "./cards/CPCCard";
import BudgetCard from "./cards/BudgetCard";
import CampaignCard from "./cards/CampaignCard";
import PlatformsCard from "./cards/PlatformsCard";
import ChannelsCard from "./cards/ChannelsCard";

const HeroVisualization = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="relative h-auto py-8 w-full overflow-hidden">
      <div className={`grid ${isMobile ? 'grid-cols-1 gap-7' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7'} h-full max-w-full`}>
        <div className="hero-grid-item"><PerformanceCard /></div>
        <div className="hero-grid-item"><CPCCard /></div>
        <div className="hero-grid-item"><BudgetCard /></div>
        <div className="hero-grid-item"><CampaignCard /></div>
        <div className="hero-grid-item"><PlatformsCard /></div>
        <div className="hero-grid-item"><ChannelsCard /></div>
      </div>
    </div>
  );
};

export default HeroVisualization;
