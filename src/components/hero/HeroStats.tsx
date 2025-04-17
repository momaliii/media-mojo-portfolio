
import React from "react";

interface HeroStatsProps {
  stats?: {
    roasValue: string;
    performancePercentage: string;
    cpcValue: string;
    cpcBenchmark: string;
    impressions: string;
    ctr: string;
    convRate: string;
  }
}

const HeroStats: React.FC<HeroStatsProps> = ({ stats }) => {
  return (
    <div className="pt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-media-purple"></div>
        <p className="text-sm text-gray-600">5+ Years Experience</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-media-oceanblue"></div>
        <p className="text-sm text-gray-600">10+ Countries Served</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-media-orange"></div>
        <p className="text-sm text-gray-600">8x+ ROAS Achieved</p>
      </div>
    </div>
  );
};

export default HeroStats;
