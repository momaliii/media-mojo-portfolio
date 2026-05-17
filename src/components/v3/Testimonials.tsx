import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { WindowFrame } from "./_primitives";

const data = [
  {
    quote: "Mohamed turned a stagnant Meta account into our most reliable channel. Within two quarters we were running profitably at 5×+ ROAS and scaling spend monthly.",
    role: "Marketing Director",
    company: "Beauty DTC brand",
    region: "Riyadh, KSA",
  },
  {
    quote: "He treats the ad budget like it's his own. Tight CAC targets, real creative cadence, and weekly reporting an exec can actually read.",
    role: "Founder",
    company: "F&B e-commerce",
    region: "Cairo / Kuwait City",
  },
  {
    quote: "Rare to find a media buyer who's equally strong on Meta and TikTok and who understands the funnel from CTR to LTV. He delivered.",
    role: "Head of Growth",
    company: "Apparel DTC",
    region: "London, UK",
  },
];

const Testimonials = () => (
  <section id="testimonials" className="relative border-t border-chrome-700/30 scanlines" style={{ backgroundColor: "var(--v3-bg)" }}>
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute top-[20%] right-0 w-[40rem] h-[40rem] rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(34,211,238,0.10), transparent 70%)", filter: "blur(80px)" }}
        animate={{ x: [0, -30, 20, 0], y: [0, 20, -30, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[10%] left-0 w-[35rem] h-[35rem] rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(236,72,153,0.10), transparent 70%)", filter: "blur(80px)" }}
        animate={{ x: [0, 30, -20, 0], y: [0, -20, 30, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>

    <div className="relative container mx-auto px-6 lg:px-10 py-24 md:py-32">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 md:mb-20">
        <div className="md:col-span-3">
          <p className="y2k-mono text-[0.6875rem] uppercase tracking-[0.18em] text-holo-cyan mb-3">// 03_TRANSMISSIONS</p>
          <p className="y2k-mono text-[0.625rem] uppercase tracking-[0.18em] text-chrome-500">[ INCOMING_LOGS ]</p>
        </div>
        <h2 className="md:col-span-9 y2k-display text-[clamp(2rem,5vw,4.5rem)] leading-[0.95] text-chrome-50">
          <span className="block chrome-text">TRUSTED WITH</span>
          <span className="block holo-text">7-FIGURE BUDGETS.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <WindowFrame title={`MSG_${String(i + 1).padStart(3, "0")}.txt`}>
              <div className="p-6 relative">
                <Quote size={42} className="absolute top-4 right-4 text-holo-cyan/15" strokeWidth={1} />
                <p className="text-chrome-100 text-base leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-8 pt-4 border-t border-chrome-700/40">
                  <p className="y2k-mono text-xs uppercase tracking-[0.18em] text-holo-cyan">
                    /{t.role.toLowerCase().replace(/\s+/g, "_")}
                  </p>
                  <p className="text-chrome-300 text-sm mt-1">{t.company}</p>
                  <p className="y2k-mono text-[0.625rem] uppercase tracking-[0.18em] text-chrome-500 mt-1">
                    @ {t.region}
                  </p>
                </div>
              </div>
            </WindowFrame>
          </motion.div>
        ))}
      </div>

      <p className="mt-12 y2k-mono text-[0.625rem] uppercase tracking-[0.18em] text-chrome-500 max-w-2xl">
        // CLIENT_NAMES_WITHHELD_UNDER_NDA · REFERENCES_AVAILABLE_ON_REQUEST
      </p>
    </div>
  </section>
);

export default Testimonials;
