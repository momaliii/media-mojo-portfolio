
import React from "react";

interface ExpertServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const ExpertServiceCard = ({ icon, title, description, color }: ExpertServiceCardProps) => {
  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow transform hover:-translate-y-2 duration-300 group"
      style={{ transform: 'perspective(1000px)' }}
    >
      <div className={`${color} dark:opacity-90 h-2.5 w-full`}></div>
      <div className="p-7">
        <div className="flex items-center mb-4">
          <div 
            className={`${color} dark:opacity-90 w-14 h-14 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300 shadow-md`}
            aria-hidden="true"
          >
            {icon}
          </div>
          <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">{title}</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default ExpertServiceCard;
