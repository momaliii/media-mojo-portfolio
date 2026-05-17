import React, { useEffect, useState } from "react";
import { Menu, X, Terminal } from "lucide-react";
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
  const isHome = location.pathname === "/v3";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    trackEvent("navigation_click", { section: id });
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl border-b border-chrome-700/40"
          : "border-b border-transparent"
      }`}
      style={{
        backgroundColor: scrolled ? "rgba(6, 9, 32, 0.85)" : "transparent",
      }}
    >
      <div className="container mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16">
          <Link to="/v3" className="flex items-center gap-3 group">
            <Terminal size={16} className="text-holo-cyan group-hover:text-holo-magenta transition-colors" />
            <span className="y2k-display text-lg text-chrome-50" style={{ fontVariationSettings: "'wdth' 85" }}>
              MOHAMED_ALI<span className="text-holo-cyan">.EXE</span>
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {isHome ? (
              SECTIONS.map((item, i) => (
                <button
                  key={item}
                  onClick={() => goTo(item)}
                  className={`group relative px-4 py-2 y2k-mono text-xs uppercase tracking-[0.18em] transition-colors ${
                    activeSection === item ? "text-holo-cyan" : "text-chrome-300 hover:text-chrome-50"
                  }`}
                >
                  <span className="text-chrome-600 mr-1">/{String(i + 1).padStart(2, "0")}</span>
                  {item}
                  {activeSection === item && (
                    <motion.span
                      layoutId="v3-nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-px bg-holo-cyan"
                    />
                  )}
                </button>
              ))
            ) : (
              <>
                <Link to="/v3" className="px-4 py-2 y2k-mono text-xs uppercase tracking-[0.18em] text-chrome-300 hover:text-chrome-50 transition-colors">
                  Home
                </Link>
                <Link
                  to="/v3/case-studies"
                  className={`px-4 py-2 y2k-mono text-xs uppercase tracking-[0.18em] transition-colors ${
                    location.pathname === "/v3/case-studies" ? "text-holo-cyan" : "text-chrome-300 hover:text-chrome-50"
                  }`}
                >
                  Work
                </Link>
              </>
            )}

            <button
              onClick={() => isHome ? goTo("contact") : navigate("/v3#contact")}
              className="ml-4 group relative inline-flex items-center gap-2 px-5 py-2.5 border border-holo-cyan/50 hover:border-holo-cyan text-holo-cyan transition-all overflow-hidden"
            >
              <span className="absolute inset-0 bg-holo-cyan translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative y2k-mono text-xs uppercase tracking-[0.18em] group-hover:text-midnight transition-colors">
                &gt; Initiate_Contact
              </span>
            </button>
          </div>

          {/* Mobile */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-chrome-200 hover:text-holo-cyan p-2 -mr-2"
            aria-label={open ? "Close" : "Open"}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
            className="md:hidden border-b border-chrome-700/40 overflow-hidden"
            style={{ backgroundColor: "rgba(6, 9, 32, 0.95)" }}
          >
            <div className="container mx-auto px-6 py-6 flex flex-col gap-3">
              {isHome && SECTIONS.map((item, i) => (
                <button
                  key={item}
                  onClick={() => goTo(item)}
                  className="text-left y2k-display text-3xl text-chrome-100 hover:text-holo-cyan transition-colors"
                  style={{ fontVariationSettings: "'wdth' 85" }}
                >
                  <span className="text-chrome-600 text-base mr-2">/{String(i + 1).padStart(2, "0")}</span>
                  {item.toUpperCase()}
                </button>
              ))}
              {!isHome && (
                <>
                  <Link to="/v3" onClick={() => setOpen(false)} className="y2k-display text-3xl text-chrome-100 hover:text-holo-cyan">HOME</Link>
                  <Link to="/v3/case-studies" onClick={() => setOpen(false)} className="y2k-display text-3xl text-chrome-100 hover:text-holo-cyan">WORK</Link>
                </>
              )}
              <button
                onClick={() => isHome ? goTo("contact") : navigate("/v3#contact")}
                className="mt-4 inline-flex items-center gap-2 border border-holo-cyan/50 px-5 py-3 w-fit y2k-mono text-xs uppercase tracking-[0.18em] text-holo-cyan"
              >
                &gt; Initiate_Contact
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;
