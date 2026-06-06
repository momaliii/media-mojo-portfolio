import React, { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Navigation from "@/components/v3/Navigation";
import Footer from "@/components/v3/Footer";
import { caseStudies } from "@/data/caseStudies";
import { trackPageView } from "@/utils/analytics";
import "@/styles/v3/v3-theme.css";

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const CaseStudyDetailV3 = () => {
  const { slug } = useParams();

  const study = useMemo(
    () => caseStudies.find((c) => (c.slug || slugify(c.title)) === slug),
    [slug]
  );

  useEffect(() => {
    if (study) {
      document.title = `${study.title} · Case Study — v3`;
      trackPageView(`/v3/case-study/${slug}`, document.title);
    }
  }, [study, slug]);

  if (!study) {
    return (
      <div className="v3-theme min-h-screen">
        <Navigation />
        <main className="pt-40 pb-24 max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
          <p className="v3-eyebrow text-[var(--v3-muted)] mb-4">404</p>
          <h1 className="v3-serif text-5xl md:text-7xl">Case study not found.</h1>
          <Link to="/v3/case-studies" className="v3-link mt-8 inline-block">
            ← Back to the archive
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="v3-theme min-h-screen">
      <Navigation />
      <main className="pt-28 md:pt-36 pb-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Link
            to="/v3/case-studies"
            className="inline-flex items-center gap-2 v3-eyebrow text-[var(--v3-muted)] hover:text-[var(--v3-accent)] mb-12"
          >
            <ArrowLeft size={14} /> The Archive
          </Link>

          <header className="border-b v3-rule pb-12 mb-16">
            <div className="flex flex-wrap gap-4 v3-eyebrow text-[var(--v3-muted)] mb-6">
              <span>{study.category}</span>
              {study.industry && <span>· {study.industry}</span>}
              <span>· {study.client}</span>
            </div>
            <h1 className="v3-serif text-5xl md:text-8xl leading-[0.92] tracking-[-0.025em]">
              {study.title.split(" ").map((w, i, arr) => (
                <span key={i} className={i === arr.length - 1 ? "v3-italic v3-accent" : ""}>
                  {w}
                  {i < arr.length - 1 ? " " : ""}
                </span>
              ))}
            </h1>
            <p className="mt-8 max-w-2xl text-xl leading-relaxed text-[var(--v3-ink-2)]">
              {study.description}
            </p>
          </header>

          {/* Metrics ribbon */}
          <div className="grid grid-cols-2 md:grid-cols-3 border-t border-b v3-rule divide-x divide-[var(--v3-rule)] mb-20">
            {study.metrics.map((m) => (
              <div key={m.label} className="py-8 px-6">
                <div className="v3-numeral text-5xl md:text-7xl leading-none">{m.value}</div>
                <div className="v3-eyebrow text-[var(--v3-muted)] mt-3">{m.label}</div>
              </div>
            ))}
          </div>

          {study.screenshot && (
            <figure className="mb-20">
              <img
                src={study.screenshot}
                alt={study.title}
                className="w-full h-auto border v3-rule"
                loading="lazy"
              />
            </figure>
          )}

          <div className="grid grid-cols-12 gap-8 md:gap-16">
            <aside className="col-span-12 md:col-span-3 md:sticky md:top-28 self-start space-y-8">
              {study.budgetRange && (
                <div className="border-t v3-rule pt-4">
                  <p className="v3-eyebrow text-[var(--v3-muted)]">Budget</p>
                  <p className="v3-serif text-2xl mt-2">{study.budgetRange}</p>
                </div>
              )}
              {study.platforms && (
                <div className="border-t v3-rule pt-4">
                  <p className="v3-eyebrow text-[var(--v3-muted)]">Platforms</p>
                  <ul className="mt-2 space-y-1 v3-serif text-xl">
                    {study.platforms.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              )}
              {study.tools && (
                <div className="border-t v3-rule pt-4">
                  <p className="v3-eyebrow text-[var(--v3-muted)]">Stack</p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {study.tools.map((t) => (
                      <li
                        key={t}
                        className="text-xs uppercase tracking-[0.18em] px-2 py-1 border v3-rule"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>

            <article className="col-span-12 md:col-span-8 md:col-start-5 space-y-12 text-lg leading-[1.75] text-[var(--v3-ink-2)]">
              {study.challenge && (
                <section>
                  <p className="v3-eyebrow text-[var(--v3-accent)] mb-3">§ The Challenge</p>
                  <p className="v3-serif text-2xl md:text-3xl leading-snug text-[var(--v3-ink)]">
                    {study.challenge}
                  </p>
                </section>
              )}
              {study.strategy && (
                <section>
                  <p className="v3-eyebrow text-[var(--v3-accent)] mb-3">§ The Strategy</p>
                  <p>{study.strategy}</p>
                </section>
              )}
              {study.results && (
                <section>
                  <p className="v3-eyebrow text-[var(--v3-accent)] mb-3">§ The Results</p>
                  <p>{study.results}</p>
                </section>
              )}
            </article>
          </div>

          <div className="mt-24 pt-12 border-t v3-rule flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <p className="v3-serif text-3xl md:text-4xl max-w-xl">
              Got a brand that needs <span className="v3-italic v3-accent">numbers</span> like
              these?
            </p>
            <Link
              to="/v3#contact"
              className="group inline-flex items-center gap-3 px-6 py-4 bg-[var(--v3-ink)] text-[var(--v3-paper)] hover:bg-[var(--v3-accent)] transition-colors"
            >
              <span className="v3-eyebrow">Commission a strategy</span>
              <ArrowUpRight size={18} className="group-hover:rotate-12 transition-transform" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CaseStudyDetailV3;
