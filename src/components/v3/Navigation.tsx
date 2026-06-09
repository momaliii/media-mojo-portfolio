import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Sparkles, X } from "lucide-react";

const links = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
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
    <header
      className="fixed top-0 inset-x-0 z-50 px-3 pt-3"
    >
      <div
        className={`max-w-[1400px] mx-auto px-4 md:px-5 h-16 flex items-center justify-between rounded-2xl transition-all duration-500 ${
          scrolled ? "v3-shell" : "bg-transparent border border-transparent"
        }`}
      >
        <Link to="/v3" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--v3-lime)] text-[var(--v3-bg)] shadow-[0_0_30px_rgba(182,255,77,.25)]">
            <Sparkles size={18} />
          </span>
          <span className="leading-tight">
            <span className="block v3-display font-bold text-base md:text-lg">Mohamed Ali</span>
            <span className="block text-[0.65rem] uppercase tracking-[0.16em] text-[var(--v3-muted)]">Media buying OS</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10" aria-label="Primary">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="v3-link text-sm font-semibold"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[var(--v3-lime)] text-[var(--v3-bg)] text-xs uppercase tracking-[0.14em] font-bold hover:shadow-[0_0_36px_rgba(182,255,77,.35)] transition-shadow"
        >
          Scale with me
        </a>

        <button
          className="md:hidden p-2 -mr-2"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden mt-2 rounded-2xl v3-shell overflow-hidden">
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
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navigation;
