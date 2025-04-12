
import React from "react";
import { TrendingUp } from "lucide-react";

const PerformanceCard = () => {
  return (
    <div className="hero-grid-item col-span-1 row-span-1 bg-white shadow-lg rounded-xl p-4 flex flex-col justify-between">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-500">Performance</span>
        <TrendingUp size={18} className="text-green-500" />
      </div>
      <div className="mt-2">
        <div className="w-full h-2 bg-gray-100 rounded-full">
          <div className="h-2 bg-green-500 rounded-full animate-pulse-slow" style={{width: '88%'}}></div>
        </div>
        <div className="mt-1 flex justify-between text-xs">
          <span>0%</span>
          <span className="font-semibold">88%</span>
          <span>100%</span>
        </div>
      </div>
      <p className="text-sm mt-2 font-medium">ROAS 8x+</p>
    </div>
  );
};

export default PerformanceCard;
