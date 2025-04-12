
import React from "react";

const PortfolioHeader = () => {
  return (
    <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
      <span className="inline-block py-1 px-3 rounded-full bg-media-purple/10 text-media-purple font-medium text-sm mb-4">
        My Work
      </span>
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Recent <span className="gradient-text">Case Studies</span>
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Explore some of my most successful media buying campaigns and the results they've achieved for clients across industries.
      </p>
    </div>
  );
};

export default PortfolioHeader;
