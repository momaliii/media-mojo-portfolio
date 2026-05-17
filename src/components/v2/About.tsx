import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Counter } from "./_motion";

const principles = [
  {
    n: "01",
    title: "Spend like it's yours",
    body: "Every dollar tested against a CAC target before it scales. No vanity metrics, no theatrical dashboards.",
  },
  {
    n: "02",
    title: "Creative on a cadence",
    body: "Weekly creative testing, not quarterly. Hooks rotated before fatigue, winners scaled before the LTV math turns.",
  },
  {
    n: "03",
    title: "Funnel-first, not platform-first",
    body: "Meta, TikTok, Google — these are vehicles. The work is built around the funnel: CTR to LTV, not just impressions to clicks.",
  },
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Subtle parallax for portrait
  const portraitY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const portraitScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-obsidian text-white border-t border-white/[0.06] grain overflow-hidden"
      aria-labelledby="about-heading"
    >
      {/* Ambient mesh */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-[10%] left-[-10%] w-[50rem] h-[50rem] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(212,175,55,0.08), transparent 70%)",
            filter: "blur(90px)",
          }}
          animate={{ x: [0, 30, -20, 0], y: [0, 40, -30, 0] }}
          transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-10 py-28 md:py-40 relative">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-20 md:mb-28">
          <div className="md:col-span-3">
            <p className="eyebrow text-gold mb-4">— 04</p>
            <p className="font-mono uppercase text-[0.6875rem] tracking-[0.22em] text-white/40">
              About / The Operator
            </p>
          </div>
          <motion.h2
            id="about-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-9 font-serif text-display-lg text-white leading-[1.02]"
          >
            Performance marketing,{" "}
            <span className="serif-italic text-gold">run like a business</span>{" "}
            — not a dashboard.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
          {/* Portrait + meta */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-5"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-obsidian-900 ring-1 ring-white/[0.06]">
              {/* Portrait with parallax + scale */}
              <motion.img
                src="/lovable-uploads/900c6176-4030-4244-a97a-62a4c235d53f.png"
                alt="Mohamed Ali"
                style={{ y: portraitY, scale: portraitScale }}
                className="absolute inset-0 w-full h-[110%] object-cover grayscale hover:grayscale-0 transition-all duration-[1500ms] ease-out"
                loading="lazy"
              />
              {/* Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent pointer-events-none" />
              {/* Hairline frame */}
              <div className="absolute inset-3 border border-gold/20 pointer-events-none" />
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none">
                <p className="font-mono uppercase text-[0.625rem] tracking-[0.22em] text-gold/80 mb-2">
                  Mohamed Ali
                </p>
                <p className="font-serif italic text-2xl text-white/90">
                  Cairo — working with clients in 10 countries.
                </p>
              </div>
              {/* Corner marks */}
              <CornerMark className="top-2 left-2" />
              <CornerMark className="top-2 right-2 rotate-90" />
              <CornerMark className="bottom-2 left-2 -rotate-90" />
              <CornerMark className="bottom-2 right-2 rotate-180" />
            </div>

            {/* Quick facts with animated counters where relevant */}
            <dl className="mt-10 grid grid-cols-2 gap-y-6 gap-x-6 pt-8 border-t border-white/[0.08]">
              <Fact k="Based" v="Cairo, EG" />
              <Fact k="Operating" v="Globally" />
              <Fact k="Since" v="2018" />
              <Fact k="Languages" v="EN · AR" />
            </dl>

            {/* Big stats row */}
            <div className="mt-10 pt-8 border-t border-white/[0.08] grid grid-cols-3 gap-4">
              <BigStat to={10} label="Countries" />
              <BigStat to={6} label="Years" suffix="+" />
              <BigStat to={95} label="Orders" suffix="K+" />
            </div>
          </motion.div>

          {/* Bio + principles */}
          <div className="md:col-span-7 md:pt-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6 font-serif text-2xl md:text-3xl text-white/90 leading-[1.3]"
            >
              <p>
                I&apos;m a senior media buyer focused on paid acquisition for
                ambitious DTC, e-commerce, F&amp;B, and B2B brands.
              </p>
              <p className="text-white/60">
                Six years operating across Meta, TikTok, Google, LinkedIn, and
                Snapchat — with eight-figure ad spend managed and a track record
                of taking brands from breakeven to profitable scale.
              </p>
            </motion.div>

            <div className="mt-20">
              <p className="eyebrow text-gold mb-8">Operating principles</p>
              <div className="space-y-8">
                {principles.map((p, i) => (
                  <motion.div
                    key={p.n}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{
                      duration: 0.9,
                      delay: i * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="group grid grid-cols-12 gap-6 pb-8 border-b border-white/[0.06] last:border-b-0 hover:border-gold/40 transition-colors duration-700"
                  >
                    <span className="col-span-2 font-serif text-3xl text-gold/70 tabular leading-none transition-all duration-500 group-hover:text-gold group-hover:translate-x-1">
                      {p.n}
                    </span>
                    <div className="col-span-10">
                      <h4 className="font-serif text-xl md:text-2xl text-white mb-3 transition-colors group-hover:text-gold">
                        {p.title}
                      </h4>
                      <p className="text-white/60 leading-relaxed">{p.body}</p>
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

const Fact = ({ k, v }: { k: string; v: string }) => (
  <div>
    <dt className="font-mono uppercase text-[0.5625rem] tracking-[0.22em] text-white/40 mb-1.5">
      {k}
    </dt>
    <dd className="font-serif text-xl text-white">{v}</dd>
  </div>
);

const BigStat = ({
  to,
  label,
  suffix = "",
}: {
  to: number;
  label: string;
  suffix?: string;
}) => (
  <div>
    <div className="font-serif text-3xl md:text-4xl text-gold tabular leading-none">
      <Counter to={to} suffix={suffix} />
    </div>
    <div className="font-mono uppercase text-[0.5625rem] tracking-[0.22em] text-white/40 mt-2">
      {label}
    </div>
  </div>
);

const CornerMark = ({ className = "" }: { className?: string }) => (
  <span
    aria-hidden
    className={`absolute w-3 h-3 border-t border-l border-gold/40 ${className}`}
  />
);

export default About;
