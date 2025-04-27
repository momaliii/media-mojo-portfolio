
import React from "react";
import { Button } from "@/components/ui/button";
import HeroStats from "./HeroStats";
import { Linkedin, FileText } from "lucide-react";
import { motion } from "framer-motion";
import ProfileLogo from "./ProfileLogo";

const HeroContent = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <motion.div 
      className="space-y-6 md:space-y-8"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-4">
        <motion.div variants={item}>
          <ProfileLogo />
        </motion.div>
        
        <div>
          <motion.span 
            variants={item}
            className="inline-block py-1.5 px-4 rounded-full bg-gradient-to-r from-media-purple/20 to-media-oceanblue/20 text-media-purple font-medium text-sm mb-4 shadow-sm"
          >
            Senior Media Buyer
          </motion.span>
          
          <motion.h1 
            variants={item}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight"
          >
            Mohamed <span className="gradient-text">Ali</span>
          </motion.h1>
          
          <motion.p 
            variants={item}
            className="mt-6 text-lg text-gray-600 max-w-2xl"
          >
            Senior Media Buyer with 5+ years of experience optimizing campaigns across Meta, LinkedIn, TikTok, Snapchat, Twitter, and Google Ads. Delivering exceptional results and measurable ROI.
          </motion.p>
          
          <motion.div 
            variants={item}
            className="flex flex-wrap gap-3 mt-4"
          >
            <a 
              href="https://www.linkedin.com/in/mhmdali02/"
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-media-purple bg-white px-3 py-2 rounded-md shadow-sm hover:shadow-md transition-all hover:bg-media-purple/5"
            >
              <Linkedin className="h-5 w-5" />
              <span className="text-sm font-medium">Connect on LinkedIn</span>
            </a>
            
            <a 
              href="/Mohamed_Ali_CV.pdf"
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-media-purple bg-white px-3 py-2 rounded-md shadow-sm hover:shadow-md transition-all hover:bg-media-purple/5"
            >
              <FileText className="h-5 w-5" />
              <span className="text-sm font-medium">Download CV</span>
            </a>
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        variants={item}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Button 
          onClick={() => document.getElementById('portfolio')?.scrollIntoView({behavior: 'smooth'})}
          className="bg-media-purple hover:bg-media-darkpurple text-white shadow-md hover:shadow-lg transition-all"
          size="lg"
        >
          View Portfolio
        </Button>
        <Button 
          onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}
          variant="outline"
          size="lg"
          className="border-media-purple/30 text-media-purple hover:bg-media-purple/5 hover:border-media-purple/50 shadow-sm hover:shadow-md transition-all"
        >
          Get in Touch
        </Button>
      </motion.div>
      
      <motion.div variants={item}>
        <HeroStats />
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
