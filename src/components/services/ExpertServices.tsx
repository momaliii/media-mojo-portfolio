
import React from "react";
import ExpertServiceCard from "./ExpertServiceCard";
import FeaturedExpertServiceCard from "./FeaturedExpertServiceCard";
import { expertServices } from "./ExpertServicesData";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";

const ExpertServices = () => {
  const isMobile = useIsMobile();
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div 
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
      >
        <span className="inline-block py-1.5 px-4 rounded-full bg-gradient-to-r from-media-purple/20 to-media-oceanblue/20 text-media-purple font-medium text-sm mb-4 shadow-sm">
          My Expertise
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Expert <span className="gradient-text">Media Buying</span> Solutions
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Specialized services designed to maximize your advertising effectiveness and deliver 
          measurable business results across multiple platforms and markets.
        </p>
      </motion.div>

      <motion.div 
        className="relative"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl -z-10"></div>
        
        <motion.div 
          className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'} gap-8 p-6 md:p-10`}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={item}>
            <FeaturedExpertServiceCard />
          </motion.div>
          
          <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'} gap-6`}>
            {expertServices.slice(1, 5).map((service, index) => (
              <motion.div key={`expert-mini-${index}`} variants={item}>
                <ExpertServiceCard 
                  icon={<service.icon className="w-8 h-8 text-white" />}
                  title={service.title}
                  description={service.description}
                  color={service.color}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ExpertServices;
