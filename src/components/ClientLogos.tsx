import React from "react";
import { motion, type Variants } from "framer-motion";
import { Star } from "lucide-react";
import { useVisibleClientLogos } from "@/hooks/use-client-logos";
import { cn } from "@/lib/utils";

const ClientLogos = () => {
  const { data: logos = [], isLoading } = useVisibleClientLogos();

  if (isLoading || logos.length === 0) return null;

  const sorted = [...logos].sort((a, b) => Number(b.featured) - Number(a.featured));
  const useMarquee = sorted.length >= 5;
  // Duplicate once for seamless -50% loop
  const marqueeLogos = useMarquee ? [...sorted, ...sorted] : sorted;

  return (
    <section
      id="clients"
      aria-labelledby="clients-heading"
      className="relative py-20 md:py-28 border-y border-gray-200/60 dark:border-gray-800/60 bg-gradient-to-b from-white via-gray-50/60 to-white dark:from-gray-950 dark:via-gray-900/40 dark:to-gray-950 overflow-hidden"
    >
      {/* Soft ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, hsl(var(--primary) / 0.06), transparent 70%)",
        }}
      />

      <div className="relative container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14 md:mb-16"
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.32em" }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="text-[11px] md:text-xs uppercase text-media-purple font-semibold mb-4"
          >
            Trusted by
          </motion.p>

          <h2
            id="clients-heading"
            className="text-[28px] md:text-[44px] leading-[1.1] font-semibold tracking-tight text-gray-900 dark:text-gray-100"
          >
            {"Brands I've worked with".split(" ").map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.7,
                  delay: 0.1 + i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-4 text-base md:text-lg leading-relaxed text-gray-500 dark:text-gray-400 max-w-xl mx-auto"
          >
            A selection of ambitious teams I've partnered with across the MENA region.
          </motion.p>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="mx-auto mt-6 h-px w-16 bg-gradient-to-r from-transparent via-media-purple to-transparent origin-center"
          />
        </motion.div>

        {useMarquee ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative overflow-hidden group/marquee"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            }}
          >
            <div
              role="list"
              aria-label="Client brands"
              className="flex gap-6 md:gap-8 w-max animate-marquee group-hover/marquee:[animation-play-state:paused]"
            >
              {marqueeLogos.map((logo, idx) => (
                <LogoTile key={`${logo.id}-${idx}`} logo={logo} index={idx} animateIn={false} />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            role="list"
            aria-label="Client brands"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
            }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 max-w-5xl mx-auto"
          >
            {sorted.map((logo, i) => (
              <LogoTile key={logo.id} logo={logo} index={i} animateIn />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

interface LogoTileProps {
  logo: { name: string; logo_url: string; website_url: string | null; featured: boolean };
  index: number;
  animateIn: boolean;
}

const tileVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.92 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const LogoTile = ({ logo, animateIn }: LogoTileProps) => {
  const isLink = Boolean(logo.website_url);
  const isFeatured = logo.featured;

  const inner = (
    <div
      className={cn(
        "group relative flex flex-col items-center justify-between h-40 md:h-44 w-full md:min-w-[200px] p-5 rounded-2xl border backdrop-blur-sm overflow-hidden transition-all duration-500 ease-out",
        isFeatured
          ? "border-gold-400/50 dark:border-gold-400/40 bg-gradient-to-b from-gold-50/50 via-white/80 to-white/80 dark:from-gold-900/15 dark:via-gray-900/50 dark:to-gray-900/40 shadow-[0_2px_8px_rgba(212,175,55,0.10)] hover:shadow-[0_10px_30px_-12px_rgba(212,175,55,0.30)] focus-visible:shadow-[0_10px_30px_-12px_rgba(212,175,55,0.30)] hover:border-gold-400/80 focus-visible:border-gold-400/80 hover:-translate-y-1 focus-visible:-translate-y-1"
          : "border-gray-200/70 dark:border-gray-800/70 bg-white/80 dark:bg-gray-900/40 shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_30px_-12px_rgba(124,58,237,0.25)] focus-visible:shadow-[0_10px_30px_-12px_rgba(124,58,237,0.25)] hover:border-media-purple/40 focus-visible:border-media-purple/40 hover:-translate-y-1 focus-visible:-translate-y-1"
      )}
    >
      {/* Shimmer sweep on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1100ms] ease-out bg-gradient-to-r from-transparent via-white/50 dark:via-white/10 to-transparent"
      />

      {/* Featured badge */}
      {isFeatured && (
        <span
          aria-hidden
          className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-gold-400/15 dark:bg-gold-400/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gold-600 dark:text-gold-300"
        >
          <motion.span
            animate={{ scale: [1, 1.15, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Star className="w-3 h-3 fill-gold-400 text-gold-400" />
          </motion.span>
          Featured
        </span>
      )}

      {/* Logo area — fixed height keeps every card aligned */}
      <div className="relative flex-1 w-full flex items-center justify-center">
        <img
          src={logo.logo_url}
          alt=""
          loading="lazy"
          className="max-h-14 md:max-h-16 max-w-[85%] object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 ease-out"
        />
      </div>

      {/* Brand name */}
      <div className={cn(
        "relative w-full pt-3 mt-2 border-t",
        isFeatured
          ? "border-gold-200/60 dark:border-gold-800/40"
          : "border-gray-100 dark:border-gray-800/60"
      )}>
        <p className={cn(
          "text-center text-[13px] md:text-sm tracking-tight truncate",
          isFeatured
            ? "font-semibold text-gray-900 dark:text-gold-100"
            : "font-medium text-gray-700 dark:text-gray-200"
        )}>
          {logo.name}
        </p>
      </div>
    </div>
  );

  if (isLink) {
    return (
      <motion.a
        role="listitem"
        href={logo.website_url!}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${logo.name} website (opens in a new tab)`}
        className="block w-full"
        {...(animateIn
          ? { variants: tileVariants }
          : {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { duration: 0.4 },
            })}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.div
      role="listitem"
      aria-label={logo.name}
      className="block w-full"
      {...(animateIn
        ? { variants: tileVariants }
        : {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { duration: 0.4 },
          })}
    >
      {inner}
    </motion.div>
  );
};

export default ClientLogos;
