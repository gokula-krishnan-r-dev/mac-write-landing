"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface OptimizedAnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  animation?: "fade" | "slideUp" | "slideLeft" | "slideRight";
  id?: string;
  once?: boolean;
  threshold?: number;
}

export default function OptimizedAnimatedSection({
  children,
  className = "",
  delay = 0,
  animation = "fade",
  id,
  once = true,
  threshold = 0.1,
}: OptimizedAnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!hasTriggered || !once)) {
          setTimeout(() => {
            setIsVisible(true);
            if (once) setHasTriggered(true);
          }, delay);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: "50px 0px -50px 0px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay, once, threshold, hasTriggered]);

  const getAnimationClasses = () => {
    const baseClasses = "transition-all duration-700 ease-out";
    
    if (!isVisible) {
      switch (animation) {
        case "slideUp":
          return `${baseClasses} opacity-0 translate-y-8`;
        case "slideLeft":
          return `${baseClasses} opacity-0 -translate-x-8`;
        case "slideRight":
          return `${baseClasses} opacity-0 translate-x-8`;
        default:
          return `${baseClasses} opacity-0`;
      }
    }
    
    return `${baseClasses} opacity-100 translate-y-0 translate-x-0`;
  };

  return (
    <div
      ref={ref}
      id={id}
      className={cn(getAnimationClasses(), className)}
    >
      {children}
    </div>
  );
}