
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MonitorSmartphone, 
  Search, 
  BarChart, 
  Target, 
  LineChart, 
  Users, 
  ArrowRight
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: <MonitorSmartphone className="w-8 h-8 text-white" />,
      title: "Paid Social Media",
      description: "Strategic campaigns across Facebook, Instagram, LinkedIn, TikTok, and other platforms to reach and engage your target audience.",
      color: "bg-media-purple"
    },
    {
      icon: <Search className="w-8 h-8 text-white" />,
      title: "Search Engine Marketing",
      description: "Data-driven PPC campaigns on Google and Bing to capture high-intent traffic and drive conversions.",
      color: "bg-media-oceanblue"
    },
    {
      icon: <BarChart className="w-8 h-8 text-white" />,
      title: "Programmatic Display",
      description: "Advanced audience targeting and real-time bidding strategies to deliver your message across premium websites.",
      color: "bg-media-orange"
    },
    {
      icon: <LineChart className="w-8 h-8 text-white" />,
      title: "Performance Analysis",
      description: "In-depth campaign tracking and reporting with actionable insights to continuously improve results.",
      color: "bg-media-vibrantpurple"
    },
    {
      icon: <Target className="w-8 h-8 text-white" />,
      title: "Audience Strategy",
      description: "Developing precise targeting strategies based on demographics, interests, behaviors, and custom audiences.",
      color: "bg-media-pink"
    },
    {
      icon: <Users className="w-8 h-8 text-white" />,
      title: "Media Planning",
      description: "Comprehensive planning across all digital channels to maximize your campaign effectiveness and ROI.",
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
            Specialized services designed to maximize your advertising effectiveness and deliver measurable business results.
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
