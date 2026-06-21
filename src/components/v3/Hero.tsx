import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, CheckCircle2, Play, TrendingUp } from "lucide-react";

const Hero = () => {
  const bars = [72, 88, 64, 96, 79, 91, 68];

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] overflow-hidden pt-28 md:pt-32 pb-12"
      aria-labelledby="v3-hero-h1"
    >
      <div className="absolute inset-0 v3-grid-bg" aria-hidden="true" />
      <div className="absolute -top-48 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[var(--v3-cyan)]/20 blur-[120px]" aria-hidden="true" />
      <div className="absolute top-1/3 -right-32 h-[32rem] w-[32rem] rounded-full bg-[var(--v3-lime)]/10 blur-[140px]" aria-hidden="true" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">
        <div className="grid lg:grid-cols-[1.02fr_.98fr] gap-10 xl:gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-3 v3-pill rounded-full px-4 py-2 mb-7"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--v3-lime)] opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--v3-lime)]" />
              </span>
              <span className="v3-eyebrow v3-soft">Available for 2 growth partners</span>
            </motion.div>

            <motion.h1
              id="v3-hero-h1"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="v3-display text-[clamp(3.1rem,7vw,7.7rem)] font-bold leading-[0.94] tracking-[-0.055em]"
            >
              I don't pitch numbers. I <span className="v3-glow-text">screenshot</span> them.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12 }}
              className="mt-5 max-w-2xl text-lg md:text-xl leading-[1.65] v3-soft"
            >
              No pitch decks. No vanity metrics. Just real dashboards, real ROAS, and screenshots that do the talking.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.18 }}
              className="mt-7 max-w-2xl text-lg md:text-xl leading-[1.7] v3-soft"
            >
              I’m Mohamed Ali — a 7+ year senior media buyer scaling Meta, TikTok,
              Google, LinkedIn and Snapchat campaigns for MENA brands that need profitable growth.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.28 }}
              className="mt-8 flex flex-col sm:flex-row gap-3"
            >
              <a
                href="#work"
                className="v3-cta group inline-flex items-center justify-center gap-3 rounded-2xl bg-[var(--v3-lime)] px-6 py-4 font-bold text-[var(--v3-bg)] hover:shadow-[0_10px_42px_rgba(182,255,77,.4)]"
              >
                See performance proof
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/Mohamed_Ali_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="v3-cta inline-flex items-center justify-center gap-3 rounded-2xl v3-shell px-6 py-4 font-bold text-[var(--v3-text)] hover:border-[var(--v3-cyan)]/40"
              >
                Download CV
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.42 }}
              className="mt-10 grid grid-cols-3 gap-3 max-w-2xl"
            >
              {[
                ["7+", "Years"],
                ["150K+", "Orders"],
                ["8×", "ROAS"],
              ].map(([value, label]) => (
                <div key={label} className="v3-shell rounded-2xl p-4">
                  <div className="v3-numeral text-3xl md:text-4xl font-bold leading-none">{value}</div>
                  <div className="v3-eyebrow v3-muted mt-2">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 22 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-[var(--v3-lime)]/18 via-[var(--v3-cyan)]/12 to-transparent blur-2xl" />
            <div className="relative v3-shell rounded-[2rem] p-4 md:p-5 overflow-hidden">
              <div className="flex items-center justify-between border-b v3-rule pb-4 mb-5">
                <div className="flex items-center gap-3">
                  <img
                    src="/lovable-uploads/900c6176-4030-4244-a97a-62a4c235d53f.png"
                    alt="Mohamed Ali"
                    width={48}
                    height={48}
                    decoding="async"
                    fetchPriority="high"
                    className="h-12 w-12 rounded-2xl object-cover border border-white/15"
                  />
                  <div>
                    <div className="font-bold">Mohamed Ali</div>
                    <div className="text-sm v3-muted">Senior Media Buyer</div>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-2 rounded-full bg-[var(--v3-lime)]/12 px-3 py-1.5 text-[var(--v3-lime)]">
                  <TrendingUp size={15} />
                  <span className="text-sm font-bold">Live growth</span>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-7 rounded-3xl bg-[var(--v3-bg-2)] border v3-rule p-5">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="v3-eyebrow v3-muted">Blended ROAS</p>
                      <p className="v3-numeral text-5xl font-bold mt-2">8.4×</p>
                    </div>
                    <BarChart3 className="text-[var(--v3-cyan)]" size={34} />
                  </div>
                  <div className="flex items-end gap-2 h-36">
                    {bars.map((h, i) => (
                      <span
                        key={i}
                        className="flex-1 rounded-t-xl bg-gradient-to-t from-[var(--v3-cyan)] to-[var(--v3-lime)] opacity-90"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>

                <div className="col-span-12 md:col-span-5 grid gap-4">
                  <div className="rounded-3xl bg-[var(--v3-panel-2)] border v3-rule p-5">
                    <p className="v3-eyebrow v3-muted">Spend managed</p>
                    <p className="v3-numeral text-4xl font-bold mt-2">8 fig.</p>
                    <p className="text-sm v3-soft mt-3">Meta · TikTok · Snapchat · Google</p>
                  </div>
                  <div className="rounded-3xl bg-[var(--v3-panel-2)] border v3-rule p-5">
                    <div className="flex items-center gap-2 text-[var(--v3-lime)] font-bold">
                      <CheckCircle2 size={18} /> Verified systems
                    </div>
                    <p className="text-sm text-white mt-3">CAPI, GTM, funnels, creative tests, reporting.</p>
                  </div>
                </div>

                <div className="col-span-12 rounded-3xl bg-[var(--v3-panel-2)] border v3-rule p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[var(--v3-orange)] text-white">
                      <Play size={18} fill="currentColor" />
                    </span>
                    <div>
                      <div className="font-bold">90-day scale sprint</div>
                      <div className="text-sm v3-muted">Audit → rebuild → test → scale</div>
                    </div>
                  </div>
                  <span className="v3-eyebrow v3-lime">+24% MER</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
