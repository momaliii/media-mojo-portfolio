import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { usePublishedCaseStudies } from "@/hooks/use-case-studies";
import PortfolioHeader from "@/components/portfolio/PortfolioHeader";
import EnhancedFilterTabs from "@/components/portfolio/EnhancedFilterTabs";

const Portfolio = () => {
  const [filter, setFilter] = useState("all");
  const { data: caseStudies = [] } = usePublishedCaseStudies();

  return (
    <section
      id="work"
      className="relative bg-obsidian text-white border-t border-white/[0.06] grain"
      aria-labelledby="portfolio-heading"
    >
      <div className="container mx-auto px-6 lg:px-10 py-28 md:py-40">
        <PortfolioHeader />

        <EnhancedFilterTabs
          filter={filter}
          setFilter={setFilter}
          caseStudies={caseStudies}
        />

        <div className="mt-20 md:mt-28 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <Link to="/case-studies" className="group inline-flex items-center gap-3 border border-gold/40 hover:border-gold px-7 py-4 transition-all">
            <span className="font-mono uppercase text-[0.6875rem] tracking-[0.22em] text-gold">
              View the full index
            </span>
            <ArrowUpRight
              size={16}
              className="text-gold transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>

          <a
            href="/Mohamed_Ali_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono uppercase text-[0.6875rem] tracking-[0.22em] text-white/60 hover:text-gold gold-underline transition-colors"
          >
            Download PDF portfolio ↓
          </a>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
