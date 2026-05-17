import React from "react";
import { Linkedin } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-obsidian border-t border-white/[0.06] grain">
      <div className="container mx-auto px-6 lg:px-10 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 mb-20">
          <div className="md:col-span-5">
            <p className="eyebrow text-gold mb-6">Mohamed Ali</p>
            <p className="font-serif text-3xl md:text-4xl text-white leading-[1.15] mb-8 max-w-md">
              Performance marketing,
              <br />
              <span className="serif-italic text-gold">crafted</span> — not
              configured.
            </p>
            <p className="text-white/60 text-sm leading-relaxed max-w-md">
              Senior media buyer for ambitious DTC, e-commerce, and B2B brands.
              Based in Cairo, working across 10 countries.
            </p>
          </div>

          <div className="md:col-span-4">
            <p className="eyebrow text-white/40 mb-6">Direct</p>
            <ul className="space-y-4 text-white/80">
              <li>
                <a
                  href="mailto:mhmd167ali@gmail.com"
                  className="font-serif text-2xl md:text-3xl gold-underline hover:text-gold transition-colors"
                >
                  mhmd167ali@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/+201060098267"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-serif text-2xl md:text-3xl gold-underline hover:text-gold transition-colors"
                >
                  +20 106 009 8267
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow text-white/40 mb-6">Elsewhere</p>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://www.linkedin.com/in/mhmdali02/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/70 hover:text-gold transition-colors gold-underline"
                >
                  <Linkedin size={14} />
                  <span className="font-mono uppercase text-[0.6875rem] tracking-[0.22em]">
                    LinkedIn
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="/Mohamed_Ali_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-gold transition-colors gold-underline font-mono uppercase text-[0.6875rem] tracking-[0.22em]"
                >
                  Resume (PDF) ↓
                </a>
              </li>
              <li className="font-mono uppercase text-[0.6875rem] tracking-[0.22em] text-white/40">
                Cairo · GMT+2
              </li>
            </ul>
          </div>
        </div>

        {/* Big mark */}
        <div
          aria-hidden
          className="font-serif text-[clamp(5rem,18vw,16rem)] leading-none text-white/[0.04] tracking-tighter select-none mb-16 -mx-6 lg:-mx-10 text-center overflow-hidden whitespace-nowrap"
        >
          Mohamed Ali
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8 border-t border-white/[0.06]">
          <p className="font-mono uppercase text-[0.625rem] tracking-[0.22em] text-white/40">
            © {year} Mohamed Ali · All rights reserved
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-mono uppercase text-[0.625rem] tracking-[0.22em] text-white/40 hover:text-gold transition-colors flex items-center gap-2"
          >
            ↑ Back to top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
