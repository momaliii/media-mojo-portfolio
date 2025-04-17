
import React from "react";
import { LucideIcon } from "lucide-react";

interface ExpertServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const ExpertServiceCard = ({ icon, title, description, color }: ExpertServiceCardProps) => {
  return (
    <div 
      className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow transform hover:-translate-y-1 duration-300"
    >
      <div className={`${color} h-2 w-full`}></div>
      <div className="p-6 md:p-7">
        <div className="flex items-center mb-4">
          <div 
            className={`${color} w-12 h-12 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300`}
            aria-hidden="true"
          >
            {icon}
          </div>
          <h3 className="font-bold text-lg text-gray-800">{title}</h3>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default ExpertServiceCard;
