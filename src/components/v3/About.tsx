import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Counter, WindowFrame } from "./_primitives";

const principles = [
  { n: "01", t: "SPEND_LIKE_YOURS",       b: "Every dollar tested against a CAC target before it scales. No vanity metrics, no theatrical dashboards." },
  { n: "02", t: "CREATIVE_CADENCE",       b: "Weekly creative testing. Hooks rotated before fatigue, winners scaled before LTV math turns." },
  { n: "03", t: "FUNNEL_FIRST",           b: "Meta, TikTok, Google are vehicles. The work is built around the funnel: CTR -> LTV." },
];

const About = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const portraitY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <section ref={ref} id="about" className="relative border-t border-chrome-700/30 scanlines" style={{ backgroundColor: "var(--v3-bg-2)" }}>
      <div className="relative container mx-auto px-6 lg:px-10 py-24 md:py-32">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 md:mb-20">
          <div className="md:col-span-3">
            <p className="y2k-mono text-[0.6875rem] uppercase tracking-[0.18em] text-holo-magenta mb-3">// 04_THE_OPERATOR</p>
          </div>
          <h2 className="md:col-span-9 y2k-display text-[clamp(2rem,5vw,4.5rem)] leading-[0.95] text-chrome-50">
            <span className="block">PERFORMANCE_MARKETING:</span>
            <span className="block holo-text">RUN LIKE A BUSINESS.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14">
          {/* Portrait window */}
          <div className="md:col-span-5">
            <WindowFrame title="operator.jpg — preview">
              <div className="relative aspect-[4/5] overflow-hidden bg-midnight">
                <motion.img
                  src="/lovable-uploads/900c6176-4030-4244-a97a-62a4c235d53f.png"
                  alt="Mohamed Ali"
                  style={{ y: portraitY, filter: "saturate(1.3)" }}
                  className="absolute inset-0 w-full h-[110%] object-cover"
                />
                {/* CRT scanline overlay */}
                <div className="absolute inset-0 pointer-events-none" style={{
                  backgroundImage: "repeating-linear-gradient(to bottom, transparent 0, transparent 2px, rgba(0,0,0,0.25) 2px, rgba(0,0,0,0.25) 3px)",
                }} />
                {/* Holo border */}
                <div className="absolute inset-3 border border-holo-cyan/30 pointer-events-none" />
                {/* Bottom caption */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-midnight via-midnight/70 to-transparent pointer-events-none">
                  <p className="y2k-mono text-[0.625rem] uppercase tracking-[0.18em] text-holo-cyan mb-1">/file_id: MA_2026</p>
                  <p className="text-chrome-100 font-bold y2k-display text-xl" style={{ fontVariationSettings: "'wdth' 85" }}>MOHAMED ALI</p>
                </div>
              </div>
            </WindowFrame>

            {/* Stat grid */}
            <div className="mt-8 grid grid-cols-3 gap-3">
              <BigStat to={10} label="COUNTRIES" />
              <BigStat to={6} suffix="+" label="YEARS" />
              <BigStat to={95} suffix="K+" label="ORDERS" />
            </div>
          </div>

          {/* Bio + principles */}
          <div className="md:col-span-7">
            <div className="space-y-5 text-chrome-100 text-xl md:text-2xl leading-[1.35]">
              <p>I&apos;m a senior media buyer focused on paid acquisition for ambitious DTC, e-commerce, F&amp;B, and B2B brands.</p>
              <p className="text-chrome-300">Six years operating across Meta, TikTok, Google, LinkedIn, and Snapchat — eight-figure ad spend managed, with a track record of taking brands from breakeven to profitable scale.</p>
            </div>

            <div className="mt-14">
              <p className="y2k-mono text-[0.6875rem] uppercase tracking-[0.18em] text-holo-cyan mb-6">// OPERATING_PRINCIPLES</p>
              <div className="space-y-4">
                {principles.map((p, i) => (
                  <motion.div
                    key={p.n}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="group grid grid-cols-12 gap-4 p-5 border border-chrome-700/40 hover:border-holo-cyan/60 transition-colors duration-500"
                  >
                    <span className="col-span-2 y2k-display text-2xl text-holo-cyan group-hover:text-holo-magenta transition-colors">{p.n}</span>
                    <div className="col-span-10">
                      <p className="y2k-mono text-xs uppercase tracking-[0.18em] text-chrome-100 mb-2">{p.t}</p>
                      <p className="text-chrome-400 text-sm leading-relaxed">{p.b}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const BigStat = ({ to, suffix = "", label }: { to: number; suffix?: string; label: string }) => (
  <div className="border border-chrome-700/40 p-3 bg-midnight-950">
    <div className="y2k-display text-2xl md:text-3xl text-holo-cyan tabular leading-none" style={{ fontVariationSettings: "'wdth' 85" }}>
      <Counter to={to} suffix={suffix} />
    </div>
    <div className="y2k-mono text-[0.5625rem] uppercase tracking-[0.18em] text-chrome-500 mt-2">{label}</div>
  </div>
);

export default About;
