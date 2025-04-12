
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
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow transform hover:-translate-y-1 duration-300"
    >
      <div className={`${color} h-2 w-full`}></div>
      <div className="p-5">
        <div className="flex items-center mb-3">
          <div 
            className={`${color} w-10 h-10 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300`}
            aria-hidden="true"
          >
            {icon}
          </div>
          <h3 className="font-bold">{title}</h3>
        </div>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default ExpertServiceCard;
