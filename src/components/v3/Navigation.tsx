import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

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
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-md bg-[var(--v3-paper)]/85 border-b v3-rule" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-16 md:h-20 flex items-center justify-between">
        <Link to="/v3" className="flex items-baseline gap-2">
          <span className="v3-serif text-2xl md:text-3xl leading-none">Mohamed</span>
          <span className="v3-italic text-2xl md:text-3xl leading-none v3-accent">Ali</span>
        </Link>

        <nav className="hidden md:flex items-center gap-10" aria-label="Primary">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              className="group flex items-baseline gap-2 text-sm hover:text-[var(--v3-accent)] transition-colors"
            >
              <span className="v3-eyebrow text-[var(--v3-muted)] group-hover:text-[var(--v3-accent)]">
                0{i + 1}
              </span>
              <span className="v3-link">{l.label}</span>
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 border border-[var(--v3-ink)] rounded-full text-xs uppercase tracking-[0.22em] font-medium hover:bg-[var(--v3-ink)] hover:text-[var(--v3-paper)] transition-colors"
        >
          Start a project
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
        <div className="md:hidden border-t v3-rule bg-[var(--v3-paper)]">
          <nav className="px-6 py-6 flex flex-col gap-5" aria-label="Mobile">
            {links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-3 v3-serif text-2xl"
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
