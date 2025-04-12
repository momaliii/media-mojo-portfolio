
import React, { useState } from "react";

interface ServiceCategoryProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const ServiceCategories: React.FC<ServiceCategoryProps> = ({ activeCategory, setActiveCategory }) => {
  const categories = [
    { id: "all", label: "All Services" },
    { id: "media", label: "Media Buying" },
    { id: "content", label: "Content Creation" },
    { id: "design", label: "Design" },
    { id: "development", label: "Development" }
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-10">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => setActiveCategory(category.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeCategory === category.id
              ? "bg-media-purple text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
          aria-pressed={activeCategory === category.id}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};

export default ServiceCategories;
