
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

interface ElevenLabsWidgetProps {
  agentId: string;
}

const ElevenLabsWidget: React.FC<ElevenLabsWidgetProps> = ({ agentId }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Function to check if footer is in viewport
    const checkFooterVisibility = () => {
      const footer = document.querySelector('footer');
      if (!footer) return;
      
      const footerRect = footer.getBoundingClientRect();
      const isFooterVisible = footerRect.top < window.innerHeight;
      
      setIsVisible(isFooterVisible);
    };
    
    // Initial check
    checkFooterVisibility();
    
    // Add scroll event listener
    window.addEventListener('scroll', checkFooterVisibility, { passive: true });
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', checkFooterVisibility);
    };
  }, []);
  
  return (
    <>
      <Helmet>
        <script 
          src="https://elevenlabs.io/convai-widget/index.js" 
          async 
          type="text/javascript"
        />
      </Helmet>
      <div className={`elevenlabs-convai-container ${isVisible ? 'visible' : 'hidden'}`}>
        <elevenlabs-convai 
          agent-id={agentId}
          className="fixed bottom-4 right-4 z-50"
        />
      </div>
    </>
  );
};

export default ElevenLabsWidget;
