import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowUpRight, Filter, Search, Zap } from "lucide-react";
import { usePublishedCaseStudies } from "@/hooks/use-case-studies";
import { CaseStudy } from "@/data/caseStudies";
import { Glitch } from "./_primitives";

const titleToSlug = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const CATS: { id: string; label: string }[] = [
  { id: "all",        label: "ALL" },
  { id: "e-commerce", label: "E-COMM" },
  { id: "f&b",        label: "F&B" },
  { id: "ngo",        label: "NGO" },
  { id: "branding",   label: "BRAND" },
];

const CAT_COLOR: Record<string, string> = {
  "e-commerce": "text-holo-cyan border-holo-cyan/40",
  "f&b": "text-amber-300 border-amber-300/40",
  "ngo": "text-emerald-400 border-emerald-400/40",
  "branding": "text-holo-magenta border-holo-magenta/40",
  "b2b": "text-violet-400 border-violet-400/40",
  "local": "text-rose-300 border-rose-300/40",
  "apps": "text-sky-300 border-sky-300/40",
  "travel": "text-cyan-300 border-cyan-300/40",
};

const Portfolio = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const { data: caseStudies = [] } = usePublishedCaseStudies();

  const filtered = caseStudies.filter((s) => {
    const cat = filter === "all" || s.category === filter;
    const q = search.trim().toLowerCase();
    const sm = !q || s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q) || s.client.toLowerCase().includes(q);
    return cat && sm;
  });

  return (
    <section id="work" className="relative border-t border-chrome-700/30 scanlines" style={{ backgroundColor: "var(--v3-bg)" }}>
      <div className="absolute inset-0 v3-grid opacity-50 pointer-events-none" />

      <div className="relative container mx-auto px-6 lg:px-10 py-24 md:py-32">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 md:mb-20">
          <div className="md:col-span-3">
            <p className="y2k-mono text-[0.6875rem] uppercase tracking-[0.18em] text-holo-cyan mb-3">
              // 01_SELECTED_WORK
            </p>
            <p className="y2k-mono text-[0.625rem] uppercase tracking-[0.18em] text-chrome-500">
              [2018—{new Date().getFullYear()}]
            </p>
          </div>
          <h2 className="md:col-span-9 y2k-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.85] text-chrome-50">
            <span className="block">CAMPAIGNS THAT</span>
            <span className="block holo-text">SHIPPED &amp; SCALED.</span>
          </h2>
        </div>

        {/* Filter terminal */}
        <div className="window-chrome mb-12">
          <div className="window-chrome-bar">
            <span className="window-dot bg-rose-400/80" />
            <span className="window-dot bg-amber-300/80" />
            <span className="window-dot bg-emerald-400/80" />
            <span className="ml-3 y2k-mono text-xs text-chrome-200">filter.sh — query: <span className="text-holo-cyan">{filtered.length}</span> records</span>
          </div>
          <div className="p-4 flex flex-col md:flex-row gap-4 items-center">
            <div className="flex items-center gap-2 y2k-mono text-xs text-chrome-400 mr-2">
              <Filter size={12} />
              <span>FILTER:</span>
            </div>
            <div className="flex flex-wrap gap-2 flex-1">
              {CATS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setFilter(c.id)}
                  className={`y2k-mono text-xs uppercase tracking-[0.15em] px-3 py-1.5 border transition-colors ${
                    filter === c.id
                      ? "border-holo-cyan text-holo-cyan bg-holo-cyan/10"
                      : "border-chrome-700 text-chrome-400 hover:border-chrome-500 hover:text-chrome-200"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-56">
              <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-chrome-500" />
              <input
                placeholder="grep ..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-midnight-950 border border-chrome-700 text-chrome-100 placeholder:text-chrome-600 y2k-mono text-xs px-7 py-1.5 focus:outline-none focus:border-holo-cyan"
              />
            </div>
          </div>
        </div>

        {/* List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter + search}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            {filtered.map((study, i) => (
              <Row key={study.title + i} study={study} index={i} navigate={navigate} />
            ))}
            {filtered.length === 0 && (
              <p className="py-20 text-center y2k-mono text-sm text-chrome-500">
                &gt; NO RECORDS MATCH. <button onClick={() => { setFilter("all"); setSearch(""); }} className="text-holo-cyan hover:underline">/reset_query</button>
              </p>
            )}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <div className="mt-16 flex flex-col sm:flex-row items-start gap-4">
          <Link to="/v3/case-studies" className="group inline-flex items-center gap-2 border border-holo-cyan/50 hover:border-holo-cyan text-holo-cyan px-6 py-3 transition-colors">
            <Zap size={14} />
            <span className="y2k-mono text-xs uppercase tracking-[0.18em]">View_Full_Index</span>
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <a href="/Mohamed_Ali_CV.pdf" target="_blank" rel="noopener noreferrer" className="y2k-mono text-xs uppercase tracking-[0.18em] text-chrome-400 hover:text-holo-magenta transition-colors">
            ↓ /download portfolio.pdf
          </a>
        </div>
      </div>
    </section>
  );
};

const Row = ({ study, index, navigate }: { study: CaseStudy; index: number; navigate: ReturnType<typeof useNavigate> }) => {
  const slug = study.slug || titleToSlug(study.title);
  const catColor = CAT_COLOR[study.category] ?? "text-holo-cyan border-holo-cyan/40";

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.05, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => navigate(`/v3/case-study/${slug}`)}
      className="group cursor-pointer border-t border-chrome-700/40 hover:border-holo-cyan/60 py-8 md:py-10 transition-colors duration-500"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
        <div className="md:col-span-1 y2k-mono text-xs text-chrome-500">
          /{String(index + 1).padStart(2, "0")}
        </div>
        <div className="md:col-span-5">
          <div className="flex items-center gap-3 mb-3">
            <span className={`y2k-mono text-[0.625rem] uppercase tracking-[0.18em] px-2 py-0.5 border ${catColor}`}>
              {study.category}
            </span>
            {study.industry && (
              <span className="y2k-mono text-[0.625rem] uppercase tracking-[0.18em] text-chrome-500">
                · {study.industry}
              </span>
            )}
          </div>
          <h3 className="y2k-display text-2xl md:text-4xl text-chrome-50 leading-[0.95] group-hover:text-holo-cyan transition-colors duration-500">
            <Glitch text={study.title} />
          </h3>
          <p className="y2k-mono text-[0.6875rem] uppercase tracking-[0.18em] text-chrome-500 mt-3">
            &gt; {study.client}
          </p>
        </div>
        <p className="md:col-span-3 text-chrome-400 text-sm leading-relaxed">
          {study.description}
        </p>
        <div className="md:col-span-3 flex md:justify-end items-start gap-6">
          {study.metrics.slice(0, 2).map((m, i) => (
            <div key={i} className="md:text-right">
              <div className={`y2k-display text-3xl md:text-4xl tabular leading-none ${
                i === 0 ? "text-holo-cyan" : "text-holo-magenta"
              } group-hover:scale-110 transition-transform duration-500`}
                style={{ fontVariationSettings: "'wdth' 85" }}
              >
                {m.value}
              </div>
              <div className="y2k-mono text-[0.5625rem] uppercase tracking-[0.18em] text-chrome-500 mt-1.5">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.article>
  );
};

export default Portfolio;
