
import React from "react";
import { PieChart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

const ChannelsCard = () => {
  const isMobile = useIsMobile();
  
  return (
    <Card className="overflow-hidden shadow-md border-0 hover:shadow-lg transition-all bg-white rounded-xl">
      <CardContent className="p-5 sm:p-6">
        <div className="flex justify-between items-center mb-5">
          <h3 className="font-semibold text-gray-800 text-lg">Channels</h3>
          <div className="p-2 rounded-full bg-teal-100">
            <PieChart size={20} className="text-teal-600" />
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-sm text-gray-700">Paid Social</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-16 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-semibold text-gray-800">45%</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
              <span className="text-sm text-gray-700">Search</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-12 h-2 bg-indigo-500 rounded-full"></div>
              <span className="text-sm font-semibold text-gray-800">30%</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-pink-500"></div>
              <span className="text-sm text-gray-700">Display</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-2 bg-pink-500 rounded-full"></div>
              <span className="text-sm font-semibold text-gray-800">15%</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <span className="text-sm text-gray-700">Video</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-2 bg-amber-500 rounded-full"></div>
              <span className="text-sm font-semibold text-gray-800">10%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChannelsCard;
