
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CaseStudyCard from "@/components/portfolio/CaseStudyCard";
import { CaseStudy } from "@/data/caseStudies";

interface FilterTabsProps {
  filter: string;
  setFilter: (value: string) => void;
  filteredCaseStudies: CaseStudy[];
}

const FilterTabs = ({ filter, setFilter, filteredCaseStudies }: FilterTabsProps) => {
  return (
    <Tabs defaultValue={filter} className="mb-10" onValueChange={setFilter}>
      <div className="flex justify-center">
        <TabsList className="bg-gray-100">
          <TabsTrigger value="all">All Work</TabsTrigger>
          <TabsTrigger value="e-commerce">E-commerce</TabsTrigger>
          <TabsTrigger value="b2b">B2B</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="local">Local</TabsTrigger>
        </TabsList>
      </div>
      
      <TabsContent value="all" className="mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredCaseStudies.map((study, index) => (
            <CaseStudyCard key={index} study={study} index={index} />
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="e-commerce" className="mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredCaseStudies.map((study, index) => (
            <CaseStudyCard key={index} study={study} index={index} />
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="b2b" className="mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredCaseStudies.map((study, index) => (
            <CaseStudyCard key={index} study={study} index={index} />
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="branding" className="mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredCaseStudies.map((study, index) => (
            <CaseStudyCard key={index} study={study} index={index} />
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="local" className="mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredCaseStudies.map((study, index) => (
            <CaseStudyCard key={index} study={study} index={index} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default FilterTabs;
