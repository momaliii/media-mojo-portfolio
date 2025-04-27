
import React from "react";
import { motion } from "framer-motion";
import { expertServices } from "./ExpertServicesData";
import ExpertServiceCard from "./ExpertServiceCard";
import FeaturedExpertServiceCard from "./FeaturedExpertServiceCard";

const ExpertServices = () => {
  return (
    <div className="py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">My Expertise</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
          Specialized in data-driven digital marketing strategies that deliver measurable results
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4 md:px-6">
        {expertServices.map((service, index) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ExpertServiceCard
                icon={<Icon />}
                title={service.title}
                description={service.description}
                color={service.color}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ExpertServices;
