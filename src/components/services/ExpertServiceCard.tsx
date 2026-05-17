
import React from "react";

interface ExpertServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const ExpertServiceCard = ({ icon, title, description, color }: ExpertServiceCardProps) => {
  return (
    <div className="group relative bg-white dark:bg-gray-800/90 rounded-[20px] shadow-md hover:shadow-lg transition-all duration-300 h-full overflow-hidden">
      <div className="p-6 sm:p-8">
        <div className="space-y-4 sm:space-y-6">
          <div className={`${color} w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}>
            <div className="text-white w-6 h-6 sm:w-7 sm:h-7">
              {icon}
            </div>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 sm:mb-3">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertServiceCard;
