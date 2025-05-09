
import React from "react";
import { Linkedin, LineChart, Facebook, BarChart } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { trackEvent } from "@/utils/analytics";

interface AdGalleryHeaderProps {
  toggleAutoplay?: () => void;
  autoplayEnabled?: boolean;
}

const AdGalleryHeader: React.FC<AdGalleryHeaderProps> = ({ 
  toggleAutoplay, 
  autoplayEnabled = true 
}) => {
  const handleAutoplayToggle = (checked: boolean) => {
    if (toggleAutoplay) {
      toggleAutoplay();
      trackEvent('toggle_autoplay', {
        enabled: checked
      });
    }
  };

  return (
    <div className="text-center mb-12 opacity-0 animate-fade-in-up">
      <h2 id="ad-gallery-heading" className="text-3xl md:text-4xl font-bold mb-4 relative inline-block">
        Ad Campaign Showcase
        <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-media-purple to-media-oceanblue transform scale-x-0 animate-[scale-in_0.5s_ease-out_forwards]"></span>
      </h2>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto">
        Browse our portfolio of successful ad campaigns across various industries and platforms.
        Each screenshot demonstrates our approach to creating engaging, high-converting ads.
      </p>
      
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg inline-flex items-center gap-2 border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
          <Linkedin className="text-[#0A66C2]" size={20} aria-hidden="true" />
          <span className="font-medium text-gray-700">
            LinkedIn campaigns for non-profit organizations across the Middle East
          </span>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg inline-flex items-center gap-2 border border-blue-200 shadow-sm hover:shadow-md transition-shadow">
          <Facebook className="text-[#1877F2]" size={20} aria-hidden="true" />
          <span className="font-medium text-gray-700">
            META ADS with +6.77M EGP in revenue and 18,639 orders
          </span>
        </div>
        
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg inline-flex items-center gap-2 border border-green-100 shadow-sm hover:shadow-md transition-shadow">
          <LineChart className="text-[#34A853]" size={20} aria-hidden="true" />
          <span className="font-medium text-gray-700">
            Real campaign analytics with +3.66M EGP in revenue
          </span>
        </div>
        
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg inline-flex items-center gap-2 border border-indigo-100 shadow-sm hover:shadow-md transition-shadow">
          <BarChart className="text-[#6366f1]" size={20} aria-hidden="true" />
          <span className="font-medium text-gray-700">
            Lightfunnel campaigns with +3.7M EGP in sales and 15,644 orders
          </span>
        </div>
      </div>
      
      {toggleAutoplay && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <Switch
            id="autoplay-toggle"
            checked={autoplayEnabled}
            onCheckedChange={handleAutoplayToggle}
            aria-label={autoplayEnabled ? "Disable autoplay" : "Enable autoplay"}
          />
          <Label htmlFor="autoplay-toggle" className="text-sm text-gray-600">
            Auto-rotate slides: {autoplayEnabled ? 'On' : 'Off'}
          </Label>
        </div>
      )}
    </div>
  );
};

export default AdGalleryHeader;
