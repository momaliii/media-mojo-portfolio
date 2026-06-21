import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useTransform, type PanInfo } from "framer-motion";
import { ArrowLeft, ArrowRight, Hand, Lock, ShieldCheck } from "lucide-react";
import { adCampaignScreenshots as fallback, type AdScreenshot } from "@/data/adScreenshots";
import { useAdScreenshots } from "@/hooks/use-ad-screenshots";
import { trackEvent } from "@/utils/analytics";

const SWIPE_THRESHOLD = 110;
const VISIBLE = 3; // cards rendered in the deck

const ProofCard: React.FC<{
  s: AdScreenshot;
  index: number;
  total: number;
  depth: number; // 0 = top
  active: boolean;
  onSwipe: (dir: 1 | -1) => void;
}> = ({ s, index, total, depth, active, onSwipe }) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-12, 0, 12]);
  const opacity = useTransform(x, [-300, -150, 0, 150, 300], [0, 1, 1, 1, 0]);
  const likeOpacity = useTransform(x, [40, 140], [0, 1]);
  const nopeOpacity = useTransform(x, [-140, -40], [1, 0]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x > SWIPE_THRESHOLD || info.velocity.x > 600) onSwipe(1);
    else if (info.offset.x < -SWIPE_THRESHOLD || info.velocity.x < -600) onSwipe(-1);
  };

  const baseY = depth * 18;
  const baseScale = 1 - depth * 0.06;
  const baseOpacity = depth === 0 ? 1 : depth < VISIBLE ? 0.55 - depth * 0.1 : 0;

  const preventCtx = (e: React.MouseEvent) => e.preventDefault();

  return (
    <motion.article
      className="absolute inset-0 rounded-[1.75rem] v3-shell overflow-hidden select-none"
      style={{
        x: active ? x : 0,
        rotate: active ? rotate : 0,
        opacity: active ? opacity : baseOpacity,
        zIndex: VISIBLE - depth,
        cursor: active ? "grab" : "default",
        userSelect: "none",
        WebkitUserSelect: "none",
        WebkitTouchCallout: "none",
      }}
      initial={{ y: baseY + 30, scale: baseScale - 0.05, opacity: 0 }}
      animate={{ y: baseY, scale: baseScale, opacity: baseOpacity }}
      exit={{ x: x.get() > 0 ? 600 : -600, opacity: 0, rotate: x.get() > 0 ? 18 : -18, transition: { duration: 0.35 } }}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
      drag={active ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.6}
      onDragEnd={onDragEnd}
      whileTap={active ? { cursor: "grabbing" } : undefined}
      onContextMenu={preventCtx}
      aria-hidden={!active}
    >
      <div className="relative w-full aspect-[16/10] bg-[var(--v3-bg-2)] flex items-center justify-center p-3 sm:p-4">
        <img
          src={s.url}
          alt={`${s.industry} ${s.platform || "ad"} campaign by ${s.client}`}
          draggable={false}
          loading={depth === 0 ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={depth === 0 ? "high" : "low"}
          className="relative z-0 max-w-full max-h-full w-auto h-auto object-contain rounded-lg shadow-[0_10px_30px_rgba(0,0,0,.45)] pointer-events-none"
        />
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <span className="-rotate-[22deg] text-white/20 text-base md:text-lg font-extrabold tracking-[0.35em] whitespace-nowrap drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
            MOHAMED ALI · MEDIA BUYER
          </span>
        </div>
        <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-black/40 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/40 to-transparent pointer-events-none z-10" />

        {/* Swipe hint badges */}
        {active && (
          <>
            <motion.div
              style={{ opacity: likeOpacity }}
              className="absolute top-5 right-5 z-40 rounded-lg border-2 border-[var(--v3-lime)] text-[var(--v3-lime)] px-3 py-1 text-xs font-extrabold uppercase tracking-[0.2em] rotate-12 bg-black/40 backdrop-blur"
            >
              Proof
            </motion.div>
            <motion.div
              style={{ opacity: nopeOpacity }}
              className="absolute top-5 left-5 z-40 rounded-lg border-2 border-white/60 text-white px-3 py-1 text-xs font-extrabold uppercase tracking-[0.2em] -rotate-12 bg-black/40 backdrop-blur"
            >
              Next
            </motion.div>
          </>
        )}

        {s.platform && (
          <div className="absolute top-3 left-3 z-30 rounded-full bg-black/70 backdrop-blur border border-white/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] font-bold text-white">
            {s.platform}
          </div>
        )}
        <div className="absolute top-3 right-3 z-30 grid place-items-center h-7 w-7 rounded-full bg-black/70 backdrop-blur border border-white/10 text-white/80">
          <Lock size={12} />
        </div>
        <div className="absolute bottom-3 left-3 z-30 v3-numeral text-xs font-bold text-white/80">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>
        <div className="absolute bottom-3 right-3 z-30 rounded-full bg-[var(--v3-lime)] text-[var(--v3-bg)] px-3 py-1 text-[10px] uppercase tracking-[0.16em] font-bold">
          {s.industry}
        </div>
      </div>

      <div className="p-5 md:p-6 flex flex-col gap-2">
        <h3 className="v3-display text-lg md:text-xl font-bold tracking-[-0.03em] text-white">
          {s.client}
        </h3>
        {s.details && (
          <p className="v3-numeral text-sm font-semibold v3-soft leading-relaxed">
            {s.details}
          </p>
        )}
      </div>
    </motion.article>
  );
};

