import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Navigation from "@/components/v3/Navigation";
import Footer from "@/components/v3/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";
import MetaTags from "@/components/MetaTags";
import { caseStudies } from "@/data/caseStudies";
import { trackPageView } from "@/utils/analytics";
import "@/styles/v3/v3-theme.css";

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const CaseStudiesV3 = () => {
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    trackPageView("/v3/case-studies", "Case Studies · Mohamed Ali — Editorial Edition");
  }, []);


  const categories = useMemo(() => {
    const set = new Set(caseStudies.map((c) => c.category));
    return ["all", ...Array.from(set)];
  }, []);

  const items = useMemo(
    () =>
      filter === "all" ? caseStudies : caseStudies.filter((c) => c.category === filter),
    [filter]
  );

  return (
    <div className="v3-theme min-h-screen">
      <Navigation />
      <main className="relative pt-28 md:pt-36 pb-24 overflow-hidden">
        <div className="absolute inset-0 v3-grid-bg" aria-hidden="true" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">
          <header className="v3-shell rounded-[2rem] p-6 md:p-10 mb-10 md:mb-12">
            <p className="v3-eyebrow v3-lime mb-6">Performance archive</p>
            <h1 className="v3-display text-5xl md:text-7xl font-bold leading-[0.96] tracking-[-0.055em]">
              Case studies built for <span className="v3-glow-text">proof.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed v3-soft">
              A working archive of selected engagements — what was spent, what was learned,
              what was earned.
            </p>
          </header>

          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`v3-eyebrow px-4 py-2 rounded-full border v3-rule transition-colors ${
                  filter === c
                    ? "bg-[var(--v3-lime)] text-[var(--v3-bg)] border-[var(--v3-lime)]"
                    : "v3-shell hover:border-[var(--v3-lime)]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <ErrorBoundary>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map((cs, i) => {
                const slug = cs.slug || slugify(cs.title);
                return (
                  <li key={slug}>
                    <Link
                      to={`/v3/case-study/${slug}`}
                      className="group block v3-shell v3-card-hover rounded-[1.7rem] p-6 md:p-8 h-full"
                    >
                      <div className="flex items-baseline justify-between mb-8">
                        <span className="v3-numeral text-2xl font-bold v3-muted">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="rounded-full bg-[var(--v3-cyan)]/10 px-3 py-1 text-xs font-bold text-[var(--v3-cyan)]">
                          {cs.category}
                        </span>
                      </div>
                      <h2 className="v3-display text-3xl md:text-4xl font-bold leading-[1.05] tracking-[-0.045em] group-hover:text-[var(--v3-lime)] transition-colors">
                        {cs.title}
                      </h2>
                      <p className="mt-5 v3-soft leading-relaxed line-clamp-3">
                        {cs.description}
                      </p>
                      <div className="mt-8 pt-6 border-t v3-rule flex flex-wrap gap-6">
                        {cs.metrics.slice(0, 3).map((m) => (
                          <div key={m.label}>
                            <div className="v3-numeral text-3xl font-bold leading-none">{m.value}</div>
                            <div className="v3-eyebrow v3-muted mt-1">
                              {m.label}
                            </div>
                          </div>
                        ))}
                        <ArrowUpRight
                          size={22}
                          className="ml-auto text-[var(--v3-muted)] group-hover:text-[var(--v3-lime)] group-hover:rotate-12 transition-all"
                        />
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </ErrorBoundary>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CaseStudiesV3;
