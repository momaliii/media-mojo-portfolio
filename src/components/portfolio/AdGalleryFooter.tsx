
import React from "react";
import { ShieldCheck, Globe } from "lucide-react";

const AdGalleryFooter: React.FC = () => {
  return (
    <>
      <div className="flex items-center justify-center text-sm text-gray-500 mt-4">
        <ShieldCheck className="w-4 h-4 mr-2" />
        <span>Images are protected and cannot be downloaded</span>
      </div>
      
      <div className="mt-8 flex items-center justify-center gap-2">
        <Globe className="w-5 h-5 text-media-oceanblue" />
        <span className="text-sm text-gray-600">Campaigns spanning Saudi Arabia, Turkey, Pakistan, Tunisia, and Oman</span>
      </div>
    </>
  );
};

export default AdGalleryFooter;
