
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { 
  BarChart3, 
  Target, 
  TrendingUp, 
  Users,
  Globe,
  Award,
  LayoutGrid
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const About = () => {
  const stats = [
    { 
      icon: <BarChart3 className="text-media-purple h-6 w-6" />, 
      value: "5+", 
      label: "Years Experience" 
    },
    { 
      icon: <Globe className="text-media-oceanblue h-6 w-6" />, 
      value: "10+", 
      label: "Countries Served" 
    },
    { 
      icon: <LayoutGrid className="text-media-orange h-6 w-6" />, 
      value: "6+", 
      label: "Platforms Mastered" 
    },
    { 
      icon: <Award className="text-media-pink h-6 w-6" />, 
      value: "95K+", 
      label: "Orders Generated" 
    },
  ];

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white" />
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      
      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center mb-5"
          >
            <span className="inline-block py-1.5 px-4 rounded-full bg-gradient-to-r from-media-purple/20 to-media-oceanblue/20 text-media-purple font-medium text-sm shadow-sm">
              About Me
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6 tracking-tight"
          >
            Delivering <span className="gradient-text">Data-Driven</span> Excellence
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto text-lg"
          >
            Senior Media Buyer specializing in optimizing paid media campaigns across platforms, driving growth and engagement across diverse industries internationally.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-center mt-6 space-x-1"
          >
            <span className="h-1 w-3 bg-media-purple/30 rounded-full"></span>
            <span className="h-1.5 w-16 bg-gradient-to-r from-media-purple to-media-oceanblue rounded-full"></span>
            <span className="h-1 w-3 bg-media-oceanblue/30 rounded-full"></span>
          </motion.div>
        </div>

        {/* Stats Grid with improved animations and hover effects */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="border border-gray-100 hover:border-media-purple/30 transition-all duration-300 group hover:shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm mb-4 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <h3 className="text-3xl font-bold mb-1 bg-gradient-to-r from-media-purple to-media-oceanblue bg-clip-text text-transparent">
                    {stat.value}
                  </h3>
                  <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* About Content with improved layout and animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="h-16 w-16 border-2 border-media-purple/20">
                <AvatarImage src="/lovable-uploads/900c6176-4030-4244-a97a-62a4c235d53f.png" alt="Mohamed Ali" />
                <AvatarFallback className="text-xl font-bold text-media-purple bg-media-purple/10">
                  MA
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-2xl font-semibold">Mohamed Ali</h3>
                <p className="text-media-purple">Senior Media Buyer</p>
              </div>
            </div>
            
            <h3 className="text-2xl font-semibold">My Approach</h3>
            <p className="text-gray-600">
              I combine deep analytical expertise with creative thinking to craft media buying strategies that maximize ROI and deliver measurable business results across diverse industries in over 10 countries.
            </p>
            
            <div className="space-y-6">
              {[
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
              ].map((item, index) => (
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
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[300px] md:h-[400px]"
          >
            <div className="absolute inset-0 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="h-32 bg-gradient-to-br from-media-purple/80 to-media-pink/80 rounded-lg shadow-lg animate-float"></div>
                <div className="h-40 bg-white rounded-lg shadow-sm p-4">
                  <div className="h-4 w-3/4 bg-media-purple/20 rounded mb-2"></div>
                  <div className="h-2 w-full bg-gray-100 rounded mb-2"></div>
                  <div className="h-2 w-5/6 bg-gray-100 rounded mb-2"></div>
                  <div className="h-2 w-4/6 bg-gray-100 rounded mb-2"></div>
                  <div className="h-12 w-full bg-gray-100 rounded mt-4"></div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-40 bg-white rounded-lg shadow-lg p-4">
                  <div className="h-4 bg-media-oceanblue/20 rounded mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-gray-100 rounded"></div>
                    <div className="h-2 w-full bg-gray-100 rounded"></div>
                    <div className="h-2 w-3/4 bg-gray-100 rounded"></div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="h-8 bg-gray-100 rounded"></div>
                    <div className="h-8 bg-gray-100 rounded"></div>
                    <div className="h-8 bg-gray-100 rounded"></div>
                    <div className="h-8 bg-gray-100 rounded"></div>
                  </div>
                </div>
                <div className="h-32 bg-gradient-to-br from-media-blue/80 to-media-oceanblue/80 rounded-lg shadow-lg animate-float animate-delay-200"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
