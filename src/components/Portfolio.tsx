
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpRight } from "lucide-react";
import CaseStudyCard from "@/components/portfolio/CaseStudyCard";
import { caseStudies } from "@/data/caseStudies";

const Portfolio = () => {
  const [filter, setFilter] = useState("all");
  
  const filteredCaseStudies = filter === "all" 
    ? caseStudies 
    : caseStudies.filter(study => study.category === filter);

  return (
    <section id="portfolio" className="section-padding bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-media-purple/10 text-media-purple font-medium text-sm mb-4">
            My Work
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Recent <span className="gradient-text">Case Studies</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore some of my most successful media buying campaigns and the results they've achieved for clients across industries.
          </p>
        </div>

        {/* Portfolio Filter Tabs */}
        <Tabs defaultValue="all" className="mb-10" onValueChange={setFilter}>
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
        
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="inline-flex items-center">
            View More Case Studies
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
