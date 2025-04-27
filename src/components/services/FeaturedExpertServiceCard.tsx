
import React from "react";
import { ChartLine } from "lucide-react";

const FeaturedExpertServiceCard = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all hover:-translate-y-1 hover:shadow-xl">
      <div className="flex flex-col h-full">
        <div className="bg-gradient-to-r from-[#8B5CF6] to-[#0EA5E9] p-5">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold text-white">Strategic Media Buying</h3>
            <ChartLine className="w-10 h-10 text-white opacity-75" aria-hidden="true" />
          </div>
        </div>
        <div className="p-6 flex-grow">
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="bg-green-100 dark:bg-green-900 rounded-full p-1 mr-2 mt-0.5" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 dark:text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </span>
              <span className="text-gray-700 dark:text-gray-300">Cross-platform campaign management</span>
            </li>
            <li className="flex items-start">
              <span className="bg-green-100 dark:bg-green-900 rounded-full p-1 mr-2 mt-0.5" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 dark:text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </span>
              <span className="text-gray-700 dark:text-gray-300">Data-driven optimization strategies</span>
            </li>
            <li className="flex items-start">
              <span className="bg-green-100 dark:bg-green-900 rounded-full p-1 mr-2 mt-0.5" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 dark:text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </span>
              <span className="text-gray-700 dark:text-gray-300">Advanced budget management</span>
            </li>
            <li className="flex items-start">
              <span className="bg-green-100 dark:bg-green-900 rounded-full p-1 mr-2 mt-0.5" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 dark:text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </span>
              <span className="text-gray-700 dark:text-gray-300">Global market experience</span>
            </li>
          </ul>
        </div>
        <div className="p-6 pt-0">
          <button 
            className="text-[#8B5CF6] dark:text-[#0EA5E9] hover:underline text-sm font-medium flex items-center hover:text-opacity-80 transition-colors"
            aria-label="Learn more about our strategic media buying approach"
          >
            Learn more about our approach <span className="ml-1">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedExpertServiceCard;
