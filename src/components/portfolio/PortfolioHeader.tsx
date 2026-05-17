
import React from "react";
import { motion } from "framer-motion";

const PortfolioHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55 }}
      className="mb-12 md:mb-16"
    >
      <div className="flex items-baseline gap-3 mb-4">
        <span className="font-display font-bold text-media-purple/50 dark:text-media-cyan/60 text-2xl md:text-3xl tabular">
          01
        </span>
        <span className="eyebrow text-media-purple dark:text-media-cyan">
          Case Studies
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
        <h2
          id="portfolio-heading"
          className="text-display-lg md:col-span-7 text-media-ink dark:text-white"
        >
          Real campaigns.{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-media-purple to-media-oceanblue">
            Receipt-level
          </span>{" "}
          results.
        </h2>
        <p className="text-gray-600 dark:text-gray-300 md:col-span-5 text-base md:text-lg leading-relaxed">
          Campaigns I&apos;ve built and scaled across Saudi Arabia, Egypt,
          Kuwait, Qatar, Turkey, China, the UK and the U.S. — each with the
          metrics that matter to a CFO, not just the agency dashboard.
        </p>
      </div>
    </motion.div>
  );
};

export default PortfolioHeader;
