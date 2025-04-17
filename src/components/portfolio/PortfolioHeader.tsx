
import React from "react";

interface PortfolioHeaderProps {
  heading: string;
  description: string;
}

const PortfolioHeader: React.FC<PortfolioHeaderProps> = ({ heading, description }) => {
  return (
    <div className="text-center mb-12">
      <span className="inline-block py-1 px-3 rounded-full bg-media-purple/10 text-media-purple font-medium text-sm mb-4">
        Portfolio
      </span>
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        {heading}
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
        {description}
      </p>
    </div>
  );
};

export default PortfolioHeader;
