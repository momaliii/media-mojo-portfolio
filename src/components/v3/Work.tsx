import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { caseStudies } from "@/data/caseStudies";

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const Work = () => {
  const items = caseStudies.slice(0, 6);

  return (
    <section id="work" className="relative py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">
        <div className="flex items-end justify-between gap-6 mb-10 md:mb-14">
          <div>
            <p className="v3-eyebrow v3-lime mb-4">Selected proof</p>
            <h2 className="v3-display text-4xl md:text-6xl font-bold leading-[1] tracking-[-0.05em]">
              Case studies with <span className="v3-glow-text">numbers attached.</span>
            </h2>
          </div>
          <Link
            to="/v3/case-studies"
            className="hidden md:inline-flex items-center gap-2 rounded-2xl v3-shell px-5 py-3 text-sm font-bold v3-link whitespace-nowrap"
          >
            All Case Studies <ArrowUpRight size={14} />
          </Link>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {items.map((cs, i) => {
            const slug = cs.slug || slugify(cs.title);
            return (
              <motion.li
                key={slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
              >
                <Link
                  to={`/v3/case-study/${slug}`}
                  className="group block v3-shell v3-card-hover rounded-[1.7rem] p-5 md:p-6 min-h-[330px]"
                >
                  <div className="flex items-center justify-between mb-8">
                    <span className="v3-eyebrow v3-muted">0{i + 1}</span>
                    <span className="rounded-full bg-[var(--v3-cyan)]/10 px-3 py-1 text-xs font-bold text-[var(--v3-cyan)]">
                      {cs.category}
                    </span>
                  </div>
                  <div>
                    <h3 className="v3-display text-2xl md:text-3xl font-bold leading-tight tracking-[-0.04em] group-hover:text-[var(--v3-lime)] transition-colors">
                      {cs.title}
                    </h3>
                    <p className="mt-4 v3-soft leading-relaxed line-clamp-3">
                      {cs.description}
                    </p>
                    <p className="v3-eyebrow v3-muted mt-5">
                      {cs.industry || cs.category}
                    </p>
                  </div>
                  <div className="mt-8 pt-6 border-t v3-rule flex gap-5">
                    {cs.metrics.slice(0, 2).map((m) => (
                      <div key={m.label}>
                        <div className="v3-numeral text-3xl font-bold leading-none">{m.value}</div>
                        <div className="v3-eyebrow v3-muted mt-1">{m.label}</div>
                      </div>
                    ))}
                    <ArrowUpRight
                      size={26}
                      className="ml-auto text-[var(--v3-muted)] group-hover:text-[var(--v3-lime)] group-hover:rotate-12 transition-all"
                    />
                  </div>
                </Link>
              </motion.li>
            );
          })}
        </ul>

        <div className="mt-12 md:hidden">
          <Link
            to="/v3/case-studies"
            className="inline-flex items-center gap-2 v3-eyebrow v3-link"
          >
            All Case Studies <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Work;
