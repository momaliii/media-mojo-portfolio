
import React from "react";
import { Button } from "@/components/ui/button";
import HeroStats from "./HeroStats";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const HeroContent = () => {
  return (
    <div className="space-y-6 md:space-y-8 opacity-0 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-4">
        <Avatar className="h-24 w-24 border-2 border-media-purple/20">
          {/* Replace this with your uploaded photo URL */}
          <AvatarImage src="/your-photo.jpg" alt="Mohamed Ali" />
          <AvatarFallback className="text-2xl font-bold text-media-purple bg-media-purple/10">
            MA
          </AvatarFallback>
        </Avatar>
        
        <div>
          <span className="inline-block py-1 px-3 rounded-full bg-media-purple/10 text-media-purple font-medium text-sm mb-4">
            Senior Media Buyer
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Mohamed <span className="gradient-text">Ali</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 md:pr-10">
            Senior Media Buyer with 5+ years of experience optimizing campaigns across Meta, LinkedIn, TikTok, Snapchat, Twitter, and Google Ads. Delivering measurable results and exceptional ROI.
          </p>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          onClick={() => document.getElementById('portfolio')?.scrollIntoView({behavior: 'smooth'})}
          className="bg-media-purple hover:bg-media-darkpurple text-white"
          size="lg"
        >
          View Portfolio
        </Button>
        <Button 
          onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}
          variant="outline"
          size="lg"
        >
          Get in Touch
        </Button>
      </div>
      
      <HeroStats />
    </div>
  );
};

export default HeroContent;
