import React from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex flex-col justify-between pt-28 md:pt-36 pb-10 overflow-hidden v3-grain"
      aria-labelledby="v3-hero-h1"
    >
      {/* Top meta strip */}
      <div className="max-w-[1400px] mx-auto w-full px-6 lg:px-10">
        <div className="flex items-center justify-between v3-eyebrow text-[var(--v3-muted)] border-b v3-rule pb-4">
          <span>Issue №07 · MMXXVI</span>
          <span className="hidden sm:inline">Cairo ⟶ Riyadh ⟶ Muscat</span>
          <span>Paid Media · Vol. I</span>
        </div>
      </div>

      {/* Masthead */}
      <div className="max-w-[1400px] mx-auto w-full px-6 lg:px-10 flex-1 flex flex-col justify-center py-12">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="v3-eyebrow text-[var(--v3-accent)] mb-8"
        >
          — Senior Media Buyer & Growth Architect
        </motion.p>

        <h1
          id="v3-hero-h1"
          className="v3-serif tracking-[-0.03em] leading-[0.88] text-[clamp(3.5rem,11vw,11rem)]"
        >
          {["Performance.", "Pixel-perfect.", "Profitable."].map((w, i) => (
            <motion.span
              key={w}
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className={`block ${i === 1 ? "v3-italic v3-accent pl-[8vw]" : ""}`}
            >
              {w}
            </motion.span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-14 md:mt-20 grid grid-cols-12 gap-8 items-end"
        >
          <div className="col-span-12 md:col-span-5 md:col-start-2">
            <p className="text-base md:text-lg leading-[1.7] text-[var(--v3-ink-2)] max-w-md">
              I'm <span className="v3-italic">Mohamed Ali</span> — 7+ years engineering
              paid-media systems for ambitious MENA brands. Eight-figure spend, receipt-level
              ROAS, zero filler.
            </p>
          </div>

          <div className="col-span-12 md:col-span-5 md:col-start-8 flex flex-col gap-4">
            <a
              href="#work"
              className="group inline-flex items-center justify-between gap-6 px-6 py-5 border border-[var(--v3-ink)] hover:bg-[var(--v3-ink)] hover:text-[var(--v3-paper)] transition-colors"
            >
              <span className="v3-eyebrow">View selected work</span>
              <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
            </a>
            <a
              href="#contact"
              className="v3-eyebrow text-[var(--v3-muted)] hover:text-[var(--v3-accent)] transition-colors self-end"
            >
              or commission a strategy →
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom stat ribbon */}
      <div className="max-w-[1400px] mx-auto w-full px-6 lg:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-b v3-rule divide-x divide-[var(--v3-rule)]">
          {[
            { k: "7+", v: "Years senior" },
            { k: "8×", v: "Peak ROAS" },
            { k: "95K", v: "Orders shipped" },
            { k: "10", v: "Countries served" },
          ].map((s) => (
            <div key={s.v} className="py-6 px-4 md:px-8 flex flex-col gap-1">
              <span className="v3-numeral text-4xl md:text-6xl leading-none">{s.k}</span>
              <span className="v3-eyebrow text-[var(--v3-muted)]">{s.v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
