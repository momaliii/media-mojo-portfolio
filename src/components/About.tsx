
import React from "react";
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
    <section id="about" className="section-padding bg-gradient-to-b from-gray-50/50 to-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <div className="inline-flex items-center justify-center mb-5">
            <span className="inline-block py-1.5 px-4 rounded-full bg-gradient-to-r from-media-purple/20 to-media-oceanblue/20 text-media-purple font-medium text-sm shadow-sm">
              About Me
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Delivering <span className="gradient-text">Data-Driven</span> Excellence
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Senior Media Buyer specializing in optimizing paid media campaigns across platforms, driving growth and engagement across diverse industries internationally.
          </p>
          <div className="flex items-center justify-center mt-6 space-x-1">
            <span className="h-1 w-3 bg-media-purple/30 rounded-full"></span>
            <span className="h-1.5 w-16 bg-gradient-to-r from-media-purple to-media-oceanblue rounded-full"></span>
            <span className="h-1 w-3 bg-media-oceanblue/30 rounded-full"></span>
          </div>
        </div>

        {/* Stats Grid */}
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

        {/* About Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6 opacity-0 animate-fade-in-up animate-delay-200">
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
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-media-purple/10 flex items-center justify-center mt-1">
                  <span className="text-media-purple font-semibold text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Strategic Campaign Management</h4>
                  <p className="text-gray-600 text-sm">Expertise in SEM, PPC, and social media advertising across Meta, LinkedIn, TikTok, Snapchat, Twitter, and Google Ads.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-media-oceanblue/10 flex items-center justify-center mt-1">
                  <span className="text-media-oceanblue font-semibold text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Performance Optimization</h4>
                  <p className="text-gray-600 text-sm">Advanced targeting strategies and funnel optimization leading to improved conversion rates and ROAS of 8x+.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-media-orange/10 flex items-center justify-center mt-1">
                  <span className="text-media-orange font-semibold text-sm">3</span>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Global Experience</h4>
                  <p className="text-gray-600 text-sm">Successfully managed campaigns in Saudi Arabia, Egypt, Kuwait, Qatar, Turkey, China, UK, and the U.S. among others.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative h-[300px] md:h-[400px] opacity-0 animate-fade-in-up animate-delay-300">
            <div className="absolute inset-0 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="h-32 bg-gradient-to-br from-media-purple/80 to-media-pink/80 rounded-lg shadow-lg animate-float"></div>
                <div className="h-40 bg-gray-100 rounded-lg shadow-sm p-4">
                  <div className="h-4 w-3/4 bg-media-purple/20 rounded mb-2"></div>
                  <div className="h-2 w-full bg-gray-200 rounded mb-2"></div>
                  <div className="h-2 w-5/6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-2 w-4/6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-12 w-full bg-gray-200 rounded mt-4"></div>
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
