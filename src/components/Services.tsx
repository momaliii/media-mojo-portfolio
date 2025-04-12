
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MonitorSmartphone, 
  Search, 
  BarChart, 
  Target, 
  LineChart, 
  Users, 
  ArrowRight,
  PieChart,
  Award,
  Globe
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: <MonitorSmartphone className="w-8 h-8 text-white" />,
      title: "Social Media Marketing",
      description: "Strategic campaigns across Facebook, Instagram, LinkedIn, TikTok, Snapchat, and Twitter to reach and engage your target audience.",
      color: "bg-media-purple"
    },
    {
      icon: <Search className="w-8 h-8 text-white" />,
      title: "Search Engine Marketing",
      description: "Data-driven PPC campaigns on Google Ads to capture high-intent traffic and drive conversions with optimal ROI.",
      color: "bg-media-oceanblue"
    },
    {
      icon: <BarChart className="w-8 h-8 text-white" />,
      title: "Performance Analysis",
      description: "In-depth campaign tracking and reporting using Google Data Studio, Microsoft Clarity, and Google Analytics with actionable insights.",
      color: "bg-media-orange"
    },
    {
      icon: <Target className="w-8 h-8 text-white" />,
      title: "Audience Strategy",
      description: "Developing precise targeting strategies based on demographics, interests, behaviors, and custom audiences for optimal campaign performance.",
      color: "bg-media-vibrantpurple"
    },
    {
      icon: <PieChart className="w-8 h-8 text-white" />,
      title: "Budget Optimization",
      description: "Strategic allocation and management of media budgets ranging from $15K to $35K+ to maximize ROI and business results.",
      color: "bg-media-pink"
    },
    {
      icon: <Globe className="w-8 h-8 text-white" />,
      title: "Global Campaign Management",
      description: "Expertise in managing campaigns across 10+ countries including Saudi Arabia, Egypt, Kuwait, Qatar, Turkey, China, UK, and the U.S.",
      color: "bg-gradient-to-r from-media-purple to-media-oceanblue"
    }
  ];

  return (
    <section id="services" className="section-padding">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-media-purple/10 text-media-purple font-medium text-sm mb-4">
            My Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Expert <span className="gradient-text">Media Buying</span> Solutions
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Specialized services designed to maximize your advertising effectiveness and deliver measurable business results across multiple platforms and markets.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="service-card border border-gray-200 overflow-hidden opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className={`w-14 h-14 rounded-lg ${service.color} flex items-center justify-center mb-5`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-5">{service.description}</p>
                <div className="flex items-center text-media-purple font-medium">
                  <span>Learn more</span>
                  <ArrowRight className="ml-1 w-4 h-4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
