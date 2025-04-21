
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
          className="bg-white/50 backdrop-blur-sm p-1.5 rounded-2xl shadow-sm border border-gray-100/50"
        >
          <ToggleGroup 
            type="single" 
            value={filter}
            onValueChange={(value) => value && setFilter(value)}
            className="flex flex-wrap justify-center gap-1"
          >
            <ToggleGroupItem value="all" className="rounded-xl px-4 py-2 text-sm font-medium data-[state=on]:bg-white data-[state=on]:text-media-purple data-[state=on]:shadow-sm">
              All Work
            </ToggleGroupItem>
            <ToggleGroupItem value="e-commerce" className="rounded-xl px-4 py-2 text-sm font-medium data-[state=on]:bg-white data-[state=on]:text-media-purple data-[state=on]:shadow-sm">
              E-commerce
            </ToggleGroupItem>
            <ToggleGroupItem value="b2b" className="rounded-xl px-4 py-2 text-sm font-medium data-[state=on]:bg-white data-[state=on]:text-media-purple data-[state=on]:shadow-sm">
              B2B
            </ToggleGroupItem>
            <ToggleGroupItem value="local" className="rounded-xl px-4 py-2 text-sm font-medium data-[state=on]:bg-white data-[state=on]:text-media-purple data-[state=on]:shadow-sm">
              Local Business
            </ToggleGroupItem>
            <ToggleGroupItem value="branding" className="rounded-xl px-4 py-2 text-sm font-medium data-[state=on]:bg-white data-[state=on]:text-media-purple data-[state=on]:shadow-sm">
              Events & Branding
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
            <CaseStudyCard key={study.title + index} study={study} index={index} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default FilterTabs;
