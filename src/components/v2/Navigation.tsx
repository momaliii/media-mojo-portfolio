import React, { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { trackEvent } from "@/utils/analytics";

interface NavigationProps {
  activeSection?: string;
}

const SECTIONS = ["work", "services", "testimonials", "about", "contact"] as const;

const Navigation: React.FC<NavigationProps> = ({ activeSection = "hero" }) => {
  const [scrollY, setScrollY] = useState(0);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/v2";

  // Refs for cursor-tracked indicator
  const navRef = useRef<HTMLDivElement>(null);
  const [hoveredRect, setHoveredRect] = useState<{ x: number; w: number } | null>(null);
  const indicatorX = useMotionValue(0);
  const indicatorW = useMotionValue(0);
  const sx = useSpring(indicatorX, { stiffness: 320, damping: 32, mass: 0.5 });
  const sw = useSpring(indicatorW, { stiffness: 320, damping: 32, mass: 0.5 });

  useEffect(() => {
    if (hoveredRect) {
      indicatorX.set(hoveredRect.x);
      indicatorW.set(hoveredRect.w);
    }
  }, [hoveredRect, indicatorX, indicatorW]);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-driven blur, bg opacity, padding
  const scrolled = scrollY > 16;
  const blurAmount = Math.min(20, 4 + scrollY / 14);
  const bgOpacity = Math.min(0.92, 0.45 + scrollY / 400);
  const borderOpacity = Math.min(0.12, 0 + scrollY / 1000);

  const goToSection = (id: string) => {
    setOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      trackEvent("navigation_click", { section: id });
    }
  };

  const onItemEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (!navRef.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const navR = navRef.current.getBoundingClientRect();
    setHoveredRect({ x: r.left - navR.left, w: r.width });
  };

  const onNavLeave = () => setHoveredRect(null);

  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        backgroundColor: `rgba(10, 10, 10, ${scrolled ? bgOpacity : 0})`,
        backdropFilter: scrolled ? `blur(${blurAmount}px) saturate(140%)` : "none",
        WebkitBackdropFilter: scrolled ? `blur(${blurAmount}px) saturate(140%)` : "none",
        borderBottomColor: `rgba(255, 255, 255, ${borderOpacity})`,
      }}
      className="fixed top-0 inset-x-0 z-50 transition-[border-color] duration-500 border-b"
    >
      <div className="container mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link
            to="/v2"
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

          {/* Desktop — cursor-tracked indicator */}
          <div
            ref={navRef}
            onMouseLeave={onNavLeave}
            className="hidden md:flex items-center gap-2 relative"
          >
            {/* Sliding gold backdrop */}
            <motion.span
              aria-hidden
              style={{
                x: sx,
                width: sw,
                opacity: hoveredRect ? 1 : 0,
              }}
              transition={{ opacity: { duration: 0.25 } }}
              className="absolute top-1/2 left-0 -translate-y-1/2 h-9 bg-gold/[0.08] border border-gold/30 pointer-events-none"
            />
            {/* Active section underline */}
            <ActiveUnderline navRef={navRef} activeSection={activeSection} isHome={isHome} location={location.pathname} />

            {isHome ? (
              SECTIONS.map((item) => (
                <button
                  key={item}
                  onMouseEnter={onItemEnter}
                  onClick={() => goToSection(item)}
                  className={`relative px-4 py-2 font-mono uppercase text-[0.6875rem] tracking-[0.22em] transition-colors duration-300 ${
                    activeSection === item ? "text-gold" : "text-white/60 hover:text-white"
                  }`}
                >
                  {item}
                </button>
              ))
            ) : (
              <>
                <Link
                  to="/v2"
                  onMouseEnter={onItemEnter}
                  className="relative px-4 py-2 font-mono uppercase text-[0.6875rem] tracking-[0.22em] text-white/60 hover:text-white transition-colors duration-300"
                >
                  Home
                </Link>
                <Link
                  to="/v2/case-studies"
                  onMouseEnter={onItemEnter}
                  className={`relative px-4 py-2 font-mono uppercase text-[0.6875rem] tracking-[0.22em] transition-colors duration-300 ${
                    location.pathname === "/v2/case-studies"
                      ? "text-gold"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  Work
                </Link>
              </>
            )}

            <div onMouseEnter={onItemEnter} className="ml-4">
              <button
                onClick={() =>
                  isHome ? goToSection("contact") : navigate("/v2#contact")
                }
                className="group relative inline-flex items-center gap-2 border border-gold/40 hover:border-gold px-5 py-2.5 overflow-hidden transition-all"
              >
                <span className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                <span className="relative font-mono uppercase text-[0.6875rem] tracking-[0.22em] text-gold group-hover:text-obsidian transition-colors duration-500">
                  Start a project
                </span>
                <span className="relative text-gold group-hover:text-obsidian transition-all duration-500 group-hover:translate-x-0.5">
                  →
                </span>
              </button>
            </div>
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
                ? SECTIONS.map((item, i) => (
                    <motion.button
                      key={item}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                      onClick={() => goToSection(item)}
                      className="text-left font-serif text-3xl text-white/90 hover:text-gold transition-colors capitalize"
                    >
                      {item}
                    </motion.button>
                  ))
                : (
                    <>
                      <Link
                        to="/v2"
                        onClick={() => setOpen(false)}
                        className="font-serif text-3xl text-white/90 hover:text-gold transition-colors"
                      >
                        Home
                      </Link>
                      <Link
                        to="/v2/case-studies"
                        onClick={() => setOpen(false)}
                        className="font-serif text-3xl text-white/90 hover:text-gold transition-colors"
                      >
                        Work
                      </Link>
                    </>
                  )}
              <button
                onClick={() =>
                  isHome ? goToSection("contact") : navigate("/v2#contact")
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

// Renders a thin gold underline that snaps to the currently-active section button
const ActiveUnderline = ({
  navRef,
  activeSection,
  isHome,
  location,
}: {
  navRef: React.RefObject<HTMLDivElement>;
  activeSection: string;
  isHome: boolean;
  location: string;
}) => {
  const x = useMotionValue(0);
  const w = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 30, mass: 0.5 });
  const sw = useSpring(w, { stiffness: 300, damping: 30, mass: 0.5 });
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!navRef.current) return;
    const navR = navRef.current.getBoundingClientRect();
    let activeLabel: string | null = null;
    if (isHome) {
      if ((SECTIONS as readonly string[]).includes(activeSection)) {
        activeLabel = activeSection;
      }
    } else if (location === "/v2/case-studies") {
      activeLabel = "Work";
    }
    if (!activeLabel) {
      setShow(false);
      return;
    }
    // Find the matching child element
    const target = Array.from(
      navRef.current.querySelectorAll("button, a")
    ).find(
      (el) => el.textContent?.trim().toLowerCase() === activeLabel?.toLowerCase()
    ) as HTMLElement | undefined;
    if (target) {
      const r = target.getBoundingClientRect();
      x.set(r.left - navR.left + 12);
      w.set(r.width - 24);
      setShow(true);
    } else {
      setShow(false);
    }
  }, [activeSection, isHome, location, navRef, x, w]);

  return (
    <motion.span
      aria-hidden
      style={{ x: sx, width: sw, opacity: show ? 1 : 0 }}
      transition={{ opacity: { duration: 0.3 } }}
      className="absolute bottom-0 left-0 h-px bg-gold pointer-events-none"
    />
  );
};

export default Navigation;
