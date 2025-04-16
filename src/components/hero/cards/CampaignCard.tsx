
import React from "react";
import { LineChart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const CampaignCard = () => {
  return (
    <Card className="overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-all bg-white">
      <CardContent className="p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-gray-700">Campaign</h3>
          <div className="p-1.5 rounded-full bg-sky-100/80">
            <LineChart size={16} className="text-sky-600" />
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Impressions</span>
            <span className="text-sm font-medium text-gray-800">10.5M</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">CTR</span>
            <span className="text-sm font-medium text-gray-800">3.8%</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Conv. Rate</span>
            <span className="text-sm font-medium text-gray-800">8.5%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CampaignCard;
