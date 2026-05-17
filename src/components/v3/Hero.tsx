import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Cpu, Activity } from "lucide-react";
import { Counter, Glitch, HoloSpotlight, Magnetic, Reveal, WindowFrame } from "./_primitives";

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative min-h-[100vh] min-h-[100dvh] flex flex-col justify-between overflow-hidden text-chrome-50 scanlines crt-vignette"
      style={{ backgroundColor: "var(--v3-bg)" }}
      aria-labelledby="hero-heading"
    >
      {/* Grid floor */}
      <div className="absolute inset-0 v3-grid pointer-events-none" />

      {/* Holographic spotlight */}
      <HoloSpotlight size={620} />

      {/* Drifting cyan + magenta orbs */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-[5%] left-[-10%] w-[55rem] h-[55rem] rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(34,211,238,0.20), transparent 70%)", filter: "blur(80px)" }}
          animate={{ x: [0, 80, -40, 0], y: [0, 30, -20, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-10%] right-[-15%] w-[60rem] h-[60rem] rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(236,72,153,0.18), transparent 70%)", filter: "blur(100px)" }}
          animate={{ x: [0, -60, 40, 0], y: [0, -40, 20, 0] }}
          transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Scan beam */}
      <div className="scan-beam" />

      {/* Top status bar */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10 border-b border-chrome-700/30 backdrop-blur-sm"
        style={{ backgroundColor: "rgba(6, 9, 32, 0.6)" }}
      >
        <div className="container mx-auto px-6 lg:px-10 py-2.5 flex items-center justify-between text-[0.6875rem] y2k-mono">
          <div className="flex items-center gap-6 text-chrome-200">
            <span className="flex items-center gap-2">
              <Activity size={11} className="text-holo-cyan animate-pulse" />
              SYSTEM ONLINE
            </span>
            <span className="hidden sm:inline">SES_ID://MA-2026-{Math.floor(Math.random() * 9000 + 1000)}</span>
          </div>
          <div className="flex items-center gap-6 text-chrome-300">
            <span className="hidden sm:inline">v3.0 // RETRO-FUTURE</span>
            <span className="text-holo-cyan">{new Date().toUTCString().slice(17, 22)} UTC</span>
          </div>
        </div>
      </motion.div>

      {/* Main hero */}
      <div className="relative z-10 container mx-auto px-6 lg:px-10 py-12 md:py-20 flex-1 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center gap-3 mb-8 y2k-mono text-xs text-chrome-300"
        >
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-holo-cyan animate-pulse" />
          <span>&gt; init mohamed_ali</span>
          <span className="text-holo-cyan">[OK]</span>
          <span className="text-chrome-500">·</span>
          <span>senior_media_buyer.exe</span>
          <span className="text-holo-cyan">[RUNNING]</span>
        </motion.div>

        {/* Big H1 — chunky condensed Anybody, layered with chrome + holo */}
        <h1 id="hero-heading" className="y2k-display text-[clamp(3.5rem,11vw,11rem)] leading-[0.82]">
          <Reveal as="span" text="PAID" className="block chrome-text" />
          <span className="block">
            <Reveal as="span" text="MEDIA" className="chrome-text" delay={0.1} />{" "}
            <Reveal as="span" text="/" className="text-holo-magenta" delay={0.2} />{" "}
            <Reveal as="span" text="DECODED." className="holo-text" delay={0.3} />
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end"
        >
          {/* Sub-statement */}
          <div className="lg:col-span-7 max-w-2xl">
            <p className="text-lg md:text-xl text-chrome-200 leading-relaxed">
              Six years scaling DTC + e-comm brands across Meta, TikTok, Google,
              LinkedIn, and Snapchat.{" "}
              <span className="text-holo-cyan">8.4× peak ROAS.</span>{" "}
              <span className="text-holo-magenta">95K+ orders.</span>{" "}
              Eight-figure spend.
            </p>
            <p className="mt-3 y2k-mono text-xs text-chrome-400">
              // operating from Cairo // working across 10 countries
            </p>
          </div>

          {/* CTA cluster */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row items-start gap-4">
            <Magnetic strength={0.2}>
              <button
                onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
                className="group inline-flex items-center gap-3 bg-holo-cyan text-midnight px-7 py-4 hover:bg-chrome-50 transition-all duration-300 relative overflow-hidden"
              >
                <Zap size={14} fill="currentColor" />
                <span className="y2k-mono text-xs uppercase tracking-[0.18em] font-bold">
                  Initiate &gt; selected_work
                </span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </button>
            </Magnetic>

            <a
              href="/Mohamed_Ali_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 border border-chrome-400/40 hover:border-holo-cyan text-chrome-200 hover:text-holo-cyan px-6 py-4 transition-colors"
            >
              <Cpu size={14} />
              <span className="y2k-mono text-xs uppercase tracking-[0.18em]">
                Download cv.pdf
              </span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom stat panel as fake terminal window */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 container mx-auto px-6 lg:px-10 pb-10"
      >
        <WindowFrame title="metrics.dat — live readings">
          <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <StatBlock value={8.4} suffix="×" label="PEAK_ROAS" sub="beauty_dtc.meta" color="cyan" />
            <StatBlock value={95} suffix="K+" label="ORDERS_GEN" sub="last_24mo" color="magenta" />
            <StatBlock value={10} label="COUNTRIES" sub="mena.eu.us" color="cyan" />
            <StatBlock value={6} suffix="yr+" label="SR_TENURE" sub="perf_media" color="magenta" />
          </div>
        </WindowFrame>
      </motion.div>
    </section>
  );
};

const StatBlock = ({
  value, suffix = "", label, sub, color,
}: {
  value: number; suffix?: string; label: string; sub: string; color: "cyan" | "magenta";
}) => (
  <div className="border-l border-chrome-700/40 pl-4 group">
    <div
      className={`y2k-display text-4xl md:text-5xl leading-none transition-transform group-hover:scale-[1.04] ${
        color === "cyan" ? "text-holo-cyan" : "text-holo-magenta"
      }`}
      style={{ fontVariationSettings: "'wdth' 85" }}
    >
      <Counter to={value} suffix={suffix} />
    </div>
    <div className="mt-2 y2k-mono text-[0.6875rem] text-chrome-100">
      {label}
    </div>
    <div className="y2k-mono text-[0.625rem] text-chrome-500 mt-0.5">
      &gt; {sub}
    </div>
  </div>
);

export default Hero;
