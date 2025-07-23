import { useEffect, useRef } from 'react';
import { analytics } from '@/utils/performance-analytics';

interface UseAnalyticsOptions {
  trackViews?: boolean;
  trackClicks?: boolean;
  analyticsId?: string;
}

export const useAnalytics = (options: UseAnalyticsOptions = {}) => {
  const { trackViews = true, trackClicks = true, analyticsId } = options;
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Set analytics ID if provided
    if (analyticsId) {
      element.dataset.analytics = analyticsId;
    }

    // Track views if enabled
    if (trackViews) {
      analytics.observeElement(element);
    }

    // Track clicks if enabled
    if (trackClicks) {
      const handleClick = (e: Event) => {
        const target = e.currentTarget as HTMLElement;
        analytics.trackInteraction('click', target.dataset.analytics || target.tagName);
      };

      element.addEventListener('click', handleClick);

      return () => {
        element.removeEventListener('click', handleClick);
        if (trackViews) {
          analytics.unobserveElement(element);
        }
      };
    }

    return () => {
      if (trackViews) {
        analytics.unobserveElement(element);
      }
    };
  }, [trackViews, trackClicks, analyticsId]);

  const trackCustomEvent = (type: 'click' | 'view' | 'scroll' | 'filter' | 'contact', data?: any) => {
    const element = elementRef.current;
    const elementId = element?.dataset.analytics || element?.tagName || 'unknown';
    analytics.trackInteraction(type, elementId, data);
  };

  return {
    elementRef,
    trackCustomEvent,
    analytics
  };
};

export default useAnalytics;