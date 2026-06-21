import React, { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Navigation from "@/components/v3/Navigation";
import Footer from "@/components/v3/Footer";
import MetaTags from "@/components/MetaTags";
import { caseStudies } from "@/data/caseStudies";
import { trackPageView } from "@/utils/analytics";
import "@/styles/v3/v3-theme.css";

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const SITE = "https://media-mojo-portfolio.lovable.app";

const CaseStudyDetailV3 = () => {
  const { slug } = useParams();

  const study = useMemo(
    () => caseStudies.find((c) => (c.slug || slugify(c.title)) === slug),
    [slug]
  );

  useEffect(() => {
    if (study) {
      trackPageView(`/v3/case-study/${slug}`, `${study.title} · Case Study`);
    }
  }, [study, slug]);


  if (!study) {
    return (
      <div className="v3-theme min-h-screen">
        <MetaTags
          title="Case study not found · Mohamed Ali"
          description="This case study could not be found. Browse the full archive of media buying case studies."
          url={`/v3/case-study/${slug ?? ""}`}
        />
        <Helmet><meta name="robots" content="noindex, follow" /></Helmet>
        <Navigation />
        <main className="pt-40 pb-24 max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10 text-center">
          <p className="v3-eyebrow v3-muted mb-4">404</p>
          <h1 className="v3-display text-5xl md:text-7xl font-bold">Case study not found.</h1>
          <Link to="/v3/case-studies" className="v3-link mt-8 inline-block">
            ← Back to the archive
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const canonicalPath = `/v3/case-study/${slug}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.title,
    description: study.description,
    image: study.screenshot ? `${SITE}${study.screenshot}` : undefined,
    author: { "@type": "Person", name: "Mohamed Ali" },
    publisher: {
      "@type": "Organization",
      name: "Mohamed Ali Media Buyer",
    },
    mainEntityOfPage: `${SITE}${canonicalPath}`,
    about: study.industry || study.category,
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/v3` },
      { "@type": "ListItem", position: 2, name: "Case Studies", item: `${SITE}/v3/case-studies` },
      { "@type": "ListItem", position: 3, name: study.title, item: `${SITE}${canonicalPath}` },
    ],
  };


  return (
    <div className="v3-theme min-h-screen">
      <MetaTags
        title={`${study.title} · Case Study — Mohamed Ali`}
        description={study.description}
        url={canonicalPath}
        type="article"
        imageUrl={study.screenshot || undefined}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>
      <Navigation />
      <main className="relative pt-28 md:pt-36 pb-24 overflow-hidden">
        <div className="absolute inset-0 v3-grid-bg" aria-hidden="true" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">
          <Link
            to="/v3/case-studies"
            className="inline-flex items-center gap-2 rounded-full v3-shell px-4 py-2 text-sm font-bold v3-link mb-8"
          >
            <ArrowLeft size={14} /> Archive
          </Link>

          <header className="v3-shell rounded-[2rem] p-6 md:p-10 mb-8 md:mb-12">
            <div className="flex flex-wrap gap-4 v3-eyebrow v3-muted mb-6">
              <span>{study.category}</span>
              {study.industry && <span>· {study.industry}</span>}
              <span>· {study.client}</span>
            </div>
            <h1 className="v3-display text-4xl md:text-7xl font-bold leading-[0.98] tracking-[-0.055em]">
              {study.title}
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-relaxed v3-soft">
              {study.description}
            </p>
          </header>

          {/* Metrics ribbon */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12 md:mb-16">
            {study.metrics.map((m) => (
              <div key={m.label} className="v3-shell rounded-[1.5rem] p-5 md:p-7">
                <div className="v3-numeral text-4xl md:text-6xl font-bold leading-none">{m.value}</div>
                <div className="v3-eyebrow v3-muted mt-3">{m.label}</div>
              </div>
            ))}
          </div>


          <div className="grid grid-cols-12 gap-8 md:gap-16">
            <aside className="col-span-12 md:col-span-3 md:sticky md:top-28 self-start space-y-8">
              {study.budgetRange && (
                <div className="v3-shell rounded-2xl p-5">
                  <p className="v3-eyebrow v3-muted">Budget</p>
                  <p className="text-2xl font-bold mt-2">{study.budgetRange}</p>
                </div>
              )}
              {study.platforms && (
                <div className="v3-shell rounded-2xl p-5">
                  <p className="v3-eyebrow v3-muted">Platforms</p>
                  <ul className="mt-3 space-y-1 font-bold">
                    {study.platforms.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              )}
              {study.tools && (
                <div className="v3-shell rounded-2xl p-5">
                  <p className="v3-eyebrow v3-muted">Stack</p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {study.tools.map((t) => (
                      <li
                        key={t}
                        className="text-xs uppercase tracking-[0.14em] px-2 py-1 rounded-full bg-white/5"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>

            <article className="col-span-12 md:col-span-8 md:col-start-5 space-y-5 text-lg leading-[1.75] v3-soft">
              {study.challenge && (
                <section className="v3-shell rounded-[1.7rem] p-6 md:p-8">
                  <p className="v3-eyebrow v3-orange mb-3">The Challenge</p>
                  <p className="v3-display text-2xl md:text-3xl font-bold leading-snug text-[var(--v3-text)] tracking-[-0.04em]">
                    {study.challenge}
                  </p>
                </section>
              )}
              {study.strategy && (
                <section className="v3-shell rounded-[1.7rem] p-6 md:p-8">
                  <p className="v3-eyebrow v3-cyan mb-3">The Strategy</p>
                  <p>{study.strategy}</p>
                </section>
              )}
              {study.results && (
                <section className="v3-shell rounded-[1.7rem] p-6 md:p-8">
                  <p className="v3-eyebrow v3-lime mb-3">The Results</p>
                  <p>{study.results}</p>
                </section>
              )}
            </article>
          </div>

          <div className="mt-20 v3-shell rounded-[1.7rem] p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <p className="v3-display text-2xl md:text-4xl font-bold max-w-xl tracking-[-0.04em]">
              Need numbers like these?
            </p>
            <Link
              to="/v3#contact"
              className="group inline-flex items-center gap-3 rounded-2xl px-6 py-4 bg-[var(--v3-lime)] text-[var(--v3-bg)] font-bold hover:shadow-[0_0_42px_rgba(182,255,77,.35)] transition-shadow"
            >
              <span>Commission a strategy</span>
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
