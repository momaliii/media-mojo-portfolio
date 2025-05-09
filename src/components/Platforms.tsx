
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag, Code, ShoppingCart, Layers } from "lucide-react";

const Platforms = () => {
  const platforms = [
    {
      icon: <ShoppingBag className="w-8 h-8 text-white" />,
      title: "Shopify",
      description: "Complete e-commerce platform for online stores and retail point-of-sale systems.",
      color: "bg-[#7AB55C]"
    },
    {
      icon: <Code className="w-8 h-8 text-white" />,
      title: "WordPress",
      description: "Versatile content management system with thousands of plugins for e-commerce solutions.",
      color: "bg-[#21759B]"
    },
    {
      icon: <ShoppingCart className="w-8 h-8 text-white" />,
      title: "Easyorder",
      description: "Modern B2B ordering platform for creating high-converting sales and inventory management.",
      color: "bg-[#FF5722]"
    },
    {
      icon: <Layers className="w-8 h-8 text-white" />,
      title: "Lightfunnl",
      description: "Modern funnel builder for creating high-converting sales and landing pages.",
      color: "bg-[#6366F1]"
    }
  ];

  return (
    <section id="platforms" className="section-padding bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <span className="inline-block py-1.5 px-4 rounded-full bg-media-purple/10 text-media-purple font-medium text-sm mb-4">
            E-commerce Platforms
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted <span className="gradient-text">Platforms</span> For Client Success
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            With expertise across multiple e-commerce platforms, I help clients build and optimize their online stores for maximum visibility and conversion.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {platforms.map((platform, index) => (
            <Card 
              key={index} 
              className="platform-card border-none rounded-2xl shadow-md hover:shadow-lg transition-all overflow-hidden opacity-0 animate-fade-in-up group hover:-translate-y-2 duration-300 bg-white"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-0">
                <div className={`${platform.color} h-2 w-full`}></div>
                <div className="p-6 md:p-7">
                  <div className={`w-14 h-14 rounded-xl ${platform.color} flex items-center justify-center mb-5 transform group-hover:scale-110 transition-transform duration-300`}>
                    {platform.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">{platform.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{platform.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Platforms;
