
import React from "react";
import { MousePointerClick } from "lucide-react";

const CPCCard = () => {
  return (
    <div className="hero-grid-item col-span-1 row-span-1 bg-media-purple text-white shadow-lg rounded-xl p-4 flex flex-col">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">CPC</span>
        <MousePointerClick size={18} />
      </div>
      <div className="flex-1 flex items-center justify-center">
        <span className="text-3xl font-bold">$1.18</span>
      </div>
      <div className="text-xs text-white/70">
        <span className="inline-flex items-center">
          <span>↓ 24% vs. benchmark</span>
        </span>
      </div>
    </div>
  );
};

export default CPCCard;
