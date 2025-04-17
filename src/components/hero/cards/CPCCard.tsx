
import React from "react";
import { MousePointerClick } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const CPCCard = () => {
  return (
    <Card className="overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-all bg-white w-full">
      <CardContent className="p-4 sm:p-5">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium text-gray-700">CPC</h3>
          <div className="p-1.5 rounded-full bg-blue-100/80">
            <MousePointerClick size={16} className="text-blue-600" />
          </div>
        </div>
        
        <div className="mt-2">
          <div className="flex items-baseline mb-1">
            <span className="text-2xl sm:text-3xl font-bold text-gray-800">$1.18</span>
          </div>
          
          <div className="flex items-center mt-1">
            <span className="flex items-center text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              24% vs. benchmark
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CPCCard;
