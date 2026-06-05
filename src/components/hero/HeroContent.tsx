
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
            className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full border border-media-purple/20 bg-gradient-to-r from-media-purple/10 to-media-oceanblue/10 text-media-purple font-semibold text-[11px] uppercase tracking-[0.22em] mb-5 shadow-sm backdrop-blur-sm"
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-media-purple animate-pulse" />
            Senior Media Buyer
          </motion.span>
          
          <motion.h1 
            id="hero-heading"
            variants={item}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.035em] leading-[0.98] text-gray-900 dark:text-gray-50"
          >
            Mohamed <span className="gradient-text">Ali</span>
            <span className="block text-2xl sm:text-3xl lg:text-[2.25rem] font-light tracking-tight text-gray-500 dark:text-gray-400 mt-4">
              Senior Media Buyer
            </span>
          </motion.h1>
          
          <motion.p 
            variants={item}
            className="mt-7 text-base md:text-lg leading-[1.75] text-gray-600 dark:text-gray-300 max-w-xl"
          >
            7+ years scaling paid media across <span className="font-semibold text-gray-800 dark:text-gray-100">Meta, LinkedIn, TikTok, Snapchat & Google Ads</span> — engineering measurable ROI for ambitious brands.
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
          className="relative overflow-hidden bg-gradient-to-r from-media-purple to-media-darkpurple hover:from-media-darkpurple hover:to-media-purple text-white shadow-[0_10px_30px_-10px_rgba(124,58,237,0.55)] hover:shadow-[0_18px_40px_-12px_rgba(124,58,237,0.7)] transition-all duration-300 hover:-translate-y-0.5 rounded-xl px-7"
          size="lg"
        >
          View My Work →
        </Button>
        <Button 
          onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}
          variant="outline"
          size="lg"
          className="border-2 border-media-purple/30 text-media-purple hover:bg-media-purple/5 hover:border-media-purple transition-all duration-300 hover:-translate-y-0.5 rounded-xl px-7 backdrop-blur-sm"
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
