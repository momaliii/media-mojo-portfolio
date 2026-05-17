import React from "react";

const Mark = {
  Meta: () => (
    <svg viewBox="0 0 36 36" className="h-8 md:h-10 w-auto" fill="currentColor" aria-label="Meta">
      <path d="M18 4C9.16 4 2 11.16 2 20s7.16 16 16 16 16-7.16 16-16S26.84 4 18 4zm9.3 16.4c-1 5.3-3.8 8.5-6.7 8.5-1.8 0-3-1-4.4-3.2-1 1.8-2.4 3.2-4.6 3.2-3 0-5.6-3.4-5.6-8.1 0-5.7 3-9.3 6.7-9.3 2 0 3.6 1 5 3 1.3-2 3-3 5-3 3.6 0 5.7 3.4 4.6 8.9z" />
    </svg>
  ),
  Google: () => (
    <svg viewBox="0 0 48 48" className="h-7 md:h-9 w-auto" aria-label="Google" fill="currentColor">
      <path d="M44.5 20H24v8.5h11.8C34.7 33.9 30 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 6 .9 8.3 2.7l6-6C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" />
    </svg>
  ),
  TikTok: () => (
    <svg viewBox="0 0 24 24" className="h-7 md:h-9 w-auto" fill="currentColor" aria-label="TikTok">
      <path d="M19.6 6.3c-1.9-.5-3.2-2-3.2-3.8h-3.6v13.7c0 1.9-1.5 3.4-3.4 3.4s-3.4-1.5-3.4-3.4 1.5-3.4 3.4-3.4c.4 0 .8.1 1.2.2v-3.7c-.4-.1-.8-.1-1.2-.1-3.9 0-7 3.1-7 7s3.1 7 7 7 7-3.1 7-7v-7c1.4.9 3 1.5 4.8 1.5V7c-.6 0-1.1-.2-1.6-.7z" />
    </svg>
  ),
  LinkedIn: () => (
    <svg viewBox="0 0 24 24" className="h-7 md:h-9 w-auto" fill="currentColor" aria-label="LinkedIn">
      <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zm-1.5-10.3A1.7 1.7 0 118.2 7 1.7 1.7 0 016.5 8.7zM19 19h-3v-4.7c0-1.1 0-2.6-1.6-2.6s-1.8 1.2-1.8 2.5V19h-3v-9h2.9v1.3a3.2 3.2 0 012.9-1.6c3.1 0 3.7 2 3.7 4.7z" />
    </svg>
  ),
  Snapchat: () => (
    <svg viewBox="0 0 24 24" className="h-7 md:h-9 w-auto" fill="currentColor" aria-label="Snapchat">
      <path d="M12 1.5c2.9 0 5.4 2.1 6 5l.1 3.3c.3-.1.6-.2.9-.2.8 0 1.5.6 1.5 1.2 0 .6-.5 1-1.2 1.3-.4.2-.9.3-1.2.5-.1.1-.1.4 0 .6.8 2.3 3 2.6 3.2 2.7.3.1.4.4.3.7-.2.6-1.5 1.2-3.2 1.4 0 .1-.1.5-.2.8-.1.3-.4.4-.7.4-.6 0-1.3-.5-2.7-.2-.8.1-1.5.6-2.3 1.2-.7.5-1.4 1.1-2.5 1.1-1 0-1.8-.6-2.5-1.1-.8-.6-1.5-1.1-2.3-1.2-1.4-.3-2.1.2-2.7.2-.3 0-.6-.1-.7-.4-.1-.3-.2-.7-.2-.8-1.7-.2-3-.8-3.2-1.4-.1-.3 0-.6.3-.7.2-.1 2.4-.4 3.2-2.7.1-.2.1-.5 0-.6-.3-.2-.8-.3-1.2-.5-.7-.3-1.2-.7-1.2-1.3 0-.6.7-1.2 1.5-1.2.3 0 .6.1.9.2L6 6.5c.6-2.9 3.1-5 6-5z" />
    </svg>
  ),
  Shopify: () => (
    <svg viewBox="0 0 24 24" className="h-7 md:h-9 w-auto" fill="currentColor" aria-label="Shopify">
      <path d="M15.3 6c-.1-.5-.5-.8-.8-.8-.4 0-.7.2-.9.4-.3.3-.5.7-.6 1.1-.2 0-.4 0-.6-.1-.1-1.5-.7-2.6-1.6-2.6-.2 0-.5.1-.7.2-.3-.4-.7-.6-1.2-.6-1.7 0-3.2 2-3.7 4.8L4 9.3c-.4.1-.4.1-.5.5L2 18.7l8.4 1.6 6.3-1.4S15.4 6.4 15.3 6zM11.4 5.3c-.2.1-.5.2-.7.3 0-.9-.2-1.5-.4-1.9.6 0 1 .7 1.1 1.6zm-1.6.5c-.5.1-1 .3-1.4.4.2-.7.5-1.4 1-1.9.1-.1.4-.3.6-.4.2.4.4 1 .4 1.7l-.6.2zm-1.2-2.7c.2 0 .4.1.6.2-.4.3-.8.7-1 1.3-.3.7-.6 1.4-.7 2-.4.1-.8.2-1.2.4.3-1.7 1.3-3.8 2.3-3.9zm-1.5 8.7v-.1l.5-1.7 1.5.6c.1 0 .2.1.2.2 0 .1-.1.2-.1.3l-1.5 1.4c-.1.1-.3.1-.4-.1-.1-.2-.2-.4-.2-.6zm5.6 4.5l-.3 1.4-1.6.3-2.1-.6.2-1.3c.1-.3.2-.4.4-.4l1.3.3 2.1.3z" />
    </svg>
  ),
  Klaviyo: () => (
    <svg viewBox="0 0 24 24" className="h-6 md:h-8 w-auto" fill="currentColor" aria-label="Klaviyo">
      <path d="M12 2C7 2 3 6 3 11.5c0 1.4.3 2.7.7 3.7l.4.7-.6 4 4.1-.5.6.2c1.1.4 2.4.6 3.8.6 5 0 9-4 9-9.5S17 2 12 2zm0 13a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
    </svg>
  ),
  GA4: () => (
    <svg viewBox="0 0 24 24" className="h-7 md:h-9 w-auto" fill="currentColor" aria-label="Google Analytics">
      <path d="M22 21h-4V8a2 2 0 014 0v13zM12 21H8V12a2 2 0 014 0v9zM2 21h4v-6a2 2 0 10-4 0v6z" />
    </svg>
  ),
};

