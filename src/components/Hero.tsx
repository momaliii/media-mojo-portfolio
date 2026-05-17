import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative min-h-[100vh] min-h-[100dvh] flex flex-col justify-between overflow-hidden bg-obsidian text-white grain"
      aria-labelledby="hero-heading"
    >
      {/* Ambient gold glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[60rem] h-[60rem] bg-gold/[0.06] rounded-full filter blur-[120px] -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[40rem] h-[40rem] bg-gold/[0.04] rounded-full filter blur-[100px] translate-y-1/2" />
      </div>

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
        {/* Eyebrow row */}
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

        {/* Display H1 */}
        <motion.h1
          id="hero-heading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.15 }}
          className="font-serif text-display-xl md:text-masthead text-white leading-[0.92]"
        >
          <motion.span
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="block"
          >
            Paid media,
          </motion.span>
          <motion.span
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="block"
          >
            <span className="serif-italic text-gold">crafted</span>{" "}
            <span className="text-white/70">for</span>
          </motion.span>
          <motion.span
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="block"
          >
            ambitious brands.
          </motion.span>
        </motion.h1>

        {/* Sub-row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-end"
        >
          <p className="md:col-span-6 text-white/70 text-lg md:text-xl leading-relaxed max-w-xl">
            Six years scaling DTC and e-commerce brands across Meta, TikTok,
            Google, LinkedIn, and Snapchat. Eight-figure ad spend managed.
            Receipt-level results.
          </p>

          <div className="md:col-span-6 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10">
            <button
              onClick={() =>
                document
                  .getElementById("work")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="group inline-flex items-center gap-3 bg-gold text-obsidian px-7 py-4 hover:bg-champagne transition-all duration-500"
            >
              <span className="font-mono uppercase text-[0.6875rem] tracking-[0.22em] font-medium">
                View Selected Work
              </span>
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>

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

      {/* Marquee strip — selected numbers */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.3 }}
        className="relative z-10 border-t border-white/[0.06] py-8"
      >
        <div className="container mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6">
            {[
              { value: "8.4×", label: "Peak ROAS", ctx: "Beauty DTC · Meta" },
              { value: "95K+", label: "Orders generated", ctx: "Last 24 mo" },
              { value: "10", label: "Countries served", ctx: "MENA · EU · US" },
              { value: "6yr+", label: "Senior tenure", ctx: "Performance media" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-baseline gap-4">
                <div className="font-serif text-4xl md:text-5xl text-gold tabular leading-none">
                  {stat.value}
                </div>
                <div>
                  <div className="text-sm text-white/80 leading-tight">
                    {stat.label}
                  </div>
                  <div className="font-mono uppercase text-[0.625rem] tracking-[0.18em] text-white/40 mt-1">
                    {stat.ctx}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-white/40"
      >
        <span className="font-mono uppercase text-[0.5625rem] tracking-[0.3em]">
          Scroll
        </span>
        <span className="block h-8 w-px bg-gradient-to-b from-gold/60 to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
