
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  DollarSign, 
  Target, 
  LineChart,
  MousePointerClick
} from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-media-blue/20 to-white overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 z-0"></div>
      
      <div className="container mx-auto px-4 md:px-6 py-10 pt-24 md:pt-32 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6 md:space-y-8 opacity-0 animate-fade-in-up">
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
            
            <div className="pt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-media-purple"></div>
                <p className="text-sm text-gray-600">5+ Years Experience</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-media-oceanblue"></div>
                <p className="text-sm text-gray-600">10+ Countries Served</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-media-orange"></div>
                <p className="text-sm text-gray-600">8x+ ROAS Achieved</p>
              </div>
            </div>
          </div>
          
          <div className="relative h-[400px] md:h-[500px]">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 h-full">
              {/* Media buying visualization elements */}
              <div className="hero-grid-item col-span-1 row-span-1 bg-white shadow-lg rounded-xl p-4 flex flex-col justify-between">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">Performance</span>
                  <TrendingUp size={18} className="text-green-500" />
                </div>
                <div className="mt-2">
                  <div className="w-full h-2 bg-gray-100 rounded-full">
                    <div className="h-2 bg-green-500 rounded-full animate-pulse-slow" style={{width: '88%'}}></div>
                  </div>
                  <div className="mt-1 flex justify-between text-xs">
                    <span>0%</span>
                    <span className="font-semibold">88%</span>
                    <span>100%</span>
                  </div>
                </div>
                <p className="text-sm mt-2 font-medium">ROAS 8x+</p>
              </div>
              
              <div className="hero-grid-item col-span-1 row-span-1 bg-media-purple text-white shadow-lg rounded-xl p-4 flex flex-col">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">CPC</span>
                  <MousePointerClick size={18} />
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <span className="text-3xl font-bold">$1.18</span>
                </div>
                <div className="text-xs text-white/70">
                  <span className="inline-flex items-center">
                    <span>↓ 24% vs. benchmark</span>
                  </span>
                </div>
              </div>
              
              <div className="hero-grid-item col-span-1 row-span-1 bg-white shadow-lg rounded-xl p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">Budget</span>
                  <DollarSign size={18} className="text-media-purple" />
                </div>
                <div className="mt-4 space-y-1">
                  <div className="w-full flex justify-between text-xs">
                    <span>Facebook</span>
                    <span className="font-semibold">$42K</span>
                  </div>
                  <div className="w-full h-1 bg-gray-100 rounded-full">
                    <div className="h-1 bg-media-purple rounded-full" style={{width: '60%'}}></div>
                  </div>
                  <div className="w-full flex justify-between text-xs mt-2">
                    <span>Google</span>
                    <span className="font-semibold">$28K</span>
                  </div>
                  <div className="w-full h-1 bg-gray-100 rounded-full">
                    <div className="h-1 bg-media-orange rounded-full" style={{width: '40%'}}></div>
                  </div>
                </div>
              </div>
              
              <div className="hero-grid-item col-span-1 row-span-1 bg-gray-50 shadow-lg rounded-xl p-4 flex flex-col">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">Campaign</span>
                  <LineChart size={18} className="text-media-oceanblue" />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Impressions</span>
                    <span className="text-sm font-medium">10.5M</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">CTR</span>
                    <span className="text-sm font-medium">3.8%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Conv. Rate</span>
                    <span className="text-sm font-medium">5.2%</span>
                  </div>
                </div>
              </div>
              
              <div className="hero-grid-item col-span-1 row-span-1 bg-media-blue/20 shadow-lg rounded-xl p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">Platforms</span>
                  <Target size={18} className="text-media-oceanblue" />
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-media-oceanblue"></div>
                    <p className="text-xs">Meta Ads</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-media-purple"></div>
                    <p className="text-xs">Google Ads</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-media-pink"></div>
                    <p className="text-xs">TikTok & Snapchat</p>
                  </div>
                </div>
              </div>
              
              <div className="hero-grid-item col-span-1 row-span-1 bg-gradient-to-br from-media-purple/90 to-media-oceanblue/90 text-white shadow-lg rounded-xl p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Channels</span>
                  <PieChart size={18} />
                </div>
                <div className="flex-1 flex flex-col justify-center gap-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                      <span className="text-xs">Paid Social</span>
                    </div>
                    <span className="text-xs">45%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-media-blue"></div>
                      <span className="text-xs">Search</span>
                    </div>
                    <span className="text-xs">30%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-media-pink"></div>
                      <span className="text-xs">Display</span>
                    </div>
                    <span className="text-xs">15%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-media-peach"></div>
                      <span className="text-xs">Video</span>
                    </div>
                    <span className="text-xs">10%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Animated blob shapes */}
      <div className="hidden md:block absolute -top-24 -right-24 w-64 h-64 bg-media-purple/10 rounded-full filter blur-3xl animate-float"></div>
      <div className="hidden md:block absolute top-1/2 -left-32 w-80 h-80 bg-media-oceanblue/10 rounded-full filter blur-3xl animate-float animate-delay-500"></div>
    </section>
  );
};

export default Hero;
