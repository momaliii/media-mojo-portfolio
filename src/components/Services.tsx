
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MonitorSmartphone, 
  Search, 
  BarChart, 
  Target, 
  LineChart, 
  FileImage,
  Video,
  Mic,
  Code,
  ShoppingBag,
  Layers,
  Megaphone,
  Film,
  Globe,
  Clock,
  DollarSign
} from "lucide-react";

const Services = () => {
  // Expert media buying solutions services
  const expertServices = [
    {
      icon: <MonitorSmartphone className="w-8 h-8 text-white" />,
      title: "Social Media Marketing",
      description: "Strategic campaigns across Facebook, Instagram, LinkedIn, TikTok, Snapchat, and Twitter to reach and engage your target audience.",
      color: "bg-[#A88BEB]"
    },
    {
      icon: <Search className="w-8 h-8 text-white" />,
      title: "Search Engine Marketing",
      description: "Data-driven PPC campaigns on Google Ads to capture high-intent traffic and drive conversions with optimal ROI.",
      color: "bg-[#0ABDF2]"
    },
    {
      icon: <LineChart className="w-8 h-8 text-white" />,
      title: "Performance Analysis",
      description: "In-depth campaign tracking and reporting using Google Data Studio, Microsoft Clarity, and Google Analytics with actionable insights.",
      color: "bg-[#FF7E33]"
    },
    {
      icon: <Target className="w-8 h-8 text-white" />,
      title: "Audience Strategy",
      description: "Developing precise targeting strategies based on demographics, interests, behaviors, and custom audiences for optimal campaign performance.",
      color: "bg-[#A88BEB]"
    },
    {
      icon: <Clock className="w-8 h-8 text-white" />,
      title: "Budget Optimization",
      description: "Strategic allocation and management of media budgets ranging from $15K to $35K+ to maximize ROI and business results.",
      color: "bg-[#E64FB8]"
    },
    {
      icon: <Globe className="w-8 h-8 text-white" />,
      title: "Global Campaign Management",
      description: "Expertise in managing campaigns across 10+ countries including Saudi Arabia, Egypt, Kuwait, Qatar, Turkey, China, UK, and the U.S.",
      color: "bg-[#619DF9]"
    },
  ];

  // Regular services
  const services = [
    {
      icon: <MonitorSmartphone className="w-8 h-8 text-white" />,
      title: "Media Buying",
      description: "Strategic campaigns across Facebook, Instagram, LinkedIn, TikTok, Snapchat, and Twitter to reach and engage your target audience.",
      color: "bg-media-purple"
    },
    {
      icon: <Megaphone className="w-8 h-8 text-white" />,
      title: "Marketing Strategy",
      description: "Comprehensive marketing strategies tailored to your business goals and target audience for maximum results.",
      color: "bg-media-oceanblue"
    },
    {
      icon: <FileImage className="w-8 h-8 text-white" />,
      title: "Graphic Design",
      description: "Eye-catching visual designs that communicate your brand message and capture audience attention.",
      color: "bg-media-orange"
    },
    {
      icon: <BarChart className="w-8 h-8 text-white" />,
      title: "Content Creation",
      description: "Engaging, high-quality content that resonates with your audience and drives engagement across all platforms.",
      color: "bg-media-vibrantpurple"
    },
    {
      icon: <Video className="w-8 h-8 text-white" />,
      title: "Video Editing",
      description: "Professional video editing services that transform raw footage into compelling visual stories.",
      color: "bg-media-pink"
    },
    {
      icon: <Film className="w-8 h-8 text-white" />,
      title: "Video Graphics",
      description: "Dynamic video graphics that enhance your content with professional visual elements and animations.",
      color: "bg-gradient-to-r from-media-purple to-media-oceanblue"
    },
    {
      icon: <Mic className="w-8 h-8 text-white" />,
      title: "Voice Over",
      description: "Professional voice over services to give your content a polished, authoritative sound.",
      color: "bg-media-orange"
    },
    {
      icon: <Layers className="w-8 h-8 text-white" />,
      title: "Motion Graphics",
      description: "Captivating motion graphics that bring your ideas to life through animated visual storytelling.",
      color: "bg-media-vibrantpurple"
    },
    {
      icon: <Target className="w-8 h-8 text-white" />,
      title: "Animations",
      description: "Creative animations that simplify complex concepts and engage viewers with dynamic visual experiences.",
      color: "bg-media-purple"
    },
    {
      icon: <Code className="w-8 h-8 text-white" />,
      title: "Web Development",
      description: "Custom website development that combines attractive design with powerful functionality.",
      color: "bg-media-oceanblue"
    },
    {
      icon: <ShoppingBag className="w-8 h-8 text-white" />,
      title: "Shopify Store",
      description: "Complete Shopify store setup and optimization for a seamless e-commerce experience that drives sales.",
      color: "bg-[#7AB55C]"
    },
    {
      icon: <Globe className="w-8 h-8 text-white" />,
      title: "WordPress Store",
      description: "Professional WordPress store development with powerful e-commerce capabilities and customizations.",
      color: "bg-[#21759B]"
    }
  ];

  return (
    <section id="services" className="section-padding bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        {/* Expert Media Buying Solutions Section - Updated Layout */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="text-center mb-10">
            <span className="inline-block py-1 px-3 rounded-full bg-media-purple/10 text-media-purple font-medium text-sm mb-4">
              My Expertise
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Expert <span className="text-[#55AAED]">Media Buying</span> Solutions
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Specialized services designed to maximize your advertising effectiveness and deliver 
              measurable business results across multiple platforms and markets.
            </p>
          </div>

          {/* Expert services in a new layout */}
          <div className="relative">
            {/* Background decorative element */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl -z-10"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 md:p-10">
              {/* Left side: featured large card */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="flex flex-col h-full">
                  <div className="bg-gradient-to-r from-[#8B5CF6] to-[#0EA5E9] p-5">
                    <div className="flex justify-between items-center">
                      <h3 className="text-2xl font-bold text-white">Strategic Media Buying</h3>
                      <MonitorSmartphone className="w-10 h-10 text-white opacity-75" />
                    </div>
                  </div>
                  <div className="p-6 flex-grow">
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="bg-green-100 rounded-full p-1 mr-2 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <span className="text-gray-700">Comprehensive multi-platform campaigns</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-green-100 rounded-full p-1 mr-2 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <span className="text-gray-700">Data-driven optimization strategies</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-green-100 rounded-full p-1 mr-2 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <span className="text-gray-700">Expert budget management and allocation</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-green-100 rounded-full p-1 mr-2 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <span className="text-gray-700">Global market reach and localization</span>
                      </li>
                    </ul>
                  </div>
                  <div className="p-6 pt-0">
                    <button className="text-[#8B5CF6] hover:underline text-sm font-medium flex items-center">
                      Learn more about our approach <span className="ml-1">→</span>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Right side: Grid of smaller cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {expertServices.slice(1, 5).map((service, index) => (
                  <div 
                    key={`expert-mini-${index}`} 
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className={`${service.color} h-2 w-full`}></div>
                    <div className="p-5">
                      <div className="flex items-center mb-3">
                        <div className={`${service.color} w-10 h-10 rounded-lg flex items-center justify-center mr-3`}>
                          {service.icon}
                        </div>
                        <h3 className="font-bold">{service.title}</h3>
                      </div>
                      <p className="text-gray-600 text-sm">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Regular Services Section */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-media-purple/10 text-media-purple font-medium text-sm mb-4">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Comprehensive <span className="gradient-text">Digital Solutions</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From media buying to web development, we provide end-to-end digital services to help your business grow and succeed online.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="service-card border-none shadow-lg hover:shadow-xl transition-all overflow-hidden opacity-0 animate-fade-in-up group hover:-translate-y-2 duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-0">
                <div className={`${service.color} h-3 w-full`}></div>
                <div className="p-6">
                  <div className={`w-16 h-16 rounded-full ${service.color} flex items-center justify-center mb-5 transform group-hover:scale-110 transition-transform duration-300`}>
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
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
