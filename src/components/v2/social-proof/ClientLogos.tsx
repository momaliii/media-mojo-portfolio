import React from "react";

/**
 * NDA-friendly client showcase — same visual rhythm as LogoStrip
 * (monogram + name + dot, scrolling marquee, pause on hover).
 * Each "logo" is a procedurally-generated monogram circle that visually
 * stands in for a real brand mark.
 */

type Client = {
  name: string;
  initials: string;
  region: string;
};

const clients: Client[] = [
  { name: "Lumière Beauty",       initials: "LB", region: "Riyadh"   },
  { name: "Cairo Eats",           initials: "CE", region: "Cairo"    },
  { name: "Atelier Maison",       initials: "AM", region: "Doha"     },
  { name: "Kuwait Co.",           initials: "KC", region: "Kuwait"   },
  { name: "Orient Capital",       initials: "OC", region: "London"   },
  { name: "House of Verse",       initials: "HV", region: "Istanbul" },
  { name: "Northshore DTC",       initials: "ND", region: "NYC"      },
  { name: "Pacific Goods",        initials: "PG", region: "Shanghai" },
  { name: "Andalus Skincare",     initials: "AS", region: "Jeddah"   },
  { name: "Cedar & Stone",        initials: "CS", region: "Dubai"    },
];

const Monogram = ({ initials, idx }: { initials: string; idx: number }) => {
  // Rotate the inner accent for visual variety
  const rotation = (idx * 37) % 360;
  return (
    <span
      aria-hidden
      className="relative inline-flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full border border-current"
    >
      <span
        className="absolute inset-0 rounded-full border border-current opacity-30"
        style={{ transform: `rotate(${rotation}deg) scale(0.78)` }}
      />
      <span className="absolute inset-0 rounded-full opacity-20 bg-current scale-[0.2]" />
      <span className="relative font-serif text-sm md:text-base leading-none">
        {initials}
      </span>
    </span>
  );
};

const ClientLogos = () => {
  const items = [...clients, ...clients, ...clients];

  return (
    <section
      aria-label="Selected clients"
      className="bg-obsidian border-b border-white/[0.06] overflow-hidden grain"
    >
      <div className="container mx-auto px-6 lg:px-10 pt-12 pb-4">
        <div className="flex items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-6">
            <span className="block h-px w-12 bg-gold/40" />
            <p className="eyebrow text-gold/70">Selected Clients</p>
          </div>
          <p className="font-mono uppercase text-[0.625rem] tracking-[0.22em] text-white/30 hidden md:block">
            Names anonymised · references on request
          </p>
        </div>
      </div>

      {/* Marquee — opposite direction to LogoStrip for visual rhythm */}
      <div className="marquee-mask py-6 group">
        <div
          className="flex w-max gap-12 group-hover:[animation-play-state:paused]"
          style={{
            animation: "v2-marquee-reverse 45s linear infinite",
          }}
        >
          {items.map((c, i) => (
            <div
              key={`${c.name}-${i}`}
              className="flex items-center gap-3 text-white/30 hover:text-gold transition-all duration-500 cursor-default"
            >
              <Monogram initials={c.initials} idx={i} />
              <div className="flex flex-col items-start leading-tight">
                <span className="font-serif text-lg md:text-xl">{c.name}</span>
                <span className="font-mono uppercase text-[0.5625rem] tracking-[0.22em] opacity-70">
                  {c.region}
                </span>
              </div>
              <span className="text-gold/40 ml-2">·</span>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-10 pt-4 pb-12">
        <div className="flex items-center gap-6">
          <span className="block h-px flex-1 bg-white/[0.06]" />
          <p className="font-mono uppercase text-[0.625rem] tracking-[0.22em] text-white/30">
            DTC · F&amp;B · NGO · B2B · Across 10 countries
          </p>
          <span className="block h-px flex-1 bg-white/[0.06]" />
        </div>
      </div>

      {/* Reverse marquee keyframe — scoped here so it ships with the component */}
      <style>{`
        @keyframes v2-marquee-reverse {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0);    }
        }
      `}</style>
    </section>
  );
};

export default ClientLogos;
