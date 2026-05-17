import React from "react";

const brands = [
  "Meta",
  "Google",
  "TikTok",
  "LinkedIn",
  "Snapchat",
  "Shopify",
  "Klaviyo",
  "GA4",
  "Looker",
  "Easy Order",
];

const LogoStrip = () => {
  // Duplicate for seamless loop
  const items = [...brands, ...brands];

  return (
    <section
      aria-label="Platforms and tools"
      className="bg-obsidian border-y border-white/[0.06] overflow-hidden"
    >
      <div className="container mx-auto px-6 lg:px-10 pt-12 pb-4">
        <div className="flex items-center gap-6 mb-10">
          <span className="block h-px w-12 bg-gold/40" />
          <p className="eyebrow text-gold/70">Platforms · Tools · Stacks</p>
        </div>
      </div>

      <div className="marquee-mask py-6">
        <div className="flex w-max animate-marquee gap-16">
          {items.map((b, i) => (
            <span
              key={`${b}-${i}`}
              className="font-serif text-3xl md:text-5xl text-white/30 hover:text-gold transition-colors duration-700 whitespace-nowrap"
            >
              {b}
              <span className="text-gold/60 mx-8">·</span>
            </span>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-10 pt-4 pb-12">
        <div className="flex items-center gap-6">
          <span className="block h-px flex-1 bg-white/[0.06]" />
          <p className="font-mono uppercase text-[0.625rem] tracking-[0.22em] text-white/30">
            Eight-figure ad spend managed · 2018—{new Date().getFullYear()}
          </p>
          <span className="block h-px flex-1 bg-white/[0.06]" />
        </div>
      </div>
    </section>
  );
};

export default LogoStrip;
