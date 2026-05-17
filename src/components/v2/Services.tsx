import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { expertServices } from "@/components/services/ExpertServicesData";

const Services = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section
      id="services"
      className="relative bg-obsidian text-white border-t border-white/[0.06] grain overflow-hidden"
      aria-labelledby="services-heading"
    >
      {/* Gold dust at top */}
      <div
        aria-hidden
        className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
      />
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-[20%] right-[5%] w-[40rem] h-[40rem] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(212,175,55,0.06), transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{ x: [0, -30, 20, 0], y: [0, 20, -30, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-10 py-28 md:py-40 relative">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-20 md:mb-28">
          <div className="md:col-span-3">
            <p className="eyebrow text-gold mb-4">— 02</p>
            <p className="font-mono uppercase text-[0.6875rem] tracking-[0.22em] text-white/40">
              Capabilities / Services
            </p>
          </div>
          <motion.h2
            id="services-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-9 font-serif text-display-lg text-white leading-[1.02]"
          >
            Six disciplines.{" "}
            <span className="serif-italic text-gold">One</span> outcome —
            paid acquisition that pays for itself.
          </motion.h2>
        </div>

        {/* Accordion-style services list */}
        <div>
          {expertServices.map((service, i) => {
            const Icon = service.icon;
            const isOpen = openIdx === i;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.9,
                  delay: i * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`group border-t border-white/[0.08] hover:border-gold/40 transition-colors duration-700 ${
                  isOpen ? "border-gold/40" : ""
                }`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full text-left py-10 md:py-12 group/btn"
                  aria-expanded={isOpen}
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
                    <div className="md:col-span-2 flex items-baseline gap-4">
                      <span
                        className={`font-serif text-5xl md:text-6xl tabular leading-none transition-all duration-500 ${
                          isOpen ? "text-gold scale-110" : "text-gold/40 group-hover/btn:text-gold/60"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <Icon
                        className={`-mt-2 transition-colors duration-500 ${
                          isOpen ? "text-gold" : "text-gold/60 group-hover/btn:text-gold"
                        }`}
                        size={18}
                      />
                    </div>
                    <h3
                      className={`md:col-span-7 font-serif text-3xl md:text-4xl leading-[1.1] tracking-tight transition-all duration-500 ${
                        isOpen ? "text-gold translate-x-1" : "text-white group-hover/btn:text-gold"
                      }`}
                    >
                      {service.title}
                    </h3>
                    <div className="md:col-span-3 flex items-start justify-end">
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className={`inline-flex items-center justify-center w-10 h-10 rounded-full border transition-colors ${
                          isOpen ? "border-gold text-gold" : "border-white/20 text-white/40 group-hover/btn:border-gold/40 group-hover/btn:text-gold"
                        }`}
                      >
                        <Plus size={16} strokeWidth={1.5} />
                      </motion.span>
                    </div>
                  </div>
                </button>

                {/* Expanded panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12">
                        <div className="md:col-span-2" />
                        <div className="md:col-span-7">
                          <p className="text-white/70 text-lg leading-relaxed mb-8">
                            {service.description}
                          </p>
                          {service.features && service.features.length > 0 && (
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                              {service.features.map((f, j) => (
                                <motion.li
                                  key={j}
                                  initial={{ opacity: 0, x: -8 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{
                                    duration: 0.5,
                                    delay: 0.1 + j * 0.06,
                                    ease: [0.16, 1, 0.3, 1],
                                  }}
                                  className="flex items-start gap-3 text-white/80"
                                >
                                  <span className="mt-2 inline-block w-1.5 h-1.5 bg-gold/70 shrink-0" />
                                  <span className="font-sans text-sm">{f}</span>
                                </motion.li>
                              ))}
                            </ul>
                          )}
                        </div>
                        <div className="md:col-span-3 hidden md:flex items-end justify-end">
                          <Icon className="text-gold/20" size={120} strokeWidth={0.8} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
          <div className="border-t border-white/[0.08]" />
        </div>
      </div>
    </section>
  );
};

export default Services;
