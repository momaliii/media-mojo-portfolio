
import React from "react";
import { motion } from "framer-motion";
import { expertServices } from "./ExpertServicesData";
import ExpertServiceCard from "./ExpertServiceCard";
import FeaturedExpertServiceCard from "./FeaturedExpertServiceCard";

const ExpertServices = () => {
  return (
    <div className="py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-14"
      >
        <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full border border-media-purple/20 bg-gradient-to-r from-media-purple/10 to-media-oceanblue/10 text-media-purple font-semibold text-[11px] uppercase tracking-[0.22em] mb-5 shadow-sm backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-media-purple" />
          What I Do
        </span>
        <h2 id="services-heading" className="text-4xl md:text-6xl font-bold mb-5 tracking-[-0.03em] leading-[1.02] text-gray-900 dark:text-gray-100">
          My <span className="gradient-text">Expertise</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4 text-lg leading-[1.7]">
          Specialized in data-driven digital marketing strategies that deliver measurable results.
        </p>
        <div className="mx-auto mt-7 h-px w-20 bg-gradient-to-r from-transparent via-media-purple to-transparent" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 px-4 md:px-6">
        {/* Featured Service Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:row-span-2"
        >
          <FeaturedExpertServiceCard />
        </motion.div>

        {/* Regular Service Cards */}
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
