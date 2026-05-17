
import React from "react";
import { DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const BudgetCard = () => {
  return (
    <Card className="overflow-hidden shadow-md border-0 hover:shadow-lg transition-all bg-white rounded-xl">
      <CardContent className="p-5 sm:p-6">
        <div className="flex justify-between items-center mb-5">
          <h3 className="font-semibold text-[#221F26] text-lg">Budget</h3>
          <div className="p-2 rounded-full bg-[#7E69AB]/10">
            <DollarSign size={20} className="text-[#7E69AB]" />
          </div>
        </div>
        
        <div className="mt-3 space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-[#221F26]/80">Facebook</span>
              <span className="font-semibold text-[#221F26]">$1.2M</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#7E69AB] rounded-full" style={{width: '75%'}}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-[#221F26]/80">Google</span>
              <span className="font-semibold text-[#221F26]">$28K</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-orange-500 rounded-full" style={{width: '25%'}}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-[#221F26]/80">LinkedIn</span>
              <span className="font-semibold text-[#221F26]">$38K</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{width: '30%'}}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-[#221F26]/80">TikTok</span>
              <span className="font-semibold text-[#221F26]">$13K</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-black rounded-full" style={{width: '20%'}}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-[#221F26]/80">Snapchat</span>
              <span className="font-semibold text-[#221F26]">$15K</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-yellow-500 rounded-full" style={{width: '22%'}}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-[#221F26]/80">Twitter</span>
              <span className="font-semibold text-[#221F26]">$12K</span>
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
