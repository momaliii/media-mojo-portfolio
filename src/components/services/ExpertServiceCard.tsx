
import React from "react";

interface ExpertServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const ExpertServiceCard = ({ icon, title, description, color }: ExpertServiceCardProps) => {
  return (
    <div className="group bg-white dark:bg-gray-800/90 rounded-2xl shadow-md p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg h-full">
      <div className="space-y-6">
        <div className={`${color} w-14 h-14 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">{title}</h3>
          <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ExpertServiceCard;
