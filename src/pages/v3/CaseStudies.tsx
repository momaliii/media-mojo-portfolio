import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Navigation from "@/components/v3/Navigation";
import Footer from "@/components/v3/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";
import { caseStudies } from "@/data/caseStudies";
import { trackPageView } from "@/utils/analytics";
import "@/styles/v3/v3-theme.css";

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const CaseStudiesV3 = () => {
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    document.title = "Case Studies · Mohamed Ali — v3";
    trackPageView("/v3/case-studies", document.title);
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
      <main className="pt-28 md:pt-36 pb-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <header className="border-b v3-rule pb-12 mb-12">
            <p className="v3-eyebrow text-[var(--v3-accent)] mb-6">The Archive — Vol. I</p>
            <h1 className="v3-serif text-6xl md:text-8xl leading-[0.92] tracking-[-0.025em]">
              Every campaign, <br />
              <span className="v3-italic">on the record</span>.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-[var(--v3-ink-2)]">
              A working archive of selected engagements — what was spent, what was learned,
              what was earned.
            </p>
          </header>

          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`v3-eyebrow px-4 py-2 border v3-rule transition-colors ${
                  filter === c
                    ? "bg-[var(--v3-ink)] text-[var(--v3-paper)] border-[var(--v3-ink)]"
                    : "hover:border-[var(--v3-ink)]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <ErrorBoundary>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--v3-rule)] border v3-rule">
              {items.map((cs, i) => {
                const slug = cs.slug || slugify(cs.title);
                return (
                  <li key={slug} className="bg-[var(--v3-paper)]">
                    <Link
                      to={`/v3/case-study/${slug}`}
                      className="group block p-8 md:p-12 h-full hover:bg-[var(--v3-paper-2)] transition-colors"
                    >
                      <div className="flex items-baseline justify-between mb-8">
                        <span className="v3-numeral text-2xl text-[var(--v3-muted)]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="v3-eyebrow text-[var(--v3-muted)]">
                          {cs.category}
                        </span>
                      </div>
                      <h2 className="v3-serif text-3xl md:text-5xl leading-[1.02] tracking-[-0.02em] group-hover:v3-italic group-hover:text-[var(--v3-accent)] transition-all">
                        {cs.title}
                      </h2>
                      <p className="mt-6 text-[var(--v3-ink-2)] leading-relaxed line-clamp-3">
                        {cs.description}
                      </p>
                      <div className="mt-8 pt-6 border-t v3-rule flex flex-wrap gap-6">
                        {cs.metrics.slice(0, 3).map((m) => (
                          <div key={m.label}>
                            <div className="v3-numeral text-2xl leading-none">{m.value}</div>
                            <div className="v3-eyebrow text-[var(--v3-muted)] mt-1">
                              {m.label}
                            </div>
                          </div>
                        ))}
                        <ArrowUpRight
                          size={22}
                          className="ml-auto text-[var(--v3-muted)] group-hover:text-[var(--v3-accent)] group-hover:rotate-12 transition-all"
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
