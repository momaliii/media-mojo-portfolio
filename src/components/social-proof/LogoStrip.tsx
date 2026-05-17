import React from "react";

const brands = [
  "Meta Ads",
  "Google Ads",
  "TikTok Ads",
  "LinkedIn Ads",
  "Snapchat Ads",
  "Shopify",
  "Klaviyo",
  "GA4",
];

const LogoStrip = () => {
  return (
    <section
      aria-label="Platforms and tools"
      className="bg-media-ink text-white/70 border-y border-white/10"
    >
      <div className="container mx-auto px-4 md:px-6 py-10 md:py-12">
        <p className="eyebrow text-white/50 text-center mb-6">
          Platforms managed · Tools mastered
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-x-6 gap-y-4 items-center justify-items-center">
          {brands.map((b) => (
            <span
              key={b}
              className="text-sm md:text-base font-display font-semibold tracking-tight text-white/60 hover:text-white transition-colors whitespace-nowrap"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoStrip;
