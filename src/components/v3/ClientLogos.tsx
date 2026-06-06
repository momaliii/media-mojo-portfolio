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
      className="relative py-20 md:py-28 border-y v3-rule overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 0%, rgba(56,216,255,0.10), transparent 70%), radial-gradient(40% 40% at 50% 100%, rgba(182,255,77,0.06), transparent 70%)",
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10 mb-12 md:mb-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8 bg-[var(--v3-lime)]" />
              <span className="v3-eyebrow v3-lime">Trusted Operators</span>
            </div>
            <h2
              id="v3-clients-heading"
              className="v3-display text-white text-3xl md:text-5xl font-bold tracking-tight leading-[1.05]"
            >
              Brands I've scaled with<span className="v3-cyan">.</span>
            </h2>
          </div>
          <div className="flex items-center gap-6 md:gap-8 shrink-0">
            <Stat value={sorted.length} suffix="+" label="Brands" />
            <div className="h-10 w-px bg-white/10" />
            <Stat value="MENA" label="Region" />
            <div className="h-10 w-px bg-white/10 hidden sm:block" />
            <Stat value="7+" suffix="yrs" label="Experience" className="hidden sm:flex" />
          </div>
        </div>
      </div>

      {/* Marquee row 1 — left */}
      <Marquee logos={loop} direction="left" />
      {/* Marquee row 2 — right (reverse + offset for visual rhythm) */}
      <div className="mt-5 md:mt-6">
        <Marquee logos={[...loop].reverse()} direction="right" />
      </div>
    </section>
  );
};

const Stat = ({
  value,
  suffix,
  label,
  className = "",
}: {
  value: string | number;
  suffix?: string;
  label: string;
  className?: string;
}) => (
  <div className={`flex flex-col ${className}`}>
    <span className="v3-numeral text-2xl md:text-3xl font-bold text-white leading-none">
      {value}
      {suffix && <span className="v3-lime ml-0.5">{suffix}</span>}
    </span>
    <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/40 mt-1.5">
      {label}
    </span>
  </div>
);

const Marquee = ({
  logos,
  direction,
}: {
  logos: ClientLogo[];
  direction: "left" | "right";
}) => (
  <div
    className="relative group/marquee"
    style={{
      maskImage:
        "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
      WebkitMaskImage:
        "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
    }}
  >
    <div
      className="flex gap-4 md:gap-5 w-max animate-marquee group-hover/marquee:[animation-play-state:paused] px-3"
      style={{ animationDirection: direction === "right" ? "reverse" : "normal" }}
    >
      {logos.map((logo, idx) => (
        <LogoTile key={`${logo.id}-${idx}`} logo={logo} />
      ))}
    </div>
  </div>
);

const LogoTile = ({ logo }: { logo: ClientLogo }) => {
  const featured = logo.featured;

  const inner = (
    <div
      className={[
        "group/tile relative shrink-0 w-[140px] h-[140px] md:w-[160px] md:h-[160px] rounded-2xl overflow-hidden transition-all duration-500",
        "border bg-white",
        featured
          ? "border-[var(--v3-lime)]/40 shadow-[0_0_0_1px_rgba(182,255,77,0.15),0_18px_50px_-18px_rgba(182,255,77,0.35)]"
          : "border-white/10 shadow-[0_18px_40px_-22px_rgba(0,0,0,0.7)] hover:border-[var(--v3-cyan)]/40",
        "hover:-translate-y-1",
      ].join(" ")}
    >
      <img
        src={logo.logo_url}
        alt={logo.name}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-contain p-5 transition-transform duration-700 group-hover/tile:scale-105"
      />

      {/* Brand name overlay — slides up on hover */}
      <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover/tile:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/90 via-black/70 to-transparent pt-6 pb-3 px-3">
        <p
          className="text-[11px] md:text-xs font-semibold tracking-tight text-white text-center truncate"
          title={logo.name}
        >
          {logo.name}
        </p>
      </div>

      {/* Featured corner accent */}
      {featured && (
        <span
          aria-hidden
          className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-[var(--v3-lime)] px-2 py-0.5 text-[8px] font-black uppercase tracking-wider text-[#0a0f1c] shadow-md"
        >
          ★ Featured
        </span>
      )}
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
  return <div aria-label={logo.name}>{inner}</div>;
};

export default ClientLogosV3;