const ProofDeck: React.FC = () => {
  const { data: dbRows } = useAdScreenshots();
  const screenshots = useMemo<AdScreenshot[]>(() => {
    if (dbRows && dbRows.length > 0) {
      return dbRows.map((r) => ({
        url: r.image_url,
        industry: r.industry,
        client: r.client,
        platform: (r.platform as AdScreenshot["platform"]) || undefined,
        details: r.details || undefined,
      }));
    }
    return fallback;
  }, [dbRows]);

  const [idx, setIdx] = useState(0);
  const total = screenshots.length;

  const advance = useCallback(
    (dir: 1 | -1) => {
      if (total === 0) return;
      setIdx((i) => (i + (dir === 1 ? 1 : total - 1)) % total);
      trackEvent("v3_proof_deck_swipe", { dir });
    },
    [total]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") advance(1);
      else if (e.key === "ArrowLeft") advance(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [advance]);

  if (total === 0) return null;

  // Build stack: top card + next VISIBLE-1 peeking behind
  const stack = Array.from({ length: Math.min(VISIBLE, total) }, (_, k) => {
    const i = (idx + k) % total;
    return { s: screenshots[i], i, depth: k };
  });

  return (
    <section
      id="proof-deck"
      className="relative py-14 sm:py-20 md:py-28 scroll-mt-24"
      aria-labelledby="proof-deck-heading"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-5 md:px-8 lg:px-10">
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start mb-10 md:mb-14">
          <div className="md:col-span-7">
            <p className="v3-eyebrow v3-lime mb-3 sm:mb-4">Proof · Swipeable receipts</p>
            <h2
              id="proof-deck-heading"
              className="v3-display text-3xl sm:text-4xl md:text-6xl font-bold leading-[1.05] tracking-[-0.04em] md:tracking-[-0.05em]"
            >
              Don't take my word — <span className="v3-glow-text">swipe the proof.</span>
            </h2>
            <p className="mt-4 sm:mt-5 max-w-xl v3-soft leading-relaxed text-sm sm:text-base">
              Drag, swipe, or use the arrows. Every card is a real screenshot from a live ad account — watermarked, never mocked.
            </p>
          </div>
          <div className="md:col-span-5 flex md:justify-end items-center gap-3">
            <span className="inline-flex items-center gap-2 v3-eyebrow v3-muted">
              <Hand size={14} className="v3-lime" /> Swipe / drag
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-center">
          {/* Deck */}
          <div className="relative mx-auto w-full max-w-[640px] aspect-[16/13]">
            <AnimatePresence initial={false} mode="popLayout">
              {stack.map((c) => (
                <ProofCard
                  key={c.i}
                  s={c.s}
                  index={c.i}
                  total={total}
                  depth={c.depth}
                  active={c.depth === 0}
                  onSwipe={advance}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex lg:flex-col items-center justify-center gap-4">
            <button
              onClick={() => advance(-1)}
              aria-label="Previous proof"
              className="grid h-12 w-12 place-items-center rounded-2xl v3-shell v3-link transition-transform hover:-translate-x-0.5 lg:hover:-translate-x-0 lg:hover:-translate-y-0.5"
            >
              <ArrowLeft size={18} />
            </button>
            <div className="v3-numeral text-sm font-bold text-white/80 tabular-nums min-w-[64px] text-center">
              {String(idx + 1).padStart(2, "0")}
              <span className="v3-muted"> / {String(total).padStart(2, "0")}</span>
            </div>
            <button
              onClick={() => advance(1)}
              aria-label="Next proof"
              className="grid h-12 w-12 place-items-center rounded-2xl v3-shell v3-link transition-transform hover:translate-x-0.5 lg:hover:translate-x-0 lg:hover:translate-y-0.5"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-12 relative h-1 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-[var(--v3-lime)] rounded-full"
            initial={false}
            animate={{ width: `${((idx + 1) / total) * 100}%` }}
            transition={{ type: "spring", stiffness: 200, damping: 28 }}
          />
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs uppercase tracking-[0.14em] v3-muted">
          <span className="inline-flex items-center gap-2">
            <ShieldCheck size={14} className="v3-lime" />
            Watermarked & protected
          </span>
          <span className="hidden sm:inline opacity-40">·</span>
          <span>Use ← → keys to navigate</span>
        </div>
      </div>
    </section>
  );
};

export default ProofDeck;
