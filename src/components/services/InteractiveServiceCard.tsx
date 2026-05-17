
import React, { useState } from "react";
import { motion } from "framer-motion";

interface InteractiveServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  longDescription: string;
  features: string[];
  index: number;
}

const InteractiveServiceCard: React.FC<InteractiveServiceCardProps> = ({ 
  icon, 
  title, 
  description, 
  longDescription,
  color, 
  features,
  index 
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="relative h-full perspective-1000">
      <motion.div 
        className={`h-full w-full duration-500 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        {/* Front of card */}
        <div 
          className={`absolute inset-0 backface-hidden cursor-pointer
          rounded-2xl shadow-lg hover:shadow-xl border border-transparent dark:border-gray-800
          transition-all duration-300 bg-white dark:bg-gray-900 overflow-hidden group`}
          onClick={handleFlip}
        >
          <div className={`${color} h-2.5 w-full`}></div>
          <div className="p-7">
            <div 
              className={`w-16 h-16 rounded-xl ${color} flex items-center justify-center mb-5 transform group-hover:scale-110 transition-transform duration-300 shadow-md`}
              aria-hidden="true"
            >
              {icon}
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-100">{title}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{description}</p>
            
            <div className="mt-5 pt-3 flex justify-center border-t border-gray-100 dark:border-gray-800">
              <span className="inline-flex items-center text-xs font-medium text-media-purple dark:text-media-blue">
                Click to learn more
                <svg className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>
        </div>
        
        {/* Back of card */}
        <div 
          className={`absolute inset-0 backface-hidden rotate-y-180 cursor-pointer
          rounded-2xl shadow-lg hover:shadow-xl border border-transparent dark:border-gray-800
          transition-all duration-300 bg-white dark:bg-gray-900 overflow-hidden`}
          onClick={handleFlip}
        >
          <div className={`${color} h-2.5 w-full`}></div>
          <div className="p-7">
            <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">{title}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{longDescription}</p>
            
            <div className="space-y-2">
              {features.map((feature, i) => (
                <div key={i} className="flex items-baseline">
                  <div className={`w-1.5 h-1.5 rounded-full ${color.replace('bg-', 'bg-')} mr-2`}></div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-5 pt-3 flex justify-center border-t border-gray-100 dark:border-gray-800">
              <button 
                className={`inline-flex items-center px-3 py-1.5 rounded-md text-xs font-medium ${color} text-white`}
                onClick={(e) => {
                  e.stopPropagation();
                  window.location.href = "#contact";
                }}
              >
                Request Service
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InteractiveServiceCard;
