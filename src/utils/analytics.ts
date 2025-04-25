
// Analytics utility to track user interactions and page views

/**
 * Track a user event with Google Analytics
 * @param eventName - The name of the event
 * @param eventParams - Additional parameters for the event
 */
export const trackEvent = (eventName: string, eventParams?: Record<string, string | number | boolean>): void => {
  if (!window.gtag) {
    console.warn('Google Analytics not loaded yet');
    return;
  }
  
  try {
    window.gtag('event', eventName, eventParams);
    console.log(`Event tracked: ${eventName}`, eventParams);
  } catch (error) {
    console.error('Error tracking event:', error);
  }
};

/**
 * Track page view
 * @param pagePath - The path of the page
 * @param pageTitle - The title of the page
 */
export const trackPageView = (pagePath: string, pageTitle: string): void => {
  trackEvent('page_view', {
    page_path: pagePath,
    page_title: pageTitle
  });
};

/**
 * Track portfolio interaction
 * @param itemTitle - The title of the portfolio item
 * @param itemCategory - The category of the portfolio item
 */
export const trackPortfolioInteraction = (itemTitle: string, itemCategory: string): void => {
  trackEvent('portfolio_interaction', {
    item_title: itemTitle,
    item_category: itemCategory
  });
};

/**
 * Track form submission
 * @param formName - The name of the form
 * @param formSuccess - Whether the form submission was successful
 */
export const trackFormSubmission = (formName: string, formSuccess: boolean): void => {
  trackEvent('form_submission', {
    form_name: formName,
    form_success: formSuccess
  });
};

/**
 * Track scroll depth
 * @param depth - The scroll depth as a percentage
 * @param sectionId - The ID of the section scrolled to
 */
export const trackScrollDepth = (depth: number, sectionId: string): void => {
  trackEvent('scroll_depth', {
    depth_percentage: depth,
    section_id: sectionId
  });
};
