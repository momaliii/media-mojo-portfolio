import React from "react";

type Mark = (props: { size?: number }) => JSX.Element;

const SunBurst: Mark = ({ size = 26 }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.4">
    <circle cx="16" cy="16" r="6" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((d) => (<line key={d} x1="16" y1="16" x2={16 + 13 * Math.cos(d * Math.PI / 180)} y2={16 + 13 * Math.sin(d * Math.PI / 180)} strokeLinecap="round" />))}
  </svg>
);
const ForkBranch: Mark = ({ size = 26 }) => (<svg viewBox="0 0 32 32" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4v24" /><path d="M10 8v6a6 6 0 006 6" /><path d="M22 8v6a6 6 0 01-6 6" /><circle cx="16" cy="4" r="1.5" fill="currentColor" /></svg>);
const HousePeak: Mark = ({ size = 26 }) => (<svg viewBox="0 0 32 32" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"><path d="M4 18l12-12 12 12" /><path d="M8 18v8h16v-8" /><path d="M14 26v-6h4v6" /></svg>);
const DhowSail: Mark = ({ size = 26 }) => (<svg viewBox="0 0 32 32" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4v18" /><path d="M16 6c6 4 8 10 8 16H10c0-4 1-9 6-16z" fill="currentColor" fillOpacity=".15" /><path d="M4 26c2 1.5 4 2 6 2s4-.5 6-2 4-2 6-2 4 .5 6 2" /></svg>);
const CompassRose: Mark = ({ size = 26 }) => (<svg viewBox="0 0 32 32" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"><circle cx="16" cy="16" r="12" /><path d="M16 4l3 12-3 12-3-12z" fill="currentColor" fillOpacity=".2" /><path d="M4 16l12-3 12 3-12 3z" /></svg>);
const OpenBook: Mark = ({ size = 26 }) => (<svg viewBox="0 0 32 32" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"><path d="M4 8c4 0 8 1 12 4 4-3 8-4 12-4v18c-4 0-8 1-12 4-4-3-8-4-12-4z" /><path d="M16 12v18" /></svg>);
const Waves: Mark = ({ size = 26 }) => (<svg viewBox="0 0 32 32" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M3 11c3 0 3-3 6.5-3S13 11 16 11s3-3 6.5-3 3.5 3 6.5 3" /><path d="M3 18c3 0 3-3 6.5-3S13 18 16 18s3-3 6.5-3 3.5 3 6.5 3" /><path d="M3 25c3 0 3-3 6.5-3S13 25 16 25s3-3 6.5-3 3.5 3 6.5 3" /></svg>);
const MountainStack: Mark = ({ size = 26 }) => (<svg viewBox="0 0 32 32" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"><path d="M2 26l9-14 6 9 4-5 9 10z" /><circle cx="22" cy="9" r="2" fill="currentColor" /></svg>);
const PetalLeaf: Mark = ({ size = 26 }) => (<svg viewBox="0 0 32 32" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"><path d="M16 4c6 4 10 10 10 16 0 4-3 8-10 8s-10-4-10-8c0-6 4-12 10-16z" /><path d="M16 8v18" /></svg>);
const Cedar: Mark = ({ size = 26 }) => (<svg viewBox="0 0 32 32" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 2l-6 8h3l-5 7h3l-5 8h20l-5-8h3l-5-7h3z" fill="currentColor" fillOpacity=".15" /><path d="M16 25v5" /></svg>);

const clients = [
  { name: "LUMIÈRE_BEAUTY", region: "RIYADH",   mark: SunBurst },
  { name: "CAIRO_EATS",     region: "CAIRO",    mark: ForkBranch },
  { name: "ATELIER_MAISON", region: "DOHA",     mark: HousePeak },
  { name: "KUWAIT_CO",      region: "KUWAIT",   mark: DhowSail },
  { name: "ORIENT_CAPITAL", region: "LONDON",   mark: CompassRose },
  { name: "HOUSE_OF_VERSE", region: "ISTANBUL", mark: OpenBook },
  { name: "NORTHSHORE_DTC", region: "NYC",      mark: Waves },
  { name: "PACIFIC_GOODS",  region: "SHANGHAI", mark: MountainStack },
  { name: "ANDALUS_SKIN",   region: "JEDDAH",   mark: PetalLeaf },
  { name: "CEDAR_STONE",    region: "DUBAI",    mark: Cedar },
];

const ClientLogos = () => {
  const list = [...clients, ...clients, ...clients];
  return (
    <section className="relative border-b border-chrome-700/30 scanlines" style={{ backgroundColor: "var(--v3-bg-2)" }}>
      <div className="container mx-auto px-6 lg:px-10 pt-10 pb-3">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <span className="block h-px w-10 bg-holo-magenta/60" />
            <p className="y2k-mono text-[0.6875rem] uppercase tracking-[0.18em] text-holo-magenta">
              // SELECTED_CLIENTS
            </p>
          </div>
          <p className="y2k-mono text-[0.625rem] uppercase tracking-[0.18em] text-chrome-500 hidden sm:block">
            [ NAMES_ANONYMISED // REFS_ON_REQUEST ]
          </p>
        </div>
      </div>

      <div className="marquee-mask py-4 group">
        <div className="flex w-max gap-12 animate-v3-marquee-reverse group-hover:[animation-play-state:paused]">
          {list.map((c, i) => {
            const Mark = c.mark;
            return (
              <div key={`${c.name}-${i}`} className="flex items-center gap-3 text-chrome-500 hover:text-holo-magenta transition-colors duration-500">
                <Mark size={28} />
                <span className="y2k-mono text-xs uppercase tracking-[0.18em] whitespace-nowrap">{c.name}</span>
                <span className="text-chrome-700">·</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-10 pt-3 pb-10">
        <p className="text-center y2k-mono text-[0.625rem] uppercase tracking-[0.18em] text-chrome-600">
          DTC · F&amp;B · NGO · B2B // 10 COUNTRIES
        </p>
      </div>
    </section>
  );
};

export default ClientLogos;
