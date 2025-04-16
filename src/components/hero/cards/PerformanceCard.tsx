
import React from "react";
import { TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const PerformanceCard = () => {
  return (
    <Card className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all bg-white">
      <CardContent className="p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-gray-700">Performance</h3>
          <div className="p-1.5 rounded-full bg-green-100/80">
            <TrendingUp size={16} className="text-green-600" />
          </div>
        </div>
        
        <div className="mt-2">
          <div className="relative h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="absolute h-full left-0 top-0 bg-gradient-to-r from-green-500 to-green-400 rounded-full" 
              style={{width: '88%'}}
            />
          </div>
          
          <div className="mt-2 flex justify-between text-xs text-gray-500">
            <span>0%</span>
            <span className="font-semibold text-gray-800">88%</span>
            <span>100%</span>
          </div>
        </div>
        
        <div className="mt-4 pt-3 border-t border-gray-100">
          <p className="text-sm font-semibold text-gray-800">ROAS 8x+</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceCard;
