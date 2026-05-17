import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform, animate } from "framer-motion";

// ─── Counter ─────────────────────────────────────────────────────────────
export const Counter = ({
  to,
  suffix = "",
  prefix = "",
  duration = 2,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(v),
    });
    return controls.stop;
  }, [inView, to, duration]);
  const display =
    to >= 1000
      ? Math.round(val).toLocaleString()
      : Number.isInteger(to)
        ? Math.round(val).toString()
        : val.toFixed(1);
  return (
    <span ref={ref} className="tabular">
      {prefix}{display}{suffix}
    </span>
  );
};

// ─── Magnetic ────────────────────────────────────────────────────────────
export const Magnetic = ({
  children,
  strength = 0.25,
  className = "",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.5 });
  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ─── Spotlight (cyan/magenta dual) ───────────────────────────────────────
export const HoloSpotlight = ({ size = 600 }: { size?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const sx = useSpring(x, { stiffness: 80, damping: 24 });
  const sy = useSpring(y, { stiffness: 80, damping: 24 });
  const bg = useTransform(
    [sx, sy],
    ([lx, ly]: number[]) =>
      `radial-gradient(${size}px at ${lx}px ${ly}px, rgba(34,211,238,0.22), rgba(236,72,153,0.10) 40%, transparent 75%)`
  );
  useEffect(() => {
    const el = ref.current?.parentElement;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      x.set(e.clientX - r.left);
      y.set(e.clientY - r.top);
    };
    const onLeave = () => { x.set(-1000); y.set(-1000); };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [x, y]);
  return (
    <motion.div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0"
      style={{ background: bg }}
    />
  );
};

// ─── Scroll progress (cyan) ──────────────────────────────────────────────
export const ScrollProgress = () => {
  const x = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 30 });
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      x.set(total > 0 ? window.scrollY / total : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [x]);
  return (
    <motion.div
      aria-hidden
      style={{ scaleX: sx, transformOrigin: "0% 50%" }}
      className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-holo-cyan via-holo-violet to-holo-magenta z-50"
    />
  );
};

// ─── Glitch text wrapper ─────────────────────────────────────────────────
export const Glitch: React.FC<React.HTMLAttributes<HTMLSpanElement> & {
  text: string;
}> = ({ text, className = "", ...rest }) => (
  <span data-text={text} className={`glitch ${className}`} {...rest}>
    {text}
  </span>
);

// ─── Chrome / window frame ───────────────────────────────────────────────
export const WindowFrame = ({
  title,
  children,
  className = "",
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`window-chrome ${className}`}>
    <div className="window-chrome-bar">
      <span className="window-dot bg-rose-400/80" />
      <span className="window-dot bg-amber-300/80" />
      <span className="window-dot bg-emerald-400/80" />
      {title && (
        <span className="ml-3 y2k-mono text-xs text-chrome-200">{title}</span>
      )}
    </div>
    <div>{children}</div>
  </div>
);

// ─── Reveal text word by word ────────────────────────────────────────────
export const Reveal = ({
  text,
  className = "",
  delay = 0,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: React.ElementType;
}) => {
  const words = text.split(" ");
  return (
    <Tag className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.9,
              delay: delay + i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
};
