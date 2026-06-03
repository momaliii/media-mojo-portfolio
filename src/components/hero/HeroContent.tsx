
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
            className="inline-block py-1 px-3.5 rounded-full bg-gradient-to-r from-media-purple/15 to-media-oceanblue/15 text-media-purple font-medium text-[11px] uppercase tracking-[0.18em] mb-5 shadow-sm"
          >
            Senior Media Buyer
          </motion.span>
          
          <motion.h1 
            id="hero-heading"
            variants={item}
            className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.02em] leading-[1.05] text-gray-900 dark:text-gray-50"
          >
            Mohamed <span className="gradient-text">Ali</span>
            <span className="block text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-gray-500 dark:text-gray-400 mt-3">
              Senior Media Buyer
            </span>
          </motion.h1>
          
          <motion.p 
            variants={item}
            className="mt-6 text-base md:text-lg leading-[1.7] text-gray-600 dark:text-gray-300 max-w-xl"
          >
            Senior Media Buyer with 7+ years of experience optimizing campaigns across Meta, LinkedIn, TikTok, Snapchat, and Google Ads. Delivering exceptional results and measurable ROI.
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
          View My Work
        </Button>
        <Button 
          onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}
          variant="outline"
          size="lg"
          className="border-media-purple/30 text-media-purple hover:bg-media-purple/5 hover:border-media-purple/50 shadow-sm hover:shadow-md transition-all"
        >
          Work With Me
        </Button>
      </motion.div>
      
      {/* Dual-path CTAs for hiring vs clients */}
      <motion.div 
        variants={item}
        className="flex flex-wrap gap-3 mt-4 text-sm"
      >
        <span className="text-gray-500">Looking to hire?</span>
        <a 
          href="/Mohamed_Ali_CV.pdf"
          target="_blank" 
          rel="noopener noreferrer"
          className="text-media-purple hover:text-media-darkpurple font-medium underline"
        >
          View Resume
        </a>
        <span className="text-gray-400">|</span>
        <a 
          href="/case-studies"
          className="text-media-purple hover:text-media-darkpurple font-medium underline"
        >
          See Case Studies
        </a>
      </motion.div>
      
      <motion.div variants={item}>
        <HeroStats />
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
