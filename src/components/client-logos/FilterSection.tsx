
import React from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Filter, Search, GridIcon, LayoutList } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

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
    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
      <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-md">
          <Filter size={14} className="text-media-purple" />
          <Select value={selectedIndustry} onValueChange={onIndustryChange}>
            <SelectTrigger className="border-0 bg-transparent w-[160px] h-7 p-0 hover:bg-transparent focus:ring-0 focus:ring-offset-0">
              <SelectValue placeholder="All Industries" />
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
        </div>
        
        <div className="relative w-full sm:w-[200px]">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input 
            placeholder="Search clients..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-8 h-8 text-sm"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500">View:</span>
        <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && onViewModeChange(value as "grid" | "compact")} size="sm">
          <ToggleGroupItem value="grid" aria-label="Grid view" className="px-2 py-1 h-7">
            <GridIcon size={14} />
          </ToggleGroupItem>
          <ToggleGroupItem value="compact" aria-label="Compact view" className="px-2 py-1 h-7">
            <LayoutList size={14} />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
};

export default FilterSection;
