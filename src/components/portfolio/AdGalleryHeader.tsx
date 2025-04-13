
import React from "react";
import { Linkedin, LineChart, Facebook } from "lucide-react";

const AdGalleryHeader: React.FC = () => {
  return (
    <div className="text-center mb-12 opacity-0 animate-fade-in-up">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block">
        Ad Campaign Showcase
        <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-media-purple to-media-oceanblue transform scale-x-0 animate-[scale-in_0.5s_ease-out_forwards]"></span>
      </h2>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto">
        Browse our portfolio of successful ad campaigns across various industries and platforms.
        Each screenshot demonstrates our approach to creating engaging, high-converting ads.
      </p>
      
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg inline-flex items-center gap-2 border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
          <Linkedin className="text-[#0A66C2]" size={20} />
          <span className="font-medium text-gray-700">
            LinkedIn campaigns for non-profit organizations across the Middle East
          </span>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg inline-flex items-center gap-2 border border-blue-200 shadow-sm hover:shadow-md transition-shadow">
          <Facebook className="text-[#1877F2]" size={20} />
          <span className="font-medium text-gray-700">
            META ADS with +6.77M EGP in revenue and 18,639 orders
          </span>
        </div>
        
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg inline-flex items-center gap-2 border border-green-100 shadow-sm hover:shadow-md transition-shadow">
          <LineChart className="text-[#34A853]" size={20} />
          <span className="font-medium text-gray-700">
            Real campaign analytics with +3.66M EGP in revenue
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdGalleryHeader;
