
import { useState, useEffect, useCallback } from 'react';
import { trackScrollDepth } from '@/utils/analytics';

/**
 * Hook to observe scroll position and track sections in view
 * @returns current scroll position percentage and active section
 */
export const useScrollObserver = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');

  const handleScroll = useCallback(() => {
    // Calculate scroll position as percentage
    const position = window.scrollY;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (position / height) * 100;
    setScrollPosition(scrolled);
    
    // Determine which section is currently in view
    const sections = ['hero', 'about', 'countries', 'services', 'portfolio', 'contact'];
    let currentSection = activeSection;
    
    sections.forEach(section => {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        // If the element is in the viewport (with some buffer)
        if (rect.top <= 100 && rect.bottom >= 100) {
          currentSection = section;
        }
      }
    });
    
    // Only update and track if section changed
    if (currentSection !== activeSection) {
      setActiveSection(currentSection);
      // Track scroll depth at 25%, 50%, 75%, 100%
      if (scrolled >= 25 && scrolled < 50) trackScrollDepth(25, currentSection);
      else if (scrolled >= 50 && scrolled < 75) trackScrollDepth(50, currentSection);
      else if (scrolled >= 75 && scrolled < 90) trackScrollDepth(75, currentSection);
      else if (scrolled >= 90) trackScrollDepth(100, currentSection);
    }
  }, [activeSection]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return { scrollPosition, activeSection };
};
