import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { trackEvent } from "@/utils/analytics";

interface NavigationProps {
  activeSection?: string;
}

const SECTIONS = ["work", "services", "testimonials", "about", "contact"] as const;

const Navigation: React.FC<NavigationProps> = ({ activeSection = "hero" }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goToSection = (id: string) => {
    setOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      trackEvent("navigation_click", { section: id });
    }
  };

  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-obsidian/85 backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link
            to="/"
            className="group flex items-baseline gap-3 select-none"
            aria-label="Mohamed Ali — Home"
          >
            <span className="font-serif text-2xl tracking-tight text-white">
              Mohamed Ali
            </span>
            <span className="hidden sm:inline-block font-mono uppercase text-[0.625rem] tracking-[0.22em] text-gold/80">
              · Senior Media Buyer
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-10">
            {isHome ? (
              SECTIONS.map((item) => (
                <button
                  key={item}
                  onClick={() => goToSection(item)}
                  className={`font-mono uppercase text-[0.6875rem] tracking-[0.22em] gold-underline transition-colors ${
                    activeSection === item ? "text-gold" : "text-white/60 hover:text-white"
                  }`}
                >
                  {item}
                </button>
              ))
            ) : (
              <>
                <Link
                  to="/"
                  className="font-mono uppercase text-[0.6875rem] tracking-[0.22em] text-white/60 hover:text-white gold-underline transition-colors"
                >
                  Home
                </Link>
                <Link
                  to="/case-studies"
                  className={`font-mono uppercase text-[0.6875rem] tracking-[0.22em] gold-underline transition-colors ${
                    location.pathname === "/case-studies"
                      ? "text-gold"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  Work
                </Link>
              </>
            )}

            <button
              onClick={() =>
                isHome ? goToSection("contact") : navigate("/#contact")
              }
              className="group inline-flex items-center gap-2 border border-gold/40 hover:border-gold px-5 py-2.5 transition-all"
            >
              <span className="font-mono uppercase text-[0.6875rem] tracking-[0.22em] text-gold">
                Start a project
              </span>
              <span className="text-gold transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white/80 hover:text-gold transition-colors p-2 -mr-2"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-obsidian border-b border-white/[0.06] overflow-hidden"
          >
            <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
              {isHome
                ? SECTIONS.map((item) => (
                    <button
                      key={item}
                      onClick={() => goToSection(item)}
                      className="text-left font-serif text-3xl text-white/90 hover:text-gold transition-colors capitalize"
                    >
                      {item}
                    </button>
                  ))
                : (
                    <>
                      <Link
                        to="/"
                        onClick={() => setOpen(false)}
                        className="font-serif text-3xl text-white/90 hover:text-gold transition-colors"
                      >
                        Home
                      </Link>
                      <Link
                        to="/case-studies"
                        onClick={() => setOpen(false)}
                        className="font-serif text-3xl text-white/90 hover:text-gold transition-colors"
                      >
                        Work
                      </Link>
                    </>
                  )}
              <button
                onClick={() =>
                  isHome ? goToSection("contact") : navigate("/#contact")
                }
                className="mt-4 inline-flex items-center gap-2 border border-gold/40 px-5 py-3 w-fit"
              >
                <span className="font-mono uppercase text-[0.6875rem] tracking-[0.22em] text-gold">
                  Start a project →
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;
