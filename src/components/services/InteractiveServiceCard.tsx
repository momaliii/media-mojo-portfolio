
import React, { useState, useId, type KeyboardEvent } from "react";
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
  index,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const backId = useId();

  const handleFlip = () => setIsFlipped((v) => !v);

  const handleKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleFlip();
    }
  };

  const faceClass =
    "absolute inset-0 backface-hidden cursor-pointer rounded-2xl shadow-lg hover:shadow-xl border border-transparent dark:border-gray-800 transition-all duration-300 bg-white dark:bg-gray-900 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-media-purple focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950";

  return (
    <div className="relative h-full perspective-1000">
      <motion.div
        className={`h-full w-full duration-500 preserve-3d ${isFlipped ? "rotate-y-180" : ""}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        {/* Front of card */}
        <div
          role="button"
          tabIndex={isFlipped ? -1 : 0}
          aria-pressed={isFlipped}
          aria-expanded={isFlipped}
          aria-controls={backId}
          aria-label={`${title}. Activate to view details.`}
          onClick={handleFlip}
          onKeyDown={handleKey}
          className={`${faceClass} group`}
        >
          <div className={`${color} h-2.5 w-full`} aria-hidden="true"></div>
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
                <svg
                  className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div
          id={backId}
          role="button"
          tabIndex={isFlipped ? 0 : -1}
          aria-pressed={isFlipped}
          aria-label={`${title} details. Activate to return.`}
          onClick={handleFlip}
          onKeyDown={handleKey}
          className={`${faceClass} rotate-y-180`}
        >
          <div className={`${color} h-2.5 w-full`} aria-hidden="true"></div>
          <div className="p-7">
            <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">{title}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{longDescription}</p>

            <ul className="space-y-2" aria-label={`${title} features`}>
              {features.map((feature, i) => (
                <li key={i} className="flex items-baseline">
                  <span className={`w-1.5 h-1.5 rounded-full ${color} mr-2`} aria-hidden="true"></span>
                  <span className="text-xs text-gray-600 dark:text-gray-400">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 pt-3 flex justify-center border-t border-gray-100 dark:border-gray-800">
              <a
                href="#contact"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                onKeyDown={(e) => e.stopPropagation()}
                className={`inline-flex items-center px-3 py-1.5 rounded-md text-xs font-medium ${color} text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-media-purple`}
                aria-label={`Request the ${title} service`}
              >
                Request Service
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InteractiveServiceCard;
