
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  index: number;
}

const ServiceCard = ({ icon, title, description, color, index }: ServiceCardProps) => {
  return (
    <Card 
      className="service-card border-none rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden opacity-0 animate-fade-in-up group hover:-translate-y-3 duration-300 bg-white"
      style={{ 
        animationDelay: `${index * 100}ms`,
        transform: 'perspective(1000px)'
      }}
    >
      <CardContent className="p-0">
        <div className={`${color} h-2.5 w-full`}></div>
        <div className="p-7">
          <div 
            className={`w-16 h-16 rounded-xl ${color} flex items-center justify-center mb-5 transform group-hover:scale-110 transition-transform duration-300 shadow-md`}
            aria-hidden="true"
          >
            {icon}
          </div>
          <h3 className="text-xl font-bold mb-3 text-gray-800">{title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
