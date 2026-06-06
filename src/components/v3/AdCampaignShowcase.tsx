import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play, ShieldCheck, Globe } from "lucide-react";
import { adCampaignScreenshots, type AdScreenshot } from "@/data/adScreenshots";
import { trackEvent } from "@/utils/analytics";

const parseMetrics = (s: AdScreenshot): { label: string; value: string }[] => {
  if (!s.details) return [];
  return s.details.split("|").map((chunk) => {
    const t = chunk.trim();
    const m = t.match(/^([\d.,KMkm%+$€£]+(?:\s?[A-Z]{2,3})?)\s+(.+)$/);
    if (m) return { value: m[1], label: m[2] };
    return { value: t, label: "" };
  });
};

const ShowcaseCard: React.FC<{ s: AdScreenshot }> = ({ s }) => {
  const metrics = parseMetrics(s);
  const platforms = [s.platform, s.industry].filter(Boolean) as string[];
  const preventCtx = (e: React.MouseEvent) => e.preventDefault();

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="group h-full w-full bg-[#0B0F0E] rounded-[2.5rem] p-4 border border-white/5 shadow-2xl flex flex-col transition-all duration-500 hover:border-[var(--v3-lime)]/20"
    >
      {/* Uncropped screenshot frame */}
      <div className="relative bg-[#141918] rounded-[1.75rem] border border-white/10 p-4 aspect-[4/3] flex items-center justify-center overflow-hidden transition-colors group-hover:bg-[#1a2120]">
        <div className="absolute top-5 left-5 flex gap-1.5 z-10">
          <div className="w-1.5 h-1.5 rounded-full bg-white/15" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/15" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/15" />
        </div>

        <div className="w-full h-full p-2 flex items-center justify-center">
          <img
            src={s.url}
            alt={`${s.client} — ${s.industry} ${s.platform || "ad"} campaign`}
            loading="lazy"
            onContextMenu={preventCtx}
            draggable={false}
            className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg shadow-[0_12px_40px_rgba(0,0,0,0.4)] transition-transform duration-700 group-hover:scale-[1.03] select-none"
          />
        </div>

        <div className="absolute top-5 right-5 flex gap-2 z-10">
          {s.platform && (
            <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-md text-[9px] font-bold text-[var(--v3-cyan)] tracking-[0.15em] uppercase">
              {s.platform}
            </span>
          )}
          <span className="px-2.5 py-1 bg-[var(--v3-lime)]/10 backdrop-blur-md border border-[var(--v3-lime)]/20 rounded-md text-[9px] font-bold text-[var(--v3-lime)] tracking-[0.15em] uppercase">
            {s.industry}
          </span>
        </div>
      </div>

      {/* Content + metrics */}
      <div className="px-4 pt-8 pb-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-8 gap-4">
          <div className="min-w-0">
            <h3 className="v3-display text-2xl font-bold text-white tracking-tight leading-tight truncate">
              {s.client}
            </h3>
            <p className="text-sm v3-soft mt-1">
              {platforms.join(" · ") || "Performance campaign"}
            </p>
          </div>
          <div className="p-2.5 bg-white/5 rounded-full shrink-0">
            <ArrowUpRight size={18} className="text-[var(--v3-lime)]" />
          </div>
        </div>

        {metrics.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-8 gap-y-8">
            {metrics.slice(0, 4).map((m, i) => (
              <div key={i} className="flex flex-col gap-2">
                <span className="text-[10px] v3-muted font-bold uppercase tracking-[0.2em] leading-none">
                  {m.label || "Metric"}
                </span>
                <span
                  className={`v3-numeral text-2xl md:text-3xl font-bold tracking-tighter ${
                    i === 0 ? "text-[var(--v3-lime)]" : "text-white"
                  }`}
                >
                  {m.value}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <span className="text-[10px] v3-muted font-bold uppercase tracking-[0.2em] leading-none">
              Campaign
            </span>
            <span className="text-white text-base font-semibold">
              Live performance creative
            </span>
          </div>
        )}

        <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2 group/btn cursor-pointer">
            <span className="text-[10px] font-bold v3-soft uppercase tracking-[0.15em] group-hover/btn:text-[var(--v3-lime)] transition-colors">
              Live ad account
            </span>
            <ArrowRight
              size={14}
              className="text-white/30 group-hover/btn:translate-x-1 group-hover/btn:text-[var(--v3-lime)] transition-all"
            />
          </div>
          <span className="text-[10px] font-mono text-white/20">
            {s.industry.toUpperCase()}
          </span>
        </div>
      </div>
    </motion.article>
  );
};

const AdCampaignShowcase: React.FC = () => {
  const autoplay = useRef(
    Autoplay({ delay: 3600, stopOnInteraction: false, stopOnMouseEnter: true })
  );
  const [emblaRef, embla] = useEmblaCarousel(
    { loop: true, align: "start", dragFree: false },
    [autoplay.current]
  );
  const [selected, setSelected] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => setSelected(embla.selectedScrollSnap());
    embla.on("select", onSelect);
    onSelect();
    return () => {
      embla.off("select", onSelect);
    };
  }, [embla]);

  const togglePlay = () => {
    const ap = autoplay.current;
    if (!ap) return;
    if (playing) ap.stop();
    else ap.play();
    setPlaying(!playing);
    trackEvent("v3_ad_showcase_toggle_autoplay", { enabled: !playing });
  };

  return (
    <section
      id="ad-showcase"
      className="relative py-20 md:py-28"
      aria-labelledby="ad-showcase-heading"
    >
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
          <div>
            <p className="v3-eyebrow v3-lime mb-4">Live from the ad accounts</p>
            <h2
              id="ad-showcase-heading"
              className="v3-display text-4xl md:text-6xl font-bold leading-[1] tracking-[-0.05em]"
            >
              Ad campaign <span className="v3-glow-text">showcase.</span>
            </h2>
            <p className="mt-5 max-w-xl v3-soft leading-relaxed">
              Real, uncropped screenshots from Meta, LinkedIn & analytics dashboards
              across MENA & global accounts. No mockups.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="inline-flex items-center gap-2 rounded-2xl v3-shell px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] v3-link"
              aria-label={playing ? "Pause autoplay" : "Play autoplay"}
            >
              {playing ? <Pause size={14} /> : <Play size={14} />}
              {playing ? "Pause" : "Play"}
            </button>
            <button
              onClick={() => embla?.scrollPrev()}
              className="grid h-11 w-11 place-items-center rounded-xl v3-shell v3-link"
              aria-label="Previous"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={() => embla?.scrollNext()}
              className="grid h-11 w-11 place-items-center rounded-xl v3-shell v3-link"
              aria-label="Next"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-5">
            {adCampaignScreenshots.map((s, i) => (
              <div
                key={i}
                className="pl-5 shrink-0 grow-0 basis-full sm:basis-1/2 xl:basis-1/3"
                role="group"
                aria-roledescription="slide"
              >
                <ShowcaseCard s={s} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          {adCampaignScreenshots.map((_, i) => (
            <button
              key={i}
              onClick={() => embla?.scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                selected === i
                  ? "w-8 bg-[var(--v3-lime)]"
                  : "w-1.5 bg-[var(--v3-muted)]/40 hover:bg-[var(--v3-muted)]"
              }`}
            />
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs uppercase tracking-[0.14em] v3-muted">
          <span className="inline-flex items-center gap-2">
            <ShieldCheck size={14} className="v3-lime" />
            Images are protected
          </span>
          <span className="hidden sm:inline opacity-40">·</span>
          <span className="inline-flex items-center gap-2">
            <Globe size={14} className="v3-lime" />
            KSA · Turkey · Pakistan · Tunisia · Oman
          </span>
        </div>
      </div>
    </section>
  );
};

export default AdCampaignShowcase;
