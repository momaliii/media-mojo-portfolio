
import React, { useState, useEffect } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { trackEvent } from "@/utils/analytics";

interface NavigationProps {
  activeSection?: string;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection = "hero" }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      section.scrollIntoView({ behavior: "smooth" });
      
      trackEvent('navigation_click', {
        section: sectionId
      });
    }
  };

  return (
    <motion.nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Animated Logo */}
          <motion.div 
            className="text-xl md:text-2xl font-bold"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="relative">
              <span className="inline-block animate-slide-in-right overflow-hidden whitespace-nowrap">
                <span className="gradient-text">Mohamed</span>
                <span className="animate-pulse ml-1 text-media-purple">Ali</span>
              </span>
              <span className="animate-fade-in absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-media-purple to-blue-500"></span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {["about", "services", "portfolio", "contact"].map((item, index) => (
              <motion.button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`relative group ${
                  activeSection === item 
                    ? "text-media-purple font-medium" 
                    : "text-gray-700 hover:text-media-purple"
                } transition-colors capitalize`}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                aria-label={`Navigate to ${item} section`}
              >
                {item}
                <span 
                  className={`absolute -bottom-1 left-0 h-0.5 bg-media-purple transition-all duration-300 ${
                    activeSection === item ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                  aria-hidden="true"
                ></span>
              </motion.button>
            ))}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Button
                onClick={() => scrollToSection("contact")}
                className="bg-media-purple hover:bg-media-darkpurple text-white shadow-md hover:shadow-lg transition-all"
              >
                Let's Talk <ChevronRight className="ml-1 h-4 w-4" aria-hidden="true" />
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
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
              <div className="flex flex-col space-y-4 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-sm">
                {["about", "services", "portfolio", "contact"].map((item, index) => (
                  <motion.button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`text-left pl-2 py-2 rounded-md transition-colors capitalize ${
                      activeSection === item 
                        ? "text-media-purple font-medium bg-media-purple/10" 
                        : "text-gray-800 hover:text-media-purple hover:bg-gray-50"
                    }`}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    aria-label={`Navigate to ${item} section`}
                  >
                    {item}
                  </motion.button>
                ))}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                >
                  <Button
                    onClick={() => scrollToSection("contact")}
                    className="bg-media-purple hover:bg-media-darkpurple text-white w-full shadow-md flex items-center justify-center"
                  >
                    <span>Let's Talk</span>
                    <ChevronRight className="ml-1 h-4 w-4" aria-hidden="true" />
                  </Button>
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
