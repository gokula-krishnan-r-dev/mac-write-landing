"use client";

import { useEffect } from 'react';

export default function PerformanceMonitor() {
  useEffect(() => {
    // Performance monitoring
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Core Web Vitals monitoring
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime);
          }
          if (entry.entryType === 'first-input') {
            const fidEntry = entry as any;
            console.log('FID:', fidEntry.processingStart - entry.startTime);
          }
          if (entry.entryType === 'layout-shift') {
            const clsEntry = entry as any;
            console.log('CLS:', clsEntry.value);
          }
        });
      });

      try {
        observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
      } catch (e) {
        // Fallback for older browsers
        console.log('Performance observer not supported');
      }

      // Preload critical resources on hover
      const preloadOnHover = (selector: string, href: string) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
          element.addEventListener('mouseenter', () => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = href;
            document.head.appendChild(link);
          }, { once: true });
        });
      };

      // Preload download on hover
      preloadOnHover('a[href*="Macwrite.dmg"]', '/app/Macwrite.dmg');
      
      return () => {
        observer.disconnect();
      };
    }
  }, []);

  return null;
}