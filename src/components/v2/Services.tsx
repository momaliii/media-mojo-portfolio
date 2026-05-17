import React from "react";
import { motion } from "framer-motion";
import { expertServices } from "@/components/services/ExpertServicesData";

const Services = () => {
  return (
    <section
      id="services"
      className="relative bg-obsidian text-white border-t border-white/[0.06] grain"
      aria-labelledby="services-heading"
    >
      <div className="container mx-auto px-6 lg:px-10 py-28 md:py-40">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-20 md:mb-28">
          <div className="md:col-span-3">
            <p className="eyebrow text-gold mb-4">— 02</p>
            <p className="font-mono uppercase text-[0.6875rem] tracking-[0.22em] text-white/40">
              Capabilities / Services
            </p>
          </div>
          <h2
            id="services-heading"
            className="md:col-span-9 font-serif text-display-lg text-white leading-[1.02]"
          >
            Six disciplines.{" "}
            <span className="serif-italic text-gold">One</span> outcome —
            paid acquisition that pays for itself.
          </h2>
        </div>

        {/* Services list */}
        <div>
          {expertServices.map((service, i) => {
            const Icon = service.icon;
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
                className="group border-t border-white/[0.08] py-10 md:py-14 hover:border-gold/40 transition-colors duration-700"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
                  <div className="md:col-span-2 flex items-baseline gap-4">
                    <span className="font-serif text-5xl md:text-6xl text-gold/40 tabular leading-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Icon
                      className="text-gold/60 group-hover:text-gold transition-colors duration-500 -mt-2"
                      size={18}
                    />
                  </div>
                  <h3 className="md:col-span-4 font-serif text-3xl md:text-4xl text-white leading-[1.1] tracking-tight group-hover:text-gold transition-colors duration-500">
                    {service.title}
                  </h3>
                  <p className="md:col-span-5 text-white/60 text-base leading-relaxed">
                    {service.description}
                  </p>
                  <div className="md:col-span-1 flex md:justify-end">
                    <span className="font-mono uppercase text-[0.625rem] tracking-[0.22em] text-white/30 group-hover:text-gold transition-colors duration-500">
                      ↗
                    </span>
                  </div>
                </div>
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
