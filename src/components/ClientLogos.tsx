import React from "react";
import { motion } from "framer-motion";
import { useVisibleClientLogos } from "@/hooks/use-client-logos";

const ClientLogos = () => {
  const { data: logos = [], isLoading } = useVisibleClientLogos();

  if (isLoading || logos.length === 0) return null;

  // Featured first, then the rest — all shown in one cohesive row/marquee
  const sorted = [...logos].sort((a, b) => Number(b.featured) - Number(a.featured));
  const useMarquee = sorted.length >= 5;
  const marqueeLogos = useMarquee ? [...sorted, ...sorted] : sorted;

  return (
    <section
      id="clients"
      aria-labelledby="clients-heading"
      className="py-20 md:py-24 border-y border-gray-200/60 dark:border-gray-800/60 bg-gradient-to-b from-white via-gray-50/60 to-white dark:from-gray-950 dark:via-gray-900/40 dark:to-gray-950"
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-media-purple font-semibold mb-3">
            Trusted by
          </p>
          <h2
            id="clients-heading"
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100"
          >
            Brands I've worked with
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-media-purple to-media-oceanblue" />
        </motion.div>

        {useMarquee ? (
          <div
            className="relative overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            }}
          >
            <div className="flex gap-6 md:gap-8 animate-marquee w-max">
              {marqueeLogos.map((logo, idx) => (
                <LogoTile key={`${logo.id}-${idx}`} logo={logo} />
              ))}
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-4 md:gap-6"
          >
            {sorted.map((logo) => (
              <LogoTile key={logo.id} logo={logo} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

interface LogoTileProps {
  logo: { name: string; logo_url: string; website_url: string | null };
}

const LogoTile = ({ logo }: LogoTileProps) => {
  const inner = (
    <div className="group flex items-center justify-center h-24 w-44 md:h-28 md:w-52 rounded-2xl border border-gray-200/70 dark:border-gray-800/70 bg-white dark:bg-gray-900/40 shadow-sm hover:shadow-md hover:border-media-purple/40 transition-all duration-300">
      <img
        src={logo.logo_url}
        alt={`${logo.name} logo`}
        loading="lazy"
        className="max-h-14 md:max-h-16 max-w-[80%] object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
      />
    </div>
  );

  if (logo.website_url) {
    return (
      <a
        href={logo.website_url}
        target="_blank"
        rel="noopener noreferrer"
        title={logo.name}
        className="flex-shrink-0"
      >
        {inner}
      </a>
    );
  }

  return (
    <div title={logo.name} className="flex-shrink-0">
      {inner}
    </div>
  );
};

export default ClientLogos;
