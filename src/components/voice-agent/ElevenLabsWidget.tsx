
import React, { useEffect } from "react";

const ElevenLabsWidget: React.FC = () => {
  useEffect(() => {
    // Custom elements remain registered after navigation; load the embed only once.
    const src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
    if (customElements.get('elevenlabs-convai') || document.querySelector(`script[src="${src}"]`)) return;
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.type = 'text/javascript';
    document.head.appendChild(script);

  }, []);

  return (
    <aside
      aria-label="AI voice assistant"
      className="fixed bottom-4 right-4 z-[9999]"
    >
      <elevenlabs-convai 
        agent-id="agent_4501k15nq9xjemnshg4w9yfr0tmk"
      />
    </aside>
  );
};

export default ElevenLabsWidget;
