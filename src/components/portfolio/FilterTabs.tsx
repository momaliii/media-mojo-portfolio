
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
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-50/70 p-1.5 rounded-lg shadow-inner"
        >
          <ToggleGroup 
            type="single" 
            value={filter}
            onValueChange={(value) => value && setFilter(value)}
            className="flex flex-wrap justify-center gap-1"
          >
            <ToggleGroupItem value="all" className="rounded-md px-4 py-1.5 text-sm font-medium data-[state=on]:bg-white data-[state=on]:text-media-purple data-[state=on]:shadow-sm">
              All Work
            </ToggleGroupItem>
            <ToggleGroupItem value="e-commerce" className="rounded-md px-4 py-1.5 text-sm font-medium data-[state=on]:bg-white data-[state=on]:text-media-purple data-[state=on]:shadow-sm">
              E-commerce
            </ToggleGroupItem>
            <ToggleGroupItem value="b2b" className="rounded-md px-4 py-1.5 text-sm font-medium data-[state=on]:bg-white data-[state=on]:text-media-purple data-[state=on]:shadow-sm">
              B2B
            </ToggleGroupItem>
            <ToggleGroupItem value="branding" className="rounded-md px-4 py-1.5 text-sm font-medium data-[state=on]:bg-white data-[state=on]:text-media-purple data-[state=on]:shadow-sm">
              Branding
            </ToggleGroupItem>
            <ToggleGroupItem value="local" className="rounded-md px-4 py-1.5 text-sm font-medium data-[state=on]:bg-white data-[state=on]:text-media-purple data-[state=on]:shadow-sm">
              Local
            </ToggleGroupItem>
          </ToggleGroup>
        </motion.div>
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
            <motion.div
              key={study.title + index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(index * 0.1, 0.5), duration: 0.4 }}
            >
              <CaseStudyCard study={study} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default FilterTabs;
