
import React from "react";
import { DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const BudgetCard = () => {
  return (
    <Card className="overflow-hidden shadow-md border-0 hover:shadow-lg transition-all bg-white rounded-xl">
      <CardContent className="p-5 sm:p-6">
        <div className="flex justify-between items-center mb-5">
          <h3 className="font-semibold text-gray-800 text-lg">Budget</h3>
          <div className="p-2 rounded-full bg-purple-100">
            <DollarSign size={20} className="text-purple-600" />
          </div>
        </div>
        
        <div className="mt-3 space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-gray-600">Facebook</span>
              <span className="font-semibold text-gray-800">$1.2M</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-purple-500 rounded-full" style={{width: '60%'}}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-gray-600">Google</span>
              <span className="font-semibold text-gray-800">$28K</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-orange-500 rounded-full" style={{width: '40%'}}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-gray-600">LinkedIn</span>
              <span className="font-semibold text-gray-800">$38K</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{width: '45%'}}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-gray-600">Snapchat</span>
              <span className="font-semibold text-gray-800">$15K</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-pink-500 rounded-full" style={{width: '22%'}}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-gray-600">Twitter</span>
              <span className="font-semibold text-gray-800">$12K</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-sky-500 rounded-full" style={{width: '18%'}}></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetCard;
