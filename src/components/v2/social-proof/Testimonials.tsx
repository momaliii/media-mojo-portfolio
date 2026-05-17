import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "Mohamed turned a stagnant Meta account into our most reliable channel. Within two quarters we were running profitably at 5×+ ROAS and scaling spend monthly.",
    role: "Marketing Director",
    company: "Beauty DTC brand",
    region: "Riyadh, KSA",
  },
  {
    quote:
      "He treats the ad budget like it's his own. Tight CAC targets, real creative cadence, and weekly reporting an exec can actually read.",
    role: "Founder",
    company: "F&B e-commerce",
    region: "Cairo / Kuwait City",
  },
  {
    quote:
      "Rare to find a media buyer who's equally strong on Meta and TikTok and who understands the funnel from CTR to LTV. He delivered.",
    role: "Head of Growth",
    company: "Apparel DTC",
    region: "London, UK",
  },
];

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="relative bg-obsidian text-white grain border-t border-white/[0.06]"
      aria-labelledby="testimonials-heading"
    >
      <div className="container mx-auto px-6 lg:px-10 py-28 md:py-40">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-20 md:mb-28">
          <div className="md:col-span-3">
            <p className="eyebrow text-gold mb-4">— 03</p>
            <p className="font-mono uppercase text-[0.6875rem] tracking-[0.22em] text-white/40">
              Voices / Receipts
            </p>
          </div>
          <h2
            id="testimonials-heading"
            className="md:col-span-9 font-serif text-display-lg text-white leading-[1.02]"
          >
            Trusted with{" "}
            <span className="serif-italic text-gold">seven-figure</span>{" "}
            budgets — and with the brands behind them.
          </h2>
        </div>

        {/* Quotes */}
        <div className="space-y-20 md:space-y-32">
          {testimonials.map((t, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start"
            >
              <div className="md:col-span-2 flex md:flex-col items-baseline md:items-start gap-3">
                <span className="font-mono uppercase text-[0.625rem] tracking-[0.22em] text-gold tabular">
                  No. {String(i + 1).padStart(2, "0")}
                </span>
                <span aria-hidden className="font-serif text-7xl text-gold/30 leading-none -mt-2">
                  &ldquo;
                </span>
              </div>
              <div className="md:col-span-10">
                <blockquote className="font-serif text-3xl md:text-4xl text-white/95 leading-[1.18] max-w-4xl">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-10 pt-6 border-t border-white/[0.08] flex flex-wrap items-baseline gap-x-6 gap-y-2">
                  <span className="font-mono uppercase text-[0.75rem] tracking-[0.22em] text-white/80">
                    {t.role}
                  </span>
                  <span className="font-serif italic text-base text-white/60">
                    {t.company}
                  </span>
                  <span className="font-mono uppercase text-[0.625rem] tracking-[0.22em] text-white/40">
                    {t.region}
                  </span>
                </figcaption>
              </div>
            </motion.figure>
          ))}
        </div>

        <p className="mt-24 max-w-2xl text-sm text-white/40 leading-relaxed">
          Client names withheld under NDA. References and full case studies
          available on request.
        </p>
      </div>
    </section>
  );
};

export default Testimonials;
