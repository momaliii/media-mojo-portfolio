
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
    <div className="relative h-auto py-4 w-full overflow-hidden">
      <div className={`grid ${isMobile ? 'grid-cols-1 gap-5' : 'grid-cols-2 md:grid-cols-3 gap-5 lg:gap-6'} h-full max-w-full`}>
        <PerformanceCard />
        <CPCCard />
        <BudgetCard />
        <CampaignCard />
        <PlatformsCard />
        <ChannelsCard />
      </div>
    </div>
  );
};

export default HeroVisualization;
