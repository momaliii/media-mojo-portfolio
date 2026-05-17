import React from "react";
import { Linkedin, Terminal, Activity } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-chrome-700/40 scanlines" style={{ backgroundColor: "var(--v3-bg-2)" }}>
      <div className="absolute inset-0 v3-grid opacity-50 pointer-events-none" />

      <div className="relative container mx-auto px-6 lg:px-10 py-20">
        {/* Status bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-12 pb-4 border-b border-chrome-700/30 y2k-mono text-[0.6875rem] text-chrome-400">
          <div className="flex items-center gap-2">
            <Activity size={11} className="text-holo-cyan animate-pulse" />
            <span>CONNECTION: STABLE</span>
            <span className="text-chrome-700">·</span>
            <span>LATENCY: 24ms</span>
          </div>
          <span>BUILD v3.0.{year} // RETRO-FUTURE</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <Terminal size={18} className="text-holo-cyan" />
              <span className="y2k-display text-2xl chrome-text" style={{ fontVariationSettings: "'wdth' 85" }}>
                MOHAMED_ALI.EXE
              </span>
            </div>
            <p className="y2k-display text-4xl text-chrome-100 leading-[0.95] mb-6 max-w-md" style={{ fontVariationSettings: "'wdth' 85" }}>
              PAID MEDIA<br /><span className="holo-text">DECODED.</span>
            </p>
            <p className="text-chrome-400 text-sm leading-relaxed max-w-md">
              Senior media buyer for ambitious DTC, e-commerce, and B2B brands. Cairo · 10 countries.
            </p>
          </div>

          {/* Direct */}
          <div className="md:col-span-4">
            <p className="y2k-mono text-[0.6875rem] uppercase tracking-[0.18em] text-holo-cyan mb-5">// DIRECT_LINES</p>
            <ul className="space-y-3">
              <li>
                <a href="mailto:mhmd167ali@gmail.com" className="group block">
                  <p className="y2k-mono text-[0.625rem] text-chrome-500 uppercase tracking-[0.18em] mb-0.5">email</p>
                  <p className="y2k-display text-xl text-chrome-100 group-hover:text-holo-cyan transition-colors" style={{ fontVariationSettings: "'wdth' 85" }}>
                    mhmd167ali@gmail.com
                  </p>
                </a>
              </li>
              <li>
                <a href="https://wa.me/+201060098267" target="_blank" rel="noopener noreferrer" className="group block">
                  <p className="y2k-mono text-[0.625rem] text-chrome-500 uppercase tracking-[0.18em] mb-0.5">whatsapp</p>
                  <p className="y2k-display text-xl text-chrome-100 group-hover:text-holo-magenta transition-colors" style={{ fontVariationSettings: "'wdth' 85" }}>
                    +20 106 009 8267
                  </p>
                </a>
              </li>
            </ul>
          </div>

          {/* Elsewhere */}
          <div className="md:col-span-3">
            <p className="y2k-mono text-[0.6875rem] uppercase tracking-[0.18em] text-holo-magenta mb-5">// NODES</p>
            <ul className="space-y-3">
              <li>
                <a href="https://www.linkedin.com/in/mhmdali02/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-chrome-300 hover:text-holo-cyan transition-colors y2k-mono text-xs uppercase tracking-[0.18em]">
                  <Linkedin size={12} />
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="/Mohamed_Ali_CV.pdf" target="_blank" rel="noopener noreferrer" className="text-chrome-300 hover:text-holo-cyan transition-colors y2k-mono text-xs uppercase tracking-[0.18em]">
                  resume.pdf ↓
                </a>
              </li>
              <li className="y2k-mono text-xs uppercase tracking-[0.18em] text-chrome-500 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                ONLINE · CAI · GMT+2
              </li>
            </ul>
          </div>
        </div>

        {/* Giant masthead */}
        <div className="border-t border-chrome-700/30 pt-12 overflow-hidden">
          <div
            aria-hidden
            className="y2k-display chrome-text text-[clamp(4rem,18vw,18rem)] leading-[0.85] tracking-tighter select-none -mx-6 lg:-mx-10 text-center"
            style={{ fontVariationSettings: "'wdth' 75" }}
          >
            MOHAMED ALI
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pt-6 border-t border-chrome-700/30 y2k-mono text-[0.6875rem] text-chrome-500">
          <span>© {year} MOHAMED_ALI // ALL RIGHTS RESERVED</span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="hover:text-holo-cyan transition-colors"
          >
            ↑ /scroll_to_top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
