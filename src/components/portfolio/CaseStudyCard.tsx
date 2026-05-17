import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { CaseStudy } from "@/data/caseStudies";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface CaseStudyCardProps {
  study: CaseStudy;
  index: number;
}

const CaseStudyCard = ({ study, index }: CaseStudyCardProps) => {
  const navigate = useNavigate();
  
  const titleToSlug = (title: string) => 
    title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  
  const handleCardClick = () => {
    const slug = study.slug || titleToSlug(study.title);
    navigate(`/case-study/${slug}`);
  };
  const getCategoryName = (category: string): string => {
    switch (category) {
      case "e-commerce": return "E-commerce";
      case "f&b": return "F&B";
      case "ngo": return "NGO";
      case "branding": return "Branding";
      case "b2b": return "B2B";
      case "local": return "Local Business";
      case "apps": return "Mobile App";
      case "travel": return "Travel";
      default: return category;
    }
  };
  
  const getBackgroundStyle = (study: CaseStudy) => {
    if (study.client === "CYC Academy") {
      return {
        backgroundImage: `url('/lovable-uploads/24b2712e-a180-499b-ae70-dcf44df8d187.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backgroundBlendMode: 'overlay',
      };
    }

    return {
      background: getGradientClass(study.category),
    };
  };

  const getGradientClass = (category: string): string => {
    switch (category) {
      case "e-commerce": return "bg-gradient-to-br from-media-purple/90 to-media-pink/90";
      case "f&b": return "bg-gradient-to-br from-media-orange/90 to-media-pink/90";
      case "ngo": return "bg-gradient-to-br from-media-blue/90 to-media-oceanblue/90";
      case "branding": return "bg-gradient-to-br from-emerald-500/90 to-media-oceanblue/90";
      case "b2b": return "bg-gradient-to-br from-media-blue/90 to-media-oceanblue/90";
      case "local": return "bg-gradient-to-br from-indigo-500/90 to-media-vibrantpurple/90";
      case "apps": return "bg-gradient-to-br from-indigo-500/90 to-blue-500/90";
      case "travel": return "bg-gradient-to-br from-sky-500/90 to-media-blue/90";
      default: return "bg-gradient-to-br from-gray-500/90 to-gray-700/90";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <Card className="group overflow-hidden cursor-pointer border-none rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 bg-white" onClick={handleCardClick}>
        <CardContent className="p-0 relative">
          <div 
            className={`h-52 relative overflow-hidden ${study.client === "CYC Academy" ? "" : getGradientClass(study.category)} transition-all duration-500 group-hover:h-56`}
            style={study.client === "CYC Academy" ? {
              backgroundImage: `url('/lovable-uploads/24b2712e-a180-499b-ae70-dcf44df8d187.png')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              backgroundBlendMode: 'overlay',
            } : undefined}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.2),rgba(255,255,255,0))]" />
            <div className="absolute inset-0 flex items-center justify-center opacity-50">
              <span className="text-white text-opacity-50 font-bold text-xl transform rotate-[-30deg] select-none" style={{fontSize: '28px'}}>
                CASE STUDY
              </span>
            </div>
            <div className="absolute bottom-4 left-4 transform transition-transform duration-300 group-hover:translate-y-1">
              <Badge className="bg-white/90 text-gray-800 hover:bg-white/90">
                {getCategoryName(study.category)}
              </Badge>
            </div>
          </div>
          <div className="p-6 md:p-7">
            <div className="mb-2 text-sm text-gray-500 font-medium">{study.client}</div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800 group-hover:text-media-purple transition-colors">
              {study.title}
            </h3>
            <p className="text-gray-600 text-sm mb-5 line-clamp-2 leading-relaxed">
              {study.description}
            </p>
            
            <div className="grid grid-cols-3 gap-3 mb-5">
              {study.metrics.map((metric, i) => (
                <div 
                  key={i} 
                  className="bg-gray-50 p-3 rounded-xl text-center transform transition-all duration-300 group-hover:translate-y-[-2px] group-hover:shadow-sm"
                >
                  <div className="font-semibold text-media-purple">{metric.value}</div>
                  <div className="text-xs text-gray-500 mt-1">{metric.label}</div>
                </div>
              ))}
            </div>
            
            <div className="flex items-center text-media-purple font-medium text-sm opacity-75 group-hover:opacity-100 transition-opacity">
              <span>View case study</span>
              <ExternalLink className="ml-1.5 w-3.5 h-3.5 transform transition-transform group-hover:translate-x-0.5" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CaseStudyCard;
