import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Linkedin } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  // Big wordmark drifts horizontally as you scroll into the footer
  const wordmarkX = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);
  const wordmarkOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.02, 0.05, 0.08]);

  return (
    <footer
      ref={ref}
      className="relative bg-obsidian border-t border-white/[0.06] grain overflow-hidden"
    >
      {/* Top gold seam */}
      <div
        aria-hidden
        className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
      />

      <div className="container mx-auto px-6 lg:px-10 py-20 md:py-28 relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-5"
          >
            <p className="eyebrow text-gold mb-6">Mohamed Ali</p>
            <p className="font-serif text-3xl md:text-4xl text-white leading-[1.15] mb-8 max-w-md">
              Performance marketing,
              <br />
              <span className="serif-italic text-gold">crafted</span> — not
              configured.
            </p>
            <p className="text-white/60 text-sm leading-relaxed max-w-md">
              Senior media buyer for ambitious DTC, e-commerce, and B2B brands.
              Based in Cairo, working across 10 countries.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-4"
          >
            <p className="eyebrow text-white/40 mb-6">Direct</p>
            <ul className="space-y-4 text-white/80">
              <li>
                <a
                  href="mailto:mhmd167ali@gmail.com"
                  className="group inline-flex items-baseline gap-2 font-serif text-2xl md:text-3xl hover:text-gold transition-colors duration-500"
                >
                  <span className="gold-underline">mhmd167ali@gmail.com</span>
                  <span className="text-gold/50 group-hover:text-gold transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/+201060098267"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-baseline gap-2 font-serif text-2xl md:text-3xl hover:text-gold transition-colors duration-500"
                >
                  <span className="gold-underline">+20 106 009 8267</span>
                  <span className="text-gold/50 group-hover:text-gold transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-3"
          >
            <p className="eyebrow text-white/40 mb-6">Elsewhere</p>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://www.linkedin.com/in/mhmdali02/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/70 hover:text-gold transition-colors gold-underline"
                >
                  <Linkedin size={14} />
                  <span className="font-mono uppercase text-[0.6875rem] tracking-[0.22em]">
                    LinkedIn
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="/Mohamed_Ali_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-gold transition-colors gold-underline font-mono uppercase text-[0.6875rem] tracking-[0.22em]"
                >
                  Resume (PDF) ↓
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono uppercase text-[0.6875rem] tracking-[0.22em] text-white/50">
                  Available · Cairo · GMT+2
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Scroll-driven big wordmark */}
        <motion.div
          aria-hidden
          style={{ x: wordmarkX, opacity: wordmarkOpacity }}
          className="font-serif text-[clamp(5rem,18vw,16rem)] leading-none text-white tracking-tighter select-none mb-16 -mx-6 lg:-mx-10 text-center overflow-hidden whitespace-nowrap"
        >
          Mohamed Ali
        </motion.div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8 border-t border-white/[0.06]">
          <p className="font-mono uppercase text-[0.625rem] tracking-[0.22em] text-white/40">
            © {year} Mohamed Ali · All rights reserved
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-mono uppercase text-[0.625rem] tracking-[0.22em] text-white/40 hover:text-gold transition-colors flex items-center gap-2 group"
          >
            <span className="transition-transform group-hover:-translate-y-0.5">↑</span>
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
