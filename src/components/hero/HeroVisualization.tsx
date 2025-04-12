
import React from "react";
import PerformanceCard from "./cards/PerformanceCard";
import CPCCard from "./cards/CPCCard";
import BudgetCard from "./cards/BudgetCard";
import CampaignCard from "./cards/CampaignCard";
import PlatformsCard from "./cards/PlatformsCard";
import ChannelsCard from "./cards/ChannelsCard";

const HeroVisualization = () => {
  return (
    <div className="relative h-[400px] md:h-[500px]">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 h-full">
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
