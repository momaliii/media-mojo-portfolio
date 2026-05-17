import React from "react";

/**
 * NDA-friendly client showcase — same visual rhythm as LogoStrip
 * (mark + name + dot, scrolling marquee, pause on hover).
 * Each "logo" is a distinct hand-crafted abstract SVG mark — varied
 * shapes so it reads as a row of real brand logos, not a row of
 * identical circles.
 */

type ClientMark = (props: { size?: number }) => JSX.Element;

type Client = {
  name: string;
  region: string;
  mark: ClientMark;
};

// ─── 10 distinct abstract marks ───────────────────────────────────────────
const SunBurst: ClientMark = ({ size = 28 }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.4">
    <circle cx="16" cy="16" r="6" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((d) => (
      <line key={d} x1="16" y1="16" x2={16 + 13 * Math.cos((d * Math.PI) / 180)} y2={16 + 13 * Math.sin((d * Math.PI) / 180)} strokeLinecap="round" />
    ))}
  </svg>
);

const ForkBranch: ClientMark = ({ size = 28 }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4v24" />
    <path d="M10 8v6a6 6 0 006 6" />
    <path d="M22 8v6a6 6 0 01-6 6" />
    <circle cx="16" cy="4" r="1.5" fill="currentColor" />
  </svg>
);

const HousePeak: ClientMark = ({ size = 28 }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
    <path d="M4 18l12-12 12 12" />
    <path d="M8 18v8h16v-8" />
    <path d="M14 26v-6h4v6" />
  </svg>
);

const DhowSail: ClientMark = ({ size = 28 }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4v18" />
    <path d="M16 6c6 4 8 10 8 16H10c0-4 1-9 6-16z" fill="currentColor" fillOpacity=".15" />
    <path d="M4 26c2 1.5 4 2 6 2s4-.5 6-2 4-2 6-2 4 .5 6 2" />
  </svg>
);

const CompassRose: ClientMark = ({ size = 28 }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
    <circle cx="16" cy="16" r="12" />
    <path d="M16 4l3 12-3 12-3-12z" fill="currentColor" fillOpacity=".2" />
    <path d="M4 16l12-3 12 3-12 3z" />
  </svg>
);

const OpenBook: ClientMark = ({ size = 28 }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
    <path d="M4 8c4 0 8 1 12 4 4-3 8-4 12-4v18c-4 0-8 1-12 4-4-3-8-4-12-4z" />
    <path d="M16 12v18" />
  </svg>
);

const Waves: ClientMark = ({ size = 28 }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M3 11c3 0 3-3 6.5-3S13 11 16 11s3-3 6.5-3 3.5 3 6.5 3" />
    <path d="M3 18c3 0 3-3 6.5-3S13 18 16 18s3-3 6.5-3 3.5 3 6.5 3" />
    <path d="M3 25c3 0 3-3 6.5-3S13 25 16 25s3-3 6.5-3 3.5 3 6.5 3" />
  </svg>
);

const MountainStack: ClientMark = ({ size = 28 }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
    <path d="M2 26l9-14 6 9 4-5 9 10z" />
    <circle cx="22" cy="9" r="2" fill="currentColor" />
  </svg>
);

const PetalLeaf: ClientMark = ({ size = 28 }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
    <path d="M16 4c6 4 10 10 10 16 0 4-3 8-10 8s-10-4-10-8c0-6 4-12 10-16z" />
    <path d="M16 8v18" />
    <path d="M16 16c-2-1-4-3-5-5M16 16c2-1 4-3 5-5" strokeLinecap="round" />
  </svg>
);

const Cedar: ClientMark = ({ size = 28 }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 2l-6 8h3l-5 7h3l-5 8h20l-5-8h3l-5-7h3z" fill="currentColor" fillOpacity=".15" />
    <path d="M16 25v5" />
  </svg>
);

const clients: Client[] = [
  { name: "Lumière Beauty",   region: "Riyadh",   mark: SunBurst       },
  { name: "Cairo Eats",       region: "Cairo",    mark: ForkBranch     },
  { name: "Atelier Maison",   region: "Doha",     mark: HousePeak      },
  { name: "Kuwait Co.",       region: "Kuwait",   mark: DhowSail       },
  { name: "Orient Capital",   region: "London",   mark: CompassRose    },
  { name: "House of Verse",   region: "Istanbul", mark: OpenBook       },
  { name: "Northshore DTC",   region: "NYC",      mark: Waves          },
  { name: "Pacific Goods",    region: "Shanghai", mark: MountainStack  },
  { name: "Andalus Skincare", region: "Jeddah",   mark: PetalLeaf      },
  { name: "Cedar & Stone",    region: "Dubai",    mark: Cedar          },
];

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
          className="flex w-max gap-14 group-hover:[animation-play-state:paused]"
          style={{ animation: "v2-marquee-reverse 50s linear infinite" }}
        >
          {items.map((c, i) => {
            const Mark = c.mark;
            return (
              <div
                key={`${c.name}-${i}`}
                className="flex items-center gap-3 text-white/30 hover:text-gold transition-all duration-500 cursor-default"
              >
                <Mark size={32} />
                <span className="font-mono uppercase text-[0.6875rem] tracking-[0.22em] whitespace-nowrap">
                  {c.name}
                </span>
                <span className="text-gold/40">·</span>
              </div>
            );
          })}
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
