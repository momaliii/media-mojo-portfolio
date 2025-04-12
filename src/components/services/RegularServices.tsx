
import React, { useState, useEffect } from "react";
import ServiceCard from "./ServiceCard";
import ServiceCategories from "./ServiceCategories";
import { 
  MonitorSmartphone, 
  Megaphone, 
  FileImage,
  BarChart,
  Video,
  Film,
  Mic,
  Layers,
  Target,
  Code,
  ShoppingBag,
  Globe 
} from "lucide-react";

interface ServiceType {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  category: string;
}

const RegularServices = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  // Regular services with categories added
  const services: ServiceType[] = [
    {
      icon: <MonitorSmartphone className="w-8 h-8 text-white" />,
      title: "Media Buying",
      description: "Strategic campaigns across Facebook, Instagram, LinkedIn, TikTok, Snapchat, and Twitter to reach and engage your target audience.",
      color: "bg-media-purple",
      category: "media"
    },
    {
      icon: <Megaphone className="w-8 h-8 text-white" />,
      title: "Marketing Strategy",
      description: "Comprehensive marketing strategies tailored to your business goals and target audience for maximum results.",
      color: "bg-media-oceanblue",
      category: "media"
    },
    {
      icon: <FileImage className="w-8 h-8 text-white" />,
      title: "Graphic Design",
      description: "Eye-catching visual designs that communicate your brand message and capture audience attention.",
      color: "bg-media-orange",
      category: "design"
    },
    {
      icon: <BarChart className="w-8 h-8 text-white" />,
      title: "Content Creation",
      description: "Engaging, high-quality content that resonates with your audience and drives engagement across all platforms.",
      color: "bg-media-vibrantpurple",
      category: "content"
    },
    {
      icon: <Video className="w-8 h-8 text-white" />,
      title: "Video Editing",
      description: "Professional video editing services that transform raw footage into compelling visual stories.",
      color: "bg-media-pink",
      category: "content"
    },
    {
      icon: <Film className="w-8 h-8 text-white" />,
      title: "Video Graphics",
      description: "Dynamic video graphics that enhance your content with professional visual elements and animations.",
      color: "bg-gradient-to-r from-media-purple to-media-oceanblue",
      category: "content"
    },
    {
      icon: <Mic className="w-8 h-8 text-white" />,
      title: "Voice Over",
      description: "Professional voice over services to give your content a polished, authoritative sound.",
      color: "bg-media-orange",
      category: "content"
    },
    {
      icon: <Layers className="w-8 h-8 text-white" />,
      title: "Motion Graphics",
      description: "Captivating motion graphics that bring your ideas to life through animated visual storytelling.",
      color: "bg-media-vibrantpurple",
      category: "design"
    },
    {
      icon: <Target className="w-8 h-8 text-white" />,
      title: "Animations",
      description: "Creative animations that simplify complex concepts and engage viewers with dynamic visual experiences.",
      color: "bg-media-purple",
      category: "design"
    },
    {
      icon: <Code className="w-8 h-8 text-white" />,
      title: "Web Development",
      description: "Custom website development that combines attractive design with powerful functionality.",
      color: "bg-media-oceanblue",
      category: "development"
    },
    {
      icon: <ShoppingBag className="w-8 h-8 text-white" />,
      title: "Shopify Store",
      description: "Complete Shopify store setup and optimization for a seamless e-commerce experience that drives sales.",
      color: "bg-[#7AB55C]",
      category: "development"
    },
    {
      icon: <Globe className="w-8 h-8 text-white" />,
      title: "WordPress Store",
      description: "Professional WordPress store development with powerful e-commerce capabilities and customizations.",
      color: "bg-[#21759B]",
      category: "development"
    }
  ];

  // Filter services based on selected category
  const filteredServices = activeCategory === "all" 
    ? services 
    : services.filter(service => service.category === activeCategory);

  // Lazy loading using Intersection Observer
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    const servicesSection = document.getElementById("regular-services");
    if (servicesSection) observer.observe(servicesSection);
    
    return () => {
      if (servicesSection) observer.unobserve(servicesSection);
    };
  }, []);

  return (
    <div id="regular-services">
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

      <ServiceCategories 
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {isVisible && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {filteredServices.map((service, index) => (
            <ServiceCard 
              key={index} 
              icon={service.icon}
              title={service.title}
              description={service.description}
              color={service.color}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RegularServices;
