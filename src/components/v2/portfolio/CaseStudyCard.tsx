import React, { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { CaseStudy } from "@/data/caseStudies";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface CaseStudyCardProps {
  study: CaseStudy;
  index: number;
}

const titleToSlug = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const getCategoryName = (c: string): string => {
  const map: Record<string, string> = {
    "e-commerce": "E-commerce",
    "f&b": "F&B",
    ngo: "NGO",
    branding: "Branding",
    b2b: "B2B",
    local: "Local",
    apps: "Mobile App",
    travel: "Travel",
  };
  return map[c] ?? c;
};

// Each category gets its own ambient gradient — always looks intentional
const getCategoryGradient = (c: string): string => {
  const map: Record<string, string> = {
    "e-commerce": "from-amber-500/40 via-gold/30 to-rose-500/30",
    "f&b": "from-orange-500/40 via-rose-400/30 to-amber-500/30",
    ngo: "from-emerald-500/40 via-teal-500/30 to-cyan-500/30",
    branding: "from-violet-500/40 via-fuchsia-500/30 to-rose-500/30",
    b2b: "from-blue-500/40 via-cyan-500/30 to-teal-500/30",
    local: "from-indigo-500/40 via-violet-500/30 to-purple-500/30",
    apps: "from-sky-500/40 via-blue-500/30 to-indigo-500/30",
    travel: "from-sky-400/40 via-cyan-400/30 to-emerald-400/30",
  };
  return map[c] ?? "from-gold/40 via-amber-500/30 to-rose-500/30";
};

const CaseStudyCard = ({ study, index }: CaseStudyCardProps) => {
  const navigate = useNavigate();
  const slug = study.slug || titleToSlug(study.title);
  const rowRef = useRef<HTMLElement>(null);
  const [hover, setHover] = useState(false);

  const tx = useMotionValue(0);
  const ty = useMotionValue(0);
  const stx = useSpring(tx, { stiffness: 220, damping: 25, mass: 0.4 });
  const sty = useSpring(ty, { stiffness: 220, damping: 25, mass: 0.4 });

  const onMove = (e: React.MouseEvent) => {
    if (!rowRef.current) return;
    const r = rowRef.current.getBoundingClientRect();
    tx.set(e.clientX - r.left);
    ty.set(e.clientY - r.top);
  };

  const gradient = getCategoryGradient(study.category);

  return (
    <motion.article
      ref={rowRef}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.9,
        delay: (index % 4) * 0.05,
        ease: [0.16, 1, 0.3, 1],
      }}
      onClick={() => navigate(`/v2/case-study/${slug}`)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseMove={onMove}
      className="group relative cursor-pointer border-t border-white/[0.08] py-10 md:py-14 hover:border-gold/40 transition-colors duration-700"
    >
      {/* Stylized cursor-follow preview — abstract gradient mesh + category + title */}
      <AnimatePresence>
        {hover && (
          <motion.div
            aria-hidden
            style={{ x: stx, y: sty }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none hidden md:block absolute z-30 -translate-x-1/2 -translate-y-1/2 w-80 h-56 overflow-hidden ring-1 ring-gold/30 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.8)]"
          >
            {/* Base: deep obsidian */}
            <div className="absolute inset-0 bg-obsidian" />
            {/* Animated gradient mesh */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${gradient}`}
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              style={{ backgroundSize: "200% 200%" }}
            />
            {/* Noise grain */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.18] mix-blend-overlay"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              }}
            />
            {/* Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/85 via-transparent to-transparent" />
            {/* Content */}
            <div className="relative h-full p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="font-mono uppercase text-[0.5625rem] tracking-[0.22em] text-white/80 bg-obsidian/40 backdrop-blur-sm px-2 py-1">
                  {getCategoryName(study.category)}
                </span>
                <span className="font-mono uppercase text-[0.5625rem] tracking-[0.22em] text-gold tabular">
                  {String(index + 1).padStart(2, "0")} / Case
                </span>
              </div>
              <div>
                <p className="font-serif text-2xl text-white leading-[1.1] line-clamp-2">
                  {study.title}
                </p>
                {study.metrics?.[0] && (
                  <p className="mt-2 font-mono uppercase text-[0.625rem] tracking-[0.22em] text-gold">
                    {study.metrics[0].value} {study.metrics[0].label}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
        <div className="md:col-span-1">
          <span className="font-mono uppercase text-[0.625rem] tracking-[0.22em] text-gold/70 tabular">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="md:col-span-5">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono uppercase text-[0.625rem] tracking-[0.22em] text-white/40">
              {getCategoryName(study.category)}
            </span>
            {study.industry && (
              <>
                <span className="text-white/20">·</span>
                <span className="font-mono uppercase text-[0.625rem] tracking-[0.22em] text-white/40">
                  {study.industry}
                </span>
              </>
            )}
          </div>
          <h3 className="font-serif text-3xl md:text-5xl text-white leading-[1.05] tracking-tight transition-all duration-500 group-hover:text-gold group-hover:translate-x-1">
            {study.title}
          </h3>
          <p className="text-white/40 text-sm mt-3 font-mono uppercase tracking-[0.15em]">
            {study.client}
          </p>
        </div>

        <p className="md:col-span-3 text-white/60 text-sm md:text-base leading-relaxed">
          {study.description}
        </p>

        <div className="md:col-span-3 flex flex-col items-start md:items-end gap-4">
          <div className="flex gap-x-6 gap-y-2 flex-wrap md:justify-end">
            {study.metrics.slice(0, 2).map((m, i) => (
              <div key={i} className="text-left md:text-right">
                <div className="font-serif text-3xl md:text-4xl text-gold tabular leading-none transition-transform duration-500 group-hover:scale-110">
                  {m.value}
                </div>
                <div className="font-mono uppercase text-[0.5625rem] tracking-[0.2em] text-white/40 mt-1.5">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          <span className="mt-4 inline-flex items-center gap-2 text-white/60 group-hover:text-gold transition-colors duration-500">
            <span className="font-mono uppercase text-[0.625rem] tracking-[0.22em]">
              Read case
            </span>
            <ArrowUpRight
              size={14}
              className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </div>
      </div>
    </motion.article>
  );
};

export default CaseStudyCard;
