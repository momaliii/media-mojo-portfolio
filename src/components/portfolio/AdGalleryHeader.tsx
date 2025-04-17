
import React from "react";

interface AdGalleryHeaderProps {
  heading: string;
  description: string;
}

const AdGalleryHeader: React.FC<AdGalleryHeaderProps> = ({ heading, description }) => {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <span className="inline-block py-1 px-3 rounded-full bg-media-purple/10 text-media-purple font-medium text-sm mb-4">
        Ad Campaigns
      </span>
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        {heading}
      </h2>
      <p className="text-gray-600">
        {description}
      </p>
    </div>
  );
};

export default AdGalleryHeader;
