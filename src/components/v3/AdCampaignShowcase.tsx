import React from "react";
import AdScreenshotsGallery from "@/components/portfolio/AdScreenshotsGallery";

const AdCampaignShowcase: React.FC = () => {
  return (
    <section
      id="ad-showcase"
      className="scroll-mt-24"
      aria-labelledby="ad-gallery-heading"
    >
      <AdScreenshotsGallery />
    </section>
  );
};

export default AdCampaignShowcase;
