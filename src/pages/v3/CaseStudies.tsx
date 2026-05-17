import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronRight, Download, Zap, Filter, Search, ArrowUpRight, Cpu } from "lucide-react";
import Navigation from "@/components/v3/Navigation";
import Footer from "@/components/v3/Footer";
import { usePublishedCaseStudies } from "@/hooks/use-case-studies";
import { CaseStudy } from "@/data/caseStudies";
import { trackPageView, trackEvent } from "@/utils/analytics";
import { Glitch, ScrollProgress } from "@/components/v3/_primitives";
import { useNavigate } from "react-router-dom";

const titleToSlug = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const CATS = [
  { id: "all", label: "ALL" },
  { id: "e-commerce", label: "E-COMM" },
  { id: "f&b", label: "F&B" },
  { id: "ngo", label: "NGO" },
  { id: "branding", label: "BRAND" },
];

const CaseStudiesV3 = () => {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const { data: caseStudies = [] } = usePublishedCaseStudies();
  const navigate = useNavigate();

  useEffect(() => { trackPageView("/v3/case-studies", "Selected Work — v3"); }, []);

  const total = caseStudies.length;
  const filtered = caseStudies.filter((s) => {
    const cat = filter === "all" || s.category === filter;
    const q = search.trim().toLowerCase();
    const sm = !q || s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q);
    return cat && sm;
  });

  return (
    <>
      <Helmet>
        <title>Selected Work // Mohamed Ali — v3</title>
        <meta name="description" content={`${total} campaigns. DTC, F&B, NGO, B2B.`} />
      </Helmet>
      <div className="v3-theme min-h-screen" style={{ backgroundColor: "var(--v3-bg)" }}>
        <ScrollProgress />
        <Navigation />

        <section className="relative pt-28 md:pt-36 pb-16 border-b border-chrome-700/30 scanlines">
          <div className="absolute inset-0 v3-grid opacity-50 pointer-events-none" />
          <div className="relative container mx-auto px-6 lg:px-10">
            <nav className="flex items-center gap-2 y2k-mono text-[0.625rem] uppercase tracking-[0.18em] text-chrome-500 mb-12">
              <Link to="/v3" className="hover:text-holo-cyan">/HOME</Link>
              <ChevronRight size={11} />
              <span className="text-holo-cyan">/WORK</span>
            </nav>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
              <div className="md:col-span-3">
                <p className="y2k-mono text-[0.6875rem] uppercase tracking-[0.18em] text-holo-cyan mb-3">// INDEX_ALL</p>
                <p className="y2k-mono text-[0.625rem] uppercase tracking-[0.18em] text-chrome-500">{total} RECORDS // 2018—{new Date().getFullYear()}</p>
              </div>
              <h1 className="md:col-span-9 y2k-display text-[clamp(2.5rem,9vw,9rem)] leading-[0.85] text-chrome-50">
                <span className="block chrome-text">SELECTED WORK.</span>
                <span className="block holo-text">ALL OF IT.</span>
              </h1>
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-3">
              <Link to="/v3" className="inline-flex items-center gap-2 text-chrome-300 hover:text-holo-cyan y2k-mono text-xs uppercase tracking-[0.18em]">
                <ArrowLeft size={14} /> /back_home
              </Link>
              <a href="/Mohamed_Ali_CV.pdf" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("download_portfolio", { src: "v3" })}
                className="inline-flex items-center gap-2 border border-holo-cyan/50 hover:border-holo-cyan text-holo-cyan px-5 py-2.5">
                <Cpu size={14} />
                <span className="y2k-mono text-xs uppercase tracking-[0.18em]">Download_PDF</span>
                <Download size={14} />
              </a>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6 lg:px-10">
            <div className="window-chrome mb-10">
              <div className="window-chrome-bar">
                <span className="window-dot bg-rose-400/80" /><span className="window-dot bg-amber-300/80" /><span className="window-dot bg-emerald-400/80" />
                <span className="ml-3 y2k-mono text-xs text-chrome-200">filter.sh — <span className="text-holo-cyan">{filtered.length}</span> records</span>
              </div>
              <div className="p-4 flex flex-col md:flex-row gap-4 items-center">
                <div className="flex items-center gap-2 y2k-mono text-xs text-chrome-400 mr-2">
                  <Filter size={12} /><span>FILTER:</span>
                </div>
                <div className="flex flex-wrap gap-2 flex-1">
                  {CATS.map((c) => (
                    <button key={c.id} onClick={() => setFilter(c.id)} className={`y2k-mono text-xs uppercase tracking-[0.15em] px-3 py-1.5 border transition-colors ${
                      filter === c.id ? "border-holo-cyan text-holo-cyan bg-holo-cyan/10" : "border-chrome-700 text-chrome-400 hover:border-chrome-500 hover:text-chrome-200"
                    }`}>{c.label}</button>
                  ))}
                </div>
                <div className="relative w-full md:w-56">
                  <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-chrome-500" />
                  <input placeholder="grep ..." value={search} onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-midnight-950 border border-chrome-700 text-chrome-100 placeholder:text-chrome-600 y2k-mono text-xs px-7 py-1.5 focus:outline-none focus:border-holo-cyan" />
                </div>
              </div>
            </div>

            <div>
              {filtered.map((s, i) => <Row key={s.title + i} study={s} index={i} navigate={navigate} />)}
              {filtered.length === 0 && (
                <p className="py-20 text-center y2k-mono text-sm text-chrome-500">&gt; NO RECORDS. <button onClick={() => { setFilter("all"); setSearch(""); }} className="text-holo-cyan hover:underline">/reset</button></p>
              )}
              {filtered.length > 0 && <div className="border-t border-chrome-700/40" />}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

const Row = ({ study, index, navigate }: { study: CaseStudy; index: number; navigate: ReturnType<typeof useNavigate> }) => {
  const slug = study.slug || titleToSlug(study.title);
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.04, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => navigate(`/v3/case-study/${slug}`)}
      className="group cursor-pointer border-t border-chrome-700/40 hover:border-holo-cyan/60 py-7 md:py-9 transition-colors"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        <div className="md:col-span-1 y2k-mono text-xs text-chrome-500">/{String(index + 1).padStart(2, "0")}</div>
        <div className="md:col-span-5">
          <span className="y2k-mono text-[0.625rem] uppercase tracking-[0.18em] text-chrome-500">{study.category}</span>
          <h3 className="mt-1 y2k-display text-2xl md:text-3xl text-chrome-50 leading-[0.95] group-hover:text-holo-cyan transition-colors">
            <Glitch text={study.title} />
          </h3>
        </div>
        <p className="md:col-span-3 text-chrome-400 text-sm leading-relaxed">{study.description}</p>
        <div className="md:col-span-3 flex md:justify-end gap-5">
          {study.metrics.slice(0, 2).map((m, i) => (
            <div key={i} className="md:text-right">
              <div className={`y2k-display text-2xl md:text-3xl tabular ${i === 0 ? "text-holo-cyan" : "text-holo-magenta"}`} style={{ fontVariationSettings: "'wdth' 85" }}>{m.value}</div>
              <div className="y2k-mono text-[0.5625rem] uppercase tracking-[0.18em] text-chrome-500 mt-1">{m.label}</div>
            </div>
          ))}
          <ArrowUpRight size={14} className="text-chrome-500 group-hover:text-holo-cyan transition-colors mt-1" />
        </div>
      </div>
    </motion.article>
  );
};

export default CaseStudiesV3;
