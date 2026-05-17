import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowUpRight,
  ChevronRight,
  Share2,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import {
  useCaseStudyBySlug,
  usePublishedCaseStudies,
} from "@/hooks/use-case-studies";
import { motion } from "framer-motion";
import Navigation from "@/components/v2/Navigation";
import Footer from "@/components/v2/Footer";
import LazyImage from "@/components/ui/lazy-image";
import MetaTags from "@/components/MetaTags";

const titleToSlug = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const getCategoryName = (c: string): string => {
  const map: Record<string, string> = {
    "e-commerce": "E-commerce",
    "f&b": "F&B",
    ngo: "NGO",
    branding: "Events & Branding",
    b2b: "B2B",
    local: "Local Business",
    apps: "Mobile App",
    travel: "Travel",
  };
  return map[c] ?? c;
};

const CaseStudyDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data: caseStudy, isLoading } = useCaseStudyBySlug(slug);
  const { data: allCaseStudies = [] } = usePublishedCaseStudies();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-obsidian text-white">
        <Loader2 className="h-6 w-6 animate-spin text-gold" />
      </div>
    );
  }

  if (!caseStudy) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-obsidian text-white">
        <div className="text-center max-w-md">
          <p className="eyebrow text-gold mb-4">404 / Not Found</p>
          <h1 className="font-serif text-display-md text-white mb-6">
            That case study has been{" "}
            <span className="serif-italic text-gold">withdrawn</span>.
          </h1>
          <button
            onClick={() => navigate("/v2")}
            className="font-mono uppercase text-[0.6875rem] tracking-[0.22em] text-gold gold-underline"
          >
            Back to home →
          </button>
        </div>
      </div>
    );
  }

  const related = allCaseStudies
    .filter(
      (s) =>
        s.category === caseStudy.category &&
        (s.slug || titleToSlug(s.title)) !== slug
    )
    .slice(0, 2);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: caseStudy.title,
          text: `Case study — ${caseStudy.title}`,
          url,
        });
      } catch {
        /* user cancelled */
      }
    } else {
      navigator.clipboard.writeText(url);
    }
  };

  return (
    <>
      <MetaTags
        title={`${caseStudy.title} — Case Study`}
        description={caseStudy.description}
        url={`/v2/case-study/${slug}`}
      />
      <div className="v2-theme dark min-h-screen bg-obsidian text-white selection:bg-gold/30">
        <Navigation />

        {/* Hero */}
        <section className="relative pt-32 md:pt-40 pb-16 md:pb-24 border-b border-white/[0.06] grain">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-1/4 w-[36rem] h-[36rem] bg-gold/[0.05] rounded-full filter blur-[120px] -translate-y-1/2" />
          </div>
          <div className="container mx-auto px-6 lg:px-10 relative">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 font-mono uppercase text-[0.625rem] tracking-[0.22em] text-white/40 mb-12 md:mb-16"
            >
              <Link to="/v2" className="hover:text-gold gold-underline transition-colors">
                Home
              </Link>
              <ChevronRight size={12} />
              <Link to="/v2/case-studies" className="hover:text-gold gold-underline transition-colors">
                Work
              </Link>
              <ChevronRight size={12} />
              <span className="text-gold">{caseStudy.title}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-12 gap-10"
            >
              <div className="md:col-span-3">
                <p className="eyebrow text-gold mb-4">Case study</p>
                <p className="font-mono uppercase text-[0.6875rem] tracking-[0.22em] text-white/40">
                  {getCategoryName(caseStudy.category)}
                  {caseStudy.industry && ` / ${caseStudy.industry}`}
                </p>
              </div>
              <h1 className="md:col-span-9 font-serif text-display-xl text-white leading-[0.98]">
                {caseStudy.title}
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="md:ml-[25%] mt-10 md:mt-14 max-w-3xl font-serif text-2xl md:text-3xl text-white/75 leading-[1.3]"
            >
              {caseStudy.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 flex items-center gap-8"
            >
              <button
                onClick={() => navigate("/v2/case-studies")}
                className="group inline-flex items-center gap-2 text-white/60 hover:text-gold transition-colors gold-underline font-mono uppercase text-[0.6875rem] tracking-[0.22em]"
              >
                <ArrowLeft size={14} />
                Back to work
              </button>
              <button
                onClick={handleShare}
                className="group inline-flex items-center gap-2 text-white/60 hover:text-gold transition-colors gold-underline font-mono uppercase text-[0.6875rem] tracking-[0.22em]"
              >
                <Share2 size={14} />
                Share
              </button>
            </motion.div>
          </div>
        </section>

        {/* Key metrics */}
        <section className="border-b border-white/[0.06] py-16 md:py-24">
          <div className="container mx-auto px-6 lg:px-10">
            <p className="eyebrow text-gold mb-10">— Results</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
              {caseStudy.metrics.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="border-t border-white/[0.08] pt-8"
                >
                  <div className="font-serif text-7xl md:text-8xl text-gold tabular leading-[0.9]">
                    {m.value}
                  </div>
                  <div className="mt-4 font-mono uppercase text-[0.6875rem] tracking-[0.22em] text-white/50">
                    {m.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Brief / Strategy / Result */}
        <section className="py-20 md:py-28 border-b border-white/[0.06]">
          <div className="container mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
              <div className="md:col-span-4 space-y-12">
                <DetailBlock
                  label="Client"
                  value={caseStudy.client}
                />
                {caseStudy.budgetRange && (
                  <DetailBlock
                    label="Budget"
                    value={
                      caseStudy.budgetRange.charAt(0).toUpperCase() +
                      caseStudy.budgetRange.slice(1)
                    }
                  />
                )}
                {caseStudy.platforms && caseStudy.platforms.length > 0 && (
                  <DetailBlock
                    label="Platforms"
                    value={caseStudy.platforms
                      .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
                      .join(" · ")}
                  />
                )}
                {caseStudy.tools && caseStudy.tools.length > 0 && (
                  <DetailBlock
                    label="Stack"
                    value={caseStudy.tools.join(" · ")}
                  />
                )}
              </div>

              <div className="md:col-span-8 space-y-16">
                {caseStudy.challenge && (
                  <NarrativeBlock
                    eyebrow="— The brief"
                    body={caseStudy.challenge}
                  />
                )}
                {caseStudy.strategy && (
                  <NarrativeBlock
                    eyebrow="— Strategy"
                    body={caseStudy.strategy}
                  />
                )}
                {caseStudy.results && (
                  <NarrativeBlock eyebrow="— Outcome" body={caseStudy.results} />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        {caseStudy.screenshot && (
          <section className="py-20 md:py-28 border-b border-white/[0.06]">
            <div className="container mx-auto px-6 lg:px-10">
              <p className="eyebrow text-gold mb-10">— Gallery</p>
              <div className="overflow-hidden border border-white/[0.06]">
                <LazyImage
                  src={caseStudy.screenshot}
                  alt={`${caseStudy.title} — primary asset`}
                  className="w-full h-auto"
                />
              </div>
              {caseStudy.additionalScreenshots &&
                caseStudy.additionalScreenshots.length > 0 && (
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {caseStudy.additionalScreenshots.map((s, i) => (
                      <div
                        key={i}
                        className="overflow-hidden border border-white/[0.06] aspect-[4/3] bg-obsidian-900"
                      >
                        <LazyImage
                          src={s}
                          alt={`${caseStudy.title} — supporting asset ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
            </div>
          </section>
        )}

        {/* Related */}
        {related.length > 0 && (
          <section className="py-20 md:py-28 border-b border-white/[0.06]">
            <div className="container mx-auto px-6 lg:px-10">
              <p className="eyebrow text-gold mb-10">— Related work</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {related.map((s) => (
                  <Link
                    key={s.title}
                    to={`/v2/case-study/${s.slug || titleToSlug(s.title)}`}
                    className="group block border-t border-white/[0.08] hover:border-gold/40 transition-colors duration-700 pt-8"
                  >
                    <p className="font-mono uppercase text-[0.625rem] tracking-[0.22em] text-white/40 mb-3">
                      {getCategoryName(s.category)}
                    </p>
                    <h3 className="font-serif text-2xl md:text-3xl text-white group-hover:text-gold transition-colors duration-500">
                      {s.title}
                    </h3>
                    <p className="text-white/50 text-sm mt-3 line-clamp-2">
                      {s.description}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-white/60 group-hover:text-gold transition-colors font-mono uppercase text-[0.6875rem] tracking-[0.22em]">
                      Read <ArrowUpRight size={14} />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-28 md:py-40 grain">
          <div className="container mx-auto px-6 lg:px-10 text-center max-w-4xl">
            <p className="eyebrow text-gold mb-8">— Your turn</p>
            <h2 className="font-serif text-display-lg text-white leading-[1.02]">
              Got a brand to{" "}
              <span className="serif-italic text-gold">scale profitably</span>?
            </h2>
            <button
              onClick={() => navigate("/v2#contact")}
              className="mt-12 group inline-flex items-center gap-3 bg-gold text-obsidian px-8 py-4 hover:bg-champagne transition-all duration-500"
            >
              <span className="font-mono uppercase text-[0.6875rem] tracking-[0.22em] font-medium">
                Start a conversation
              </span>
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

const DetailBlock = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="font-mono uppercase text-[0.5625rem] tracking-[0.22em] text-white/40 mb-2">
      {label}
    </p>
    <p className="font-serif text-xl md:text-2xl text-white leading-tight">
      {value}
    </p>
  </div>
);

const NarrativeBlock = ({
  eyebrow,
  body,
}: {
  eyebrow: string;
  body: string;
}) => (
  <div>
    <p className="eyebrow text-gold mb-4">{eyebrow}</p>
    <p className="font-serif text-xl md:text-2xl text-white/85 leading-[1.4]">
      {body}
    </p>
  </div>
);

export default CaseStudyDetail;
