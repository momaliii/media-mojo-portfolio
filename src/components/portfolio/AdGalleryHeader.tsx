
import React from "react";
import { Linkedin } from "lucide-react";

const AdGalleryHeader: React.FC = () => {
  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Ad Campaign Showcase</h2>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto">
        Browse our portfolio of successful ad campaigns across various industries and platforms.
        Each screenshot demonstrates our approach to creating engaging, high-converting ads.
      </p>
      
      <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg inline-flex items-center gap-2 border border-blue-100">
        <Linkedin className="text-[#0A66C2]" size={20} />
        <span className="font-medium text-gray-700">
          Now featuring LinkedIn campaigns for non-profit organizations in Saudi Arabia and across the Middle East
        </span>
      </div>
    </div>
  );
};

export default AdGalleryHeader;
