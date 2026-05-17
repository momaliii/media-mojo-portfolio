import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, ChevronRight, Loader2, Share2 } from "lucide-react";
import { useCaseStudyBySlug, usePublishedCaseStudies } from "@/hooks/use-case-studies";
import Navigation from "@/components/v3/Navigation";
import Footer from "@/components/v3/Footer";
import { Glitch, ScrollProgress, WindowFrame } from "@/components/v3/_primitives";
import MetaTags from "@/components/MetaTags";

const titleToSlug = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const PANEL_GRAD: Record<string, string> = {
  "e-commerce": "from-holo-cyan/30 via-holo-violet/20 to-holo-magenta/30",
  "f&b": "from-amber-500/30 via-rose-400/20 to-holo-magenta/30",
  ngo: "from-emerald-500/30 via-holo-cyan/20 to-teal-500/30",
  branding: "from-holo-magenta/30 via-holo-violet/20 to-holo-cyan/30",
  b2b: "from-blue-500/30 via-holo-cyan/20 to-teal-500/30",
  local: "from-indigo-500/30 via-holo-violet/20 to-purple-500/30",
  apps: "from-sky-500/30 via-blue-500/20 to-indigo-500/30",
  travel: "from-sky-400/30 via-holo-cyan/20 to-emerald-400/30",
};

