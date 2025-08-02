"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxProps {
  className?: string;
  children: React.ReactNode;
  speed?: number;
  direction?: "up" | "down" | "left" | "right";
  offset?: number;
  easing?: number;
}

export default function ParallaxScroll({
  children,
  className = "",
  speed = 0.5,
  direction = "up",
  offset = 0,
  easing = 0.5,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Calculate transform values based on direction
  const getTransformValue = () => {
    const baseValue = 100 * speed;
    
    switch (direction) {
      case "up":
        return useTransform(
          scrollYProgress,
          [0, 1],
          [offset, -baseValue + offset],
          { ease: (x) => 1 - Math.pow(1 - x, easing * 3) }
        );
      case "down":
        return useTransform(
          scrollYProgress,
          [0, 1],
          [offset, baseValue + offset],
          { ease: (x) => 1 - Math.pow(1 - x, easing * 3) }
        );
      case "left":
        return useTransform(
          scrollYProgress,
          [0, 1],
          [offset, -baseValue + offset],
          { ease: (x) => 1 - Math.pow(1 - x, easing * 3) }
        );
      case "right":
        return useTransform(
          scrollYProgress,
          [0, 1],
          [offset, baseValue + offset],
          { ease: (x) => 1 - Math.pow(1 - x, easing * 3) }
        );
      default:
        return useTransform(scrollYProgress, [0, 1], [0, 0]);
    }
  };

  const y = direction === "up" || direction === "down" ? getTransformValue() : 0;
  const x = direction === "left" || direction === "right" ? getTransformValue() : 0;

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={{ y, x }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
} 