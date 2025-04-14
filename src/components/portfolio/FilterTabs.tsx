
import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import CaseStudyCard from "@/components/portfolio/CaseStudyCard";
import { CaseStudy } from "@/data/caseStudies";
import { motion, AnimatePresence } from "framer-motion";

interface FilterTabsProps {
  filter: string;
  setFilter: (value: string) => void;
  filteredCaseStudies: CaseStudy[];
}

const FilterTabs = ({ filter, setFilter, filteredCaseStudies }: FilterTabsProps) => {
  return (
    <div className="space-y-8">
      <div className="flex justify-center">
        <ToggleGroup 
          type="single" 
          value={filter}
          onValueChange={(value) => value && setFilter(value)} 
          className="bg-gray-100 p-1 rounded-lg"
        >
          <ToggleGroupItem value="all" className="rounded-md px-4 text-sm">All Work</ToggleGroupItem>
          <ToggleGroupItem value="e-commerce" className="rounded-md px-4 text-sm">E-commerce</ToggleGroupItem>
          <ToggleGroupItem value="b2b" className="rounded-md px-4 text-sm">B2B</ToggleGroupItem>
          <ToggleGroupItem value="branding" className="rounded-md px-4 text-sm">Branding</ToggleGroupItem>
          <ToggleGroupItem value="local" className="rounded-md px-4 text-sm">Local</ToggleGroupItem>
        </ToggleGroup>
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div 
          key={filter}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {filteredCaseStudies.map((study, index) => (
            <CaseStudyCard key={study.title + index} study={study} index={index} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default FilterTabs;
