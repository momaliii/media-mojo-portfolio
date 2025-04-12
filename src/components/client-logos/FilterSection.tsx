
import React, { useState } from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Filter, Search, GridIcon, LayoutGrid } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type FilterSectionProps = {
  industries: string[];
  selectedIndustry: string;
  onIndustryChange: (industry: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  viewMode: "grid" | "compact";
  onViewModeChange: (mode: "grid" | "compact") => void;
};

const FilterSection: React.FC<FilterSectionProps> = ({ 
  industries, 
  selectedIndustry, 
  onIndustryChange,
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 justify-between mb-8">
      <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-media-purple" />
          <span className="text-sm font-medium whitespace-nowrap">Filter by:</span>
        </div>
        <Select value={selectedIndustry} onValueChange={onIndustryChange}>
          <SelectTrigger className="w-full sm:w-[220px]">
            <SelectValue placeholder="Select an industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Industries</SelectItem>
            {industries.map((industry) => (
              <SelectItem key={industry} value={industry}>
                {industry}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <div className="relative w-full sm:w-[280px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input 
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2 self-end">
        <span className="text-sm text-gray-500">View:</span>
        <div className="flex border rounded-md overflow-hidden">
          <Button 
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            className="rounded-none px-2 py-1 h-9"
            onClick={() => onViewModeChange("grid")}
          >
            <GridIcon size={16} />
          </Button>
          <Button 
            variant={viewMode === "compact" ? "default" : "ghost"}
            size="sm"
            className="rounded-none px-2 py-1 h-9"
            onClick={() => onViewModeChange("compact")}
          >
            <LayoutGrid size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