const CaseStudyDetailV3 = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data: caseStudy, isLoading } = useCaseStudyBySlug(slug);
  const { data: all = [] } = usePublishedCaseStudies();

  if (isLoading) return (
    <div className="v3-theme min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--v3-bg)" }}>
      <Loader2 className="h-6 w-6 animate-spin text-holo-cyan" />
    </div>
  );

  if (!caseStudy) return (
    <div className="v3-theme min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--v3-bg)" }}>
      <div className="text-center">
        <p className="y2k-mono text-xs uppercase tracking-[0.18em] text-holo-magenta mb-4">// ERR_404 // RECORD_NOT_FOUND</p>
        <h1 className="y2k-display text-4xl text-chrome-50 mb-6">FILE WITHDRAWN.</h1>
        <button onClick={() => navigate("/v3")} className="y2k-mono text-xs uppercase tracking-[0.18em] text-holo-cyan hover:underline">&gt; /return_home</button>
      </div>
    </div>
  );

  const related = all.filter((s) => s.category === caseStudy.category && (s.slug || titleToSlug(s.title)) !== slug).slice(0, 2);
  const grad = PANEL_GRAD[caseStudy.category] ?? "from-holo-cyan/30 via-holo-violet/20 to-holo-magenta/30";

  const onShare = () => {
    const url = window.location.href;
    if (navigator.share) { navigator.share({ title: caseStudy.title, url }).catch(() => {}); }
    else { navigator.clipboard.writeText(url); }
  };

  return (
    <>
      <MetaTags title={`${caseStudy.title} // Case Study`} description={caseStudy.description} url={`/v3/case-study/${slug}`} />
      <div className="v3-theme min-h-screen" style={{ backgroundColor: "var(--v3-bg)" }}>
        <ScrollProgress />
        <Navigation />

        {/* Hero */}
        <section className="relative pt-28 md:pt-36 pb-14 border-b border-chrome-700/30 scanlines">
          <div className="absolute inset-0 v3-grid opacity-50 pointer-events-none" />
          <div className="relative container mx-auto px-6 lg:px-10">
            <nav className="flex items-center gap-2 y2k-mono text-[0.625rem] uppercase tracking-[0.18em] text-chrome-500 mb-12">
              <Link to="/v3" className="hover:text-holo-cyan">/HOME</Link>
              <ChevronRight size={11} />
              <Link to="/v3/case-studies" className="hover:text-holo-cyan">/WORK</Link>
              <ChevronRight size={11} />
              <span className="text-holo-cyan truncate max-w-[40ch]">/{titleToSlug(caseStudy.title)}</span>
            </nav>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-3">
                <p className="y2k-mono text-[0.6875rem] uppercase tracking-[0.18em] text-holo-cyan mb-3">// CASE_STUDY</p>
                <p className="y2k-mono text-[0.625rem] uppercase tracking-[0.18em] text-chrome-500">
                  {caseStudy.category} {caseStudy.industry && `// ${caseStudy.industry}`}
                </p>
              </div>
              <h1 className="md:col-span-9 y2k-display text-[clamp(2rem,7vw,7rem)] leading-[0.85] text-chrome-50">
                <Glitch text={caseStudy.title} />
              </h1>
            </div>

            <p className="md:ml-[25%] mt-10 max-w-3xl text-xl md:text-2xl text-chrome-200 leading-[1.4]">
              {caseStudy.description}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-6 y2k-mono text-xs uppercase tracking-[0.18em]">
              <button onClick={() => navigate("/v3/case-studies")} className="inline-flex items-center gap-2 text-chrome-300 hover:text-holo-cyan">
                <ArrowLeft size={12} /> /back_to_work
              </button>
              <button onClick={onShare} className="inline-flex items-center gap-2 text-chrome-300 hover:text-holo-magenta">
                <Share2 size={12} /> /share
              </button>
            </div>
          </div>
        </section>

        {/* Metrics */}
        <section className="border-b border-chrome-700/30 py-16">
          <div className="container mx-auto px-6 lg:px-10">
            <p className="y2k-mono text-[0.6875rem] uppercase tracking-[0.18em] text-holo-cyan mb-8">// RESULTS_DATA</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {caseStudy.metrics.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="window-chrome">
                  <div className="window-chrome-bar">
                    <span className="window-dot bg-rose-400/80" /><span className="window-dot bg-amber-300/80" /><span className="window-dot bg-emerald-400/80" />
                    <span className="ml-3 y2k-mono text-xs text-chrome-200">metric_{String(i + 1).padStart(2, "0")}.dat</span>
                  </div>
                  <div className="p-6">
                    <div className={`y2k-display text-5xl md:text-6xl tabular leading-none ${i === 0 ? "holo-text" : i === 1 ? "text-holo-cyan" : "text-holo-magenta"}`} style={{ fontVariationSettings: "'wdth' 85" }}>
                      {m.value}
                    </div>
                    <div className="y2k-mono text-xs uppercase tracking-[0.18em] text-chrome-400 mt-3">{m.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Narrative */}
        <section className="border-b border-chrome-700/30 py-20">
          <div className="container mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-4 space-y-8">
              <Field k="CLIENT" v={caseStudy.client} />
              {caseStudy.budgetRange && <Field k="BUDGET" v={caseStudy.budgetRange.toUpperCase()} />}
              {caseStudy.platforms && <Field k="PLATFORMS" v={caseStudy.platforms.map((p) => p.toUpperCase()).join(" · ")} />}
              {caseStudy.tools && <Field k="STACK" v={caseStudy.tools.join(" · ")} />}
            </div>
            <div className="md:col-span-8 space-y-12">
              {caseStudy.challenge && <Narrative label="// BRIEF" body={caseStudy.challenge} color="cyan" />}
              {caseStudy.strategy && <Narrative label="// STRATEGY" body={caseStudy.strategy} color="violet" />}
              {caseStudy.results && <Narrative label="// OUTCOME" body={caseStudy.results} color="magenta" />}
            </div>
          </div>
        </section>

        {/* Stylized creative panels */}
        <section className="border-b border-chrome-700/30 py-20">
          <div className="container mx-auto px-6 lg:px-10">
            <div className="flex items-center justify-between mb-8">
              <p className="y2k-mono text-[0.6875rem] uppercase tracking-[0.18em] text-holo-magenta">// CREATIVE_OUTPUT</p>
              <p className="y2k-mono text-[0.625rem] uppercase tracking-[0.18em] text-chrome-500">[ UNDER_NDA // REFS_ON_REQUEST ]</p>
            </div>
            <Panel grad={grad} tall title={caseStudy.title} metric={caseStudy.metrics?.[0]} />
            {caseStudy.metrics && caseStudy.metrics.length > 1 && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {caseStudy.metrics.slice(1).map((m, i) => <Panel key={i} grad={grad} metric={m} label={`ASSET_${String(i + 2).padStart(2, "0")}`} seed={i + 1} />)}
              </div>
            )}
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="border-b border-chrome-700/30 py-20">
            <div className="container mx-auto px-6 lg:px-10">
              <p className="y2k-mono text-[0.6875rem] uppercase tracking-[0.18em] text-holo-cyan mb-8">// RELATED_RECORDS</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {related.map((s) => (
                  <Link key={s.title} to={`/v3/case-study/${s.slug || titleToSlug(s.title)}`}
                    className="group block border border-chrome-700/40 hover:border-holo-cyan/60 p-6 transition-colors">
                    <p className="y2k-mono text-[0.625rem] uppercase tracking-[0.18em] text-chrome-500 mb-2">{s.category}</p>
                    <h3 className="y2k-display text-2xl text-chrome-50 group-hover:text-holo-cyan transition-colors leading-[0.95]">
                      <Glitch text={s.title} />
                    </h3>
                    <p className="text-chrome-400 text-sm mt-3 line-clamp-2">{s.description}</p>
                    <span className="mt-4 inline-flex items-center gap-2 y2k-mono text-xs uppercase tracking-[0.18em] text-chrome-300 group-hover:text-holo-cyan transition-colors">
                      &gt; /open <ArrowUpRight size={12} />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-24 md:py-32 text-center">
          <div className="container mx-auto px-6 lg:px-10">
            <p className="y2k-mono text-[0.6875rem] uppercase tracking-[0.18em] text-holo-cyan mb-6">// YOUR_TURN</p>
            <h2 className="y2k-display text-[clamp(2rem,6vw,5rem)] leading-[0.9] mb-10">
              <span className="block chrome-text">GOT A BRAND TO</span>
              <span className="block holo-text">SCALE PROFITABLY?</span>
            </h2>
            <button onClick={() => navigate("/v3#contact")} className="inline-flex items-center gap-3 bg-holo-cyan text-midnight px-7 py-4 hover:bg-chrome-50 transition-colors">
              <span className="y2k-mono text-xs uppercase tracking-[0.18em] font-bold">&gt; Initiate_Contact</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

const Field = ({ k, v }: { k: string; v: string }) => (
  <div>
    <p className="y2k-mono text-[0.625rem] uppercase tracking-[0.18em] text-chrome-500 mb-1.5">{k}</p>
    <p className="y2k-display text-lg md:text-xl text-chrome-100" style={{ fontVariationSettings: "'wdth' 85" }}>{v}</p>
  </div>
);

const Narrative = ({ label, body, color }: { label: string; body: string; color: "cyan" | "magenta" | "violet" }) => (
  <div>
    <p className={`y2k-mono text-[0.6875rem] uppercase tracking-[0.18em] mb-4 ${
      color === "cyan" ? "text-holo-cyan" : color === "violet" ? "text-violet-400" : "text-holo-magenta"
    }`}>{label}</p>
    <p className="text-chrome-200 text-xl md:text-2xl leading-[1.4]">{body}</p>
  </div>
);

const Panel = ({ grad, title, metric, label, tall, seed = 0 }: any) => (
  <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.7, delay: seed * 0.06, ease: [0.16, 1, 0.3, 1] }}
    className={`relative overflow-hidden border border-chrome-700/40 hover:border-holo-cyan/60 transition-colors duration-500 group ${tall ? "aspect-[16/8]" : "aspect-[4/3]"}`}
  >
    <div className="absolute inset-0" style={{ backgroundColor: "var(--v3-bg-2)" }} />
    <motion.div className={`absolute inset-0 bg-gradient-to-br ${grad}`}
      animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      style={{ backgroundSize: "200% 200%" }}
    />
    <div className="absolute inset-0 pointer-events-none" style={{
      backgroundImage: "repeating-linear-gradient(to bottom, transparent 0, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 3px)",
    }} />
    <div className="absolute inset-0 bg-gradient-to-t from-midnight/85 via-midnight/20 to-transparent" />
    <span aria-hidden className="absolute top-3 left-3 w-3 h-3 border-t border-l border-holo-cyan/60" />
    <span aria-hidden className="absolute top-3 right-3 w-3 h-3 border-t border-r border-holo-cyan/60" />
    <span aria-hidden className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-holo-cyan/60" />
    <span aria-hidden className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-holo-cyan/60" />
    <div className="relative h-full p-6 md:p-8 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="y2k-mono text-[0.625rem] uppercase tracking-[0.18em] text-chrome-100 bg-midnight/50 backdrop-blur-sm px-2 py-1">
          {label ?? "PRIMARY_ASSET"}
        </span>
        <span className="y2k-mono text-[0.625rem] uppercase tracking-[0.18em] text-holo-cyan">[NDA]</span>
      </div>
      <div>
        {title && (
          <p className={`y2k-display text-chrome-50 leading-[0.9] mb-3 ${tall ? "text-4xl md:text-6xl" : "text-2xl line-clamp-2"}`} style={{ fontVariationSettings: "'wdth' 85" }}>
            {title.toUpperCase()}
          </p>
        )}
        {metric && (
          <div className="flex items-baseline gap-3 mt-2">
            <span className={`y2k-display text-holo-cyan tabular leading-none ${tall ? "text-6xl md:text-8xl" : "text-3xl md:text-4xl"}`} style={{ fontVariationSettings: "'wdth' 85" }}>{metric.value}</span>
            <span className="y2k-mono text-[0.625rem] uppercase tracking-[0.18em] text-chrome-100">{metric.label}</span>
          </div>
        )}
      </div>
    </div>
  </motion.div>
);

export default CaseStudyDetailV3;
