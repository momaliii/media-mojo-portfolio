import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { expertServices } from "@/components/services/ExpertServicesData";

const Services = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="services" className="relative border-t border-chrome-700/30 scanlines" style={{ backgroundColor: "var(--v3-bg-2)" }}>
      <div className="absolute inset-0 v3-grid opacity-30 pointer-events-none" />

      <div className="relative container mx-auto px-6 lg:px-10 py-24 md:py-32">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 md:mb-20">
          <div className="md:col-span-3">
            <p className="y2k-mono text-[0.6875rem] uppercase tracking-[0.18em] text-holo-magenta mb-3">
              // 02_CAPABILITIES
            </p>
          </div>
          <h2 className="md:col-span-9 y2k-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.85] text-chrome-50">
            <span className="block chrome-text">SIX MODULES.</span>
            <span className="block holo-text">ONE OUTCOME.</span>
          </h2>
        </div>

        {/* Accordion list */}
        <div>
          {expertServices.map((service, i) => {
            const Icon = service.icon;
            const isOpen = openIdx === i;
            return (
              <div
                key={service.title}
                className={`border-t border-chrome-700/40 transition-colors duration-500 ${isOpen ? "border-holo-cyan/60" : "hover:border-chrome-500"}`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full text-left py-8 md:py-10"
                  aria-expanded={isOpen}
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
                    <div className="md:col-span-2 flex items-center gap-3">
                      <span className={`y2k-mono text-xs ${isOpen ? "text-holo-cyan" : "text-chrome-500"}`}>/MOD_{String(i + 1).padStart(2, "0")}</span>
                      <Icon size={16} className={isOpen ? "text-holo-cyan" : "text-chrome-500"} />
                    </div>
                    <h3 className={`md:col-span-7 y2k-display text-2xl md:text-4xl leading-[0.95] transition-colors duration-500 ${
                      isOpen ? "holo-text" : "text-chrome-50 group-hover:text-holo-cyan"
                    }`}>
                      {service.title.toUpperCase()}
                    </h3>
                    <div className="md:col-span-3 flex md:justify-end">
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className={`inline-flex items-center justify-center w-9 h-9 border transition-colors ${
                          isOpen ? "border-holo-cyan text-holo-cyan" : "border-chrome-700 text-chrome-400"
                        }`}
                      >
                        <Plus size={14} />
                      </motion.span>
                    </div>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 pb-10">
                        <div className="md:col-span-2" />
                        <div className="md:col-span-7">
                          <p className="text-chrome-300 text-base leading-relaxed mb-6">{service.description}</p>
                          {service.features && (
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                              {service.features.map((f, j) => (
                                <li key={j} className="flex items-start gap-2 y2k-mono text-xs text-chrome-300">
                                  <span className="text-holo-cyan mt-0.5">»</span>
                                  <span className="uppercase tracking-[0.05em]">{f}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                        <div className="md:col-span-3 hidden md:flex items-end justify-end">
                          <Icon size={100} className="text-holo-cyan/20" strokeWidth={0.8} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
          <div className="border-t border-chrome-700/40" />
        </div>
      </div>
    </section>
  );
};

export default Services;
