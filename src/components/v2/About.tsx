import React from "react";
import { motion } from "framer-motion";

const principles = [
  {
    n: "01",
    title: "Spend like it&apos;s yours",
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
  return (
    <section
      id="about"
      className="relative bg-obsidian text-white border-t border-white/[0.06] grain"
      aria-labelledby="about-heading"
    >
      <div className="container mx-auto px-6 lg:px-10 py-28 md:py-40">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-20 md:mb-28">
          <div className="md:col-span-3">
            <p className="eyebrow text-gold mb-4">— 04</p>
            <p className="font-mono uppercase text-[0.6875rem] tracking-[0.22em] text-white/40">
              About / The Operator
            </p>
          </div>
          <h2
            id="about-heading"
            className="md:col-span-9 font-serif text-display-lg text-white leading-[1.02]"
          >
            Performance marketing,{" "}
            <span className="serif-italic text-gold">run like a business</span>{" "}
            — not a dashboard.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
          {/* Portrait + meta */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-5"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-obsidian-900">
              <img
                src="/lovable-uploads/900c6176-4030-4244-a97a-62a4c235d53f.png"
                alt="Mohamed Ali"
                className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-mono uppercase text-[0.625rem] tracking-[0.22em] text-gold/80 mb-2">
                  Mohamed Ali
                </p>
                <p className="font-serif italic text-2xl text-white/90">
                  Cairo — working with clients in 10 countries.
                </p>
              </div>
            </div>

            {/* Quick facts */}
            <dl className="mt-10 grid grid-cols-2 gap-y-6 gap-x-6 pt-8 border-t border-white/[0.08]">
              {[
                { k: "Based", v: "Cairo, EG" },
                { k: "Operating", v: "Globally" },
                { k: "Since", v: "2018" },
                { k: "Languages", v: "EN · AR" },
              ].map((f) => (
                <div key={f.k}>
                  <dt className="font-mono uppercase text-[0.5625rem] tracking-[0.22em] text-white/40 mb-1.5">
                    {f.k}
                  </dt>
                  <dd className="font-serif text-xl text-white">{f.v}</dd>
                </div>
              ))}
            </dl>
          </motion.div>

          {/* Bio + principles */}
          <div className="md:col-span-7 md:pt-4">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
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

            {/* Principles */}
            <div className="mt-20">
              <p className="eyebrow text-gold mb-8">Operating principles</p>
              <div className="space-y-8">
                {principles.map((p, i) => (
                  <motion.div
                    key={p.n}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{
                      duration: 0.8,
                      delay: i * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="group grid grid-cols-12 gap-6 pb-8 border-b border-white/[0.06] last:border-b-0"
                  >
                    <span className="col-span-2 font-serif text-3xl text-gold/70 tabular leading-none">
                      {p.n}
                    </span>
                    <div className="col-span-10">
                      <h4
                        className="font-serif text-xl md:text-2xl text-white mb-3"
                        dangerouslySetInnerHTML={{ __html: p.title }}
                      />
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

export default About;
