
import React from "react";

interface CarouselIndicatorsProps {
  api: any;
  count: number;
  currentIndex: number;
}

const CarouselIndicators: React.FC<CarouselIndicatorsProps> = ({ 
  api, 
  count, 
  currentIndex 
}) => {
  if (!api) return null;

  const handleIndicatorClick = (index: number) => {
    api.scrollTo(index);
  };

  return (
    <div 
      className="flex justify-center items-center gap-1.5 mt-4"
      role="tablist"
      aria-label="Carousel pagination"
    >
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          className={`w-2.5 h-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-media-purple focus:ring-offset-2 ${
            currentIndex === index
              ? "bg-media-purple scale-125"
              : "bg-gray-300 hover:bg-gray-400"
          }`}
          onClick={() => handleIndicatorClick(index)}
          role="tab"
          aria-label={`Go to slide ${index + 1}`}
          aria-selected={currentIndex === index}
          aria-controls={`carousel-item-${index}`}
          tabIndex={0}
        />
      ))}
    </div>
  );
};

export default CarouselIndicators;
