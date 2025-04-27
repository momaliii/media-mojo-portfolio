
import { throttle } from "./performance";

type PerformanceMetric = {
  name: string;
  value: number;
  timestamp: number;
};

// Define additional performance entry types
interface LayoutShiftEntry extends PerformanceEntry {
  value: number;
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private readonly maxMetrics: number = 100;

  constructor() {
    // Initialize performance observers
    this.initPerformanceObservers();
  }

  private initPerformanceObservers() {
    // Observe paint timing
    if (typeof PerformanceObserver !== 'undefined') {
      const paintObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          this.logMetric(entry.name, entry.startTime);
        });
      });
      
      paintObserver.observe({ entryTypes: ['paint'] });

      // Observe layout shifts
      const layoutShiftObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          // Type assertion to access the value property
          const layoutShift = entry as LayoutShiftEntry;
          this.logMetric('cumulative-layout-shift', layoutShift.value);
        });
      });

      layoutShiftObserver.observe({ entryTypes: ['layout-shift'] });
    }
  }

  public logMetric = throttle((name: string, value: number) => {
    const metric: PerformanceMetric = {
      name,
      value,
      timestamp: Date.now(),
    };

    this.metrics.push(metric);
    
    // Keep only the last maxMetrics entries
    if (this.metrics.length > this.maxMetrics) {
      this.metrics = this.metrics.slice(-this.maxMetrics);
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`Performance Metric - ${name}:`, value);
    }
  }, 1000);

  public measureComponentRender(componentName: string, startTime: number) {
    const renderTime = performance.now() - startTime;
    this.logMetric(`${componentName}-render-time`, renderTime);
  }

  public getMetrics() {
    return this.metrics;
  }
}

export const performanceMonitor = new PerformanceMonitor();
