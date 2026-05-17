import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Counter, Magnetic, RevealText, Spotlight } from "./_motion";

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative min-h-[100vh] min-h-[100dvh] flex flex-col justify-between overflow-hidden bg-obsidian text-white grain"
      aria-labelledby="hero-heading"
    >
      {/* Animated gradient mesh */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-[-20%] left-[-10%] w-[80rem] h-[80rem] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(212,175,55,0.16), transparent 70%)",
            filter: "blur(60px)",
          }}
          animate={{ x: [0, 60, -40, 0], y: [0, 40, -30, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-30%] right-[-15%] w-[70rem] h-[70rem] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(245,230,200,0.08), transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{ x: [0, -50, 30, 0], y: [0, -30, 20, 0] }}
          transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[40%] left-[55%] w-[35rem] h-[35rem] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(184,148,31,0.18), transparent 70%)",
            filter: "blur(70px)",
          }}
          animate={{ x: [0, 30, -20, 0], y: [0, -40, 30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Cursor-following spotlight */}
      <Spotlight color="rgba(212,175,55,0.22)" size={520} />

      {/* Hairline grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, #000 30%, transparent 100%)",
        }}
      />

      <div className="relative z-10 container mx-auto px-6 lg:px-10 pt-32 md:pt-40 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-between mb-20 md:mb-28"
        >
          <div className="flex items-center gap-4">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
            <span className="eyebrow-lg text-gold/80">
              Senior Media Buyer · Est. 2018
            </span>
          </div>
          <span className="hidden md:inline eyebrow-lg text-white/40">
            Cairo · Working Globally
          </span>
        </motion.div>

        <h1
          id="hero-heading"
          className="font-serif text-display-xl md:text-masthead text-white leading-[0.92]"
        >
          <RevealText as="span" text="Paid media," className="block" />
          <span className="block">
            <RevealText as="span" text="crafted" className="serif-italic text-gold" delay={0.12} />{" "}
            <RevealText as="span" text="for" className="text-white/70" delay={0.32} />
          </span>
          <RevealText as="span" text="ambitious brands." className="block" delay={0.5} />
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-end"
        >
          <p className="md:col-span-6 text-white/70 text-lg md:text-xl leading-relaxed max-w-xl">
            Six years scaling DTC and e-commerce brands across Meta, TikTok,
            Google, LinkedIn, and Snapchat. Eight-figure ad spend managed.
            Receipt-level results.
          </p>

          <div className="md:col-span-6 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10">
            <Magnetic strength={0.2}>
              <button
                onClick={() =>
                  document
                    .getElementById("work")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group inline-flex items-center gap-3 bg-gold text-obsidian px-7 py-4 hover:bg-champagne transition-all duration-500 relative overflow-hidden"
              >
                <span className="relative font-mono uppercase text-[0.6875rem] tracking-[0.22em] font-medium">
                  View Selected Work
                </span>
                <ArrowRight
                  size={16}
                  className="relative transition-transform group-hover:translate-x-1"
                />
              </button>
            </Magnetic>

            <a
              href="/Mohamed_Ali_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-white/70 hover:text-gold transition-colors"
            >
              <span className="font-mono uppercase text-[0.6875rem] tracking-[0.22em] gold-underline">
                Download CV
              </span>
              <span className="transition-transform group-hover:translate-y-0.5">
                ↓
              </span>
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.4 }}
        className="relative z-10 border-t border-white/[0.06] py-8"
      >
        <div className="container mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6">
            <StatCounter value={8.4} suffix="×" label="Peak ROAS" ctx="Beauty DTC · Meta" />
            <StatCounter value={95} suffix="K+" label="Orders generated" ctx="Last 24 mo" />
            <StatCounter value={10} label="Countries served" ctx="MENA · EU · US" />
            <StatCounter value={6} suffix="yr+" label="Senior tenure" ctx="Performance media" />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.7 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-white/40"
      >
        <span className="font-mono uppercase text-[0.5625rem] tracking-[0.3em]">
          Scroll
        </span>
        <motion.span
          className="block h-8 w-px bg-gradient-to-b from-gold/60 to-transparent"
          animate={{ scaleY: [1, 0.4, 1], opacity: [1, 0.4, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
};

const StatCounter = ({
  value,
  suffix = "",
  label,
  ctx,
}: {
  value: number;
  suffix?: string;
  label: string;
  ctx: string;
}) => (
  <div className="flex items-baseline gap-4 group">
    <div className="font-serif text-4xl md:text-5xl text-gold tabular leading-none transition-transform duration-500 group-hover:scale-[1.04]">
      <Counter to={value} suffix={suffix} />
    </div>
    <div>
      <div className="text-sm text-white/80 leading-tight">{label}</div>
      <div className="font-mono uppercase text-[0.625rem] tracking-[0.18em] text-white/40 mt-1">
        {ctx}
      </div>
    </div>
  </div>
);

export default Hero;
