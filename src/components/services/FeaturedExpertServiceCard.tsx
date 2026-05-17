
import React from "react";
import { Check } from "lucide-react";
import { featuredService } from "./ExpertServicesData";

const FeaturedExpertServiceCard = () => {
  return (
    <div className="bg-white dark:bg-gray-800/90 rounded-[20px] shadow-md hover:shadow-lg transition-all duration-300 h-full overflow-hidden">
      <div className={`${featuredService.color} p-6 sm:p-8`}>
        <h3 className="text-2xl font-bold text-white mb-2">{featuredService.title}</h3>
      </div>
      <div className="p-6 sm:p-8">
        <ul className="space-y-3">
          {featuredService.description.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="bg-green-100 dark:bg-green-900 rounded-full p-1 mr-3 mt-0.5">
                <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
              </span>
              <span className="text-gray-700 dark:text-gray-300">{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="px-6 pb-6 sm:px-8 sm:pb-8">
        <button 
          className="text-media-purple hover:text-media-oceanblue dark:text-media-oceanblue dark:hover:text-media-purple text-sm font-medium flex items-center transition-colors"
          aria-label="Learn more about our strategic media buying approach"
        >
          Learn more about our approach <span className="ml-1">→</span>
        </button>
      </div>
    </div>
  );
};

export default FeaturedExpertServiceCard;
