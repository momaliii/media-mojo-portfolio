
import React from "react";
import { LineChart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const CampaignCard = () => {
  return (
    <Card className="overflow-hidden shadow-md border-0 hover:shadow-lg transition-all bg-white rounded-xl">
      <CardContent className="p-5 sm:p-6">
        <div className="flex justify-between items-center mb-5">
          <h3 className="font-semibold text-gray-800 text-lg">Campaign</h3>
          <div className="p-2 rounded-full bg-sky-100">
            <LineChart size={20} className="text-sky-600" />
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Impressions</span>
            <span className="text-sm font-semibold text-gray-800">10.5M</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">CTR</span>
            <span className="text-sm font-semibold text-gray-800">3.8%</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Conv. Rate</span>
            <span className="text-sm font-semibold text-gray-800">8.5%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CampaignCard;
