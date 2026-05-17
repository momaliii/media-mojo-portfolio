
import React from "react";
import { Button } from "@/components/ui/button";
import HeroStats from "./HeroStats";
import { ArrowRight, FileText } from "lucide-react";
import { motion } from "framer-motion";

const HeroContent = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.15 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
  };

  return (
    <motion.div
      className="space-y-8 max-w-2xl"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item} className="flex items-center gap-3">
        <span className="inline-flex h-2 w-2 rounded-full bg-media-cyan animate-pulse" />
        <span className="eyebrow text-white/70">
          Mohamed Ali · Senior Media Buyer
        </span>
      </motion.div>

      <motion.h1
        id="hero-heading"
        variants={item}
        className="text-display-2xl font-display text-white"
      >
        I scale DTC &amp; e-commerce brands across{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-media-vibrantpurple via-media-cyan to-media-vibrantpurple">
          Meta, TikTok &amp; Google
        </span>
        .
      </motion.h1>

      <motion.p
        variants={item}
        className="text-lg md:text-xl text-white/70 leading-relaxed max-w-xl"
      >
        6+ years optimizing paid media for brands in 10+ countries. 95K+ orders
        generated, 8x+ ROAS on flagship campaigns — across Meta, TikTok, Google,
        LinkedIn, and Snapchat.
      </motion.p>

      <motion.div
        variants={item}
        className="flex flex-col sm:flex-row gap-3"
      >
        <Button
          onClick={() =>
            document
              .getElementById("portfolio")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          size="lg"
          className="bg-white text-media-ink hover:bg-white/90 font-semibold shadow-lg shadow-black/20 group"
        >
          See Case Studies
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Button>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white backdrop-blur-sm"
        >
          <a href="/Mohamed_Ali_CV.pdf" target="_blank" rel="noopener noreferrer">
            <FileText className="mr-2 h-4 w-4" />
            Download CV
          </a>
        </Button>
      </motion.div>

      <motion.div variants={item}>
        <HeroStats />
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
