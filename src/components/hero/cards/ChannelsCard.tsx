
import React from "react";
import { PieChart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

const ChannelsCard = () => {
  const isMobile = useIsMobile();
  
  return (
    <Card className="overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-all bg-white">
      <CardContent className="p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-gray-700">Channels</h3>
          <div className="p-1.5 rounded-full bg-teal-100/80">
            <PieChart size={16} className="text-teal-600" />
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
              <span className="text-sm text-gray-600">Paid Social</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-16 h-1.5 bg-blue-500 rounded-full"></div>
              <span className="text-xs font-medium text-gray-800">45%</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-indigo-500"></div>
              <span className="text-sm text-gray-600">Search</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-12 h-1.5 bg-indigo-500 rounded-full"></div>
              <span className="text-xs font-medium text-gray-800">30%</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-pink-500"></div>
              <span className="text-sm text-gray-600">Display</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-7 h-1.5 bg-pink-500 rounded-full"></div>
              <span className="text-xs font-medium text-gray-800">15%</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
              <span className="text-sm text-gray-600">Video</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-5 h-1.5 bg-amber-500 rounded-full"></div>
              <span className="text-xs font-medium text-gray-800">10%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChannelsCard;
