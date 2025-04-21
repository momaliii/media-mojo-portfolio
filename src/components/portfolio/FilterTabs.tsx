
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Users, Globe, Tag } from "lucide-react";
import { CaseStudy } from "@/data/caseStudies";

interface FilterTabsProps {
  filter: string;
  setFilter: (value: string) => void;
  filteredCaseStudies: CaseStudy[];
}

const FilterTabs = ({ filter, setFilter, filteredCaseStudies }: FilterTabsProps) => {
  const filterItems = [
    { id: "all", label: "All Projects", icon: null, bgColor: "bg-[#6B7AFF]" },
    { id: "e-commerce", label: "E-commerce", icon: ShoppingCart },
    { id: "b2b", label: "B2B", icon: Users },
    { id: "branding", label: "Branding", icon: Tag },
    { id: "local", label: "Local", icon: Globe },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-center flex-wrap gap-3">
        {filterItems.map((item) => {
          const isActive = filter === item.id;
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => setFilter(item.id)}
              className={`
                inline-flex items-center px-4 py-2 rounded-full transition-all
                ${isActive 
                  ? (item.bgColor || "bg-gray-100") + " text-white"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"}
              `}
            >
              {Icon && <Icon className="w-4 h-4 mr-2" />}
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
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
            <CaseStudyCard key={study.title} study={study} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const CaseStudyCard = ({ study }: { study: CaseStudy }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="aspect-[16/9] bg-gradient-to-br from-purple-100 to-blue-100 relative">
        {study.screenshot && (
          <img 
            src={study.screenshot} 
            alt={study.title}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {study.platforms?.map((platform) => (
            <span key={platform} className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
              {platform}
            </span>
          ))}
        </div>
        
        <h3 className="text-xl font-bold mb-2">{study.title}</h3>
        <div className="text-[#6B7AFF] font-semibold mb-3">{study.metrics[0]?.value}</div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {study.description}
        </p>
        
        <a 
          href="#" 
          className="text-[#6B7AFF] text-sm font-medium inline-flex items-center hover:underline"
        >
          View Details →
        </a>
      </div>
    </motion.div>
  );
};

export default FilterTabs;
