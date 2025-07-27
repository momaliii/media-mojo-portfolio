
import React from "react";
import { Helmet } from "react-helmet-async";

const ElevenLabsWidget: React.FC = () => {
  return (
    <>
      <Helmet>
        <script 
          src="https://unpkg.com/@elevenlabs/convai-widget-embed" 
          async 
          type="text/javascript"
        />
      </Helmet>
      <div className="elevenlabs-convai-container">
        <elevenlabs-convai 
          agent-id="agent_4501k15nq9xjemnshg4w9yfr0tmk"
          className="fixed bottom-4 right-4 z-50"
        />
      </div>
    </>
  );
};

export default ElevenLabsWidget;
