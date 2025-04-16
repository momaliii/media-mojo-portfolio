
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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { motion } from "framer-motion";

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
    <motion.div 
      className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-gradient-to-r from-gray-50/90 to-gray-50/70 p-4 rounded-xl shadow-inner"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-md shadow-sm border border-gray-100 transition-all hover:border-gray-200">
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
        
        <div className="relative w-full sm:w-[200px] transition-all">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input 
            placeholder="Search clients..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-8 h-8 text-sm border border-gray-100 shadow-sm bg-white transition-all focus:border-media-purple/30"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500 font-medium">View:</span>
        <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && onViewModeChange(value as "grid" | "compact")} size="sm">
          <ToggleGroupItem value="grid" aria-label="Grid view" className="px-2 py-1 h-7 bg-white border border-gray-100 data-[state=on]:bg-media-purple/10 data-[state=on]:border-media-purple/30">
            <GridIcon size={14} />
          </ToggleGroupItem>
          <ToggleGroupItem value="compact" aria-label="Compact view" className="px-2 py-1 h-7 bg-white border border-gray-100 data-[state=on]:bg-media-purple/10 data-[state=on]:border-media-purple/30">
            <LayoutList size={14} />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </motion.div>
  );
};

export default FilterSection;
