interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
}

interface UserInteraction {
  type: 'click' | 'view' | 'scroll' | 'filter' | 'contact';
  element: string;
  timestamp: number;
  data?: any;
}

class PerformanceAnalytics {
  private metrics: PerformanceMetric[] = [];
  private interactions: UserInteraction[] = [];
  private observer: IntersectionObserver | null = null;

  constructor() {
    this.initializePerformanceObserver();
    this.initializeIntersectionObserver();
  }

  private initializePerformanceObserver() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const value = (entry as any).duration || (entry as any).value || entry.startTime;
          this.recordMetric(entry.name, value);
        }
      });

      try {
        observer.observe({ entryTypes: ['measure', 'navigation', 'paint'] });
      } catch (e) {
        console.warn('Performance observer failed:', e);
      }
    }
  }

  private initializeIntersectionObserver() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            this.trackInteraction('view', element.dataset.analytics || element.tagName);
          }
        });
      },
      { threshold: 0.5 }
    );
  }

  recordMetric(name: string, value: number) {
    this.metrics.push({
      name,
      value,
      timestamp: Date.now()
    });

    // Keep only last 100 metrics
    if (this.metrics.length > 100) {
      this.metrics = this.metrics.slice(-100);
    }
  }

  trackInteraction(type: UserInteraction['type'], element: string, data?: any) {
    this.interactions.push({
      type,
      element,
      timestamp: Date.now(),
      data
    });

    // Keep only last 50 interactions
    if (this.interactions.length > 50) {
      this.interactions = this.interactions.slice(-50);
    }

    // Send to analytics service (if needed)
    this.sendToAnalytics({ type, element, data });
  }

  observeElement(element: HTMLElement) {
    if (this.observer) {
      this.observer.observe(element);
    }
  }

  unobserveElement(element: HTMLElement) {
    if (this.observer) {
      this.observer.unobserve(element);
    }
  }

  private sendToAnalytics(interaction: Omit<UserInteraction, 'timestamp'>) {
    // This could send to Google Analytics, Mixpanel, etc.
    if (window.gtag) {
      window.gtag('event', interaction.type, {
        event_category: 'user_interaction',
        event_label: interaction.element,
        custom_data: interaction.data
      });
    }
  }

  getMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }

  getInteractions(): UserInteraction[] {
    return [...this.interactions];
  }

  // Core Web Vitals tracking
  measureCLS() {
    if ('PerformanceObserver' in window) {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const layoutShiftEntry = entry as any;
          if (!layoutShiftEntry.hadRecentInput) {
            clsValue += layoutShiftEntry.value;
          }
        }
        this.recordMetric('CLS', clsValue);
      });

      try {
        observer.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        console.warn('CLS measurement failed:', e);
      }
    }
  }

  measureLCP() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const lastEntry = list.getEntries().pop();
        if (lastEntry) {
          this.recordMetric('LCP', lastEntry.startTime);
        }
      });

      try {
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        console.warn('LCP measurement failed:', e);
      }
    }
  }

  measureFID() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const firstEntry = list.getEntries()[0] as any;
        if (firstEntry) {
          this.recordMetric('FID', firstEntry.processingStart - firstEntry.startTime);
        }
      });

      try {
        observer.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        console.warn('FID measurement failed:', e);
      }
    }
  }

  // Initialize all Core Web Vitals
  initializeCoreWebVitals() {
    this.measureCLS();
    this.measureLCP();
    this.measureFID();
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

// Global analytics instance
export const analytics = new PerformanceAnalytics();

// Auto-initialize Core Web Vitals
analytics.initializeCoreWebVitals();

export default analytics;
