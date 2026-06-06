import React, { useCallback, useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import {
  ArrowLeft,
  ArrowRight,
  BarChart,
  Facebook,
  Globe,
  Linkedin,
  LineChart,
  Lock,
  Pause,
  Play,
  ShieldCheck,
} from "lucide-react";
import { adCampaignScreenshots, type AdScreenshot } from "@/data/adScreenshots";
import { trackEvent } from "@/utils/analytics";

import type { LucideIcon } from "lucide-react";

const platformStyle: Record<
  string,
  { label: string; Icon: LucideIcon; dot: string }
> = {
  LinkedIn: { label: "LinkedIn", Icon: Linkedin, dot: "#38d8ff" },
  META: { label: "Meta Ads", Icon: Facebook, dot: "#b6ff4d" },
  Facebook: { label: "Facebook", Icon: Facebook, dot: "#b6ff4d" },
  Analytics: { label: "Analytics", Icon: LineChart, dot: "#b6ff4d" },
  Lightfunnel: { label: "Lightfunnel", Icon: BarChart, dot: "#8b5cf6" },
  Instagram: { label: "Instagram", Icon: Facebook, dot: "#ff7a1a" },
};

const ShowcaseCard: React.FC<{ s: AdScreenshot; index: number; active: boolean }> = ({
  s,
  index,
  active,
}) => {
  const platform = s.platform ? platformStyle[s.platform] : undefined;
  const preventCtx = useCallback((e: React.MouseEvent) => e.preventDefault(), []);

  return (
    <article
      className={`group relative h-full rounded-[1.75rem] v3-shell overflow-hidden flex flex-col transition-all duration-500 ${
        active
          ? "ring-1 ring-[var(--v3-lime)]/40 shadow-[0_30px_80px_-20px_rgba(182,255,77,.25)]"
          : "hover:ring-1 hover:ring-[var(--v3-lime)]/25"
      }`}
    >
      {/* Screenshot frame */}
      <div
        className="relative h-56 sm:h-64 md:h-72 lg:h-80 overflow-hidden bg-[var(--v3-bg-2)]"
        onContextMenu={preventCtx}
        style={{ userSelect: "none" }}
        role="img"
        aria-label={`${s.client} ${s.platform || ""} campaign for ${s.industry}`}
      >
        <img
          src={s.url}
          alt={`${s.industry} ${s.platform || "ad"} campaign by ${s.client}`}
          loading="lazy"
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110 select-none"
          style={{ pointerEvents: "none" }}
        />

        {/* Top fade for legibility */}
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="px-6 py-2 -rotate-[22deg] text-white/70 text-base md:text-lg font-bold tracking-[0.3em] bg-black/15 backdrop-blur-[1px]">
            MOHAMED ALI · MEDIA BUYER
          </span>
        </div>

        {/* Platform chip top-left */}
        {platform && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] font-bold text-white">
            <platform.Icon size={12} aria-hidden />
            <span>{platform.label}</span>
          </div>
        )}

        {/* Lock top-right */}
        <div
          className="absolute top-3 right-3 grid place-items-center h-7 w-7 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/80"
          aria-hidden
        >
          <Lock size={12} />
        </div>

        {/* Index numeral */}
        <div className="absolute bottom-3 left-3 v3-numeral text-xs font-bold text-white/60">
          {String(index + 1).padStart(2, "0")} / {adCampaignScreenshots.length}
        </div>

        {/* Industry chip bottom-right */}
        <div className="absolute bottom-3 right-3 rounded-full bg-[var(--v3-lime)] text-[var(--v3-bg)] px-3 py-1 text-[10px] uppercase tracking-[0.16em] font-bold">
          {s.industry}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col gap-3 p-5 md:p-6">
        <h3 className="v3-display text-lg md:text-xl font-bold leading-tight tracking-[-0.03em] text-white group-hover:text-[var(--v3-lime)] transition-colors">
          {s.client}
        </h3>
        {s.details && (
          <p className="v3-numeral text-sm font-semibold v3-soft leading-relaxed">
            {s.details}
          </p>
        )}
        <div className="mt-auto pt-4 border-t v3-rule flex items-center justify-between">
          <span className="v3-eyebrow v3-muted">Live ad account</span>
          <span className="inline-flex items-center gap-1 v3-eyebrow text-[var(--v3-lime)]">
            Proof <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </article>
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

  const stats = [
    { value: "EGP 18M+", label: "Tracked revenue" },
    { value: "5", label: "Ad platforms" },
    { value: "22", label: "Live screenshots" },
  ];

  return (
    <section
      id="ad-showcase"
      className="relative py-14 sm:py-20 md:py-28 scroll-mt-24"
      aria-labelledby="ad-showcase-heading"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-5 md:px-8 lg:px-10">
        {/* Header */}
        <div className="grid md:grid-cols-12 gap-6 sm:gap-8 md:gap-10 items-start md:items-end mb-10 sm:mb-12 md:mb-16">
          <div className="md:col-span-7">
            <p className="v3-eyebrow v3-lime mb-3 sm:mb-4">Receipts · Live ad accounts</p>
            <h2
              id="ad-showcase-heading"
              className="v3-display text-3xl sm:text-4xl md:text-6xl font-bold leading-[1.05] md:leading-[1] tracking-[-0.04em] md:tracking-[-0.05em]"
            >
              Ad campaign <span className="v3-glow-text">showcase.</span>
            </h2>
            <p className="mt-4 sm:mt-5 max-w-xl v3-soft leading-relaxed text-sm sm:text-base">
              Real screenshots from Meta, LinkedIn, Lightfunnel & analytics
              dashboards across MENA & global accounts. Watermarked, never mocked.
            </p>
          </div>

          <div className="md:col-span-5 flex flex-col gap-4 sm:gap-5">
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="v3-shell rounded-xl sm:rounded-2xl px-2 sm:px-3 py-3 sm:py-4 text-center"
                >
                  <div className="v3-numeral text-sm sm:text-lg md:text-xl font-bold text-[var(--v3-lime)] leading-tight">
                    {s.value}
                  </div>
                  <div className="v3-eyebrow v3-muted mt-1 text-[0.55rem] sm:text-[0.6rem]">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between md:justify-end gap-2">
              <button
                onClick={togglePlay}
                className="inline-flex items-center gap-2 rounded-xl sm:rounded-2xl v3-shell px-3 sm:px-4 py-2.5 sm:py-3 text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] v3-link"
                aria-label={playing ? "Pause autoplay" : "Play autoplay"}
              >
                {playing ? <Pause size={14} /> : <Play size={14} />}
                {playing ? "Pause" : "Play"}
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => embla?.scrollPrev()}
                  className="grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-xl v3-shell v3-link"
                  aria-label="Previous"
                >
                  <ArrowLeft size={16} />
                </button>
                <button
                  onClick={() => embla?.scrollNext()}
                  className="grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-xl v3-shell v3-link"
                  aria-label="Next"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-4 sm:-ml-5">
            {adCampaignScreenshots.map((s, i) => (
              <div
                key={i}
                className="pl-4 sm:pl-5 shrink-0 grow-0 basis-[85%] sm:basis-1/2 lg:basis-1/3 transition-opacity duration-500"
                role="group"
                aria-roledescription="slide"
                aria-label={`Slide ${i + 1} of ${adCampaignScreenshots.length}`}
              >
                <ShowcaseCard s={s} index={i} active={selected === i} />
              </div>
            ))}
          </div>
        </div>

        {/* Progress dots */}
        <div className="mt-10 flex items-center justify-center gap-2">
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

        {/* Footer note */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs uppercase tracking-[0.14em] v3-muted">
          <span className="inline-flex items-center gap-2">
            <ShieldCheck size={14} className="v3-lime" />
            Images watermarked & protected
          </span>
          <span className="hidden sm:inline opacity-40">·</span>
          <span className="inline-flex items-center gap-2">
            <Globe size={14} className="v3-lime" />
            KSA · Egypt · Turkey · Pakistan · Tunisia · Oman
          </span>
        </div>
      </div>
    </section>
  );
};

export default AdCampaignShowcase;
