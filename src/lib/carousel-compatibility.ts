
/**
 * This file provides compatibility wrappers for embla-carousel
 * to handle version mismatches between dependencies
 */

// Safe import function that won't break if package doesn't exist or versions mismatch
export const safeImportAutoplay = async () => {
  try {
    // Dynamically import the autoplay module
    const autoplayModule = await import('embla-carousel-autoplay');
    return autoplayModule.default;
  } catch (error) {
    console.warn('Could not load embla-carousel-autoplay plugin:', error);
    // Return a no-op plugin function as fallback
    return () => ({ destroy: () => {} });
  }
};

// Safe wrapper for creating a carousel plugin
export const createSafeAutoplayPlugin = (options = {}) => {
  try {
    // Try to directly use the Autoplay import if available
    // This helps when the dynamic import might fail
    const Autoplay = require('embla-carousel-autoplay');
    return Autoplay(options);
  } catch (error) {
    console.warn('Could not create embla-carousel-autoplay plugin:', error);
    // Return a no-op plugin as fallback
    return { name: 'autoplay', options: {}, init: () => ({ destroy: () => {} }) };
  }
};
