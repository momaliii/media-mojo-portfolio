
import React, { useState } from "react";

const SkipToContent = () => {
  const [focused, setFocused] = useState(false);
  
  return (
    <a 
      href="#main-content"
      className={`
        fixed top-4 left-4 z-[100] transform transition-transform duration-200 bg-white dark:bg-gray-800 text-media-purple dark:text-media-blue
        px-4 py-2 rounded-md shadow-md
        ${focused ? "translate-y-0" : "-translate-y-16"}
      `}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      Skip to content
    </a>
  );
};

export default SkipToContent;
