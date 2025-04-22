
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
