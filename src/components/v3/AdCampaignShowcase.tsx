import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, Pause, Play, ShieldCheck, Globe } from "lucide-react";
import { adCampaignScreenshots } from "@/data/adScreenshots";
import { trackEvent } from "@/utils/analytics";

const AdCampaignShowcase: React.FC = () => {
  const autoplay = useRef(
    Autoplay({ delay: 3200, stopOnInteraction: false, stopOnMouseEnter: true })
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

  const preventCtx = (e: React.MouseEvent) => e.preventDefault();

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
              Real screenshots from Meta, LinkedIn & analytics dashboards across MENA &
              global accounts. No mockups.
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
          <div className="flex -ml-4">
            {adCampaignScreenshots.map((s, i) => (
              <div
                key={i}
                className="pl-4 shrink-0 grow-0 basis-full sm:basis-1/2 lg:basis-1/3"
                role="group"
                aria-roledescription="slide"
                aria-label={`${s.client} ${s.platform || ""} ${s.industry}`}
              >
                <motion.article
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5 }}
                  className="group v3-shell rounded-[1.7rem] overflow-hidden h-full flex flex-col"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[var(--v3-bg)]">
                    <img
                      src={s.url}
                      alt={`${s.client} — ${s.industry} ${s.platform || "ad"} campaign`}
                      loading="lazy"
                      onContextMenu={preventCtx}
                      draggable={false}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 select-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    {s.platform && (
                      <span className="absolute top-3 left-3 rounded-full bg-[var(--v3-lime)] text-[var(--v3-bg)] px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em]">
                        {s.platform}
                      </span>
                    )}
                    <span className="absolute top-3 right-3 rounded-full bg-black/60 backdrop-blur px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-white">
                      {s.industry}
                    </span>
                  </div>
                  <div className="p-5 md:p-6 flex-1 flex flex-col">
                    <h3 className="v3-display text-lg md:text-xl font-bold leading-tight tracking-[-0.03em] group-hover:text-[var(--v3-lime)] transition-colors">
                      {s.client}
                    </h3>
                    {s.details && (
                      <p className="mt-2 v3-numeral text-sm font-semibold v3-soft">
                        {s.details}
                      </p>
                    )}
                  </div>
                </motion.article>
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
