
import React from "react";
import { Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

const PlatformsCard = () => {
  const isMobile = useIsMobile();
  
  return (
    <Card className="overflow-hidden shadow-md border-0 hover:shadow-lg transition-all bg-white rounded-xl">
      <CardContent className="p-5 sm:p-6">
        <div className="flex justify-between items-center mb-5">
          <h3 className="font-semibold text-gray-800 text-lg">Platforms</h3>
          <div className="p-2 rounded-full bg-indigo-100">
            <Target size={20} className="text-indigo-600" />
          </div>
        </div>
        
        <div className="space-y-3.5">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <p className="text-sm text-gray-700">Meta Ads</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <p className="text-sm text-gray-700">Google Ads</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-pink-500"></div>
            <p className="text-sm text-gray-700">TikTok & Snapchat</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-sky-500"></div>
            <p className="text-sm text-gray-700">Twitter "X"</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-indigo-600"></div>
            <p className="text-sm text-gray-700">LinkedIn</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlatformsCard;
