
import React, { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import CaseStudyCard from "@/components/portfolio/CaseStudyCard";
import { CaseStudy } from "@/data/caseStudies";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface EnhancedFilterTabsProps {
  filter: string;
  setFilter: (value: string) => void;
  caseStudies: CaseStudy[];
}

const EnhancedFilterTabs = ({ filter, setFilter, caseStudies }: EnhancedFilterTabsProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBudgets, setSelectedBudgets] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  
  const budgetRanges = [
    { id: "small", label: "$1K - $10K" },
    { id: "medium", label: "$10K - $50K" },
    { id: "large", label: "$50K+" },
  ];
  
  const platforms = [
    { id: "facebook", label: "Facebook" },
    { id: "instagram", label: "Instagram" },
    { id: "tiktok", label: "TikTok" },
    { id: "linkedin", label: "LinkedIn" },
    { id: "google", label: "Google" },
  ];
  
  // Filter case studies based on all criteria
  const filteredCaseStudies = caseStudies.filter(study => {
    // Filter by category
    const categoryMatch = filter === "all" || study.category === filter;
    
    // Filter by search query
    const searchMatch = searchQuery === "" || 
      study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.industry?.toLowerCase().includes(searchQuery.toLowerCase()) || false;
    
    // Filter by budget (if any selected)
    const budgetMatch = selectedBudgets.length === 0 || 
      (study.budgetRange && selectedBudgets.includes(study.budgetRange)) || false;
    
    // Filter by platform (if any selected)
    const platformMatch = selectedPlatforms.length === 0 || 
      (study.platforms && study.platforms.some(platform => selectedPlatforms.includes(platform))) || false;
    
    return categoryMatch && searchMatch && budgetMatch && platformMatch;
  });
  
  // Toggle budget filter
  const toggleBudget = (budgetId: string) => {
    if (selectedBudgets.includes(budgetId)) {
      setSelectedBudgets(selectedBudgets.filter(id => id !== budgetId));
    } else {
      setSelectedBudgets([...selectedBudgets, budgetId]);
    }
  };
  
  // Toggle platform filter
  const togglePlatform = (platformId: string) => {
    if (selectedPlatforms.includes(platformId)) {
      setSelectedPlatforms(selectedPlatforms.filter(id => id !== platformId));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platformId]);
    }
  };
  
  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedBudgets([]);
    setSelectedPlatforms([]);
    setFilter("all");
  };
  
  // Check if any filter is active
  const hasActiveFilters = filter !== "all" || 
    searchQuery !== "" || 
    selectedBudgets.length > 0 || 
    selectedPlatforms.length > 0;

  return (
    <div className="space-y-8">
      {/* Search and filter controls */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <div className="relative flex-1 max-w-md mx-auto sm:mx-0">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-600" size={16} />
          <Input
            placeholder="Search case studies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-100/50 dark:border-gray-700/50 rounded-xl"
          />
        </div>
        
        <div className="flex gap-2 justify-center">
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-xl shadow-sm border border-gray-100/50 dark:border-gray-700/50">
                <Filter size={16} />
                <span className="text-sm">Filters</span>
                {(selectedBudgets.length > 0 || selectedPlatforms.length > 0) && (
                  <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-media-purple dark:bg-media-blue rounded-full">
                    {selectedBudgets.length + selectedPlatforms.length}
                  </span>
                )}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4 dark:bg-gray-900">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2 text-sm text-gray-900 dark:text-gray-100">Budget Range</h4>
                  <div className="space-y-2">
                    {budgetRanges.map(budget => (
                      <div key={budget.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`budget-${budget.id}`} 
                          checked={selectedBudgets.includes(budget.id)}
                          onCheckedChange={() => toggleBudget(budget.id)}
                        />
                        <Label htmlFor={`budget-${budget.id}`} className="text-sm text-gray-600 dark:text-gray-400">{budget.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2 text-sm text-gray-900 dark:text-gray-100">Platform</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {platforms.map(platform => (
                      <div key={platform.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`platform-${platform.id}`} 
                          checked={selectedPlatforms.includes(platform.id)}
                          onCheckedChange={() => togglePlatform(platform.id)}
                        />
                        <Label htmlFor={`platform-${platform.id}`} className="text-sm text-gray-600 dark:text-gray-400">{platform.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <button 
                  onClick={resetFilters}
                  className="w-full mt-2 text-sm text-media-purple dark:text-media-blue hover:underline"
                >
                  Reset all filters
                </button>
              </div>
            </PopoverContent>
          </Popover>
          
          {hasActiveFilters && (
            <button 
              onClick={resetFilters}
              className="bg-media-purple/10 dark:bg-media-blue/10 text-media-purple dark:text-media-blue px-4 py-2 rounded-xl text-sm"
            >
              Clear
            </button>
          )}
        </div>
      </motion.div>
      
      {/* Category filter tabs */}
      <div className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-1.5 rounded-2xl shadow-sm border border-gray-100/50 dark:border-gray-700/50"
        >
          <ToggleGroup 
            type="single" 
            value={filter}
            onValueChange={(value) => value && setFilter(value)}
            className="flex flex-wrap justify-center gap-1"
          >
            <ToggleGroupItem value="all" className="rounded-xl px-4 py-2 text-sm font-medium data-[state=on]:bg-white data-[state=on]:dark:bg-gray-700 data-[state=on]:text-media-purple data-[state=on]:dark:text-media-blue data-[state=on]:shadow-sm">
              All Work
            </ToggleGroupItem>
            <ToggleGroupItem value="e-commerce" className="rounded-xl px-4 py-2 text-sm font-medium data-[state=on]:bg-white data-[state=on]:dark:bg-gray-700 data-[state=on]:text-media-purple data-[state=on]:dark:text-media-blue data-[state=on]:shadow-sm">
              E-commerce
            </ToggleGroupItem>
            <ToggleGroupItem value="f&b" className="rounded-xl px-4 py-2 text-sm font-medium data-[state=on]:bg-white data-[state=on]:dark:bg-gray-700 data-[state=on]:text-media-purple data-[state=on]:dark:text-media-blue data-[state=on]:shadow-sm">
              F&B
            </ToggleGroupItem>
            <ToggleGroupItem value="ngo" className="rounded-xl px-4 py-2 text-sm font-medium data-[state=on]:bg-white data-[state=on]:dark:bg-gray-700 data-[state=on]:text-media-purple data-[state=on]:dark:text-media-blue data-[state=on]:shadow-sm">
              NGO
            </ToggleGroupItem>
            <ToggleGroupItem value="branding" className="rounded-xl px-4 py-2 text-sm font-medium data-[state=on]:bg-white data-[state=on]:dark:bg-gray-700 data-[state=on]:text-media-purple data-[state=on]:dark:text-media-blue data-[state=on]:shadow-sm">
              Events & Branding
            </ToggleGroupItem>
          </ToggleGroup>
        </motion.div>
      </div>
      
      {/* Display filtered case studies */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={filter + searchQuery + selectedBudgets.join() + selectedPlatforms.join()}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {filteredCaseStudies.length > 0 ? (
            filteredCaseStudies.map((study, index) => (
              <CaseStudyCard key={study.title + index} study={study} index={index} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No case studies match your filters. Try adjusting your criteria.</p>
              <button 
                onClick={resetFilters}
                className="mt-4 text-media-purple dark:text-media-blue hover:underline"
              >
                Reset filters
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default EnhancedFilterTabs;
