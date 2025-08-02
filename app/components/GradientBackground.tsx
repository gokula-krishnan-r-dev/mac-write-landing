"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface GradientBackgroundProps {
  className?: string;
  children?: React.ReactNode;
  intensity?: number;
  speed?: number;
  colors?: string[];
}

export default function GradientBackground({
  className = "",
  children,
  intensity = 0.5,
  speed = 20,
  colors = ["#18181b", "#09090b", "#18181b", "#27272a"],
}: GradientBackgroundProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Initialize window size
    handleResize();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Calculate gradient position based on mouse position
  const gradientX = mousePosition.x / windowSize.width;
  const gradientY = mousePosition.y / windowSize.height;
  
  // Limit the movement intensity
  const offsetX = (gradientX - 0.5) * intensity * 100;
  const offsetY = (gradientY - 0.5) * intensity * 100;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0 z-[-1]"
        animate={{
          background: `radial-gradient(circle at ${50 + offsetX}% ${50 + offsetY}%, ${colors.join(", ")})`,
        }}
        transition={{ duration: speed / 10, ease: "linear" }}
      />
      {children}
    </div>
  );
} 