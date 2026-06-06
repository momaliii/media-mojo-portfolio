import React from "react";
import { useVisibleClientLogos, type ClientLogo } from "@/hooks/use-client-logos";

const makeId = (name: string) => {
  const slug = name
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .join("-")
    .toUpperCase();
  return slug ? slug.slice(0, 12) : "CLIENT";
};

const ClientLogosV3 = () => {
  const { data: logos = [], isLoading } = useVisibleClientLogos();
  if (isLoading || logos.length === 0) return null;

  const sorted = [...logos].sort((a, b) => Number(b.featured) - Number(a.featured));

  return (
    <section
      id="clients"
      aria-labelledby="v3-clients-heading"
      className="relative py-20 md:py-24 border-y v3-rule"
    >
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">
        {/* Header */}
        <div className="mb-10 space-y-2">
          <div className="flex items-center gap-3">
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

        {/* Command Center Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {sorted.map((logo, i) => (
            <LogoCard key={logo.id} logo={logo} idx={i} />
          ))}
        </div>

        {/* Status Footer */}
        <div className="mt-8 flex flex-wrap justify-between items-center gap-3 px-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-white/20" />
              <span className="text-[10px] font-mono text-white/30 uppercase">System Active</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-[var(--v3-lime)]" />
              <span className="text-[10px] font-mono text-white/30 uppercase">
                Verified Partners
              </span>
            </div>
          </div>
          <div className="text-[10px] font-mono text-white/10">
            EST. 2024 / PERFORMANCE_COMMAND
          </div>
        </div>
      </div>
    </section>
  );
};

const LogoCard = ({ logo, idx }: { logo: ClientLogo; idx: number }) => {
  const id = `${makeId(logo.name)}-${String(idx + 1).padStart(2, "0")}`;
  const featured = logo.featured;

  const card = (
    <div
      className={[
        "group relative overflow-hidden rounded-xl p-4 transition-all duration-300 h-full",
        featured
          ? "border border-[var(--v3-lime)]/25 bg-[var(--v3-lime)]/[0.04] hover:border-[var(--v3-lime)]/55 hover:bg-[var(--v3-lime)]/[0.08]"
          : "border border-white/5 bg-white/[0.015] hover:border-white/20 hover:bg-white/[0.035]",
      ].join(" ")}
    >
      {featured && (
        <div className="absolute top-0 right-0 p-2 flex items-center gap-1.5">
          <span className="text-[8px] font-bold text-[var(--v3-lime)] tracking-widest uppercase">
            Featured
          </span>
          <div className="h-1.5 w-1.5 rounded-full bg-[var(--v3-lime)] animate-pulse shadow-[0_0_8px_var(--v3-lime)]" />
        </div>
      )}
      <div className="flex flex-col gap-4">
        <div
          className={[
            "aspect-video rounded-lg flex items-center justify-center p-3 transition-colors",
            featured
              ? "bg-white group-hover:bg-white"
              : "bg-white/85 opacity-80 group-hover:opacity-100 group-hover:bg-white",
          ].join(" ")}
        >
          <img
            src={logo.logo_url}
            alt={logo.name}
            loading="lazy"
            className="max-h-full max-w-full object-contain"
          />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[10px] font-mono text-white/25 uppercase tracking-tighter truncate">
            ID: {id}
          </span>
          <span
            className={[
              "font-medium text-sm truncate transition-colors",
              featured
                ? "text-white font-semibold"
                : "text-white/45 group-hover:text-white/75",
            ].join(" ")}
            title={logo.name}
          >
            {logo.name}
          </span>
        </div>
      </div>
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
        {card}
      </a>
    );
  }
  return (
    <div aria-label={logo.name} className="block">
      {card}
    </div>
  );
};

export default ClientLogosV3;