const brands = [
  { name: "Meta", Icon: Mark.Meta },
  { name: "Google", Icon: Mark.Google },
  { name: "TikTok", Icon: Mark.TikTok },
  { name: "LinkedIn", Icon: Mark.LinkedIn },
  { name: "Snapchat", Icon: Mark.Snapchat },
  { name: "Shopify", Icon: Mark.Shopify },
  { name: "Klaviyo", Icon: Mark.Klaviyo },
  { name: "GA4", Icon: Mark.GA4 },
];

const LogoStrip = () => {
  const items = [...brands, ...brands, ...brands];

  return (
    <section
      aria-label="Platforms and tools"
      className="bg-obsidian border-y border-white/[0.06] overflow-hidden grain"
    >
      <div className="container mx-auto px-6 lg:px-10 pt-12 pb-4">
        <div className="flex items-center gap-6 mb-10">
          <span className="block h-px w-12 bg-gold/40" />
          <p className="eyebrow text-gold/70">Platforms · Tools · Stacks</p>
        </div>
      </div>

      <div className="marquee-mask py-6 group">
        <div className="flex w-max animate-marquee gap-16 group-hover:[animation-play-state:paused]">
          {items.map((b, i) => (
            <div
              key={`${b.name}-${i}`}
              className="flex items-center gap-3 text-white/30 hover:text-gold transition-all duration-500 cursor-default"
            >
              <b.Icon />
              <span className="font-mono uppercase text-[0.6875rem] tracking-[0.22em]">
                {b.name}
              </span>
              <span className="text-gold/40">·</span>
            </div>
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
