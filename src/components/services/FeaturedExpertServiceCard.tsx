
import React from "react";
import { Monitor } from "lucide-react";
import { featuredService } from "./ExpertServicesData";

const FeaturedExpertServiceCard = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300">
      <div className={`${featuredService.color} p-6`}>
        <div className="flex justify-between items-start">
          <h3 className="text-2xl font-bold text-white">{featuredService.title}</h3>
          <Monitor className="w-10 h-10 text-white opacity-75" aria-hidden="true" />
        </div>
      </div>
      <div className="p-6">
        <ul className="space-y-3">
          {featuredService.description.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="bg-green-100 dark:bg-green-900 rounded-full p-1 mr-3 mt-0.5" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 dark:text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </span>
              <span className="text-gray-700 dark:text-gray-300">{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-6 pt-0">
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
