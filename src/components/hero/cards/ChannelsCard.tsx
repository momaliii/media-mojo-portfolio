
import React from "react";
import { PieChart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const channels = [
  { name: "Paid Social", percentage: 45, width: "w-full" },
  { name: "Search", percentage: 30, width: "w-2/3" },
  { name: "Display", percentage: 15, width: "w-1/3" },
  { name: "Video", percentage: 10, width: "w-[22.22%]" },
];

const ChannelsCard = () => {
  
  return (
    <Card className="overflow-hidden shadow-md border-0 hover:shadow-lg transition-all bg-card text-card-foreground rounded-xl">
      <CardContent className="p-5 sm:p-6">
        <div className="flex justify-between items-center gap-3 mb-5">
          <h2 className="font-semibold text-card-foreground text-lg">Channels</h2>
          <div className="p-2 shrink-0 rounded-full bg-primary/10" aria-hidden="true">
            <PieChart size={20} className="text-primary" />
          </div>
        </div>
        
        <ul className="space-y-4">
          {channels.map(({ name, percentage, width }) => (
            <li key={name} className="min-w-0 space-y-2">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-3 text-sm leading-5">
                <span className="text-card-foreground">{name}</span>
                <span className="font-semibold tabular-nums text-card-foreground whitespace-nowrap">{percentage}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted" aria-hidden="true">
                <div className={`h-full rounded-full bg-primary ${width}`} />
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default ChannelsCard;
