import React, { useState } from "react";
import CaseStudyCard from "@/components/v2/portfolio/CaseStudyCard";
import { CaseStudy } from "@/data/caseStudies";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface EnhancedFilterTabsProps {
  filter: string;
  setFilter: (value: string) => void;
  caseStudies: CaseStudy[];
}

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "e-commerce", label: "E-commerce" },
  { id: "f&b", label: "F&B" },
  { id: "ngo", label: "NGO" },
  { id: "branding", label: "Branding" },
];

const EnhancedFilterTabs = ({
  filter,
  setFilter,
  caseStudies,
}: EnhancedFilterTabsProps) => {
  const [search, setSearch] = useState("");

  const filtered = caseStudies.filter((s) => {
    const catMatch = filter === "all" || s.category === filter;
    const q = search.trim().toLowerCase();
    const searchMatch =
      !q ||
      s.title.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.industry?.toLowerCase().includes(q) ||
      s.client.toLowerCase().includes(q);
    return catMatch && searchMatch;
  });

  return (
    <div className="space-y-12">
      {/* Filter bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`font-mono uppercase text-[0.6875rem] tracking-[0.22em] transition-colors gold-underline ${
                filter === cat.id ? "text-gold" : "text-white/50 hover:text-white"
              }`}
            >
              {cat.label}
              {filter === cat.id && (
                <span className="ml-2 tabular text-gold/60">
                  ({filtered.length})
                </span>
              )}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-64">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
          />
          <Input
            placeholder="Search work..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-transparent border-white/10 text-white placeholder:text-white/30 rounded-none focus-visible:ring-gold/40 focus-visible:border-gold/40"
          />
        </div>
      </div>

      {/* List */}
      <AnimatePresence mode="wait">
        <motion.div
          key={filter + search}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4 }}
          className="-mt-4"
        >
          {filtered.length > 0 ? (
            <>
              {filtered.map((study, index) => (
                <CaseStudyCard
                  key={study.title + index}
                  study={study}
                  index={index}
                />
              ))}
              <div className="border-t border-white/[0.08]" />
            </>
          ) : (
            <div className="py-24 text-center">
              <p className="font-serif text-2xl text-white/40 italic">
                No work matches that filter.
              </p>
              <button
                onClick={() => {
                  setFilter("all");
                  setSearch("");
                }}
                className="mt-6 font-mono uppercase text-[0.6875rem] tracking-[0.22em] text-gold gold-underline"
              >
                Reset filters
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default EnhancedFilterTabs;
