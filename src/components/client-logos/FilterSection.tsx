
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from "lucide-react";

type FilterSectionProps = {
  industries: string[];
  selectedIndustry: string;
  onIndustryChange: (industry: string) => void;
};

const FilterSection: React.FC<FilterSectionProps> = ({ industries, selectedIndustry, onIndustryChange }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
      <div className="flex items-center gap-2">
        <Filter size={16} className="text-media-purple" />
        <span className="text-sm font-medium">Filter by Industry:</span>
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
    </div>
  );
};

export default FilterSection;
