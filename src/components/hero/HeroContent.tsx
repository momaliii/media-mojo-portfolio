
import React from "react";
import { Button } from "@/components/ui/button";
import HeroStats from "./HeroStats";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import { HeroContent as HeroContentType } from "@/utils/contentManager";

interface HeroContentProps {
  content: HeroContentType;
}

const HeroContent: React.FC<HeroContentProps> = ({ content }) => {
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
          <Avatar className="h-28 w-28 border-2 border-media-purple/20 shadow-lg">
            <AvatarImage src="/lovable-uploads/900c6176-4030-4244-a97a-62a4c235d53f.png" alt="Mohamed Ali" className="object-cover" />
            <AvatarFallback className="text-3xl font-bold text-media-purple bg-media-purple/10">
              MA
            </AvatarFallback>
          </Avatar>
        </motion.div>
        
        <div>
          <motion.span 
            variants={item}
            className="inline-block py-1.5 px-4 rounded-full bg-gradient-to-r from-media-purple/20 to-media-oceanblue/20 text-media-purple font-medium text-sm mb-4 shadow-sm"
          >
            Performance Media Buyer
          </motion.span>
          
          <motion.h1 
            variants={item}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
          >
            Mohamed <span className="gradient-text">Ali</span>
          </motion.h1>
          
          <motion.p 
            variants={item}
            className="mt-6 text-lg text-gray-600 md:pr-10"
          >
            {content.subheading}
          </motion.p>
          
          <motion.div 
            variants={item}
            className="flex gap-3 mt-4"
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
          onClick={() => window.open(content.whatsAppLink || "https://wa.me/+201060098267", "_blank")}
          variant="outline"
          size="lg"
          className="border-media-purple/30 text-media-purple hover:bg-media-purple/5 hover:border-media-purple/50 shadow-sm hover:shadow-md transition-all"
        >
          {content.ctaText}
        </Button>
      </motion.div>
      
      <motion.div variants={item}>
        <HeroStats stats={content.stats} />
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
