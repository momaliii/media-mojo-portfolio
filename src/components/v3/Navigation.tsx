import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Sparkles, X } from "lucide-react";

const links = [
  { href: "#work", label: "Work", id: "work" },
  { href: "#services", label: "Services", id: "services" },
  { href: "#about", label: "About", id: "about" },
  { href: "#contact", label: "Contact", id: "contact" },
];

const Navigation = ({ activeSection }: { activeSection?: string }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-3 pt-3">
      <div
        className={`max-w-6xl mx-auto flex items-center justify-between p-2 px-3 md:px-4 rounded-2xl border border-white/10 transition-all duration-500 ${
          scrolled
            ? "bg-white/[0.04] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
            : "bg-white/[0.025] backdrop-blur-md shadow-none"
        }`}
      >
        {/* Logo */}
        <Link to="/v3" className="flex items-center gap-3 group">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-[var(--v3-lime)] text-[var(--v3-bg)] transition-transform duration-300 group-hover:rotate-12 shadow-[0_0_20px_rgba(182,255,77,0.25)]">
            <Sparkles size={18} />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="v3-display text-white font-bold text-base md:text-lg tracking-tight">
              Mohamed Ali
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40">
              Media Buying OS
            </span>
          </span>
        </Link>

        {/* Capsule nav */}
        <nav
          className="hidden md:flex items-center bg-white/[0.05] border border-white/5 rounded-full px-1 py-1"
          aria-label="Primary"
        >
          {links.map((l) => {
            const isActive = activeSection === l.id;
            return (
              <a
                key={l.href}
                href={l.href}
                className={`relative group px-5 lg:px-6 py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? "text-[var(--v3-cyan)]"
                    : "text-white/55 hover:text-white"
                }`}
              >
                {l.label}
                <span
                  className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--v3-cyan)] transition-opacity ${
                    isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* CTA cluster */}
        <div className="flex items-center gap-3 md:gap-4">
          <div className="hidden lg:flex items-center gap-2 mr-1">
            <span className="w-2 h-2 rounded-full bg-[var(--v3-lime)] animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-white/45">
              Available
            </span>
          </div>
          <a
            href="#contact"
            className="hidden md:inline-flex px-5 py-3 rounded-xl bg-[var(--v3-lime)] text-[var(--v3-bg)] v3-display font-bold text-xs uppercase tracking-[0.14em] shadow-[0_0_20px_rgba(182,255,77,0.2)] hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Scale with me
          </a>

          <button
            className="md:hidden p-2 -mr-1 text-white"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden mt-2 mx-auto max-w-6xl rounded-2xl v3-shell overflow-hidden">
          <nav className="px-6 py-6 flex flex-col gap-5" aria-label="Mobile">
            {links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-3 v3-display text-2xl font-bold"
              >
                <span className="v3-eyebrow text-[var(--v3-muted)]">0{i + 1}</span>
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex justify-center px-5 py-3 rounded-xl bg-[var(--v3-lime)] text-[var(--v3-bg)] v3-display font-bold text-xs uppercase tracking-[0.14em]"
            >
              Scale with me
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navigation;
