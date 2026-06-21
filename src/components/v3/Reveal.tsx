import React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
  amount?: number;
};

/**
 * Lightweight scroll-triggered reveal for v3.
 * Honors prefers-reduced-motion automatically.
 */
const Reveal: React.FC<RevealProps> = ({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
  amount = 0.18,
}) => {
  const prefersReduced = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  const variants: Variants = prefersReduced
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
        },
      };

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px", amount }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
};

export default Reveal;
