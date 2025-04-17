
import React from "react";
import { TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const PerformanceCard = () => {
  return (
    <Card className="overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-all bg-white w-full">
      <CardContent className="p-4 sm:p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-gray-700">Performance</h3>
          <div className="p-1.5 rounded-full bg-green-100/80">
            <TrendingUp size={16} className="text-green-600" />
          </div>
        </div>
        
        <div className="mt-2">
          <Progress value={88} className="h-2 bg-gray-100" />
          
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
