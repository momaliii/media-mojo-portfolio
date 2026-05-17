import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Mohamed turned a stagnant Meta account into our most reliable channel. Within two quarters we were running profitably at 5×+ ROAS and scaling spend monthly.",
    name: "Marketing Director",
    role: "Beauty DTC brand",
    region: "Saudi Arabia",
  },
  {
    quote:
      "He treats budget like it's his own. Tight CAC targets, creative testing on a real cadence, and weekly reporting that an exec can actually read.",
    name: "Founder",
    role: "F&B e-commerce",
    region: "Egypt / Kuwait",
  },
  {
    quote:
      "Rare to find a media buyer who's equally strong on Meta and TikTok and who understands the funnel from CTR to LTV. He delivered.",
    name: "Head of Growth",
    role: "Apparel DTC",
    region: "UK",
  },
];

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="section-padding bg-white dark:bg-gray-950 relative"
      aria-labelledby="testimonials-heading"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl mb-12 md:mb-14">
          <p className="eyebrow text-media-purple mb-3">02 · What clients say</p>
          <h2
            id="testimonials-heading"
            className="text-display-lg text-media-ink dark:text-white"
          >
            Trusted with{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-media-purple to-media-oceanblue">
              7-figure budgets
            </span>{" "}
            across DTC, F&amp;B and B2B.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((t, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative rounded-2xl border border-gray-200/70 dark:border-white/10 bg-gradient-to-br from-white to-gray-50/60 dark:from-media-navy dark:to-media-slate p-7 shadow-sm hover:shadow-md transition-shadow"
            >
              <Quote
                aria-hidden
                className="absolute top-5 right-5 h-7 w-7 text-media-purple/15 dark:text-media-cyan/20"
              />
              <blockquote className="text-gray-800 dark:text-gray-100 leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 pt-4 border-t border-gray-100 dark:border-white/10">
                <div className="text-sm font-semibold text-media-ink dark:text-white">
                  {t.name}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {t.role} · {t.region}
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <p className="text-xs text-gray-400 dark:text-gray-500 mt-8 max-w-2xl">
          Client names withheld under NDA — references and full case studies
          available on request.
        </p>
      </div>
    </section>
  );
};

export default Testimonials;
