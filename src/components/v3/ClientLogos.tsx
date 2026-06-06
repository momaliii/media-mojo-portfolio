import React from "react";
import { useVisibleClientLogos } from "@/hooks/use-client-logos";

const ClientLogosV3 = () => {
  const { data: logos = [], isLoading } = useVisibleClientLogos();
  if (isLoading || logos.length === 0) return null;

  const sorted = [...logos].sort((a, b) => Number(b.featured) - Number(a.featured));
  const useMarquee = sorted.length >= 5;
  const items = useMarquee ? [...sorted, ...sorted] : sorted;

  return (
    <section
      id="clients"
      aria-labelledby="v3-clients-heading"
      className="relative py-20 md:py-24 border-y v3-rule"
    >
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">
        <div className="flex items-end justify-between gap-6 mb-10 md:mb-12">
          <div>
            <p className="v3-eyebrow v3-cyan mb-4">Trusted operators</p>
            <h2
              id="v3-clients-heading"
              className="v3-display text-3xl md:text-5xl font-bold leading-[1] tracking-[-0.04em]"
            >
              Brands I've <span className="v3-glow-text">scaled with.</span>
            </h2>
          </div>
          <p className="hidden md:block max-w-xs text-sm v3-soft">
            A selection of ambitious teams partnered across MENA & beyond.
          </p>
        </div>
      </div>

      {useMarquee ? (
        <div
          className="relative overflow-hidden group/marquee"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <div className="flex gap-4 md:gap-5 w-max animate-marquee group-hover/marquee:[animation-play-state:paused] px-5">
            {items.map((logo, idx) => (
              <LogoTile key={`${logo.id}-${idx}`} logo={logo} />
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {sorted.map((logo) => (
            <LogoTile key={logo.id} logo={logo} />
          ))}
        </div>
      )}
    </section>
  );
};

const LogoTile = ({
  logo,
}: {
  logo: { name: string; logo_url: string; website_url: string | null; featured: boolean };
}) => {
  const inner = (
    <div className="v3-shell v3-card-hover group relative h-32 md:h-36 w-[180px] md:w-[210px] rounded-2xl p-4 flex flex-col items-center justify-between overflow-hidden">
      {logo.featured && (
        <span className="absolute top-2 right-2 v3-pill rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider v3-lime">
          Featured
        </span>
      )}
      <div className="flex-1 w-full flex items-center justify-center bg-white/95 rounded-xl p-2">
        <img
          src={logo.logo_url}
          alt={logo.name}
          loading="lazy"
          className="max-h-12 md:max-h-14 max-w-[85%] object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <p className="w-full text-center text-[11px] md:text-xs font-semibold tracking-tight v3-soft truncate pt-2 border-t v3-rule">
        {logo.name}
      </p>
    </div>
  );

  if (logo.website_url) {
    return (
      <a
        href={logo.website_url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${logo.name} website`}
        className="block shrink-0"
      >
        {inner}
      </a>
    );
  }
  return (
    <div aria-label={logo.name} className="block shrink-0">
      {inner}
    </div>
  );
};

export default ClientLogosV3;
