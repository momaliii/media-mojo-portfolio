import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Mohamed turned a stagnant Meta account into our most reliable channel. Within two quarters we were running profitably at 5×+ ROAS and scaling spend monthly.",
    role: "Marketing Director",
    company: "Beauty DTC brand",
    region: "Riyadh, KSA",
    accent: "from-gold/20 to-transparent",
  },
  {
    quote:
      "He treats the ad budget like it's his own. Tight CAC targets, real creative cadence, and weekly reporting an exec can actually read.",
    role: "Founder",
    company: "F&B e-commerce",
    region: "Cairo / Kuwait City",
    accent: "from-emerald-500/10 to-transparent",
  },
  {
    quote:
      "Rare to find a media buyer who's equally strong on Meta and TikTok and who understands the funnel from CTR to LTV. He delivered.",
    role: "Head of Growth",
    company: "Apparel DTC",
    region: "London, UK",
    accent: "from-rose-500/10 to-transparent",
  },
];

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="relative bg-obsidian text-white grain border-t border-white/[0.06] overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      {/* Ambient mesh — emerald tint for variation */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-[20%] right-[-15%] w-[55rem] h-[55rem] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(16,185,129,0.05), transparent 70%)",
            filter: "blur(90px)",
          }}
          animate={{ x: [0, -40, 20, 0], y: [0, 30, -20, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[5%] left-[-10%] w-[45rem] h-[45rem] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(212,175,55,0.08), transparent 70%)",
            filter: "blur(70px)",
          }}
          animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-10 py-28 md:py-40 relative">
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
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start group"
            >
              <div className="md:col-span-2 flex md:flex-col items-baseline md:items-start gap-3">
                <span className="font-mono uppercase text-[0.625rem] tracking-[0.22em] text-gold tabular">
                  No. {String(i + 1).padStart(2, "0")}
                </span>
                <motion.div
                  aria-hidden
                  initial={{ rotate: -8, opacity: 0.2 }}
                  whileInView={{ rotate: 0, opacity: 0.3 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.2 }}
                  className="text-gold/30"
                >
                  <Quote size={64} strokeWidth={1} />
                </motion.div>
              </div>
              <div className="md:col-span-10 relative">
                <div
                  aria-hidden
                  className={`absolute -inset-x-8 -inset-y-6 -z-10 bg-gradient-to-r ${t.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl`}
                />
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
