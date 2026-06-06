import React from "react";
import { useVisibleClientLogos, type ClientLogo } from "@/hooks/use-client-logos";

const ClientLogosV3 = () => {
  const { data: logos = [], isLoading } = useVisibleClientLogos();
  if (isLoading || logos.length === 0) return null;

  const sorted = [...logos].sort((a, b) => Number(b.featured) - Number(a.featured));
  const loop = [...sorted, ...sorted];

  return (
    <section
      id="clients"
      aria-labelledby="v3-clients-heading"
      className="relative py-16 md:py-20 border-y v3-rule overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10 mb-10 md:mb-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8 bg-[var(--v3-lime)]" />
              <span className="v3-eyebrow v3-lime">Trusted Operators</span>
            </div>
            <h2
              id="v3-clients-heading"
              className="v3-display text-white text-3xl md:text-5xl font-bold tracking-tight"
            >
              Brands I've scaled with<span className="v3-cyan">.</span>
            </h2>
          </div>
          <p className="text-sm v3-soft max-w-xs">
            {sorted.length}+ partners across MENA — e-commerce, hospitality, tourism, education.
          </p>
        </div>
      </div>

      <div
        className="relative group/marquee"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        }}
      >
        <div className="flex gap-10 md:gap-14 w-max animate-marquee group-hover/marquee:[animation-play-state:paused] px-5">
          {loop.map((logo, idx) => (
            <LogoMark key={`${logo.id}-${idx}`} logo={logo} />
          ))}
        </div>
      </div>
    </section>
  );
};

const LogoMark = ({ logo }: { logo: ClientLogo }) => {
  const inner = (
    <div className="group/item relative flex items-center justify-center h-16 md:h-20 shrink-0">
      <img
        src={logo.logo_url}
        alt={logo.name}
        loading="lazy"
        className="h-full w-auto max-w-[160px] md:max-w-[200px] object-contain opacity-70 group-hover/item:opacity-100 transition-opacity duration-300"
      />
      {logo.featured && (
        <span
          className="absolute -top-2 -right-2 h-1.5 w-1.5 rounded-full bg-[var(--v3-lime)] shadow-[0_0_8px_var(--v3-lime)]"
          aria-hidden
        />
      )}
      <span className="sr-only">{logo.name}</span>
    </div>
  );

  if (logo.website_url) {
    return (
      <a
        href={logo.website_url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${logo.name}`}
        className="block"
      >
        {inner}
      </a>
    );
  }
  return inner;
};

export default ClientLogosV3;
