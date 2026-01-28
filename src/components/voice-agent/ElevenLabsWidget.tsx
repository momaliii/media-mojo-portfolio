
import React, { useEffect } from "react";

const ElevenLabsWidget: React.FC = () => {
  useEffect(() => {
    // Load the ElevenLabs script
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
    script.async = true;
    script.type = 'text/javascript';
    document.head.appendChild(script);

    return () => {
      // Cleanup on unmount
      const existingScript = document.querySelector('script[src="https://unpkg.com/@elevenlabs/convai-widget-embed"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div className="hidden md:block fixed bottom-4 right-4 z-[9999]">
      <elevenlabs-convai 
        agent-id="agent_4501k15nq9xjemnshg4w9yfr0tmk"
      />
    </div>
  );
};

export default ElevenLabsWidget;
