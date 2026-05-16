
import React from "react";
import { motion } from "framer-motion";

const AboutHeader = () => {
  return (
    <div className="max-w-3xl mb-12 md:mb-16">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.45 }}
        className="eyebrow text-media-purple dark:text-media-cyan mb-3"
      >
        04 · About
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="text-display-lg text-media-ink dark:text-white"
      >
        Performance marketing,{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-media-purple to-media-oceanblue">
          run like a business
        </span>{" "}
        — not a dashboard.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-gray-600 dark:text-gray-300 mt-5 text-lg leading-relaxed"
      >
        Senior media buyer focused on paid acquisition, creative testing
        cadence, and post-click economics across Meta, TikTok, Google,
        LinkedIn, and Snapchat — for DTC, e-commerce, F&amp;B, and NGO clients
        in 10 countries.
      </motion.p>
    </div>
  );
};

export default AboutHeader;
