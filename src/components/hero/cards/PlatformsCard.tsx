
import React from "react";
import { Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

const PlatformsCard = () => {
  const isMobile = useIsMobile();
  
  return (
    <Card className="overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-all bg-white">
      <CardContent className="p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-gray-700">Platforms</h3>
          <div className="p-1.5 rounded-full bg-indigo-100/80">
            <Target size={16} className="text-indigo-600" />
          </div>
        </div>
        
        <div className="space-y-2.5">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
            <p className="text-sm text-gray-600">Meta Ads</p>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-purple-500"></div>
            <p className="text-sm text-gray-600">Google Ads</p>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-pink-500"></div>
            <p className="text-sm text-gray-600">TikTok & Snapchat</p>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-sky-500"></div>
            <p className="text-sm text-gray-600">Twitter "X"</p>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-600"></div>
            <p className="text-sm text-gray-600">LinkedIn</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlatformsCard;
