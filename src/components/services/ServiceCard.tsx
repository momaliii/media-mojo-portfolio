
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

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
      className="service-card border-none shadow-lg hover:shadow-xl transition-all overflow-hidden opacity-0 animate-fade-in-up group hover:-translate-y-2 duration-300"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <CardContent className="p-0">
        <div className={`${color} h-3 w-full`}></div>
        <div className="p-6">
          <div 
            className={`w-16 h-16 rounded-full ${color} flex items-center justify-center mb-5 transform group-hover:scale-110 transition-transform duration-300`}
            aria-hidden="true"
          >
            {icon}
          </div>
          <h3 className="text-xl font-bold mb-3">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
