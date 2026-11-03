
import React from "react";
import PerformanceCard from "./cards/PerformanceCard";
import CPCCard from "./cards/CPCCard";
import BudgetCard from "./cards/BudgetCard";
import CampaignCard from "./cards/CampaignCard";
import PlatformsCard from "./cards/PlatformsCard";
import ChannelsCard from "./cards/ChannelsCard";
import { motion } from "framer-motion";

const HeroVisualization = () => {
  
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  return (
    <div className="relative h-auto py-6 w-full overflow-hidden">
      <motion.div 
        className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,180px),1fr))] gap-5 h-full max-w-full [&>div]:min-w-0"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={itemVariants} className="hero-grid-item"><PerformanceCard /></motion.div>
        <motion.div variants={itemVariants} className="hero-grid-item"><CPCCard /></motion.div>
        <motion.div variants={itemVariants} className="hero-grid-item"><BudgetCard /></motion.div>
        <motion.div variants={itemVariants} className="hero-grid-item"><CampaignCard /></motion.div>
        <motion.div variants={itemVariants} className="hero-grid-item"><PlatformsCard /></motion.div>
        <motion.div variants={itemVariants} className="hero-grid-item"><ChannelsCard /></motion.div>
      </motion.div>
    </div>
  );
};

export default HeroVisualization;
