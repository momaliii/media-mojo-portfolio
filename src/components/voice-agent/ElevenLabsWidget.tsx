
import React from "react";
import { Helmet } from "react-helmet-async";

interface ElevenLabsWidgetProps {
  agentId: string;
}

const ElevenLabsWidget: React.FC<ElevenLabsWidgetProps> = ({ agentId }) => {
  return (
    <>
      <Helmet>
        <script 
          src="https://elevenlabs.io/convai-widget/index.js" 
          async 
          type="text/javascript"
        />
      </Helmet>
      <div className="elevenlabs-convai-container">
        <elevenlabs-convai 
          agent-id={agentId}
          className="fixed bottom-4 right-4 z-50"
        />
      </div>
    </>
  );
};

export default ElevenLabsWidget;
