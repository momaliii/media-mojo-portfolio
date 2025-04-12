
import React from "react";
import { LineChart } from "lucide-react";

const CampaignCard = () => {
  return (
    <div className="hero-grid-item col-span-1 row-span-1 bg-gray-50 shadow-lg rounded-xl p-4 flex flex-col">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-500">Campaign</span>
        <LineChart size={18} className="text-media-oceanblue" />
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex justify-between items-center">
          <span className="text-sm">Impressions</span>
          <span className="text-sm font-medium">10.5M</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm">CTR</span>
          <span className="text-sm font-medium">3.8%</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm">Conv. Rate</span>
          <span className="text-sm font-medium">5.2%</span>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
