import React from "react";
import { motion } from "framer-motion";
import { useVisibleClientLogos } from "@/hooks/use-client-logos";

const ClientLogos = () => {
  const { data: logos = [], isLoading } = useVisibleClientLogos();

  if (isLoading || logos.length === 0) return null;

  const featured = logos.filter((l) => l.featured);
  const rest = logos.filter((l) => !l.featured);

  // Duplicate featured for seamless marquee loop
  const marqueeLogos = featured.length > 0 ? [...featured, ...featured] : [];

  return (
    <section
      id="clients"
      aria-labelledby="clients-heading"
      className="py-16 md:py-20 border-y border-gray-200/60 dark:border-gray-800/60 bg-gradient-to-b from-white via-gray-50/60 to-white dark:from-gray-950 dark:via-gray-900/40 dark:to-gray-950"
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-media-purple font-semibold mb-2">
            Trusted by
          </p>
          <h2
            id="clients-heading"
            className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100"
          >
            Brands I've worked with
          </h2>
        </motion.div>

        {/* Featured marquee strip */}
        {marqueeLogos.length > 0 && (
          <div
            className="relative overflow-hidden mb-12"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            }}
          >
            <div className="flex gap-12 md:gap-16 animate-marquee w-max">
              {marqueeLogos.map((logo, idx) => (
                <LogoItem key={`${logo.id}-${idx}`} logo={logo} size="lg" />
              ))}
            </div>
          </div>
        )}

        {/* Static grid for the rest */}
        {rest.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-10 items-center"
          >
            {rest.map((logo) => (
              <LogoItem key={logo.id} logo={logo} size="md" />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

interface LogoItemProps {
  logo: { name: string; logo_url: string; website_url: string | null };
  size: "md" | "lg";
}

const LogoItem = ({ logo, size }: LogoItemProps) => {
  const heightClass = size === "lg" ? "h-12 md:h-14" : "h-10 md:h-12";

  const content = (
    <img
      src={logo.logo_url}
      alt={`${logo.name} logo`}
      loading="lazy"
      className={`${heightClass} w-auto max-w-[160px] object-contain mx-auto grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300`}
    />
  );

  if (logo.website_url) {
    return (
      <a
        href={logo.website_url}
        target="_blank"
        rel="noopener noreferrer"
        title={logo.name}
        className="flex items-center justify-center flex-shrink-0"
      >
        {content}
      </a>
    );
  }

  return (
    <div title={logo.name} className="flex items-center justify-center flex-shrink-0">
      {content}
    </div>
  );
};

export default ClientLogos;
