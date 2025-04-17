
import React from "react";
import { ShieldCheck, Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdGalleryFooter: React.FC = () => {
  return (
    <div className="mt-16">
      <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center mb-4 md:mb-0">
          <ShieldCheck className="w-5 h-5 mr-3 text-media-purple" />
          <span className="text-sm text-gray-700 font-medium">All campaign images are protected</span>
        </div>
        
        <div className="flex items-center">
          <Globe className="w-5 h-5 mr-3 text-media-oceanblue" />
          <span className="text-sm text-gray-700">Campaigns across 5 countries</span>
        </div>
        
        <Button className="mt-4 md:mt-0 bg-media-purple hover:bg-media-darkpurple text-white">
          Request Full Portfolio
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default AdGalleryFooter;
