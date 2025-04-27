
import React from "react";
import { motion } from "framer-motion";

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
    <motion.div 
      className="flex flex-wrap justify-center gap-3 mb-10"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {categories.map((category, index) => (
        <motion.button
          key={category.id}
          onClick={() => setActiveCategory(category.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeCategory === category.id
              ? "bg-media-purple dark:bg-media-blue text-white shadow-md"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
          aria-pressed={activeCategory === category.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {category.label}
        </motion.button>
      ))}
    </motion.div>
  );
};

export default ServiceCategories;
