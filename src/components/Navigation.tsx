import React, { useState, useEffect } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { trackEvent } from "@/utils/analytics";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

interface NavigationProps {
  activeSection?: string;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection = "hero" }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Determine if scrolled for styling
      if (scrollPosition > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    
    trackEvent('toggle_mobile_menu', { 
      action: !mobileMenuOpen ? 'open' : 'close'
    });
  };

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      
      // Focus management for accessibility
      setTimeout(() => {
        const focusableElement = section.querySelector('button, a, input, textarea, select, h2, h3') as HTMLElement;
        if (focusableElement) {
          focusableElement.setAttribute('tabindex', '-1');
          focusableElement.focus();
          focusableElement.removeAttribute('tabindex');
        }
      }, 300);
      
      trackEvent('navigation_click', {
        section: sectionId
      });
    }
  };

  return (
    <motion.nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-md py-3"
          : "bg-transparent dark:bg-transparent py-5"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Animated Logo */}
          <Link to="/">
            <motion.div 
              className="text-xl md:text-2xl font-bold cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="relative">
                <span className="inline-block animate-slide-in-right overflow-hidden whitespace-nowrap">
                  <span className="gradient-text dark:text-white">Mohamed</span>
                  <span className="animate-pulse ml-1 text-media-purple dark:text-media-blue">Ali</span>
                </span>
                <span className="animate-fade-in absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-media-purple to-blue-500"></span>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {isHomePage ? (
              ["about", "countries", "services", "portfolio", "contact"].map((item, index) => (
                <motion.button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`relative group ${
                    activeSection === item 
                      ? "text-media-purple dark:text-media-blue font-medium" 
                      : "text-gray-700 dark:text-gray-300 hover:text-media-purple dark:hover:text-media-blue"
                  } transition-colors capitalize`}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  aria-label={`Navigate to ${item} section`}
                >
                  {item}
                  <span 
                    className={`absolute -bottom-1 left-0 h-0.5 bg-media-purple dark:bg-media-blue transition-all duration-300 ${
                      activeSection === item ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                    aria-hidden="true"
                  ></span>
                </motion.button>
              ))
            ) : (
              <div className="flex items-center space-x-8">
                <Link 
                  to="/" 
                  className="text-gray-700 dark:text-gray-300 hover:text-media-purple dark:hover:text-media-blue transition-colors"
                >
                  Home
                </Link>
                <Link 
                  to="/case-studies" 
                  className={`relative group ${
                    location.pathname === '/case-studies'
                      ? "text-media-purple dark:text-media-blue font-medium" 
                      : "text-gray-700 dark:text-gray-300 hover:text-media-purple dark:hover:text-media-blue"
                  } transition-colors`}
                >
                  Case Studies
                  <span 
                    className={`absolute -bottom-1 left-0 h-0.5 bg-media-purple dark:bg-media-blue transition-all duration-300 ${
                      location.pathname === '/case-studies' ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </Link>
              </div>
            )}
            <ThemeToggle />
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {isHomePage ? (
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => scrollToSection("contact")}
                    className="bg-media-purple dark:bg-media-blue hover:bg-media-darkpurple dark:hover:bg-blue-600 text-white shadow-md hover:shadow-lg transition-all"
                  >
                    Work With Me <ChevronRight className="ml-1 h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              ) : (
                <Link 
                  to="/#contact"
                  onClick={(e) => {
                    if (location.pathname !== '/') {
                      e.preventDefault();
                      navigate('/#contact');
                    }
                  }}
                >
                  <Button
                    className="bg-media-purple dark:bg-media-blue hover:bg-media-darkpurple dark:hover:bg-blue-600 text-white shadow-md hover:shadow-lg transition-all"
                  >
                    Work With Me <ChevronRight className="ml-1 h-4 w-4" aria-hidden="true" />
                  </Button>
                </Link>
              )}
            </motion.div>
          </div>

          {/* Mobile Menu Button and Theme Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              className="focus:ring-0"
            >
              {mobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              className="md:hidden pt-4 pb-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              id="mobile-menu"
              role="navigation" 
              aria-label="Mobile navigation menu"
            >
              <div className="flex flex-col space-y-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-4 rounded-xl shadow-sm">
                {isHomePage ? (
                  ["about", "countries", "services", "portfolio", "contact"].map((item, index) => (
                    <motion.button
                      key={item}
                      onClick={() => scrollToSection(item)}
                      className={`text-left pl-2 py-2 rounded-md transition-colors capitalize ${
                        activeSection === item 
                          ? "text-media-purple dark:text-media-blue font-medium bg-media-purple/10 dark:bg-media-blue/10" 
                          : "text-gray-800 dark:text-gray-200 hover:text-media-purple hover:bg-gray-50 dark:hover:text-media-blue dark:hover:bg-gray-800"
                      }`}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      aria-label={`Navigate to ${item} section`}
                    >
                      {item}
                    </motion.button>
                  ))
                ) : (
                  <>
                    <Link 
                      to="/" 
                      className="text-left pl-2 py-2 rounded-md transition-colors text-gray-800 dark:text-gray-200 hover:text-media-purple hover:bg-gray-50 dark:hover:text-media-blue dark:hover:bg-gray-800"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Home
                    </Link>
                    <Link 
                      to="/case-studies" 
                      className={`text-left pl-2 py-2 rounded-md transition-colors ${
                        location.pathname === '/case-studies'
                          ? "text-media-purple dark:text-media-blue font-medium bg-media-purple/10 dark:bg-media-blue/10" 
                          : "text-gray-800 dark:text-gray-200 hover:text-media-purple hover:bg-gray-50 dark:hover:text-media-blue dark:hover:bg-gray-800"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Case Studies
                    </Link>
                  </>
                )}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                >
                  {isHomePage ? (
                    <Button
                      onClick={() => scrollToSection("contact")}
                      className="bg-media-purple dark:bg-media-blue hover:bg-media-darkpurple dark:hover:bg-blue-600 text-white w-full shadow-md flex items-center justify-center"
                    >
                      <span>Work With Me</span>
                      <ChevronRight className="ml-1 h-4 w-4" aria-hidden="true" />
                    </Button>
                  ) : (
                    <Link 
                      to="/#contact" 
                      onClick={(e) => {
                        setMobileMenuOpen(false);
                        if (location.pathname !== '/') {
                          e.preventDefault();
                          navigate('/#contact');
                        }
                      }}
                    >
                      <Button
                        className="bg-media-purple dark:bg-media-blue hover:bg-media-darkpurple dark:hover:bg-blue-600 text-white w-full shadow-md flex items-center justify-center"
                      >
                        <span>Work With Me</span>
                        <ChevronRight className="ml-1 h-4 w-4" aria-hidden="true" />
                      </Button>
                    </Link>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;
