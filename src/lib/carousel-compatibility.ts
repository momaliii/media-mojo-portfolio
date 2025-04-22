
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
    // Use dynamic import instead of require for browser compatibility
    // This returns a placeholder object until the actual plugin is loaded
    const placeholderPlugin = {
      name: 'autoplay',
      options,
      init: () => ({ destroy: () => {} })
    };
    
    // Immediately try to load the real plugin
    safeImportAutoplay().then(Autoplay => {
      if (Autoplay) {
        // Successfully loaded, but we can't return it here
        // The component using this should handle the async nature
        console.log('Autoplay plugin successfully loaded');
      }
    }).catch(err => {
      console.warn('Failed to load autoplay plugin:', err);
    });
    
    return placeholderPlugin;
  } catch (error) {
    console.warn('Could not create embla-carousel-autoplay plugin:', error);
    // Return a no-op plugin as fallback
    return { name: 'autoplay', options: {}, init: () => ({ destroy: () => {} }) };
  }
};
