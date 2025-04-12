
import React from "react";

type ClientLogoSectionProps = {
  title: React.ReactNode;
  description: string;
};

const ClientLogoSection: React.FC<ClientLogoSectionProps> = ({ title, description }) => {
  return (
    <div className="text-center mb-12">
      <span className="inline-block py-1 px-3 rounded-full bg-media-purple/10 text-media-purple font-medium text-sm mb-4">
        Success Stories
      </span>
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        {title}
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
        {description}
      </p>
    </div>
  );
};

export default ClientLogoSection;
