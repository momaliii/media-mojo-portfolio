
import React from "react";
import { motion } from "framer-motion";
import { expertServices } from "./ExpertServicesData";
import ExpertServiceCard from "./ExpertServiceCard";
import FeaturedExpertServiceCard from "./FeaturedExpertServiceCard";

const ExpertServices = () => {
  return (
    <div className="py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="mb-12 md:mb-14"
      >
        <div className="flex items-baseline gap-3 mb-3">
          <span className="eyebrow text-media-purple dark:text-media-cyan">
            03 · What I do
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <h2 className="text-display-lg max-w-2xl text-media-ink dark:text-white">
            Built for{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-media-purple to-media-oceanblue">
              performance
            </span>
            , measured in revenue.
          </h2>
          <div className="flex items-baseline gap-3 shrink-0">
            <span className="text-4xl font-display font-bold text-media-purple tabular dark:text-media-cyan">
              8.4×
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400 max-w-[14ch] leading-snug">
              peak ROAS on flagship Meta builds
            </span>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="lg:row-span-2"
        >
          <FeaturedExpertServiceCard />
        </motion.div>

        {expertServices.map((service, index) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
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
