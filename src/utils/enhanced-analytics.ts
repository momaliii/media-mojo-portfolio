
import { trackEvent } from './analytics';

// Enhanced timing tracking
export const trackTiming = (category: string, variable: string, time: number) => {
  trackEvent('timing_complete', {
    timing_category: category,
    timing_variable: variable,
    timing_value: time
  });
};

// Track component visibility
export const trackVisibility = (elementId: string, visible: boolean) => {
  trackEvent('visibility_change', {
    element_id: elementId,
    visible: visible
  });
};

// Track user engagement metrics
export const trackEngagement = (action: string, section: string, duration?: number) => {
  trackEvent('user_engagement', {
    engagement_action: action,
    engagement_section: section,
    engagement_duration: duration
  });
};

// Track error events
export const trackError = (errorType: string, errorMessage: string, componentName?: string) => {
  trackEvent('error_occurred', {
    error_type: errorType,
    error_message: errorMessage,
    component_name: componentName || 'unknown'
  });
};

// Track performance metrics
export const trackPerformanceMetric = (metric: string, value: number) => {
  trackEvent('performance_metric', {
    metric_name: metric, 
    metric_value: value
  });
};

// Track user preferences
export const trackPreference = (preferenceName: string, preferenceValue: string | boolean) => {
  trackEvent('user_preference', {
    preference_name: preferenceName,
    preference_value: preferenceValue.toString()
  });
};

// Initialize performance tracking
export const initPerformanceTracking = () => {
  if (typeof window !== 'undefined' && 'performance' in window && 'getEntriesByType' in performance) {
    // Get navigation timing metrics
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfEntries = performance.getEntriesByType('navigation');
        if (perfEntries && perfEntries.length > 0) {
          const navTiming = perfEntries[0] as PerformanceNavigationTiming;
          
          trackPerformanceMetric('page_load_time', navTiming.loadEventEnd - navTiming.startTime);
          trackPerformanceMetric('dom_interactive', navTiming.domInteractive - navTiming.startTime);
          trackPerformanceMetric('dom_complete', navTiming.domComplete - navTiming.startTime);
          
          // Clear the performance entries to avoid duplicated metrics
          performance.clearResourceTimings();
        }
      }, 0);
    });
  }
};
