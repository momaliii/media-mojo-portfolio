
import React from "react";
import ExpertServiceCard from "./ExpertServiceCard";
import FeaturedExpertServiceCard from "./FeaturedExpertServiceCard";
import { 
  MonitorSmartphone, 
  Search, 
  BarChart, 
  Target, 
  LineChart,
  Clock,
  Globe
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const ExpertServices = () => {
  const isMobile = useIsMobile();
  
  // Expert media buying solutions services
  const expertServices = [
    {
      icon: <MonitorSmartphone className="w-8 h-8 text-white" />,
      title: "Social Media Marketing",
      description: "Strategic campaigns across Facebook, Instagram, LinkedIn, TikTok, Snapchat, and Twitter to reach and engage your target audience.",
      color: "bg-[#A88BEB]"
    },
    {
      icon: <Search className="w-8 h-8 text-white" />,
      title: "Search Engine Marketing",
      description: "Data-driven PPC campaigns on Google Ads to capture high-intent traffic and drive conversions with optimal ROI.",
      color: "bg-[#0ABDF2]"
    },
    {
      icon: <LineChart className="w-8 h-8 text-white" />,
      title: "Performance Analysis",
      description: "In-depth campaign tracking and reporting using Google Data Studio, Microsoft Clarity, and Google Analytics with actionable insights.",
      color: "bg-[#FF7E33]"
    },
    {
      icon: <Target className="w-8 h-8 text-white" />,
      title: "Audience Strategy",
      description: "Developing precise targeting strategies based on demographics, interests, behaviors, and custom audiences for optimal campaign performance.",
      color: "bg-[#A88BEB]"
    },
    {
      icon: <Clock className="w-8 h-8 text-white" />,
      title: "Budget Optimization",
      description: "Strategic allocation and management of media budgets ranging from $15K to $35K+ to maximize ROI and business results.",
      color: "bg-[#E64FB8]"
    },
    {
      icon: <Globe className="w-8 h-8 text-white" />,
      title: "Global Campaign Management",
      description: "Expertise in managing campaigns across 10+ countries including Saudi Arabia, Egypt, Kuwait, Qatar, Turkey, China, UK, and the U.S.",
      color: "bg-[#619DF9]"
    },
  ];

  return (
    <div className="max-w-6xl mx-auto mb-20">
      <div className="text-center mb-10">
        <span className="inline-block py-1 px-3 rounded-full bg-media-purple/10 text-media-purple font-medium text-sm mb-4">
          My Expertise
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Expert <span className="text-[#55AAED]">Media Buying</span> Solutions
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Specialized services designed to maximize your advertising effectiveness and deliver 
          measurable business results across multiple platforms and markets.
        </p>
      </div>

      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl -z-10"></div>
        
        <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'} gap-8 p-6 md:p-10`}>
          <FeaturedExpertServiceCard />
          
          <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'} gap-6`}>
            {expertServices.slice(1, 5).map((service, index) => (
              <ExpertServiceCard 
                key={`expert-mini-${index}`}
                icon={service.icon}
                title={service.title}
                description={service.description}
                color={service.color}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertServices;
