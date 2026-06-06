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
    <section id="work" className="relative py-24 md:py-36">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex items-end justify-between border-b v3-rule pb-8 mb-12 md:mb-20 gap-6">
          <div>
            <p className="v3-eyebrow text-[var(--v3-accent)] mb-4">§ 01 — Selected Work</p>
            <h2 className="v3-serif text-5xl md:text-7xl leading-[0.95] tracking-[-0.02em]">
              Campaigns that <span className="v3-italic">earned</span> their budget.
            </h2>
          </div>
          <Link
            to="/v3/case-studies"
            className="hidden md:inline-flex items-center gap-2 v3-eyebrow hover:text-[var(--v3-accent)] transition-colors whitespace-nowrap"
          >
            All Case Studies <ArrowUpRight size={14} />
          </Link>
        </div>

        <ul className="divide-y v3-rule border-t border-b v3-rule">
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
                  className="group grid grid-cols-12 gap-4 md:gap-8 items-center py-8 md:py-12 hover:bg-[var(--v3-paper-2)] -mx-4 px-4 md:-mx-6 md:px-6 transition-colors"
                >
                  <span className="v3-numeral text-2xl md:text-3xl text-[var(--v3-muted)] col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="col-span-11 md:col-span-5">
                    <h3 className="v3-serif text-2xl md:text-4xl leading-tight tracking-[-0.015em] group-hover:v3-italic group-hover:text-[var(--v3-accent)] transition-all">
                      {cs.title}
                    </h3>
                    <p className="v3-eyebrow text-[var(--v3-muted)] mt-2">
                      {cs.industry || cs.category}
                    </p>
                  </div>
                  <div className="hidden md:flex col-span-4 gap-6">
                    {cs.metrics.slice(0, 2).map((m) => (
                      <div key={m.label}>
                        <div className="v3-numeral text-3xl leading-none">{m.value}</div>
                        <div className="v3-eyebrow text-[var(--v3-muted)] mt-1">{m.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="hidden md:flex col-span-2 justify-end">
                    <ArrowUpRight
                      size={28}
                      className="text-[var(--v3-muted)] group-hover:text-[var(--v3-accent)] group-hover:rotate-12 transition-all"
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
            className="inline-flex items-center gap-2 v3-eyebrow hover:text-[var(--v3-accent)]"
          >
            All Case Studies <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Work;
