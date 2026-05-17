import React from "react";
import { ArrowUpRight } from "lucide-react";
import { CaseStudy } from "@/data/caseStudies";
import { motion } from "framer-motion";
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

const CaseStudyCard = ({ study, index }: CaseStudyCardProps) => {
  const navigate = useNavigate();
  const slug = study.slug || titleToSlug(study.title);

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.9,
        delay: (index % 4) * 0.05,
        ease: [0.16, 1, 0.3, 1],
      }}
      onClick={() => navigate(`/v2/case-study/${slug}`)}
      className="group cursor-pointer border-t border-white/[0.08] py-10 md:py-14 hover:border-gold/40 transition-colors duration-700"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
        {/* Index numeral */}
        <div className="md:col-span-1">
          <span className="font-mono uppercase text-[0.625rem] tracking-[0.22em] text-gold/70 tabular">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Title + meta */}
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
          <h3 className="font-serif text-3xl md:text-5xl text-white leading-[1.05] tracking-tight group-hover:text-gold transition-colors duration-500">
            {study.title}
          </h3>
          <p className="text-white/40 text-sm mt-3 font-mono uppercase tracking-[0.15em]">
            {study.client}
          </p>
        </div>

        {/* Description */}
        <p className="md:col-span-3 text-white/60 text-sm md:text-base leading-relaxed">
          {study.description}
        </p>

        {/* Metrics + cta */}
        <div className="md:col-span-3 flex flex-col items-start md:items-end gap-4">
          <div className="flex gap-x-6 gap-y-2 flex-wrap md:justify-end">
            {study.metrics.slice(0, 2).map((m, i) => (
              <div key={i} className="text-left md:text-right">
                <div className="font-serif text-3xl md:text-4xl text-gold tabular leading-none">
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
