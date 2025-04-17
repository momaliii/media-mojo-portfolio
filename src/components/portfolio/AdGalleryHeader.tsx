
import React from "react";

interface AdGalleryHeaderProps {
  heading: string;
  description: string;
}

const AdGalleryHeader: React.FC<AdGalleryHeaderProps> = ({ heading, description }) => {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <span className="inline-block py-1.5 px-4 rounded-full bg-media-purple/10 text-media-purple font-medium text-sm mb-5">
        Campaign Showcase
      </span>
      <h2 className="text-3xl md:text-4xl font-bold mb-5 bg-clip-text text-transparent bg-gradient-to-r from-media-darkpurple to-media-oceanblue">
        {heading}
      </h2>
      <p className="text-gray-600 md:text-lg">
        {description}
      </p>
    </div>
  );
};

export default AdGalleryHeader;
