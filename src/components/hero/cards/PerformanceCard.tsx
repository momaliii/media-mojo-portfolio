
import React from "react";
import { TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const PerformanceCard = () => {
  return (
    <Card className="overflow-hidden shadow-md border-0 hover:shadow-lg transition-all bg-white rounded-xl">
      <CardContent className="p-5 sm:p-6">
        <div className="flex justify-between items-center mb-5">
          <h3 className="font-semibold text-gray-800 text-lg">Performance</h3>
          <div className="p-2 rounded-full bg-green-100">
            <TrendingUp size={20} className="text-green-600" />
          </div>
        </div>
        
        <div className="mt-3">
          <Progress value={88} className="h-3 bg-gray-100" />
          
          <div className="mt-3 flex justify-between text-sm text-gray-500">
            <span>0%</span>
            <span className="font-semibold text-gray-800">88%</span>
            <span>100%</span>
          </div>
        </div>
        
        <div className="mt-5 pt-4 border-t border-gray-100">
          <p className="text-base font-semibold text-gray-800">ROAS 8x+</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceCard;
