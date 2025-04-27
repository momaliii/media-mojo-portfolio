
import React, { useState, useEffect } from "react";
import InteractiveServiceCard from "./InteractiveServiceCard";
import ServiceCategories from "./ServiceCategories";
import { allServices } from "./ExpertServicesData";
import { motion } from "framer-motion";

const RegularServices = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isVisible, setIsVisible] = useState(false);
  
  // Filter services based on selected category
  const filteredServices = activeCategory === "all" 
    ? allServices 
    : allServices.filter(service => service.category === activeCategory);

  // Lazy loading using Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    const servicesSection = document.getElementById("regular-services");
    if (servicesSection) observer.observe(servicesSection);
    
    return () => {
      if (servicesSection) observer.unobserve(servicesSection);
    };
  }, []);

  return (
    <div id="regular-services">
      <motion.div 
        className="max-w-3xl mx-auto text-center mb-12 md:mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="inline-block py-1.5 px-4 rounded-full bg-media-purple/10 dark:bg-media-purple/20 text-media-purple dark:text-media-blue font-medium text-sm mb-4">
          Our Services
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Comprehensive <span className="gradient-text">Digital Solutions</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          From media buying to web development, we provide end-to-end digital services to help your business grow and succeed online.
        </p>
      </motion.div>

      <ServiceCategories 
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {isVisible && (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 md:gap-8 mt-8"
        >
          {filteredServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <InteractiveServiceCard 
                key={index} 
                icon={<Icon />}
                title={service.title}
                description={service.description}
                longDescription={service.longDescription}
                features={service.features}
                color={service.color}
                index={index}
              />
            );
          })}
        </motion.div>
      )}
    </div>
  );
};

export default RegularServices;
