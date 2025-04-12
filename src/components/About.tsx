
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  BarChart3, 
  Target, 
  TrendingUp, 
  Users
} from "lucide-react";

const About = () => {
  const stats = [
    { 
      icon: <BarChart3 className="text-media-purple" />, 
      value: "7", 
      label: "Years Experience" 
    },
    { 
      icon: <Target className="text-media-oceanblue" />, 
      value: "120", 
      label: "Campaigns Managed" 
    },
    { 
      icon: <TrendingUp className="text-media-orange" />, 
      value: "18", 
      label: "Industries Served" 
    },
    { 
      icon: <Users className="text-media-pink" />, 
      value: "30", 
      label: "Million Impressions" 
    },
  ];

  return (
    <section id="about" className="section-padding bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-media-purple/10 text-media-purple font-medium text-sm mb-4">
            About Me
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Delivering <span className="gradient-text">Data-Driven</span> Media Buying Excellence
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            As a senior media buyer with over 7 years of experience, I specialize in creating and optimizing digital advertising campaigns that deliver measurable results and exceptional ROI.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className="border border-gray-200 opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold mb-1">{stat.value}+</h3>
                <p className="text-gray-500 text-sm">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* About Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6 opacity-0 animate-fade-in-up animate-delay-200">
            <h3 className="text-2xl font-semibold">My Approach</h3>
            <p className="text-gray-600">
              I combine deep analytical expertise with creative thinking to craft media buying strategies that not only reach the right audience but convert them into customers.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-media-purple/10 flex items-center justify-center mt-1">
                  <span className="text-media-purple font-semibold text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Data-First Strategy</h4>
                  <p className="text-gray-600 text-sm">Using advanced analytics to guide every decision and optimize campaign performance.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-media-oceanblue/10 flex items-center justify-center mt-1">
                  <span className="text-media-oceanblue font-semibold text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Cross-Channel Integration</h4>
                  <p className="text-gray-600 text-sm">Seamlessly blending paid search, social, display, and video for holistic campaigns.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-media-orange/10 flex items-center justify-center mt-1">
                  <span className="text-media-orange font-semibold text-sm">3</span>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Continuous Optimization</h4>
                  <p className="text-gray-600 text-sm">Constantly testing and refining campaigns to maximize ROI and performance.</p>
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
