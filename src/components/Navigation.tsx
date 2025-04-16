
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
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
  };

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
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
                className="text-gray-700 hover:text-media-purple transition-colors capitalize relative group"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-media-purple group-hover:w-full transition-all duration-300"></span>
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
                Let's Talk
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label="Menu"
              className="focus:ring-0"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
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
            >
              <div className="flex flex-col space-y-4 bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm">
                {["about", "services", "portfolio", "contact"].map((item, index) => (
                  <motion.button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="text-gray-800 hover:text-media-purple transition-colors py-2 capitalize text-left pl-2 hover:bg-gray-50 rounded-md"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
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
                    className="bg-media-purple hover:bg-media-darkpurple text-white w-full shadow-md"
                  >
                    Let's Talk
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
