
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { CaseStudy } from "@/data/caseStudies";

interface CaseStudyCardProps {
  study: CaseStudy;
  index: number;
}

const CaseStudyCard = ({ study, index }: CaseStudyCardProps) => {
  // Helper function to get pretty category name
  const getCategoryName = (category: string): string => {
    switch (category) {
      case "e-commerce": return "E-commerce";
      case "b2b": return "B2B";
      case "apps": return "Mobile App";
      case "branding": return "Branding";
      case "local": return "Local Business";
      case "travel": return "Travel";
      default: return category;
    }
  };
  
  // Get gradient class based on category
  const getGradientClass = (category: string): string => {
    switch (category) {
      case "e-commerce": return "bg-gradient-to-br from-media-purple/80 to-media-pink/80";
      case "b2b": return "bg-gradient-to-br from-media-blue/90 to-media-oceanblue/90";
      case "apps": return "bg-gradient-to-br from-indigo-500/80 to-blue-500/80";
      case "branding": return "bg-gradient-to-br from-emerald-500/80 to-media-oceanblue/80";
      case "local": return "bg-gradient-to-br from-indigo-500/80 to-media-vibrantpurple/80";
      case "travel": return "bg-gradient-to-br from-sky-500/80 to-media-blue/80";
      default: return "bg-gradient-to-br from-gray-500/80 to-gray-700/80";
    }
  };

  return (
    <Card 
      className="overflow-hidden cursor-pointer border border-gray-200 hover:shadow-lg transition-all opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className={`h-48 relative overflow-hidden ${getGradientClass(study.category)}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white text-opacity-50 font-bold text-xl transform rotate-[-30deg] select-none" style={{fontSize: '28px'}}>
            CASE STUDY
          </span>
        </div>
        <div className="absolute bottom-4 left-4">
          <Badge className="bg-white/90 text-gray-800 hover:bg-white/90">
            {getCategoryName(study.category)}
          </Badge>
        </div>
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

export default CaseStudyCard;
