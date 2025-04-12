
import React from "react";
import { DollarSign } from "lucide-react";

const BudgetCard = () => {
  return (
    <div className="hero-grid-item col-span-1 row-span-1 bg-white shadow-lg rounded-xl p-4">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-500">Budget</span>
        <DollarSign size={18} className="text-media-purple" />
      </div>
      <div className="mt-4 space-y-1">
        <div className="w-full flex justify-between text-xs">
          <span>Facebook</span>
          <span className="font-semibold">$1.2M</span>
        </div>
        <div className="w-full h-1 bg-gray-100 rounded-full">
          <div className="h-1 bg-media-purple rounded-full" style={{width: '60%'}}></div>
        </div>
        <div className="w-full flex justify-between text-xs mt-2">
          <span>Google</span>
          <span className="font-semibold">$28K</span>
        </div>
        <div className="w-full h-1 bg-gray-100 rounded-full">
          <div className="h-1 bg-media-orange rounded-full" style={{width: '40%'}}></div>
        </div>
        <div className="w-full flex justify-between text-xs mt-2">
          <span>LinkedIn</span>
          <span className="font-semibold">$38K</span>
        </div>
        <div className="w-full h-1 bg-gray-100 rounded-full">
          <div className="h-1 bg-media-oceanblue rounded-full" style={{width: '55%'}}></div>
        </div>
        <div className="w-full flex justify-between text-xs mt-2">
          <span>Snapchat</span>
          <span className="font-semibold">$15K</span>
        </div>
        <div className="w-full h-1 bg-gray-100 rounded-full">
          <div className="h-1 bg-media-pink rounded-full" style={{width: '22%'}}></div>
        </div>
        <div className="w-full flex justify-between text-xs mt-2">
          <span>Twitter</span>
          <span className="font-semibold">$12K</span>
        </div>
        <div className="w-full h-1 bg-gray-100 rounded-full">
          <div className="h-1 bg-media-blue rounded-full" style={{width: '18%'}}></div>
        </div>
      </div>
    </div>
  );
};

export default BudgetCard;
