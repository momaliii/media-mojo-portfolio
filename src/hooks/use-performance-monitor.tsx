
import { useEffect, useRef } from 'react';
import { performanceMonitor } from '@/utils/performanceMonitor';

export const usePerformanceMonitor = (componentName: string) => {
  const renderStart = useRef(performance.now());

  useEffect(() => {
    performanceMonitor.measureComponentRender(componentName, renderStart.current);
  }, [componentName]);

  return {
    logMetric: performanceMonitor.logMetric,
    getMetrics: performanceMonitor.getMetrics,
  };
};
