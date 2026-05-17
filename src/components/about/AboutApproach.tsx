
import React from "react";
import { motion } from "framer-motion";

const AboutApproach = () => {
  const approaches = [
    {
      number: "1",
      title: "Strategic Campaign Management",
      description: "Expertise in SEM, PPC, and social media advertising across Meta, LinkedIn, TikTok, Snapchat, Twitter, and Google Ads."
    },
    {
      number: "2",
      title: "Performance Optimization",
      description: "Advanced targeting strategies and funnel optimization leading to improved conversion rates and ROAS of 8x+."
    },
    {
      number: "3",
      title: "Global Experience",
      description: "Successfully managed campaigns in Saudi Arabia, Egypt, Kuwait, Qatar, Turkey, China, UK, and the U.S. among others."
    }
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold">My Approach</h3>
      <p className="text-gray-600">
        I combine deep analytical expertise with creative thinking to craft media buying strategies that maximize ROI and deliver measurable business results across diverse industries in over 10 countries.
      </p>
      
      <div className="space-y-6">
        {approaches.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            className="flex items-start gap-4 group"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-media-purple/10 to-media-oceanblue/10 flex items-center justify-center mt-1 group-hover:scale-110 transition-transform duration-300">
              <span className="bg-gradient-to-r from-media-purple to-media-oceanblue bg-clip-text text-transparent font-semibold">
                {item.number}
              </span>
            </div>
            <div>
              <h4 className="font-medium mb-2">{item.title}</h4>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AboutApproach;
