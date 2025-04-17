
import React from "react";
import { MousePointerClick } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const CPCCard = () => {
  return (
    <Card className="overflow-hidden shadow-md border-0 hover:shadow-lg transition-all bg-white rounded-xl">
      <CardContent className="p-5 sm:p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-800 text-lg">CPC</h3>
          <div className="p-2 rounded-full bg-blue-100">
            <MousePointerClick size={20} className="text-blue-600" />
          </div>
        </div>
        
        <div className="mt-3">
          <div className="flex items-baseline mb-2">
            <span className="text-3xl sm:text-4xl font-bold text-gray-800">$1.18</span>
          </div>
          
          <div className="flex items-center mt-3">
            <span className="flex items-center text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
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
