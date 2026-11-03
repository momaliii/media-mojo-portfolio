import React from "react";
import { motion, type Variants } from "framer-motion";
import { Star } from "lucide-react";
import { useVisibleClientLogos } from "@/hooks/use-client-logos";
import { cn } from "@/lib/utils";

const ClientLogos = () => {
  const { data: logos = [], isLoading } = useVisibleClientLogos();

  if (isLoading || logos.length === 0) return null;

  const sorted = [...logos].sort((a, b) => Number(b.featured) - Number(a.featured));

  // Layout mode: two opposing rows when we have enough, else single marquee, else grid
  const twoRows = sorted.length >= 8;
  const singleMarquee = !twoRows && sorted.length >= 5;
  const splitAt = Math.ceil(sorted.length / 2);
  const rowOne = twoRows ? sorted.slice(0, splitAt) : sorted;
  const rowTwo = twoRows ? sorted.slice(splitAt) : [];

  return (
    <section
      id="clients"
      aria-labelledby="clients-heading"
      className="relative py-16 md:py-24 border-y border-gray-200/60 dark:border-gray-800/60 bg-gradient-to-b from-white via-gray-50/60 to-white dark:from-gray-950 dark:via-gray-900/40 dark:to-gray-950 overflow-hidden"
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
      {/* Fine dot grid for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.15]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, hsl(var(--primary) / 0.14) 1px, transparent 0)",
          backgroundSize: "26px 26px",
          maskImage:
            "radial-gradient(70% 60% at 50% 40%, black, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(70% 60% at 50% 40%, black, transparent 75%)",
        }}
      />

      <div className="relative container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10 md:mb-12"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2 rounded-full border border-media-purple/25 bg-media-purple/5 dark:bg-media-purple/10 px-3.5 py-1.5 text-[11px] md:text-xs font-semibold uppercase tracking-[0.22em] text-media-purple mb-5"
          >
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-media-purple animate-pulse" />
            Trusted by
          </motion.span>

          <h2
            id="clients-heading"
            className="text-[28px] md:text-[44px] leading-[1.08] font-semibold tracking-tight text-gray-900 dark:text-gray-100"
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
            className="mt-3 text-base md:text-lg leading-relaxed text-gray-500 dark:text-gray-400 max-w-xl mx-auto"
          >
            A selection of ambitious teams I've partnered with across the MENA region.
          </motion.p>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="mx-auto mt-5 h-px w-16 bg-gradient-to-r from-transparent via-media-purple to-transparent origin-center"
          />
        </motion.div>

        {twoRows || singleMarquee ? (
          <div className="space-y-4 md:space-y-5">
            {rowOne.length > 0 && (
              <MarqueeRow
                logos={rowOne}
                reverse={false}
                durationClass="animate-marquee-slow"
                groupName="row1"
                delay={0.3}
              />
            )}
            {rowTwo.length > 0 && (
              <MarqueeRow
                logos={rowTwo}
                reverse
                durationClass="animate-marquee-reverse"
                groupName="row2"
                delay={0.45}
              />
            )}
          </div>
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
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5 max-w-5xl mx-auto"
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

interface MarqueeRowProps {
  logos: Array<{ id: string | number; name: string; logo_url: string; website_url: string | null; featured: boolean }>;
  durationClass: string;
  delay: number;
}

const MarqueeRow = ({ logos, durationClass, delay }: MarqueeRowProps) => {
  // Duplicate once for seamless -50% loop
  const items = [...logos, ...logos];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      className="relative overflow-hidden group/marquee"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div
        role="list"
        aria-label="Client brands"
        className={cn(
          "flex gap-4 md:gap-5 w-max group-hover/marquee:[animation-play-state:paused]",
          durationClass
        )}
      >
        {items.map((logo, idx) => (
          <LogoTile key={`${logo.id}-${idx}`} logo={logo} index={idx} animateIn={false} />
        ))}
      </div>
    </motion.div>
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
        "group relative flex flex-col items-center justify-center h-40 md:h-44 shrink-0 px-6 py-5 rounded-2xl border transition-all duration-500 ease-out",
        animateIn ? "w-full" : "w-full md:w-[250px]",
        isFeatured
          ? "border-gold-400/50 dark:border-gold-400/40 bg-gradient-to-b from-gold-50/60 via-white to-white dark:from-gold-900/15 dark:via-gray-900/60 dark:to-gray-900/50 shadow-[0_2px_10px_rgba(212,175,55,0.10)] hover:shadow-[0_14px_34px_-14px_rgba(212,175,55,0.38)] focus-visible:shadow-[0_14px_34px_-14px_rgba(212,175,55,0.38)] hover:border-gold-400/80 focus-visible:border-gold-400/80 hover:-translate-y-1 focus-visible:-translate-y-1"
          : "border-gray-200/80 dark:border-gray-800/70 bg-white dark:bg-gray-900/50 shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-[0_14px_34px_-14px_rgba(124,58,237,0.30)] focus-visible:shadow-[0_14px_34px_-14px_rgba(124,58,237,0.30)] hover:border-media-purple/40 focus-visible:border-media-purple/40 hover:-translate-y-1 focus-visible:-translate-y-1"
      )}
    >
      {/* Shimmer sweep on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1100ms] ease-out bg-gradient-to-r from-transparent via-white/60 dark:via-white/10 to-transparent"
      />

      {/* Featured badge */}
      {isFeatured && (
        <span
          aria-hidden
          className="absolute top-2.5 right-2.5 z-10 inline-flex items-center gap-1 rounded-full bg-gold-400/15 dark:bg-gold-400/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gold-600 dark:text-gold-300"
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

      {/* Logo */}
      <img
        src={logo.logo_url}
        alt=""
        loading="lazy"
        className="max-h-14 md:max-h-16 max-w-[85%] object-contain opacity-90 group-hover:opacity-100 group-hover:scale-[1.06] transition-all duration-500 ease-out"
        style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.06))" }}
      />

      {/* Brand name */}
      <p className={cn(
        "relative w-full text-center mt-4 text-[13px] md:text-sm tracking-tight truncate",
        isFeatured
          ? "font-semibold text-gray-900 dark:text-gold-100"
          : "font-medium text-gray-700 dark:text-gray-200"
      )}>
        {logo.name}
      </p>
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
        className={animateIn ? "block w-full" : "block"}
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
      className={animateIn ? "block w-full" : "block"}
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
