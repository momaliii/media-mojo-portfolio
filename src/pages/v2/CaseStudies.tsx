import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ChevronRight, ArrowLeft, Download } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/v2/Navigation";
import Footer from "@/components/v2/Footer";
import EnhancedFilterTabs from "@/components/v2/portfolio/EnhancedFilterTabs";
import { usePublishedCaseStudies } from "@/hooks/use-case-studies";
import { trackPageView, trackEvent } from "@/utils/analytics";

const CaseStudies = () => {
  const [filter, setFilter] = useState("all");
  const { data: caseStudies = [] } = usePublishedCaseStudies();

  useEffect(() => {
    trackPageView("/case-studies", "Selected Work — Mohamed Ali");
  }, []);

  const totalProjects = caseStudies.length;
  const totalClients = new Set(caseStudies.map((s) => s.client)).size;
  const totalIndustries = new Set(
    caseStudies.map((s) => s.industry).filter(Boolean)
  ).size;

  return (
    <>
      <Helmet>
        <title>Selected Work — Mohamed Ali, Senior Media Buyer</title>
        <meta
          name="description"
          content={`The complete index of ${totalProjects} campaigns across DTC, F&B, NGO, and B2B.`}
        />
        <link
          rel="canonical"
          href={`${typeof window !== "undefined" ? window.location.origin : ""}/case-studies`}
        />
      </Helmet>

      <div className="v2-theme dark min-h-screen bg-obsidian text-white selection:bg-gold/30">
        <Navigation />

        <section className="relative pt-32 md:pt-40 pb-20 border-b border-white/[0.06] grain">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/3 w-[40rem] h-[40rem] bg-gold/[0.05] rounded-full filter blur-[120px] -translate-y-1/2" />
          </div>

          <div className="container mx-auto px-6 lg:px-10 relative">
            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-white/40 mb-16"
              aria-label="Breadcrumb"
            >
              <Link
                to="/v2"
                className="hover:text-gold gold-underline transition-colors"
              >
                Home
              </Link>
              <ChevronRight size={12} />
              <span className="text-gold">Work</span>
            </motion.nav>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
              <div className="md:col-span-3">
                <p className="eyebrow text-gold mb-4">— Index</p>
                <p className="font-mono uppercase text-[0.6875rem] tracking-[0.22em] text-white/40">
                  {totalProjects} campaigns / {totalClients} clients /{" "}
                  {totalIndustries} verticals
                </p>
              </div>
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="md:col-span-9 font-serif text-display-xl text-white leading-[0.98]"
              >
                Selected work.{" "}
                <span className="serif-italic text-gold">All of it</span> — in
                one place.
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="mt-16 flex flex-col sm:flex-row items-start sm:items-center gap-6"
            >
              <Link to="/v2" className="group inline-flex items-center gap-2 text-white/60 hover:text-gold transition-colors gold-underline font-mono uppercase text-[0.6875rem] tracking-[0.22em]">
                <ArrowLeft size={14} />
                Back to home
              </Link>
              <a
                href="/Mohamed_Ali_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("download_portfolio", {
                    source: "case_studies_page",
                    total_projects: totalProjects,
                  })
                }
                className="group inline-flex items-center gap-2 border border-gold/40 hover:border-gold px-6 py-3 transition-all"
              >
                <span className="font-mono uppercase text-[0.6875rem] tracking-[0.22em] text-gold">
                  Download full PDF
                </span>
                <Download size={14} className="text-gold" />
              </a>
            </motion.div>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="container mx-auto px-6 lg:px-10">
            <EnhancedFilterTabs
              filter={filter}
              setFilter={setFilter}
              caseStudies={caseStudies}
            />
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default CaseStudies;
