"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
  delay?: number;
  direction?: "x" | "y" | "rotate";
}

export default function FloatingElement({
  children,
  className = "",
  amplitude = 10,
  duration = 4,
  delay = 0,
  direction = "y",
}: FloatingElementProps) {
  let animationProps = {};
  
  if (direction === "x") {
    animationProps = {
      animate: {
        x: [0, amplitude, 0],
        transition: {
          duration: duration * 2,
          repeat: Infinity,
          delay,
        },
      },
    };
  } else if (direction === "y") {
    animationProps = {
      animate: {
        y: [0, amplitude, 0],
        transition: {
          duration: duration * 2,
          repeat: Infinity,
          delay,
        },
      },
    };
  } else if (direction === "rotate") {
    animationProps = {
      animate: {
        rotate: [-amplitude / 2, amplitude / 2, -amplitude / 2],
        transition: {
          duration: duration * 2,
          repeat: Infinity,
          delay,
        },
      },
    };
  }

  return (
    <motion.div className={className} {...animationProps}>
      {children}
    </motion.div>
  );
} 