
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  ExternalLink, 
  BarChart, 
  TrendingUp,
  ArrowUpRight
} from "lucide-react";

const Portfolio = () => {
  // Placeholder case studies
  const caseStudies = [
    {
      title: "E-commerce Revenue Growth",
      category: "e-commerce",
      image: "bg-gradient-to-br from-media-purple/80 to-media-pink/80",
      client: "Fashion Retailer",
      metrics: [
        { label: "ROAS", value: "8.2x" },
        { label: "Revenue", value: "$129K+" },
        { label: "Conversion", value: "+145%" }
      ],
      description: "Increased e-commerce sales for a fashion retailer through optimized Meta campaigns, achieving 8.2x ROAS and generating over $129,000 in revenue from a single campaign."
    },
    {
      title: "B2B Lead Generation",
      category: "b2b",
      image: "bg-gradient-to-br from-media-blue/90 to-media-oceanblue/90",
      client: "SaaS Platform",
      metrics: [
        { label: "CPL", value: "-42%" },
        { label: "Leads", value: "+124%" },
        { label: "CAC", value: "-28%" }
      ],
      description: "Implemented an account-based marketing approach with targeted LinkedIn and Google campaigns, reducing cost per qualified lead by 42%."
    },
    {
      title: "App Install Campaign",
      category: "apps",
      image: "bg-gradient-to-br from-media-orange/80 to-yellow-400/80",
      client: "Fitness App",
      metrics: [
        { label: "CPI", value: "$1.24" },
        { label: "Installs", value: "125K" },
        { label: "Retention", value: "+32%" }
      ],
      description: "Executed a multi-channel mobile app campaign that delivered 125K installs with a 32% improvement in 30-day user retention."
    },
    {
      title: "Brand Awareness Campaign",
      category: "branding",
      image: "bg-gradient-to-br from-emerald-500/80 to-media-oceanblue/80",
      client: "Food & Beverage",
      metrics: [
        { label: "Impressions", value: "12M" },
        { label: "CPM", value: "-24%" },
        { label: "Engagement", value: "+81%" }
      ],
      description: "Designed and managed programmatic display and video campaigns that reached over 12M targeted impressions with an 81% increase in engagement."
    },
    {
      title: "Local Business Growth",
      category: "local",
      image: "bg-gradient-to-br from-indigo-500/80 to-media-vibrantpurple/80",
      client: "Restaurant Chain",
      metrics: [
        { label: "Store Visits", value: "+45%" },
        { label: "CPA", value: "$8.42" },
        { label: "ROI", value: "3.8x" }
      ],
      description: "Implemented location-based campaigns for 24 restaurants, increasing in-store visits by 45% and driving a measurable lift in revenue."
    },
    {
      title: "Travel Booking Optimization",
      category: "travel",
      image: "bg-gradient-to-br from-sky-500/80 to-media-blue/80",
      client: "Travel Agency",
      metrics: [
        { label: "Conversion Rate", value: "+57%" },
        { label: "Booking Value", value: "+24%" },
        { label: "ROAS", value: "5.2x" }
      ],
      description: "Restructured search and display campaigns with advanced audience targeting, increasing booking conversion rates by 57%."
    }
  ];

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

const CaseStudyCard = ({ study, index }: { study: any, index: number }) => {
  return (
    <Card 
      className="overflow-hidden cursor-pointer border border-gray-200 hover:shadow-lg transition-all opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className={`h-48 ${study.image} flex items-end p-4`}>
        <Badge className="bg-white/90 text-gray-800 hover:bg-white/90">
          {study.category === "e-commerce" ? "E-commerce" : 
           study.category === "b2b" ? "B2B" :
           study.category === "apps" ? "Mobile App" :
           study.category === "branding" ? "Branding" :
           study.category === "local" ? "Local Business" :
           study.category === "travel" ? "Travel" : 
           study.category}
        </Badge>
      </div>
      <CardContent className="p-5">
        <div className="mb-2 text-sm text-gray-500">{study.client}</div>
        <h3 className="text-xl font-semibold mb-3">{study.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{study.description}</p>
        
        <div className="grid grid-cols-3 gap-2 mb-4">
          {study.metrics.map((metric, i) => (
            <div key={i} className="bg-gray-50 p-2 rounded text-center">
              <div className="font-semibold text-media-purple">{metric.value}</div>
              <div className="text-xs text-gray-500">{metric.label}</div>
            </div>
          ))}
        </div>
        
        <div className="flex items-center text-media-purple font-medium text-sm">
          <span>View case study</span>
          <ExternalLink className="ml-1 w-3 h-3" />
        </div>
      </CardContent>
    </Card>
  );
};

export default Portfolio;
