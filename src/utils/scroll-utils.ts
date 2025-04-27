
/**
 * Smoothly scrolls to a specific element on the page
 * @param elementId - The ID of the element to scroll to
 * @param offset - Optional offset from the top of the element (default: 80px for header height)
 */
export const scrollToElement = (elementId: string, offset: number = 80): void => {
  const element = document.getElementById(elementId);
  if (!element) return;

  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
};

/**
 * Determines if an element is in the viewport
 * @param element - The DOM element to check
 * @param offset - Optional offset percentage (0-1) to consider partial visibility
 * @returns boolean indicating if element is visible
 */
export const isElementInViewport = (element: Element, offset: number = 0): boolean => {
  const rect = element.getBoundingClientRect();
  const offsetPixels = window.innerHeight * offset;
  
  return (
    rect.top + offsetPixels < window.innerHeight &&
    rect.bottom - offsetPixels > 0 &&
    rect.left + offsetPixels < window.innerWidth &&
    rect.right - offsetPixels > 0
  );
};

/**
 * Register scroll-triggered animations for elements with specific class
 * @param className - The class name to look for when registering animations
 */
export const registerScrollAnimations = (className: string = 'animate-on-scroll'): () => void => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    }
  );

  // Observe all matching elements
  const elements = document.querySelectorAll(`.${className}`);
  elements.forEach(el => observer.observe(el));
  
  // Return cleanup function
  return () => {
    elements.forEach(el => observer.unobserve(el));
  };
};
